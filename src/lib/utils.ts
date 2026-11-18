import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge doesn't know KAN's custom text sizes, so it would read `text-body`
 * as a colour and drop `text-primary-foreground`. Register them as font sizes.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display",
            "title",
            "heading",
            "body",
            "small",
            "caption",
            "metric-xl",
            "metric",
            "data",
            "label",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
