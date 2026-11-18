import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * The KAN logo: "kan." set in Instrument Sans 500, outlined, with a square full stop.
 * The icon is "k." on its own. Both draw in currentColor so they follow the theme.
 * Never retype the logo in a font, recolour it, or change the full stop.
 */

function KanWordmark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="73 -733 1765 733" role="img" aria-label="kan." className={cn("h-6 w-auto text-foreground", className)} {...props}>
      <g fill="currentColor" transform="scale(1 -1)">
        <path transform="translate(0 0)" d="M73.3 0V733.3H176.7V0ZM404.3 0 153 265 396 510H527L250.7 242L256.3 289L537 0Z" /><path transform="translate(506 0)" d="M389 0Q384.3 18.7 382.5 41.7Q380.7 64.7 380.7 98.3H376V341.3Q376 390.3 351.5 414.5Q327 438.7 274.3 438.7Q223 438.7 192.5 418.7Q162 398.7 157 361.7H58Q64.7 434 123 477Q181.3 520 278 520Q378 520 428 473.7Q478 427.3 478 336.7V98.3Q478 75.3 481.2 51.2Q484.3 27 490.3 0ZM213 -10Q135 -10 89 28.5Q43 67 43 133Q43 201.3 91.5 240.5Q140 279.7 230.7 294L399 321V248L247 224.3Q196.3 216.3 170.7 197Q145 177.7 145 141.7Q145 107.3 168.7 89.7Q192.3 72 237 72Q297.3 72 336.7 100.8Q376 129.7 376 173.7L389.3 99.7Q371.3 46.7 325.3 18.3Q279.3 -10 213 -10Z" /><path transform="translate(1012 0)" d="M73.3 0V510H172.3V390H176.7V0ZM435 0V328Q435 380.7 408.5 407Q382 433.3 330.3 433.3Q285.3 433.3 250.5 413.3Q215.7 393.3 196.2 358Q176.7 322.7 176.7 275.3L163.7 397Q189.3 453.7 241.2 486.8Q293 520 362 520Q443.7 520 491 473.8Q538.3 427.7 538.3 351.7V0Z" /><rect x="1668" y="0" width="170" height="170" />
      </g>
    </svg>
  )
}

function KanIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="73 -733 693 733" role="img" aria-label="kan." className={cn("h-6 w-auto text-foreground", className)} {...props}>
      <g fill="currentColor" transform="scale(1 -1)">
        <path transform="translate(0 0)" d="M73.3 0V733.3H176.7V0ZM404.3 0 153 265 396 510H527L250.7 242L256.3 289L537 0Z" /><rect x="596" y="0" width="170" height="170" />
      </g>
    </svg>
  )
}

export { KanWordmark, KanIcon }
