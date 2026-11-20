import * as React from "react"
import { ArrowRight, Download } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldHint, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { KanIcon, KanWordmark } from "@/components/ui/kan-logo"
import { Segmented, SegmentedItem } from "@/components/ui/segmented"
import { Stat, StatBars, StatDelta, StatLabel, StatValue } from "@/components/ui/stat"
import { NavBar, NavItem } from "@/components/ui/nav-bar"
import { SideHead } from "@/components/ui/side-head"
import { SideNav, SideNavGroup, SideNavItem } from "@/components/ui/side-nav"
import { toast } from "@/components/ui/toaster"
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
  { id: "modes", label: "Personal and product" },
  { id: "editorial", label: "Editorial" },
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

      <Section title="Principles" note="Eight rules that decide every screen. When in doubt, choose the quieter option.">
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
              <span className="kan-label-plain px-3 py-2 text-muted-foreground">Token</span>
              <span className="kan-label-plain border-l px-3 py-2 text-muted-foreground">Dark</span>
              <span className="kan-label-plain border-l px-3 py-2 text-muted-foreground">Light</span>
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
        Instrument Sans for everything you read, IBM Plex Mono for everything you measure, and Instrument Serif for the
        editorial voice. Weights 400 and 500 only. All self-hosted, so no requests go to Google.
      </PageHeader>

      <Section title="Families">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border p-5">
            <p className="kan-label-plain text-subtle">sans</p>
            <p className="mt-3 text-display font-medium">Aa Åå Öö</p>
            <p className="mt-2 font-mono text-data text-muted-foreground">Instrument Sans · font-sans</p>
            <p className="mt-3 text-small text-subtle">Interface and prose. Tight tracking at large sizes, none in body.</p>
          </div>
          <div className="rounded-lg border p-5">
            <p className="kan-label-plain text-subtle">mono</p>
            <p className="kan-num mt-3 text-display font-medium">0123 4:56</p>
            <p className="mt-2 font-mono text-data text-muted-foreground">IBM Plex Mono · kan-num / font-mono</p>
            <p className="mt-3 text-small text-subtle">Numbers, data, coordinates, code and labels.</p>
          </div>
          <div className="rounded-lg border p-5">
            <p className="kan-label-plain text-subtle">serif</p>
            <p className="mt-3 font-serif text-display">Aa <i>Åå</i> Öö</p>
            <p className="mt-2 font-mono text-data text-muted-foreground">Instrument Serif · font-serif</p>
            <p className="mt-3 text-small text-subtle">Editorial headlines only: portfolio and writing. Never in tools.</p>
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
        note="The label is always visible: plain, sentence case. The placeholder is a real example. An error says what happened and how to fix it."
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
        note="One number that matters, always with its unit. Colour the change only when the direction is genuinely good or bad. One active bar, marked with the square."
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

      <Section title="Status" note="A square plus a word: the word carries the meaning on its own. Banners are one sentence.">
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

      <Section
        title="Nav bar"
        note="Logo, items, actions. The active item is marked with the square, not a filled background. Actions never include a primary button: the page owns that. Below the md breakpoint the items move into a floating panel."
      >
        <div className="overflow-hidden rounded-lg border">
          <NavBar
            className="static"
            label="Example"
            brand={<KanWordmark className="h-5" aria-label="kan." />}
            actions={<Button size="sm">Get in touch</Button>}
          >
            <NavItem href="#components" active>
              Work
            </NavItem>
            <NavItem href="#components">Tools</NavItem>
            <NavItem href="#components">Writing</NavItem>
          </NavBar>
          <div className="h-24 bg-surface-1" />
        </div>
        <Install name="nav-bar" />
      </Section>

      <Section title="Side nav" note="For tools and docs with several views. Groups are optional, titled with the plain label.">
        <div className="flex gap-12">
          <SideNav className="w-52" label="Example sections">
            <SideNavGroup>
              <SideNavItem href="#components" active>
                Today
              </SideNavItem>
              <SideNavItem href="#components">Loops</SideNavItem>
            </SideNavGroup>
            <SideNavGroup title="data">
              <SideNavItem href="#components">Salt network</SideNavItem>
              <SideNavItem href="#components">Elevation</SideNavItem>
            </SideNavGroup>
          </SideNav>
        </div>
        <Install name="side-nav" />
      </Section>

      <Section
        title="Toast"
        note={'One sentence, a status square, bottom centre. Confirmations fade after 4 seconds; errors stay until dismissed. Write "Saved", never "Saved successfully!".'}
      >
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => toast.success("Saved")}>Success</Button>
          <Button
            onClick={() =>
              toast("GPX downloaded", { action: { label: "Open", onClick: () => {} } })
            }
          >
            With action
          </Button>
          <Button onClick={() => toast.warning("Salting data is 3 hours old")}>Warning</Button>
          <Button onClick={() => toast.error("Couldn't load streets. Try again in a minute.")}>Error</Button>
        </div>
        <p className="mt-4 text-small text-subtle">
          Mount <Code>{"<Toaster />"}</Code> once at the app root, then call <Code>toast()</Code>,{" "}
          <Code>toast.success()</Code>, <Code>toast.warning()</Code> or <Code>toast.error()</Code>.
        </p>
        <Install name="toaster" />
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

/* ---------------- Editorial ---------------- */

function Editorial() {
  return (
    <>
      <PageHeader label="Guidelines" title="Editorial">
        The portfolio and the writing are where KAN meets people, so they get a voice the tools don't need: a serif
        headline, side-heads instead of cards, and a quiet map layer.
      </PageHeader>

      <Section title="Serif headlines" note="Instrument Serif, upright, with one phrase in italic at most. The square full stop ends a headline the way it ends the logo.">
        <p className="max-w-[14ch] font-serif text-[64px] leading-[64px] sm:text-[80px] sm:leading-[80px]">
          I build the tools I wish <i>product people</i> had
          <span className="ml-1 inline-block size-3 bg-foreground align-baseline" aria-hidden="true" />
        </p>
      </Section>

      <Section title="Side-heads" note="On editorial pages, a section's label sits in its own margin column and the content lines up beside it. No card around it.">
        <SideHead label="Now building">
          <ul className="divide-y">
            {[
              ["Salted streets", "Winter loops from the door", "success", "Live"],
              ["Hikyaku", "Training and terrain", "warning", "In progress"],
              ["KAN", "The system behind this page", "success", "Live"],
            ].map(([name, note, tone, status]) => (
              <li key={name} className="flex items-baseline justify-between gap-4 py-3 first:pt-0">
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-small text-muted-foreground">{note}</p>
                </div>
                <StatusLabel tone={tone as "success" | "warning"}>{status}</StatusLabel>
              </li>
            ))}
          </ul>
        </SideHead>
        <p className="mt-6 font-mono text-caption text-muted-foreground">npx shadcn@latest add @kan/side-head</p>
      </Section>

      <Section title="The map layer" note="KAN's own texture, from what the tools are about: terrain, routes and places. Editorial surfaces only.">
        <Rules
          items={[
            <>Coordinates as quiet context: <span className="kan-num">59.32° N · 18.07° E</span> in a header or caption.</>,
            <>Contour lines behind covers and heroes, at 5–7% opacity, drawn from real elevation data (Lantmäteriet), never invented.</>,
            <>Scale bars and registration crosses as structure on large surfaces. At most one of each.</>,
            <>Charts read like map legends: outlined past values, one filled current value with a square marker.</>,
            <>Never in forms or dense tool screens. If it competes with content, remove it.</>,
          ]}
        />
      </Section>

      <Section title="Fewer cards">
        <Rules
          items={[
            <>Cards belong in tools, where they group controls and figures.</>,
            <>On editorial pages, structure comes from space, side-heads and hairlines.</>,
            <>A big number can stand on its own. It doesn't need a box to be important.</>,
          ]}
        />
      </Section>
    </>
  )
}

/* ---------------- Personal and product ---------------- */

function ModeSample({ mode, theme }: { mode: "personal" | "product"; theme: "dark" | "light" }) {
  const [unit, setUnit] = React.useState("km")
  return (
    <div data-mode={mode === "product" ? "product" : undefined} data-theme={theme} className="rounded-lg border bg-background p-5 text-foreground">
      <p className="mb-4 font-mono text-caption text-muted-foreground">
        {mode} · {theme}
      </p>
      <div className="rounded-lg border bg-card p-4">
        <p className="kan-label text-subtle">This week</p>
        <p className="mt-2 kan-num text-metric-xl">
          10.1 <span className="font-sans text-small text-muted-foreground">/ 42.0 km</span>
        </p>
        <div className="mt-4 flex flex-col gap-2 border-t pt-3">
          <div className="flex items-center justify-between">
            <span className="kan-label-plain text-subtle">Thu · Distans</span>
            <StatusLabel tone="success">Done as planned</StatusLabel>
          </div>
          <div className="flex items-center justify-between">
            <span className="kan-label-plain text-subtle">Sat · Långpass</span>
            <StatusLabel>Planned</StatusLabel>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button variant="primary">Add workout</Button>
        <Button>Today</Button>
        <Segmented value={unit} onValueChange={setUnit} aria-label="Unit">
          <SegmentedItem value="km">km</SegmentedItem>
          <SegmentedItem value="mi">mi</SegmentedItem>
        </Segmented>
      </div>
    </div>
  )
}

function Modes() {
  return (
    <>
      <PageHeader label="Guidelines" title="Personal and product">
        KAN has two modes. Personal is for tools you build for yourself and people like you: dense, dark, monochrome.
        Product is for apps other people use: the same palette and type, tuned so a first-time customer understands it.
      </PageHeader>

      <Section title="Side by side" note="The same components, nothing changed but the mode.">
        <div className="grid gap-4 lg:grid-cols-2">
          <ModeSample mode="personal" theme="dark" />
          <ModeSample mode="product" theme="light" />
          <ModeSample mode="personal" theme="light" />
          <ModeSample mode="product" theme="dark" />
        </div>
      </Section>

      <Section title="What changes">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-small">
            <thead className="text-muted-foreground">
              <tr className="border-b">
                <th className="py-2 pr-4 font-normal"></th>
                <th className="py-2 pr-4 font-normal">Personal</th>
                <th className="py-2 font-normal">Product</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                ["Colour", "Monochrome. Brightness is emphasis.", "One brand accent for the primary action, today and progress. Status colours unchanged."],
                ["Labels", "Lowercase mono, led by a square.", "Sentence-case sans, medium weight. Mono stays for numbers."],
                ["Base size", "15px body, 13px small.", "16px body, 14px small."],
                ["Targets", "Controls 28 / 36 / 44px.", "Controls 36 / 44 / 48px. Nothing smaller than 44px to tap."],
                ["Status", "6px square plus a word.", "10px square plus a word, always visible."],
                ["Theme", "Dark until the user picks.", "Follows the device until the user picks."],
                ["Help", "Experts know the terms.", "One line of explanation under anything a newcomer won't know."],
                ["Surfaces", "Subtle layers.", "Stronger layers and borders in dark, so cards read at a glance."],
              ].map(([k, a, b]) => (
                <tr key={k} className="align-top">
                  <td className="py-3 pr-4 font-medium">{k}</td>
                  <td className="py-3 pr-4 text-subtle">{a}</td>
                  <td className="py-3 text-subtle">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Turn it on">
        <CodeBlock label="setup" code={`<html data-mode="product">

/* Your product's accent: one hue, checked at 4.5:1 for text on it */
[data-mode="product"]               { --kan-brand: #3d63dd; --kan-brand-soft: #e4eafb; }
[data-mode="product"]:not([data-theme="light"]) { --kan-brand: #8fa9ff; --kan-brand-soft: #1d2440; }

// React: follow the device until the user picks
const { theme, setTheme } = useKanTheme({ followSystem: true })`} />
      </Section>

      <Section title="Rules for product mode">
        <Rules
          items={[
            <>One accent per product. It marks the primary action, where you are and progress, nothing else. Never use it for status.</>,
            <>Status always has a word next to the square. Colour never carries meaning on its own.</>,
            <>Format for the reader's locale: Swedish users get <span className="kan-num">20 nov</span>, <span className="kan-num">10,1 km</span> and a 24-hour clock. Use <Code>Intl</Code>, never hand-built strings.</>,
            <>Explain the expert terms the first time they appear: load, form, pace zones. One line, under the value.</>,
            <>Nothing important only on hover. Touch has no hover.</>,
            <>The square signature stays: in the logo, the today marker and status. It leaves the labels.</>,
          ]}
        />
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
  modes: Modes,
  editorial: Editorial,
  guidelines: Guidelines,
  build: Build,
}
