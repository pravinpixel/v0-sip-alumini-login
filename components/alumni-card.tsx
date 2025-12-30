import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, UserPlus } from "lucide-react"
import Link from "next/link"

interface Alumni {
  id: string
  name: string
  batch: string
  department: string
  currentCompany: string
  designation: string
  location: string
}

interface AlumniCardProps {
  alumni: Alumni
}

export function AlumniCard({ alumni }: AlumniCardProps) {
  const initials = alumni.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl bg-primary text-primary-foreground">{initials}</AvatarFallback>
          </Avatar>

          <div className="space-y-2 w-full">
            <Link href={`/profile/${alumni.id}`}>
              <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors">
                {alumni.name}
              </h3>
            </Link>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="text-xs">
                {alumni.batch}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {alumni.department}
              </Badge>
            </div>
          </div>

          <div className="space-y-2 w-full text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="h-4 w-4 flex-shrink-0" />
              <div className="text-left flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{alumni.designation}</p>
                <p className="text-xs truncate">{alumni.currentCompany}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{alumni.location}</span>
            </div>
          </div>

          <Button className="w-full gap-2 bg-transparent" variant="outline">
            <UserPlus className="h-4 w-4" />
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
