"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface DirectoryFiltersProps {
  selectedBatch: string
  selectedDepartment: string
  selectedLocation: string
  onBatchChange: (value: string) => void
  onDepartmentChange: (value: string) => void
  onLocationChange: (value: string) => void
}

export function DirectoryFilters({
  selectedBatch,
  selectedDepartment,
  selectedLocation,
  onBatchChange,
  onDepartmentChange,
  onLocationChange,
}: DirectoryFiltersProps) {
  return (
    <div className="mb-8 p-4 bg-card border border-border rounded-lg">
      <h3 className="text-sm font-semibold text-foreground mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="batch">Batch</Label>
          <Select value={selectedBatch} onValueChange={onBatchChange}>
            <SelectTrigger id="batch">
              <SelectValue placeholder="All Batches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>
              <SelectItem value="2014-2018">2014-2018</SelectItem>
              <SelectItem value="2015-2019">2015-2019</SelectItem>
              <SelectItem value="2016-2020">2016-2020</SelectItem>
              <SelectItem value="2017-2021">2017-2021</SelectItem>
              <SelectItem value="2018-2022">2018-2022</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
            <SelectTrigger id="department">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Mechanical">Mechanical</SelectItem>
              <SelectItem value="Civil">Civil</SelectItem>
              <SelectItem value="Electrical">Electrical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select value={selectedLocation} onValueChange={onLocationChange}>
            <SelectTrigger id="location">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Bangalore, India">Bangalore</SelectItem>
              <SelectItem value="Mumbai, India">Mumbai</SelectItem>
              <SelectItem value="Pune, India">Pune</SelectItem>
              <SelectItem value="Hyderabad, India">Hyderabad</SelectItem>
              <SelectItem value="Delhi, India">Delhi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
