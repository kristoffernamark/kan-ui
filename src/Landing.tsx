import { useEffect, useState } from "react"
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react"

import { useKanTheme } from "@/hooks/use-kan-theme"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Stat, StatLabel, StatValue } from "@/components/ui/stat"
import { StatusLabel } from "@/components/ui/status"
import { KanWordmark } from "@/components/ui/kan-logo"

/*
 * A landing page built only from KAN.
 * Every `data-kan` attribute names the tokens that element uses; "Show tokens" reveals them.
 */

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Tools", href: "#tools" },
  { label: "Writing", href: "#writing" },
  { label: "About", href: "#about" },
]

const NOW = [
  { name: "Salted streets", note: "Winter running loops on Stockholm's salted streets", tone: "success" as const, status: "Live" },
  { name: "Hikyaku", note: "Running and training, my way", tone: "warning" as const, status: "In progress" },
  { name: "KAN", note: "The design system this page is built with", tone: "success" as const, status: "Live" },
]

function Header() {
  const { theme, setTheme } = useKanTheme()
  const [open, setOpen] = useState(false)

  return (
    <header
      data-kan="bg-background · border (hairline) · h-16"
      className="sticky top-0 z-20 border-b bg-background"
    >
      <div className="mx-auto flex h-16 max-w-[1080px] items-center gap-6 px-4 sm:px-12">
        <a href="#" data-kan="KanWordmark · currentColor" className="kan-focus rounded-sm" aria-label="KAN, home">
          <KanWordmark className="h-6" aria-hidden="true" />
        </a>

        <nav aria-label="Main" className="hidden flex-1 items-center gap-1 md:flex" data-kan="Button ghost">
          {NAV.map((item, i) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(i === 0 && "text-foreground")}
            >
              <a href={item.href} aria-current={i === 0 ? "page" : undefined}>
                {item.label}
              </a>
            </Button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            data-kan="ghost icon"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          <Button asChild className="hidden sm:inline-flex" data-kan="secondary · hero owns primary">
            <a href="#about">Get in touch</a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Main"
          data-kan="bg-popover · rounded-lg · shadow-popover (floating = only shadow)"
          className="absolute inset-x-4 top-[calc(100%+8px)] rounded-lg border bg-popover p-2 shadow-popover md:hidden"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="kan-focus flex h-11 items-center rounded-md px-3 text-body text-subtle hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-2 border-t pt-2">
            <Button asChild className="w-full" size="lg">
              <a href="#about">Get in touch</a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section className="mx-auto max-w-[1080px] px-4 pt-16 pb-16 sm:px-12 sm:pt-24">
      <div className="grid items-end gap-12 lg:grid-cols-[1fr_360px]">
        <div>
          <p data-kan="kan-label · text-subtle" className="kan-label mb-4 text-subtle">
            Product manager · Stockholm
          </p>
          <h1
            data-kan="text-display-xl · text-foreground · Instrument Sans 500"
            className="max-w-[14ch] text-display sm:text-display-xl"
          >
            I build the tools I wish product people had.
          </h1>
          <p
            data-kan="text-body · text-subtle · max-w-[52ch]"
            className="mt-6 max-w-[52ch] text-subtle"
          >
            Ten years shaping products in Swedish banking, fintech and marketplaces. Now I also make small,
            precise tools for planning, prioritising and running.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="primary" size="lg" data-kan="primary · h-11">
              <a href="#tools">
                See the tools <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" data-kan="secondary">
              <a href="#writing">Read the writing</a>
            </Button>
          </div>
        </div>

        <aside
          aria-label="Currently building"
          data-kan="bg-card · border · rounded-lg · p-5"
          className="rounded-lg border bg-card p-5"
        >
          <p className="kan-label mb-4 text-subtle">Now building</p>
          <ul className="divide-y" data-kan="rows: divide-y hairlines, not cards">
            {NOW.map((item) => (
              <li key={item.name} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-body font-medium">{item.name}</p>
                  <p className="text-small text-muted-foreground">{item.note}</p>
                </div>
                <StatusLabel tone={item.tone} className="shrink-0 pt-0.5" data-kan="StatusLabel · dot + word">
                  {item.status}
                </StatusLabel>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}

function Facts() {
  return (
    <section aria-label="In numbers" className="border-t">
      <div className="mx-auto grid max-w-[1080px] gap-6 px-4 py-12 sm:grid-cols-3 sm:px-12">
        <Stat data-kan="Stat · bg-card · kan-num metric">
          <StatLabel>In product</StatLabel>
          <StatValue unit="years">10+</StatValue>
        </Stat>
        <Stat>
          <StatLabel>Organisations</StatLabel>
          <StatValue unit="teams">8</StatValue>
        </Stat>
        <Stat>
          <StatLabel>Based at</StatLabel>
          <StatValue unit="N">59.33°</StatValue>
        </Stat>
      </div>
    </section>
  )
}

function TokenToggle() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    document.documentElement.toggleAttribute("data-annotate", on)
  }, [on])
  return (
    <Button
      aria-pressed={on}
      onClick={() => setOn(!on)}
      className="fixed right-4 bottom-4 z-30 bg-popover shadow-popover"
    >
      {on ? "Hide tokens" : "Show tokens"}
    </Button>
  )
}

export default function Landing() {
  return (
    <>
      <style>{`
        html[data-annotate] [data-kan] { outline: 1px dashed var(--kan-text-muted); outline-offset: 3px; }
        html[data-annotate] [data-kan]:not(header) { position: relative; }
        html[data-annotate] [data-kan]::after {
          content: attr(data-kan); position: absolute; left: -1px; top: -22px; z-index: 40;
          font: 500 10px/14px var(--font-mono); letter-spacing: 0; text-transform: none;
          padding: 2px 6px; border-radius: 2px; white-space: nowrap; pointer-events: none;
          background: var(--kan-fill-primary); color: var(--kan-on-primary);
        }
        html[data-annotate] header[data-kan]::after { top: auto; bottom: -24px; left: 8px; }
        html[data-annotate] header [data-kan]::after { top: auto; bottom: -21px; }
      `}</style>
      <Header />
      <main>
        <Hero />
        <Facts />
      </main>
      <TokenToggle />
    </>
  )
}
