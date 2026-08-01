import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function IGMetricsCaseStudy() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-8 sm:py-10 text-gray-200">
      <div className="mb-8">
        <Link
          href="https://docs.google.com/spreadsheets/d/1NXtZs0KbZezFOd41VZz57VccwFd8051QtZNRPnVHkcU/edit?usp=sharing"
          className="inline-flex items-center rounded-md border border-purple-500/70 bg-zinc-900/70 px-4 py-2 text-sm text-purple-100 transition hover:border-purple-400 hover:bg-zinc-800"
        >
          Spreadsheet
        </Link>
      </div>
    </main>
  );
}
