"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface OtpVerificationProps {
  mobileNumber: string
  onVerify: (otp: string) => void
  onResend: () => void
  onBack: () => void
}

export function OtpVerification({ mobileNumber, onVerify, onResend, onBack }: OtpVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all fields are filled
    if (index === 5 && value && newOtp.every((digit) => digit !== "")) {
      handleVerify(newOtp.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("")
    if (pastedData.every((char) => /^\d$/.test(char))) {
      const newOtp = [...otp]
      pastedData.forEach((char, index) => {
        if (index < 6) newOtp[index] = char
      })
      setOtp(newOtp)
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus()
    }
  }

  const handleVerify = (otpValue: string) => {
    if (otpValue.length !== 6) {
      setError("Please enter complete OTP")
      return
    }

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onVerify(otpValue)
    }, 1000)
  }

  const handleResend = () => {
    setResendTimer(30)
    setOtp(["", "", "", "", "", ""])
    inputRefs.current[0]?.focus()
    onResend()
  }

  return (
    <Card className="border-border shadow-lg">
      <CardHeader>
        <Button variant="ghost" size="sm" onClick={onBack} className="w-fit -ml-2 mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <CardTitle className="text-2xl font-bold">Verify OTP</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter the 6-digit code sent to <span className="font-medium text-foreground">+91 {mobileNumber}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 justify-center" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-semibold border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
            />
          ))}
        </div>
        {error && <p className="text-sm text-destructive text-center">{error}</p>}
        <Button
          onClick={() => handleVerify(otp.join(""))}
          className="w-full"
          disabled={isLoading || otp.some((digit) => !digit)}
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>
        <div className="text-center text-sm">
          {resendTimer > 0 ? (
            <p className="text-muted-foreground">Resend OTP in {resendTimer}s</p>
          ) : (
            <Button variant="link" onClick={handleResend} className="text-primary p-0 h-auto">
              Resend OTP
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
