"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProfileData {
  name: string
  yearOfCompletion: string
  cityState: string
  email: string
  mobile: string
  occupation: string
  profilePicture?: string
}

interface ProfileEditProps {
  data: ProfileData
  onSave: (data: ProfileData) => void
  onCancel: () => void
}

export function ProfileEdit({ data, onSave, onCancel }: ProfileEditProps) {
  const [formData, setFormData] = useState(data)
  const [originalMobile, setOriginalMobile] = useState(data.mobile)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [profilePreview, setProfilePreview] = useState(data.profilePicture || "")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.mobile !== originalMobile && !isOtpVerified) {
      toast({
        title: "Verification Required",
        description: "Please verify your new mobile number before saving.",
        variant: "destructive",
      })
      return
    }

    onSave({ ...formData, profilePicture: profilePreview })
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    })
  }

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === "mobile" && value !== originalMobile) {
      setIsOtpVerified(false)
      setShowOtpInput(false)
      setOtp(["", "", "", "", "", ""])
    } else if (field === "mobile" && value === originalMobile) {
      setIsOtpVerified(true)
    }
  }

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePreview(reader.result as string)
        toast({
          title: "Profile Picture Updated",
          description: "Your profile picture has been changed.",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVerifyClick = () => {
    setShowOtpInput(true)
    toast({
      title: "OTP Sent",
      description: `Verification code sent to ${formData.mobile}`,
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
          title: "Mobile Verified",
          description: "Your mobile number has been verified successfully.",
        })
      }, 500)
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  const initials = formData.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const isMobileChanged = formData.mobile !== originalMobile

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-2 border-[#F7C744]">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg ring-4 ring-[#F7C744]">
                {profilePreview ? (
                  <AvatarImage src={profilePreview || "/placeholder.svg"} alt={formData.name} />
                ) : (
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-[#E2001D] to-[#B1040E] text-white">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-gradient-to-br from-[#E2001D] to-[#B1040E] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <Camera className="h-5 w-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">Profile Picture</h3>
              <p className="text-sm text-gray-500">Click the camera icon to upload or change</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-[#E2001D]">
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-900 font-medium">
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              className="border-gray-300 focus:border-[#E2001D] focus:ring-[#E2001D]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearOfCompletion" className="text-gray-900 font-medium">
              Year of Completion *
            </Label>
            <Input
              id="yearOfCompletion"
              value={formData.yearOfCompletion}
              onChange={(e) => handleChange("yearOfCompletion", e.target.value)}
              placeholder="e.g., 2019"
              required
              className="border-gray-300 focus:border-[#E2001D] focus:ring-[#E2001D]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cityState" className="text-gray-900 font-medium">
              City & State *
            </Label>
            <Input
              id="cityState"
              value={formData.cityState}
              onChange={(e) => handleChange("cityState", e.target.value)}
              placeholder="e.g., Bangalore, Karnataka"
              required
              className="border-gray-300 focus:border-[#E2001D] focus:ring-[#E2001D]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-900 font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
              className="border-gray-300 focus:border-[#E2001D] focus:ring-[#E2001D]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile" className="text-gray-900 font-medium">
              Contact Number *
            </Label>
            <div className="flex gap-2">
              <Input
                id="mobile"
                type="tel"
                value={formData.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
                required
                className="border-gray-300 focus:border-[#E2001D] focus:ring-[#E2001D]"
              />
              {isMobileChanged && !isOtpVerified && (
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
              <p className="text-sm text-gray-600 mb-3">Enter the 6-digit code sent to {formData.mobile}</p>
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

          <div className="space-y-2">
            <Label htmlFor="occupation" className="text-gray-900 font-medium">
              Current Occupation/Field of Study *
            </Label>
            <Input
              id="occupation"
              value={formData.occupation}
              onChange={(e) => handleChange("occupation", e.target.value)}
              placeholder="e.g., Software Engineer, MBA Student"
              required
              className="border-gray-300 focus:border-[#E2001D] focus:ring-[#E2001D]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-gray-300 hover:bg-gray-50 bg-transparent"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-[#E2001D] to-[#B1040E] hover:from-[#B1040E] hover:to-[#E2001D] text-white"
        >
          Save Changes
        </Button>
      </div>
    </form>
  )
}
