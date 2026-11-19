import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/** Vertical navigation for tools and docs with several views. The active item gets the square. */
function SideNav({ className, label = "Sections", ...props }: React.ComponentProps<"nav"> & { label?: string }) {
  return <nav data-slot="side-nav" aria-label={label} className={cn("flex flex-col gap-6", className)} {...props} />
}

/** An optional titled group of items. */
function SideNavGroup({ title, className, children, ...props }: React.ComponentProps<"div"> & { title?: React.ReactNode }) {
  return (
    <div data-slot="side-nav-group" className={cn("flex flex-col gap-0.5", className)} {...props}>
      {title && <p className="kan-label-plain mb-1 px-3 text-muted-foreground">{title}</p>}
      {children}
    </div>
  )
}

function SideNavItem({
  active = false,
  asChild = false,
  className,
  children,
  ...props
}: React.ComponentProps<"a"> & { active?: boolean; asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a"
  return (
    <Comp
      data-slot="side-nav-item"
      aria-current={active ? "page" : undefined}
      className={cn(
        "kan-focus flex h-9 items-center gap-2 rounded-md px-3 text-small text-subtle transition-colors hover:bg-accent hover:text-foreground",
        active && "text-foreground",
        className
      )}
      {...props}
    >
      <span className={cn("size-1.5 shrink-0 bg-foreground", !active && "invisible")} aria-hidden="true" />
      <Slot.Slottable>{children}</Slot.Slottable>
    </Comp>
  )
}

export { SideNav, SideNavGroup, SideNavItem }
