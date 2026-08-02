import SudokuPageClient from './sudoku-page-client'
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Play Sudoku | Josiah Blanding",
    description:
        "An in-browser Sudoku experience using Pyodide for puzzle generation and solving, with an AI reveal mode.",
};

export default function SudokuPage() {
    return <SudokuPageClient />;
}