import { buttonVariants } from "@/components/ui/button"
import { APP_ENTRY_LABEL, APP_URL } from "@/lib/content"
import { cn } from "@/lib/utils"

export function AppEntryLink({
  className,
  variant = "default",
}: {
  className?: string
  variant?: "default" | "outline"
}) {
  return (
    <a
      href={APP_URL}
      className={buttonVariants({
        variant,
        className: cn("h-12 rounded-full px-6 text-base whitespace-nowrap", className),
      })}
    >
      {APP_ENTRY_LABEL}
    </a>
  )
}
