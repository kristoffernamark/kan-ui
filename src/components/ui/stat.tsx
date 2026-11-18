import * as React from "react"

import { cn } from "@/lib/utils"

/** A tile for one number that matters. */
function Stat({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat"
      className={cn("rounded-lg border bg-card p-4 text-card-foreground sm:p-5", className)}
      {...props}
    />
  )
}

function StatLabel({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="stat-label" className={cn("kan-label mb-2 text-subtle", className)} {...props} />
}

/** The value in mono. `hero` for the single most important number on a screen. */
function StatValue({
  className,
  unit,
  hero = false,
  children,
  ...props
}: React.ComponentProps<"p"> & { unit?: React.ReactNode; hero?: boolean }) {
  return (
    <p
      data-slot="stat-value"
      className={cn("kan-num font-medium", hero ? "text-metric-xl" : "text-metric", className)}
      {...props}
    >
      {children}
      {unit != null && (
        <span className="ml-1.5 font-sans text-body font-normal tracking-normal text-subtle">{unit}</span>
      )}
    </p>
  )
}

/**
 * The change vs a comparison. Use `positive` / `negative` only when the direction is
 * genuinely good or bad for the user; otherwise leave it `neutral`.
 */
function StatDelta({
  className,
  tone = "neutral",
  ...props
}: React.ComponentProps<"p"> & { tone?: "neutral" | "positive" | "negative" }) {
  return (
    <p
      data-slot="stat-delta"
      className={cn(
        "kan-num mt-1 text-data",
        tone === "positive" && "text-success",
        tone === "negative" && "text-danger",
        tone === "neutral" && "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/** History bars. Exactly one bar is active (defaults to the last: the current period). */
function StatBars({
  className,
  values,
  activeIndex,
  startLabel,
  endLabel,
  ...props
}: React.ComponentProps<"div"> & {
  values: number[]
  activeIndex?: number
  startLabel?: React.ReactNode
  endLabel?: React.ReactNode
}) {
  const max = Math.max(...values, 1)
  const active = activeIndex ?? values.length - 1
  return (
    <div data-slot="stat-bars" className={cn("mt-4", className)} {...props}>
      <div className="flex h-10 items-end gap-1" aria-hidden="true">
        {values.map((v, i) => (
          <span
            key={i}
            className={cn("flex-1 rounded-sm", i === active ? "bg-data-active" : "bg-data-muted")}
            style={{ height: `${Math.max((v / max) * 100, 4)}%` }}
          />
        ))}
      </div>
      {(startLabel || endLabel) && (
        <div className="kan-num mt-1 flex justify-between text-data text-muted-foreground">
          <span>{startLabel}</span>
          <span>{endLabel}</span>
        </div>
      )}
    </div>
  )
}

export { Stat, StatLabel, StatValue, StatDelta, StatBars }
