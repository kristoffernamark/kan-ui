import { useCallback, useEffect, useState } from "react"

export type KanTheme = "dark" | "light"

const KEY = "kan-theme"

function saved(): KanTheme | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === "light" || v === "dark" ? v : null
  } catch {
    return null
  }
}

function system(): KanTheme {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
}

/**
 * The theme is the user's choice, and we remember their pick.
 * Until they pick:
 *  - personal mode (default) starts dark;
 *  - product mode (`followSystem: true`) follows the device, because
 *    customers expect an app to match the rest of their phone or computer.
 */
export function useKanTheme({ followSystem = false }: { followSystem?: boolean } = {}) {
  const [picked, setPicked] = useState<KanTheme | null>(saved)
  const [sys, setSys] = useState<KanTheme>(system)

  useEffect(() => {
    if (!followSystem) return
    const mq = window.matchMedia("(prefers-color-scheme: light)")
    const on = () => setSys(mq.matches ? "light" : "dark")
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [followSystem])

  const theme: KanTheme = picked ?? (followSystem ? sys : "dark")

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  const setTheme = useCallback((next: KanTheme) => {
    const apply = () => {
      setPicked(next)
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
