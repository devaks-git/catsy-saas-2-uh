"use client"

import { useState, useCallback } from "react"
import { ClientLayout } from "@/components/layouts/client-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Upload, Play, Download, AlertCircle, Loader2, FileText } from "lucide-react"
import { useDropzone } from "react-dropzone"

// Mock data for workflows
const mockWorkflows = [
  {
    id: 1,
    name: "TechBrand Electronics",
    brand: "TechBrand",
    category: "Electronics",
    createdAt: "2025-01-20",
    marketplaces: ["Amazon.in", "Flipkart", "Myntra"],
  },
  {
    id: 2,
    name: "TechBrand Mobile Accessories",
    brand: "TechBrand",
    category: "Electronics",
    createdAt: "2025-01-18",
    marketplaces: ["Amazon.in", "Flipkart"],
  },
  {
    id: 3,
    name: "FashionCorp Apparel",
    brand: "FashionCorp",
    category: "Fashion",
    createdAt: "2025-01-15",
    marketplaces: ["Myntra", "Ajio", "Nykaa"],
  },
  {
    id: 4,
    name: "HomeBrand Kitchen",
    brand: "HomeBrand",
    category: "Home & Kitchen",
    createdAt: "2025-01-12",
    marketplaces: ["Amazon.in", "Flipkart", "Pepperfry"],
  },
  {
    id: 5,
    name: "SportsCorp Fitness",
    brand: "SportsCorp",
    category: "Sports",
    createdAt: "2025-01-10",
    marketplaces: ["Amazon.in", "Decathlon", "Flipkart"],
  },
  {
    id: 6,
    name: "BeautyCorp Cosmetics",
    brand: "BeautyCorp",
    category: "Beauty",
    createdAt: "2025-01-08",
    marketplaces: ["Nykaa", "Amazon.in", "Myntra"],
  },
]

// Mock data for existing queue items
const initialQueueItems = [
  {
    id: 1,
    workflowName: "TechBrand Electronics",
    marketplaces: ["Amazon.in", "Flipkart"],
    fileName: "electronics_jan2025.csv",
    uploadTime: "Jan 2, 2025, 2:30 PM",
    status: "completed",
  },
  {
    id: 2,
    workflowName: "FashionCorp Apparel",
    marketplaces: ["Myntra", "Ajio"],
    fileName: "fashion_winter_collection.xlsx",
    uploadTime: "Jan 2, 2025, 1:15 PM",
    status: "failed",
  },
]

type QueueItem = {
  id: number
  workflowName: string
  marketplaces: string[]
  fileName: string
  uploadTime: string
  status: "ready" | "running" | "completed" | "failed"
}

export default function CreateListingsPage() {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedDateRange, setSelectedDateRange] = useState("")

  // Form states
  const [selectedWorkflow, setSelectedWorkflow] = useState("")
  const [selectedMarketplaces, setSelectedMarketplaces] = useState<string[]>([])
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  // Queue state
  const [queueItems, setQueueItems] = useState<QueueItem[]>(initialQueueItems)

  // Filter workflows based on current filters
  const filteredWorkflows = mockWorkflows.filter((workflow) => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBrand = !selectedBrand || workflow.brand === selectedBrand
    const matchesCategory = !selectedCategory || workflow.category === selectedCategory
    const matchesDate = !selectedDateRange || checkDateRange(workflow.createdAt, selectedDateRange)
    return matchesSearch && matchesBrand && matchesCategory && matchesDate
  })

  // Get unique brands and categories for dropdowns
  const brands = Array.from(new Set(mockWorkflows.map((w) => w.brand)))
  const categories = Array.from(new Set(mockWorkflows.map((w) => w.category)))

  // Get selected workflow data
  const selectedWorkflowData = mockWorkflows.find((w) => w.id.toString() === selectedWorkflow)

  // Check if form is complete
  const isFormComplete = selectedWorkflow && selectedMarketplaces.length > 0 && uploadedFile

  // File upload handling
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
  })

  // Handle marketplace selection
  const handleMarketplaceChange = (marketplace: string, checked: boolean) => {
    if (checked) {
      setSelectedMarketplaces([...selectedMarketplaces, marketplace])
    } else {
      setSelectedMarketplaces(selectedMarketplaces.filter((m) => m !== marketplace))
    }
  }

  // Handle adding to queue
  const handleAddToQueue = () => {
    if (!isFormComplete || !selectedWorkflowData) return

    const newItem: QueueItem = {
      id: Date.now(),
      workflowName: selectedWorkflowData.name,
      marketplaces: selectedMarketplaces,
      fileName: uploadedFile!.name,
      uploadTime: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      status: "ready",
    }

    setQueueItems([newItem, ...queueItems])

    // Reset form
    setSelectedWorkflow("")
    setSelectedMarketplaces([])
    setUploadedFile(null)
  }

  // Handle running workflow
  const handleRunWorkflow = (id: number) => {
    setQueueItems(queueItems.map((item) => (item.id === id ? { ...item, status: "running" as const } : item)))

    // Simulate processing time
    setTimeout(() => {
      setQueueItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, status: "completed" as const } : item)),
      )
    }, 3000)
  }

  // Handle file download
  const handleDownload = (fileName: string) => {
    // Create a dummy file for download
    const content = "Sample generated listing file content"
    const blob = new Blob([content], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `generated_${fileName}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Utility function to check date range
  function checkDateRange(date: string, range: string): boolean {
    const workflowDate = new Date(date)
    const now = new Date()
    const daysDiff = Math.floor((now.getTime() - workflowDate.getTime()) / (1000 * 60 * 60 * 24))

    switch (range) {
      case "last-7-days":
        return daysDiff <= 7
      case "last-30-days":
        return daysDiff <= 30
      case "last-90-days":
        return daysDiff <= 90
      default:
        return true
    }
  }

  return (
    <ClientLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Create Listings</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Generate marketplace-ready listing files from your product data
          </p>
        </div>

        {/* Section 1: The Generator */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <CardTitle>Configure Your Listing Run</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Workflow Filters */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Find Your Workflow</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search Workflow</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="search"
                      placeholder="Type workflow name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Filter by Brand</Label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="All brands" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All brands</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Filter by Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Creation Date</Label>
                  <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="All time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All time</SelectItem>
                      <SelectItem value="last-7-days">Last 7 days</SelectItem>
                      <SelectItem value="last-30-days">Last 30 days</SelectItem>
                      <SelectItem value="last-90-days">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Workflow Selection */}
            <div className="space-y-2">
              <Label>Select a Workflow Name</Label>
              <Select value={selectedWorkflow} onValueChange={setSelectedWorkflow}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a workflow from the filtered results" />
                </SelectTrigger>
                <SelectContent>
                  {filteredWorkflows.map((workflow) => (
                    <SelectItem key={workflow.id} value={workflow.id.toString()}>
                      {workflow.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Marketplace Selection */}
            {selectedWorkflowData && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select Marketplace Channels</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedWorkflowData.marketplaces.map((marketplace) => (
                    <div key={marketplace} className="flex items-center space-x-2">
                      <Checkbox
                        id={marketplace}
                        checked={selectedMarketplaces.includes(marketplace)}
                        onCheckedChange={(checked) => handleMarketplaceChange(marketplace, checked as boolean)}
                      />
                      <Label htmlFor={marketplace} className="text-sm font-medium">
                        {marketplace}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* File Upload */}
            {selectedMarketplaces.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Upload Product Data</h3>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                      : "border-slate-300 dark:border-slate-600 hover:border-indigo-400"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  {uploadedFile ? (
                    <div>
                      <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{uploadedFile.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                        {isDragActive ? "Drop your file here" : "Drag & drop your file here"}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">or click to browse files</p>
                      <Button variant="outline" size="sm">
                        Browse Files
                      </Button>
                    </div>
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Upload your product details in the master CSV/XLS template.
                </p>
              </div>
            )}

            {/* Add to Queue Button */}
            <div className="pt-4">
              <Button
                onClick={handleAddToQueue}
                disabled={!isFormComplete}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                Add to Run Queue
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Run Queue */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <CardTitle>Run Your Workflows</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {queueItems.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">
                  No workflows in queue. Add a workflow above to get started.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Workflow Name</TableHead>
                    <TableHead>Marketplace Channels</TableHead>
                    <TableHead>Uploaded File</TableHead>
                    <TableHead>Upload Time</TableHead>
                    <TableHead>Action / Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queueItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.workflowName}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {item.marketplaces.map((marketplace) => (
                            <Badge key={marketplace} variant="secondary" className="text-xs">
                              {marketplace}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-indigo-600 hover:text-indigo-800">
                          {item.fileName}
                        </Button>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600 dark:text-slate-400">{item.uploadTime}</TableCell>
                      <TableCell>
                        {item.status === "ready" && (
                          <Button
                            onClick={() => handleRunWorkflow(item.id)}
                            size="sm"
                            className="bg-indigo-600 hover:bg-indigo-700"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Run Workflow
                          </Button>
                        )}
                        {item.status === "running" && (
                          <div className="flex items-center text-blue-600">
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </div>
                        )}
                        {item.status === "completed" && (
                          <Button
                            onClick={() => handleDownload(item.fileName)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Ready to Download
                          </Button>
                        )}
                        {item.status === "failed" && (
                          <Badge variant="destructive" className="cursor-pointer">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Failed
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  )
}
