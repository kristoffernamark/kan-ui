import * as React from "react"
import { Toaster as Sonner, toast as sonnerToast, type ExternalToast } from "sonner"

import { cn } from "@/lib/utils"

/*
 * Toasts: one sentence, a status square, bottom centre.
 * Confirmations disappear on their own (4 s). Errors stay until dismissed.
 * Copy follows KAN's voice: "Saved", never "Saved successfully!".
 */

function Square({ className }: { className?: string }) {
  return <span className={cn("size-1.5 shrink-0 bg-muted-foreground", className)} aria-hidden="true" />
}

function Toaster(props: React.ComponentProps<typeof Sonner>) {
  return (
    <Sonner
      position="bottom-center"
      gap={8}
      offset={24}
      mobileOffset={16}
      icons={{
        success: <Square className="bg-success" />,
        error: <Square className="bg-danger" />,
        warning: <Square className="bg-warning" />,
        info: <Square className="bg-foreground" />,
        loading: <Square className="animate-pulse bg-foreground" />,
      }}
      toastOptions={{
        unstyled: true,
        duration: 4000,
        classNames: {
          toast:
            "group flex w-[360px] max-w-[calc(100vw-32px)] items-center gap-3 rounded-lg border bg-popover px-4 py-3 text-small text-popover-foreground shadow-popover font-sans",
          icon: "flex size-4 shrink-0 items-center justify-center",
          content: "flex min-w-0 flex-1 flex-col",
          title: "text-small font-medium",
          description: "text-small text-subtle",
          actionButton:
            "kan-focus h-7 shrink-0 rounded-md border border-border-strong px-2 text-small font-medium text-foreground hover:bg-accent",
          cancelButton: "kan-focus h-7 shrink-0 rounded-md px-2 text-small text-subtle hover:text-foreground",
          closeButton:
            "kan-focus !static !order-last !ml-1 !size-6 !translate-x-0 !translate-y-0 !rounded-sm !border-0 !bg-transparent !text-subtle hover:!bg-accent hover:!text-foreground [&_svg]:!size-3.5",
        },
      }}
      {...props}
    />
  )
}

type Msg = Parameters<typeof sonnerToast>[0]

/** KAN's toast: like sonner's, but errors stay until dismissed and always have a close button. */
const toast = Object.assign((message: Msg, data?: ExternalToast) => sonnerToast(message, data), {
  success: (message: Msg, data?: ExternalToast) => sonnerToast.success(message, data),
  info: (message: Msg, data?: ExternalToast) => sonnerToast.info(message, data),
  warning: (message: Msg, data?: ExternalToast) => sonnerToast.warning(message, data),
  error: (message: Msg, data?: ExternalToast) =>
    sonnerToast.error(message, { duration: Infinity, closeButton: true, ...data }),
  loading: sonnerToast.loading,
  promise: sonnerToast.promise,
  dismiss: sonnerToast.dismiss,
})

export { Toaster, toast }
