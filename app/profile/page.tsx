"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ProfileView } from "@/components/profile-view"
import { ProfileEdit } from "@/components/profile-edit"
import { Button } from "@/components/ui/button"
import { Edit2 } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Rajesh Kumar",
    yearOfCompletion: "2019",
    cityState: "Bangalore, Karnataka",
    email: "rajesh.kumar@example.com",
    mobile: "+91 9876543210",
    occupation: "Senior Software Engineer",
    profilePicture: "",
  })

  const handleSave = (updatedData: typeof profileData) => {
    setProfileData(updatedData)
    setIsEditing(false)
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
            <p className="text-muted-foreground">View and manage your profile information</p>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="gap-2 bg-gradient-to-r from-[#E2001D] to-[#B1040E] text-white hover:opacity-90"
            >
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>

        {isEditing ? (
          <ProfileEdit data={profileData} onSave={handleSave} onCancel={() => setIsEditing(false)} />
        ) : (
          <ProfileView data={profileData} />
        )}
      </div>
    </DashboardLayout>
  )
}
