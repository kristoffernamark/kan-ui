import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/** Stacks a label, a control and a hint with KAN spacing. */
function Field({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="field" className={cn("flex flex-col gap-1", className)} {...props} />
  )
}

/** Mono, uppercase overline label. Always visible; never replaced by a placeholder. */
function FieldLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="field-label"
      className={cn("kan-label text-subtle select-none", className)}
      {...props}
    />
  )
}

/** Helper line under a control. Pass `error` to show it as a validation message. */
function FieldHint({
  className,
  error = false,
  ...props
}: React.ComponentProps<"p"> & { error?: boolean }) {
  return (
    <p
      data-slot="field-hint"
      role={error ? "alert" : undefined}
      className={cn("text-small", error ? "text-danger" : "text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Field, FieldLabel, FieldHint }
