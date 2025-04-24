
import * as React from "react"
import { Trash as TrashIcon } from "lucide-react"

const Trash = React.forwardRef<
  SVGSVGElement,
  React.ComponentPropsWithoutRef<"svg">
>(({ className, ...props }, ref) => (
  <TrashIcon ref={ref} className={className} {...props} />
))

Trash.displayName = "Trash"

export { Trash }
