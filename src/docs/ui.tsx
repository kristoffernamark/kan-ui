import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function PageHeader({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="mb-12">
      <p className="kan-label mb-3 text-subtle">{label}</p>
      <h1 className="text-display font-medium">{title}</h1>
      {children && <div className="mt-4 max-w-[60ch] text-subtle">{children}</div>}
    </header>
  )
}

export function Section({
  id,
  title,
  note,
  children,
}: {
  id?: string
  title: string
  note?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section id={id} className="border-t py-10">
      <h2 className="text-heading font-medium">{title}</h2>
      {note && <p className="mt-1 max-w-[60ch] text-small text-muted-foreground">{note}</p>}
      <div className="mt-6">{children}</div>
    </section>
  )
}

/** Renders children inside a fixed theme, regardless of the page theme. */
export function ThemePanel({
  theme,
  className,
  children,
}: {
  theme: "dark" | "light"
  className?: string
  children: React.ReactNode
}) {
  return (
    <div data-theme={theme} className={cn("bg-background text-foreground", className)}>
      {children}
    </div>
  )
}

/** Reads a CSS custom property from the element it's rendered in, so values always match kan.css. */
export function CssValue({ name, className }: { name: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [value, setValue] = React.useState("")
  React.useLayoutEffect(() => {
    if (ref.current) setValue(getComputedStyle(ref.current).getPropertyValue(name).trim())
  }, [name])
  return (
    <span ref={ref} className={cn("kan-num text-data text-muted-foreground", className)}>
      {value}
    </span>
  )
}

export function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded-sm bg-surface-1 px-1 py-0.5 font-mono text-[0.9em] text-foreground">{children}</code>
}

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <div className="overflow-hidden rounded-lg border bg-surface-1">
      <div className="flex h-9 items-center justify-between border-b pr-1 pl-3">
        <span className="kan-label-plain text-muted-foreground">{label ?? "Code"}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code)
              setCopied(true)
              setTimeout(() => setCopied(false), 1500)
            } catch {
              /* clipboard unavailable */
            }
          }}
        >
          {copied ? <Check /> : <Copy />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="overflow-x-auto p-3 font-mono text-data text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function Rules({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="max-w-[68ch] divide-y border-y">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4 py-3">
          <span className="kan-num w-6 shrink-0 text-data text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
