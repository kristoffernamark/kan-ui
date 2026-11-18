---
name: kan
description: Use for any UI work in Kristoffer's personal projects (portfolio, running tools, PM tools) — setting up a new React/Vite/Tailwind project, building screens, or adding components. Applies the KAN design system (Stone palette, Instrument Sans + IBM Plex Mono, shadcn-based components from the @kan registry).
---

# KAN

KAN is Kristoffer's personal design system: dark first, monochrome Stone palette, quiet precision. Every screen in a personal project is built from KAN tokens and components. Don't invent colours, fonts, radii, shadows or spacing.

Not for SeventyOne Consulting work. That has its own brand.

## Setting up a new project

1. Vite + React + TypeScript, Tailwind v4 via `@tailwindcss/vite`, `@/*` path alias to `./src/*` (in `vite.config.ts` and both tsconfigs).
2. Create `components.json`:
   ```json
   {
     "$schema": "https://ui.shadcn.com/schema.json",
     "style": "new-york",
     "rsc": false,
     "tsx": true,
     "tailwind": { "config": "", "css": "src/styles/kan.css", "baseColor": "", "cssVariables": true, "prefix": "" },
     "aliases": { "components": "@/components", "utils": "@/lib/utils", "ui": "@/components/ui", "lib": "@/lib", "hooks": "@/hooks" },
     "iconLibrary": "lucide",
     "registries": { "@kan": "https://kan-ui.netlify.app/r/{name}.json" }
   }
   ```
3. `npx shadcn@latest add @kan/kan-theme` and then the components you need, e.g. `npx shadcn@latest add @kan/button @kan/input @kan/stat`.
4. Import `./styles/kan.css` once in `main.tsx`. Remove Vite's default CSS.
5. Theme: dark by default. Use the `useKanTheme()` hook for a toggle; never force a theme or follow the OS unless the user picks that.

Available from `@kan`: `kan-theme`, `button`, `input` (Input + Field, FieldLabel, FieldHint), `stat` (Stat, StatLabel, StatValue, StatDelta, StatBars), `status` (StatusLabel, Banner), `segmented` (Segmented, SegmentedItem).

A component KAN doesn't have yet (dialog, menu, table, toast…): add the standard shadcn one (`npx shadcn@latest add dialog`). It picks up KAN's colours automatically via the mapped variables. Then apply the rules below (sharp radii, no shadow unless floating, sentence case, mono for numbers) and tell Kristoffer so it can be added to KAN.

## Rules

**Colour: brightness is emphasis, colour means state.**
- Ground `bg-background`, sections `bg-surface-1`, cards `bg-card`, popovers `bg-popover`.
- Text: `text-foreground` (primary), `text-subtle` (supporting, units), `text-muted-foreground` (placeholders, captions, timestamps — never body copy).
- Borders: `border` (hairline, default), `border-border-strong` (control outlines).
- One primary button per view (`variant="primary"`). Everything else is secondary or ghost.
- `text-success` / `text-warning` / `text-danger` only for real states, never decoration. A destructive action is `variant="danger"` (red text), never a red fill.
- Charts: one `bg-data-active` mark for the point that matters; everything else `bg-data-muted`.
- Never use raw hex values or Tailwind's default palette (`zinc-*`, `blue-*`, …).

**Type**
- Instrument Sans for interface and prose, weights 400 and 500 only.
- IBM Plex Mono for every number, coordinate, timestamp and code: use `kan-num` (mono + tabular figures).
- Overline labels above values and fields: `kan-label` (mono, 11px, uppercase, tracked).
- Sizes: `text-display-xl`, `text-display` (portfolio/writing only), `text-title`, `text-heading`, `text-body` (default), `text-small`, `text-caption`; data: `text-metric-xl`, `text-metric`, `text-data`.
- Sentence case everywhere. Verb-first button labels, 1–3 words. No "successfully", "please" or exclamation marks.

**Space and shape**
- Tailwind's 4px spacing scale only (`gap-2`, `p-4`, `p-5`, `gap-6`, `py-8`…). No arbitrary values.
- Controls `h-9` (default), `h-7` (dense), `h-11` (touch-first, outdoors).
- Radius: `rounded-md` (4px) controls, `rounded-lg` (8px) cards and dialogs, `rounded-full` only for status dots and avatars. Nothing rounder.
- Borders, not shadows. Only floating layers get `shadow-popover`.
- Content max-width `max-w-[1080px]` for tools, `max-w-[680px]` for prose.

**Motion**
- Default transitions are already 120ms with KAN easing (`ease-kan`). Enter/exit 200ms, page transitions 320ms via the View Transitions API.
- Nothing bounces or loops. Reduced motion is handled in `kan.css`.

**Icons and accessibility**
- Lucide, stroke 1.5, 16px inline (default in Button), 20px standalone. Icon-only buttons need `aria-label`.
- Focus is always visible: use `kan-focus` on custom interactive elements.
- Never signal state with colour alone: a status dot always has a word.

**Restraint**
- Prefer fewer elements. If a control can be a single quiet line of text, make it one.
- Show units and sources. Never frame a number so it misleads.
- Empty states invite rather than apologise: "Plan your first loop", not "Nothing here yet".

## Source of truth

The KAN design system artifact holds the tokens and guidelines: https://claude.ai/artifact/8kKeQhw9TycKdcYdZ7eDL1. `kan.css` in the kan-ui repo mirrors it. When a token changes, change the design system first, then `kan.css`, then re-run `npx shadcn@latest add @kan/kan-theme --overwrite` in each project.
