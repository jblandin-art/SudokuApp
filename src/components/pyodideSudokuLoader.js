let pyodideInitPromise = null;
let numpyLoadPromise = null;
const PYODIDE_SCRIPT_LOAD_TIMEOUT_MS = 20000;
const PYODIDE_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/pyodide/`;

async function loadPyodideWithWasmMimeFallback(loadPyodide) {
  const instantiateStreaming = WebAssembly.instantiateStreaming;

  WebAssembly.instantiateStreaming = async (source, imports) => {
    const response = await source;

    try {
      return await instantiateStreaming(response.clone(), imports);
    } catch (error) {
      if (!(response instanceof Response)) {
        throw error;
      }

      return WebAssembly.instantiate(await response.arrayBuffer(), imports);
    }
  };

  try {
    return await loadPyodide({ indexURL: PYODIDE_BASE_URL });
  } finally {
    WebAssembly.instantiateStreaming = instantiateStreaming;
  }
}

export async function loadPyodideRuntime({ onStatusChange = null } = {}) {
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
          script.src = `${PYODIDE_BASE_URL}pyodide.js`;
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
        reportStatus("Initializing Pyodide…");
        globalThis.pyodide = await loadPyodideWithWasmMimeFallback(loadPyodide);
      }

      return globalThis.pyodide;
    })().catch((error) => {
      pyodideInitPromise = null;
      throw error;
    });
  }

  return pyodideInitPromise;
}

export async function loadPyodideAndSudoku({ onStatusChange = null } = {}) {
  const reportStatus = (message) => {
    if (onStatusChange) {
      onStatusChange(message);
    }
  };
  const pyodide = await loadPyodideRuntime({ onStatusChange });

  if (!numpyLoadPromise) {
    numpyLoadPromise = (async () => {
      reportStatus("Loading numpy…");
      await pyodide.loadPackage(["numpy"]);

      const sudokuPath = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/sudoku.py`;
      reportStatus("Fetching sudoku.py…");
      const resp = await fetch(sudokuPath);
      const source = await resp.text();
      if (!resp.ok) {
        throw new Error(`Failed to fetch sudoku.py: ${resp.status} ${resp.statusText}`);
      }

      reportStatus("Executing sudoku.py…");
      await pyodide.runPythonAsync(`import json\n${source}`);
      reportStatus("Pyodide ready.");
    })().catch((error) => {
      numpyLoadPromise = null;
      throw error;
    });
  }

  await numpyLoadPromise;
  return pyodide;
}