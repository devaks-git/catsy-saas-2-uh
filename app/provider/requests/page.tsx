"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X, Clock, AlertCircle, Zap } from "lucide-react"

// Mock data for different request types
const signupRequests = [
  {
    id: 1,
    organizationName: "TechCorp Solutions",
    contactEmail: "admin@techcorp.com",
    signupDate: "2024-01-15",
    status: "pending",
  },
  {
    id: 2,
    organizationName: "E-commerce Plus",
    contactEmail: "contact@ecomplus.com",
    signupDate: "2024-01-14",
    status: "pending",
  },
  {
    id: 3,
    organizationName: "Digital Retail Co",
    contactEmail: "info@digitalretail.com",
    signupDate: "2024-01-13",
    status: "pending",
  },
]

const workflowRequests = [
  {
    id: 1,
    clientName: "TechCorp Solutions",
    workflowType: "Product Listing",
    requestDate: "2024-01-15",
    priority: "high",
    description: "Bulk product listing for electronics category",
  },
  {
    id: 2,
    clientName: "Fashion Forward",
    workflowType: "Content Creation",
    requestDate: "2024-01-14",
    priority: "medium",
    description: "Social media content for spring collection",
  },
  {
    id: 3,
    clientName: "Home Essentials",
    workflowType: "SEO Optimization",
    requestDate: "2024-01-13",
    priority: "low",
    description: "Product description optimization",
  },
]

const changeRequests = [
  {
    id: 1,
    clientName: "Digital Retail Co",
    changeType: "Workflow Modification",
    requestDate: "2024-01-15",
    priority: "high",
    description: "Update approval process for product listings",
  },
  {
    id: 2,
    clientName: "E-commerce Plus",
    changeType: "Access Rights",
    requestDate: "2024-01-14",
    priority: "medium",
    description: "Add new team member permissions",
  },
]

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState("signups")

  const handleApprove = (id: number, type: string) => {
    console.log(`Approving ${type} request ${id}`)
    // Handle approval logic here
  }

  const handleReject = (id: number, type: string) => {
    console.log(`Rejecting ${type} request ${id}`)
    // Handle rejection logic here
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-3 h-3" />
      case "medium":
        return <Clock className="w-3 h-3" />
      case "low":
        return <Zap className="w-3 h-3" />
      default:
        return null
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Request Queues</h1>
        <p className="text-slate-600">Manage client signups and workflow requests</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="signups">Sign-ups</TabsTrigger>
          <TabsTrigger value="workflows">New Workflow Requests</TabsTrigger>
          <TabsTrigger value="changes">Change Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="signups">
          <Card>
            <CardHeader>
              <CardTitle>Pending Client Sign-ups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Organization Name</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Contact Email</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Signup Date</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {signupRequests.map((request) => (
                      <tr key={request.id} className="border-b border-slate-100">
                        <td className="py-3 px-4 font-medium text-slate-900">{request.organizationName}</td>
                        <td className="py-3 px-4 text-slate-600">{request.contactEmail}</td>
                        <td className="py-3 px-4 text-slate-600">{request.signupDate}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleApprove(request.id, "signup")}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleReject(request.id, "signup")}>
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows">
          <Card>
            <CardHeader>
              <CardTitle>New Workflow Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Client Name</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Workflow Type</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Priority</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Request Date</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workflowRequests.map((request) => (
                      <tr key={request.id} className="border-b border-slate-100">
                        <td className="py-3 px-4 font-medium text-slate-900">{request.clientName}</td>
                        <td className="py-3 px-4 text-slate-600">{request.workflowType}</td>
                        <td className="py-3 px-4">
                          <Badge className={`${getPriorityColor(request.priority)} flex items-center gap-1 w-fit`}>
                            {getPriorityIcon(request.priority)}
                            {request.priority}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{request.requestDate}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleApprove(request.id, "workflow")}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(request.id, "workflow")}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="changes">
          <Card>
            <CardHeader>
              <CardTitle>Change Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Client Name</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Change Type</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Priority</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Request Date</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {changeRequests.map((request) => (
                      <tr key={request.id} className="border-b border-slate-100">
                        <td className="py-3 px-4 font-medium text-slate-900">{request.clientName}</td>
                        <td className="py-3 px-4 text-slate-600">{request.changeType}</td>
                        <td className="py-3 px-4">
                          <Badge className={`${getPriorityColor(request.priority)} flex items-center gap-1 w-fit`}>
                            {getPriorityIcon(request.priority)}
                            {request.priority}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{request.requestDate}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleApprove(request.id, "change")}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleReject(request.id, "change")}>
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
