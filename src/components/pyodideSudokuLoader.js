let pyodideInitPromise = null;
const PYODIDE_SCRIPT_LOAD_TIMEOUT_MS = 20000;

export async function loadPyodideAndSudoku({ onStatusChange = null } = {}) {
  const reportStatus = (message) => {
    if (onStatusChange) {
      onStatusChange(message);
    }
  };

  if (!pyodideInitPromise) {
    pyodideInitPromise = (async () => {
      if (!globalThis.pyodide) {
        reportStatus("Loading Pyodide script…");
        await new Promise((resolve, reject) => {
          if (window.loadPyodide) {
            resolve(window.loadPyodide);
            return;
          }

          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
          script.async = true;
          let timedOut = false;
          const timeoutId = window.setTimeout(() => {
            timedOut = true;
            script.remove();
            reportStatus("Pyodide script timed out.");
            reject(new Error("Timed out while loading the Pyodide script."));
          }, PYODIDE_SCRIPT_LOAD_TIMEOUT_MS);

          script.onload = () => {
            if (timedOut) return;
            window.clearTimeout(timeoutId);
            resolve(window.loadPyodide);
          };
          script.onerror = () => {
            if (timedOut) return;
            window.clearTimeout(timeoutId);
            reject(new Error("Failed to load the Pyodide script."));
          };
          document.head.appendChild(script);
        });

        const loadPyodide = window.loadPyodide;
        // @ts-ignore
        reportStatus("Initializing Pyodide…");
        globalThis.pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/" });
        reportStatus("Loading numpy…");
        await globalThis.pyodide.loadPackage(["numpy"]);

        const sudokuPath = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/sudoku.py`;
        reportStatus("Fetching sudoku.py…");
        const resp = await fetch(sudokuPath);
        const source = await resp.text();
        if (!resp.ok) {
          throw new Error(`Failed to fetch sudoku.py: ${resp.status} ${resp.statusText}`);
        }

        reportStatus("Executing sudoku.py…");
        await globalThis.pyodide.runPythonAsync(`import json\n${source}`);
        reportStatus("Pyodide ready.");
      }

      return globalThis.pyodide;
    })().catch((error) => {
      pyodideInitPromise = null;
      throw error;
    });
  }

  return pyodideInitPromise;
}