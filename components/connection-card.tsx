"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MapPin, Briefcase, MessageSquare, MoreVertical, UserMinus } from "lucide-react"
import Link from "next/link"

interface Connection {
  id: string
  name: string
  batch: string
  department: string
  currentCompany: string
  designation: string
  location: string
  connectedDate: string
}

interface ConnectionCardProps {
  connection: Connection
  onRemove: (id: string) => void
}

export function ConnectionCard({ connection, onRemove }: ConnectionCardProps) {
  const initials = connection.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <Link href={`/profile/${connection.id}`}>
                  <h3 className="font-semibold text-foreground hover:text-primary transition-colors truncate">
                    {connection.name}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground">
                  Connected on {new Date(connection.connectedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onRemove(connection.id)} className="text-destructive">
                  <UserMinus className="h-4 w-4 mr-2" />
                  Remove Connection
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              {connection.batch}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {connection.department}
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2 text-muted-foreground">
              <Briefcase className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{connection.designation}</p>
                <p className="text-xs truncate">{connection.currentCompany}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{connection.location}</span>
            </div>
          </div>

          <Button className="w-full gap-2">
            <MessageSquare className="h-4 w-4" />
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
