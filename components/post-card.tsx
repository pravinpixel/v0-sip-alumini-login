"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, MessageCircle, MoreVertical, Trash2 } from "lucide-react"
import Link from "next/link"

interface Post {
  id: string
  author: {
    name: string
    batch: string
    department: string
    designation: string
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  isLiked: boolean
}

interface PostCardProps {
  post: Post
  onLike: (postId: string) => void
  onDelete: (postId: string) => void
}

export function PostCard({ post, onLike, onDelete }: PostCardProps) {
  const initials = post.author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const timeAgo = (timestamp: string) => {
    const now = new Date()
    const postTime = new Date(timestamp)
    const diffInSeconds = Math.floor((now.getTime() - postTime.getTime()) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
    return postTime.toLocaleDateString()
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Post Header */}
          <div className="flex items-start justify-between">
            <div className="flex gap-3 flex-1 min-w-0">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link href={`/profile/${post.id}`}>
                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                      {post.author.name}
                    </h3>
                  </Link>
                  <Badge variant="secondary" className="text-xs">
                    {post.author.batch}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">{post.author.designation}</p>
                <p className="text-xs text-muted-foreground mt-1">{timeAgo(post.timestamp)}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onDelete(post.id)} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Post Content */}
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>

          {/* Post Actions */}
          <div className="flex items-center gap-4 pt-2 border-t border-border">
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => onLike(post.id)}>
              <Heart className={`h-4 w-4 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
              <span className={post.isLiked ? "text-red-500" : ""}>
                {post.likes} {post.likes === 1 ? "Like" : "Likes"}
              </span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>
                {post.comments} {post.comments === 1 ? "Comment" : "Comments"}
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
