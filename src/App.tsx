import { useState } from "react"
import { Download, Moon, Sun } from "lucide-react"

import { useKanTheme } from "@/hooks/use-kan-theme"
import { Button } from "@/components/ui/button"
import { KanWordmark } from "@/components/ui/kan-logo"
import { Field, FieldHint, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Segmented, SegmentedItem } from "@/components/ui/segmented"
import { Stat, StatBars, StatDelta, StatLabel, StatValue } from "@/components/ui/stat"
import { Banner, StatusLabel } from "@/components/ui/status"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t py-8">
      <h2 className="kan-label mb-5 text-muted-foreground">{title}</h2>
      {children}
    </section>
  )
}

export default function App() {
  const { theme, setTheme } = useKanTheme()
  const [range, setRange] = useState("week")
  const [pace, setPace] = useState("5:7")
  const paceInvalid = !/^\d{1,2}:\d{2}$/.test(pace)

  return (
    <main className="mx-auto max-w-[1080px] px-4 py-12 sm:px-12">
      <header className="mb-12 flex items-start justify-between gap-4">
        <div>
          <h1>
            <span className="sr-only">KAN</span>
            <KanWordmark className="h-10" aria-hidden="true" />
          </h1>
          <p className="mt-4 text-subtle">Quiet precision for the things I build.</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
      </header>

      <Section title="Button">
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
      </Section>

      <Section title="Input">
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
      </Section>

      <Section title="Stat">
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
      </Section>

      <Section title="Status">
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
      </Section>

      <Section title="Segmented">
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
      </Section>
    </main>
  )
}
