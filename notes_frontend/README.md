# Personal Notes - Frontend (Vue 3 + Vite)

A modern, responsive web UI for a personal notes app featuring:
- User authentication (login/register)
- Create, edit, delete notes
- List and search notes
- Sidebar navigation with main content panel
- Light theme using primary (#42b983), secondary (#35495e), and accent (#ffcc00)

This UI uses Pinia for state, Vue Router for navigation, and is ready to connect to a backend API by replacing the mock implementations in `src/stores/auth.ts` and `src/stores/notes.ts`.

## Project Setup

```sh
npm install
```

### Development

```sh
npm run dev
```

### Build for Production

```sh
npm run build
```

### Lint

```sh
npm run lint
```

## Backend integration

- Replace auth methods in `src/stores/auth.ts` (login, register, logout) with real HTTP requests and store tokens securely.
- Replace CRUD methods in `src/stores/notes.ts` (create, update, remove, and initial fetch) to call your API.
- Consider using an .env variable for the API base URL, e.g. `VITE_API_BASE_URL`, and access it via `import.meta.env.VITE_API_BASE_URL`.
