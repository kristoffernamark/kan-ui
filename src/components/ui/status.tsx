import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* The KAN square, not a round dot. */
const dotVariants = cva("size-1.5 shrink-0", {
  variants: {
    tone: {
      neutral: "bg-muted-foreground",
      success: "bg-success",
      warning: "bg-warning",
      danger: "bg-danger",
    },
  },
  defaultVariants: { tone: "neutral" },
})

/** A square plus a word. The word must carry the meaning on its own. */
function StatusLabel({
  className,
  tone,
  children,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof dotVariants>) {
  return (
    <span
      data-slot="status-label"
      className={cn("inline-flex items-center gap-2 text-small text-subtle", className)}
      {...props}
    >
      <span className={dotVariants({ tone })} aria-hidden="true" />
      {children}
    </span>
  )
}

const bannerVariants = cva("rounded-md px-3 py-2 text-small", {
  variants: {
    tone: {
      neutral: "bg-muted text-subtle",
      success: "bg-success-bg text-success",
      warning: "bg-warning-bg text-warning",
      danger: "bg-danger-bg text-danger",
    },
  },
  defaultVariants: { tone: "neutral" },
})

/** One sentence of status: what happened, then what it means. */
function Banner({
  className,
  tone,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof bannerVariants>) {
  return (
    <div
      data-slot="banner"
      role={tone === "danger" ? "alert" : "status"}
      className={cn(bannerVariants({ tone }), className)}
      {...props}
    />
  )
}

export { StatusLabel, Banner }
