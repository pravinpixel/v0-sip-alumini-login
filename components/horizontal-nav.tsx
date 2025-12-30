"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Link2, MessageSquare, Menu, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

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
    title: "Community",
    href: "/community",
    icon: MessageSquare,
  },
]

export function HorizontalNav() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="flex h-16 items-center px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Image src="/sip-abacus-logo.png" alt="SIP Abacus" width={120} height={36} className="lg:w-[140px]" />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="flex flex-col p-4 space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-[#E2001D] to-[#B1040E] text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#E2001D]",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      <div className="hidden md:block sticky top-16 z-40 bg-gradient-to-r from-gray-50 to-white border-b shadow-sm">
        <nav className="flex items-center gap-2 px-6 py-3 lg:pl-[340px]">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 group",
                  isActive
                    ? "bg-gradient-to-r from-[#E2001D] to-[#B1040E] text-white shadow-lg scale-105"
                    : "text-gray-700 hover:bg-white hover:text-[#E2001D] hover:shadow-md hover:scale-105",
                )}
              >
                <Icon
                  className={cn("h-4 w-4 transition-transform duration-300", isActive ? "" : "group-hover:scale-110")}
                />
                {item.title}
                {isActive && <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#F7C744] rounded-t-full" />}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
