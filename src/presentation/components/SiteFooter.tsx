"use cache";

import { site, socials } from "@/domain/content/portfolio";

/**
 * Server-rendered so the copyright year resolves once at build time. The
 * `use cache` directive is required because Cache Components rejects an
 * uncached `new Date()` during prerender.
 */
export async function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="measure mt-[clamp(3rem,5vw,5rem)]">
      <div className="flex flex-col gap-6 border-t border-hairline pt-6 md:flex-row md:items-center md:justify-between">
        <p className="font-[family-name:var(--font-inter)] text-caption text-muted-soft">
          &copy; {year} {site.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="font-[family-name:var(--font-inter)] text-caption text-muted-soft underline decoration-transparent underline-offset-4 transition-colors duration-300 hover:text-electric hover:decoration-current"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
