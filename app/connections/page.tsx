"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageNav } from "@/components/page-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Check, X, Eye, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for accepted connections (10-15 records)
const mockAcceptedConnections = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    mobile: "+91 98765 43210",
    batch: "2018",
    location: "Mumbai, Maharashtra",
    occupation: "Software Engineer at Tech Corp",
    avatar: "/professional-man.png",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    mobile: "+91 98765 43211",
    batch: "2019",
    location: "Bangalore, Karnataka",
    occupation: "Product Manager at StartupXYZ",
    avatar: "/professional-woman.png",
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit.patel@email.com",
    mobile: "+91 98765 43212",
    batch: "2017",
    location: "Pune, Maharashtra",
    occupation: "Data Scientist at Analytics Inc",
    avatar: "/man-engineer.png",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    mobile: "+91 98765 43213",
    batch: "2020",
    location: "Hyderabad, Telangana",
    occupation: "UX Designer at Design Studio",
    avatar: "/woman-engineer-at-work.png",
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    mobile: "+91 98765 43214",
    batch: "2016",
    location: "Delhi, NCR",
    occupation: "Business Analyst at Consulting Firm",
    avatar: "/man-manager.png",
  },
  {
    id: "6",
    name: "Ananya Iyer",
    email: "ananya.iyer@email.com",
    mobile: "+91 98765 43215",
    batch: "2019",
    location: "Chennai, Tamil Nadu",
    occupation: "Marketing Manager at Brand Co",
    avatar: "/woman-scientist.png",
  },
  {
    id: "7",
    name: "Karthik Menon",
    email: "karthik.menon@email.com",
    mobile: "+91 98765 43216",
    batch: "2018",
    location: "Kochi, Kerala",
    occupation: "Full Stack Developer at WebTech",
    avatar: "/professional-man.png",
  },
  {
    id: "8",
    name: "Divya Nair",
    email: "divya.nair@email.com",
    mobile: "+91 98765 43217",
    batch: "2020",
    location: "Trivandrum, Kerala",
    occupation: "HR Manager at Corporate Ltd",
    avatar: "/professional-woman.png",
  },
  {
    id: "9",
    name: "Arjun Desai",
    email: "arjun.desai@email.com",
    mobile: "+91 98765 43218",
    batch: "2017",
    location: "Ahmedabad, Gujarat",
    occupation: "Financial Analyst at Finance Corp",
    avatar: "/man-engineer.png",
  },
  {
    id: "10",
    name: "Meera Joshi",
    email: "meera.joshi@email.com",
    mobile: "+91 98765 43219",
    batch: "2019",
    location: "Nagpur, Maharashtra",
    occupation: "Content Writer at Media House",
    avatar: "/woman-engineer-at-work.png",
  },
  {
    id: "11",
    name: "Rohan Verma",
    email: "rohan.verma@email.com",
    mobile: "+91 98765 43220",
    batch: "2018",
    location: "Jaipur, Rajasthan",
    occupation: "DevOps Engineer at Cloud Systems",
    avatar: "/professional-man.png",
  },
  {
    id: "12",
    name: "Kavya Pillai",
    email: "kavya.pillai@email.com",
    batch: "2020",
    location: "Coimbatore, Tamil Nadu",
    occupation: "Graphic Designer at Creative Agency",
    avatar: "/woman-scientist.png",
  },
]

// Mock data for pending requests (10-15 records)
const mockPendingRequests = [
  {
    id: "13",
    name: "Sanjay Gupta",
    email: "sanjay.gupta@email.com",
    mobile: "+91 98765 43221",
    batch: "2019",
    location: "Lucknow, Uttar Pradesh",
    occupation: "Sales Manager at Retail Corp",
    avatar: "/man-manager.png",
  },
  {
    id: "14",
    name: "Neha Kapoor",
    email: "neha.kapoor@email.com",
    mobile: "+91 98765 43222",
    batch: "2018",
    location: "Chandigarh, Punjab",
    occupation: "Teacher at International School",
    avatar: "/professional-woman.png",
  },
  {
    id: "15",
    name: "Aditya Rao",
    email: "aditya.rao@email.com",
    mobile: "+91 98765 43223",
    batch: "2017",
    location: "Mangalore, Karnataka",
    occupation: "Mechanical Engineer at Auto Industries",
    avatar: "/man-tech.png",
  },
  {
    id: "16",
    name: "Pooja Malhotra",
    email: "pooja.malhotra@email.com",
    mobile: "+91 98765 43224",
    batch: "2020",
    location: "Indore, Madhya Pradesh",
    occupation: "Pharmacist at Healthcare Center",
    avatar: "/woman-engineer-at-work.png",
  },
  {
    id: "17",
    name: "Rahul Saxena",
    email: "rahul.saxena@email.com",
    mobile: "+91 98765 43225",
    batch: "2016",
    location: "Bhopal, Madhya Pradesh",
    occupation: "Civil Engineer at Construction Ltd",
    avatar: "/man-engineer.png",
  },
  {
    id: "18",
    name: "Ishita Bhatt",
    email: "ishita.bhatt@email.com",
    mobile: "+91 98765 43226",
    batch: "2019",
    location: "Surat, Gujarat",
    occupation: "Fashion Designer at Boutique",
    avatar: "/woman-scientist.png",
  },
  {
    id: "19",
    name: "Nikhil Agarwal",
    email: "nikhil.agarwal@email.com",
    mobile: "+91 98765 43227",
    batch: "2018",
    location: "Kolkata, West Bengal",
    occupation: "Chartered Accountant at Audit Firm",
    avatar: "/professional-man.png",
  },
  {
    id: "20",
    name: "Riya Sen",
    email: "riya.sen@email.com",
    mobile: "+91 98765 43228",
    batch: "2020",
    location: "Guwahati, Assam",
    occupation: "Journalist at News Channel",
    avatar: "/professional-woman.png",
  },
  {
    id: "21",
    name: "Varun Khanna",
    email: "varun.khanna@email.com",
    mobile: "+91 98765 43229",
    batch: "2017",
    location: "Ludhiana, Punjab",
    occupation: "Entrepreneur - Startup Founder",
    avatar: "/man-manager.png",
  },
  {
    id: "22",
    name: "Simran Kaur",
    email: "simran.kaur@email.com",
    mobile: "+91 98765 43230",
    batch: "2019",
    location: "Amritsar, Punjab",
    occupation: "Architect at Design Consultancy",
    avatar: "/woman-engineer-at-work.png",
  },
]

const ITEMS_PER_PAGE = 10

type SortColumn = "name" | "email" | "batch" | "location"
type SortDirection = "asc" | "desc"

export default function ConnectionsPage() {
  const { toast } = useToast()
  const [acceptedConnections, setAcceptedConnections] = useState(mockAcceptedConnections)
  const [pendingRequests, setPendingRequests] = useState(mockPendingRequests)
  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("accepted")
  const [showRibbon, setShowRibbon] = useState(true)
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; type: "accept" | "reject" | null; request: any }>(
    {
      open: false,
      type: null,
      request: null,
    },
  )

  const [acceptedPage, setAcceptedPage] = useState(1)
  const [pendingPage, setPendingPage] = useState(1)

  const [acceptedSortColumn, setAcceptedSortColumn] = useState<SortColumn | null>(null)
  const [acceptedSortDirection, setAcceptedSortDirection] = useState<SortDirection>("asc")

  const [pendingSortColumn, setPendingSortColumn] = useState<SortColumn | null>(null)
  const [pendingSortDirection, setPendingSortDirection] = useState<SortDirection>("asc")

  const [searchQuery, setSearchQuery] = useState("")

  const handleAcceptedSort = (column: SortColumn) => {
    if (acceptedSortColumn === column) {
      setAcceptedSortDirection(acceptedSortDirection === "asc" ? "desc" : "asc")
    } else {
      setAcceptedSortColumn(column)
      setAcceptedSortDirection("asc")
    }
  }

  const handlePendingSort = (column: SortColumn) => {
    if (pendingSortColumn === column) {
      setPendingSortDirection(pendingSortDirection === "asc" ? "desc" : "asc")
    } else {
      setPendingSortColumn(column)
      setPendingSortDirection("asc")
    }
  }

  const renderAcceptedSortIcon = (column: SortColumn) => {
    if (acceptedSortColumn !== column) {
      return <ArrowUpDown className="h-4 w-4 ml-1 inline" />
    }
    return acceptedSortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1 inline" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1 inline" />
    )
  }

  const renderPendingSortIcon = (column: SortColumn) => {
    if (pendingSortColumn !== column) {
      return <ArrowUpDown className="h-4 w-4 ml-1 inline" />
    }
    return pendingSortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1 inline" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1 inline" />
    )
  }

  const filterBySearch = (items: any[]) => {
    if (!searchQuery.trim()) return items

    const query = searchQuery.toLowerCase()
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.batch.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        (item.mobile && item.mobile.toLowerCase().includes(query)),
    )
  }

  const filteredAcceptedConnections = filterBySearch(acceptedConnections)
  const filteredPendingRequests = filterBySearch(pendingRequests)

  const sortedAcceptedConnections = [...filteredAcceptedConnections].sort((a, b) => {
    if (!acceptedSortColumn) return 0

    let aValue = ""
    let bValue = ""

    switch (acceptedSortColumn) {
      case "name":
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
        break
      case "email":
        aValue = a.email.toLowerCase()
        bValue = b.email.toLowerCase()
        break
      case "batch":
        aValue = a.batch
        bValue = b.batch
        break
      case "location":
        aValue = a.location.toLowerCase()
        bValue = b.location.toLowerCase()
        break
    }

    if (acceptedSortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const sortedPendingRequests = [...filteredPendingRequests].sort((a, b) => {
    if (!pendingSortColumn) return 0

    let aValue = ""
    let bValue = ""

    switch (pendingSortColumn) {
      case "name":
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
        break
      case "email":
        aValue = a.email.toLowerCase()
        bValue = b.email.toLowerCase()
        break
      case "batch":
        aValue = a.batch
        bValue = b.batch
        break
      case "location":
        aValue = a.location.toLowerCase()
        bValue = b.location.toLowerCase()
        break
    }

    if (pendingSortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const paginatedAccepted = sortedAcceptedConnections.slice(
    (acceptedPage - 1) * ITEMS_PER_PAGE,
    acceptedPage * ITEMS_PER_PAGE,
  )

  const paginatedPending = sortedPendingRequests.slice((pendingPage - 1) * ITEMS_PER_PAGE, pendingPage * ITEMS_PER_PAGE)

  const acceptedTotalPages = Math.ceil(sortedAcceptedConnections.length / ITEMS_PER_PAGE)
  const pendingTotalPages = Math.ceil(sortedPendingRequests.length / ITEMS_PER_PAGE)

  const handleAcceptRequest = (request: any) => {
    setConfirmDialog({ open: true, type: "accept", request })
  }

  const handleRejectRequest = (request: any) => {
    setConfirmDialog({ open: true, type: "reject", request })
  }

  const confirmAction = () => {
    if (!confirmDialog.request) return

    if (confirmDialog.type === "accept") {
      const newConnection = {
        ...confirmDialog.request,
        mobile: "+91 98765 43222",
      }
      setAcceptedConnections([...acceptedConnections, newConnection])
      setPendingRequests(pendingRequests.filter((r) => r.id !== confirmDialog.request.id))

      toast({
        title: "Request Accepted",
        description: `You are now connected with ${confirmDialog.request.name}`,
      })
    } else if (confirmDialog.type === "reject") {
      setPendingRequests(pendingRequests.filter((r) => r.id !== confirmDialog.request.id))

      toast({
        title: "Request Rejected",
        description: `Connection request from ${confirmDialog.request.name} has been rejected`,
        variant: "destructive",
      })
    }

    setConfirmDialog({ open: false, type: null, request: null })
  }

  const handleViewProfile = (connection: any) => {
    setSelectedProfile(connection)
    setIsProfileOpen(true)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <DashboardLayout>
      <PageNav />

      <div className="p-6 bg-white min-h-screen">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Connections</h1>
          <p className="text-muted-foreground">Manage your alumni network and connection requests</p>
        </div>

        <div className="flex justify-end mb-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search connections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full border-gray-300 focus:border-[#E2001D] focus:ring-[#E2001D]"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 h-12">
            <TabsTrigger
              value="accepted"
              className="text-sm font-medium transition-all duration-300 ease-in-out data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E2001D] data-[state=active]:to-[#B1040E] data-[state=active]:text-white"
            >
              Connections ({filteredAcceptedConnections.length})
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="text-sm font-medium transition-all duration-300 ease-in-out data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E2001D] data-[state=active]:to-[#B1040E] data-[state=active]:text-white"
            >
              Requests ({filteredPendingRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accepted" className="space-y-4 animate-in fade-in-50 duration-300">
            <div className="rounded-lg border bg-white overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-[#E2001D] via-[#F7C744] to-[#B1040E] hover:bg-gradient-to-r hover:from-[#E2001D] hover:via-[#F7C744] hover:to-[#B1040E]">
                    <TableHead
                      className="text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handleAcceptedSort("name")}
                    >
                      Alumni {renderAcceptedSortIcon("name")}
                    </TableHead>
                    <TableHead
                      className="text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handleAcceptedSort("email")}
                    >
                      Email {renderAcceptedSortIcon("email")}
                    </TableHead>
                    <TableHead
                      className="text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handleAcceptedSort("batch")}
                    >
                      Batch {renderAcceptedSortIcon("batch")}
                    </TableHead>
                    <TableHead
                      className="text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handleAcceptedSort("location")}
                    >
                      Location {renderAcceptedSortIcon("location")}
                    </TableHead>
                    <TableHead className="text-white font-semibold text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAccepted.length > 0 ? (
                    paginatedAccepted.map((connection) => (
                      <TableRow key={connection.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                              <AvatarFallback className="bg-gradient-to-br from-[#E2001D] to-[#B1040E] text-white">
                                {getInitials(connection.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">{connection.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{connection.email}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-[#F7C744]/20 text-[#B1040E] border-[#F7C744]">
                            {connection.batch}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{connection.location}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            onClick={() => handleViewProfile(connection)}
                            className="bg-gradient-to-r from-[#E2001D] to-[#B1040E] hover:from-[#B1040E] hover:to-[#E2001D] text-white"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Profile
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                        No accepted connections yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {sortedAcceptedConnections.length > 0 && (
              <div className="flex items-center justify-between px-2">
                <p className="text-sm text-muted-foreground">
                  Showing {(acceptedPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                  {Math.min(acceptedPage * ITEMS_PER_PAGE, sortedAcceptedConnections.length)} of{" "}
                  {sortedAcceptedConnections.length} connections
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAcceptedPage(acceptedPage - 1)}
                    disabled={acceptedPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {acceptedPage} of {acceptedTotalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAcceptedPage(acceptedPage + 1)}
                    disabled={acceptedPage === acceptedTotalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4 animate-in fade-in-50 duration-300">
            {showRibbon && (
              <Alert className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300 mb-4">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="flex items-center justify-between">
                  <span className="text-sm text-blue-900">
                    <strong>Note:</strong> By approving a request, your contact information will also be shared with the
                    person who sent the request.
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowRibbon(false)}
                    className="h-6 w-6 p-0 hover:bg-blue-200"
                  >
                    <XCircle className="h-4 w-4 text-blue-600" />
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            <div className="rounded-lg border bg-white overflow-hidden">
              <Table>
                <TableHeader className="sticky top-0 z-10">
                  <TableRow className="bg-gradient-to-r from-[#E2001D] via-[#F7C744] to-[#B1040E] hover:bg-gradient-to-r hover:from-[#E2001D] hover:via-[#F7C744] hover:to-[#B1040E]">
                    <TableHead
                      className="text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handlePendingSort("name")}
                    >
                      Alumni {renderPendingSortIcon("name")}
                    </TableHead>
                    <TableHead
                      className="text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handlePendingSort("email")}
                    >
                      Email {renderPendingSortIcon("email")}
                    </TableHead>
                    <TableHead
                      className="text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handlePendingSort("batch")}
                    >
                      Batch {renderPendingSortIcon("batch")}
                    </TableHead>
                    <TableHead
                      className="text-white font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handlePendingSort("location")}
                    >
                      Location {renderPendingSortIcon("location")}
                    </TableHead>
                    <TableHead className="text-white font-semibold text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPending.length > 0 ? (
                    paginatedPending.map((request) => (
                      <TableRow key={request.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-gray-200">
                                <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">{request.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{request.email}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-[#F7C744]/20 text-[#B1040E] border-[#F7C744]">
                            {request.batch}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{request.location}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleAcceptRequest(request)}
                              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRejectRequest(request)}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                        No pending requests
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {sortedPendingRequests.length > 0 && (
              <div className="flex items-center justify-between px-2">
                <p className="text-sm text-muted-foreground">
                  Showing {(pendingPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                  {Math.min(pendingPage * ITEMS_PER_PAGE, sortedPendingRequests.length)} of{" "}
                  {sortedPendingRequests.length} requests
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPendingPage(pendingPage - 1)}
                    disabled={pendingPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {pendingPage} of {pendingTotalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPendingPage(pendingPage + 1)}
                    disabled={pendingPage === pendingTotalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#E2001D] to-[#B1040E] bg-clip-text text-transparent">
                Alumni Profile
              </DialogTitle>
            </DialogHeader>
            {selectedProfile && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedProfile.avatar || "/placeholder.svg"} alt={selectedProfile.name} />
                    <AvatarFallback className="bg-gradient-to-br from-[#E2001D] to-[#B1040E] text-white text-2xl">
                      {getInitials(selectedProfile.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{selectedProfile.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedProfile.occupation}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="text-base text-foreground">{selectedProfile.name}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Year of Completion</label>
                    <p className="text-base text-foreground">{selectedProfile.batch}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">City & State</label>
                    <p className="text-base text-foreground">{selectedProfile.location}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <p className="text-base text-foreground">{selectedProfile.email}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Contact Number</label>
                    <p className="text-base text-foreground">{selectedProfile.mobile}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      Current Occupation/Field of Study
                    </label>
                    <p className="text-base text-foreground">{selectedProfile.occupation}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog
          open={confirmDialog.open}
          onOpenChange={(open) => !open && setConfirmDialog({ open: false, type: null, request: null })}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {confirmDialog.type === "accept" ? "Accept Connection Request" : "Reject Connection Request"}
              </DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground py-4">
              {confirmDialog.type === "accept"
                ? `Are you sure you want to accept the connection request from ${confirmDialog.request?.name}? Your contact information will be shared with them.`
                : `Are you sure you want to reject the connection request from ${confirmDialog.request?.name}?`}
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setConfirmDialog({ open: false, type: null, request: null })}>
                Cancel
              </Button>
              <Button
                onClick={confirmAction}
                className={
                  confirmDialog.type === "accept"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white"
                    : "bg-gradient-to-r from-red-600 to-red-700 text-white"
                }
              >
                {confirmDialog.type === "accept" ? "Accept" : "Reject"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
