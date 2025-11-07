"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  MessageCircle,
  Eye,
  Heart,
  Search,
  Edit,
  Trash2,
  RefreshCw,
  FileText,
  Bold,
  Italic,
  List,
  Palette,
  CheckCircle,
  Clock,
  XCircle,
  Reply,
  ArrowLeft,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const mockUserPosts = [
  {
    id: "u1",
    title: "My Experience with Abacus Training",
    description:
      "I've been teaching Abacus for over 5 years now, and I wanted to share some insights about effective teaching methods.",
    labels: ["Abacus", "Teaching", "Experience"],
    status: "active",
    postedTimestamp: "2024-03-25T10:00:00Z",
    approvedTimestamp: "2024-03-25T14:30:00Z",
    views: 156,
    likes: 23,
    replies: 5,
    comments: [
      {
        id: "c1",
        author: "Priya Sharma",
        content: "This is very helpful! Thank you for sharing.",
        timestamp: "2024-03-25T11:00:00Z",
      },
      {
        id: "c2",
        author: "Amit Patel",
        content: "Great insights! I'll try these methods with my students.",
        timestamp: "2024-03-25T12:30:00Z",
      },
    ],
  },
  {
    id: "u2",
    title: "Teaching Tips for Beginners",
    description: "A comprehensive guide for new Abacus instructors starting their teaching journey.",
    labels: ["Teaching", "Beginners", "Tips"],
    status: "pending",
    postedTimestamp: "2024-03-27T09:00:00Z",
    approvedTimestamp: null,
    views: 0,
    likes: 0,
    replies: 0,
    comments: [],
  },
  {
    id: "u3",
    title: "Competition Preparation Guide",
    description: "How to prepare students for Abacus competitions effectively.",
    labels: ["Competition", "Preparation", "Students"],
    status: "rejected",
    postedTimestamp: "2024-03-20T14:00:00Z",
    approvedTimestamp: null,
    remarks:
      "Content needs more detail and clarity. Please add specific examples and expand on the preparation strategies.",
    views: 45,
    likes: 8,
    replies: 0,
    comments: [],
  },
  {
    id: "u4",
    title: "Mental Math Techniques Workshop",
    description: "Sharing my experience conducting mental math workshops for different age groups.",
    labels: ["Mental Math", "Workshop", "Techniques"],
    status: "active",
    postedTimestamp: "2024-03-22T11:00:00Z",
    approvedTimestamp: "2024-03-22T16:45:00Z",
    views: 189,
    likes: 31,
    replies: 7,
    comments: [],
  },
  {
    id: "u5",
    title: "Student Success Stories",
    description: "Celebrating the achievements of my students in recent competitions.",
    labels: ["Success", "Students", "Achievement"],
    status: "active",
    postedTimestamp: "2024-03-18T10:00:00Z",
    approvedTimestamp: "2024-03-18T15:20:00Z",
    views: 234,
    likes: 42,
    replies: 12,
    comments: [],
  },
  {
    id: "u6",
    title: "Old Training Methods Discussion",
    description: "Discussing outdated training methods that are no longer effective.",
    labels: ["Training", "Discussion"],
    status: "deleted",
    postedTimestamp: "2024-03-15T10:00:00Z",
    approvedTimestamp: null,
    views: 89,
    likes: 12,
    replies: 3,
    comments: [],
  },
  {
    id: "u7",
    title: "Inappropriate Content Post",
    description: "This post was removed due to policy violations.",
    labels: ["Removed"],
    status: "removed_by_admin",
    postedTimestamp: "2024-03-10T14:00:00Z",
    approvedTimestamp: null,
    remarks: "Post removed due to violation of community guidelines.",
    views: 45,
    likes: 2,
    replies: 1,
    comments: [],
  },
]

export default function CommunityActivityPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [newComment, setNewComment] = useState("")
  const [replyToComment, setReplyToComment] = useState<string | null>(null)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [editingPost, setEditingPost] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isRemarksDialogOpen, setIsRemarksDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRemarks, setSelectedRemarks] = useState("")
  const [postToDelete, setPostToDelete] = useState<string | null>(null)
  const [descriptionFormat, setDescriptionFormat] = useState({ bold: false, italic: false, color: "#000000" })

  const activePosts = mockUserPosts.filter((post) => post.status === "active")
  const pendingPosts = mockUserPosts.filter((post) => post.status === "pending")
  const rejectedPosts = mockUserPosts.filter((post) => post.status === "rejected")
  const postStatusPosts = mockUserPosts.filter((post) => post.status === "pending" || post.status === "rejected")
  const archivedPosts = mockUserPosts.filter((post) => post.status === "deleted" || post.status === "removed_by_admin")
  const totalReplies = mockUserPosts.reduce((sum, post) => sum + post.replies, 0)
  const totalLikes = mockUserPosts.reduce((sum, post) => sum + post.likes, 0)
  const totalComments = mockUserPosts.reduce((sum, post) => sum + post.comments.length, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "deleted":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "removed_by_admin":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "pending":
        return "Pending"
      case "rejected":
        return "Rejected"
      case "deleted":
        return "Post Deleted"
      case "removed_by_admin":
        return "Removed by Admin"
      default:
        return status
    }
  }

  const formatDateTime = (timestamp: string | null) => {
    if (!timestamp) return "N/A"
    const date = new Date(timestamp)
    const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    const timeStr = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    return `${dateStr} at ${timeStr}`
  }

  const handleReplyToComment = (commentId: string) => {
    setReplyToComment(commentId)
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedPost) return

    const updatedPost = {
      ...selectedPost,
      comments: [
        ...selectedPost.comments,
        {
          id: `c${Date.now()}`,
          author: "Current User",
          content: replyToComment
            ? `@${selectedPost.comments.find((c: any) => c.id === replyToComment)?.author} ${newComment}`
            : newComment,
          timestamp: new Date().toISOString(),
        },
      ],
      replies: selectedPost.replies + 1,
    }

    setSelectedPost(updatedPost)
    setNewComment("")
    setReplyToComment(null)
  }

  const handleLikeToggle = (postId: string) => {
    setLikedPosts((prev) => {
      const newLiked = new Set(prev)
      if (newLiked.has(postId)) {
        newLiked.delete(postId)
      } else {
        newLiked.add(postId)
      }
      return newLiked
    })
  }

  const handleEditPost = (post: any) => {
    setEditingPost(post)
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    toast({
      title: "Post Updated",
      description: "Your post has been updated successfully",
    })
    setIsEditDialogOpen(false)
    setEditingPost(null)
  }

  const handleDeletePost = (postId: string) => {
    setPostToDelete(postId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    toast({
      title: "Post Deleted",
      description: "Your post has been deleted successfully",
      variant: "destructive",
    })
    setIsDeleteDialogOpen(false)
    setPostToDelete(null)
  }

  const handleRepost = (post: any) => {
    setEditingPost(post)
    setIsEditDialogOpen(true)
  }

  const handleViewRemarks = (remarks: string) => {
    setSelectedRemarks(remarks)
    setIsRemarksDialogOpen(true)
  }

  const applyDescriptionFormat = (format: string) => {
    if (format === "bold") setDescriptionFormat({ ...descriptionFormat, bold: !descriptionFormat.bold })
    if (format === "italic") setDescriptionFormat({ ...descriptionFormat, italic: !descriptionFormat.italic })
  }

  const filteredPosts = mockUserPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="p-6 bg-white min-h-screen">
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/community")}
            className="gap-2 text-[#E2001D] hover:text-[#B1040E] hover:bg-[#E2001D]/10 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Forum
          </Button>
        </div>
        {/* </CHANGE> */}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Your Activity</h1>
          <p className="text-muted-foreground mt-1">Track your posts and engagement</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {activeTab === "active" ? (
            <>
              <Card className="border-2 border-[#E2001D] hover:scale-105 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-muted-foreground">Active Posts</div>
                    <FileText className="h-5 w-5 text-[#E2001D]" />
                  </div>
                  <div className="text-2xl font-bold text-[#E2001D]">{activePosts.length}</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-[#F7C744] hover:scale-105 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-muted-foreground">Total Likes</div>
                    <Heart className="h-5 w-5 text-[#B1040E]" />
                  </div>
                  <div className="text-2xl font-bold text-[#B1040E]">{totalLikes}</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-blue-500 hover:scale-105 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-muted-foreground">Total Comments</div>
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{totalComments}</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-500 hover:scale-105 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-muted-foreground">Total Replies</div>
                    <Reply className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{totalReplies}</div>
                </CardContent>
              </Card>
            </>
          ) : activeTab === "status" ? (
            <>
              <Card className="border-2 border-[#E2001D] hover:scale-105 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-muted-foreground">Total</div>
                    <FileText className="h-5 w-5 text-[#E2001D]" />
                  </div>
                  <div className="text-2xl font-bold text-[#E2001D]">{pendingPosts.length + rejectedPosts.length}</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-yellow-500 hover:scale-105 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-muted-foreground">Pending</div>
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">{pendingPosts.length}</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-red-500 hover:scale-105 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-muted-foreground">Rejected</div>
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-red-600">{rejectedPosts.length}</div>
                </CardContent>
              </Card>
              {/* </CHANGE> */}
            </>
          ) : (
            <>
              <Card className="border-2 border-gray-300 opacity-60">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-muted-foreground">Total Posts</div>
                    <FileText className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-500">{mockUserPosts.length}</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-gray-300 opacity-60">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-muted-foreground">Active</div>
                    <CheckCircle className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-500">{activePosts.length}</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-gray-300 opacity-60">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-muted-foreground">Pending</div>
                    <Clock className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-500">{pendingPosts.length}</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-gray-300 opacity-60">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-muted-foreground">Rejected</div>
                    <XCircle className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-500">{rejectedPosts.length}</div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <TabsList className="grid w-full max-w-2xl grid-cols-3 h-11">
              <TabsTrigger
                value="active"
                className="text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E2001D] data-[state=active]:to-[#B1040E] data-[state=active]:text-white"
              >
                Active Posts
              </TabsTrigger>
              <TabsTrigger
                value="status"
                className="text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E2001D] data-[state=active]:to-[#B1040E] data-[state=active]:text-white"
              >
                Post Status
              </TabsTrigger>
              <TabsTrigger
                value="archive"
                className="text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E2001D] data-[state=active]:to-[#B1040E] data-[state=active]:text-white"
              >
                Archive
              </TabsTrigger>
            </TabsList>

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-full h-10"
              />
            </div>
          </div>

          <TabsContent value="active" className="space-y-4 animate-in fade-in-50 duration-300">
            {activePosts
              .filter(
                (post) =>
                  post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  post.description.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow border-2 hover:border-[#F7C744]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <h3
                              className="text-lg font-bold text-[#E2001D] hover:text-[#B1040E] cursor-pointer hover:underline"
                              onClick={() => setSelectedPost(post)}
                            >
                              {post.title}
                            </h3>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl pr-8">{selectedPost?.title}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 mt-4">
                              <div className="flex items-center gap-3 pb-4 border-b">
                                <Avatar className="h-12 w-12">
                                  <AvatarFallback className="bg-gradient-to-br from-[#E2001D] to-[#B1040E] text-white">
                                    CU
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-semibold text-lg">Current User</p>
                                  <p className="text-sm text-muted-foreground">
                                    {formatDateTime(selectedPost?.timestamp || "")}
                                  </p>
                                </div>
                              </div>
                              <p className="text-foreground leading-relaxed text-base">{selectedPost?.description}</p>
                              <div className="flex gap-2 flex-wrap">
                                {selectedPost?.labels.map((label: string) => (
                                  <Badge key={label} className="bg-[#F7C744] text-black hover:bg-[#F7C744]/90">
                                    {label}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center gap-6 text-muted-foreground text-sm border-y py-3">
                                <div className="flex items-center gap-2">
                                  <Eye className="h-4 w-4" />
                                  <span>{selectedPost?.views} views</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Heart className="h-4 w-4" />
                                  <span>{selectedPost?.likes} likes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MessageCircle className="h-4 w-4" />
                                  <span>{selectedPost?.replies} replies</span>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <p className="text-sm text-muted-foreground mt-1">{formatDateTime(post.postedTimestamp)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getStatusColor(post.status)}>{getStatusLabel(post.status)}</Badge>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleDeletePost(post.id)}
                                className="h-8 w-8 text-red-600 border-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Post</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      {/* </CHANGE> */}
                    </div>
                    <p className="text-muted-foreground mb-3 line-clamp-2">{post.description}</p>
                    <div className="flex gap-2 flex-wrap mb-3">
                      {post.labels.map((label) => (
                        <Badge key={label} className="bg-[#F7C744] text-black hover:bg-[#F7C744]/90">
                          {label}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-6 text-muted-foreground text-sm pt-3 border-t">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.replies} replies</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="status" className="space-y-3 animate-in fade-in-50 duration-300">
            <TooltipProvider>
              {postStatusPosts
                .filter(
                  (post) =>
                    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.description.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`font-semibold text-base mb-2 truncate ${
                              post.status === "removed_by_admin" ? "text-red-600" : ""
                            }`}
                          >
                            {post.title}
                          </h3>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>Posted: {formatDateTime(post.postedTimestamp)}</p>
                            {post.status === "active" && post.approvedTimestamp && (
                              <p>Approved: {formatDateTime(post.approvedTimestamp)}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={`${getStatusColor(post.status)} capitalize w-20 justify-center`}>
                            {getStatusLabel(post.status)}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {post.status === "pending" && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => handleEditPost(post)}
                                    className="h-8 w-8 text-[#E2001D] border-[#E2001D] hover:bg-[#E2001D]/10"
                                  >
                                    <Edit className="h-3.5 w-3.5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit Post</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                            {post.status === "rejected" && (
                              <>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      onClick={() => handleViewRemarks(post.remarks || "No remarks provided")}
                                      className="h-8 w-8 text-blue-600 border-blue-600 hover:bg-blue-50"
                                    >
                                      <FileText className="h-3.5 w-3.5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>View Remarks</p>
                                  </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      onClick={() => handleRepost(post)}
                                      className="h-8 w-8 text-green-600 border-green-600 hover:bg-green-50"
                                    >
                                      <RefreshCw className="h-3.5 w-3.5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Repost</p>
                                  </TooltipContent>
                                </Tooltip>
                              </>
                            )}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => handleDeletePost(post.id)}
                                  className="h-8 w-8 text-red-600 border-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete Post</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TooltipProvider>
          </TabsContent>

          <TabsContent value="archive" className="space-y-3 animate-in fade-in-50 duration-300">
            <TooltipProvider>
              {archivedPosts
                .filter(
                  (post) =>
                    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.description.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow border-2 hover:border-[#F7C744]">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[#E2001D]">{post.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{formatDateTime(post.postedTimestamp)}</p>
                        </div>
                        <Badge className={getStatusColor(post.status)}>{getStatusLabel(post.status)}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-3 line-clamp-2">{post.description}</p>
                      {post.status === "removed_by_admin" && post.remarks && (
                        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-md">
                          <p className="text-xs text-red-800">
                            <span className="font-semibold">Removal Reason:</span> {post.remarks}
                          </p>
                        </div>
                      )}
                      <div className="flex gap-2 flex-wrap mb-3">
                        {post.labels.map((label) => (
                          <Badge key={label} className="bg-[#F7C744] text-black hover:bg-[#F7C744]/90">
                            {label}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-6 text-muted-foreground text-sm pt-3 border-t">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.replies} replies</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TooltipProvider>
          </TabsContent>
        </Tabs>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingPost?.status === "rejected" ? "Repost" : "Edit Post"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editingPost?.title || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-t-lg border border-b-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => applyDescriptionFormat("bold")}
                    className={`h-8 w-8 p-0 ${descriptionFormat.bold ? "bg-gray-200" : ""}`}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => applyDescriptionFormat("italic")}
                    className={`h-8 w-8 p-0 ${descriptionFormat.italic ? "bg-gray-200" : ""}`}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <List className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="color"
                      value={descriptionFormat.color}
                      onChange={(e) => setDescriptionFormat({ ...descriptionFormat, color: e.target.value })}
                      className="h-6 w-6 cursor-pointer"
                    />
                  </div>
                </div>
                <Textarea
                  id="edit-description"
                  rows={4}
                  value={editingPost?.description || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, description: e.target.value })}
                  className="w-full rounded-t-none"
                  style={{
                    fontWeight: descriptionFormat.bold ? "bold" : "normal",
                    fontStyle: descriptionFormat.italic ? "italic" : "normal",
                    color: descriptionFormat.color,
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-label">Label</Label>
                <Input
                  id="edit-label"
                  value={editingPost?.labels.join(", ") || ""}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, labels: e.target.value.split(",").map((l: string) => l.trim()) })
                  }
                  className="w-full"
                />
              </div>
              <Button onClick={handleSaveEdit} className="w-full bg-[#E2001D] hover:bg-[#B1040E]">
                {editingPost?.status === "rejected" ? "Resubmit Post" : "Save Changes"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Post</DialogTitle>
              <DialogDescription>Are you sure you want to delete this post?</DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isRemarksDialogOpen} onOpenChange={setIsRemarksDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Admin Remarks</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground bg-red-50 p-4 rounded-lg border border-red-200">
                {selectedRemarks}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
