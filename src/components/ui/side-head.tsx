import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Editorial section with a side-head: the label sits in its own margin column and the
 * content lines up to its right. For portfolio and writing, not for tools.
 */
function SideHead({
  label,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"section">, "title"> & { label: React.ReactNode }) {
  return (
    <section data-slot="side-head" className={cn("kan-sidehead", className)} {...props}>
      <h2 className="text-small leading-5 font-normal text-subtle">{label}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

export { SideHead }
