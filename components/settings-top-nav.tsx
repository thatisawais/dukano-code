"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const items = [
  { label: "General", href: "/dashboard/settings" },
  { label: "Notifications", href: "/dashboard/settings/notifications" },
  { label: "Social", href: "/dashboard/settings/social" },
  { label: "Payments", href: "/dashboard/settings/payments" },
  { label: "Security", href: "/dashboard/settings/security" },
]

export function SettingsTopNav() {
  const pathname = usePathname()

  return (
    <div className="w-full">
      <nav aria-label="Settings sections" className="flex items-center gap-4">
        {items.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium px-2 py-1 rounded-md transition-colors",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
      <Separator className="my-4" />
    </div>
  )
}
