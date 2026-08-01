"use client";
// ... existing imports
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/footer.jsx";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Home() {
    const [showMore, setShowMore] = useState(false);
    
    return (
        <>
        <main id="home" className="mx-auto max-w-5xl px-6 py-8 sm:py-10 text-gray-200">
            <header className="mb-4 space-y-2">
            <h1 className="text-3xl font-bold font-poppins mt-2 tracking-wide text-purple-400 mb-1">Josiah Blanding</h1>
            <p className="text-lg text-muted-foreground font-playfair italic mb-0">
                <span className="inline-flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                        <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1118 0z" />
                        <circle cx="12" cy="10" r="2.5" fill="currentColor" />
                    </svg>
                    Charlotte, NC
                </span>
            </p>
            <p className="text-lg text-muted-foreground font-playfair italic">
                <span className="inline-flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                        <path d="M3 4h18v12H3z" />
                        <path d="M8 20h8" />
                        <path d="M12 16v4" />
                    </svg>
                    Software Developer
                </span>
            </p>
            
            </header>
            <p className="font-sans text-gray-300 tracking-wide leading-8 max-w-2xl mt-2 text-lg">
                Welcome to my domain. I'm Josiah, someone who spends the majority of their time coding and the rest being a secret agent. In my glory days I was a digital creator and now I aspire to be a part of the creation process through software development.
            </p>
            <div className="mt-6 flex items-center gap-3">
                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/josiah-blanding" className="rounded-md border border-purple-700/60 bg-zinc-900/60 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:bg-zinc-800">LinkedIn</a>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/jblandin-art" className="rounded-md border border-purple-700/60 bg-zinc-900/60 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:bg-zinc-800">GitHub</a>
            </div>

            <section id="projects" className="mt-10 scroll-mt-20">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold font-poppins text-purple-400">Projects</h2>
                    <p className="text-sm text-muted-foreground mt-1">Four carefully selected builds that showcase experience in UX, data management, gameplay, and deployment. 
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <article className="group flex h-full flex-col rounded-2xl bg-gradient-to-br from-zinc-900/95 to-zinc-950/95 ring-1 ring-inset ring-purple-900/35 p-5 transition-colors duration-300 ease-in-out">
                        <div className="-mx-5 -mt-5 mb-4 overflow-hidden rounded-t-2xl bg-zinc-950/80 relative h-44">
                            <img
                                src={`${basePath}/sudoku-640w.png`}
                                srcSet={`${basePath}/sudoku-320w.png 320w, ${basePath}/sudoku-480w.png 480w, ${basePath}/sudoku-640w.png 640w, ${basePath}/sudoku-960w.png 960w, ${basePath}/sudoku-1280w.png 1280w, ${basePath}/sudoku-1920w.png 1920w`}
                                sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                                alt="Sudoku game preview"
                                className="absolute inset-0 h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl leading-tight font-poppins mt-2 tracking-normal text-purple-400">Sudoku</h3>
                        <p className="mt-1 text-base leading-6 text-zinc-300">AI Solving Algorithm + Interactive Game</p>
                        <div className="mt-2 mb-3 -translate-x-[3px] flex flex-wrap gap-2">
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">Python</span>
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">Pyodide</span>
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">React</span>
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">Next.js</span>
                        </div>
                        <div className="mt-auto pt-5 grid grid-cols-1 gap-2">
                            <Link href="/projects/sudoku#play" className="inline-flex w-full items-center justify-center rounded-md border border-purple-900/45 bg-zinc-900/60 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800/90 transition">Play Game</Link>
                        </div>
                    </article>
                    
                    <article className="group flex h-full flex-col rounded-2xl bg-gradient-to-br from-zinc-900/95 to-zinc-950/95 ring-1 ring-inset ring-purple-900/35 p-5 transition-colors duration-300 ease-in-out">
                        <div className="-mx-5 -mt-5 mb-4 overflow-hidden rounded-t-2xl bg-zinc-950/80">
                            <video className="h-44 w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={`${basePath}/NeuralEncodingDashboardSample.png`}>
                                <source src={`${basePath}/NeuralEncodingDashboardSample.mp4`} type="video/mp4" />
                            </video>
                        </div>
                        <h3 className="text-xl leading-tight font-poppins mt-2 tracking-normal text-purple-400">NeuralEncoding</h3>
                        <p className="mt-1 text-base leading-6 text-zinc-300">Brain Telemetry Dashboard</p>
                        <div className="mt-2 mb-3 -translate-x-[3px] flex flex-wrap gap-2">
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">Electron</span>
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">React</span>
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">Python</span>
                        </div>
                        <div className="mt-auto pt-5 grid grid-cols-2 gap-2">
                            <Link href="/projects/neural-encoding" className="inline-flex w-full items-center justify-center rounded-md border border-purple-900/45 bg-zinc-900/60 px-3 py-1.5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800">Case Study</Link>
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/jblandin-art/NeuralEncoding" className="inline-flex w-full items-center justify-center rounded-md border border-purple-900/45 bg-zinc-900/60 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800/90 transition">Code & Demo</a>
                        </div>
                    </article>

                    <article className="group flex h-full flex-col rounded-2xl bg-gradient-to-br from-zinc-900/95 to-zinc-950/95 ring-1 ring-inset ring-purple-900/35 p-5 transition-colors duration-300 ease-in-out">
                        <div className="-mx-5 -mt-5 mb-4 overflow-hidden rounded-t-2xl bg-zinc-950/80 relative h-44">
                            <img
                                src={`${basePath}/photo-app-comments-640w.png`}
                                srcSet={`${basePath}/photo-app-comments-320w.png 320w, ${basePath}/photo-app-comments-480w.png 480w, ${basePath}/photo-app-comments-640w.png 640w, ${basePath}/photo-app-comments-960w.png 960w, ${basePath}/photo-app-comments-1280w.png 1280w, ${basePath}/photo-app-comments-1920w.png 1920w`}
                                sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                                alt="PhotoShare details preview"
                                className="absolute inset-0 h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl leading-tight font-poppins mt-2 tracking-normal text-purple-400">PhotoShare</h3>
                        <p className="mt-1 text-base leading-6 text-zinc-300">Social Media Platform</p>
                        <div className="mt-2 mb-3 -translate-x-[3px] flex flex-wrap gap-2">
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">React</span>
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">Node</span>
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">MongoDB</span>
                        </div>
                        <div className="mt-auto pt-5 grid grid-cols-2 gap-2">
                            <Link href="/projects/photo-share" className="inline-flex w-full items-center justify-center rounded-md border border-purple-900/45 bg-zinc-900/60 px-3 py-1.5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800">Case Study</Link>
                            <Link href="/projects/photo-share#sprint-highlights" className="inline-flex w-full items-center justify-center rounded-md border border-purple-900/45 bg-zinc-900/60 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800/90 transition">Sprint Highlights</Link>
                        </div>
                    </article>

                    {/*
                    <article className="group rounded-2xl border border-purple-700/60 bg-gradient-to-br from-slate-900/80 to-purple-950/70 p-5 transition hover:-translate-y-1 hover:shadow-[0_15px_60px_-20px_rgba(80,0,200,0.3)]">
                        <div className="mb-4 flex items-center justify-between">
                            <span className="rounded-lg bg-purple-900/40 px-3 py-1 text-xs font-semibold text-purple-200">PostgreSQL + Bash</span>
                            <span className="text-xs text-muted-foreground">2026</span>
                        </div>
                        <h3 className="text-xl font-semibold text-purple-50">Periodic Table Database + Interactive CLI</h3>
                        <p className="mt-2 text-sm text-gray-300 leading-7">A relational database cleanup and scripting project where I repaired a legacy schema, normalized element types into a lookup table, enforced constraints and foreign keys, and built an executable Bash script that queries elements by atomic number, symbol, or name.</p>
                        <div className="mt-4 flex gap-2">
                            <Link href="/projects/periodic-table" className="rounded-md bg-purple-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-400 transition">Case Study</Link>
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/jblandin-art/Periodic-Table-Database" className="rounded-md border border-purple-500/70 px-3 py-1.5 text-sm text-purple-200 hover:bg-purple-800/50 transition">Code</a>
                        </div>
                    </article>
                    */}

                </div>

                {showMore && (
                    <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <article className="group flex h-full flex-col rounded-2xl bg-gradient-to-br from-zinc-900/95 to-zinc-950/95 ring-1 ring-inset ring-purple-900/35 p-5 transition-colors duration-300 ease-in-out">
                        <div className="-mx-5 -mt-5 mb-4 overflow-hidden rounded-t-2xl bg-zinc-950/80 relative h-44">
                            <img
                                src={`${basePath}/ig-metrics-onboarding-640w.png`}
                                srcSet={`${basePath}/ig-metrics-onboarding-320w.png 320w, ${basePath}/ig-metrics-onboarding-480w.png 480w, ${basePath}/ig-metrics-onboarding-640w.png 640w, ${basePath}/ig-metrics-onboarding-960w.png 960w, ${basePath}/ig-metrics-onboarding-1280w.png 1280w, ${basePath}/ig-metrics-onboarding-1920w.png 1920w`}
                                sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                                alt="IG Metrics onboarding preview"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl leading-tight font-poppins mt-2 tracking-normal text-purple-400">IG Metrics</h3>
                        <p className="mt-1 text-base leading-6 text-zinc-300">Desktop Analytics Application</p>
                        <div className="mt-2 mb-3 -translate-x-[3px] flex flex-wrap gap-2">
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">Electron</span>
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">React</span>
                        </div>
                        <div className="mt-auto pt-5 grid grid-cols-2 gap-2">
                            <Link href="/projects/ig-metrics" className="inline-flex w-full items-center justify-center rounded-md border border-purple-900/45 bg-zinc-900/60 px-3 py-1.5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800">Case Study</Link>
                            <a target="_blank" href="https://github.com/jblandin-art/instagram-metrics-app/releases/tag/v1.0.0" className="inline-flex w-full items-center justify-center rounded-md border border-purple-900/45 bg-zinc-900/60 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800/90 transition">Download</a>
                        </div>
                    </article>

                    <article className="group flex h-full flex-col rounded-2xl bg-gradient-to-br from-zinc-900/95 to-zinc-950/95 ring-1 ring-inset ring-purple-900/35 p-5 transition-colors duration-300 ease-in-out">
                        <div className="-mx-5 -mt-5 mb-4 overflow-hidden rounded-t-2xl bg-zinc-950/80 relative h-44">
                            <img
                                src={`${basePath}/nim-640w.png`}
                                srcSet={`${basePath}/nim-320w.png 320w, ${basePath}/nim-480w.png 480w, ${basePath}/nim-640w.png 640w, ${basePath}/nim-960w.png 960w, ${basePath}/nim-1280w.png 1280w, ${basePath}/nim-1920w.png 1920w`}
                                sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                                alt="Nim game preview"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl leading-tight font-poppins mt-2 tracking-normal text-purple-400">Nim</h3>
                        <p className="mt-1 text-base leading-6 text-zinc-300">AI Opponent Algorithm + Interactive Game</p>
                        <div className="mt-2 mb-3 -translate-x-[3px] flex flex-wrap gap-2">
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">Python</span>
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">React</span>
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">Next.js</span>
                        </div>
                        <div className="mt-auto pt-5 grid grid-cols-1 gap-2">
                            <Link href="/projects/nim#play" className="inline-flex w-full items-center justify-center rounded-md border border-purple-900/45 bg-zinc-900/60 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800/90 transition">Play Game</Link>
                        </div>
                    </article>

                    <article className="group flex h-full flex-col rounded-2xl bg-gradient-to-br from-zinc-900/95 to-zinc-950/95 ring-1 ring-inset ring-purple-900/35 p-5 transition-colors duration-300 ease-in-out">
                        <div className="-mx-5 -mt-5 mb-4 overflow-hidden rounded-t-2xl bg-zinc-950/80 relative h-44">
                            {/* Placeholder for WeBWorKMAX preview */}
                            <img
                                src={`${basePath}/webwork-640w.png`}
                                srcSet={`${basePath}/webwork-320w.png 320w, ${basePath}/webwork-480w.png 480w, ${basePath}/webwork-640w.png 640w, ${basePath}/webwork-960w.png 960w, ${basePath}/webwork-1280w.png 1280w, ${basePath}/webwork-1920w.png 1920w`}
                                sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                                alt="WeBWorKMAX extension preview"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl leading-tight font-poppins mt-2 tracking-normal text-purple-400">WeBWorKMAX</h3>
                        <p className="mt-1 text-base leading-6 text-zinc-300">Extension for WeBWorK Grading</p>
                        <div className="mt-2 mb-3 -translate-x-[3px] flex flex-wrap gap-2">
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">JavaScript</span>
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">Chrome Extension</span>
                        </div>
                        <div className="mt-auto pt-5 grid grid-cols-1 gap-2">
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/jblandin-art/WeBWorKMAX" className="inline-flex w-full items-center justify-center rounded-md border border-purple-900/45 bg-zinc-900/60 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800/90 transition">View on GitHub</a>
                        </div>
                    </article>
                    { /** The Flappiest Bird 
                    <article className="group col-span-full flex h-full flex-col rounded-2xl bg-gradient-to-br from-zinc-900/95 to-zinc-950/95 ring-1 ring-inset ring-purple-900/35 p-5 transition-colors duration-300 ease-in-out">
                        <div className="-mx-5 -mt-5 mb-4 overflow-hidden rounded-t-2xl bg-zinc-950/80 relative h-44">
                            <img
                                src={`${basePath}/flappiestBird.png`}
                                srcSet={`${basePath}/flappiestBird-320w.png 320w, ${basePath}/flappiestBird-480w.png 480w, ${basePath}/flappiestBird-640w.png 640w, ${basePath}/flappiestBird-960w.png 960w, ${basePath}/flappiestBird-1280w.png 1280w, ${basePath}/flappiestBird-1920w.png 1920w`}
                                sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                                alt="The Flappiest Bird preview"
                                className="absolute inset-0 h-full w-full object-cover object-cover object-[center_40%]"
                            />
                        </div>
                        <h3 className="text-xl leading-tight font-poppins mt-2 tracking-normal text-purple-400">The Flappiest Bird</h3>
                        <p className="mt-1 text-base leading-6 text-zinc-300">Unity Game</p>
                        <div className="mt-2 mb-3 -translate-x-[3px] flex flex-wrap gap-2">
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">C++</span>
                            <span className="rounded-lg border border-purple-900/35 bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-200">Unity</span>
                        </div>
                        <div className="mt-auto pt-5 grid grid-cols-1 gap-2">
                            <a target="_blank" rel="noopener noreferrer" href="https://play.unity.com/en/games/acd20706-6397-40e4-a959-d845d0836ad9/the-flappiest-bird" className="inline-flex w-full items-center justify-center rounded-md border border-purple-900/45 bg-zinc-900/60 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800/90 transition">Play Game</a>
                        </div>
                    </article>
*/ }
                </div>
                )}
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={() => setShowMore(!showMore)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition hover:text-zinc-400 cursor-pointer"
                    >
                        {showMore ? "View Less" : "View More"}
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`text-purple-400 transition-transform duration-300 group-hover:text-purple-300 ${showMore ? "rotate-180" : ""}`}
                        >
                            <path d="M6 11l6 6 6-6" />
                            <path d="M12 5v12" />
                        </svg>
                    </button>
                </div>
            </section>
            <section id="experience" className="mt-10 scroll-mt-20">
            <h2 className="text-2xl font-bold font-poppins text-purple-400 mb-4">Experience</h2>
            <article className="rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-950/70 p-5 ring-1 ring-inset ring-purple-900/35">
                
                <h3 className="text-xl font-semibold font-poppins text-zinc-300 mb-1">Client Support Technician</h3>
                <p className="text-lg text-muted-foreground font-playfair italic">
                    <span className="inline-flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                            <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1118 0z" />
                            <circle cx="12" cy="10" r="2.5" fill="currentColor" />
                        </svg>
                        Charlotte, NC
                    </span>
                </p>
                <p className="text-lg text-muted-foreground font-playfair italic">
                    <span className="inline-flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                            <rect x="2" y="4" width="20" height="14" rx="2" ry="2" />
                            <path d="M7 8h10" />
                            <path d="M7 12h10" />
                            <path d="M7 16h10" />
                        </svg>
                        <span className="hidden sm:inline">University of North Carolina at Charlotte</span>
                        <span className="sm:hidden">UNC Charlotte</span>
                    </span>
                </p>
            <ul className="list-disc list-inside">
                <li className="font-sans text-gray-300 tracking-wide leading-8 max-w-2xl mt-2 text-lg">
                    Used Bash and CMD to troubleshoot and image devices. Allowing the campus to reuse old devices and provide new ones. 
                </li>
                <li className="font-sans text-gray-300 tracking-wide leading-8 max-w-2xl mt-2 text-lg">
                    Set up new devices for faculty. Improved through feedback and criticism from senior staff. Allowing for better labeling of devices, and more efficient deployment. 
                </li>
            </ul>
            </article>
            <article className="rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-950/70 p-5 ring-1 ring-inset ring-purple-900/35 mt-6">
                
                <h3 className="text-xl font-semibold font-poppins text-zinc-300 mb-1">Teaching Assistant</h3>
                <p className="text-lg text-muted-foreground font-playfair italic">
                    <span className="inline-flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                            <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1118 0z" />
                            <circle cx="12" cy="10" r="2.5" fill="currentColor" />
                        </svg>
                        Charlotte, NC
                    </span>
                </p>
                <p className="text-lg text-muted-foreground font-playfair italic">
                    <span className="inline-flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                            <rect x="2" y="4" width="20" height="14" rx="2" ry="2" />
                            <path d="M7 8h10" />
                            <path d="M7 12h10" />
                            <path d="M7 16h10" />
                        </svg>
                        <span className="hidden sm:inline">University of North Carolina at Charlotte</span>
                        <span className="sm:hidden">UNC Charlotte</span>
                    </span>
                </p>
            <ul className="list-disc list-inside">
                <li className="font-sans text-gray-300 tracking-wide leading-8 max-w-2xl mt-2 text-lg">
                    Developed an autosave extension for WebWorK’s grading system using JavaScript, HTML and CSS. Preventing data loss when refreshing the page. 
                </li>
                <li className="font-sans text-gray-300 tracking-wide leading-8 max-w-2xl mt-2 text-lg">
                    Fixed UI bugs in WebWorK’s grading system using JavaScript, HTML, and CSS, allowing dropdowns to fully display options, and providing a better view of the comment section. 
                </li>
                <li className="font-sans text-gray-300 tracking-wide leading-8 max-w-2xl mt-2 text-lg">
                    Created study guide materials and graded exams using guidelines from senior staff. 
                </li>
            </ul>
            </article>
            </section>
            <section id="contact" className="mt-10 mb-8">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold font-poppins text-purple-400">Contact</h2>
                    <p className="mt-1 text-sm text-muted-foreground">I'm currently interested in internships and am looking to contribute to impactful projects. Feel free to reach out at josiahblanding@gmail.com, my resume is also available for download below.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm">
                    <a href="mailto:josiahblanding@gmail.com" className="rounded-md border border-purple-700/60 bg-zinc-900/60 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:bg-zinc-800">Email Me</a>
                    <a target="_blank" rel="noopener noreferrer" href="/jblandin/Resume.pdf" className="rounded-md border border-purple-700/60 bg-zinc-900/60 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:bg-zinc-800">Download Resume</a>
                </div>
            </section>
        </main>
        {// <Footer /> Can't Decide if I want the footer or not :(
        }
        </>
    );
}