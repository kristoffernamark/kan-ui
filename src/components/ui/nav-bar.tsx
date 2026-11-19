import * as React from "react"
import { Menu, X } from "lucide-react"
import { Popover, Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/*
 * Top navigation. The active item is marked with the KAN square, not a filled background.
 * Below md the items move into a floating panel: the one place a shadow is allowed.
 */

type Layout = "bar" | "panel"
const NavContext = React.createContext<{ layout: Layout; close: () => void }>({ layout: "bar", close: () => {} })

function NavBar({
  brand,
  actions,
  children,
  className,
  label = "Main",
  inlineItems = true,
  ...props
}: React.ComponentProps<"header"> & {
  /** The logo, usually a link home. */
  brand: React.ReactNode
  /** Right-hand controls: theme toggle, one secondary button. Never a primary button: the page owns that. */
  actions?: React.ReactNode
  /** Accessible name for the nav landmark. */
  label?: string
  /** Show items in the bar on desktop. Set false when a SideNav already lists them: they then appear only in the mobile menu. */
  inlineItems?: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const close = React.useCallback(() => setOpen(false), [])
  return (
    <header data-slot="nav-bar" className={cn("sticky top-0 z-20 border-b bg-background", className)} {...props}>
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-4 sm:px-8">
        <div className="flex shrink-0 items-center">{brand}</div>
        {inlineItems ? (
          <nav aria-label={label} className="hidden flex-1 items-center gap-1 md:flex">
            <NavContext.Provider value={{ layout: "bar", close }}>{children}</NavContext.Provider>
          </nav>
        ) : (
          <div className="flex-1" />
        )}
        <div className="ml-auto flex items-center gap-2">
          {actions}
          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? "Close menu" : "Open menu"}>
                {open ? <X /> : <Menu />}
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                align="end"
                sideOffset={12}
                collisionPadding={16}
                className="z-30 w-[calc(100vw-32px)] max-w-sm rounded-lg border bg-popover p-2 text-popover-foreground shadow-popover md:hidden"
              >
                <nav aria-label={label} className="flex flex-col">
                  <NavContext.Provider value={{ layout: "panel", close }}>{children}</NavContext.Provider>
                </nav>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>
    </header>
  )
}

function NavItem({
  active = false,
  asChild = false,
  className,
  children,
  onClick,
  ...props
}: React.ComponentProps<"a"> & { active?: boolean; asChild?: boolean }) {
  const { layout, close } = React.useContext(NavContext)
  const Comp = asChild ? Slot.Root : "a"
  return (
    <Comp
      data-slot="nav-item"
      aria-current={active ? "page" : undefined}
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e)
        if (layout === "panel") close()
      }}
      className={cn(
        "kan-focus inline-flex items-center gap-2 rounded-md text-subtle transition-colors hover:text-foreground",
        layout === "bar" ? "h-9 px-3 text-small" : "h-11 px-3 text-body hover:bg-accent",
        active && "text-foreground",
        className
      )}
      {...props}
    >
      <span className={cn("size-1.5 shrink-0 bg-foreground", !active && "hidden")} aria-hidden="true" />
      <Slot.Slottable>{children}</Slot.Slottable>
    </Comp>
  )
}

export { NavBar, NavItem }
