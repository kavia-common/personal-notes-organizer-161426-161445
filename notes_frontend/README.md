# Notes Frontend (Astro)

A modern, minimalistic notes app frontend built with Astro. Features:
- User login and registration
- Create, read, update, delete notes
- Organize notes by tags or categories
- Search and filter notes
- Responsive design with sidebar, header, content, and footer

Colors: primary #2D9CDB, secondary #56CCF2, accent #F2994A

## Environment

Copy `.env.example` to `.env` and set values:
- PUBLIC_API_BASE_URL: Base URL for backend API (e.g., http://localhost:8000)
- PUBLIC_DEBUG: optional boolean to enable debug logs

Astro automatically exposes variables prefixed with `PUBLIC_` on the client.

## Scripts
- npm install
- npm run dev
- npm run build
- npm run preview

## Structure
- src/pages: route pages (auth, app, help)
- src/components: UI components (editor, list, header, filters, theme toggle)
- src/lib: environment, API client, auth, notes logic
- src/store: Zustand store for client state

## Backend Integration
The app calls:
- POST /auth/login, POST /auth/register
- GET /notes, POST /notes, PUT /notes/:id, DELETE /notes/:id

If the API is unavailable, the app falls back to localStorage for demo use.

## Security Note
- Never hardcode secrets in code.
- Use environment variables as shown above.

