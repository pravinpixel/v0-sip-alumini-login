"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Edit,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Camera,
  X,
  Check,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface ProfileSidebarProps {
  onCollapseChange?: (collapsed: boolean) => void
}

export function ProfileSidebar({ onCollapseChange }: ProfileSidebarProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("profileDrawerCollapsed")
      return saved === "true"
    }
    return false
  })
  const [profileData, setProfileData] = useState({
    name: "Rohit",
    yearOfCompletion: "2019",
    city: "Bangalore",
    state: "Karnataka",
    email: "rohit@example.com",
    phone: "+91 98765 43210",
    occupation: "Senior Software Engineer",
    profilePicture: "/professional-male-avatar.png",
  })

  const [originalPhone, setOriginalPhone] = useState(profileData.phone)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])
  const { toast } = useToast()

  useEffect(() => {
    localStorage.setItem("profileDrawerCollapsed", String(isCollapsed))
    onCollapseChange?.(isCollapsed)
  }, [isCollapsed, onCollapseChange])

  const handleLogout = () => {
    window.location.href = "/"
  }

  const handleSaveProfile = () => {
    if (profileData.phone !== originalPhone && !isOtpVerified) {
      toast({
        title: "Verification Required",
        description: "Please verify your new contact number before saving.",
        variant: "destructive",
      })
      return
    }

    setIsEditOpen(false)
    setOriginalPhone(profileData.phone)
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    })
  }

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData({ ...profileData, profilePicture: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveProfilePicture = () => {
    setProfileData({ ...profileData, profilePicture: "/professional-male-avatar.png" })
  }

  const handleToggle = () => {
    const newCollapsedState = !isCollapsed
    setIsCollapsed(newCollapsedState)
  }

  const handlePhoneChange = (value: string) => {
    setProfileData({ ...profileData, phone: value })

    if (value !== originalPhone) {
      setIsOtpVerified(false)
      setShowOtpInput(false)
      setOtp(["", "", "", "", "", ""])
    } else {
      setIsOtpVerified(true)
    }
  }

  const handleVerifyClick = () => {
    setShowOtpInput(true)
    toast({
      title: "OTP Sent",
      description: `Verification code sent to ${profileData.phone}`,
    })
    setTimeout(() => {
      otpInputRefs.current[0]?.focus()
    }, 100)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus()
    }

    // Auto-verify when all digits entered
    if (newOtp.every((digit) => digit !== "") && index === 5) {
      setTimeout(() => {
        setIsOtpVerified(true)
        toast({
          title: "Contact Verified",
          description: "Your contact number has been verified successfully.",
        })
      }, 500)
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  const isPhoneChanged = profileData.phone !== originalPhone

  return (
    <>
      <aside
        className={cn(
          "hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] border-r bg-white overflow-hidden transition-all duration-300",
          isCollapsed ? "w-16" : "w-80",
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-6 z-20 h-8 w-8 rounded-full border-2 border-[#E2001D] bg-white shadow-lg hover:bg-[#E2001D] hover:text-white transition-all duration-300"
          onClick={handleToggle}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        <Card className="border-0 rounded-none h-full flex flex-col">
          <CardContent className={cn("p-6 flex-1 flex flex-col justify-between", isCollapsed && "p-3")}>
            {!isCollapsed ? (
              <>
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center">
                    <Avatar className="h-28 w-28 mb-3 ring-4 ring-[#E2001D]/20">
                      <AvatarImage src={profileData.profilePicture || "/placeholder.svg"} alt={profileData.name} />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-[#E2001D] to-[#B1040E] text-white">
                        {profileData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-lg font-bold text-foreground text-center">{profileData.name}</h2>
                  </div>

                  {/* Profile Details - Compact spacing */}
                  <div className="space-y-3">
                    {/* Year of Completion */}
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 rounded-lg bg-[#E2001D]/10">
                        <GraduationCap className="h-3.5 w-3.5 text-[#E2001D]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Year of Completion</p>
                        <p className="text-sm font-medium text-foreground">{profileData.yearOfCompletion}</p>
                      </div>
                    </div>

                    {/* City & State */}
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 rounded-lg bg-[#E2001D]/10">
                        <MapPin className="h-3.5 w-3.5 text-[#E2001D]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium text-foreground">
                          {profileData.city}, {profileData.state}
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 rounded-lg bg-[#E2001D]/10">
                        <Mail className="h-3.5 w-3.5 text-[#E2001D]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Email Address</p>
                        <p className="text-sm font-medium text-foreground truncate">{profileData.email}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 rounded-lg bg-[#E2001D]/10">
                        <Phone className="h-3.5 w-3.5 text-[#E2001D]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Contact Number</p>
                        <p className="text-sm font-medium text-foreground">{profileData.phone}</p>
                      </div>
                    </div>

                    {/* Occupation */}
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 rounded-lg bg-[#E2001D]/10">
                        <Briefcase className="h-3.5 w-3.5 text-[#E2001D]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Current Occupation</p>
                        <p className="text-sm font-medium text-foreground">{profileData.occupation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons at bottom */}
                <div className="space-y-2 mt-4">
                  {/* Edit Button */}
                  <Button
                    onClick={() => setIsEditOpen(true)}
                    className="w-full bg-gradient-to-r from-[#E2001D] to-[#B1040E] hover:from-[#B1040E] hover:to-[#E2001D] text-white"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </>
            ) : (
              // Collapsed view - only show icons
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-10 w-10 ring-2 ring-[#E2001D]/20">
                  <AvatarImage src={profileData.profilePicture || "/placeholder.svg"} alt={profileData.name} />
                  <AvatarFallback className="text-xs bg-gradient-to-br from-[#E2001D] to-[#B1040E] text-white">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  onClick={() => setIsEditOpen(true)}
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 text-[#E2001D] hover:bg-[#E2001D]/10"
                >
                  <Edit className="h-5 w-5" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </aside>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your profile information below</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 overflow-y-auto flex-1">
            <div className="grid gap-4 py-4 overflow-y-auto flex-1">
              <div className="flex flex-col items-center gap-3">
                <Avatar className="h-24 w-24 ring-4 ring-[#E2001D]/20">
                  <AvatarImage src={profileData.profilePicture || "/placeholder.svg"} alt={profileData.name} />
                  <AvatarFallback className="text-xl bg-gradient-to-br from-[#E2001D] to-[#B1040E] text-white">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Label
                    htmlFor="profile-picture"
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E2001D] text-[#E2001D] hover:bg-[#E2001D] hover:text-white transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                    Change Profile
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRemoveProfilePicture}
                    className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
                  >
                    <X className="h-4 w-4" />
                    Remove Profile
                  </Button>
                </div>
                <Input
                  id="profile-picture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Year of Completion</Label>
                <Input
                  id="year"
                  value={profileData.yearOfCompletion}
                  onChange={(e) => setProfileData({ ...profileData, yearOfCompletion: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={profileData.city}
                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={profileData.state}
                    onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Contact Number</Label>
                <div className="flex gap-2">
                  <Input id="phone" value={profileData.phone} onChange={(e) => handlePhoneChange(e.target.value)} />
                  {isPhoneChanged && !isOtpVerified && (
                    <Button
                      type="button"
                      onClick={handleVerifyClick}
                      className="bg-[#E2001D] hover:bg-[#B1040E] text-white whitespace-nowrap"
                    >
                      Verify
                    </Button>
                  )}
                  {isOtpVerified && (
                    <div className="flex items-center gap-2 px-4 bg-green-50 border border-green-200 rounded-md">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">Verified</span>
                    </div>
                  )}
                </div>
              </div>

              {showOtpInput && !isOtpVerified && (
                <div className="space-y-2 p-4 bg-gradient-to-r from-[#E2001D]/5 via-[#F7C744]/5 to-[#B1040E]/5 rounded-lg border-2 border-[#F7C744]">
                  <Label className="text-gray-900 font-medium">Enter OTP</Label>
                  <p className="text-sm text-gray-600 mb-3">Enter the 6-digit code sent to {profileData.phone}</p>
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(el) => (otpInputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-12 text-center text-lg font-semibold border-2 border-[#E2001D] focus:border-[#B1040E] focus:ring-[#B1040E]"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="occupation">Current Occupation</Label>
                <Input
                  id="occupation"
                  value={profileData.occupation}
                  onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveProfile}
              className="bg-gradient-to-r from-[#E2001D] to-[#B1040E] hover:from-[#B1040E] hover:to-[#E2001D] text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
