import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * The KAN logo, drawn with currentColor so it follows the theme.
 * Wordmark: monoline K, A and N; the square sits under the A's peak.
 * Icon: the K, with the square in the space between its arm and leg.
 * Don't recolour, redraw or move the square.
 */

function KanWordmark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="-6 -12 276 124"
      role="img"
      aria-label="KAN"
      className={cn("h-6 w-auto text-foreground", className)}
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="12" strokeLinejoin="bevel">
        <path d="M6 0 V100 M58 0 L6 55 M27 36 L58 100" />
        <path d="M88 100 L124 0 L160 100" />
        <path d="M190 100 V0 L242 100 V0" />
      </g>
      <rect x="118" y="64" width="12" height="12" fill="currentColor" />
    </svg>
  )
}

function KanIcon({
  className,
  small = false,
  ...props
}: React.ComponentProps<"svg"> & { small?: boolean }) {
  // `small` draws the stroke heavier so the mark holds at 16–32px
  const s = small ? 15 : 12
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label="KAN" className={cn("size-6 text-foreground", className)} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth={s} strokeLinejoin="bevel">
        <path d="M24 14 V86" />
        <path d="M78 14 L28 57" />
        <path d="M45 42 L80 86" />
      </g>
      <rect x="66" y={47 - s / 2} width={s} height={s} fill="currentColor" />
    </svg>
  )
}

export { KanWordmark, KanIcon }
