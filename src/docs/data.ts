// Reference data for the docs site. Values are NOT stored here: they're read live from kan.css,
// so the site always shows what the code actually ships.

export type ColorToken = { name: string; className: string; usage: string }

export const COLOR_GROUPS: { title: string; note?: string; tokens: ColorToken[] }[] = [
  {
    title: "Surfaces",
    tokens: [
      { name: "bg", className: "bg-background", usage: "Page ground. Everything sits on this." },
      { name: "surface-1", className: "bg-surface-1", usage: "Raised in-flow areas: sidebars, sections, inputs." },
      { name: "surface-2", className: "bg-card", usage: "Cards and panels." },
      { name: "surface-3", className: "bg-popover", usage: "Popovers, menus, dialogs. Pair with shadow-popover." },
    ],
  },
  {
    title: "Lines",
    tokens: [
      { name: "border", className: "border-border", usage: "Default 1px hairline." },
      { name: "border-strong", className: "border-border-strong", usage: "Control outlines and hover borders." },
    ],
  },
  {
    title: "Text",
    tokens: [
      { name: "text", className: "text-foreground", usage: "Primary text. The brightest thing on screen." },
      { name: "text-secondary", className: "text-subtle", usage: "Supporting text and units." },
      { name: "text-muted", className: "text-muted-foreground", usage: "Placeholders, captions, timestamps. Not body copy." },
    ],
  },
  {
    title: "Fills",
    tokens: [
      { name: "fill-primary", className: "bg-primary", usage: "Primary button. One per view." },
      { name: "on-primary", className: "text-primary-foreground", usage: "Text and icons on fill-primary." },
      { name: "fill-hover", className: "bg-accent", usage: "Ghost button and row hover." },
      { name: "fill-selected", className: "bg-selected", usage: "Selected row, active segment." },
      { name: "focus", className: "kan-focus / ring", usage: "Focus outline, 2px with 2px offset." },
    ],
  },
  {
    title: "Data",
    note: "A chart has exactly one data-active mark. Everything else is data-muted.",
    tokens: [
      { name: "data-active", className: "bg-data-active", usage: "The point that matters: now, the selection." },
      { name: "data-muted", className: "bg-data-muted", usage: "Every other mark." },
    ],
  },
  {
    title: "Status",
    note: "Colour means state. Never decoration, never a button fill.",
    tokens: [
      { name: "danger", className: "text-danger", usage: "Errors and destructive actions." },
      { name: "danger-bg", className: "bg-danger-bg", usage: "Behind danger text in banners." },
      { name: "success", className: "text-success", usage: "Confirmations, genuinely positive change." },
      { name: "success-bg", className: "bg-success-bg", usage: "Behind success text in banners." },
      { name: "warning", className: "text-warning", usage: "Caution." },
      { name: "warning-bg", className: "bg-warning-bg", usage: "Behind warning text in banners." },
    ],
  },
]

// The stone ramp is wiring: semantic tokens point at it, product code never does.
export const STONE = [
  ["950", "#0c0b0a"], ["900", "#141311"], ["850", "#1b1a18"], ["800", "#22201e"],
  ["750", "#2b2926"], ["700", "#35322e"], ["600", "#4a4641"], ["500", "#6b665f"],
  ["400", "#8f8a84"], ["300", "#b0aaa2"], ["200", "#c9c4bc"], ["100", "#dedad3"],
  ["50", "#eeeae3"], ["25", "#f6f4ef"], ["10", "#fbfaf7"], ["0", "#ffffff"],
] as const

export type TypeStyle = { name: string; className: string; family: "sans" | "mono"; sample: string; usage: string }

export const TYPE_STYLES: { title: string; styles: TypeStyle[] }[] = [
  {
    title: "Display",
    styles: [
      { name: "display-xl", className: "text-display-xl font-medium", family: "sans", sample: "Quiet precision", usage: "Portfolio hero. One per page." },
      { name: "display", className: "text-display font-medium", family: "sans", sample: "Salted streets", usage: "Page titles on portfolio and writing." },
    ],
  },
  {
    title: "Text",
    styles: [
      { name: "title", className: "text-title font-medium", family: "sans", sample: "Plan a loop", usage: "Screen titles in tools." },
      { name: "heading", className: "text-heading font-medium", family: "sans", sample: "Weekly summary", usage: "Section headings, card titles." },
      { name: "body", className: "text-body", family: "sans", sample: "Routes update when the city salts new streets.", usage: "Default text." },
      { name: "small", className: "text-small", family: "sans", sample: "Last updated 06:40", usage: "Helper text, table cells." },
      { name: "caption", className: "text-caption", family: "sans", sample: "Source: Stockholm stad", usage: "Captions and footnotes." },
    ],
  },
  {
    title: "Data",
    styles: [
      { name: "metric-xl", className: "text-metric-xl kan-num font-medium", family: "mono", sample: "42.6", usage: "The one hero number on a screen." },
      { name: "metric", className: "text-metric kan-num font-medium", family: "mono", sample: "5:12 /km", usage: "Stat tiles and key values." },
      { name: "data", className: "text-data kan-num", family: "mono", sample: "59.3293, 18.0686", usage: "Numbers in tables, coordinates, timestamps." },
      { name: "label", className: "kan-label", family: "mono", sample: "Distance", usage: "Overline labels above values and fields." },
    ],
  },
]

export const SPACING = [1, 2, 3, 4, 5, 6, 8, 12, 16, 24]
export const SPACING_USAGE: Record<number, string> = {
  1: "Icon to label",
  2: "Inside controls, tight groups",
  3: "Control padding, row padding",
  4: "Card padding (mobile), between controls",
  5: "Card padding (desktop)",
  6: "Between cards",
  8: "Between sections in a screen",
  12: "Page margins (desktop)",
  16: "Between major page sections",
  24: "Portfolio section breaks",
}

export const RADII = [
  { name: "rounded-sm", px: "2px", usage: "Badges, chart marks, segments" },
  { name: "rounded-md", px: "4px", usage: "Buttons, inputs, controls" },
  { name: "rounded-lg", px: "8px", usage: "Cards, panels, dialogs. The largest." },
  { name: "rounded-full", px: "9999px", usage: "Status dots and avatars only" },
]

export const PRINCIPLES = [
  ["Brightness is emphasis", "There is no brand colour. The brightest thing on screen is the thing that matters; everything else steps down into the stone greys."],
  ["Colour means state", "Danger, success and warning appear only when something is wrong, done or needs care. Never as decoration."],
  ["Numbers are instruments", "Every figure is set in mono with tabular figures. Labels above values are mono, uppercase and tracked."],
  ["Borders, not shadows", "Structure comes from hairlines and steps in surface. Only floating layers get a shadow."],
  ["Restraint", "Fewer elements, quieter interactions. If a control can be a single quiet line of text, it should be. One primary button per view."],
  ["Honest data", "Never frame a number so it misleads. Show units, show sources, label what's estimated."],
  ["The user picks the theme", "Dark is the default. Light is a full theme, never a degraded one. Neither is forced."],
] as const
