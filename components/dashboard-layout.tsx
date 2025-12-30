"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings, LogOut, Megaphone } from "lucide-react"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState({
    adminApprovals: true,
    postComments: false,
  })

  const announcements = [
    "Welcome to SIP Alumni Platform! Stay connected with your batch mates.",
    "New feature: Forum discussions are now live. Share your thoughts!",
    "Upcoming Alumni Meet: Register now for the Annual Gathering 2025.",
    "Profile updates: Add your professional experience to help others connect.",
  ]

  const handleLogout = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center">
            <Image src="/sip-abacus-logo.png" alt="SIP Abacus" width={120} height={36} className="lg:w-[140px]" />
          </div>

          <div className="flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
                  <Avatar className="h-9 w-9 ring-2 ring-[#E2001D]/20">
                    <AvatarImage src="/professional-male-avatar.png" alt="Rohit" />
                    <AvatarFallback className="bg-gradient-to-br from-[#E2001D] to-[#B1040E] text-white text-xs">
                      R
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block text-left">
                    <div className="flex flex-col items-start gap-0.5">
                      <p className="text-sm font-semibold text-gray-900">Rohit</p>
                      <Badge
                        variant="secondary"
                        className="bg-[#E2001D]/10 text-[#E2001D] hover:bg-[#E2001D]/20 text-xs px-2 py-0"
                      >
                        Batch 2019
                      </Badge>
                    </div>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setIsSettingsOpen(true)} className="cursor-pointer">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-[#E2001D]">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#E2001D]/5 via-[#FCD116]/5 to-[#E2001D]/5 border-t">
          <div className="flex items-center gap-2 px-4 py-2 overflow-hidden">
            <Megaphone className="h-4 w-4 text-[#E2001D] flex-shrink-0" />
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                {announcements.map((announcement, index) => (
                  <span
                    key={index}
                    className="inline-block px-8 text-sm font-semibold bg-gradient-to-r from-[#E2001D] to-[#FCD116] bg-clip-text text-transparent"
                  >
                    {announcement}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <ProfileSidebar onCollapseChange={setIsSidebarCollapsed} />

      <main className={`pt-4 transition-all duration-300 min-h-screen ${isSidebarCollapsed ? "lg:pl-16" : "lg:pl-80"}`}>
        <div className="p-6">{children}</div>
      </main>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Manage your notification preferences</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor="admin-approvals"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Receive email notifications for all Admin Approvals
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when admins approve or reject your requests
                </p>
              </div>
              <Switch
                id="admin-approvals"
                checked={emailNotifications.adminApprovals}
                onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, adminApprovals: checked })}
              />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor="post-comments"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Receive email notifications for post comments or updates
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when someone comments on your posts or replies to your comments
                </p>
              </div>
              <Switch
                id="post-comments"
                checked={emailNotifications.postComments}
                onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, postComments: checked })}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
