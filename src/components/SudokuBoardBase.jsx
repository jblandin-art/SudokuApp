"use client";
import { useEffect, useRef, useState } from "react";

export default function SudokuBoardBase({ puzzle = null, solution = null, validateGrid = null, onChange = null, readOnly = false, allCellsReadOnly = false, revealCells = [], visibleCells = null, validMessage = "Valid Sudoku board.", showValidationState = true, forceHiddenValues = false, showMobileTapHint = true, showMobileKeypad = true, onLoadComplete = null, initialGrid = null, statusOverride = null }) {
  const emptyGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
  const [grid, setGrid] = useState(emptyGrid);
  const [boardValid, setBoardValid] = useState(null);
  const [isMobileInputMode, setIsMobileInputMode] = useState(false);
  const [activeCell, setActiveCell] = useState(null);
  const inputRefs = useRef(Array.from({ length: 9 }, () => Array(9).fill(null)));
  const [conflicts, setConflicts] = useState(new Set());

  useEffect(() => {
    if (!puzzle) return;
    const normalized = Array.from({ length: 9 }, (_, r) =>
      Array.from({ length: 9 }, (_, c) => {
        const puzzleValue = puzzle[r]?.[c];
        const solutionValue = solution?.[r]?.[c];
        const parsedPuzzleValue = typeof puzzleValue === "number" ? puzzleValue : parseInt(puzzleValue) || 0;
        const parsedSolutionValue = typeof solutionValue === "number" ? solutionValue : parseInt(solutionValue) || 0;
        return parsedPuzzleValue > 0 ? parsedPuzzleValue : parsedSolutionValue;
      })
    );
    const restored = Array.isArray(initialGrid) && initialGrid.length === 9
      ? Array.from({ length: 9 }, (_, r) =>
          Array.from({ length: 9 }, (_, c) => {
            const puzzleValue = puzzle[r]?.[c];
            const solutionValue = solution?.[r]?.[c];
            const parsedPuzzleValue = typeof puzzleValue === "number" ? puzzleValue : parseInt(puzzleValue) || 0;
            const parsedSolutionValue = typeof solutionValue === "number" ? solutionValue : parseInt(solutionValue) || 0;
            const initialValue = initialGrid[r]?.[c];
            const parsedInitialValue = typeof initialValue === "number" ? initialValue : parseInt(initialValue) || 0;
            if (parsedPuzzleValue > 0) return parsedPuzzleValue;
            if (parsedInitialValue > 0) return parsedInitialValue;
            return parsedSolutionValue > 0 ? parsedSolutionValue : 0;
          })
        )
      : normalized;

    setGrid(restored);
  }, [puzzle, solution, initialGrid]);

  useEffect(() => {
    let cancelled = false;

    async function checkGrid() {
      if (!validateGrid) {
        setBoardValid(null);
        return;
      }

      if (grid.some((row) => row.some((value) => value === 0))) {
        setBoardValid(null);
        return;
      }

      try {
        const isValid = await validateGrid(grid);
        if (!cancelled) {
          setBoardValid(Boolean(isValid));
        }
      } catch (error) {
        if (!cancelled) {
          setBoardValid(false);
        }
      }
    }

    checkGrid();

    return () => {
      cancelled = true;
    };
  }, [grid, validateGrid]);

  // Compute per-cell conflicts (duplicate values in same row/col/box)
  useEffect(() => {
    const newConflicts = new Set();

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const val = grid[r]?.[c] || 0;
        if (!val) continue;

        // Row duplicates
        for (let cc = 0; cc < 9; cc++) {
          if (cc === c) continue;
          if ((grid[r]?.[cc] || 0) === val) {
            newConflicts.add(`cell-${r}-${c}`);
            newConflicts.add(`cell-${r}-${cc}`);
          }
        }

        // Column duplicates
        for (let rr = 0; rr < 9; rr++) {
          if (rr === r) continue;
          if ((grid[rr]?.[c] || 0) === val) {
            newConflicts.add(`cell-${r}-${c}`);
            newConflicts.add(`cell-${rr}-${c}`);
          }
        }

        // Box duplicates
        const br = Math.floor(r / 3) * 3;
        const bc = Math.floor(c / 3) * 3;
        for (let rr = br; rr < br + 3; rr++) {
          for (let cc = bc; cc < bc + 3; cc++) {
            if (rr === r && cc === c) continue;
            if ((grid[rr]?.[cc] || 0) === val) {
              newConflicts.add(`cell-${r}-${c}`);
              newConflicts.add(`cell-${rr}-${cc}`);
            }
          }
        }
      }
    }

    setConflicts(newConflicts);
  }, [grid]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const updateInputMode = () => {
      setIsMobileInputMode(mediaQuery.matches || (navigator.maxTouchPoints || 0) > 0);
    };

    updateInputMode();
    mediaQuery.addEventListener("change", updateInputMode);

    return () => {
      mediaQuery.removeEventListener("change", updateInputMode);
    };
  }, []);

  useEffect(() => {
    if (readOnly || !isMobileInputMode) {
      setActiveCell(null);
    }
  }, [readOnly, isMobileInputMode]);

  function handleCellChange(r, c, value) {
    const v = value.replace(/[^0-9]/g, "").slice(0, 1);
    const num = v === "" ? 0 : Number(v);
    applyCellValue(r, c, num);
  }

  function applyCellValue(r, c, num) {
    const next = grid.map((row) => row.slice());
    next[r][c] = num;
    setGrid(next);
    if (onChange) onChange(next);
  }

  function focusCell(r, c) {
    const input = inputRefs.current[r]?.[c];
    if (input) {
      input.focus({ preventScroll: true });
    }
  }

  function moveCell(r, c, rowDelta, colDelta) {
    const nextRow = Math.max(0, Math.min(8, r + rowDelta));
    const nextCol = Math.max(0, Math.min(8, c + colDelta));
    setActiveCell({ r: nextRow, c: nextCol });
    focusCell(nextRow, nextCol);
  }

  function handleCellKeyDown(event, r, c, isPrefilled) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveCell(r, c, -1, 0);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveCell(r, c, 1, 0);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveCell(r, c, 0, -1);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveCell(r, c, 0, 1);
      return;
    }

    if ((event.key === "Backspace" || event.key === "Delete") && !isPrefilled) {
      event.preventDefault();
      applyCellValue(r, c, 0);
    }
  }

  const displayBoardValid = showValidationState ? boardValid : null;
  const displayStatusText = statusOverride ?? (displayBoardValid === null ? "" : displayBoardValid ? validMessage : "There is a conflict in the board.");
  const displayStatusClass = statusOverride
    ? "text-emerald-400"
    : displayBoardValid === false
      ? "text-red-300"
      : displayBoardValid
        ? "text-purple-300"
        : "text-purple-300/80";

  return (
    <div className="mx-auto max-w-md sm:max-w-lg">
      <div className="relative">
        <div
          className={`grid w-full grid-cols-9 gap-0 rounded-lg overflow-hidden bg-black/80 border shadow-[0_0_40px_rgba(168,85,247,0.1)] ${displayBoardValid === false ? "border-red-500/50" : "border-purple-700/40"}`}
        >
          {grid.map((row, r) =>
            row.map((val, c) => {
              const isPrefilled = puzzle && (puzzle[r]?.[c] || 0) > 0;
              const cellKey = `cell-${r}-${c}`;
              const rightBorder = (c + 1) % 3 === 0 && c !== 8 ? "border-r-2 border-purple-700/40" : "border-r border-purple-700/20";
              const bottomBorder = (r + 1) % 3 === 0 && r !== 8 ? "border-b-2 border-purple-700/40" : "border-b border-purple-700/20";
              const correctnessClass = displayBoardValid === false
                ? "text-red-100 bg-red-500/15"
                : displayBoardValid
                  ? "text-emerald-300 bg-emerald-900/35"
                  : "text-purple-50";

              const isRevealed = revealCells && revealCells.includes(cellKey);
              const isVisible = !Array.isArray(visibleCells) || visibleCells.includes(cellKey) || isPrefilled;
              const shouldHideValue = forceHiddenValues && !readOnly;
              const isLockedCell = isPrefilled || readOnly || allCellsReadOnly;
              const isActiveMobileCell = activeCell?.r === r && activeCell?.c === c;
              const activeBoxRow = activeCell ? Math.floor(activeCell.r / 3) : -1;
              const activeBoxCol = activeCell ? Math.floor(activeCell.c / 3) : -1;
              const isInSameBox = activeCell && Math.floor(r / 3) === activeBoxRow && Math.floor(c / 3) === activeBoxCol;
              const isInSameRow = activeCell && activeCell.r === r && activeCell.c !== c;
              const isInSameCol = activeCell && activeCell.c === c && activeCell.r !== r;

              const conflictClass = conflicts.has(cellKey) ? "text-red-100 bg-red-500/25 ring-1 ring-red-400/60" : "";

              return (
                <div
                  key={cellKey}
                  className={`relative grid aspect-square w-full place-items-center bg-black/95 transition-colors duration-500 ease-out ${conflictClass} ${correctnessClass} ${rightBorder} ${bottomBorder} ${isInSameBox && !isActiveMobileCell ? "ring-1 ring-purple-300/50 ring-inset" : ""} ${(isInSameRow || isInSameCol) && !isInSameBox && !isActiveMobileCell ? "ring-1 ring-purple-300/35 ring-inset" : ""} ${isActiveMobileCell ? "ring-2 ring-purple-300/90 ring-inset" : ""} ${isRevealed ? 'sudoku-reveal' : ''}`}
                >
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                    <span className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-[1.75rem] sm:text-[2.25rem] font-bold leading-none select-none transition-opacity duration-700 ${isVisible && !shouldHideValue ? "opacity-100" : "opacity-0"}`}>
                      {val === 0 ? "" : String(val)}
                    </span>
                    {isLockedCell ? null : (
                      <input
                        ref={(node) => {
                          inputRefs.current[r][c] = node;
                        }}
                        type="text"
                        inputMode={isMobileInputMode ? "none" : "numeric"}
                        pattern="[0-9]*"
                        maxLength={1}
                        autoComplete="off"
                        autoCapitalize="characters"
                        readOnly={readOnly || isMobileInputMode}
                        tabIndex={0}
                        aria-label={`r${r}c${c}`}
                        className={`absolute inset-0 z-20 h-full w-full appearance-none border-0 bg-transparent p-0 text-center text-[1.75rem] sm:text-[2.25rem] leading-none outline-none caret-white opacity-0 ${isMobileInputMode ? "cursor-pointer" : "focus:opacity-100 focus:text-transparent"}`}
                        value={val === 0 ? "" : String(val)}
                        onClick={isMobileInputMode ? (e) => {
                          e.preventDefault();
                          setActiveCell({ r, c });
                        } : undefined}
                        onTouchStart={isMobileInputMode ? (e) => {
                          e.preventDefault();
                          setActiveCell({ r, c });
                          inputRefs.current[r]?.[c]?.focus({ preventScroll: true });
                        } : undefined}
                        onTouchMove={isMobileInputMode ? (e) => {
                          e.preventDefault();
                        } : undefined}
                        onTouchCancel={isMobileInputMode ? (e) => {
                          e.preventDefault();
                          setActiveCell(null);
                        } : undefined}
                        onTouchEnd={isMobileInputMode ? (e) => {
                          e.preventDefault();
                        } : undefined}
                        onFocus={() => {
                          setActiveCell({ r, c });
                        }}
                        onKeyDown={(event) => handleCellKeyDown(event, r, c, isPrefilled)}
                        onChange={(e) => handleCellChange(r, c, e.target.value)}
                      />
                    )}
                  </div>
                </div>
              );
            })
          )}
          {//Put AI <p> element here.
          }
          {allCellsReadOnly ? <p
            className={`absolute -top-4 right-2 text-xs lg:mt-1 lg:top-auto lg:-bottom-5 lg:-left-0 transition-opacity duration-500 ease-out ${displayStatusText ? "opacity-100" : "opacity-0"} ${displayStatusText ? displayStatusClass: "text-emerald-400"} `}
          >
            {displayStatusText || "Progress Saved"}
          </p> : null
          }
        </div>

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-lg border border-emerald-900/80 transition-opacity transition-colors duration-500 ease-out ${displayBoardValid ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {!allCellsReadOnly ? <p
        className={`absolute -top-4 right-2 text-xs -mt-px lg:mt-1 lg:top-0 lg:static transition-opacity duration-500 ease-out ${displayStatusText ? "opacity-100" : "opacity-0"} ${displayStatusText ? displayStatusClass: "text-emerald-400"} `}
      >
        {displayStatusText || "Progress Saved"}
      </p> : null
      }

      {showMobileKeypad && isMobileInputMode && !readOnly ? (
        <section className="mt-4 rounded-lg border border-purple-700/60 bg-black/75 p-3">
          {activeCell || showMobileTapHint ? (
            <p className="mb-2 text-center text-xs uppercase tracking-widest text-purple-200">
              {activeCell ? `Cell r${activeCell.r + 1} c${activeCell.c + 1}` : "Tap a cell to enter a value"}
            </p>
          ) : null}
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button
                key={`key-${n}`}
                type="button"
                className="rounded-md border border-purple-600/70 bg-slate-900/90 py-2 text-sm font-semibold text-purple-50 transition hover:border-purple-400 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-55"
                onClick={() => {
                  if (!activeCell) return;
                  applyCellValue(activeCell.r, activeCell.c, n);
                  focusCell(activeCell.r, activeCell.c);
                }}
                disabled={!activeCell}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              className="rounded-md border border-purple-600/70 bg-slate-900/90 py-2 text-xs font-semibold uppercase tracking-wide text-purple-50 transition hover:border-purple-400 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-55"
              onClick={() => {
                if (!activeCell) return;
                applyCellValue(activeCell.r, activeCell.c, 0);
                focusCell(activeCell.r, activeCell.c);
              }}
              disabled={!activeCell}
            >
              Clear
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
