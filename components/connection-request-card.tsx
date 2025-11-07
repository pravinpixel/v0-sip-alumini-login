"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, Check, X, Clock } from "lucide-react"
import Link from "next/link"

interface ConnectionRequest {
  id: string
  name: string
  batch: string
  department: string
  currentCompany: string
  designation: string
  location: string
  requestDate: string
}

interface ConnectionRequestCardProps {
  request: ConnectionRequest
  type: "received" | "sent"
  onAccept?: (id: string) => void
  onReject?: (id: string) => void
  onCancel?: (id: string) => void
}

export function ConnectionRequestCard({ request, type, onAccept, onReject, onCancel }: ConnectionRequestCardProps) {
  const initials = request.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <Link href={`/profile/${request.id}`}>
                <h3 className="font-semibold text-foreground hover:text-primary transition-colors truncate">
                  {request.name}
                </h3>
              </Link>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(request.requestDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              {request.batch}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {request.department}
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2 text-muted-foreground">
              <Briefcase className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{request.designation}</p>
                <p className="text-xs truncate">{request.currentCompany}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{request.location}</span>
            </div>
          </div>

          {type === "received" ? (
            <div className="flex gap-2">
              <Button className="flex-1 gap-2" onClick={() => onAccept?.(request.id)}>
                <Check className="h-4 w-4" />
                Accept
              </Button>
              <Button variant="outline" className="flex-1 gap-2 bg-transparent" onClick={() => onReject?.(request.id)}>
                <X className="h-4 w-4" />
                Decline
              </Button>
            </div>
          ) : (
            <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={() => onCancel?.(request.id)}>
              <X className="h-4 w-4" />
              Cancel Request
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
