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
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  Eye,
  MessageSquare,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Pause,
  FileText,
  Mail,
  Phone,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const clientsData = [
  {
    id: 1,
    organizationName: "TechCorp Solutions",
    contactName: "John Smith",
    contactEmail: "john@techcorp.com",
    contactPhone: "+1 (555) 123-4567",
    status: "active",
    plan: "Enterprise",
    joinDate: "2023-08-15",
    lastActivity: "2024-01-15 14:30:00",
    activeWorkflows: 5,
    totalWorkflows: 7,
    monthlyRevenue: 2500,
    successRate: 98.5,
    totalRuns: 1247,
    industries: ["Technology", "Electronics"],
    notes: "High-value client with complex automation needs. Requires premium support.",
  },
  {
    id: 2,
    organizationName: "E-commerce Plus",
    contactName: "Sarah Johnson",
    contactEmail: "sarah@ecomplus.com",
    contactPhone: "+1 (555) 234-5678",
    status: "active",
    plan: "Professional",
    joinDate: "2023-11-22",
    lastActivity: "2024-01-15 09:15:00",
    activeWorkflows: 3,
    totalWorkflows: 4,
    monthlyRevenue: 1200,
    successRate: 95.2,
    totalRuns: 892,
    industries: ["Retail", "Fashion"],
    notes: "Growing rapidly, potential for plan upgrade.",
  },
  {
    id: 3,
    organizationName: "Digital Retail Co",
    contactName: "Mike Davis",
    contactEmail: "mike@digitalretail.com",
    contactPhone: "+1 (555) 345-6789",
    status: "trial",
    plan: "Trial",
    joinDate: "2024-01-10",
    lastActivity: "2024-01-14 16:45:00",
    activeWorkflows: 1,
    totalWorkflows: 2,
    monthlyRevenue: 0,
    successRate: 89.3,
    totalRuns: 45,
    industries: ["Retail"],
    notes: "New trial client, showing good engagement.",
  },
  {
    id: 4,
    organizationName: "Global Marketplace Inc",
    contactName: "Lisa Chen",
    contactEmail: "lisa@globalmp.com",
    contactPhone: "+1 (555) 456-7890",
    status: "suspended",
    plan: "Professional",
    joinDate: "2023-05-30",
    lastActivity: "2024-01-10 11:20:00",
    activeWorkflows: 0,
    totalWorkflows: 6,
    monthlyRevenue: 0,
    successRate: 92.1,
    totalRuns: 2156,
    industries: ["Marketplace", "B2B"],
    notes: "Account suspended due to payment issues. Requires follow-up.",
  },
]

const clientWorkflowsData = {
  1: [
    {
      id: 1,
      name: "Amazon Product Sync",
      marketplace: "Amazon",
      status: "active",
      lastRun: "2024-01-15 09:32:00",
      lastRunStatus: "success",
      runsThisMonth: 15,
    },
    {
      id: 2,
      name: "eBay Inventory Update",
      marketplace: "eBay",
      status: "active",
      lastRun: "2024-01-15 15:00:00",
      lastRunStatus: "running",
      runsThisMonth: 120,
    },
    {
      id: 3,
      name: "Shopify Price Sync",
      marketplace: "Shopify",
      status: "paused",
      lastRun: "2024-01-14 16:45:00",
      lastRunStatus: "failed",
      runsThisMonth: 28,
    },
  ],
}

function StatusBadge({ status }: { status: string }) {
  const variants = {
    active: "bg-green-100 text-green-800",
    trial: "bg-blue-100 text-blue-800",
    suspended: "bg-red-100 text-red-800",
    inactive: "bg-gray-100 text-gray-800",
  }

  const icons = {
    active: CheckCircle,
    trial: Clock,
    suspended: XCircle,
    inactive: Pause,
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

function PlanBadge({ plan }: { plan: string }) {
  const variants = {
    Enterprise: "bg-purple-100 text-purple-800",
    Professional: "bg-blue-100 text-blue-800",
    Trial: "bg-yellow-100 text-yellow-800",
    Basic: "bg-gray-100 text-gray-800",
  }

  return <Badge className={variants[plan as keyof typeof variants] || "bg-gray-100 text-gray-800"}>{plan}</Badge>
}

function WorkflowStatusBadge({ status }: { status: string }) {
  const variants = {
    active: "bg-green-100 text-green-800",
    paused: "bg-yellow-100 text-yellow-800",
    draft: "bg-gray-100 text-gray-800",
  }

  return <Badge className={variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"}>{status}</Badge>
}

function RunStatusBadge({ status }: { status: string }) {
  const variants = {
    success: "bg-green-100 text-green-800",
    running: "bg-blue-100 text-blue-800",
    failed: "bg-red-100 text-red-800",
  }

  return <Badge className={variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"}>{status}</Badge>
}

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")
  const [selectedClient, setSelectedClient] = useState<(typeof clientsData)[0] | null>(null)
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false)
  const [clientNotes, setClientNotes] = useState("")

  const filteredClients = clientsData.filter((client) => {
    const matchesSearch =
      client.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    const matchesPlan = planFilter === "all" || client.plan === planFilter

    return matchesSearch && matchesStatus && matchesPlan
  })

  const totalClients = clientsData.length
  const activeClients = clientsData.filter((c) => c.status === "active").length
  const trialClients = clientsData.filter((c) => c.status === "trial").length
  const totalRevenue = clientsData.reduce((sum, client) => sum + client.monthlyRevenue, 0)

  const handleViewClient = (client: (typeof clientsData)[0]) => {
    setSelectedClient(client)
  }

  const handleEditNotes = (client: (typeof clientsData)[0]) => {
    setSelectedClient(client)
    setClientNotes(client.notes)
    setIsNotesDialogOpen(true)
  }

  const handleSaveNotes = () => {
    console.log("Saving notes for client:", selectedClient?.id, clientNotes)
    setIsNotesDialogOpen(false)
  }

  const handleSuspendClient = (clientId: number) => {
    console.log("Suspending client:", clientId)
  }

  const handleActivateClient = (clientId: number) => {
    console.log("Activating client:", clientId)
  }

  return (
    <ProviderLayout>
      <div className="p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Clients</h1>
              <p className="text-slate-600 mt-2">Manage and monitor all client accounts</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{totalClients}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Clients</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{activeClients}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Trial Clients</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{trialClients}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% from last month
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
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search clients..."
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
                    <SelectItem value="trial">Trial</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-48">
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Plan</Label>
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All plans" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All plans</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Trial">Trial</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Workflows</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center">
                          <Building2 className="w-4 h-4 mr-2 text-slate-400" />
                          {client.organizationName}
                        </div>
                        <div className="text-sm text-slate-500">
                          Joined {new Date(client.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{client.contactName}</div>
                        <div className="text-sm text-slate-500">{client.contactEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={client.status} />
                    </TableCell>
                    <TableCell>
                      <PlanBadge plan={client.plan} />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {client.activeWorkflows}/{client.totalWorkflows}
                        </div>
                        <div className="text-sm text-slate-500">Active/Total</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">${client.monthlyRevenue.toLocaleString()}/mo</div>
                      <div className="text-sm text-slate-500">{client.successRate}% success</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(client.lastActivity).toLocaleDateString()}</div>
                      <div className="text-xs text-slate-500">{new Date(client.lastActivity).toLocaleTimeString()}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => handleViewClient(client)}>
                              <Eye className="h-3 w-3" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-[700px] sm:w-[900px]">
                            <SheetHeader>
                              <SheetTitle className="flex items-center">
                                <Building2 className="w-5 h-5 mr-2" />
                                {client.organizationName}
                              </SheetTitle>
                              <SheetDescription>Client details and workflow management</SheetDescription>
                            </SheetHeader>
                            <div className="mt-6">
                              <Tabs defaultValue="overview" className="space-y-6">
                                <TabsList className="grid w-full grid-cols-3">
                                  <TabsTrigger value="overview">Overview</TabsTrigger>
                                  <TabsTrigger value="workflows">Workflows</TabsTrigger>
                                  <TabsTrigger value="billing">Billing</TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="space-y-6">
                                  {/* Client Info Cards */}
                                  <div className="grid grid-cols-2 gap-4">
                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Contact Information</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        <div className="flex items-center text-sm">
                                          <Mail className="w-4 h-4 mr-2 text-slate-400" />
                                          {client.contactEmail}
                                        </div>
                                        <div className="flex items-center text-sm">
                                          <Phone className="w-4 h-4 mr-2 text-slate-400" />
                                          {client.contactPhone}
                                        </div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Account Status</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">Status:</span>
                                          <StatusBadge status={client.status} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">Plan:</span>
                                          <PlanBadge plan={client.plan} />
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>

                                  {/* Performance Metrics */}
                                  <div className="grid grid-cols-3 gap-4">
                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Success Rate</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="text-2xl font-bold text-green-600">{client.successRate}%</div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Total Runs</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="text-2xl font-bold">{client.totalRuns.toLocaleString()}</div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Monthly Revenue</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="text-2xl font-bold text-green-600">
                                          ${client.monthlyRevenue.toLocaleString()}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>

                                  {/* Industries and Notes */}
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="text-sm font-medium mb-2">Industries</h4>
                                      <div className="flex gap-2">
                                        {client.industries.map((industry) => (
                                          <Badge key={industry} variant="secondary">
                                            {industry}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-2">Notes</h4>
                                      <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-md">
                                        {client.notes}
                                      </p>
                                    </div>
                                  </div>
                                </TabsContent>

                                <TabsContent value="workflows">
                                  <div className="space-y-4">
                                    <h4 className="text-lg font-semibold">Client Workflows</h4>
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Workflow Name</TableHead>
                                          <TableHead>Marketplace</TableHead>
                                          <TableHead>Status</TableHead>
                                          <TableHead>Last Run</TableHead>
                                          <TableHead>Runs/Month</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {(clientWorkflowsData[client.id as keyof typeof clientWorkflowsData] || []).map(
                                          (workflow) => (
                                            <TableRow key={workflow.id}>
                                              <TableCell className="font-medium">{workflow.name}</TableCell>
                                              <TableCell>{workflow.marketplace}</TableCell>
                                              <TableCell>
                                                <WorkflowStatusBadge status={workflow.status} />
                                              </TableCell>
                                              <TableCell>
                                                <div>
                                                  <RunStatusBadge status={workflow.lastRunStatus} />
                                                  <div className="text-xs text-slate-500 mt-1">{workflow.lastRun}</div>
                                                </div>
                                              </TableCell>
                                              <TableCell>{workflow.runsThisMonth}</TableCell>
                                            </TableRow>
                                          ),
                                        )}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </TabsContent>

                                <TabsContent value="billing">
                                  <div className="space-y-4">
                                    <h4 className="text-lg font-semibold">Billing Information</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <Card>
                                        <CardHeader className="pb-2">
                                          <CardTitle className="text-sm">Current Plan</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <PlanBadge plan={client.plan} />
                                          <p className="text-sm text-slate-600 mt-2">${client.monthlyRevenue}/month</p>
                                        </CardContent>
                                      </Card>
                                      <Card>
                                        <CardHeader className="pb-2">
                                          <CardTitle className="text-sm">Join Date</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <p className="text-sm">{new Date(client.joinDate).toLocaleDateString()}</p>
                                        </CardContent>
                                      </Card>
                                    </div>
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
                            <DropdownMenuItem onClick={() => handleEditNotes(client)}>
                              <FileText className="w-4 h-4 mr-2" />
                              Edit Notes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {client.status === "active" ? (
                              <DropdownMenuItem className="text-red-600" onClick={() => handleSuspendClient(client.id)}>
                                <XCircle className="w-4 h-4 mr-2" />
                                Suspend Account
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                className="text-green-600"
                                onClick={() => handleActivateClient(client.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Activate Account
                              </DropdownMenuItem>
                            )}
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
              <DialogTitle>Edit Client Notes</DialogTitle>
              <DialogDescription>Update notes for {selectedClient?.organizationName}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  rows={6}
                  placeholder="Add notes about this client..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNotesDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleSaveNotes}>
                  Save Notes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ProviderLayout>
  )
}
