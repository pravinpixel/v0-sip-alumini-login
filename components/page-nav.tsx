"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Link2, MessageSquare } from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Directory",
    href: "/directory",
    icon: Users,
  },
  {
    title: "Connections",
    href: "/connections",
    icon: Link2,
  },
  {
    title: "Forums",
    href: "/community",
    icon: MessageSquare,
  },
]

export function PageNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1 mb-6 p-1 bg-white rounded-lg shadow-sm border border-gray-100">
      {menuItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md transition-all duration-300 group flex-1 justify-center",
              isActive
                ? "bg-gradient-to-r from-[#E2001D] to-[#B1040E] text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50 hover:text-[#E2001D]",
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4 transition-all duration-300",
                isActive ? "" : "group-hover:scale-110 group-hover:text-[#E2001D]",
              )}
            />
            <span className="font-medium">{item.title}</span>
            {isActive && <span className="absolute bottom-0 left-0 w-full h-1 bg-[#F7C744] rounded-t-full" />}
          </Link>
        )
      })}
    </nav>
  )
}
