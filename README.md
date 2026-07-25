# StudentHub (React) — Frontend

StudentHub is a small React frontend for sharing university announcements, events, resources, and student clubs. The project is a Vite + React single-page app with client-side routing and a simple context for shared student data.

This repository contains the frontend only. Backend work will continue in a later phase.

Date of last frontend updates: 2026-07-24

## Status
- Frontend: complete for the initial scope — content, navigation, announcement details, and basic UX are implemented.
- Backend: planned; will be developed later and integrated via API endpoints.

Note: the repository is already pushed to GitHub. Today's changes were focused on improving the frontend structure, routes, and page content.

## What changed (today)
- Added an announcement detail page for viewing full announcement content (`src/pages/AnnouncementDetails.jsx`).
- Added a friendly 404 page (`src/pages/NotFound.jsx`).
- Cleaned and improved the navigation (`src/components/Navbar.jsx`) and removed a temporary greeting shown in the header.
- Improved page layouts for `Home`, `Announcements`, `Events`, `Resources`, and `Clubs` with clearer headings and sample content.
- Standardised the announcements data source to `src/data/announcements.js` (includes `details` for detail view).
- Polished the announcements list: search, category filter, and better empty/error states in `src/components/AnnouncementsSection.jsx`.
- Minor styling and layout tweaks in `src/App.css` and component styles.

These changes mark the end of the frontend work for this project milestone.

## Tech stack
- React (17+/18+/19+) with Vite
- react-router-dom for client-side routing
- CSS modules / plain CSS for styles

## Run locally
Prerequisites: Node.js (recommended v16+ or newer) and `npm` (or `pnpm`/`yarn`).

Install and run in development mode:

```bash
npm install
npm run dev
```

Build and preview a production bundle:

```bash
npm run build
npm run preview
```

Linting:

```bash
npm run lint
```

## Project structure (high level)
- `src/` — application source
  - `components/` — reusable UI components (Navbar, Hero, Footer, AnnouncementCard, AnnouncementsSection)
  - `pages/` — routed page components (Home, Announcements, AnnouncementDetails, Events, Resources, Clubs, NotFound)
  - `context/` — `StudentContext.jsx` (provided at the app root)
  - `data/` — local data used while backend is pending (`announcements.js`)

## How the frontend works
- Routing: `src/App.jsx` contains routes for all pages and a catch-all 404.
- Announcements: The list uses client-side filtering and search (`AnnouncementsSection.jsx`). Clicking a card opens the details page (`AnnouncementDetails.jsx`) which reads from the local data source.
- Context: `StudentContext` is provided at the app level so future auth/profile information can be shown across pages.

## Next steps / Backend plan
1. Design a lightweight backend API (REST or GraphQL) to store announcements, events, resources and clubs.
2. Replace local `src/data/announcements.js` with API calls (use `fetch` or a data fetching library like `axios` or `react-query`).
3. Add authentication and user profile endpoints; connect `StudentContext` to login state.
4. Add tests and CI pipeline.

## Contributing
- This repository is open for improvements. For small fixes, open a PR against the `main` branch. For larger changes, open an issue first to discuss scope.

## License
Choose a license that fits your needs (MIT is common for projects like this). If you want, add a `LICENSE` file.

---
If you want, I can prepare the initial backend API spec and a small Express/Node or Next.js API scaffold next.
