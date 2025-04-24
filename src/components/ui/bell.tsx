
import * as React from "react"
import { Bell as BellIcon } from "lucide-react"

const Bell = React.forwardRef<
  SVGSVGElement,
  React.ComponentPropsWithoutRef<"svg">
>(({ className, ...props }, ref) => (
  <BellIcon ref={ref} className={className} {...props} />
))

Bell.displayName = "Bell"

export { Bell }
