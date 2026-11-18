import { useEffect, useState } from "react"
import { Menu, Moon, Sun, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useKanTheme } from "@/hooks/use-kan-theme"
import { Button } from "@/components/ui/button"
import { KanWordmark } from "@/components/ui/kan-logo"
import { PAGE_COMPONENTS, PAGES, type PageId } from "@/docs/pages"

function readHash(): PageId {
  const h = window.location.hash.slice(1)
  return (PAGES.some((p) => p.id === h) ? h : "overview") as PageId
}

function Nav({ current, onNavigate }: { current: PageId; onNavigate?: () => void }) {
  return (
    <ul className="flex flex-col gap-0.5">
      {PAGES.map((p) => (
        <li key={p.id}>
          <a
            href={`#${p.id}`}
            onClick={onNavigate}
            aria-current={p.id === current ? "page" : undefined}
            className={cn(
              "kan-focus flex h-9 items-center rounded-md px-3 text-small text-subtle transition-colors hover:bg-accent hover:text-foreground",
              p.id === current && "bg-selected text-foreground"
            )}
          >
            {p.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function App() {
  const { theme, setTheme } = useKanTheme()
  const [page, setPage] = useState<PageId>(readHash)
  const [menuOpen, setMenuOpen] = useState(false)

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
      <header className="sticky top-0 z-20 border-b bg-background">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-4 px-4 sm:px-8">
          <a href="#overview" className="kan-focus rounded-sm" aria-label="KAN, overview">
            <KanWordmark className="h-6" aria-hidden="true" />
          </a>
          <span className="hidden kan-label text-muted-foreground sm:inline">Design system</span>
          <div className="ml-auto flex items-center gap-2">
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
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav
            aria-label="Sections"
            className="absolute inset-x-4 top-[calc(100%+8px)] rounded-lg border bg-popover p-2 shadow-popover md:hidden"
          >
            <Nav current={page} onNavigate={() => setMenuOpen(false)} />
          </nav>
        )}
      </header>

      <div className="mx-auto flex max-w-[1200px] gap-12 px-4 sm:px-8">
        <nav aria-label="Sections" className="sticky top-16 hidden h-[calc(100vh-4rem)] w-52 shrink-0 py-10 md:block">
          <Nav current={page} />
        </nav>
        <main className="min-w-0 flex-1 py-10 sm:py-14">
          <div className="max-w-[880px]">
            <Page />
          </div>
          <footer className="mt-16 max-w-[880px] border-t pt-6 pb-10 text-small text-muted-foreground">
            KAN · Kristoffer Avci Nåmark · Built with shadcn/ui, Radix and Tailwind.
          </footer>
        </main>
      </div>
    </>
  )
}
