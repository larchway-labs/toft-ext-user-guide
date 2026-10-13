// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

/**
 * The Launchpad user guide.
 *
 * Built to a folder of HTML and committed as `dist/`, because that folder *is*
 * the deliverable: Launchpad never runs `npm install` or `astro build` for an
 * app, and `launchpad.toml`'s `[static] root = "dist"` is what tells the
 * detector to serve this repo rather than refuse it for having a package.json.
 *
 * `base` is not optional. A static app is served under `/apps/{slug}/`, and a
 * root-absolute URL without that prefix asks the *platform* for the file and
 * gets a 404. The slug is reserved (`_` belongs to apps Launchpad installs
 * itself), so it cannot be taken by an ordinary app and this value cannot go
 * stale behind a rename.
 */
export default defineConfig({
  base: "/apps/_user-guide",
  trailingSlash: "always",
  // The front door is the first page, not a landing page in front of it.
  // A splash of cards duplicating the sidebar is a click between somebody and
  // the thing they came for, and every route into this guide — the
  // Documentation card, a bookmark, the app's own address — arrives at `/`.
  // So `/` *is* the first page. `index.mdx` is gone rather than hidden: a page
  // nothing links to is a page that rots.
  redirects: {
    "/": "/apps/_user-guide/start/what-launchpad-is/",
  },
  // No `site`: this repo is deployed to every customer's own hostname, so there
  // is no canonical origin to bake in. Anything needing one — a sitemap, an
  // absolute og:url — would be wrong on every install but ours.
  integrations: [
    starlight({
      title: "Launchpad",
      logo: { src: "./src/assets/logo.svg", alt: "Launchpad" },
      tagline: "User guide",
      description:
        "How to deploy, run and share an app on Launchpad.",
      // Light only, like the platform. Starlight ships a theme toggle; the
      // override below is an empty component, which is the documented way to
      // remove one rather than hiding it with CSS a user can defeat.
      components: {
        ThemeSelect: "./src/components/empty.astro",
        SocialIcons: "./src/components/empty.astro",
      },
      customCss: [
        "@fontsource-variable/geist",
        "@fontsource-variable/geist-mono",
        "./src/styles/launchpad.css",
      ],
      pagination: true,
      lastUpdated: false,
      // Pagefind is Starlight's default and it is why this stack was chosen:
      // the index is built into `dist/` as static files, so search works on an
      // install with no route off the network and behind Launchpad's own auth.
      // A hosted index (Algolia) would do neither.
      pagefind: true,
      sidebar: [
        {
          label: "Get started",
          items: [
            { label: "What Launchpad is", slug: "start/what-launchpad-is" },
            { label: "Signing in", slug: "start/signing-in" },
            { label: "Deploy your first app", slug: "start/first-app" },
            { label: "Finding your way around", slug: "start/finding-your-way" },
          ],
        },
        {
          label: "Deploying",
          items: [
            { label: "From a git repository", slug: "deploy/from-git" },
            { label: "From your machine", slug: "deploy/from-your-machine" },
            { label: "From RStudio", slug: "deploy/from-rstudio" },
            { label: "From an archive", slug: "deploy/from-an-archive" },
            { label: "From the gallery", slug: "deploy/from-the-gallery" },
            { label: "Watching a deploy", slug: "deploy/watching" },
            { label: "Deploying on every push", slug: "deploy/auto-deploy" },
            { label: "Releases and rollback", slug: "deploy/releases" },
          ],
        },
        {
          label: "Building",
          items: [
            { label: "How Launchpad reads your repository", slug: "build/how-detection-works" },
            { label: "Node and Next.js", slug: "build/node" },
            { label: "Python", slug: "build/python" },
            { label: "Go", slug: "build/go" },
            { label: "R", slug: "build/r" },
            { label: "Static sites", slug: "build/static" },
            { label: "Notebooks and documents", slug: "build/notebooks" },
            { label: "Scheduled re-renders", slug: "build/reports" },
            { label: "Language versions", slug: "build/versions" },
            { label: "Base paths", slug: "build/base-paths" },
            { label: "launchpad.toml", slug: "build/launchpad-toml" },
          ],
        },
        {
          label: "Running",
          items: [
            { label: "The app page", slug: "run/the-app-page" },
            { label: "Status and sleeping", slug: "run/status" },
            { label: "Logs", slug: "run/logs" },
            { label: "Events", slug: "run/events" },
            { label: "Settings and variables", slug: "run/settings" },
            { label: "Attached credentials", slug: "run/credentials" },
            { label: "Usage and resources", slug: "run/usage" },
            { label: "Dependencies and policy", slug: "run/dependencies" },
            { label: "When an app is locked", slug: "run/locked" },
            { label: "Quiet apps", slug: "run/quiet" },
          ],
        },
        {
          label: "Sharing",
          items: [
            { label: "Who can see your app", slug: "share/visibility" },
            { label: "Sharing with people and groups", slug: "share/people" },
            { label: "Asking for access", slug: "share/requesting-access" },
            { label: "Ownership and transfer", slug: "share/ownership" },
            { label: "Tags", slug: "share/tags" },
            { label: "What your app learns about a viewer", slug: "share/viewer" },
          ],
        },
        {
          label: "Automating",
          items: [
            { label: "Scheduled tasks", slug: "automation/scheduled-tasks" },
            { label: "Jobs", slug: "automation/jobs" },
            { label: "Starting jobs from your app", slug: "automation/from-your-app" },
          ],
        },
        {
          label: "Data and files",
          items: [
            { label: "App data", slug: "data/app-data" },
            { label: "App storage", slug: "data/app-storage" },
            { label: "Browsing a store", slug: "data/browsing-a-store" },
            { label: "Sending messages and files", slug: "data/integrations" },
          ],
        },
        {
          label: "The command line",
          items: [
            { label: "Installing lp", slug: "cli/installing" },
            { label: "Deploying with lp", slug: "cli/deploying" },
            { label: "API keys", slug: "cli/api-keys" },
            { label: "The app SDK", slug: "cli/sdk" },
          ],
        },
        {
          label: "Your account",
          items: [
            { label: "Your account", slug: "account/your-account" },
            { label: "Becoming a publisher", slug: "account/becoming-a-publisher" },
          ],
        },
        {
          label: "Reference",
          items: [
            { label: "Troubleshooting", slug: "reference/troubleshooting" },
            { label: "Limits and caps", slug: "reference/limits" },
            { label: "Glossary", slug: "reference/glossary" },
          ],
        },
      ],
    }),
  ],
});
