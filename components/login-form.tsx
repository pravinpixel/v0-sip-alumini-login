"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"

interface LoginFormProps {
  onSendOtp: (mobile: string) => void
}

export function LoginForm({ onSendOtp }: LoginFormProps) {
  const [mobile, setMobile] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validateMobile = (value: string) => {
    const mobileRegex = /^[0-9]{10}$/
    return mobileRegex.test(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateMobile(mobile)) {
      setError("Please enter a valid 10-digit mobile number")
      return
    }

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onSendOtp(mobile)
    }, 1000)
  }

  return (
    <Card className="border-border shadow-lg">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto">
          <Image src="/sip-abacus-logo.png" alt="SIP Abacus" width={180} height={60} className="mx-auto" />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                setError("")
              }}
              className={error ? "border-destructive" : ""}
              maxLength={10}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
