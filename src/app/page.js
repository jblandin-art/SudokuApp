import SudokuPageClient from './sudoku-page-client'

export const metadata = {
    title: "Play Sudoku | Josiah Blanding",
    description:
        "An in-browser Sudoku experience using Pyodide for puzzle generation and solving, with an AI reveal mode.",
};

export default function SudokuPage() {
    return <SudokuPageClient />;
}