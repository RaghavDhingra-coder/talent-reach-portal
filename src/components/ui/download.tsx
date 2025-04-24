
import * as React from "react"
import { Download as DownloadIcon } from "lucide-react"

const Download = React.forwardRef<
  SVGSVGElement,
  React.ComponentPropsWithoutRef<"svg">
>(({ className, ...props }, ref) => (
  <DownloadIcon ref={ref} className={className} {...props} />
))

Download.displayName = "Download"

export { Download }
