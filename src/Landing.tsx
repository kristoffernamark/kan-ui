import { useEffect, useState } from "react"
import { ArrowRight, Moon, Sun } from "lucide-react"

import { useKanTheme } from "@/hooks/use-kan-theme"
import { Button } from "@/components/ui/button"
import { Stat, StatLabel, StatValue } from "@/components/ui/stat"
import { SideHead } from "@/components/ui/side-head"
import { StatusLabel } from "@/components/ui/status"
import { KanWordmark } from "@/components/ui/kan-logo"
import { NavBar, NavItem } from "@/components/ui/nav-bar"

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
  return (
    <NavBar
      data-kan="NavBar · square marks the active item"
      brand={
        <a href="#" className="kan-focus rounded-sm" aria-label="KAN, home">
          <KanWordmark className="h-6" aria-hidden="true" />
        </a>
      }
      actions={
        <>
          <span className="hidden kan-num text-caption text-muted-foreground lg:inline" data-kan="coordinates · map layer">
            59.32° N · 18.07° E
          </span>
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
        </>
      }
    >
      {NAV.map((item, i) => (
        <NavItem key={item.href} href={item.href} active={i === 0}>
          {item.label}
        </NavItem>
      ))}
    </NavBar>
  )
}

function Hero() {
  return (
    <section className="mx-auto max-w-[1080px] px-4 pt-16 pb-16 sm:px-12 sm:pt-24">
      <div className="grid items-end gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          <h1
            data-kan="font-serif · 80px · italic phrase · square stop"
            className="max-w-[13ch] font-serif text-[56px] leading-[56px] sm:text-[80px] sm:leading-[80px]"
          >
            I build the tools I wish <i>product people</i> had
            <span className="ml-1 inline-block size-3 bg-foreground" aria-hidden="true" />
          </h1>
          <p
            data-kan="text-body · text-subtle · max-w-[52ch]"
            className="mt-7 max-w-[52ch] text-subtle"
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

        <SideHead label={<>Now<br />building</>} className="sm:grid-cols-[88px_1fr] sm:gap-4" data-kan="SideHead · no card">
          <ul className="-mt-3 divide-y">
            {NOW.map((item) => (
              <li key={item.name} className="flex items-start justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="text-body font-medium">{item.name}</p>
                  <p className="text-small text-muted-foreground">{item.note}</p>
                </div>
                <StatusLabel tone={item.tone} className="shrink-0 pt-0.5" data-kan="StatusLabel · square + word">
                  {item.status}
                </StatusLabel>
              </li>
            ))}
          </ul>
        </SideHead>
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
