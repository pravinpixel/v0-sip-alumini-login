"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageNav } from "@/components/page-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Reply,
  Eye,
  Heart,
  Pin,
  Bold,
  Italic,
  List,
  Palette,
  Filter,
  ChevronDown,
  Send,
} from "lucide-react"

const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp)
  const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  const timeStr = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  return `${dateStr} at ${timeStr}`
}

const mockPosts = [
  {
    id: "1",
    author: { name: "Rajesh Kumar", avatar: "/professional-man.png", batchYear: 2018 },
    title: "Introduction to Abacus Training",
    description: "Excited to share insights about our new Abacus training program for young learners.",
    labels: ["Abacus", "Training", "Education"],
    timestamp: "2024-03-28T10:30:00Z",
    replies: 12,
    views: 245,
    likes: 34,
    isPinned: true,
    status: "approved",
    comments: [
      {
        id: "c1",
        author: "Priya Sharma",
        content: "This is amazing! How can I enroll?",
        timestamp: "2024-03-28T11:00:00Z",
        replies: [
          {
            id: "c1-r1",
            author: "Rajesh Kumar",
            content: "Thanks! You can enroll through our website. I'll share the link with you.",
            timestamp: "2024-03-28T11:30:00Z",
            replies: [],
          },
          {
            id: "c1-r2",
            author: "Amit Patel",
            content: "I'm also interested in enrolling my kids!",
            timestamp: "2024-03-28T12:00:00Z",
            replies: [],
          },
        ],
      },
      {
        id: "c2",
        author: "Amit Patel",
        content: "Great initiative!",
        timestamp: "2024-03-28T12:00:00Z",
        replies: [
          {
            id: "c2-r1",
            author: "Sneha Reddy",
            content: "I agree! This will help so many students.",
            timestamp: "2024-03-28T13:00:00Z",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    author: { name: "Priya Sharma", avatar: "/professional-woman.png", batchYear: 2019 },
    title: "Mental Math Techniques Workshop",
    description: "Join us for an interactive workshop on advanced mental math techniques this weekend.",
    labels: ["Mental Math", "Workshop", "Skills"],
    timestamp: "2024-03-27T15:45:00Z",
    replies: 8,
    views: 189,
    likes: 28,
    isPinned: false,
    status: "approved",
    comments: [
      {
        id: "c3",
        author: "Sneha Reddy",
        content: "Count me in!",
        timestamp: "2024-03-27T16:00:00Z",
        replies: [],
      },
    ],
  },
  {
    id: "3",
    author: { name: "Amit Patel", avatar: "/man-engineer.png", batchYear: 2020 },
    title: "Success Stories from SIP Academy",
    description:
      "Sharing some inspiring success stories from our alumni who have excelled in mathematics competitions.",
    labels: ["Success Stories", "Alumni", "Inspiration"],
    timestamp: "2024-03-26T09:15:00Z",
    replies: 15,
    views: 195,
    likes: 30,
    isPinned: false,
    status: "approved",
    comments: [],
  },
  {
    id: "4",
    author: { name: "Sneha Reddy", avatar: "/woman-engineer-at-work.png", batchYear: 2018 },
    title: "Abacus Competition 2024 Announcement",
    description: "We're organizing the annual Abacus competition. Registration opens next week!",
    labels: ["Abacus", "Competition", "Event"],
    timestamp: "2024-03-25T14:20:00Z",
    replies: 20,
    views: 220,
    likes: 40,
    isPinned: true,
    status: "approved",
    comments: [],
  },
  {
    id: "5",
    author: { name: "Vikram Singh", avatar: "/man-manager.png", batchYear: 2021 },
    title: "Teaching Resources for Abacus",
    description: "Compiled a list of helpful teaching resources for Abacus instructors.",
    labels: ["Abacus", "Resources", "Teaching"],
    timestamp: "2024-03-24T11:30:00Z",
    replies: 6,
    views: 160,
    likes: 20,
    isPinned: false,
    status: "approved",
    comments: [],
  },
  {
    id: "6",
    author: { name: "Anita Desai", avatar: "/woman-scientist.png", batchYear: 2019 },
    title: "Parent-Teacher Meeting Insights",
    description: "Key takeaways from our recent parent-teacher meeting about student progress.",
    labels: ["Parents", "Meeting", "Education"],
    timestamp: "2024-03-23T16:00:00Z",
    replies: 10,
    views: 175,
    likes: 25,
    isPinned: false,
    status: "approved",
    comments: [],
  },
  {
    id: "7",
    author: { name: "Karthik Reddy", avatar: "/man-tech.png", batchYear: 2022 },
    title: "Online Learning Platform Updates",
    description: "New features added to our online learning platform for better student engagement.",
    labels: ["Technology", "Online Learning", "Updates"],
    timestamp: "2024-03-22T10:00:00Z",
    replies: 5,
    views: 150,
    likes: 18,
    isPinned: false,
    status: "approved",
    comments: [],
  },
  {
    id: "8",
    author: { name: "Meera Iyer", avatar: "/professional-woman.png", batchYear: 2020 },
    title: "Summer Camp Registration Open",
    description: "Enroll your kids in our summer camp focused on Abacus and mental math skills.",
    labels: ["Abacus", "Summer Camp", "Registration"],
    timestamp: "2024-03-21T14:30:00Z",
    replies: 18,
    views: 200,
    likes: 32,
    isPinned: false,
    status: "approved",
    comments: [],
  },
  {
    id: "9",
    author: { name: "Suresh Kumar", avatar: "/man-engineer.png", batchYear: 2018 },
    title: "Alumni Meetup - March 2024",
    description: "Let's catch up! Planning an alumni meetup next month. Share your availability.",
    labels: ["Alumni", "Meetup", "Event"],
    timestamp: "2024-03-20T09:00:00Z",
    replies: 22,
    views: 210,
    likes: 35,
    isPinned: false,
    status: "approved",
    comments: [],
  },
  {
    id: "10",
    author: { name: "Divya Nair", avatar: "/woman-scientist.png", batchYear: 2021 },
    title: "Student Achievement Highlights",
    description: "Celebrating our students who won medals in the national Abacus championship!",
    labels: ["Achievement", "Students", "Abacus"],
    timestamp: "2024-03-19T12:00:00Z",
    replies: 25,
    views: 230,
    likes: 42,
    isPinned: false,
    status: "approved",
    comments: [],
  },
  {
    id: "11",
    author: { name: "Ravi Shankar", avatar: "/man-manager.png", batchYear: 2019 },
    title: "New Course Curriculum Updates",
    description: "We've updated our course curriculum to include more advanced topics.",
    labels: ["Curriculum", "Education", "Updates"],
    timestamp: "2024-03-18T15:00:00Z",
    replies: 7,
    views: 140,
    likes: 22,
    isPinned: false,
    status: "approved",
    comments: [],
  },
  {
    id: "12",
    author: { name: "Lakshmi Menon", avatar: "/professional-woman.png", batchYear: 2022 },
    title: "Volunteer Opportunities Available",
    description: "Looking for volunteers to help with our upcoming community outreach program.",
    labels: ["Volunteer", "Community", "Opportunity"],
    timestamp: "2024-03-17T11:00:00Z",
    replies: 9,
    views: 130,
    likes: 19,
    isPinned: false,
    status: "approved",
    comments: [],
  },
]

const mockUserPosts = [
  { id: "u1", title: "My Experience with Abacus", status: "approved", replies: 5 },
  { id: "u2", title: "Teaching Tips for Beginners", status: "pending", replies: 0 },
  { id: "u3", title: "Competition Preparation Guide", status: "rejected", replies: 0 },
]

const CommentThread = ({
  comment,
  depth = 0,
  onReply,
  expandedThreads,
  onToggleThread,
}: {
  comment: any
  depth?: number
  onReply: (commentId: string) => void
  expandedThreads: Set<string>
  onToggleThread: (commentId: string) => void
}) => {
  const isThreaded = depth > 0
  const maxDepth = 3 // Maximum nesting level
  const hasReplies = comment.replies && comment.replies.length > 0
  const isExpanded = expandedThreads.has(comment.id)

  return (
    <div className={`${isThreaded ? "ml-8 mt-3" : ""}`}>
      <div className={`relative ${isThreaded ? "pl-4" : ""}`}>
        {isThreaded && (
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F7C744] to-transparent" />
        )}

        <div
          className={`${isThreaded ? "bg-gradient-to-r from-[#F7C744]/5 to-transparent" : "bg-gray-50"} p-4 rounded-lg border ${isThreaded ? "border-[#F7C744]/20" : "border-gray-200"}`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Avatar className={`${isThreaded ? "h-7 w-7" : "h-8 w-8"}`}>
                <AvatarFallback
                  className={`bg-gradient-to-br from-[#E2001D] to-[#B1040E] text-white ${isThreaded ? "text-[10px]" : "text-xs"}`}
                >
                  {comment.author
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className={`font-semibold ${isThreaded ? "text-xs" : "text-sm"}`}>{comment.author}</p>
                <p className={`${isThreaded ? "text-[10px]" : "text-xs"} text-muted-foreground`}>
                  {formatDateTime(comment.timestamp)}
                </p>
              </div>
            </div>
            {depth < maxDepth && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReply(comment.id)}
                className={`text-[#E2001D] hover:text-[#B1040E] hover:bg-[#E2001D]/10 ${isThreaded ? "h-7 text-xs" : ""}`}
              >
                <Reply className={`${isThreaded ? "h-3 w-3" : "h-4 w-4"} mr-1`} />
                Reply
              </Button>
            )}
          </div>
          <p className={`${isThreaded ? "text-xs ml-9" : "text-sm ml-10"}`}>{comment.content}</p>

          {hasReplies && (
            <button
              onClick={() => onToggleThread(comment.id)}
              className={`${isThreaded ? "text-xs ml-9 mt-2" : "text-sm ml-10 mt-3"} text-[#E2001D] hover:text-[#B1040E] font-medium hover:underline flex items-center gap-1`}
            >
              {isExpanded ? "Hide Thread" : `View Thread (${comment.replies.length})`}
              <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </button>
          )}
          {/* </CHANGE> */}
        </div>
      </div>

      {hasReplies && isExpanded && (
        <div className="space-y-2 mt-2">
          {comment.replies.map((reply: any) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onReply={onReply}
              expandedThreads={expandedThreads}
              onToggleThread={onToggleThread}
            />
          ))}
        </div>
      )}
      {/* </CHANGE> */}
    </div>
  )
}

export default function CommunityPage() {
  const [posts, setPosts] = useState(mockPosts)
  const [userPosts, setUserPosts] = useState(mockUserPosts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [newPost, setNewPost] = useState({ title: "", description: "", label: "" })
  const [newComment, setNewComment] = useState("")
  const [isActivityExpanded, setIsActivityExpanded] = useState(false)
  const [replyToComment, setReplyToComment] = useState<string | null>(null)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [replyingToPostId, setReplyingToPostId] = useState<string | null>(null)
  const [inlineReplyText, setInlineReplyText] = useState("")
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set())
  // </CHANGE>
  const { toast } = useToast()
  const router = useRouter()
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false)
  const [postToPin, setPostToPin] = useState<string | null>(null)
  const [descriptionFormat, setDescriptionFormat] = useState({ bold: false, italic: false, color: "#000000" })
  const [commentFormat, setCommentFormat] = useState({ bold: false, italic: false, color: "#000000" })

  const [selectedSortBy, setSelectedSortBy] = useState<string[]>([])
  const [selectedBatchYears, setSelectedBatchYears] = useState<string[]>([])
  const [selectedDateRanges, setSelectedDateRanges] = useState<string[]>([])
  const [selectedPinnedFilter, setSelectedPinnedFilter] = useState<string[]>([])

  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [sortBy, setSortBy] = useState<"recent" | "liked" | "viewed" | "commented">("recent")
  const [selectedBatchYear, setSelectedBatchYear] = useState<string>("all")
  const [showPinnedOnly, setShowPinnedOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const postsPerPage = 10
  const totalUserPosts = userPosts.length
  const totalRepliesReceived = userPosts.reduce((sum, post) => sum + post.replies, 0)

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLabel = selectedLabel ? post.labels.includes(selectedLabel) : true
    const matchesStatus = post.status === "approved"

    let matchesDateRange = true
    if (selectedDateRanges.length > 0) {
      const postDate = new Date(post.timestamp)
      matchesDateRange = selectedDateRanges.some((range) => {
        if (range === "today") {
          const today = new Date()
          return postDate.toDateString() === today.toDateString()
        } else if (range === "week") {
          const weekAgo = new Date()
          weekAgo.setDate(weekAgo.getDate() - 7)
          return postDate >= weekAgo
        } else if (range === "month") {
          const monthAgo = new Date()
          monthAgo.setMonth(monthAgo.getMonth() - 1)
          return postDate >= monthAgo
        }
        return true
      })
    }

    const matchesBatchYear =
      selectedBatchYears.length === 0 || selectedBatchYears.includes(post.author.batchYear.toString())

    const matchesPinned =
      selectedPinnedFilter.length === 0 || selectedPinnedFilter.includes(post.isPinned ? "pinned" : "regular")

    return matchesSearch && matchesLabel && matchesStatus && matchesDateRange && matchesBatchYear && matchesPinned
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1

    if (selectedSortBy.length > 0) {
      const sortType = selectedSortBy[0]
      switch (sortType) {
        case "liked":
          return b.likes - a.likes
        case "viewed":
          return b.views - a.views
        case "commented":
          return b.replies - a.replies
        case "recent":
        default:
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      }
    }

    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = sortedPosts.slice(startIndex, endIndex)

  const batchYears = Array.from(new Set(posts.map((post) => post.author.batchYear))).sort((a, b) => b - a)

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.description.trim() || !newPost.label.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const post = {
      id: `u${Date.now()}`,
      title: newPost.title,
      status: "pending" as const,
      replies: 0,
    }

    setUserPosts([post, ...userPosts])
    setNewPost({ title: "", description: "", label: "" })
    setIsCreateDialogOpen(false)

    toast({
      title: "Post Submitted",
      description: "Your post is pending admin approval",
    })
  }

  const handleReplyToComment = (commentId: string) => {
    setReplyToComment(commentId)
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedPost) return

    const updatedPosts = posts.map((post) => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `c${Date.now()}`,
              author: "Current User",
              content: replyToComment
                ? `@${selectedPost.comments.find((c: any) => c.id === replyToComment)?.author} ${newComment}`
                : newComment,
              timestamp: new Date().toISOString(),
              replies: [], // New comment starts with no replies
            },
          ],
          replies: post.replies + 1,
        }
      }
      return post
    })

    setPosts(updatedPosts)
    setSelectedPost({
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
          replies: [],
        },
      ],
      replies: selectedPost.replies + 1,
    })
    setNewComment("")
    setReplyToComment(null)

    toast({
      title: "Comment Added",
      description: "Your comment has been posted",
    })
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

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: likedPosts.has(postId) ? post.likes - 1 : post.likes + 1 } : post,
      ),
    )
  }

  const handlePinPost = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? { ...post, isPinned: !post.isPinned } : post)),
    )
    setIsPinDialogOpen(false)
    toast({
      title: posts.find((p) => p.id === postId)?.isPinned ? "Post Unpinned" : "Post Pinned",
      description: posts.find((p) => p.id === postId)?.isPinned
        ? "Post removed from pinned posts"
        : "Post has been pinned to the top",
    })
  }

  const applyDescriptionFormat = (format: string) => {
    if (format === "bold") setDescriptionFormat({ ...descriptionFormat, bold: !descriptionFormat.bold })
    if (format === "italic") setDescriptionFormat({ ...descriptionFormat, italic: !descriptionFormat.italic })
  }

  const applyCommentFormat = (format: string) => {
    if (format === "bold") setCommentFormat({ ...commentFormat, bold: !commentFormat.bold })
    if (format === "italic") setCommentFormat({ ...commentFormat, italic: !commentFormat.italic })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const toggleSortBy = (sort: string) => {
    setSelectedSortBy([sort])
  }

  const toggleBatchYear = (year: string) => {
    setSelectedBatchYears((prev) => (prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]))
  }

  const toggleDateRange = (range: string) => {
    setSelectedDateRanges((prev) => (prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]))
  }

  const togglePinnedFilter = (filter: string) => {
    setSelectedPinnedFilter((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const removeFilter = (type: "sort" | "batch" | "date" | "pinned", value: string) => {
    if (type === "sort") {
      setSelectedSortBy((prev) => prev.filter((s) => s !== value))
    } else if (type === "batch") {
      setSelectedBatchYears((prev) => prev.filter((y) => y !== value))
    } else if (type === "date") {
      setSelectedDateRanges((prev) => prev.filter((r) => r !== value))
    } else {
      setSelectedPinnedFilter((prev) => prev.filter((f) => f !== value))
    }
  }

  const clearAllFilters = () => {
    setSelectedSortBy([])
    setSelectedBatchYears([])
    setSelectedDateRanges([])
    setSelectedPinnedFilter([])
  }

  const hasActiveFilters =
    selectedSortBy.length > 0 ||
    selectedBatchYears.length > 0 ||
    selectedDateRanges.length > 0 ||
    selectedPinnedFilter.length > 0

  const sortOptions = [
    { value: "recent", label: "Most Recent" },
    { value: "liked", label: "Most Liked" },
    { value: "viewed", label: "Most Viewed" },
    { value: "commented", label: "Most Commented" },
  ]

  const dateRangeOptions = [
    { value: "today", label: "Today" },
    { value: "week", label: "Last 7 Days" },
    { value: "month", label: "Last 30 Days" },
  ]

  const pinnedOptions = [
    { value: "pinned", label: "Pinned Posts" },
    { value: "regular", label: "Regular Posts" },
  ]

  const handleInlineReply = (postId: string) => {
    if (!inlineReplyText.trim()) return

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `c${Date.now()}`,
              author: "Current User",
              content: inlineReplyText,
              timestamp: new Date().toISOString(),
              replies: [], // New inline reply starts with no replies
            },
          ],
          replies: post.replies + 1,
        }
      }
      return post
    })

    setPosts(updatedPosts)
    setInlineReplyText("")
    setReplyingToPostId(null)

    toast({
      title: "Reply Posted",
      description: "Your reply has been added to the post",
    })
  }

  const handleReplyClick = (postId: string) => {
    if (replyingToPostId === postId) {
      setReplyingToPostId(null)
      setInlineReplyText("")
    } else {
      setReplyingToPostId(postId)
      setInlineReplyText("")
    }
  }

  const handleToggleThread = (commentId: string) => {
    setExpandedThreads((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(commentId)) {
        newSet.delete(commentId)
      } else {
        newSet.add(commentId)
      }
      return newSet
    })
  }
  // </CHANGE>

  return (
    <DashboardLayout>
      <PageNav />
      <div className="p-4 lg:p-6 bg-white min-h-screen">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Forum Posts</h1>
              <p className="text-muted-foreground mt-1">Share and engage with the SIP Academy community</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => router.push("/community/activity")}
                className="bg-gradient-to-r from-[#E2001D] to-[#B1040E] text-white hover:opacity-90 gap-2"
              >
                Your Activity
              </Button>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-[#E2001D] to-[#B1040E] text-white hover:opacity-90 gap-2">
                    <Plus className="h-4 w-4" />
                    Create Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter post title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter post description"
                        rows={4}
                        value={newPost.description}
                        onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="label">Label</Label>
                      <Input
                        id="label"
                        placeholder="e.g., Abacus, Training, Event"
                        value={newPost.label}
                        onChange={(e) => setNewPost({ ...newPost, label: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleCreatePost} className="w-full bg-[#E2001D] hover:bg-[#B1040E]">
                      Submit Post
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-full h-10"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-10 rounded-lg border-2 gap-2"
              >
                <Filter className="h-4 w-4" />
                {showFilters ? "Close Filters" : "Filter"}
                {hasActiveFilters && !showFilters && (
                  <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-xs">
                    {selectedSortBy.length +
                      selectedBatchYears.length +
                      selectedDateRanges.length +
                      selectedPinnedFilter.length}
                  </Badge>
                )}
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </Button>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="h-10 rounded-lg border-2 text-[#E2001D] hover:bg-[#E2001D]/10 bg-transparent"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="border-2 border-border rounded-lg p-4 bg-gray-50 animate-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Date Range Filter Dropdown */}
                <div>
                  <h3 className="font-semibold text-sm mb-3 text-foreground">Date Range</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between h-10 bg-transparent">
                        <span className="text-sm">
                          {selectedDateRanges.length > 0
                            ? `${selectedDateRanges.length} selected`
                            : "Select date range"}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-3" align="start">
                      <div className="space-y-2">
                        {dateRangeOptions.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={`date-dropdown-${option.value}`}
                              checked={selectedDateRanges.includes(option.value)}
                              onCheckedChange={() => toggleDateRange(option.value)}
                            />
                            <label
                              htmlFor={`date-dropdown-${option.value}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Sort By Filter Dropdown */}
                <div>
                  <h3 className="font-semibold text-sm mb-3 text-foreground">Sort By</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between h-10 bg-transparent">
                        <span className="text-sm">
                          {selectedSortBy.length > 0
                            ? sortOptions.find((s) => s.value === selectedSortBy[0])?.label
                            : "Select sorting"}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-3" align="start">
                      <div className="space-y-2">
                        {sortOptions.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={`sort-dropdown-${option.value}`}
                              checked={selectedSortBy.includes(option.value)}
                              onCheckedChange={() => toggleSortBy(option.value)}
                            />
                            <label
                              htmlFor={`sort-dropdown-${option.value}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Batch Year Filter Dropdown */}
                <div>
                  <h3 className="font-semibold text-sm mb-3 text-foreground">Batch Year</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between h-10 bg-transparent">
                        <span className="text-sm">
                          {selectedBatchYears.length > 0
                            ? `${selectedBatchYears.length} selected`
                            : "Select batch years"}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-3" align="start">
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {batchYears.map((year) => (
                          <div key={year} className="flex items-center space-x-2">
                            <Checkbox
                              id={`batch-dropdown-${year}`}
                              checked={selectedBatchYears.includes(year.toString())}
                              onCheckedChange={() => toggleBatchYear(year.toString())}
                            />
                            <label
                              htmlFor={`batch-dropdown-${year}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                            >
                              {year}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Pinned Filter Dropdown */}
                <div>
                  <h3 className="font-semibold text-sm mb-3 text-foreground">Post Type</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between h-10 bg-transparent">
                        <span className="text-sm">
                          {selectedPinnedFilter.length > 0
                            ? `${selectedPinnedFilter.length} selected`
                            : "Select post type"}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-3" align="start">
                      <div className="space-y-2">
                        {pinnedOptions.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={`pinned-dropdown-${option.value}`}
                              checked={selectedPinnedFilter.includes(option.value)}
                              onCheckedChange={() => togglePinnedFilter(option.value)}
                            />
                            <label
                              htmlFor={`pinned-dropdown-${option.value}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          )}

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {selectedDateRanges.map((range) => (
                <Badge
                  key={`chip-date-${range}`}
                  variant="secondary"
                  className="pl-3 pr-1 py-1 bg-[#F7C744]/20 text-[#B1040E] border border-[#F7C744] gap-1"
                >
                  {dateRangeOptions.find((d) => d.value === range)?.label}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter("date", range)}
                    className="h-4 w-4 p-0 hover:bg-[#E2001D]/20 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {selectedSortBy.map((sort) => (
                <Badge
                  key={`chip-sort-${sort}`}
                  variant="secondary"
                  className="pl-3 pr-1 py-1 bg-[#F7C744]/20 text-[#B1040E] border border-[#F7C744] gap-1"
                >
                  Sort: {sortOptions.find((s) => s.value === sort)?.label}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter("sort", sort)}
                    className="h-4 w-4 p-0 hover:bg-[#E2001D]/20 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {selectedBatchYears.map((year) => (
                <Badge
                  key={`chip-batch-${year}`}
                  variant="secondary"
                  className="pl-3 pr-1 py-1 bg-[#F7C744]/20 text-[#B1040E] border border-[#F7C744] gap-1"
                >
                  Batch: {year}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter("batch", year)}
                    className="h-4 w-4 p-0 hover:bg-[#E2001D]/20 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {selectedPinnedFilter.map((filter) => (
                <Badge
                  key={`chip-pinned-${filter}`}
                  variant="secondary"
                  className="pl-3 pr-1 py-1 bg-[#F7C744]/20 text-[#B1040E] border border-[#F7C744] gap-1"
                >
                  {pinnedOptions.find((p) => p.value === filter)?.label}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter("pinned", filter)}
                    className="h-4 w-4 p-0 hover:bg-[#E2001D]/20 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          {selectedLabel && (
            <div className="flex gap-2">
              <Badge className="bg-[#F7C744] text-black hover:bg-[#F7C744]/90 gap-2 px-3 py-1">
                Label: {selectedLabel}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLabel(null)} />
              </Badge>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {currentPosts.map((post) => (
            <Card
              key={post.id}
              className="hover:shadow-lg hover:scale-[1.01] transition-all duration-200 hover:border-[#F7C744]"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <h2
                        className="text-xl font-bold text-[#E2001D] hover:text-[#B1040E] cursor-pointer hover:underline flex-1"
                        onClick={() => setSelectedPost(post)}
                      >
                        {post.title}
                      </h2>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl pr-8">{selectedPost?.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 mt-4">
                        <div className="flex items-center gap-3 pb-4 border-b">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-gradient-to-br from-[#E2001D] to-[#B1040E] text-white">
                              {selectedPost?.author.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-lg">{selectedPost?.author.name}</p>
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
                        <div className="border-t pt-6">
                          <h3 className="font-semibold text-lg mb-4">
                            Comments ({selectedPost?.comments.length || 0})
                          </h3>
                          <div className="space-y-4 mb-6">
                            {selectedPost?.comments.map((comment: any) => (
                              <CommentThread
                                key={comment.id}
                                comment={comment}
                                onReply={handleReplyToComment}
                                expandedThreads={expandedThreads}
                                onToggleThread={handleToggleThread}
                              />
                            ))}
                            {/* </CHANGE> */}
                          </div>
                          {replyToComment && (
                            <div className="mb-3 p-3 bg-gradient-to-r from-[#F7C744]/20 to-transparent rounded-lg border border-[#F7C744]/30 text-sm flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <Reply className="h-4 w-4 text-[#E2001D]" />
                                Replying to{" "}
                                <strong className="text-[#E2001D]">
                                  {/* Find comment author recursively */}
                                  {(() => {
                                    const findComment = (comments: any[]): string => {
                                      for (const c of comments) {
                                        if (c.id === replyToComment) return c.author
                                        if (c.replies && c.replies.length > 0) {
                                          const found = findComment(c.replies)
                                          if (found) return found
                                        }
                                      }
                                      return ""
                                    }
                                    return findComment(selectedPost?.comments || [])
                                  })()}
                                </strong>
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setReplyToComment(null)}
                                className="h-6 w-6 p-0 hover:bg-[#E2001D]/20"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Input
                              placeholder="Write a comment..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="flex-1"
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey && newComment.trim()) {
                                  e.preventDefault()
                                  handleAddComment()
                                }
                              }}
                            />
                            <Button
                              onClick={handleAddComment}
                              className="bg-[#E2001D] hover:bg-[#B1040E] gap-2"
                              disabled={!newComment.trim()}
                            >
                              <Send className="h-4 w-4" />
                              Post
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {/* </CHANGE> */}
                  {post.isPinned && (
                    <Badge className="bg-[#F7C744] text-black text-xs px-2 py-1 gap-1 flex-shrink-0">
                      <Pin className="h-3 w-3 fill-black" />
                      Pinned
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setPostToPin(post.id)
                      setIsPinDialogOpen(true)
                    }}
                    className="h-8 w-8 p-0 hover:bg-[#F7C744]/20"
                  >
                    <Pin
                      className={`h-4 w-4 ${post.isPinned ? "fill-[#E2001D] text-[#E2001D]" : "text-muted-foreground"}`}
                    />
                  </Button>
                </div>

                <p className="text-muted-foreground mb-3 line-clamp-2">{post.description}</p>

                <div className="flex gap-2 flex-wrap mb-3">
                  {post.labels.map((label) => (
                    <Badge
                      key={label}
                      className="bg-[#F7C744] text-black hover:bg-[#F7C744]/90 cursor-pointer transition-transform hover:scale-105"
                      onClick={() => setSelectedLabel(label)}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-3 pb-3 border-b">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-gradient-to-br from-[#E2001D] to-[#B1040E] text-white text-[10px]">
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium">{post.author.name}</span>
                    <span>•</span>
                    <span>{formatDateTime(post.timestamp)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-4 text-muted-foreground text-sm">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.replies}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikeToggle(post.id)}
                      className={`gap-1 ${likedPosts.has(post.id) ? "text-red-500" : "text-muted-foreground"}`}
                    >
                      <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? "fill-red-500" : ""}`} />
                      {likedPosts.has(post.id) ? "Unlike" : "Like"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReplyClick(post.id)}
                      className={`gap-1 ${replyingToPostId === post.id ? "text-[#E2001D] bg-[#E2001D]/10" : "text-muted-foreground"}`}
                    >
                      <Reply className="h-4 w-4" />
                      Reply
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => setSelectedPost(post)}
                          className="gap-1 bg-gradient-to-r from-[#E2001D] to-[#B1040E] text-white hover:opacity-90 shadow-md"
                        >
                          <MessageCircle className="h-4 w-4" />
                          View Thread
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl pr-8">{selectedPost?.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 mt-4">
                          <div className="flex items-center gap-3 pb-4 border-b">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-gradient-to-br from-[#E2001D] to-[#B1040E] text-white">
                                {selectedPost?.author.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-lg">{selectedPost?.author.name}</p>
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
                          <div className="border-t pt-6">
                            <h3 className="font-semibold text-lg mb-4">
                              Comments ({selectedPost?.comments.length || 0})
                            </h3>
                            <div className="space-y-4 mb-6">
                              {selectedPost?.comments.map((comment: any) => (
                                <CommentThread
                                  key={comment.id}
                                  comment={comment}
                                  onReply={handleReplyToComment}
                                  expandedThreads={expandedThreads}
                                  onToggleThread={handleToggleThread}
                                />
                              ))}
                              {/* </CHANGE> */}
                            </div>
                            {replyToComment && (
                              <div className="mb-3 p-3 bg-gradient-to-r from-[#F7C744]/20 to-transparent rounded-lg border border-[#F7C744]/30 text-sm flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                  <Reply className="h-4 w-4 text-[#E2001D]" />
                                  Replying to{" "}
                                  <strong className="text-[#E2001D]">
                                    {/* Find comment author recursively */}
                                    {(() => {
                                      const findComment = (comments: any[]): string => {
                                        for (const c of comments) {
                                          if (c.id === replyToComment) return c.author
                                          if (c.replies && c.replies.length > 0) {
                                            const found = findComment(c.replies)
                                            if (found) return found
                                          }
                                        }
                                        return ""
                                      }
                                      return findComment(selectedPost?.comments || [])
                                    })()}
                                  </strong>
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setReplyToComment(null)}
                                  className="h-6 w-6 p-0 hover:bg-[#E2001D]/20"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                            <div className="flex gap-2">
                              <Input
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="flex-1"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && !e.shiftKey && newComment.trim()) {
                                    e.preventDefault()
                                    handleAddComment()
                                  }
                                }}
                              />
                              <Button
                                onClick={handleAddComment}
                                className="bg-[#E2001D] hover:bg-[#B1040E] gap-2"
                                disabled={!newComment.trim()}
                              >
                                <Send className="h-4 w-4" />
                                Post
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {replyingToPostId === post.id && (
                  <div className="mt-4 pt-4 border-t animate-in slide-in-from-top-2 duration-200">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-[#E2001D] to-[#B1040E] text-white text-xs">
                          CU
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <Textarea
                          placeholder="Write your reply..."
                          value={inlineReplyText}
                          onChange={(e) => setInlineReplyText(e.target.value)}
                          className="min-h-[80px] resize-none"
                          autoFocus
                        />
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setReplyingToPostId(null)
                              setInlineReplyText("")
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleInlineReply(post.id)}
                            disabled={!inlineReplyText.trim()}
                            className="bg-gradient-to-r from-[#E2001D] to-[#B1040E] text-white hover:opacity-90 gap-2"
                          >
                            <Send className="h-4 w-4" />
                            Post Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, sortedPosts.length)} of {sortedPosts.length} posts
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isPinDialogOpen} onOpenChange={setIsPinDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{posts.find((p) => p.id === postToPin)?.isPinned ? "Unpin Post" : "Pin Post"}</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            {posts.find((p) => p.id === postToPin)?.isPinned
              ? "Are you sure you want to unpin this post?"
              : "Are you sure you want to pin this post? Pinned posts will appear at the top of the community feed."}
          </p>
          <div className="flex gap-3 justify-end mt-4">
            <Button variant="outline" onClick={() => setIsPinDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => postToPin && handlePinPost(postToPin)}
              className="bg-gradient-to-r from-[#E2001D] to-[#B1040E] text-white"
            >
              {posts.find((p) => p.id === postToPin)?.isPinned ? "Unpin" : "Pin"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
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
                id="description"
                placeholder="Enter post description"
                rows={4}
                value={newPost.description}
                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                className="w-full rounded-t-none"
                style={{
                  fontWeight: descriptionFormat.bold ? "bold" : "normal",
                  fontStyle: descriptionFormat.italic ? "italic" : "normal",
                  color: descriptionFormat.color,
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                placeholder="e.g., Abacus, Training, Event"
                value={newPost.label}
                onChange={(e) => setNewPost({ ...newPost, label: e.target.value })}
                className="w-full"
              />
            </div>
            <Button onClick={handleCreatePost} className="w-full bg-[#E2001D] hover:bg-[#B1040E]">
              Submit Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
