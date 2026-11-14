# Movie Review Frontend

A React app for browsing movies, watching trailers and leaving reviews. It works with the
[Spring Boot API](https://github.com/Kazumi565/movie-web-app-backend).

## Run locally

Install Node.js and npm, then:

```sh
git clone https://github.com/Kazumi565/movie-web-app-frontend.git
cd movie-web-app-frontend
npm ci
npm start
```

Start the backend and import its sample movie catalogue first. Open
`http://localhost:3000`; the API defaults to `http://localhost:8080`. Movie images
and trailers require access to their external hosts. No ngrok tunnel is required.

## API configuration

Copy `.env.example` to `.env.local` to override the API address:

```dotenv
REACT_APP_API_URL=http://localhost:8080
```

Restart the development server after changing this setting. Create React App
embeds this address at build time, so rebuild for a different deployed backend.
Never put secrets in `REACT_APP_` variables: they are visible in the browser.
Configure the backend's `CORS_ALLOWED_ORIGINS` to match the frontend's exact origin.

## Review flow

The form trims whitespace and rejects empty reviews. It disables submission
while saving, then adds the saved review to the list. If the request fails,
your draft stays in place so you can try again.

## Verify

```sh
npm test -- --watchAll=false --runInBand
npm run build
```

The interaction tests mock the API and cover successful saves, failure recovery,
empty input, and pending duplicate submissions. `build/` contains the production
bundle. A static host must route client-side paths such as `/Reviews/tt3915174`
back to `index.html`.

This local demo still uses Create React App. The toolchain needs a separate
dependency review and migration plan. There are no user accounts or review
moderation.
