"use client";
import { useEffect, useRef, useState } from "react";
import SudokuBoardBase from "./SudokuBoardBase";
import { loadPyodideAndSudoku } from "./pyodideSudokuLoader";

type SudokuGrid = number[][];
type StatusChangeHandler = (status: string) => void;
type LoadingChangeHandler = (loading: boolean) => void;
type ValidateGridHandler = (grid: SudokuGrid) => Promise<boolean>;
type Coordinate = [number, number];

interface AISudokuBoardProps {
  emptyCells?: number;
  seed?: number;
  onLoadingChange?: LoadingChangeHandler;
  onLoadingStatusChange?: StatusChangeHandler;
}

const TypedSudokuBoardBase: any = SudokuBoardBase;

export default function AISudokuBoard({ emptyCells = 45, seed, onLoadingChange, onLoadingStatusChange }: AISudokuBoardProps) {
  const [runtimeSeed, setRuntimeSeed] = useState<number>(() => seed ?? Math.floor(Math.random() * 1000000));
  const [puzzle, setPuzzle] = useState<SudokuGrid | null>(null);
  const [solution, setSolution] = useState<SudokuGrid | null>(null);
  const [validateGrid, setValidateGrid] = useState<ValidateGridHandler | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showCellValues, setShowCellValues] = useState<boolean>(false);
  const [visibleCells, setVisibleCells] = useState<string[]>([]);
  const [revealCells, setRevealCells] = useState<string[]>([]);
  const [revealFinished, setRevealFinished] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const cellVisibilityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    onLoadingChange?.(loading);
  }, [loading, onLoadingChange]);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      onLoadingStatusChange?.("Loading AI Sudoku runtime…");
      const loaderOptions: any = { onStatusChange: onLoadingStatusChange };
      const pyodide = await loadPyodideAndSudoku(loaderOptions);
      if (cancelled) return;

      onLoadingStatusChange?.("Generating AI puzzle…");
      const puzzleJson = await pyodide.runPythonAsync(
        `import json\njson.dumps(generate_sudoku_puzzle(empty_cells=${emptyCells}, seed=${runtimeSeed}).tolist())`
      );
      if (cancelled) return;

      const jsPuzzle = JSON.parse(puzzleJson) as SudokuGrid;
      setPuzzle(jsPuzzle);

      const puzzleLiteral = puzzleJson.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
      onLoadingStatusChange?.("Solving AI puzzle…");
      const solutionJson = await pyodide.runPythonAsync(
        `import json, numpy as np\npuzzle_grid = np.array(json.loads('${puzzleLiteral}'), dtype=int)\nsolver = ImprovedSudokuResolver(puzzle_grid)\nsolver.find_solution()\njson.dumps(solver.grid.tolist())`
      );
      if (cancelled) return;

      setSolution(JSON.parse(solutionJson) as SudokuGrid);
      setVisibleCells([]);
      setRevealCells([]);
      setRevealFinished(false);
      setShowCellValues(false);
      setIsVisible(true);

      if (cellVisibilityTimeoutRef.current) clearTimeout(cellVisibilityTimeoutRef.current);
      cellVisibilityTimeoutRef.current = setTimeout(() => {
        cellVisibilityTimeoutRef.current = null;
        if (!cancelled) {
          setShowCellValues(true);
        }
      }, 180);

      setValidateGrid(() => async (grid: SudokuGrid) => {
        const gridLiteral = JSON.stringify(grid).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
        const result = await pyodide.runPythonAsync(
          `import json\ncandidate_grid = json.loads('${gridLiteral}')\nis_valid_sudoku_grid(candidate_grid)`
        );
        return Boolean(result);
      });
      onLoadingStatusChange?.("Ready.");

      setLoading(false);
    }

    init().catch((err) => {
      console.error(err);
      onLoadingStatusChange?.("Failed to load AI Sudoku runtime.");
      setError(err instanceof Error ? err.message : "Failed to load the AI Sudoku puzzle.");
      setLoading(false);
    });

    return () => {
      cancelled = true;
      if (timerRef.current) clearInterval(timerRef.current);
      timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutRefs.current = [];
      if (cellVisibilityTimeoutRef.current) clearTimeout(cellVisibilityTimeoutRef.current);
      cellVisibilityTimeoutRef.current = null;
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    };
  }, [emptyCells, runtimeSeed, onLoadingStatusChange]);

  useEffect(() => {
    if (!puzzle || !solution) return;

    setRevealFinished(false);

    const emptyCellsList: Coordinate[] = [];
    puzzle.forEach((row: number[], r: number) => row.forEach((value: number, c: number) => {
      if (!value) emptyCellsList.push([r, c]);
    }));

    if (emptyCellsList.length === 0) {
      setRevealFinished(true);
      return;
    }

    let index = 0;
    timerRef.current = setInterval(() => {
      const batch = emptyCellsList.slice(index, index + 3);
      if (batch.length === 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        setRevealFinished(true);
        return;
      }

      const batchKeys = batch.map(([r, c]) => `cell-${r}-${c}`);
      setVisibleCells((previous) => Array.from(new Set([...previous, ...batchKeys])));
      setRevealCells(batchKeys);

      const isLastBatch = index + 3 >= emptyCellsList.length;
      const timeoutId = setTimeout(() => {
        setRevealCells([]);
        if (isLastBatch) {
          setRevealFinished(true);
        }
      }, 700);
      timeoutRefs.current.push(timeoutId);

      index += 3;
      if (index >= emptyCellsList.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutRefs.current = [];
    };
  }, [puzzle, solution]);

  useEffect(() => {
    if (!revealFinished || loading) return;
    if (restartTimeoutRef.current) return;

    restartTimeoutRef.current = setTimeout(() => {
      restartTimeoutRef.current = null;
      setIsVisible(false);

      fadeTimeoutRef.current = setTimeout(() => {
        fadeTimeoutRef.current = null;
        setLoading(true);
        setShowCellValues(false);
        setPuzzle(null);
        setSolution(null);
        setValidateGrid(null);
        setVisibleCells([]);
        setRevealCells([]);
        setRevealFinished(false);
        setRuntimeSeed(Math.floor(Math.random() * 1000000));
      }, 300);
    }, 3000);

    return () => {
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    };
  }, [revealFinished, loading]);

  return (
    <section>
      <div className="mt-4">
        <div className="mx-auto max-w-5xl py-6 min-h-[36rem] sm:min-h-[36rem] lg:min-h-[38rem]">
          {error ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-red-500/30 bg-red-950/30 p-4 text-sm text-red-100">
              <p className="font-semibold">AI Sudoku could not load.</p>
              <p className="mt-1 text-red-200/90">{error}</p>
              <button
                type="button"
                className="mt-3 rounded-md border border-red-400/40 bg-red-500/10 px-4 py-2 font-semibold text-red-100 transition hover:bg-red-500/20"
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  setIsVisible(false);
                  setRuntimeSeed(Math.floor(Math.random() * 1000000));
                }}
              >
                Retry
              </button>
            </div>
          ) : null}
          <div className={`relative transition-opacity duration-300 ease-out ${isVisible && !loading ? "opacity-100" : "opacity-0"}`}>
            <TypedSudokuBoardBase
              key={runtimeSeed}
              puzzle={puzzle}
              solution={solution}
              validateGrid={validateGrid}
              allCellsReadOnly={true}
              revealCells={revealCells}
              visibleCells={visibleCells}
              validMessage="Valid Sudoku Board"
              showValidationState={revealFinished}
              forceHiddenValues={!showCellValues}
              showMobileTapHint={false}
              showMobileKeypad={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
