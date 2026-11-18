# kan-ui

The code half of **KAN**, Kristoffer's personal design system: a Tailwind v4 theme mapped onto shadcn/ui, KAN-styled components, a shadcn registry that serves them to any project, and a Claude Code skill.

Reference (tokens, guidelines, previews): https://claude.ai/artifact/8kKeQhw9TycKdcYdZ7eDL1

## What's here

| Path | What |
| --- | --- |
| `src/styles/kan.css` | The theme: Stone palette (dark default, light via `data-theme="light"`), shadcn variable mapping, type scale, radii, motion, `kan-label` / `kan-num` / `kan-focus` utilities. Fonts are self-hosted via Fontsource (no Google requests). |
| `src/components/ui/` | `button`, `input` + `field`, `stat`, `status`, `segmented` |
| `src/hooks/use-kan-theme.ts` | Theme toggle that remembers the user's choice |
| `src/App.tsx` | Showcase page with every component |
| `registry.json` | The `@kan` registry definition. `npm run build` writes it to `public/r/*.json` |
| `skill/kan/SKILL.md` | The Claude Code skill |
| `netlify.toml` | Deploys the showcase and the registry as one site |

## One-time setup

1. **Put this folder in a GitHub repo** (e.g. `kan-ui`).
2. **Deploy it to Netlify.** The build runs `shadcn build` and Vite. The site serves the showcase at `/` and the registry at `/r/<name>.json`. If the site gets a URL other than `kan-ui.netlify.app`, replace that URL in `skill/kan/SKILL.md` and `registry.json`.
3. **Install the skill for Claude Code**, so it applies in every project:
   ```sh
   mkdir -p ~/.claude/skills && cp -r skill/kan ~/.claude/skills/
   ```

## Starting a new project

Tell Claude Code "use KAN" or "set this up with KAN". The skill has the steps. Manually:

```sh
npm create vite@latest my-tool -- --template react-ts
cd my-tool && npm install
# add Tailwind v4 (@tailwindcss/vite) and the @/ alias, then create components.json (see the skill)
npx shadcn@latest add @kan/kan-theme @kan/button @kan/input @kan/stat
```

Import `./styles/kan.css` in `main.tsx`. Done.

Note: keep `"baseColor": ""` in `components.json`. KAN supplies the whole palette, so shadcn shouldn't fetch one.

## Changing KAN

1. Change the token or guideline in the design-system artifact.
2. Mirror it in `src/styles/kan.css` (or the component), check the showcase with `npm run dev` in both themes.
3. Push. Netlify redeploys the registry.
4. In a project that should get the update: `npx shadcn@latest add @kan/<item> --overwrite`. Projects you don't touch keep their copy and never break.

## Adding a component

Start from the shadcn original (`npx shadcn@latest add <name>` in this repo), restyle it to KAN's rules (see the skill), add it to `src/App.tsx` and to `registry.json` with `"registryDependencies": ["@kan/kan-theme"]`, and add its guidelines to the design-system artifact.
