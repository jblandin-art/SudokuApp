import Link from 'next/link';
import Image from 'next/image';
import { NimLogic } from '../../../components/nim-logic.jsx';
import NimBoard from '../../../components/nimBoard.jsx';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata = {
  title: "Play Nim | Josiah Blanding",
  description:
    "A simple implementation of the game Nim. Play against an AI opponent that uses an Adversarial Search algorithm to find the optimal move. Designed with Next.js and Tailwind CSS.",
};

export default function NimPage() {
  return (
    <main className="mx-auto max-w-5xl py-8 sm:py-10 text-gray-200">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center rounded-md border border-purple-500/70 bg-zinc-900/70 px-4 py-2 text-sm text-purple-100 transition hover:border-purple-400 hover:bg-zinc-800"
        >
          Back to Portfolio
        </Link>
      </div>

      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-purple-300">Case Study</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-bold font-poppins leading-tight text-purple-400 sm:text-4xl lg:text-5xl">
          Nim - Adversarial Search Build
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-300">
          Nim is a simple turn-based game. Players take turns removing as many items as they'd like from one pile at a time. The player who takes the last pile loses. This project was fun to implement as I was very hands on with it's development. The AI opponent utilizes an Adversarial Minimax search algorithm to find the optimal move, in order to win you must utilize the optimal strategy of Nim.
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
            <p className="mt-1 text-sm">6 Hours + 8 Hours(UI)</p>
          </div>
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-purple-300">Stack</p>
            <p className="mt-1 text-sm">Python</p>
          </div>
        </div>
      </header>
      <NimBoard />
      <section id="instructions" className="mt-12">
        <h2 className="text-lg font-semibold text-purple-200/95 mb-3 tracking-wider uppercase">How to Play</h2>
        <div className="h-0.5 w-20 mb-4 bg-gradient-to-r from-purple-500 via-purple-400 to-transparent rounded" />
        <ol className="list-decimal pl-6 space-y-3">
          <li className="text-base text-gray-200">Either the player or the AI can make the first move.</li>
          <li className="text-base text-gray-200">To trigger an AI move, click the red "AI Move" button.</li>
          <li className="text-base text-gray-200">On your turn, remove as many items as you'd like from <span className="font-semibold">one pile at a time.</span></li>
          <li className="text-base text-gray-200">Whomever picks the last item loses.</li>
        </ol>
      </section>
      <section id="hints" className="mt-12">
        <h2 className="text-lg font-semibold text-purple-200/95 mb-3 tracking-wider uppercase">Hints</h2>
        <div className="h-0.5 w-20 mb-4 bg-gradient-to-r from-purple-500 via-purple-400 to-transparent rounded" />
        <ol className="list-decimal pl-6 space-y-3">
          <li className="text-base text-gray-200">If the AI is winning, pay attention to the state it leaves the board in. Particularly try to identify patterns of 1s, 2s, and/or 4s between piles. If you notice such patters, try to emulate them yourself to gain an advantage.</li>
          <li className="text-base text-gray-200">Read about the optimal strategy for Nim here: <a href="https://www.archimedes-lab.org/How_to_Solve/Win_at_Nim.html" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:underline">Archimedes Lab</a></li>
        </ol>
      </section>
    </main>

  )
}