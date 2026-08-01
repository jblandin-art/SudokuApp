"use client";

import { useEffect, useRef } from "react";

export function NimLogic({ setReady }) {
    const gameOverRef = useRef(false);
    const userTurnRef = useRef(true);

    useEffect(() => {
        let pyodide;
        let cancelled = false;
        const status = document.getElementById("status");
        const statusBreakOne = document.getElementById("status-break-1");
        const statusBreakTwo = document.getElementById("status-break-2");
        const statusBreaks = [statusBreakOne, statusBreakTwo];

        if (status) {
            status.textContent = "GAME LOADING";
            status.classList.remove("text-green-300", "text-blue-300", "text-red-300");
            status.classList.add("text-yellow-300", "nim-loading-flash");
        }

        statusBreaks.forEach((breakElement) => {
            if (!breakElement) {
                return;
            }
            breakElement.classList.remove("via-green-500/50", "via-blue-500/50", "via-red-500/50");
            breakElement.classList.add("via-yellow-500/50", "nim-loading-flash");
        });

        function loadPyodideScript() {
            return new Promise((resolve, reject) => {
                if (window.loadPyodide) {
                    resolve(window.loadPyodide);
                    return;
                }

                const script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
                script.async = true;
                script.onload = () => resolve(window.loadPyodide);
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }
        async function init() {
            const loadPyodide = await loadPyodideScript();
            pyodide = await loadPyodide();
            if (cancelled) {
                return;
            }
            const nimPath = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/nim.py`;
            const response = await fetch(nimPath);
            if (!response.ok) {
                throw new Error(`Failed to fetch nim.py: ${response.status} ${response.statusText}`);
            }

            const source = await response.text();
            await pyodide.runPythonAsync(`import json\n${source}`);
        }
        init()
            .then(() => {
                if (cancelled) {
                    return;
                }
                pyodide.runPython(`nimAB = NimWorldABMinimax([1, 3, 5, 7])`);
                const row1 = document.querySelector("#row1 div");
                const row2 = document.querySelector("#row2 div");
                const row3 = document.querySelector("#row3 div");
                const row4 = document.querySelector("#row4 div");
                const rowSection1 = document.getElementById("row1");
                const rowSection2 = document.getElementById("row2");
                const rowSection3 = document.getElementById("row3");
                const rowSection4 = document.getElementById("row4");
                const removeStick1Button = document.getElementById("remove-stick-1");
                const removeStick2Button = document.getElementById("remove-stick-2");
                const removeStick3Button = document.getElementById("remove-stick-3");
                const removeStick4Button = document.getElementById("remove-stick-4");
                const removeStick1ButtonMobile = document.getElementById("remove-stick-1-mobile");
                const removeStick2ButtonMobile = document.getElementById("remove-stick-2-mobile");
                const removeStick3ButtonMobile = document.getElementById("remove-stick-3-mobile");
                const removeStick4ButtonMobile = document.getElementById("remove-stick-4-mobile");
                const aiTurnButton = document.getElementById("ai-turn-button");
                const aiTurnButtonMobile = document.getElementById("ai-turn-button-mobile");
                const gameBoard = document.getElementById("game-board");

            let firstTurn = true;

            if (status) {
                status.textContent = "PLAY!";
                status.classList.remove("text-yellow-300", "nim-loading-flash");
            }
            status.classList.add("text-green-300");
            statusBreaks.forEach(breakElement => {
                if (!breakElement) {
                    return;
                }
                breakElement.classList.remove("nim-loading-flash");
                breakElement.classList.remove("via-yellow-500/50");
                breakElement.classList.add("via-green-500/50");
            });

            setReady(true);


            const isGameOver = () => {
                const rows = [row1, row2, row3, row4];
                return rows.every(row => row.children.length === 0);
            }
            const notifyGameOver = () => {
                console.log("is game over?",isGameOver());
                    if (isGameOver()) {
                        status.textContent = "GAME OVER, YOU LOSE.";
                        status.classList.remove("text-green-300");
                        status.classList.add("text-red-300");
                        statusBreaks.forEach(breakElement => {
                            breakElement.classList.remove("via-green-500/50");
                            breakElement.classList.add("via-red-500/50");
                        });
                        gameOverRef.current = true;
                        removeStick1Button.disabled = true;
                        removeStick2Button.disabled = true;
                        removeStick3Button.disabled = true;
                        removeStick4Button.disabled = true;
                        if (removeStick1ButtonMobile) removeStick1ButtonMobile.disabled = true;
                        if (removeStick2ButtonMobile) removeStick2ButtonMobile.disabled = true;
                        if (removeStick3ButtonMobile) removeStick3ButtonMobile.disabled = true;
                        if (removeStick4ButtonMobile) removeStick4ButtonMobile.disabled = true;
                        aiTurnButton.disabled = true;
                        if (aiTurnButtonMobile) aiTurnButtonMobile.disabled = true;
                        aiTurnButton.hidden = true;
                        if (aiTurnButtonMobile) aiTurnButtonMobile.hidden = true;
                        return;
                    }
            }
            let rowSelected = -1;
            let sticksRemoved = 0;
            const removeStickButton1Listener = () => {
                removeStick2Button.disabled = true;
                removeStick3Button.disabled = true;
                removeStick4Button.disabled = true;
                if (removeStick2ButtonMobile) removeStick2ButtonMobile.disabled = true;
                if (removeStick3ButtonMobile) removeStick3ButtonMobile.disabled = true;
                if (removeStick4ButtonMobile) removeStick4ButtonMobile.disabled = true;

                if (row1.children.length > 0) {
                    if (row1.children.length === 1) {
                        removeStick1Button.hidden = true;
                        rowSection1.hidden = true;
                        if (removeStick1ButtonMobile) removeStick1ButtonMobile.hidden = true;
                    }
                    row1.removeChild(row1.firstChild);
                }
                rowSelected = 1;
                sticksRemoved += 1;
                userTurnRef.current = false;
                notifyGameOver();
            };
            const removeStickButton2Listener = () => {
                removeStick1Button.disabled = true;
                removeStick3Button.disabled = true;
                removeStick4Button.disabled = true;
                if (removeStick1ButtonMobile) removeStick1ButtonMobile.disabled = true;
                if (removeStick3ButtonMobile) removeStick3ButtonMobile.disabled = true;
                if (removeStick4ButtonMobile) removeStick4ButtonMobile.disabled = true;

                if (row2.children.length > 0) {
                    if (row2.children.length === 1) {
                        removeStick2Button.hidden = true;
                        rowSection2.hidden = true;
                        if (removeStick2ButtonMobile) removeStick2ButtonMobile.hidden = true;
                    }
                    row2.removeChild(row2.firstChild);
                }
                rowSelected = 2;
                sticksRemoved += 1;
                userTurnRef.current = false;
                notifyGameOver();
            };
            const removeStickButton3Listener = () => {
                removeStick1Button.disabled = true;
                removeStick2Button.disabled = true;
                removeStick4Button.disabled = true;
                if (removeStick1ButtonMobile) removeStick1ButtonMobile.disabled = true;
                if (removeStick2ButtonMobile) removeStick2ButtonMobile.disabled = true;
                if (removeStick4ButtonMobile) removeStick4ButtonMobile.disabled = true;

                if (row3.children.length > 0) {
                    if (row3.children.length === 1) {
                        removeStick3Button.hidden = true;
                        rowSection3.hidden = true;
                        if (removeStick3ButtonMobile) removeStick3ButtonMobile.hidden = true;
                    }
                    row3.removeChild(row3.firstChild);
                }
                rowSelected = 3;
                sticksRemoved += 1;
                userTurnRef.current = false;
                notifyGameOver();
            };
            const removeStickButton4Listener = () => {
                removeStick1Button.disabled = true;
                removeStick2Button.disabled = true;
                removeStick3Button.disabled = true;
                if (removeStick1ButtonMobile) removeStick1ButtonMobile.disabled = true;
                if (removeStick2ButtonMobile) removeStick2ButtonMobile.disabled = true;
                if (removeStick3ButtonMobile) removeStick3ButtonMobile.disabled = true;

                if (row4.children.length > 0) {
                    if (row4.children.length === 1) {
                        removeStick4Button.hidden = true;
                        rowSection4.hidden = true;
                        if (removeStick4ButtonMobile) removeStick4ButtonMobile.hidden = true;
                    }
                    row4.removeChild(row4.firstChild);
                }
                rowSelected = 4;
                sticksRemoved += 1;
                userTurnRef.current = false;
                notifyGameOver();
            };
                if (userTurnRef.current){
                removeStick1Button.disabled = false;
                removeStick2Button.disabled = false;
                removeStick3Button.disabled = false;
                removeStick4Button.disabled = false;
                if (removeStick1ButtonMobile) removeStick1ButtonMobile.disabled = false;
                if (removeStick2ButtonMobile) removeStick2ButtonMobile.disabled = false;
                if (removeStick3ButtonMobile) removeStick3ButtonMobile.disabled = false;
                if (removeStick4ButtonMobile) removeStick4ButtonMobile.disabled = false;

                removeStick1Button.addEventListener("click", removeStickButton1Listener);
                removeStick2Button.addEventListener("click", removeStickButton2Listener);
                removeStick3Button.addEventListener("click", removeStickButton3Listener);
                removeStick4Button.addEventListener("click", removeStickButton4Listener);
                if (removeStick1ButtonMobile) removeStick1ButtonMobile.addEventListener("click", removeStickButton1Listener);
                if (removeStick2ButtonMobile) removeStick2ButtonMobile.addEventListener("click", removeStickButton2Listener);
                if (removeStick3ButtonMobile) removeStick3ButtonMobile.addEventListener("click", removeStickButton3Listener);
                if (removeStick4ButtonMobile) removeStick4ButtonMobile.addEventListener("click", removeStickButton4Listener);
                
                }
                const aiTurnButtonListener = async () => {
                    // Only allow AI turn if user has made a move
                    if (!userTurnRef.current || firstTurn) {

                        pyodide.runPython(`nimAB.removeStick(${rowSelected - 1}, ${sticksRemoved})`);
                        firstTurn = false;
                        sticksRemoved = 0;

                        //Thinking initialization
                        status.textContent = "AI IS THINKING...";
                        status.classList.remove("text-green-300", "text-blue-300", "text-red-300");
                        status.classList.add("text-red-300", "nim-loading-flash");
                        statusBreaks.forEach(breakElement => {
                            breakElement.classList.remove("via-green-500/50", "via-blue-500/50", "via-red-500/50");
                            breakElement.classList.add("via-red-500/50", "nim-loading-flash");
                        });

                        // Let the browser paint the text before starting the heavy work
                        await new Promise(requestAnimationFrame);

                        const json = await pyodide.runPythonAsync(`json.dumps(nimAB.computerMove())`);
                        const moveData = JSON.parse(json);
                        //console.log('moveData', moveData);
                        if (!moveData || typeof moveData.pileSelection !== 'number') {
                            console.error('invalid moveData', moveData);
                            return;
                        }

                        const pileSelection = moveData.pileSelection;
                        const number = moveData.number;

                        const rows = [row1, row2, row3, row4];
                        const rowSections = [rowSection1, rowSection2, rowSection3, rowSection4];
                        //console.log(pileSelection)
                        //console.log(rows[pileSelection].children.length);
                        for (let i = 0; i < number; i++) {
                            if (rows[pileSelection].children.length > 0) {
                                //console.log("Yosnfa");
                                rows[pileSelection].removeChild(rows[pileSelection].firstChild);
                            }
                        }
                        userTurnRef.current = true;
                        removeStick1Button.disabled = false;
                        removeStick2Button.disabled = false;
                        removeStick3Button.disabled = false;
                        removeStick4Button.disabled = false;
                        if (removeStick1ButtonMobile) removeStick1ButtonMobile.disabled = false;
                        if (removeStick2ButtonMobile) removeStick2ButtonMobile.disabled = false;
                        if (removeStick3ButtonMobile) removeStick3ButtonMobile.disabled = false;
                        if (removeStick4ButtonMobile) removeStick4ButtonMobile.disabled = false;

                        const removeStickButtons = [removeStick1Button, removeStick2Button, removeStick3Button, removeStick4Button];
                        const removeStickButtonsMobile = [removeStick1ButtonMobile, removeStick2ButtonMobile, removeStick3ButtonMobile, removeStick4ButtonMobile];
                        if (rows[pileSelection].children.length === 0) {
                            removeStickButtons[pileSelection].hidden = true;
                            rows[pileSelection].hidden = true;
                            rowSections[pileSelection].hidden = true;
                            if (removeStickButtonsMobile[pileSelection]) removeStickButtonsMobile[pileSelection].hidden = true;
                        }

                        status.textContent = "YOUR TURN";
                        status.classList.remove("text-green-300", "text-blue-300", "text-red-300", "nim-loading-flash");
                        status.classList.add("text-blue-300");
                        statusBreaks.forEach(breakElement => {
                            breakElement.classList.remove("via-green-500/50", "via-blue-500/50", "via-red-500/50", "nim-loading-flash");
                            breakElement.classList.add("via-blue-500/50");
                        });

                        //console.log(isGameOver());
                        if (isGameOver()) {
                            status.textContent = "GREAT JOB, YOU WON!";
                            status.classList.remove("text-green-300");
                            status.classList.add("text-blue-300");
                            statusBreaks.forEach(breakElement => {
                                breakElement.classList.remove("via-green-500/50");
                                breakElement.classList.add("via-blue-500/50");
                            });
                            gameOverRef.current = true;
                            removeStick1Button.disabled = true;
                            removeStick2Button.disabled = true;
                            removeStick3Button.disabled = true;
                            removeStick4Button.disabled = true;
                            if (removeStick1ButtonMobile) removeStick1ButtonMobile.disabled = true;
                            if (removeStick2ButtonMobile) removeStick2ButtonMobile.disabled = true;
                            if (removeStick3ButtonMobile) removeStick3ButtonMobile.disabled = true;
                            if (removeStick4ButtonMobile) removeStick4ButtonMobile.disabled = true;
                            aiTurnButton.disabled = true;
                            if (aiTurnButtonMobile) aiTurnButtonMobile.disabled = true;
                            aiTurnButton.hidden = true;
                            if (aiTurnButtonMobile) aiTurnButtonMobile.hidden = true;
                            return;
                        }
                    }
                };
                aiTurnButton.addEventListener("click", aiTurnButtonListener);
                if (aiTurnButtonMobile) aiTurnButtonMobile.addEventListener("click", aiTurnButtonListener);
            })
            .catch((error) => {
                console.error(error);
                if (!cancelled) {
                    if (status) {
                        status.textContent = "FAILED TO LOAD. RELOAD TO TRY AGAIN.";
                        status.classList.remove("text-yellow-300", "text-green-300", "text-blue-300");
                        status.classList.add("text-red-300");
                    }
                    statusBreaks.forEach((breakElement) => {
                        if (!breakElement) {
                            return;
                        }
                        breakElement.classList.remove("via-yellow-500/50", "via-green-500/50", "via-blue-500/50");
                        breakElement.classList.add("via-red-500/50");
                    });
                    setReady(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);
}
