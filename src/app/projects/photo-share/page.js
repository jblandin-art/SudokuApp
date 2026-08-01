import Link from "next/link";
import PhotoShareCarousel from "@/components/PhotoShareCarousel";

export const metadata = {
  title: "PhotoShare Case Study | Josiah Blanding",
  description:
    "Case study for a sprint-based team photo sharing app built with React, Node, Express, and MongoDB.",
};

const sprintHighlights = {
  sprints1_2: [
    "Implemented SPA routing shell with a master-detail layout for user list, detail view, and photo view.",
    "Built route-aware top bar context text that updates to Details of or Photos of the active user.",
    "Connected UserList, UserDetail, and UserPhotos views to backend APIs using axios.",
    "Migrated backend routes to MongoDB/Mongoose and returned UI-friendly response payloads.",
    "Populated comment user references, then reshaped nested objects for frontend compatibility.",
  ],
  sprint3: [
    "Implemented login/logout session flow and server-side session persistence and validation.",
    "Built route protection and access control to redirect unauthenticated users and block protected endpoints.",
    "Expanded login/register screen with password validation and new user registration support.",
    "Added photo commenting with immediate UI refresh and photo uploading with multipart form handling.",
  ],
  sprint4: [
    "Extended MongoDB schema to store mention references within comments and validate mentions against existing users.",
    "Exposed backend query endpoint for retrieving all photos that mention a specific user.",
    "Built mention-aware comment entry UI with mention detection and validation.",
  ],
};

const responsibilities = [
  "Scrum Master for a five-person team across all four sprints.",
  "Led MongoDB/Express API implementation and integration details.",
  "Completed UserList and UserDetail frontend work in Sprints 1–2.",
  "Implemented server-side login/logout session flow and session persistence in Sprint 3.",
  "Designed and implemented backend mentions system for Sprint 4: schema design, validation logic, and query endpoints.",
  "Primary documentation owner for sprint deliverables and team execution.",
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const screenshotImages = [
  {
    src: `${basePath}/photo-app-login.png`,
    alt: "Photo app login view",
  },
  {
    src: `${basePath}/photo-app-details.png`,
    alt: "Photo app details view",
  },
  {
    src: `${basePath}/photo-app-photos.png`,
    alt: "Photo app photos view",
  },
  {
    src: `${basePath}/photo-app-mentions.png`,
    alt: "Photo app comments view",
  },
];

export default function PhotoShareCaseStudy() {
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
          PhotoShare - Sprint Based Social Media Platform
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-300">
          This social media application features a login/registration system, a full commenting system, route awareness, and @mention functionality. All of which was implemented by me and my team. We used an Agile development approach and I led as scrum master for all sprints.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-purple-300">Role</p>
            <p className="mt-1 text-sm">Scrum Master + Full-Stack Contributor</p>
          </div>
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-purple-300">Team</p>
            <p className="mt-1 text-sm">5 developers</p>
          </div>
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-purple-300">Timeline</p>
            <p className="mt-1 text-sm">~1 month (10+ hours personal implementation)</p>
          </div>
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-purple-300">Stack</p>
            <p className="mt-1 text-sm">React, MUI, Node, Express, MongoDB</p>
          </div>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Problem And Audience</h2>
        <p className="mt-3 leading-8 text-gray-300">
          The product solves a simple social problem, helping people share memories and reconnect
          through photo timelines.
          The audience is general users, not a niche professional segment.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Screenshots</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          User details, photo board, and comment thread views from the app.
        </p>
        <PhotoShareCarousel images={screenshotImages} />
      </section>

      <section id="sprint-highlights" className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Sprint Highlights</h2>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-purple-300">Sprints 1/2: Foundation</h3>
          <ul className="mt-3 space-y-2 text-gray-300 leading-8 list-disc pl-5">
            {sprintHighlights.sprints1_2.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-purple-300">Sprint 3: Sessions, Security, and Input</h3>
          <ul className="mt-3 space-y-2 text-gray-300 leading-8 list-disc pl-5">
            {sprintHighlights.sprint3.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-purple-300">Sprint 4: @Mentions in Comments</h3>
          <ul className="mt-3 space-y-2 text-gray-300 leading-8 list-disc pl-5">
            {sprintHighlights.sprint4.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">My Responsibilities</h2>
        <ul className="mt-4 space-y-3 text-gray-300 leading-8 list-disc pl-5">
          {responsibilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Implementation Highlights</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="min-w-0 rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <h3 className="text-purple-300">SPA Routing Shell</h3>
            <pre className="mt-3 max-w-full overflow-x-auto rounded-lg bg-zinc-950/80 p-3 text-[11px] text-gray-300 sm:text-xs">
              {`<HashRouter>
  <Grid container spacing={8}>
    <Grid item sm={3}><UserList /></Grid>
    <Grid item sm={9}>
      <Switch>
        <Route path="/users/:userId" render={props => <UserDetail {...props} />} />
        <Route path="/photos/:userId" render={props => <UserPhotos {...props} />} />
      </Switch>
    </Grid>
  </Grid>
</HashRouter>`}
            </pre>
          </article>

          <article className="min-w-0 rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <h3 className="text-purple-300">Route-Aware Top Bar Context</h3>
            <pre className="mt-3 max-w-full overflow-x-auto rounded-lg bg-zinc-950/80 p-3 text-[11px] text-gray-300 sm:text-xs">
              {`const path = this.props.location.pathname;
if (path.includes("/users/") || path.includes("/photos/")) {
  const userId = path.split("/").pop();
  axios.get("/user/" + userId).then((response) => {
    const prefix = path.includes("/photos/") ? "Photos of " : "Details of ";
    this.setState({ contextText: prefix + response.data.first_name + " " + response.data.last_name });
  });
}`}
            </pre>
          </article>

          <article className="min-w-0 rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <h3 className="text-purple-300">Mongo Route Projection</h3>
            <pre className="mt-3 max-w-full overflow-x-auto rounded-lg bg-zinc-950/80 p-3 text-[11px] text-gray-300 sm:text-xs">
              {`app.get("/user/list", function (request, response) {
  User.find({}, "_id first_name last_name", function (err, users) {
    if (err) return response.status(500).send(JSON.stringify(err));
    response.status(200).send(users);
  });
});`}
            </pre>
          </article>

          <article className="min-w-0 rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <h3 className="text-purple-300">Populate + Response Reshape</h3>
            <pre className="mt-3 max-w-full overflow-x-auto rounded-lg bg-zinc-950/80 p-3 text-[11px] text-gray-300 sm:text-xs">
              {`Photo.find({ user_id: id }, "_id file_name date_time user_id comments")
  .populate("comments.user_id", "_id first_name last_name")
  .exec(function (err, photos) {
    const plainPhotos = JSON.parse(JSON.stringify(photos));
    plainPhotos.forEach((photo) => {
      photo.comments.forEach((c) => {
        c.user = c.user_id;
        delete c.user_id;
      });
    });
    res.status(200).send(plainPhotos);
  });`}
            </pre>
          </article>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Challenges And Solutions</h2>
        <div className="mt-4 space-y-4">
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-purple-300">Challenge: Mongoose model shape mismatched the frontend data contract.</p>
            <p className="mt-1 text-sm text-gray-300">Solution: Populated nested comment users and reshaped payload objects from user_id to user.</p>
          </div>
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-purple-300">Challenge: Route context and selected user state drifted during navigation.</p>
            <p className="mt-1 text-sm text-gray-300">Solution: Synced state with route/hash updates and refreshed context text on route changes.</p>
          </div>
          <div className="rounded-xl border border-purple-700/50 bg-zinc-900/60 p-4">
            <p className="text-purple-300">Challenge: Team consistency across sprint workflows.</p>
            <p className="mt-1 text-sm text-gray-300">Solution: Scrum-driven checkpoints and clear run/rebuild/lint documentation for shared execution.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-poppins text-purple-400">Project Evolution</h2>
        <p className="mt-3 leading-8 text-gray-300">
          PhotoShare evolved from a prototype photo gallery into a fully featured social platform. Sprints 1–2 established the core SPA architecture and API layer. Sprint 3 added the authentication and real-world features sessions, registration, commenting, and file uploads that transformed it from an open demo into a secure, user-aware application. Sprint 4 extended the feature set with @mentions, allowing users to tag each other in comments and browse their mention gallery.
        </p>
        <p className="mt-3 leading-8 text-gray-300">
          The project strengthened my understanding of full-stack architecture: how backend schema decisions shape frontend developer experience, how to balance feature scope with test/lint compliance, and how session and validation logic must work together to keep a platform secure and reliable.
        </p>
      </section>

      <section className="mb-10 flex flex-wrap gap-3">
        <a
          href="#sprint-highlights"
          className="rounded-md border border-purple-700/60 bg-zinc-900/60 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:bg-zinc-800"
        >
          View Sprint Highlights
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