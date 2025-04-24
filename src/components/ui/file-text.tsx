
import * as React from "react"
import { FileText as FileTextIcon } from "lucide-react"

const FileText = React.forwardRef<
  SVGSVGElement,
  React.ComponentPropsWithoutRef<"svg">
>(({ className, ...props }, ref) => (
  <FileTextIcon ref={ref} className={className} {...props} />
))

FileText.displayName = "FileText"

export { FileText }
