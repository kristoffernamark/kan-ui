import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { useKanTheme } from "@/hooks/use-kan-theme"
import { Button } from "@/components/ui/button"
import { KanWordmark } from "@/components/ui/kan-logo"
import { NavBar, NavItem } from "@/components/ui/nav-bar"
import { SideNav, SideNavGroup, SideNavItem } from "@/components/ui/side-nav"
import { Toaster } from "@/components/ui/toaster"
import { PAGE_COMPONENTS, PAGES, type PageId } from "@/docs/pages"

function readHash(): PageId {
  const h = window.location.hash.slice(1)
  return (PAGES.some((p) => p.id === h) ? h : "overview") as PageId
}

const GROUPS: { title?: string; ids: PageId[] }[] = [
  { ids: ["overview"] },
  { title: "foundations", ids: ["colour", "typography", "space", "motion"] },
  { title: "library", ids: ["components", "logo"] },
  { title: "guidelines", ids: ["modes", "editorial", "guidelines", "build"] },
]
const labelOf = (id: PageId) => PAGES.find((p) => p.id === id)?.label ?? id

export default function App() {
  const { theme, setTheme } = useKanTheme()
  const [page, setPage] = useState<PageId>(readHash)

  useEffect(() => {
    const onHash = () => {
      const next = readHash()
      const doc = document as Document & { startViewTransition?: (cb: () => void) => void }
      const apply = () => {
        setPage(next)
        window.scrollTo({ top: 0 })
      }
      if (doc.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        doc.startViewTransition(apply)
      } else apply()
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  useEffect(() => {
    const label = PAGES.find((p) => p.id === page)?.label
    document.title = page === "overview" ? "KAN" : `${label} · KAN`
  }, [page])

  const Page = PAGE_COMPONENTS[page]

  return (
    <>
      <NavBar
        label="Sections"
        inlineItems={false}
        brand={
          <a href="#overview" className="kan-focus flex items-center gap-3 rounded-sm" aria-label="KAN, overview">
            <KanWordmark className="h-6" aria-hidden="true" />
            <span className="hidden kan-label-plain text-muted-foreground sm:inline">design system</span>
          </a>
        }
        actions={
          <>
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <a href="https://github.com/kristoffernamark/kan-ui">GitHub</a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
          </>
        }
      >
        {PAGES.map((p) => (
          <NavItem key={p.id} href={`#${p.id}`} active={p.id === page}>
            {p.label}
          </NavItem>
        ))}
      </NavBar>

      <div className="mx-auto flex max-w-[1200px] gap-12 px-4 sm:px-8">
        <SideNav className="sticky top-16 hidden h-[calc(100vh-4rem)] w-52 shrink-0 overflow-y-auto py-10 md:flex">
          {GROUPS.map((g, i) => (
            <SideNavGroup key={i} title={g.title}>
              {g.ids.map((id) => (
                <SideNavItem key={id} href={`#${id}`} active={id === page}>
                  {labelOf(id)}
                </SideNavItem>
              ))}
            </SideNavGroup>
          ))}
        </SideNav>
        <main className="min-w-0 flex-1 py-10 sm:py-14">
          <div className="max-w-[880px]">
            <Page />
          </div>
          <footer className="mt-16 max-w-[880px] border-t pt-6 pb-10 text-small text-muted-foreground">
            KAN · Kristoffer Avci Nåmark · Built with shadcn/ui, Radix and Tailwind.
          </footer>
        </main>
      </div>
      <Toaster />
    </>
  )
}
