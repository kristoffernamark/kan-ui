import { useCallback, useEffect, useState } from "react"

export type KanTheme = "dark" | "light"

const KEY = "kan-theme"

function read(): KanTheme {
  try {
    return localStorage.getItem(KEY) === "light" ? "light" : "dark"
  } catch {
    return "dark"
  }
}

/**
 * KAN is dark by default. The theme is the user's choice, never the product's:
 * we don't follow the OS unless the user picks it, and we remember their pick.
 */
export function useKanTheme() {
  const [theme, setThemeState] = useState<KanTheme>(read)

  useEffect(() => {
    const root = document.documentElement
    if (theme === "light") root.setAttribute("data-theme", "light")
    else root.removeAttribute("data-theme")
  }, [theme])

  const setTheme = useCallback((next: KanTheme) => {
    const apply = () => {
      setThemeState(next)
      try {
        localStorage.setItem(KEY, next)
      } catch {
        /* storage unavailable: keep in memory */
      }
    }
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void }
    if (doc.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doc.startViewTransition(apply)
    } else apply()
  }, [])

  return { theme, setTheme }
}
