"use client";
import { useEffect, useRef, useState } from "react";
import SudokuBoardBase from "./SudokuBoardBase";
import { loadPyodideAndSudoku } from "./pyodideSudokuLoader";
import { supabase } from "@/lib/supabaseClient";

const STORAGE_KEY = "portfolio.sudoku.user-game";
const SOLVED_PUZZLES_KEY = "portfolio.sudoku.solved-puzzles";

function createEmptyGrid() {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

function isValidGridShape(grid) {
  return Array.isArray(grid) && grid.length === 9 && grid.every((row) => Array.isArray(row) && row.length === 9);
}

function isCompleteGrid(grid) {
  return isValidGridShape(grid) && grid.every((row) => row.every((value) => Number(value) > 0));
}

function readSolvedPuzzleKeys() {
  if (typeof window === "undefined") return new Set();

  try {
    const raw = window.localStorage.getItem(SOLVED_PUZZLES_KEY);
    if (!raw) return new Set();

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();

    return new Set(parsed.filter((value) => typeof value === "string"));
  } catch {
    return new Set();
  }
}

function persistSolvedPuzzleKeys(keys) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(SOLVED_PUZZLES_KEY, JSON.stringify(Array.from(keys)));
  } catch (error) {
    console.error(error);
  }
}

function readSavedGame() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (typeof parsed?.seed !== "number" || !isValidGridShape(parsed?.grid)) {
      return null;
    }

    return {
      seed: parsed.seed,
      grid: parsed.grid,
    };
  } catch {
    return null;
  }
}

export default function UserSudokuBoard({ emptyCells = 45, seed, onLoadComplete, onLoadingChange = null, onLoadingStatusChange = null, onPuzzleSolved = null }) {
  const savedGame = readSavedGame();
  const [runtimeSeed, setRuntimeSeed] = useState(() => savedGame?.seed ?? seed ?? Math.floor(Math.random() * 1000000));
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);
  const [validateGrid, setValidateGrid] = useState(null);
  const [showFillButton, setShowFillButton] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [boardLoading, setBoardLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [boardKey, setBoardKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [startingGrid, setStartingGrid] = useState(() => isValidGridShape(savedGame?.grid) ? savedGame.grid : createEmptyGrid());
  const [savedGrid, setSavedGrid] = useState(() => isValidGridShape(savedGame?.grid) ? savedGame.grid : createEmptyGrid());
  const [saveNoticeVisible, setSaveNoticeVisible] = useState(false);
  const saveNoticeTimeoutRef = useRef(null);
  const solvedPuzzleKeysRef = useRef(readSolvedPuzzleKeys());
  const solveRequestInFlightRef = useRef(false);

  async function markPuzzleSolved() {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Failed to load current user:", userError.message);
      return false;
    }

    const userId = userData?.user?.id;

    if (!userId) {
      console.error("Failed to update solved count: no authenticated user.");
      return false;
    }

    const { data, error } = await supabase.rpc("increment_puzzles_solved");

    if (error) {
      console.error("Failed to update solved count:", error.message);
      return false;
    }

    console.log("New solved count:", data);
    return true;
  }

  useEffect(() => {
    onLoadingChange && onLoadingChange(initialLoading);
  }, [initialLoading, onLoadingChange]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (initialLoading || boardLoading) return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          seed: runtimeSeed,
          grid: savedGrid,
        })
      );
    } catch (error) {
      console.error(error);
    }
  }, [runtimeSeed, savedGrid, initialLoading, boardLoading]);

  useEffect(() => {
    return () => {
      if (saveNoticeTimeoutRef.current) {
        clearTimeout(saveNoticeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setBoardLoading(true);
      onLoadingStatusChange && onLoadingStatusChange("Loading Sudoku runtime…");
      const pyodide = await loadPyodideAndSudoku({ onStatusChange: onLoadingStatusChange });
      if (cancelled) return;

      onLoadingStatusChange && onLoadingStatusChange("Generating puzzle…");
      const puzzleJson = await pyodide.runPythonAsync(
        `import json\njson.dumps(generate_sudoku_puzzle(empty_cells=${emptyCells}, seed=${runtimeSeed}).tolist())`
      );
      if (cancelled) return;

      const jsPuzzle = JSON.parse(puzzleJson);
      setPuzzle(jsPuzzle);
      onLoadingStatusChange && onLoadingStatusChange("Solving puzzle…");
      const solutionJson = await pyodide.runPythonAsync(
        `import json, numpy as np\npuzzle_grid = np.array(json.loads('${puzzleJson.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'), dtype=int)\nsolver = ImprovedSudokuResolver(puzzle_grid)\nsolver.find_solution()\njson.dumps(solver.grid.tolist())`
      );
      if (cancelled) return;

      setSolution(JSON.parse(solutionJson));

      setValidateGrid(() => async (grid) => {
        const gridLiteral = JSON.stringify(grid).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
        const result = await pyodide.runPythonAsync(
          `import json\ncandidate_grid = json.loads('${gridLiteral}')\nis_valid_sudoku_grid(candidate_grid)`
        );
        return Boolean(result);
      });
      onLoadingStatusChange && onLoadingStatusChange("Ready.");
      setIsVisible(true);
      setBoardLoading(false);
      setInitialLoading(false);
      onLoadComplete && onLoadComplete(true);
    }

    init().catch((err) => {
      console.error(err);
      onLoadingStatusChange && onLoadingStatusChange("Failed to load Sudoku runtime.");
      setLoadError(err instanceof Error ? err.message : "Failed to load the user Sudoku board.");
      setBoardLoading(false);
      setInitialLoading(false);
      onLoadComplete && onLoadComplete(false);
    });

    return () => {
      cancelled = true;
    };
  }, [emptyCells, runtimeSeed, onLoadComplete]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "*" || event.code === "NumpadMultiply") {
        setShowFillButton((previous) => !previous);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (initialLoading || boardLoading || !solution) {
      return;
    }

    const puzzleKey = `${emptyCells}:${runtimeSeed}`;

    if (solvedPuzzleKeysRef.current.has(puzzleKey)) {
      return;
    }

    if (!isCompleteGrid(savedGrid) || solveRequestInFlightRef.current) {
      return;
    }

    let cancelled = false;

    async function recordSolvedPuzzle() {
      solveRequestInFlightRef.current = true;
      const isValidSolvedGrid = validateGrid ? await validateGrid(savedGrid) : false;

      if (!isValidSolvedGrid) {
        solveRequestInFlightRef.current = false;
        return;
      }

      const success = await markPuzzleSolved();

      solveRequestInFlightRef.current = false;

      if (cancelled) {
        return;
      }

      if (!success) {
        return;
      }

      onPuzzleSolved && onPuzzleSolved();
      solvedPuzzleKeysRef.current.add(puzzleKey);
      persistSolvedPuzzleKeys(solvedPuzzleKeysRef.current);
    }

    recordSolvedPuzzle();

    return () => {
      cancelled = true;
    };
  }, [emptyCells, initialLoading, boardLoading, runtimeSeed, savedGrid, solution, onPuzzleSolved, validateGrid]);

  function handleClearBoard() {
    const emptyGrid = createEmptyGrid();
    setStartingGrid(emptyGrid);
    setSavedGrid(emptyGrid);
    setBoardKey((k) => k + 1);
    setIsFilled(false);
  }

  function handleNewGame() {
    setIsVisible(false);
    setBoardLoading(true);
    setIsFilled(false);
    setLoadError(null);
    const nextSeed = Math.floor(Math.random() * 1000000);
    const emptyGrid = createEmptyGrid();
    setStartingGrid(emptyGrid);
    setSavedGrid(emptyGrid);
    setRuntimeSeed(nextSeed);
    setBoardKey((k) => k + 1);
  }

  function confirmPendingAction() {
    if (pendingAction === "clear") {
      handleClearBoard();
    }

    if (pendingAction === "new") {
      handleNewGame();
    }

    setPendingAction(null);
  }

  function requestAction(action) {
    if (boardLoading || pendingAction) {
      return;
    }

    setPendingAction(action);
  }

  function handleRetry() {
    setLoadError(null);
    setIsVisible(false);
    setInitialLoading(true);
    setBoardLoading(true);
    setIsFilled(false);
    setValidateGrid(null);
    setPuzzle(null);
    setSolution(null);
    setStartingGrid(createEmptyGrid());
    setSavedGrid(createEmptyGrid());
    setBoardKey((k) => k + 1);
    setRuntimeSeed(Math.floor(Math.random() * 1000000));
    onLoadComplete && onLoadComplete(false);
  }

  function handleBoardChange(nextGrid) {
    setSavedGrid(nextGrid);

    if (isCompleteGrid(nextGrid)) {
      if (saveNoticeTimeoutRef.current) {
        clearTimeout(saveNoticeTimeoutRef.current);
        saveNoticeTimeoutRef.current = null;
      }

      setSaveNoticeVisible(false);
      return;
    }

    if (initialLoading || boardLoading) {
      return;
    }

    setSaveNoticeVisible(true);
    if (saveNoticeTimeoutRef.current) {
      clearTimeout(saveNoticeTimeoutRef.current);
    }

    saveNoticeTimeoutRef.current = setTimeout(() => {
      setSaveNoticeVisible(false);
      saveNoticeTimeoutRef.current = null;
    }, 1200);
  }

  return (
    <>
      <section className="mb-0">
        <div className="mx-auto w-full max-w-lg py-6">
          {loadError ? (
            <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-950/30 p-4 text-sm text-red-100">
              <p className="font-semibold">User Sudoku could not load.</p>
              <p className="mt-1 text-red-200/90">{loadError}</p>
              <button
                type="button"
                className="mt-3 rounded-md border border-red-400/40 bg-red-500/10 px-4 py-2 font-semibold text-red-100 transition hover:bg-red-500/20"
                onClick={handleRetry}
              >
                Retry
              </button>
            </div>
          ) : null}
          <div className="relative pb-38 sm:pb-0">
            <div className="aspect-square w-full rounded-lg border border-purple-700/40 bg-black/80 shadow-[0_0_40px_rgba(168,85,247,0.1)] opacity-0" aria-hidden="true" />
            <div className={`absolute inset-0 transition-opacity duration-300 ease-out ${isVisible && !boardLoading ? "opacity-100" : "opacity-0"}`}>
              {boardLoading ? null : (
                <SudokuBoardBase
                  key={boardKey}
                  puzzle={puzzle}
                  solution={isFilled ? solution : null}
                  initialGrid={startingGrid}
                  validateGrid={validateGrid}
                  onChange={handleBoardChange}
                  statusOverride={saveNoticeVisible ? "Progress Saved" : null}
                  validMessage="Great job! This is a valid sudoku board."
                />
              )}
            </div>
          </div>
        </div>
      </section>
      {!initialLoading ? (
        <div className="mt-0 flex flex-col items-stretch gap-3 md:mt-4 md:flex-row md:items-center md:justify-center">
          {showFillButton ? (
            <button
              type="button"
              className="z-50 inline-flex cursor-pointer items-center justify-center rounded-md border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
              onClick={() => setIsFilled(true)}
            >
              Fill User Sudoku
            </button>
          ) : null}

          <button
            type="button"
            className="z-50 inline-flex items-center justify-center rounded-md border border-purple-600/40 bg-zinc-900/60 px-4 py-2 text-sm font-semibold text-purple-200 transition hover:bg-zinc-800 cursor-pointer"
            onClick={() => requestAction("clear")}
          >
            Clear Board
          </button>

          <button
            type="button"
            className="z-50 inline-flex items-center justify-center rounded-md border border-purple-600/40 bg-zinc-900/60 px-4 py-2 text-sm font-semibold text-purple-200 transition hover:bg-zinc-800 cursor-pointer"
            onClick={() => requestAction("new")}
          >
            New Game
          </button>
        </div>
      ) : null}
      {pendingAction ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-purple-500/30 bg-zinc-950/90 p-5 text-left shadow-[0_0_40px_rgba(168,85,247,0.18)]">
            <div className="mb-4">
              <h3 className="text-base font-semibold text-purple-100">Are you sure?</h3>
              <p className="mt-1 text-sm text-gray-300">
                {pendingAction === "clear"
                  ? "This will clear your current progress on the user puzzle."
                  : "This will start a new puzzle and replace the current board."}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                className="rounded-md border border-purple-800/60 bg-purple-900 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-purple-900"
                onClick={() => setPendingAction(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-md border border-purple-500/40 bg-zinc-950 px-4 py-2 text-sm font-semibold text-purple-100 transition hover:bg-purple-700/30"
                onClick={confirmPendingAction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {!initialLoading ? (
        <section id="instructions" className="my-12">
        <h2 className="mb-3 text-lg font-semibold uppercase tracking-wider text-purple-200/95">How to Play</h2>
        <div className="mb-4 h-0.5 w-20 rounded bg-gradient-to-r from-purple-500 via-purple-400 to-transparent" />
        <ol className="list-decimal space-y-3 pl-6">
          <li className="text-base text-gray-200">Fill each 3x3 box, row, and column with the numbers 1 through 9 exactly once.</li>
          <li className="text-base text-gray-200">Click into a cell to type a number, or use the provided controls on mobile.</li>
        </ol>
      </section>
      ) : null}
    </>
  );
}
