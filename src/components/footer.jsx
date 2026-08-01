const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/josiahblanding/",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.13 1 2.5 1 4.98 2.12 4.98 3.5ZM.2 8.5h4.6V24H.2V8.5ZM8.3 8.5h4.4v2.1h.1c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.4 3 5.4 6.9V24h-4.6v-7.3c0-1.8 0-4.1-2.5-4.1s-2.9 1.9-2.9 4V24H8.3V8.5Z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/jblandin-art",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.4.8-4.1-1.4-4.1-1.4-.5-1.4-1.1-1.8-1.1-1.8-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.7-.3-5.5-1.4-5.5-6.2 0-1.4.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6.2 0c2.4-1.5 3.4-1.2 3.4-1.2.6 1.6.2 2.9.1 3.2.7.9 1.2 2 1.2 3.3 0 4.8-2.8 5.8-5.5 6.1.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.9.6A12 12 0 0 0 12 .5Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-6 pb-4 pt-2 text-gray-200 sm:pb-6 sm:pt-3">
      <div className="border-t border-purple-700/30 pt-3 sm:pt-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">Find me elsewhere</p>
            <p className="mt-1 text-sm text-muted-foreground">The fastest way to reach me is email, but these are the other places I keep updated.</p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 px-3.5 py-2 text-sm text-purple-200 transition hover:border-purple-400 hover:bg-purple-800/30"
                aria-label={link.label}
              >
                {link.svg}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
