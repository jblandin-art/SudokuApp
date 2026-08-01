"use client";
import { useState } from "react";

const STICK_WIDTH = 40;
const STICK_HEIGHT = 110;
import { NimLogic } from "./nim-logic.jsx";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function NimBoard() {
  const [ready, setReady] = useState(false);

  return (
    <>
    <NimLogic setReady={setReady} />
    <div className="mb-6 flex items-center gap-4">
        <div id="status-break-1" className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
        <p id="status" className="text-lg font-semibold uppercase tracking-[0.45em] text-yellow-300">
          GAME LOADING
        </p>
        <div id="status-break-2" className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
      </div>
    <div id="game-board" className={`relative ${ready ? '' : 'hidden'}`}>
        <button id="ai-turn-button-mobile" className="z-50 min-w-40 max-h-10 hidden mb-4 w-full rounded-lg border border-red-600/60 bg-red-950/60 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-red-300 transition hover:border-red-500/70 hover:bg-red-900/60 hover:text-red-200 sm:hidden">
          Trigger AI Turn
        </button>
        <button id="ai-turn-button" className="z-50 absolute left-0 top-1/2 -translate-y-1/2 rounded-lg border border-red-600/60 bg-red-950/60 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-red-300 transition hover:border-red-500/70 hover:bg-red-900/60 hover:text-red-200">
          AI Turn
        </button>
        <div id="rows-container" className="flex flex-col gap-14 p-0 m-0">

          <section id="row1" className="flex justify-center items-center relative">
            <div className="mx-auto inline-flex w-fit items-center justify-center gap-1">
              <div className="stick">
                <Image src={`${basePath}/Glowstick1.png`} alt="Stick" width={STICK_WIDTH} height={STICK_HEIGHT} className="w-[25px] sm:w-[40px] h-auto block" />
              </div>
            </div>
            <button id="remove-stick-1" className="absolute right-0 top-1/2 -translate-y-1/2 rounded-lg border border-purple-700/40 bg-purple-950/40 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-purple-300 transition hover:border-purple-500/60 hover:bg-purple-900/50 hover:text-purple-200 hidden sm:inline-flex">
              Remove
            </button>
            <button id="remove-stick-1-mobile" className="absolute right-0 top-1/2 -translate-y-1/2 rounded-lg border border-purple-700/40 bg-purple-950/40 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-purple-300 transition hover:border-purple-500/60 hover:bg-purple-900/50 hover:text-purple-200 sm:hidden">
              Take
            </button>
          </section>

          <section id="row2" className="flex justify-center items-center relative">
            <div className="mx-auto inline-flex w-fit items-center justify-center gap-1">
              {[...Array(3)].map((_, i) => (
                <div className="stick" key={i}>
                  <Image src={`${basePath}/Glowstick1.png`} alt="Stick" width={STICK_WIDTH} height={STICK_HEIGHT} className="w-[25px] sm:w-[40px] h-auto block" />
                </div>
              ))}
            </div>
            <button id="remove-stick-2" className="absolute right-0 top-1/2 -translate-y-1/2 rounded-lg border border-purple-700/40 bg-purple-950/40 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-purple-300 transition hover:border-purple-500/60 hover:bg-purple-900/50 hover:text-purple-200 hidden sm:inline-flex">
              Remove
            </button>
            <button id="remove-stick-2-mobile" className="absolute right-0 top-1/2 -translate-y-1/2 rounded-lg border border-purple-700/40 bg-purple-950/40 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-purple-300 transition hover:border-purple-500/60 hover:bg-purple-900/50 hover:text-purple-200 sm:hidden">
              Take
            </button>
          </section>

          <section id="row3" className="flex justify-center items-center relative">
            <div className="mx-auto inline-flex w-fit items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div className="stick" key={i}>
                  <Image src={`${basePath}/Glowstick1.png`} alt="Stick" width={STICK_WIDTH} height={STICK_HEIGHT} className="w-[25px] sm:w-[40px] h-auto block" />
                </div>
              ))}
            </div>
            <button id="remove-stick-3" className="absolute right-0 top-1/2 -translate-y-1/2 rounded-lg border border-purple-700/40 bg-purple-950/40 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-purple-300 transition hover:border-purple-500/60 hover:bg-purple-900/50 hover:text-purple-200 hidden sm:inline-flex">
              Remove
            </button>
            <button id="remove-stick-3-mobile" className="absolute right-0 top-1/2 -translate-y-1/2 rounded-lg border border-purple-700/40 bg-purple-950/40 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-purple-300 transition hover:border-purple-500/60 hover:bg-purple-900/50 hover:text-purple-200 sm:hidden">
              Take
            </button>
          </section>

          <section id="row4" className="flex justify-center items-center relative">
            <div className="mx-auto inline-flex w-fit items-center justify-center gap-1">
              {[...Array(7)].map((_, i) => (
                <div className="stick" key={i}>
                  <Image src={`${basePath}/Glowstick1.png`} alt="Stick" width={STICK_WIDTH} height={STICK_HEIGHT} className="w-[25px] sm:w-[40px] h-auto block" />
                </div>
              ))}
            </div>
            <button id="remove-stick-4" className="absolute right-0 top-1/2 -translate-y-1/2 rounded-lg border border-purple-700/40 bg-purple-950/40 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-purple-300 transition hover:border-purple-500/60 hover:bg-purple-900/50 hover:text-purple-200 hidden sm:inline-flex">
              Remove
            </button>
            <button id="remove-stick-4-mobile" className="absolute right-0 top-1/2 -translate-y-1/2 rounded-lg border border-purple-700/40 bg-purple-950/40 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-purple-300 transition hover:border-purple-500/60 hover:bg-purple-900/50 hover:text-purple-200 sm:hidden">
              Take
            </button>
          </section>

        </div>
      </div>
      </>
  );
}