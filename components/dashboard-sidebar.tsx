"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Users, UserCircle, Link2, MessageSquare, LogOut, Menu, X, LayoutDashboard } from "lucide-react"
import Image from "next/image"

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
    title: "My Profile",
    href: "/profile",
    icon: UserCircle,
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

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = () => {
    console.log("[v0] Logging out...")
    window.location.href = "/"
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r border-gray-700 transition-transform duration-300 ease-in-out shadow-2xl",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo/Header */}
          <div className="flex h-20 items-center justify-center border-b border-gray-700 px-6 bg-white">
            <Image src="/sip-abacus-logo.png" alt="SIP Abacus" width={160} height={50} />
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-3 py-6">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-[#E2001D] to-[#B1040E] text-white shadow-lg shadow-[#E2001D]/20 scale-105"
                      : "text-gray-300 hover:bg-white/10 hover:text-white hover:translate-x-1",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="border-t border-gray-700 p-4 bg-gradient-to-r from-[#E2001D]/5 to-[#B1040E]/5">
            <div className="mb-3 flex items-center gap-3 px-2">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#F7C744] to-[#E2001D] flex items-center justify-center shadow-lg ring-2 ring-white/20">
                <span className="text-sm font-bold text-white">RK</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">Rajesh Kumar</p>
                <p className="text-xs text-gray-400 truncate">Class of 2019</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-all"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}
    </>
  )
}
