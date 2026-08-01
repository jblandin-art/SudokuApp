"use client";

import { useState, useEffect } from "react";
import Link from 'next/link'
import SudokuScrollReset from './scroll-reset'
import SudokuContent from './sudoku-content'
import AuthWidget from "@/components/AuthWidget.jsx";


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
    const [puzzlesSolved, setPuzzlesSolved] = useState(null);
    useEffect(() => {
    setMounted(true);
}, []);

    return (
        <>
            <SudokuScrollReset />
            <main className="mx-auto max-w-5xl py-8 sm:py-10 text-gray-200">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center rounded-md border border-purple-500/70 bg-zinc-900/60 px-4 py-2 text-sm text-purple-100 transition hover:border-purple-400 hover:bg-zinc-800"
                    >
                        Back to Portfolio
                    </Link>
                </div>

                <header className="">
                    <p className="text-sm font-semibold uppercase tracking-widest text-purple-300">Case Study</p>
                    <h1 className="mt-2 max-w-3xl text-3xl font-bold font-poppins leading-tight text-purple-400 sm:text-4xl lg:text-5xl">
                        Sudoku - AI Solving Algorithm + Interactive Game Build
                    </h1>
                    <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-300">
                        This is a complete, deployment-ready implementation of a web Sudoku application. It's complete with autosave functionality and an extremely modern User Interface. Below you'll notice another Sudoku board that utilizes an AI algorithm to solve sudoku puzzles. The project was originally built in Python, so I utilized Pyodide to run the code directly in the browser, and I used it's output to influence the DOM. The UI utilizes React and Tailwind CSS and it optimized for both mobile and desktops. 
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
                            <p className="text-xs uppercase tracking-wide text-purple-300">Role</p>
                            <p className="mt-1 text-sm">Solo Developer</p>
                        </div>
                        <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
                            <p className="text-xs uppercase tracking-wide text-purple-300">Team</p>
                            <p className="mt-1 text-sm">1 developer</p>
                        </div>
                        <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
                            <p className="text-xs uppercase tracking-wide text-purple-300">Timeline</p>
                            <p className="mt-1 text-sm">7 Hours + 18 Hours (UI)</p>
                        </div>
                        <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
                            <p className="text-xs uppercase tracking-wide text-purple-300">Stack</p>
                            <p className="mt-1 text-sm">Python, Pyodide, React, Next.js</p>
                        </div>
                    </div>
                </header>


                {
                    //User registration and login section. 
                }
                <AuthWidget puzzlesSolved={puzzlesSolved} setPuzzlesSolved={setPuzzlesSolved} />
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
                                    />
                                )}             
            </main>
        </>
    );
}