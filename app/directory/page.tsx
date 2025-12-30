"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageNav } from "@/components/page-nav"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Filter,
  ChevronDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  RefreshCw,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockAlumni = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    batch: "2019",
    department: "Computer Science",
    currentCompany: "Tech Solutions Inc.",
    designation: "Senior Software Engineer",
    location: "Bangalore, India",
    avatar: "/professional-man.png",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    batch: "2020",
    department: "Electronics",
    currentCompany: "Innovation Labs",
    designation: "Hardware Engineer",
    location: "Mumbai, India",
    avatar: "/professional-woman.png",
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit.patel@email.com",
    batch: "2018",
    department: "Mechanical",
    currentCompany: "AutoTech Corp",
    designation: "Design Engineer",
    location: "Pune, India",
    avatar: "/man-engineer.png",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    batch: "2021",
    department: "Computer Science",
    currentCompany: "Cloud Systems",
    designation: "DevOps Engineer",
    location: "Hyderabad, India",
    avatar: "/woman-engineer-at-work.png",
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    batch: "2019",
    department: "Civil",
    currentCompany: "BuildRight Ltd",
    designation: "Project Manager",
    location: "Delhi, India",
    avatar: "/man-manager.png",
  },
  {
    id: "6",
    name: "Ananya Iyer",
    email: "ananya.iyer@email.com",
    batch: "2022",
    department: "Computer Science",
    currentCompany: "DataFlow Inc",
    designation: "Data Scientist",
    location: "Bangalore, India",
    avatar: "/woman-scientist.png",
  },
  {
    id: "7",
    name: "Karthik Menon",
    email: "karthik.menon@email.com",
    batch: "2020",
    department: "Electronics",
    currentCompany: "Semiconductor Corp",
    designation: "VLSI Engineer",
    location: "Chennai, India",
    avatar: "/man-tech.png",
  },
  {
    id: "8",
    name: "Divya Nair",
    email: "divya.nair@email.com",
    batch: "2021",
    department: "Computer Science",
    currentCompany: "AI Innovations",
    designation: "ML Engineer",
    location: "Bangalore, India",
    avatar: "/woman-tech.png",
  },
  {
    id: "9",
    name: "Arjun Desai",
    email: "arjun.desai@email.com",
    batch: "2019",
    department: "Mechanical",
    currentCompany: "Aerospace Ltd",
    designation: "Aerospace Engineer",
    location: "Mumbai, India",
    avatar: "/man-aerospace.jpg",
  },
  {
    id: "10",
    name: "Meera Krishnan",
    email: "meera.krishnan@email.com",
    batch: "2022",
    department: "Civil",
    currentCompany: "Urban Planners",
    designation: "Structural Engineer",
    location: "Kochi, India",
    avatar: "/woman-architect.png",
  },
  {
    id: "11",
    name: "Rohan Gupta",
    email: "rohan.gupta@email.com",
    batch: "2020",
    department: "Electrical",
    currentCompany: "Power Systems Inc",
    designation: "Electrical Engineer",
    location: "Delhi, India",
    avatar: "/man-electrical.jpg",
  },
  {
    id: "12",
    name: "Kavya Rao",
    email: "kavya.rao@email.com",
    batch: "2021",
    department: "Computer Science",
    currentCompany: "Cybersecurity Pro",
    designation: "Security Analyst",
    location: "Hyderabad, India",
    avatar: "/woman-security.jpg",
  },
  {
    id: "13",
    name: "Siddharth Joshi",
    email: "siddharth.joshi@email.com",
    batch: "2019",
    department: "Electronics",
    currentCompany: "IoT Solutions",
    designation: "IoT Developer",
    location: "Pune, India",
    avatar: "/man-developer.png",
  },
  {
    id: "14",
    name: "Aishwarya Pillai",
    email: "aishwarya.pillai@email.com",
    batch: "2022",
    department: "Computer Science",
    currentCompany: "FinTech Corp",
    designation: "Backend Developer",
    location: "Bangalore, India",
    avatar: "/woman-developer.png",
  },
  {
    id: "15",
    name: "Nikhil Verma",
    email: "nikhil.verma@email.com",
    batch: "2020",
    department: "Mechanical",
    currentCompany: "Robotics Inc",
    designation: "Robotics Engineer",
    location: "Mumbai, India",
    avatar: "/man-robotics.jpg",
  },
]

type ContactStatus = "none" | "shared" | "accepted" | "rejected"
type SortColumn = "name" | "batch" | "location"
type SortDirection = "asc" | "desc"

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBatches, setSelectedBatches] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedActions, setSelectedActions] = useState<string[]>([])
  const [contactStatus, setContactStatus] = useState<Record<string, ContactStatus>>({
    "1": "none", // Rajesh Kumar - Share Contact
    "2": "shared", // Priya Sharma - Contact Shared
    "3": "accepted", // Amit Patel - Contact Accepted
    "4": "rejected", // Sneha Reddy - Contact Rejected
    "5": "none", // Vikram Singh - Share Contact
    "6": "shared", // Ananya Iyer - Contact Shared
    "7": "accepted", // Karthik Menon - Contact Accepted
    "8": "rejected", // Divya Nair - Contact Rejected
    "9": "none", // Arjun Desai - Share Contact
    "10": "shared", // Meera Krishnan - Contact Shared
    "11": "accepted", // Rohan Gupta - Contact Accepted
    "12": "rejected", // Kavya Rao - Contact Rejected
    "13": "none", // Siddharth Joshi - Share Contact
    "14": "shared", // Aishwarya Pillai - Contact Shared
    "15": "accepted", // Nikhil Verma - Contact Accepted
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [showBanner, setShowBanner] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const itemsPerPage = 15
  const { toast } = useToast()

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const renderSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="h-4 w-4 ml-1 inline" />
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1 inline" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1 inline" />
    )
  }

  const filteredAlumni = mockAlumni.filter((alumni) => {
    const matchesSearch =
      searchQuery === "" ||
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.currentCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.designation.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesBatch = selectedBatches.length === 0 || selectedBatches.includes(alumni.batch)
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(alumni.location)

    const status = contactStatus[alumni.id] || "none"
    const matchesAction = selectedActions.length === 0 || selectedActions.includes(status)

    return matchesSearch && matchesBatch && matchesLocation && matchesAction
  })

  const sortedAlumni = [...filteredAlumni].sort((a, b) => {
    if (!sortColumn) return 0

    let aValue = ""
    let bValue = ""

    switch (sortColumn) {
      case "name":
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
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

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const toggleBatch = (batch: string) => {
    setSelectedBatches((prev) => (prev.includes(batch) ? prev.filter((b) => b !== batch) : [...prev, batch]))
  }

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) => (prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]))
  }

  const toggleAction = (action: string) => {
    setSelectedActions((prev) => (prev.includes(action) ? prev.filter((a) => a !== action) : [...prev, action]))
  }

  const removeFilter = (type: "batch" | "location" | "action", value: string) => {
    if (type === "batch") {
      setSelectedBatches((prev) => prev.filter((b) => b !== value))
    } else if (type === "location") {
      setSelectedLocations((prev) => prev.filter((l) => l !== value))
    } else {
      setSelectedActions((prev) => prev.filter((a) => a !== value))
    }
  }

  const clearAllFilters = () => {
    setSelectedBatches([])
    setSelectedLocations([])
    setSelectedActions([])
  }

  const hasActiveFilters = selectedBatches.length > 0 || selectedLocations.length > 0 || selectedActions.length > 0

  const batches = ["2018", "2019", "2020", "2021", "2022"]
  const locations = [
    "Bangalore, India",
    "Mumbai, India",
    "Pune, India",
    "Hyderabad, India",
    "Delhi, India",
    "Chennai, India",
    "Kochi, India",
  ]
  const actions = [
    { value: "none", label: "Not Shared" },
    { value: "shared", label: "Shared" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
  ]

  const totalPages = Math.ceil(sortedAlumni.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedAlumni = sortedAlumni.slice(startIndex, endIndex)

  const handleShareContact = (alumniId: string, alumniName: string) => {
    setContactStatus((prev) => ({ ...prev, [alumniId]: "shared" }))
    toast({
      title: "Contact Shared Successfully",
      description: `Your contact has been shared with ${alumniName}`,
    })

    setTimeout(() => {
      setContactStatus((prev) => ({ ...prev, [alumniId]: "accepted" }))
    }, 3000)
  }

  const handleReshareContact = (alumniId: string, alumniName: string) => {
    setContactStatus((prev) => ({ ...prev, [alumniId]: "shared" }))
    toast({
      title: "Contact Reshared Successfully",
      description: `Your contact has been reshared with ${alumniName}`,
    })

    setTimeout(() => {
      setContactStatus((prev) => ({ ...prev, [alumniId]: "accepted" }))
    }, 3000)
  }

  const renderContactButton = (alumniId: string, alumniName: string) => {
    const status = contactStatus[alumniId] || "none"

    if (status === "none") {
      return (
        <Button
          onClick={() => handleShareContact(alumniId, alumniName)}
          size="sm"
          className="bg-primary hover:bg-primary/90"
        >
          Share Contact
        </Button>
      )
    } else if (status === "shared") {
      return (
        <Badge variant="secondary" className="bg-muted text-muted-foreground">
          Contact Shared
        </Badge>
      )
    } else if (status === "accepted") {
      return <Badge className="bg-accent text-accent-foreground">Contact Accepted</Badge>
    } else if (status === "rejected") {
      return (
        <div className="flex items-center gap-2 justify-end">
          <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-200">
            Contact Rejected
          </Badge>
          <Button
            onClick={() => handleReshareContact(alumniId, alumniName)}
            size="sm"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white gap-1"
          >
            <RefreshCw className="h-3 w-3" />
            Reshare
          </Button>
        </div>
      )
    }
  }

  return (
    <DashboardLayout>
      <PageNav />

      <div className="p-6 lg:p-8 bg-white min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Alumni Directory</h1>
          <p className="text-muted-foreground">Connect with {mockAlumni.length} alumni from SIP Academy</p>
        </div>

        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search alumni..."
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
                    {selectedBatches.length + selectedLocations.length + selectedActions.length}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-sm mb-3 text-foreground">Batch Year</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between h-10 bg-transparent">
                        <span className="text-sm">
                          {selectedBatches.length > 0 ? `${selectedBatches.length} selected` : "Select batch years"}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-3" align="start">
                      <div className="space-y-2">
                        {batches.map((batch) => (
                          <div key={batch} className="flex items-center space-x-2">
                            <Checkbox
                              id={`batch-dropdown-${batch}`}
                              checked={selectedBatches.includes(batch)}
                              onCheckedChange={() => toggleBatch(batch)}
                            />
                            <label
                              htmlFor={`batch-dropdown-${batch}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                            >
                              {batch}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-3 text-foreground">Location</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between h-10 bg-transparent">
                        <span className="text-sm">
                          {selectedLocations.length > 0 ? `${selectedLocations.length} selected` : "Select locations"}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-3" align="start">
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {locations.map((location) => (
                          <div key={location} className="flex items-center space-x-2">
                            <Checkbox
                              id={`location-dropdown-${location}`}
                              checked={selectedLocations.includes(location)}
                              onCheckedChange={() => toggleLocation(location)}
                            />
                            <label
                              htmlFor={`location-dropdown-${location}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                            >
                              {location.split(",")[0]}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-3 text-foreground">Status</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between h-10 bg-transparent">
                        <span className="text-sm">
                          {selectedActions.length > 0 ? `${selectedActions.length} selected` : "Select status"}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-3" align="start">
                      <div className="space-y-2">
                        {actions.map((action) => (
                          <div key={action.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={`action-dropdown-${action.value}`}
                              checked={selectedActions.includes(action.value)}
                              onCheckedChange={() => toggleAction(action.value)}
                            />
                            <label
                              htmlFor={`action-dropdown-${action.value}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                            >
                              {action.label}
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
              {selectedBatches.map((batch) => (
                <Badge
                  key={`chip-batch-${batch}`}
                  variant="secondary"
                  className="pl-3 pr-1 py-1 bg-[#F7C744]/20 text-[#B1040E] border border-[#F7C744] gap-1"
                >
                  Batch: {batch}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter("batch", batch)}
                    className="h-4 w-4 p-0 hover:bg-[#E2001D]/20 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {selectedLocations.map((location) => (
                <Badge
                  key={`chip-location-${location}`}
                  variant="secondary"
                  className="pl-3 pr-1 py-1 bg-[#F7C744]/20 text-[#B1040E] border border-[#F7C744] gap-1"
                >
                  {location.split(",")[0]}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter("location", location)}
                    className="h-4 w-4 p-0 hover:bg-[#E2001D]/20 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {selectedActions.map((action) => (
                <Badge
                  key={`chip-action-${action}`}
                  variant="secondary"
                  className="pl-3 pr-1 py-1 bg-[#F7C744]/20 text-[#B1040E] border border-[#F7C744] gap-1"
                >
                  {actions.find((a) => a.value === action)?.label}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter("action", action)}
                    className="h-4 w-4 p-0 hover:bg-[#E2001D]/20 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {showBanner && (
          <Alert className="mb-4 bg-gradient-to-r from-[#E2001D]/10 via-[#F7C744]/10 to-[#B1040E]/10 border-[#E2001D]/30 py-2">
            <AlertDescription className="flex items-center justify-between">
              <p className="text-sm text-foreground">
                You can share your contact with alumni. Once they accept, you can view their profile and contact info in
                the Connections menu.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBanner(false)}
                className="h-6 w-6 p-0 hover:bg-[#E2001D]/20 ml-4 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {paginatedAlumni.length > 0 ? (
          <>
            <div className="border border-border rounded-lg overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-[#E2001D] via-[#B1040E] to-[#F7C744] hover:from-[#E2001D] hover:via-[#B1040E] hover:to-[#F7C744]">
                    <TableHead
                      className="text-white font-semibold text-base cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handleSort("name")}
                    >
                      Alumni {renderSortIcon("name")}
                    </TableHead>
                    <TableHead
                      className="text-white font-semibold text-base cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handleSort("batch")}
                    >
                      Batch {renderSortIcon("batch")}
                    </TableHead>
                    <TableHead
                      className="text-white font-semibold text-base cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handleSort("location")}
                    >
                      Location {renderSortIcon("location")}
                    </TableHead>
                    <TableHead className="text-white font-semibold text-base text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAlumni.map((alumni) => {
                    const status = contactStatus[alumni.id] || "none"
                    const showProfile = status === "accepted"

                    return (
                      <TableRow key={alumni.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              {showProfile ? (
                                <>
                                  <AvatarImage src={alumni.avatar || "/placeholder.svg"} alt={alumni.name} />
                                  <AvatarFallback>
                                    {alumni.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </>
                              ) : (
                                <AvatarFallback className="bg-gray-200">
                                  <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                  </svg>
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{alumni.name}</p>
                              <p className="text-sm text-muted-foreground">{alumni.designation}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-[#F7C744]/20 text-[#B1040E] border-[#F7C744]">
                            {alumni.batch}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{alumni.location}</TableCell>
                        <TableCell className="text-right">{renderContactButton(alumni.id, alumni.name)}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, sortedAlumni.length)} of {sortedAlumni.length} alumni
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="h-9"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 w-9 ${currentPage === page ? "bg-primary" : ""}`}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="h-9"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-border">
            <p className="text-muted-foreground text-lg">No alumni found matching your criteria</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
