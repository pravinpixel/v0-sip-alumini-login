import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Briefcase, GraduationCap } from "lucide-react"

interface ProfileData {
  name: string
  yearOfCompletion: string
  cityState: string
  email: string
  mobile: string
  occupation: string
  profilePicture?: string
}

interface ProfileViewProps {
  data: ProfileData
}

export function ProfileView({ data }: ProfileViewProps) {
  const initials = data.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              {data.profilePicture ? (
                <AvatarImage src={data.profilePicture || "/placeholder.svg"} alt={data.name} />
              ) : (
                <AvatarFallback className="text-3xl bg-gradient-to-br from-[#E2001D] to-[#B1040E] text-white">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{data.name}</h2>
                <p className="text-lg text-gray-600 mt-1">{data.occupation}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="gap-1 bg-[#F7C744] text-gray-900 hover:bg-[#F7C744]/90">
                  <GraduationCap className="h-3 w-3" />
                  Class of {data.yearOfCompletion}
                </Badge>
                <Badge className="gap-1 bg-[#E2001D] text-white hover:bg-[#B1040E]">
                  <MapPin className="h-3 w-3" />
                  {data.cityState}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-[#E2001D]">
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Contact Information</h3>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#E2001D] to-[#F7C744] flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="font-medium">{data.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#F7C744] to-[#E2001D] flex items-center justify-center">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Contact Number</p>
                <p className="font-medium">{data.mobile}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#B1040E] to-[#E2001D] flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">City & State</p>
                <p className="font-medium">{data.cityState}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#F7C744]">
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Academic & Professional</h3>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#F7C744] to-[#E2001D] flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Year of Completion</p>
                <p className="font-medium">{data.yearOfCompletion}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#E2001D] to-[#B1040E] flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Current Occupation/Field of Study</p>
                <p className="font-medium">{data.occupation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
