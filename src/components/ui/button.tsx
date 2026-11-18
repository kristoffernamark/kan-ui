import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent font-medium transition-colors kan-focus disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "border-border-strong bg-transparent text-foreground hover:bg-accent",
        ghost: "bg-transparent text-subtle hover:bg-accent hover:text-foreground",
        danger: "border-border-strong bg-transparent text-danger hover:bg-danger-bg",
        link: "h-auto px-0 text-foreground underline underline-offset-4 decoration-border-strong hover:decoration-foreground",
      },
      size: {
        sm: "h-7 px-2 text-small",
        default: "h-9 px-3 text-[14px] leading-5",
        lg: "h-11 px-4 text-body",
        icon: "size-9",
        "icon-sm": "size-7",
      },
    },
    defaultVariants: { variant: "secondary", size: "default" },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
