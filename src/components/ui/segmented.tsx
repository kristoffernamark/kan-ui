import * as React from "react"
import { ToggleGroup } from "radix-ui"

import { cn } from "@/lib/utils"

type SegmentedProps = Omit<
  React.ComponentProps<typeof ToggleGroup.Root>,
  "type" | "value" | "defaultValue" | "onValueChange"
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

/** Switch between 2–5 views or units of the same content. Always has one selection. */
function Segmented({ className, value, defaultValue, onValueChange, ...props }: SegmentedProps) {
  const [inner, setInner] = React.useState(defaultValue ?? "")
  const current = value ?? inner
  return (
    <ToggleGroup.Root
      data-slot="segmented"
      type="single"
      value={current}
      onValueChange={(next) => {
        if (!next) return // never allow an empty selection
        if (value === undefined) setInner(next)
        onValueChange?.(next)
      }}
      className={cn("inline-flex h-9 items-center gap-0.5 rounded-md border bg-surface-1 p-0.5", className)}
      {...props}
    />
  )
}

function SegmentedItem({ className, ...props }: React.ComponentProps<typeof ToggleGroup.Item>) {
  return (
    <ToggleGroup.Item
      data-slot="segmented-item"
      className={cn(
        "h-full rounded-sm px-3 text-small font-medium text-subtle transition-colors hover:text-foreground",
        "data-[state=on]:bg-selected data-[state=on]:text-foreground",
        "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
        className
      )}
      {...props}
    />
  )
}

export { Segmented, SegmentedItem }
