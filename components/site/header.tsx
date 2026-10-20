"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { AppEntryLink } from "@/components/site/app-entry"
import { NAV } from "@/lib/content"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const blended = pathname === "/" && !scrolled && !open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        blended
          ? "border-transparent bg-transparent shadow-none"
          : "border-[#d4af37]/40 bg-[#f7fcfe] shadow-[0_10px_28px_rgba(18,56,72,0.1)] backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-2 px-4 sm:h-28 sm:gap-4 sm:px-5">
        <Link href="/" className="flex min-w-0 items-center gap-2 text-sm font-medium tracking-tight text-ink sm:gap-3" onClick={() => setOpen(false)}>
          <span className="shrink-0 text-[2.35rem] leading-none sm:text-[3.375rem]" aria-hidden="true">
            🧞‍♂️
          </span>
          <span className="truncate">TalkToGenie</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm text-mist transition-colors hover:bg-[#e7f7fb] hover:text-[#123848]",
                  active && "bg-[#e7f6fb] text-ink",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <AppEntryLink className="h-11 px-4 text-sm shadow-[0_8px_20px_rgba(18,56,72,0.16)] sm:h-12 sm:px-6 sm:text-base" />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-[#d4af37]/35 text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-[#d4af37]/35 bg-[#e7f6fb] lg:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col px-5 py-3" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-2 py-3 text-base text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
