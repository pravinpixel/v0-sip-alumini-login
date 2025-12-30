"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageSquare, Calendar } from "lucide-react"
import { Separator } from "@/components/ui/separator"

// Mock data for user's posts
const mockUserPosts = [
  {
    id: "1",
    title: "Introduction to Abacus Learning",
    description: "Sharing my experience with abacus learning and how it helped improve mental math skills.",
    labels: ["Abacus", "Education"],
    status: "Approved",
    createdAt: "2024-01-15T10:30:00",
    comments: [
      {
        id: "c1",
        author: "Priya Sharma",
        avatar: "/professional-woman.png",
        content: "Great post! I've been teaching abacus for 5 years now.",
        createdAt: "2024-01-15T14:20:00",
      },
      {
        id: "c2",
        author: "Rajesh Kumar",
        avatar: "/professional-man.png",
        content: "This is very helpful. Can you share more resources?",
        createdAt: "2024-01-16T09:15:00",
      },
    ],
  },
  {
    id: "2",
    title: "Career Opportunities in Data Science",
    description: "Discussing the growing field of data science and career paths for fresh graduates.",
    labels: ["Career", "Technology"],
    status: "Approved",
    createdAt: "2024-01-10T15:45:00",
    comments: [
      {
        id: "c3",
        author: "Amit Patel",
        avatar: "/man-engineer.png",
        content: "Very informative! I'm currently transitioning to data science.",
        createdAt: "2024-01-11T11:30:00",
      },
    ],
  },
  {
    id: "3",
    title: "Alumni Meetup Planning",
    description:
      "Let's organize an alumni meetup in Mumbai next month. Looking for suggestions on venue and activities.",
    labels: ["Events", "Networking"],
    status: "Pending",
    createdAt: "2024-01-20T08:00:00",
    comments: [],
  },
  {
    id: "4",
    title: "Tips for Competitive Exams",
    description: "Sharing my preparation strategy for competitive exams that helped me succeed.",
    labels: ["Education", "Exams"],
    status: "Approved",
    createdAt: "2024-01-05T12:00:00",
    comments: [
      {
        id: "c4",
        author: "Sneha Reddy",
        avatar: "/woman-engineer-at-work.png",
        content: "Thank you for sharing! This is exactly what I needed.",
        createdAt: "2024-01-06T10:45:00",
      },
      {
        id: "c5",
        author: "Vikram Singh",
        avatar: "/man-manager.png",
        content: "Could you elaborate on the time management aspect?",
        createdAt: "2024-01-07T16:20:00",
      },
      {
        id: "c6",
        author: "Ananya Iyer",
        avatar: "/woman-scientist.png",
        content: "Great tips! I'll definitely try these strategies.",
        createdAt: "2024-01-08T09:30:00",
      },
    ],
  },
  {
    id: "5",
    title: "Freelancing as a Side Hustle",
    description: "How I started freelancing while working full-time and tips for beginners.",
    labels: ["Career", "Freelancing"],
    status: "Rejected",
    createdAt: "2024-01-18T14:30:00",
    comments: [],
  },
]

export default function ActivityPage() {
  const [posts] = useState(mockUserPosts)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const totalPosts = posts.length
  const totalComments = posts.reduce((sum, post) => sum + post.comments.length, 0)
  const approvedPosts = posts.filter((p) => p.status === "Approved").length
  const pendingPosts = posts.filter((p) => p.status === "Pending").length

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => window.history.back()} className="mb-4 hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Connections
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Your Activity</h1>
          <p className="text-sm text-muted-foreground mt-1">View your posts, their status, and comments received</p>
        </div>

        {/* Activity Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-[#E2001D]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#E2001D] to-[#B1040E] bg-clip-text text-transparent">
                {totalPosts}
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{approvedPosts}</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">{pendingPosts}</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[#F7C744]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#B1040E]">{totalComments}</p>
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Your Posts</h2>
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
                      <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{post.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {post.labels.map((label, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-[#F7C744]/10 text-[#B1040E] border-[#F7C744]"
                        >
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.createdAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {post.comments.length} {post.comments.length === 1 ? "Comment" : "Comments"}
                  </div>
                </div>
              </CardHeader>

              {post.comments.length > 0 && (
                <CardContent>
                  <Separator className="mb-4" />
                  <h4 className="text-sm font-semibold text-foreground mb-3">Comments</h4>
                  <div className="space-y-3">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                          <AvatarFallback className="bg-gradient-to-br from-[#E2001D] to-[#B1040E] text-white text-xs">
                            {getInitials(comment.author)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-foreground">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
