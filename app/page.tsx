"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { OtpVerification } from "@/components/otp-verification"

export default function LoginPage() {
  const [step, setStep] = useState<"login" | "otp">("login")
  const [mobileNumber, setMobileNumber] = useState("")

  const handleSendOtp = (mobile: string) => {
    setMobileNumber(mobile)
    setStep("otp")
  }

  const handleVerifyOtp = (otp: string) => {
    // Mock OTP verification - in real app, verify with backend
    console.log("[v0] Verifying OTP:", otp, "for mobile:", mobileNumber)
    window.location.href = "/dashboard"
  }

  const handleResendOtp = () => {
    console.log("[v0] Resending OTP to:", mobileNumber)
    // Mock resend OTP logic
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {step === "login" ? (
          <LoginForm onSendOtp={handleSendOtp} />
        ) : (
          <OtpVerification
            mobileNumber={mobileNumber}
            onVerify={handleVerifyOtp}
            onResend={handleResendOtp}
            onBack={() => setStep("login")}
          />
        )}
      </div>
    </div>
  )
}
