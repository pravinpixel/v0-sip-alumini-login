"use client"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageNav } from "@/components/page-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Clock,
  FileText,
  Heart,
  MessageSquare,
  Eye,
  TrendingUp,
  ArrowRight,
  Share2,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

// Mock data for dashboard
const quickStats = [
  {
    title: "Connections Made",
    value: 24,
    icon: Users,
    color: "from-[#E2001D] to-[#B1040E]",
    description: "Total accepted invites",
  },
  {
    title: "Pending Requests",
    value: 5,
    icon: Clock,
    color: "from-[#F7C744] to-[#E2001D]",
    description: "Awaiting response",
  },
  {
    title: "Posts Created",
    value: 12,
    icon: FileText,
    color: "from-[#B1040E] to-[#E2001D]",
    description: "Community contributions",
  },
  {
    title: "Total Engagement",
    value: 156,
    icon: Heart,
    color: "from-[#E2001D] to-[#F7C744]",
    description: "Likes & replies received",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "connection",
    description: "Contact shared with Priya Sharma",
    time: "2 hours ago",
    icon: Share2,
  },
  {
    id: 2,
    type: "accepted",
    description: "Connection request accepted by Amit Patel",
    time: "5 hours ago",
    icon: CheckCircle,
  },
  {
    id: 3,
    type: "post",
    description: "Created a new community post about AI trends",
    time: "1 day ago",
    icon: FileText,
  },
  {
    id: 4,
    type: "connection",
    description: "Contact shared with Vikram Singh",
    time: "2 days ago",
    icon: Share2,
  },
  {
    id: 5,
    type: "accepted",
    description: "Connection request accepted by Sneha Reddy",
    time: "3 days ago",
    icon: CheckCircle,
  },
]

const trendingPosts = [
  {
    id: 1,
    title: "Future of AI in Education",
    description: "Exploring how artificial intelligence is transforming the learning experience...",
    author: "Rajesh Kumar",
    authorAvatar: "/professional-man.png",
    views: 245,
    likes: 42,
    comments: 18,
  },
  {
    id: 2,
    title: "Career Transition Tips",
    description: "Sharing my journey from software development to product management...",
    author: "Priya Sharma",
    authorAvatar: "/professional-woman.png",
    views: 189,
    likes: 35,
    comments: 12,
  },
  {
    id: 3,
    title: "Alumni Meetup 2024",
    description: "Planning our annual alumni gathering in Bangalore. Join us for networking...",
    author: "Amit Patel",
    authorAvatar: "/man-engineer.png",
    views: 156,
    likes: 28,
    comments: 9,
  },
]

const directoryInsights = {
  totalAlumni: 1247,
  newThisMonth: 23,
  contactsShared: 156,
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PageNav />

      <div className="p-6 lg:p-8 bg-white min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Alumni Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your activity overview</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                  <p className="text-sm font-semibold text-foreground mb-1">{stat.title}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Community Highlights */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Community Highlights</CardTitle>
                <CardDescription>Trending posts from the community</CardDescription>
              </div>
              <Link href="/community">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingPosts.map((post) => (
                <Card key={post.id} className="border hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.description}</p>

                    <div className="flex items-center gap-2 mb-4">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                        <AvatarFallback>
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{post.author}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {post.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {post.comments}
                      </div>
                    </div>

                    <Link href="/community">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        View Thread
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
