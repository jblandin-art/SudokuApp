import Link from "next/link";

export const metadata = {
  title: "Periodic Table Case Study | Josiah Blanding",
  description:
    "Case study for a periodic table database refactor and element lookup CLI built with PostgreSQL and Bash.",
};

const dbFixes = [
  "Renamed columns for clarity: weight -> atomic_mass, melting_point -> melting_point_celsius, boiling_point -> boiling_point_celsius.",
  "Enforced constraints: symbol and name are UNIQUE + NOT NULL; temperature columns are NOT NULL.",
  "Added and wired foreign keys: properties.atomic_number references elements.atomic_number.",
  "Normalized element classification by creating a types table and replacing properties.type with properties.type_id.",
  "Cleaned data quality issues: removed trailing decimal zeros from atomic_mass, capitalized symbols, deleted invalid element 1000.",
  "Inserted missing elements: Fluorine (9) and Neon (10) with full property data and correct type mapping.",
];

const cliScenarios = [
  "No argument: outputs `Please provide an element as an argument.`",
  "Valid input (number/symbol/name): returns the exact formatted sentence with atomic number, name, symbol, type, mass, and temperatures.",
  "Unknown input: outputs `I could not find that element in the database.`",
];

export default function PeriodicTableCaseStudy() {
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
          Periodic Table Database Refactor + Element Lookup Script
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-300">
          This project focused on repairing a legacy PostgreSQL schema and then building a Bash CLI
          that retrieves element details by atomic number, symbol, or name. The final result
          combines clean relational modeling with practical query scripting.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-purple-300">Role</p>
            <p className="mt-1 text-sm">Solo Developer</p>
          </div>
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-purple-300">Timeline</p>
            <p className="mt-1 text-sm">Course milestone project</p>
          </div>
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-purple-300">Tools</p>
            <p className="mt-1 text-sm">PostgreSQL + Bash</p>
          </div>
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-purple-300">Focus</p>
            <p className="mt-1 text-sm">Normalization + Query UX</p>
          </div>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Project Goals</h2>
        <p className="mt-3 leading-8 text-gray-300">
          The scope was split into three deliverables: fix a broken periodic table database,
          create and maintain a clean Git history in a dedicated repository, and implement an
          executable shell script that returns standardized element information for multiple input types.
        </p>
      </section>

      <section id="schema-updates" className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Schema Updates</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This section mirrors the required database repair stories and shows the structural changes.
        </p>
        <ul className="mt-4 space-y-3 text-gray-300 leading-8 list-disc pl-5">
          {dbFixes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <article className="mt-6 min-w-0 rounded-xl border border-purple-700/50 bg-slate-900/70 p-4">
          <h3 className="text-purple-300">Normalized Table Relationship</h3>
          <pre className="mt-3 max-w-full overflow-x-auto rounded-lg bg-slate-950/80 p-3 text-[11px] text-gray-300 sm:text-xs">
{`elements
  atomic_number (PK)
  symbol (UNIQUE, NOT NULL)
  name (UNIQUE, NOT NULL)

types
  type_id (PK)
  type (NOT NULL)

properties
  atomic_number (PK, FK -> elements.atomic_number)
  atomic_mass
  melting_point_celsius (NOT NULL)
  boiling_point_celsius (NOT NULL)
  type_id (FK -> types.type_id, NOT NULL)`}
          </pre>
        </article>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Script Behavior</h2>
        <p className="mt-3 leading-8 text-gray-300">
          The Bash script `element.sh` was designed for exact output compatibility with strict acceptance tests.
          It branches on argument type, runs SQL through a shared `PSQL` command variable, and prints the
          expected sentence format without extra noise.
        </p>
        <ul className="mt-4 space-y-3 text-gray-300 leading-8 list-disc pl-5">
          {cliScenarios.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Engineering Notes</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="min-w-0 rounded-xl border border-purple-700/50 bg-slate-900/70 p-4">
            <h3 className="text-purple-300">Data Integrity First</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300">
              Constraints and foreign keys were applied before final scripting to ensure every CLI response
              is backed by reliable relational data.
            </p>
          </article>

          <article className="min-w-0 rounded-xl border border-purple-700/50 bg-slate-900/70 p-4">
            <h3 className="text-purple-300">Test-Driven Output Formatting</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300">
              Message strings were tuned to match required punctuation and phrasing exactly, including
              fallback messages for missing arguments and unknown elements.
            </p>
          </article>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Outcome</h2>
        <p className="mt-3 leading-8 text-gray-300">
          The final submission delivered a corrected and normalized database, an executable CLI script,
          and a clean Git repository history that satisfied all project constraints.
        </p>
      </section>

      <section className="mb-10 flex flex-wrap gap-3">
        <a
          href="https://github.com/jblandin-art/Periodic-Table-Database"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-purple-500 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-400 transition"
        >
          View Code
        </a>
        <a
          href="#schema-updates"
          className="rounded-md border border-purple-500/70 px-4 py-2 text-sm text-purple-200 hover:bg-purple-800/40 transition"
        >
          View Schema Updates
        </a>
      </section>
    </main>
  );
}