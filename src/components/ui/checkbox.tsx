
import * as React from "react"
import { CheckSquare } from "lucide-react"

const Checkbox = React.forwardRef<
  SVGSVGElement,
  React.ComponentPropsWithoutRef<"svg">
>(({ className, ...props }, ref) => (
  <CheckSquare ref={ref} className={className} {...props} />
))

Checkbox.displayName = "Checkbox"

export { Checkbox }
