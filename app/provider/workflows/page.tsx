"use client"

import { useState } from "react"
import { ProviderLayout } from "@/components/layouts/provider-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Workflow,
  Activity,
  TrendingUp,
  TrendingDown,
  Eye,
  Play,
  Pause,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
  Building2,
  Calendar,
  Download,
  BarChart3,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const workflowsData = [
  {
    id: 1,
    name: "Amazon Product Sync",
    clientId: 1,
    clientName: "TechCorp Solutions",
    marketplace: "Amazon",
    brand: "TechBrand",
    status: "active",
    schedule: "Daily at 9:00 AM",
    lastRun: "2024-01-15 09:32:00",
    lastRunStatus: "success",
    nextRun: "2024-01-16 09:00:00",
    runsThisMonth: 15,
    successRate: 98.5,
    avgDuration: "2m 34s",
    recordsProcessed: 1247,
    createdDate: "2023-08-20",
    priority: "high",
    description: "Synchronizes product data with Amazon marketplace including pricing, inventory, and descriptions.",
    errorCount: 2,
    lastError: "2024-01-10 14:30:00",
  },
  {
    id: 2,
    name: "eBay Inventory Update",
    clientId: 1,
    clientName: "TechCorp Solutions",
    marketplace: "eBay",
    brand: "TechBrand",
    status: "active",
    schedule: "Every 6 hours",
    lastRun: "2024-01-15 15:00:00",
    lastRunStatus: "running",
    nextRun: "2024-01-15 21:00:00",
    runsThisMonth: 120,
    successRate: 95.2,
    avgDuration: "1m 45s",
    recordsProcessed: 892,
    createdDate: "2023-09-15",
    priority: "medium",
    description: "Updates inventory levels across all eBay SKUs every 6 hours.",
    errorCount: 8,
    lastError: "2024-01-12 08:15:00",
  },
  {
    id: 3,
    name: "Shopify Price Sync",
    clientId: 2,
    clientName: "E-commerce Plus",
    marketplace: "Shopify",
    brand: "EcomBrand",
    status: "paused",
    schedule: "Twice daily",
    lastRun: "2024-01-14 16:45:00",
    lastRunStatus: "failed",
    nextRun: "Paused",
    runsThisMonth: 28,
    successRate: 89.3,
    avgDuration: "3m 12s",
    recordsProcessed: 456,
    createdDate: "2023-11-30",
    priority: "low",
    description: "Synchronizes pricing strategy across Shopify store with dynamic pricing rules.",
    errorCount: 15,
    lastError: "2024-01-14 16:45:00",
  },
  {
    id: 4,
    name: "Walmart Listings",
    clientId: 3,
    clientName: "Digital Retail Co",
    marketplace: "Walmart",
    brand: "RetailBrand",
    status: "draft",
    schedule: "Not scheduled",
    lastRun: "Never",
    lastRunStatus: "pending",
    nextRun: "Not scheduled",
    runsThisMonth: 0,
    successRate: 0,
    avgDuration: "N/A",
    recordsProcessed: 0,
    createdDate: "2024-01-10",
    priority: "medium",
    description: "New workflow for managing Walmart marketplace listings - currently in setup phase.",
    errorCount: 0,
    lastError: null,
  },
  {
    id: 5,
    name: "Amazon Price Monitor",
    clientId: 2,
    clientName: "E-commerce Plus",
    marketplace: "Amazon",
    brand: "EcomBrand",
    status: "active",
    schedule: "Hourly",
    lastRun: "2024-01-15 16:00:00",
    lastRunStatus: "success",
    nextRun: "2024-01-15 17:00:00",
    runsThisMonth: 360,
    successRate: 97.8,
    avgDuration: "45s",
    recordsProcessed: 234,
    createdDate: "2023-12-05",
    priority: "high",
    description: "Monitors competitor pricing and adjusts prices automatically based on market conditions.",
    errorCount: 5,
    lastError: "2024-01-13 11:20:00",
  },
  {
    id: 6,
    name: "Multi-Channel Sync",
    clientId: 4,
    clientName: "Global Marketplace Inc",
    marketplace: "Multiple",
    brand: "GlobalBrand",
    status: "error",
    schedule: "Daily at 2:00 AM",
    lastRun: "2024-01-15 02:00:00",
    lastRunStatus: "failed",
    nextRun: "2024-01-16 02:00:00",
    runsThisMonth: 15,
    successRate: 73.3,
    avgDuration: "8m 22s",
    recordsProcessed: 2156,
    createdDate: "2023-06-10",
    priority: "critical",
    description: "Synchronizes inventory and pricing across multiple marketplaces simultaneously.",
    errorCount: 45,
    lastError: "2024-01-15 02:00:00",
  },
]

const runLogsData = [
  {
    id: 1,
    startTime: "2024-01-15 09:00:00",
    endTime: "2024-01-15 09:02:34",
    duration: "2m 34s",
    status: "success",
    recordsProcessed: 1247,
    recordsUpdated: 89,
    recordsSkipped: 12,
    errors: 0,
    errorDetails: null,
  },
  {
    id: 2,
    startTime: "2024-01-14 09:00:00",
    endTime: "2024-01-14 09:02:18",
    duration: "2m 18s",
    status: "success",
    recordsProcessed: 1198,
    recordsUpdated: 76,
    recordsSkipped: 8,
    errors: 0,
    errorDetails: null,
  },
  {
    id: 3,
    startTime: "2024-01-13 09:00:00",
    endTime: "2024-01-13 09:01:45",
    duration: "1m 45s",
    status: "failed",
    recordsProcessed: 234,
    recordsUpdated: 0,
    recordsSkipped: 0,
    errors: 15,
    errorDetails: "API rate limit exceeded, connection timeout",
  },
]

function StatusBadge({ status }: { status: string }) {
  const variants = {
    active: "bg-green-100 text-green-800",
    paused: "bg-yellow-100 text-yellow-800",
    draft: "bg-gray-100 text-gray-800",
    error: "bg-red-100 text-red-800",
  }

  const icons = {
    active: CheckCircle,
    paused: Pause,
    draft: Clock,
    error: XCircle,
  }

  const Icon = icons[status as keyof typeof icons] || Clock

  return (
    <Badge
      className={`${variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"} flex items-center gap-1`}
    >
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

function RunStatusBadge({ status }: { status: string }) {
  const variants = {
    success: "bg-green-100 text-green-800",
    running: "bg-blue-100 text-blue-800",
    failed: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
  }

  const icons = {
    success: CheckCircle,
    running: Play,
    failed: XCircle,
    pending: Clock,
  }

  const Icon = icons[status as keyof typeof icons] || Clock

  return (
    <Badge
      className={`${variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"} flex items-center gap-1`}
    >
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const variants = {
    critical: "bg-red-100 text-red-800",
    high: "bg-orange-100 text-orange-800",
    medium: "bg-blue-100 text-blue-800",
    low: "bg-gray-100 text-gray-800",
  }

  return (
    <Badge className={variants[priority as keyof typeof variants] || "bg-gray-100 text-gray-800"}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  )
}

export default function AllWorkflowsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [clientFilter, setClientFilter] = useState("all")
  const [marketplaceFilter, setMarketplaceFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedWorkflow, setSelectedWorkflow] = useState<(typeof workflowsData)[0] | null>(null)
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false)
  const [workflowNotes, setWorkflowNotes] = useState("")

  const filteredWorkflows = workflowsData.filter((workflow) => {
    const matchesSearch =
      workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.marketplace.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || workflow.status === statusFilter
    const matchesClient = clientFilter === "all" || workflow.clientName === clientFilter
    const matchesMarketplace = marketplaceFilter === "all" || workflow.marketplace === marketplaceFilter
    const matchesPriority = priorityFilter === "all" || workflow.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesClient && matchesMarketplace && matchesPriority
  })

  const totalWorkflows = workflowsData.length
  const activeWorkflows = workflowsData.filter((w) => w.status === "active").length
  const errorWorkflows = workflowsData.filter((w) => w.status === "error").length
  const totalRuns = workflowsData.reduce((sum, workflow) => sum + workflow.runsThisMonth, 0)
  const avgSuccessRate = workflowsData.reduce((sum, workflow) => sum + workflow.successRate, 0) / workflowsData.length

  const uniqueClients = [...new Set(workflowsData.map((w) => w.clientName))]
  const uniqueMarketplaces = [...new Set(workflowsData.map((w) => w.marketplace))]

  const handleViewWorkflow = (workflow: (typeof workflowsData)[0]) => {
    setSelectedWorkflow(workflow)
  }

  const handleRunWorkflow = (workflowId: number) => {
    console.log("Running workflow:", workflowId)
  }

  const handlePauseWorkflow = (workflowId: number) => {
    console.log("Pausing workflow:", workflowId)
  }

  const handleEditNotes = (workflow: (typeof workflowsData)[0]) => {
    setSelectedWorkflow(workflow)
    setWorkflowNotes(workflow.description)
    setIsNotesDialogOpen(true)
  }

  const handleSaveNotes = () => {
    console.log("Saving notes for workflow:", selectedWorkflow?.id, workflowNotes)
    setIsNotesDialogOpen(false)
  }

  return (
    <ProviderLayout>
      <div className="p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">All Workflows</h1>
              <p className="text-slate-600 mt-2">Monitor and manage workflows across all clients</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Workflows</CardTitle>
              <Workflow className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{totalWorkflows}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{activeWorkflows}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Errors</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{errorWorkflows}</div>
              <p className="text-xs text-red-600 flex items-center mt-1">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Runs</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{totalRuns.toLocaleString()}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Avg Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{avgSuccessRate.toFixed(1)}%</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +1.2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search workflows..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Client</Label>
                <Select value={clientFilter} onValueChange={setClientFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All clients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All clients</SelectItem>
                    {uniqueClients.map((client) => (
                      <SelectItem key={client} value={client}>
                        {client}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Marketplace</Label>
                <Select value={marketplaceFilter} onValueChange={setMarketplaceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All marketplaces" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All marketplaces</SelectItem>
                    {uniqueMarketplaces.map((marketplace) => (
                      <SelectItem key={marketplace} value={marketplace}>
                        {marketplace}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Priority</Label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All priorities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All priorities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workflows Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Workflow</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Marketplace</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkflows.map((workflow) => (
                  <TableRow key={workflow.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{workflow.name}</div>
                        <div className="text-sm text-slate-500">{workflow.brand}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2 text-slate-400" />
                        <span className="text-sm">{workflow.clientName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{workflow.marketplace}</TableCell>
                    <TableCell>
                      <StatusBadge status={workflow.status} />
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={workflow.priority} />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm font-medium">{workflow.successRate}%</div>
                        <div className="text-xs text-slate-500">{workflow.runsThisMonth} runs</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <RunStatusBadge status={workflow.lastRunStatus} />
                        <div className="text-xs text-slate-500 mt-1">
                          {workflow.lastRun !== "Never" ? new Date(workflow.lastRun).toLocaleDateString() : "Never"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {workflow.status === "active" ? (
                          <Button size="sm" variant="outline" onClick={() => handlePauseWorkflow(workflow.id)}>
                            <Pause className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => handleRunWorkflow(workflow.id)}>
                            <Play className="h-3 w-3" />
                          </Button>
                        )}

                        <Sheet>
                          <SheetTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => handleViewWorkflow(workflow)}>
                              <Eye className="h-3 w-3" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-[700px] sm:w-[900px]">
                            <SheetHeader>
                              <SheetTitle className="flex items-center">
                                <Workflow className="w-5 h-5 mr-2" />
                                {workflow.name}
                              </SheetTitle>
                              <SheetDescription>
                                {workflow.clientName} • {workflow.marketplace}
                              </SheetDescription>
                            </SheetHeader>
                            <div className="mt-6">
                              <Tabs defaultValue="overview" className="space-y-6">
                                <TabsList className="grid w-full grid-cols-3">
                                  <TabsTrigger value="overview">Overview</TabsTrigger>
                                  <TabsTrigger value="performance">Performance</TabsTrigger>
                                  <TabsTrigger value="logs">Run Logs</TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="space-y-6">
                                  {/* Workflow Info Cards */}
                                  <div className="grid grid-cols-2 gap-4">
                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Workflow Details</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">Status:</span>
                                          <StatusBadge status={workflow.status} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">Priority:</span>
                                          <PriorityBadge priority={workflow.priority} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">Schedule:</span>
                                          <span className="text-sm">{workflow.schedule}</span>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Client Information</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        <div className="flex items-center text-sm">
                                          <Building2 className="w-4 h-4 mr-2 text-slate-400" />
                                          {workflow.clientName}
                                        </div>
                                        <div className="flex items-center text-sm">
                                          <Users className="w-4 h-4 mr-2 text-slate-400" />
                                          {workflow.brand}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                          Created: {new Date(workflow.createdDate).toLocaleDateString()}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>

                                  {/* Performance Metrics */}
                                  <div className="grid grid-cols-4 gap-4">
                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Success Rate</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="text-2xl font-bold text-green-600">{workflow.successRate}%</div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Runs This Month</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="text-2xl font-bold">{workflow.runsThisMonth}</div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Avg Duration</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="text-2xl font-bold">{workflow.avgDuration}</div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Records Processed</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="text-2xl font-bold">
                                          {workflow.recordsProcessed.toLocaleString()}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>

                                  {/* Description */}
                                  <div>
                                    <h4 className="text-sm font-medium mb-2">Description</h4>
                                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-md">
                                      {workflow.description}
                                    </p>
                                  </div>

                                  {/* Error Information */}
                                  {workflow.errorCount > 0 && (
                                    <Card className="border-red-200">
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm text-red-800 flex items-center">
                                          <AlertTriangle className="w-4 h-4 mr-2" />
                                          Error Information
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="text-sm">
                                          <div className="mb-2">
                                            <span className="font-medium">Total Errors:</span> {workflow.errorCount}
                                          </div>
                                          {workflow.lastError && (
                                            <div>
                                              <span className="font-medium">Last Error:</span>{" "}
                                              {new Date(workflow.lastError).toLocaleString()}
                                            </div>
                                          )}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )}
                                </TabsContent>

                                <TabsContent value="performance">
                                  <div className="space-y-4">
                                    <h4 className="text-lg font-semibold">Performance Analytics</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-sm">Success Rate Trend</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="h-32 flex items-center justify-center text-slate-500">
                                            Performance chart would go here
                                          </div>
                                        </CardContent>
                                      </Card>
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-sm">Run Frequency</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="h-32 flex items-center justify-center text-slate-500">
                                            Frequency chart would go here
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>
                                  </div>
                                </TabsContent>

                                <TabsContent value="logs">
                                  <div className="space-y-4">
                                    <h4 className="text-lg font-semibold">Recent Run Logs</h4>
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Start Time</TableHead>
                                          <TableHead>Duration</TableHead>
                                          <TableHead>Status</TableHead>
                                          <TableHead>Records</TableHead>
                                          <TableHead>Errors</TableHead>
                                          <TableHead>Action</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {runLogsData.map((log) => (
                                          <TableRow key={log.id}>
                                            <TableCell className="text-sm">{log.startTime}</TableCell>
                                            <TableCell className="text-sm">{log.duration}</TableCell>
                                            <TableCell>
                                              <RunStatusBadge status={log.status} />
                                            </TableCell>
                                            <TableCell className="text-sm">
                                              <div>Processed: {log.recordsProcessed}</div>
                                              <div className="text-xs text-slate-500">
                                                Updated: {log.recordsUpdated}
                                              </div>
                                            </TableCell>
                                            <TableCell className="text-sm">
                                              {log.errors > 0 ? (
                                                <div className="text-red-600">{log.errors} errors</div>
                                              ) : (
                                                <div className="text-green-600">No errors</div>
                                              )}
                                            </TableCell>
                                            <TableCell>
                                              <Button size="sm" variant="outline">
                                                <Download className="h-3 w-3" />
                                              </Button>
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </SheetContent>
                        </Sheet>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditNotes(workflow)}>
                              <Settings className="w-4 h-4 mr-2" />
                              Edit Configuration
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="w-4 h-4 mr-2" />
                              Modify Schedule
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Export Logs
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="w-4 h-4 mr-2" />
                              Disable Workflow
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Notes Dialog */}
        <Dialog open={isNotesDialogOpen} onOpenChange={setIsNotesDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Workflow Configuration</DialogTitle>
              <DialogDescription>Update configuration for {selectedWorkflow?.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Description</Label>
                <Textarea
                  id="notes"
                  value={workflowNotes}
                  onChange={(e) => setWorkflowNotes(e.target.value)}
                  rows={6}
                  placeholder="Update workflow description..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNotesDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleSaveNotes}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ProviderLayout>
  )
}
