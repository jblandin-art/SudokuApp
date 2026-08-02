"use client";

import { useState, useEffect } from "react";
import Link from 'next/link'
import SudokuScrollReset from './scroll-reset'
import SudokuContent from './sudoku-content'


const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata = {
    title: "Play Sudoku | Josiah Blanding",
    description:
        "An in-browser Sudoku experience using Pyodide for puzzle generation and solving, with an AI reveal mode.",
};

export default function SudokuPage() {
    const [loaded, setLoaded] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState("Preparing the in-browser Sudoku runtime…");
    const [puzzlesSolved, setPuzzlesSolved] = useState<number | null>(null);
    useEffect(() => {
    setMounted(true);
}, []);

    return (
        <>
            <SudokuScrollReset />
            <main className="mx-auto max-w-5xl py-8 sm:py-10 text-gray-200">
                <header className="">

                </header>
                {!loaded && (
                    <div className="mx-auto max-w-5xl py-6">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500/40 nim-loading-flash to-transparent" />
                            <p className="text-xl font-semibold uppercase tracking-[0.45em] nim-loading-flash text-yellow-300">LOADING PUZZLE</p>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500/40 nim-loading-flash to-transparent" />
                        </div>
                        <p className="mx-auto max-w-2xl text-center text-sm leading-6 text-yellow-100/80">
                            {loadingStatus}
                        </p>
                    </div>
                )}

                                {mounted && (
                                    <SudokuContent
                                        onLoadComplete={setLoaded}
                                        onLoadingStatusChange={setLoadingStatus}
                                        onPuzzleSolved={() => setPuzzlesSolved((previous) => Number(previous ?? 0) + 1)}
                                        puzzlesSolved={puzzlesSolved}
                                        setPuzzlesSolved={setPuzzlesSolved}
                                    />
                                )}             
            </main>
        </>
    );
}