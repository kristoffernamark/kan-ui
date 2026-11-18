import * as React from "react"
import { ArrowRight, Download } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldHint, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { KanIcon, KanWordmark } from "@/components/ui/kan-logo"
import { Segmented, SegmentedItem } from "@/components/ui/segmented"
import { Stat, StatBars, StatDelta, StatLabel, StatValue } from "@/components/ui/stat"
import { Banner, StatusLabel } from "@/components/ui/status"

import { COLOR_GROUPS, PRINCIPLES, RADII, SPACING, SPACING_USAGE, STONE, TYPE_STYLES } from "./data"
import { Code, CodeBlock, CssValue, PageHeader, Rules, Section, ThemePanel } from "./ui"

export const PAGES = [
  { id: "overview", label: "Overview" },
  { id: "colour", label: "Colour" },
  { id: "typography", label: "Typography" },
  { id: "space", label: "Space and shape" },
  { id: "motion", label: "Motion" },
  { id: "components", label: "Components" },
  { id: "logo", label: "Logo" },
  { id: "guidelines", label: "Writing and access" },
  { id: "build", label: "Build with KAN" },
] as const
export type PageId = (typeof PAGES)[number]["id"]

/* ---------------- Overview ---------------- */

function Overview() {
  return (
    <>
      <header className="mb-12">
        <h1>
          <span className="sr-only">KAN</span>
          <KanWordmark className="h-16" aria-hidden="true" />
        </h1>
        <p className="mt-6 max-w-[52ch] text-heading font-normal text-subtle">
          Quiet precision for the things I build. KAN is Kristoffer Avci Nåmark's personal design system: dark first,
          monochrome, and made so every new project starts finished rather than from scratch.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="primary" size="lg">
            <a href="#build">
              Build with KAN <ArrowRight />
            </a>
          </Button>
          <Button asChild size="lg">
            <a href="https://github.com/kristoffernamark/kan-ui">View the code</a>
          </Button>
        </div>
      </header>

      <Section title="Principles" note="Seven rules that decide every screen. When in doubt, choose the quieter option.">
        <ol className="max-w-[72ch] divide-y border-y">
          {PRINCIPLES.map(([title, body], i) => (
            <li key={title} className="grid gap-1 py-4 sm:grid-cols-[48px_220px_1fr] sm:gap-4">
              <span className="kan-num text-data text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-medium">{title}</span>
              <span className="text-subtle">{body}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="What's here">
        <ul className="divide-y border-y">
          {PAGES.filter((p) => p.id !== "overview").map((p) => (
            <li key={p.id}>
              <a
                href={`#${p.id}`}
                className="kan-focus group flex h-12 items-center justify-between px-1 text-body hover:bg-accent"
              >
                {p.label}
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}

/* ---------------- Colour ---------------- */

function Swatch({ token, theme }: { token: string; theme: "dark" | "light" }) {
  const isText = token.startsWith("text") || token === "on-primary" || ["danger", "success", "warning"].includes(token)
  return (
    <ThemePanel theme={theme} className="flex h-full items-center gap-3 p-3">
      <span
        className={cn("grid size-9 shrink-0 place-items-center rounded-md border", isText && "bg-background")}
        style={isText ? { color: `var(--kan-${token})` } : { background: `var(--kan-${token})` }}
        aria-hidden="true"
      >
        {isText && <span className="text-body font-medium">Aa</span>}
      </span>
      <CssValue name={`--kan-${token}`} />
    </ThemePanel>
  )
}

function Colour() {
  return (
    <>
      <PageHeader label="Foundations" title="Colour">
        Stone: warm greys from ink to paper. Brightness carries emphasis; the only hues are for state. Every value on this
        page is read live from <Code>kan.css</Code>.
      </PageHeader>

      {COLOR_GROUPS.map((group) => (
        <Section key={group.title} title={group.title} note={group.note}>
          <div className="overflow-hidden rounded-lg border">
            <div className="hidden grid-cols-[1.2fr_1fr_1fr] border-b bg-surface-1 md:grid">
              <span className="kan-label px-3 py-2 text-muted-foreground">Token</span>
              <span className="kan-label border-l px-3 py-2 text-muted-foreground">Dark</span>
              <span className="kan-label border-l px-3 py-2 text-muted-foreground">Light</span>
            </div>
            {group.tokens.map((t) => (
              <div key={t.name} className="grid border-b last:border-b-0 md:grid-cols-[1.2fr_1fr_1fr]">
                <div className="px-3 py-3">
                  <p className="font-mono text-data">{t.name}</p>
                  <p className="text-small text-subtle">{t.usage}</p>
                  <p className="mt-1 font-mono text-caption text-muted-foreground">{t.className}</p>
                </div>
                <div className="border-t md:border-t-0 md:border-l">
                  <Swatch token={t.name} theme="dark" />
                </div>
                <div className="border-t md:border-t-0 md:border-l">
                  <Swatch token={t.name} theme="light" />
                </div>
              </div>
            ))}
          </div>
        </Section>
      ))}

      <Section title="Stone ramp" note="The raw scale the tokens point at. Product code never uses these directly.">
        <div className="grid grid-cols-4 overflow-hidden rounded-lg border sm:grid-cols-8">
          {STONE.map(([step, hex]) => (
            <div key={step} className="border-b border-l first:border-l-0 sm:[&:nth-child(8n+1)]:border-l-0">
              <div className="h-14" style={{ background: hex }} />
              <div className="px-2 py-1.5">
                <p className="kan-num text-caption">{step}</p>
                <p className="kan-num text-caption text-muted-foreground">{hex}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}

/* ---------------- Typography ---------------- */

function MeasuredSample({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = React.useRef<HTMLParagraphElement>(null)
  const [m, setM] = React.useState("")
  React.useLayoutEffect(() => {
    const measure = () => {
      if (!ref.current) return
      const cs = getComputedStyle(ref.current)
      setM(`${parseFloat(cs.fontSize)}/${parseFloat(cs.lineHeight)} · ${cs.fontWeight}`)
    }
    measure()
    document.fonts?.ready.then(measure)
  }, [])
  return (
    <>
      <p ref={ref} className={cn("min-w-0 truncate", className)}>
        {children}
      </p>
      <span className="kan-num text-data text-muted-foreground">{m}</span>
    </>
  )
}

function Typography() {
  return (
    <>
      <PageHeader label="Foundations" title="Typography">
        Two families. Instrument Sans for everything you read; IBM Plex Mono for everything you measure. Weights 400 and 500
        only. Both are self-hosted, so no requests go to Google.
      </PageHeader>

      <Section title="Families">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border p-5">
            <p className="kan-label text-subtle">Sans</p>
            <p className="mt-3 text-display font-medium">Aa Åå Öö</p>
            <p className="mt-2 font-mono text-data text-muted-foreground">Instrument Sans · font-sans</p>
            <p className="mt-3 text-small text-subtle">Interface and prose. Tight tracking at large sizes, none in body.</p>
          </div>
          <div className="rounded-lg border p-5">
            <p className="kan-label text-subtle">Mono</p>
            <p className="kan-num mt-3 text-display font-medium">0123 4:56</p>
            <p className="mt-2 font-mono text-data text-muted-foreground">IBM Plex Mono · kan-num / font-mono</p>
            <p className="mt-3 text-small text-subtle">Numbers, data, coordinates, code and overline labels.</p>
          </div>
        </div>
      </Section>

      {TYPE_STYLES.map((group) => (
        <Section key={group.title} title={group.title}>
          <div className="divide-y border-y">
            {group.styles.map((s) => (
              <div key={s.name} className="grid items-baseline gap-x-6 gap-y-1 py-4 md:grid-cols-[160px_1fr_auto]">
                <div>
                  <p className="font-mono text-data">{s.name}</p>
                  <p className="text-caption text-muted-foreground">{s.usage}</p>
                </div>
                <MeasuredSample className={s.className}>{s.sample}</MeasuredSample>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </>
  )
}

/* ---------------- Space and shape ---------------- */

function Space() {
  return (
    <>
      <PageHeader label="Foundations" title="Space and shape">
        A 4px grid, sharp corners and hairlines. Roundness is a signal, not decoration.
      </PageHeader>

      <Section title="Spacing" note="Tailwind's default scale is KAN's scale: p-4 is 16px. Never use values between the steps.">
        <div className="divide-y border-y">
          {SPACING.map((n) => (
            <div key={n} className="grid grid-cols-[72px_64px_1fr] items-center gap-4 py-2.5 sm:grid-cols-[72px_64px_120px_1fr]">
              <span className="font-mono text-data">{n}</span>
              <span className="kan-num text-data text-muted-foreground">{n * 4}px</span>
              <span className="h-3 rounded-sm bg-data-active" style={{ width: n * 4 }} aria-hidden="true" />
              <span className="hidden text-small text-subtle sm:block">{SPACING_USAGE[n]}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radius">
        <div className="grid gap-6 sm:grid-cols-4">
          {RADII.map((r) => (
            <div key={r.name}>
              <div className={cn("h-20 border border-border-strong bg-surface-1", r.name)} />
              <p className="mt-3 font-mono text-data">{r.name}</p>
              <p className="kan-num text-caption text-muted-foreground">{r.px}</p>
              <p className="mt-1 text-small text-subtle">{r.usage}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Control heights">
        <div className="flex flex-wrap items-end gap-6">
          {[
            ["h-7", "28px", "Dense toolbars", "sm"],
            ["h-9", "36px", "Default", "default"],
            ["h-11", "44px", "Touch-first, outdoors", "lg"],
          ].map(([cls, px, use, size]) => (
            <div key={cls} className="flex flex-col gap-2">
              <Button size={size as "sm" | "default" | "lg"}>Button</Button>
              <p className="font-mono text-data">
                {cls} <span className="text-muted-foreground">· {px}</span>
              </p>
              <p className="text-small text-subtle">{use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Elevation" note="Surfaces step up in brightness. Only floating layers get a shadow.">
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            ["bg-background", "bg"],
            ["bg-surface-1", "surface-1"],
            ["bg-card", "surface-2"],
            ["bg-popover shadow-popover", "surface-3 + shadow-popover"],
          ].map(([cls, label]) => (
            <div key={label} className={cn("flex h-24 items-end rounded-lg border p-3", cls)}>
              <span className="font-mono text-caption text-subtle">{label}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}

/* ---------------- Motion ---------------- */

function Motion() {
  const [on, setOn] = React.useState(false)
  return (
    <>
      <PageHeader label="Foundations" title="Motion">
        Short, calm and functional. Motion confirms that something happened; it never performs.
      </PageHeader>
      <Section title="Durations and easing">
        <div className="divide-y border-y">
          {[
            ["120ms", "Hover, press, colour changes", "Default for every transition"],
            ["200ms", "Enter and exit", "Menus, popovers, toasts"],
            ["320ms", "Page transitions", "View Transitions API"],
          ].map(([d, use, note]) => (
            <div key={d} className="grid gap-1 py-3 sm:grid-cols-[96px_1fr_1fr] sm:gap-4">
              <span className="kan-num text-data">{d}</span>
              <span>{use}</span>
              <span className="text-small text-subtle">{note}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-small text-subtle">
          One curve for everything: <Code>cubic-bezier(0.2, 0, 0, 1)</Code> (<Code>ease-kan</Code>). Nothing bounces or
          loops. With reduced motion turned on, transitions drop to instant.
        </p>
      </Section>
      <Section title="Try it">
        <div className="flex items-center gap-6">
          <Button onClick={() => setOn(!on)}>{on ? "Reset" : "Play 200ms"}</Button>
          <div className="relative h-11 w-64 rounded-md border bg-surface-1">
            <span
              className="absolute top-1/2 left-1.5 size-7 -translate-y-1/2 rounded-sm bg-data-active transition-transform duration-200 ease-kan"
              style={{ transform: `translate(${on ? 208 : 0}px, -50%)` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </Section>
    </>
  )
}

/* ---------------- Components ---------------- */

function Install({ name }: { name: string }) {
  return (
    <p className="mt-4 font-mono text-caption text-muted-foreground">
      npx shadcn@latest add @kan/{name}
    </p>
  )
}

function Components() {
  const [range, setRange] = React.useState("week")
  const [pace, setPace] = React.useState("5:7")
  const paceInvalid = !/^\d{1,2}:\d{2}$/.test(pace)
  return (
    <>
      <PageHeader label="Library" title="Components">
        Built on shadcn/ui and Radix, restyled to KAN's rules. Each project copies in what it needs from the{" "}
        <Code>@kan</Code> registry and owns its copy. A component that isn't here yet starts from shadcn's original.
      </PageHeader>

      <Section
        title="Button"
        note="One primary per view. Secondary is the default. Danger is red text, never a red fill. Avoid disabled buttons; explain on press instead."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Plan loop</Button>
          <Button>
            <Download /> Export
          </Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="danger">Delete route</Button>
          <Button size="sm">Small</Button>
          <Button variant="link">View sources</Button>
        </div>
        <Install name="button" />
      </Section>

      <Section
        title="Input and field"
        note="The label is always visible, mono and uppercase. The placeholder is a real example. An error says what happened and how to fix it."
      >
        <div className="grid gap-6 sm:grid-cols-3">
          <Field>
            <FieldLabel htmlFor="start">Start</FieldLabel>
            <Input id="start" placeholder="Hornsgatan 12" />
            <FieldHint>Street or coordinates.</FieldHint>
          </Field>
          <Field>
            <FieldLabel htmlFor="distance">Distance</FieldLabel>
            <Input id="distance" defaultValue="12 km" />
            <FieldHint>Loops within 10% of this.</FieldHint>
          </Field>
          <Field>
            <FieldLabel htmlFor="pace">Pace</FieldLabel>
            <Input id="pace" value={pace} onChange={(e) => setPace(e.target.value)} aria-invalid={paceInvalid} />
            <FieldHint error={paceInvalid}>{paceInvalid ? "Use mm:ss, like 5:10." : "Minutes per km."}</FieldHint>
          </Field>
        </div>
        <Install name="input" />
      </Section>

      <Section
        title="Stat"
        note="One number that matters, always with its unit. Colour the change only when the direction is genuinely good or bad. One active bar."
      >
        <div className="grid items-start gap-6 sm:grid-cols-3">
          <Stat>
            <StatLabel>Weekly distance</StatLabel>
            <StatValue hero unit="km">42.6</StatValue>
            <StatDelta tone="positive">+6.1 km vs last week</StatDelta>
            <StatBars values={[18, 28, 13, 35, 25, 22, 42.6]} startLabel="w40" endLabel="w46" />
          </Stat>
          <Stat>
            <StatLabel>Avg pace</StatLabel>
            <StatValue unit="/km">5:12</StatValue>
            <StatDelta>Same as last week</StatDelta>
          </Stat>
          <Stat>
            <StatLabel>Salted streets</StatLabel>
            <StatValue unit="km">318</StatValue>
            <StatDelta>Updated 06:40</StatDelta>
          </Stat>
        </div>
        <Install name="stat" />
      </Section>

      <Section title="Status" note="A dot plus a word: the word carries the meaning on its own. Banners are one sentence.">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            <StatusLabel>Draft</StatusLabel>
            <StatusLabel tone="success">Salted</StatusLabel>
            <StatusLabel tone="warning">Partly salted</StatusLabel>
            <StatusLabel tone="danger">Not cleared</StatusLabel>
          </div>
          <Banner tone="warning" className="max-w-md">
            Salting data is 3 hours old. Routes may have changed.
          </Banner>
        </div>
        <Install name="status" />
      </Section>

      <Section title="Segmented" note="Two to five views or units of the same content. Always keeps one selection.">
        <div className="flex flex-wrap items-center gap-4">
          <Segmented value={range} onValueChange={setRange} aria-label="Time range">
            <SegmentedItem value="week">Week</SegmentedItem>
            <SegmentedItem value="month">Month</SegmentedItem>
            <SegmentedItem value="year">Year</SegmentedItem>
          </Segmented>
          <Segmented defaultValue="km" aria-label="Unit">
            <SegmentedItem value="km">km</SegmentedItem>
            <SegmentedItem value="mi">mi</SegmentedItem>
          </Segmented>
        </div>
        <Install name="segmented" />
      </Section>

      <Section title="Example page" note="A landing page with a hero and menu, built only from KAN.">
        <Button asChild>
          <a href="/landing.html">
            Open the landing page <ArrowRight />
          </a>
        </Button>
      </Section>
    </>
  )
}

/* ---------------- Logo ---------------- */

const LOGO_FILES = [
  ["kan-wordmark-ink.svg", "Wordmark, ink", "Light grounds"],
  ["kan-wordmark-paper.svg", "Wordmark, paper", "Dark grounds"],
  ["kan-icon-ink.svg", "Icon, ink", "Light grounds"],
  ["kan-icon-paper.svg", "Icon, paper", "Dark grounds"],
  ["kan-app-icon.svg", "App icon", "512px ink tile with k."],
  ["kan-favicon.svg", "Favicon", "32px ink tile with k."],
] as const

function Logo() {
  return (
    <>
      <PageHeader label="Brand" title="Logo">
        The name, set quietly: lowercase "kan" in Instrument Sans with a square full stop. In Swedish it reads as a calm
        statement, <em>kan.</em> (can.). The full stop is the one detail that makes it ours: square, like every corner in
        KAN.
      </PageHeader>

      <Section title="Wordmark and icon" note={'The icon is "k." on its own, for places the wordmark won\'t fit.'}>
        <div className="grid overflow-hidden rounded-lg border sm:grid-cols-2">
          <ThemePanel theme="dark" className="flex h-56 items-center justify-center gap-12">
            <KanWordmark className="h-12" />
            <KanIcon className="h-12" />
          </ThemePanel>
          <ThemePanel theme="light" className="flex h-56 items-center justify-center gap-12 border-t sm:border-t-0 sm:border-l">
            <KanWordmark className="h-12" />
            <KanIcon className="h-12" />
          </ThemePanel>
        </div>
      </Section>

      <Section title="App icon and favicon" note={'"k." centred on an ink tile. The OS rounds app icon corners; the favicon has a 4px radius.'}>
        <div className="flex flex-wrap items-end gap-8">
          {[96, 48, 32, 16].map((size) => (
            <div key={size} className="flex flex-col items-start gap-2">
              <img src={size >= 48 ? "/brand/kan-app-icon.svg" : "/brand/kan-favicon.svg"} width={size} height={size} alt="" className={size >= 48 ? "rounded-lg border" : "rounded-sm border"} />
              <span className="kan-num text-data text-muted-foreground">{size}px</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Rules">
        <Rules
          items={[
            <>Always lowercase, always with the square full stop. Never "KAN." or "Kan." in the logo.</>,
            <>Use the wordmark wherever there's room; "k." where there isn't (app icons, avatars, favicons).</>,
            <>Ink on light grounds, paper on dark. Never colour the logo, never add effects.</>,
            <>Clear space: at least the width of the full stop on every side. Minimum size: wordmark 16px tall, icon 16px.</>,
            <>Use the files, never retype the name in a font: the spacing and the full stop are drawn, not typed.</>,
            <>In running text the name is written KAN.</>,
          ]}
        />
      </Section>

      <Section title="Files">
        <ul className="divide-y border-y">
          {LOGO_FILES.map(([file, name, use]) => (
            <li key={file} className="flex items-center justify-between gap-4 py-2.5">
              <div className="min-w-0">
                <p>{name}</p>
                <p className="text-small text-muted-foreground">{use}</p>
              </div>
              <Button asChild variant="ghost" size="sm">
                <a href={`/brand/${file}`} download>
                  <Download /> SVG
                </a>
              </Button>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-small text-subtle">
          In code, use <Code>KanWordmark</Code> and <Code>KanIcon</Code> from <Code>@kan/kan-logo</Code>: they draw in{" "}
          <Code>currentColor</Code> and follow the theme.
        </p>
      </Section>
    </>
  )
}

/* ---------------- Writing and access ---------------- */

function Guidelines() {
  return (
    <>
      <PageHeader label="Guidelines" title="Writing and access">
        The interface speaks plainly and works for everyone. These rules apply to every screen.
      </PageHeader>
      <Section title="Voice">
        <Rules
          items={[
            <>Sentence case everywhere: "Plan loop", not "Plan Loop".</>,
            <>Short, direct, verb first. Buttons are 1–3 words: "Export route", "Save changes".</>,
            <>No exclamation marks, no "successfully", no "please". A confirmation is "Saved".</>,
            <>Errors say what happened and how to fix it: "Use mm:ss, like 5:10."</>,
            <>Units are always shown, in the softer colour: 42.6 km, 5:12 /km.</>,
            <>Empty states invite rather than apologise: "Plan your first loop", not "Nothing here yet".</>,
            <>English by default. A Swedish tool is fully Swedish, never mixed within a screen.</>,
          ]}
        />
      </Section>
      <Section title="Accessibility">
        <Rules
          items={[
            <>Text meets 4.5:1 against its ground in both themes. Status colours are checked against the page.</>,
            <>Focus is always visible: a 2px outline in the focus colour, offset 2px.</>,
            <>Never signal state with colour alone. A status dot always has a word.</>,
            <>Real elements: buttons are buttons, links are links. Icon-only buttons have a label.</>,
            <>Touch-first screens use 44px controls. Reduced motion is respected.</>,
          ]}
        />
      </Section>
      <Section title="Icons">
        <Rules
          items={[
            <>Lucide, outline, stroke 1.5, at 16px inline or 20px standalone, in <Code>currentColor</Code>.</>,
            <>Icons support labels; they rarely replace them.</>,
          ]}
        />
      </Section>
    </>
  )
}

/* ---------------- Build ---------------- */

const COMPONENTS_JSON = `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": { "config": "", "css": "src/styles/kan.css", "baseColor": "", "cssVariables": true, "prefix": "" },
  "aliases": { "components": "@/components", "utils": "@/lib/utils", "ui": "@/components/ui", "lib": "@/lib", "hooks": "@/hooks" },
  "iconLibrary": "lucide",
  "registries": { "@kan": "https://kan-design-system.netlify.app/r/{name}.json" }
}`

function Build() {
  return (
    <>
      <PageHeader label="Guidelines" title="Build with KAN">
        A new project gets the theme and components from the <Code>@kan</Code> registry. With Claude Code, say "set this
        up with KAN" and the skill does the rest.
      </PageHeader>
      <Section title="1. Create the project" note="Vite, React and TypeScript, with Tailwind v4 and the @/ path alias.">
        <CodeBlock label="Terminal" code={`npm create vite@latest my-tool -- --template react-ts\ncd my-tool && npm install\nnpm install tailwindcss @tailwindcss/vite`} />
      </Section>
      <Section title="2. Point shadcn at KAN" note="Save as components.json. baseColor stays empty: KAN supplies the whole palette.">
        <CodeBlock label="components.json" code={COMPONENTS_JSON} />
      </Section>
      <Section title="3. Add the theme and components">
        <CodeBlock
          label="Terminal"
          code={`npx shadcn@latest add @kan/kan-theme\nnpx shadcn@latest add @kan/button @kan/input @kan/stat @kan/status @kan/segmented @kan/kan-logo`}
        />
        <p className="mt-4 text-small text-subtle">
          Then import <Code>./styles/kan.css</Code> once in <Code>main.tsx</Code> and remove Vite's default CSS.
        </p>
      </Section>
      <Section title="Updating" note="Projects own their copies, so nothing breaks when KAN changes.">
        <Rules
          items={[
            <>Change the token or rule in KAN first, then in kan-ui, and push. The registry redeploys.</>,
            <>In a project that should get the change: <Code>npx shadcn@latest add @kan/&lt;item&gt; --overwrite</Code>.</>,
            <>Missing a component? Start from shadcn's original, restyle it to KAN's rules, then add it to the registry.</>,
          ]}
        />
      </Section>
    </>
  )
}

export const PAGE_COMPONENTS: Record<PageId, () => React.JSX.Element> = {
  overview: Overview,
  colour: Colour,
  typography: Typography,
  space: Space,
  motion: Motion,
  components: Components,
  logo: Logo,
  guidelines: Guidelines,
  build: Build,
}
