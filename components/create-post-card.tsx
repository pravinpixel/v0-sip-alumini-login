"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send } from "lucide-react"

interface CreatePostCardProps {
  onCreatePost: (content: string) => void
}

export function CreatePostCard({ onCreatePost }: CreatePostCardProps) {
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onCreatePost(content)
      setContent("")
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">RK</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share something with the community..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={!content.trim()} className="gap-2">
              <Send className="h-4 w-4" />
              Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
