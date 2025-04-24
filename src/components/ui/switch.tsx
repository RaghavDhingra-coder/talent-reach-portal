
import * as React from "react"
import { Switch as SwitchIcon } from "lucide-react"

const Switch = React.forwardRef<
  SVGSVGElement,
  React.ComponentPropsWithoutRef<"svg">
>(({ className, ...props }, ref) => (
  <SwitchIcon ref={ref} className={className} {...props} />
))

Switch.displayName = "Switch"

export { Switch }
