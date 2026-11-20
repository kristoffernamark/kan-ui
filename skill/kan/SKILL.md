---
name: kan
description: Use for any UI work in Kristoffer's personal projects (portfolio, running tools, PM tools, and customer-facing apps via product mode) — setting up a new React/Vite/Tailwind project, building screens, or adding components. Applies the KAN design system (Stone palette, Instrument Sans + IBM Plex Mono, shadcn-based components from the @kan registry).
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
     "registries": { "@kan": "https://kan-design-system.netlify.app/r/{name}.json" }
   }
   ```
3. `npx shadcn@latest add @kan/kan-theme` and then the components you need, e.g. `npx shadcn@latest add @kan/button @kan/input @kan/stat`.
4. Import `./styles/kan.css` once in `main.tsx`. Remove Vite's default CSS.
5. Theme: dark by default. Use the `useKanTheme()` hook for a toggle; never force a theme or follow the OS unless the user picks that.

Available from `@kan`: `kan-theme`, `button`, `input` (Input + Field, FieldLabel, FieldHint), `stat` (Stat, StatLabel, StatValue, StatDelta, StatBars), `status` (StatusLabel, Banner), `segmented` (Segmented, SegmentedItem), `kan-logo` (KanWordmark, KanIcon), `side-head` (SideHead, editorial only), `nav-bar` (NavBar, NavItem), `side-nav` (SideNav, SideNavGroup, SideNavItem), `toaster` (Toaster, toast).

A component KAN doesn't have yet (dialog, menu, table…): add the standard shadcn one (`npx shadcn@latest add dialog`). It picks up KAN's colours automatically via the mapped variables. Then apply the rules below (sharp radii, no shadow unless floating, sentence case, mono for numbers) and tell Kristoffer so it can be added to KAN.

## Personal or product mode

Decide first, and ask if it isn't clear: is this a tool for Kristoffer (and people like him), or an app other people use?

- **Personal (default):** nothing to set. Dark until the user picks, monochrome, lowercase mono labels with the square.
- **Product:** set `<html data-mode="product">` and use `useKanTheme({ followSystem: true })`. Same components; kan.css switches them to sentence-case sans labels, a 16px base, 36/44/48px controls, 10px status squares and one brand accent.
  - Set the product's accent once: `--kan-brand`, `--kan-on-brand`, `--kan-brand-soft`, with a dark variant under `[data-mode="product"]:not([data-theme="light"])`. Check 4.5:1 contrast. Default is blue #3d63dd / #8fa9ff.
  - The accent marks the primary action, the current place (today, the active nav item) and progress. Never status, never decoration.
  - Every status square has a word next to it. Nothing important is hover-only.
  - Write labels in sentence case in the markup ("This week"); personal mode lowercases them with CSS.
  - Add one line of help under any expert term (load, form, pace zones).
  - Format dates, numbers and units with `Intl` for the user's locale (sv-SE: "20 nov", "10,1 km", 24-hour clock).
- Use `h-(--kan-control-md)` / `size-(--kan-status-square)` instead of fixed heights in new components, so they follow the mode.

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
- Instrument Serif (`font-serif`) for editorial headlines only (portfolio, articles, covers): upright, at most one phrase in italic, may end in the square full stop. Never in tools.
- IBM Plex Mono for every number, coordinate, timestamp and code: use `kan-num` (mono + tabular figures).
- Section labels in tools: `kan-label` (mono, 13px, lowercase, led by the KAN square). Row labels and captions inside a section: `kan-label-plain` (same, no square). Never uppercase tracked labels: they read as generic.
- Form field labels: plain sentence case sans (`FieldLabel`), no square.
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

**Navigation and feedback**
- Every app gets `NavBar` (logo, items, actions) and, with several views, `SideNav`. When a SideNav lists the views, pass `inlineItems={false}` so they only appear in the mobile menu.
- The active item is marked with the square, never a filled background. NavBar actions never hold a primary button.
- Mount `<Toaster />` once at the root and import `toast` from `@/components/ui/toaster`. One sentence per toast; confirmations fade, `toast.error` stays until dismissed.

**Icons and accessibility**
- Lucide, stroke 1.5, 16px inline (default in Button), 20px standalone. Icon-only buttons need `aria-label`.
- Focus is always visible: use `kan-focus` on custom interactive elements.
- Never signal state with colour alone: a status dot always has a word.

**The square is the signature**
- One small square marks what matters: the logo's full stop, section labels, status, the current point in a chart, the active nav item, the end of a headline or article. Never decoration.
- Status markers are squares, not round dots. `radius-full` stays for avatars only.

**Editorial surfaces (portfolio, writing, covers)**
- Structure with side-heads (`SideHead`: the label in its own margin column), space and hairlines, not cards.
- The map layer: coordinates as quiet context, contour lines from real elevation data at 5–7% opacity, at most one scale bar or registration cross. Never in tools or forms.

**Restraint**
- Prefer fewer elements. If a control can be a single quiet line of text, make it one.
- Show units and sources. Never frame a number so it misleads.
- Empty states invite rather than apologise: "Plan your first loop", not "Nothing here yet".

## Source of truth

The KAN design system artifact holds the tokens and guidelines: https://claude.ai/artifact/8kKeQhw9TycKdcYdZ7eDL1. `kan.css` in the kan-ui repo mirrors it. When a token changes, change the design system first, then `kan.css`, then re-run `npx shadcn@latest add @kan/kan-theme --overwrite` in each project.
