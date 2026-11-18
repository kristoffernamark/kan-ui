import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-surface-1 px-3 text-body text-foreground transition-colors",
        "placeholder:text-muted-foreground kan-focus focus-visible:border-input",
        "aria-invalid:border-danger",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:mr-3 file:border-0 file:bg-transparent file:text-small file:font-medium file:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Input }
