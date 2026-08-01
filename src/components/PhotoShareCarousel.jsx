"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const FADE_MS = 220;

export default function PhotoShareCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!images || images.length === 0) {
    return null;
  }

  const transitionTo = (nextIndex) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set the next image immediately for smooth transitions
    setNextIndex(nextIndex);
    setIsVisible(false);
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsVisible(true);
      setNextIndex(null);
    }, FADE_MS);
  };

  const handlePrevious = () => {
    const nextIndex = (currentIndex - 1 + images.length) % images.length;
    transitionTo(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    transitionTo(nextIndex);
  };

  const displayIndex = nextIndex !== null ? nextIndex : currentIndex;
  const displayImage = images[displayIndex];

  return (
    <div className="mt-4 flex justify-center">
      <div className="relative w-[95%] overflow-hidden rounded-xl border border-purple-700/50 bg-zinc-900/60">
        <div className="relative aspect-video">
          <Image
            src={displayImage.src}
            alt={displayImage.alt}
            fill
            sizes="(max-width: 768px) 95vw, 900px"
            className={`object-contain bg-zinc-950/40 transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
            priority={currentIndex === 0}
          />
        </div>

        <button
          type="button"
          onClick={handlePrevious}
          aria-label="Previous screenshot"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md border border-purple-700/70 bg-zinc-900/55 p-2 text-purple-200 backdrop-blur-sm transition hover:bg-zinc-800/70 cursor-pointer"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next screenshot"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-purple-700/70 bg-zinc-900/55 p-2 text-purple-200 backdrop-blur-sm transition hover:bg-zinc-800/70 cursor-pointer"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => transitionTo(index)}
              aria-label={`Go to screenshot ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full border border-purple-600/80 transition cursor-pointer ${
                index === displayIndex ? "bg-purple-300" : "bg-purple-900/60 hover:bg-purple-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
