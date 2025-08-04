"use client"

import { useState } from "react"
import { ClientLayout } from "@/components/layouts/client-layout"
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
import {
  Search,
  Filter,
  Play,
  Pause,
  Calendar,
  Settings,
  List,
  Download,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
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
    name: "TechBrand Electronics",
    marketplaces: ["Amazon", "eBay", "Shopify"],
    brand: "TechBrand",
    status: "active",
    schedule: "Daily at 9:00 AM",
    lastRun: "2024-01-15 09:32:00",
    lastRunStatus: "success",
    nextRun: "2024-01-16 09:00:00",
    runsThisMonth: 15,
    successRate: 98.5,
    description:
      "Synchronizes electronics product data across multiple marketplaces including pricing, inventory, and descriptions.",
    masterTemplate: "electronics-master-v2.xlsx",
    marketplaceTemplates: ["amazon-electronics.xlsx", "ebay-electronics.xlsx", "shopify-electronics.xlsx"],
  },
  {
    id: 2,
    name: "TechBrand Mobile Accessories",
    marketplaces: ["Amazon", "Walmart"],
    brand: "TechBrand",
    status: "active",
    schedule: "Every 6 hours",
    lastRun: "2024-01-15 15:00:00",
    lastRunStatus: "running",
    nextRun: "2024-01-15 21:00:00",
    runsThisMonth: 120,
    successRate: 95.2,
    description: "Updates mobile accessories inventory and pricing across Amazon and Walmart.",
    masterTemplate: "mobile-accessories-master-v1.xlsx",
    marketplaceTemplates: ["amazon-mobile.xlsx", "walmart-mobile.xlsx"],
  },
  {
    id: 3,
    name: "TechBrand Home Appliances",
    marketplaces: ["Shopify", "eBay"],
    brand: "TechBrand",
    status: "paused",
    schedule: "Twice daily",
    lastRun: "2024-01-14 16:45:00",
    lastRunStatus: "failed",
    nextRun: "Paused",
    runsThisMonth: 28,
    successRate: 89.3,
    description: "Synchronizes home appliances pricing strategy across Shopify and eBay with dynamic pricing rules.",
    masterTemplate: "appliances-master-v3.xlsx",
    marketplaceTemplates: ["shopify-appliances.xlsx", "ebay-appliances.xlsx"],
  },
  {
    id: 4,
    name: "TechBrand Gaming Products",
    marketplaces: ["Amazon", "eBay", "Walmart", "Shopify"],
    brand: "TechBrand",
    status: "draft",
    schedule: "Not scheduled",
    lastRun: "Never",
    lastRunStatus: "pending",
    nextRun: "Not scheduled",
    runsThisMonth: 0,
    successRate: 0,
    description: "New workflow for managing gaming products across all major marketplaces - currently in setup phase.",
    masterTemplate: "gaming-master-v1.xlsx",
    marketplaceTemplates: ["amazon-gaming.xlsx", "ebay-gaming.xlsx", "walmart-gaming.xlsx", "shopify-gaming.xlsx"],
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

export default function WorkflowsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [marketplaceFilter, setMarketplaceFilter] = useState("all")
  const [selectedWorkflow, setSelectedWorkflow] = useState<(typeof workflowsData)[0] | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const filteredWorkflows = workflowsData.filter((workflow) => {
    const matchesSearch =
      workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.marketplaces.some((marketplace) => marketplace.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || workflow.status === statusFilter
    const matchesMarketplace = marketplaceFilter === "all" || workflow.marketplaces.includes(marketplaceFilter)

    return matchesSearch && matchesStatus && matchesMarketplace
  })

  const handleRunWorkflow = (workflowId: number) => {
    console.log("Running workflow:", workflowId)
  }

  const handlePauseWorkflow = (workflowId: number) => {
    console.log("Pausing workflow:", workflowId)
  }

  const handleScheduleWorkflow = (workflowId: number) => {
    console.log("Scheduling workflow:", workflowId)
  }

  const handleEditWorkflow = (workflow: (typeof workflowsData)[0]) => {
    setSelectedWorkflow(workflow)
    setIsEditDialogOpen(true)
  }

  const handleDeleteWorkflow = (workflowId: number) => {
    console.log("Deleting workflow:", workflowId)
  }

  const handleDownloadMasterTemplate = (templateName: string) => {
    console.log("Downloading master template:", templateName)
  }

  const handleDownloadMarketplaceTemplates = (templates: string[]) => {
    console.log("Downloading marketplace templates:", templates)
  }

  return (
    <ClientLayout>
      <div className="p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Workflows</h1>
              <p className="text-slate-600 mt-2">Manage and monitor your automated workflows</p>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
              <a href="/app/requests/new">
                <Plus className="w-4 h-4 mr-2" />
                Request New Workflow
              </a>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Workflows</CardTitle>
              <Settings className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{workflowsData.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {workflowsData.filter((w) => w.status === "active").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Paused</CardTitle>
              <Pause className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {workflowsData.filter((w) => w.status === "paused").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Draft</CardTitle>
              <Clock className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {workflowsData.filter((w) => w.status === "draft").length}
              </div>
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
            <div className="flex space-x-4">
              <div className="flex-1">
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
              <div className="w-48">
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
                  </SelectContent>
                </Select>
              </div>
              <div className="w-48">
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Marketplace</Label>
                <Select value={marketplaceFilter} onValueChange={setMarketplaceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All marketplaces" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All marketplaces</SelectItem>
                    <SelectItem value="Amazon">Amazon</SelectItem>
                    <SelectItem value="eBay">eBay</SelectItem>
                    <SelectItem value="Shopify">Shopify</SelectItem>
                    <SelectItem value="Walmart">Walmart</SelectItem>
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Workflow Name</TableHead>
                    <TableHead>Marketplace</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Master Template</TableHead>
                    <TableHead>Marketplace Templates</TableHead>
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
                        <div className="flex flex-wrap gap-1">
                          {workflow.marketplaces.map((marketplace, index) => (
                            <span key={marketplace} className="text-sm">
                              {marketplace}
                              {index < workflow.marketplaces.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={workflow.status} />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{workflow.schedule}</div>
                          <div className="text-xs text-slate-500">Next: {workflow.nextRun}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <RunStatusBadge status={workflow.lastRunStatus} />
                          <div className="text-xs text-slate-500 mt-1">{workflow.lastRun}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{workflow.successRate}%</div>
                        <div className="text-xs text-slate-500">{workflow.runsThisMonth} runs</div>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadMasterTemplate(workflow.masterTemplate)}
                          className="flex items-center gap-1"
                        >
                          <Download className="h-3 w-3" />
                          Download Template
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadMarketplaceTemplates(workflow.marketplaceTemplates)}
                          className="flex items-center gap-1"
                        >
                          <Download className="h-3 w-3" />
                          Download Templates
                        </Button>
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

                          <Button size="sm" variant="outline" onClick={() => handleScheduleWorkflow(workflow.id)}>
                            <Calendar className="h-3 w-3" />
                          </Button>

                          <Sheet>
                            <SheetTrigger asChild>
                              <Button size="sm" variant="outline">
                                <List className="h-3 w-3" />
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="w-[600px] sm:w-[800px]">
                              <SheetHeader>
                                <SheetTitle>Run Logs - {workflow.name}</SheetTitle>
                                <SheetDescription>Recent execution history and performance metrics</SheetDescription>
                              </SheetHeader>
                              <div className="mt-6 space-y-6">
                                {/* Workflow Details */}
                                <div className="grid grid-cols-2 gap-4">
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
                                </div>

                                {/* Run History Table */}
                                <div>
                                  <h4 className="text-lg font-semibold mb-4">Recent Runs</h4>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Start Time</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Records</TableHead>
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
                                              Updated: {log.recordsUpdated} | Errors: {log.errors}
                                            </div>
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
                              <DropdownMenuItem onClick={() => handleEditWorkflow(workflow)}>
                                <Settings className="w-4 h-4 mr-2" />
                                Edit Settings
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Export Data
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteWorkflow(workflow.id)}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Delete Workflow
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Workflow Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Workflow Settings</DialogTitle>
              <DialogDescription>Modify the configuration for {selectedWorkflow?.name}</DialogDescription>
            </DialogHeader>
            {selectedWorkflow && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workflowName">Workflow Name</Label>
                    <Input id="workflowName" defaultValue={selectedWorkflow.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input id="brand" defaultValue={selectedWorkflow.brand} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marketplaces">Marketplaces</Label>
                  <div className="text-sm text-slate-600">Current: {selectedWorkflow.marketplaces.join(", ")}</div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule</Label>
                  <Input id="schedule" defaultValue={selectedWorkflow.schedule} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" defaultValue={selectedWorkflow.description} rows={3} />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ClientLayout>
  )
}
