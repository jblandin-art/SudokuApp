"use client";

import { useEffect, useState } from "react";
import UserSudokuBoard from "../components/UserSudokuBoard";
import AISudokuBoard from "../components/AISudokuBoard";

interface SudokuContentProps {
  onLoadComplete: React.Dispatch<React.SetStateAction<boolean>>;
  onLoadingStatusChange: React.Dispatch<React.SetStateAction<string>> | null;
  onPuzzleSolved: React.Dispatch<React.SetStateAction<number | null>> | null;
  puzzlesSolved: number | null;
  setPuzzlesSolved: React.Dispatch<React.SetStateAction<number | null>>;
}
export default function SudokuContent({ onLoadComplete, onLoadingStatusChange = null, onPuzzleSolved = null, puzzlesSolved, setPuzzlesSolved }: SudokuContentProps) {
  const [aiLoading, setAiLoading] = useState(true);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [userLoadingStatus, setUserLoadingStatus] = useState("Loading Sudoku runtime…");
  const [aiLoadingStatus, setAiLoadingStatus] = useState("Loading AI Sudoku runtime…");

  useEffect(() => {
    if (!onLoadingStatusChange) {
      return;
    }

    onLoadingStatusChange(userLoading ? userLoadingStatus : "");
  }, [onLoadingStatusChange, userLoading, userLoadingStatus]);

  return (
    <>
      <div className={`mb-0 transition-opacity duration-300 ease-out ${userLoading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <div className="mx-auto max-w-5xl py-6">
          <div className="mb-0 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
            <p className="text-xl font-semibold uppercase tracking-[0.45em] text-purple-300">PLAY SUDOKU</p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
          </div>
        </div>
      </div>

      <UserSudokuBoard
        emptyCells={45}
        onLoadComplete={onLoadComplete}
        onLoadingChange={setUserLoading}
        onLoadingStatusChange={setUserLoadingStatus}
        puzzlesSolved={puzzlesSolved}
        setPuzzlesSolved={setPuzzlesSolved}
        onPuzzleSolved={
          onPuzzleSolved
            ? () => onPuzzleSolved((previous) => Number(previous ?? 0) + 1)
            : undefined
        }
      />
{/*
      <div className={`mb-6 transition-opacity duration-300 ease-out ${aiLoading ? "opacity-0" : "opacity-100"}`}>
        <p className="text-sm font-semibold uppercase tracking-widest text-purple-300">AI Sudoku</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
          <p className="text-xl font-semibold uppercase tracking-[0.45em] text-purple-300">SUDOKU PUZZLE</p>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
        </div>
      </div>*/
      }

      <div className={`transition-opacity duration-300 ease-out ${aiLoading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <div className="mb-2 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
          <p className="text-xl font-semibold uppercase tracking-[0.45em] text-purple-300">AI SUDOKU</p>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
        </div>
        <p className="text-xs text-center text-gray-500 font-medium max-w-md mx-auto leading-snug">
          Watch my AI algorithm solve randomly generated sudoku puzzles in real time.
        </p>
      </div>

      <AISudokuBoard
        onLoadingChange={setAiLoading}
        onLoadingStatusChange={setAiLoadingStatus}
      />
      </>
  );
}