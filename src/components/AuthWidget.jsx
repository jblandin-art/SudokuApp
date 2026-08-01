// components/AuthWidget.jsx
"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthWidget({ puzzlesSolved: puzzlesSolvedProp = null, setPuzzlesSolved: setPuzzlesSolvedProp = null }) {
  const [session, setSession] = useState(null);
  const [localPuzzlesSolved, setLocalPuzzlesSolved] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const puzzlesSolved = puzzlesSolvedProp ?? localPuzzlesSolved;
  const setPuzzlesSolved = setPuzzlesSolvedProp ?? setLocalPuzzlesSolved;
  const currentUserId = session?.user?.id ?? null;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user?.id) {
      setPuzzlesSolved(null);
      return;
    }

    supabase
      .from("profiles")
      .select("puzzles_solved")
      .eq("id", session.user.id)
      .single()
      .then(({ data, error }) => {
      if (error) {
        console.error("Error fetching puzzles solved:", error);
      }

        setPuzzlesSolved(data?.puzzles_solved ?? null);
      });
  }, [session]);

  useEffect(() => {
    if (!currentUserId || puzzlesSolved === null) {
      return;
    }

    setLeaderboard((previous) => {
      if (!Array.isArray(previous) || previous.length === 0) {
        return previous;
      }

      const rowIndex = previous.findIndex((entry) => entry?.id === currentUserId);
      if (rowIndex === -1) {
        return previous;
      }

      const next = previous.map((entry, index) =>
        index === rowIndex ? { ...entry, puzzles_solved: puzzlesSolved } : entry
      );

      next.sort((a, b) => Number(b?.puzzles_solved ?? 0) - Number(a?.puzzles_solved ?? 0));
      return next;
    });
  }, [currentUserId, puzzlesSolved]);

  async function handleLogIn() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
        setError(error.message);
    } else {
        setShowForm(false);
        setEmail("");
        setPassword("");
        setUsername("");
    }
}

  async function handleRegister() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { 
          data: { username },
          },
    });
    setLoading(false);
    if (error) {
        setError(error.message);
    } else {
        setError("Check your email to confirm your account.");
    }
}

  async function handleLogOut() {
    await supabase.auth.signOut();
  }

  async function fetchLeaderboard(){
    setLeaderboardLoading(true);
    setLeaderboardError("");

    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, puzzles_solved")
      .order("puzzles_solved", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching leaderboard:", error);
      setLeaderboardError("Unable to load leaderboard right now.");
      setLeaderboard([]);
      setLeaderboardLoading(false);
      return;
    }

    setLeaderboard(data ?? []);
    setLeaderboardLoading(false);
  }

  // Logged in: log out + leaderboard buttons
  if (session) {
    return (
      <div className="mx-auto mt-5 flex w-full max-w-md flex-col gap-3 rounded-xl border border-purple-700/50 bg-zinc-900/60 p-5">   
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-gray-300">
            Puzzles solved: <span className="font-semibold text-purple-100">{puzzlesSolved ?? "—"}</span>
          </p>
          <button
            onClick={async () => {
              setLeaderboardOpen((previous) => !previous);
              if (!leaderboardOpen) {
                await fetchLeaderboard();
              }
            }}
            className="px-4 py-2 rounded-md border border-purple-600/50 hover:bg-purple-900/30 transition-colors text-sm font-medium text-purple-200 whitespace-nowrap cursor-pointer"
          >
            Leaderboard
          </button>
        </div>
        {leaderboardOpen ? (
          <div className="rounded-lg border border-purple-700/40 bg-black/30 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-purple-200">Leaderboard</h3>
              <button
                type="button"
                onClick={() => setLeaderboardOpen(false)}
                className="text-xs text-gray-400 transition hover:text-gray-200"
              >
                Close
              </button>
            </div>

            {leaderboardLoading ? (
              <p className="text-sm text-gray-300">Loading leaderboard…</p>
            ) : leaderboardError ? (
              <p className="text-sm text-red-300">{leaderboardError}</p>
            ) : leaderboard.length > 0 ? (
              <ol className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <li
                    key={entry.id ?? `${entry.username}-${index}`}
                    className="flex items-center justify-between rounded-md border border-purple-700/30 bg-zinc-950/40 px-3 py-2 text-sm"
                  >
                    <span className="text-gray-200">
                      {index + 1}. {entry.username}
                    </span>
                    <span className="font-semibold text-purple-100">{entry.puzzles_solved ?? 0}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-gray-300">No leaderboard entries yet.</p>
            )}
          </div>
        ) : null}
        <button
          onClick={handleLogOut}
          className="w-full px-4 py-2 rounded-md border border-purple-600/50 hover:bg-purple-900/30 transition-colors text-sm font-medium text-purple-200 whitespace-nowrap cursor-pointer"
        >
          Log Out
        </button>
      </div>
    );
  }

  // Logged out, form collapsed: single Log In button
  if (!showForm) {
    return (
      <div className="flex justify-center mt-5">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 rounded-md border border-purple-600/50 hover:bg-purple-900/30 transition-colors text-sm font-medium text-purple-200 whitespace-nowrap cursor-pointer"
        >
          Log In
        </button>
      </div>
    );
  }

  // Logged out, form expanded
  return (
    <div className="mx-auto mt-5 w-full max-w-md rounded-xl border border-purple-700/50 bg-zinc-900/60 p-5">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-1">
          <button
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-sm text-purple-400 hover:text-purple-300 underline transition-colors"
          >
            {isRegisterMode ? "Log In" : "Register"}
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>

        {isRegisterMode ? (
          // Register form with username, email, password
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-600/50 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-600/50 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRegister()}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-600/50 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
            />
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full px-4 py-2 rounded-md border border-purple-600/50 hover:bg-purple-900/30 transition-colors text-sm font-medium text-purple-200 whitespace-nowrap"
            >
              Register
            </button>
          </div>
        ) : (
          // Login form with username/email, password
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-600/50 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogIn()}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-600/50 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
            />
            <button
              onClick={handleLogIn}
              disabled={loading}
              className="w-full px-4 py-2 rounded-md border border-purple-600/50 hover:bg-purple-900/30 transition-colors text-sm font-medium text-purple-200 whitespace-nowrap"
            >
              Log In
            </button>
          </div>
        )}

        {error && <p className="text-sm text-red-400 px-1">{error}</p>}
      </div>
    </div>
  );
}