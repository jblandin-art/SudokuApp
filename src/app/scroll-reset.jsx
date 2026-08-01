"use client";

import { useEffect } from "react";

export default function SudokuScrollReset() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.history.scrollRestoration = "manual";
    } catch {}

    const resetScroll = () => {
      window.scrollTo(0, 0);
    };

    resetScroll();
    window.requestAnimationFrame(resetScroll);

    return () => {};
  }, []);

  return null;
}