# PKHeX.Web.React

The PKHeX.Web UI. Vite owns `index.html`, and `src/index.ts` mounts the app into `#root`. The Engine runs in `PKHeX.Everywhere.Engine.Host`, which `wasmHost` from the Engine SDK boots from `/_framework`. `src/layout` holds the shell: the router, the layouts, the menu and the app-level notification host.

- `npm run dev` builds the Engine host and serves the app and its `_framework` from Vite at http://localhost:5173, with HMR. Dev builds load the demo save on start. `./dev.sh stop` stops it, from any terminal.
- `npm run build` publishes the Engine host in Release and writes the app to `dist`, with the host's `_framework` copied in. `npm run preview` serves `dist`.
- `npm run build:web` skips the .NET publish and only runs TypeScript, Vite and the `404.html` writer. CI uses it after publishing the host itself.
- `public/` holds the static files: `robots.txt`, the icon, the demo save and the sprites. `scripts/write-404.mjs` writes the SPA fallback into `dist`, using `BASE_PATH`.
- `.github/workflows/pages.yml` deploys `dist` to GitHub Pages. The site lives at `/pkhex-web-cn/`, so the workflow sets `BASE_PATH=/pkhex-web-cn/`.

## Localisation

`src/i18n` holds the runtime: `useT()` for UI strings and `useGameNames()` for the species, item, move, ability, nature, form, type, game and location names the engine sends in English.

Translation keys are the English source strings, and a key missing from `src/i18n/zh-Hans.ts` falls back to English. When the upstream adds a string, the app keeps working and the string simply stays English until it is translated.

`src/i18n/names/zh-Hans.json` is generated from PKHeX's own localisation resources, so it stays in step with the game data. Regenerate it after a submodule bump:

```bash
node scripts/i18n-names.mjs
```

## Theming

`src/theme` holds the design tokens and the antd theme. `AppShell` maps them to CSS custom properties, so plain markup can use `var(--pkm-accent)` and friends.

To add a page, create a folder for it under `src/pages` (such as `src/pages/party/PartyPage.tsx`) and add a `<Route>` for it in `src/layout/AppShell.tsx`. Build its URLs in `src/routes.ts`, and link with React Router's `Link`. A plain `<a href>` reloads the app and drops the loaded save.

Put anything another page could use in its own file: components under `src/components`, hooks under `src/hooks`. Use `App.useApp()` for notifications and modals. The shell provides one antd `App`, so a notification outlives the page that raised it.

Give every antd `Table` `scroll={{ x: 'max-content' }}`. A table without `scroll` grows past the window on phones.

Pages get navigation, the theme, the locale and the calculator URL from `src/host.ts`. `changeTheme`, `changeLocale` and `changeCalculatorUrl` write them to localStorage through `src/settings.ts`. The calculator presets live in `src/calculators.ts` and the release notes in `src/news.ts`.

Put a page's actions in `ButtonOrMenu` from `src/components`, not in a row of separate buttons, which runs off the screen on phones.
