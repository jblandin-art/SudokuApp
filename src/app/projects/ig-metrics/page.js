import Link from "next/link";

export const metadata = {
  title: "IG Metrics Case Study | Josiah Blanding",
  description: "Case study for IG Metrics, a desktop analytics tool built with Electron and React.",
};

const architectureItems = [
  "Electron main process creates a frameless transparent desktop shell and loads Vite dev server or built HTML via FORCE_DEV.",
  "Secure renderer bridge via preload scripts with contextBridge/ipcRenderer for window controls and CSV save.",
  "React + Vite frontend handles import flow, metric computation, and overview/chart view switching.",
  "electron-builder + NSIS packaging with GitHub Releases distribution and electron-updater hooks.",
];

const tech = [
  "Electron",
  "React",
  "Vite",
  "Node.js",
  "Recharts",
  "Electron Builder",
  "electron-updater",
  "JavaScript (ES6+)",
  "CSS",
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function IGMetricsCaseStudy() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-8 sm:py-10 text-gray-200">
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
          IG Metrics - Desktop Analytics Tool
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-300">
          This desktop application parses through exported Instagram follower data, highlighting important connection metrics. It identifies one way connections, features an interactive chart, and features CSV export for the analysis data.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-purple-300">Role</p>
            <p className="mt-1 text-sm">Solo Developer</p>
          </div>
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-purple-300">Timeline</p>
            <p className="mt-1 text-sm">A few weeks (10-30 hours)</p>
          </div>
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-purple-300">Budget</p>
            <p className="mt-1 text-sm">$0</p>
          </div>
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-purple-300">Platform</p>
            <p className="mt-1 text-sm">Desktop (Electron)</p>
          </div>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Problem</h2>
        <p className="mt-3 leading-8 text-gray-300">
          Instagram users can export follower/following data, but quickly understanding who is not
          following back is still a manual and frustrating process. IG Metrics turns raw JSON exports
          into immediate relationship insights and actionable lists.
        </p>
        <p className="mt-3 leading-8 text-gray-300">
          Target users include creators, influencers, ratio-focused casual users, and small business
          accounts that actively monitor audience quality.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Approach And UX Decisions</h2>
        <ul className="mt-4 space-y-3 text-gray-300 leading-8 list-disc pl-5">
          <li>Minimal onboarding that asks users to import follower/following JSON files.</li>
          <li>Main interface split into Overall Metrics, Connection Metrics, and Not Following Back list.</li>
          <li>Top-level toggle switches metrics panels into a chart-driven view for faster scanning.</li>
          <li>Orange accenting in the app UI to improve contrast and highlight actionable controls.</li>
        </ul>
      </section>

      <section className="mb-4">
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <img src={`${basePath}/ig-metrics-onboarding.png`} alt="IG Metrics onboarding screen" className="h-auto w-full rounded-xl border border-purple-700/50" />
          <img src={`${basePath}/ig-metrics-number-data.png`} alt="IG Metrics numeric metrics overview" className="h-auto w-full rounded-xl border border-purple-700/50" />
          <img src={`${basePath}/ig-metrics-chart-data.png`} alt="IG Metrics chart data view" className="h-auto w-full rounded-xl border border-purple-700/50" />
        </div>
      </section>
      <section className="mb-12 flex justify-center mt-0">
        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((item) => (
            <span key={item} className="rounded-full border border-purple-600/60 bg-zinc-900/60 px-3 py-1 text-xs text-purple-100">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Architecture</h2>
        <ul className="mt-4 space-y-3 text-gray-300 leading-8 list-disc pl-5">
          {architectureItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Implementation Highlights</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="min-w-0 rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <h3 className="font-semibold text-purple-400">Import Parsing For Multiple JSON Schemas</h3>
            <pre className="mt-3 max-w-full overflow-x-auto rounded-lg bg-zinc-950/80 p-3 text-[11px] text-gray-300 sm:text-xs">
{`if (Array.isArray(json)) {
  json.forEach(obj => tempFollowers.push(obj.string_list_data[0].value));
} else if (json.relationships_following) {
  json.relationships_following.forEach(obj => tempFollowing.push(obj.title));
}`}
            </pre>
          </article>

          <article className="min-w-0 rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <h3 className="font-semibold text-purple-400">Set-Based Diff For Better Performance</h3>
            <pre className="mt-3 max-w-full overflow-x-auto rounded-lg bg-zinc-950/80 p-3 text-[11px] text-gray-300 sm:text-xs">
{`const notFollowingBack = following.filter(
  user => !new Set(followers).has(user)
);

const followersNotFollowedBack = followers.filter(
  user => !new Set(following).has(user)
);`}
            </pre>
          </article>

          <article className="min-w-0 rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <h3 className="font-semibold text-purple-400">Secure CSV Export Through IPC</h3>
            <pre className="mt-3 max-w-full overflow-x-auto rounded-lg bg-zinc-950/80 p-3 text-[11px] text-gray-300 sm:text-xs">
{`// renderer
await window.electronAPI.saveCSV(csvContent);

// main
ipcMain.handle("save-csv", async (_, csvContent) => {
  // save dialog + write file
});`}
            </pre>
          </article>

          <article className="min-w-0 rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <h3 className="font-semibold text-purple-400">Desktop Packaging And Updates</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300">
              Built with electron-builder and NSIS installer pipeline, then distributed via GitHub Releases
              with electron-updater lifecycle hooks for update checks.
            </p>
          </article>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Challenges And Solutions</h2>
        <div className="mt-4 space-y-4">
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-purple-400">Challenge: Different Instagram export schemas</p>
            <p className="mt-1 text-sm text-gray-300">Solution: A single import handler branches by JSON shape and routes data into the correct processing pipeline.</p>
          </div>
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-purple-400">Challenge: Dataset comparisons at scale</p>
            <p className="mt-1 text-sm text-gray-300">Solution: Converted arrays to sets before filtering to keep comparisons near linear time.</p>
          </div>
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-purple-400">Challenge: Desktop-native actions without exposing Node in renderer</p>
            <p className="mt-1 text-sm text-gray-300">Solution: Tight contextBridge API surface for explicit and minimal IPC communication.</p>
          </div>
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-purple-400">Challenge: Packaging metadata bugs</p>
            <p className="mt-1 text-sm text-gray-300">Solution: Resolved release pipeline and build permissions by running VS Code with elevated privileges during packaging tasks.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Outcome</h2>
        <p className="mt-3 leading-8 text-gray-300">
          Current reach is early-stage (one active user and no external feedback yet), but the project
          successfully validated a complete desktop workflow: import to process to visualize to export to distribution.
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">What I Learned</h2>
        <ul className="mt-4 space-y-3 text-gray-300 leading-8 list-disc pl-5">
          <li>Electron wraps web technologies into real desktop product experiences.</li>
          <li>Secure preload boundaries are essential even in local-first desktop tools.</li>
          <li>A practical release pipeline (installer + updater) is part of product development, not an afterthought.</li>
        </ul>
      </section>

      <section className="mb-10 flex flex-wrap gap-3">
        <a
          href="https://github.com/jblandin-art/instagram-metrics-app/releases/tag/v1.0.0"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-purple-700/60 bg-zinc-900/60 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:bg-zinc-800"
        >
          Download App
        </a>
        <a
          href="mailto:josiahblanding@gmail.com"
          className="rounded-md border border-purple-700/60 bg-zinc-900/60 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:bg-zinc-800"
        >
          Contact Me
        </a>
      </section>
    </main>
  );
}
