"use client"
import { ProviderLayout } from "@/components/layouts/provider-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, Eye } from "lucide-react"

const signupRequests = [
  {
    id: 1,
    organizationName: "TechCorp Solutions",
    contactEmail: "admin@techcorp.com",
    signupDate: "2024-01-15",
  },
  {
    id: 2,
    organizationName: "E-commerce Plus",
    contactEmail: "contact@ecomplus.com",
    signupDate: "2024-01-14",
  },
  {
    id: 3,
    organizationName: "Digital Retail Co",
    contactEmail: "info@digitalretail.com",
    signupDate: "2024-01-13",
  },
]

const workflowRequests = [
  {
    id: 1,
    clientName: "TechCorp Solutions",
    brand: "TechBrand",
    marketplace: "Amazon, eBay",
    requestDate: "2024-01-15",
  },
  {
    id: 2,
    clientName: "E-commerce Plus",
    brand: "EcomBrand",
    marketplace: "Shopify",
    requestDate: "2024-01-14",
  },
]

const changeRequests = [
  {
    id: 1,
    clientName: "Digital Retail Co",
    workflowName: "Amazon Product Sync",
    requestDate: "2024-01-15",
  },
  {
    id: 2,
    clientName: "TechCorp Solutions",
    workflowName: "eBay Inventory Update",
    requestDate: "2024-01-14",
  },
]

export default function ProviderQueuePage() {
  const handleApprove = (id: number) => {
    console.log("Approving signup:", id)
  }

  const handleReject = (id: number) => {
    console.log("Rejecting signup:", id)
  }

  const handleAcceptRequest = (id: number) => {
    console.log("Accepting workflow request:", id)
  }

  const handleViewDetails = (id: number) => {
    console.log("Viewing details:", id)
  }

  const handleMarkComplete = (id: number) => {
    console.log("Marking as complete:", id)
  }

  return (
    <ProviderLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Request Queues</h1>
          <p className="text-slate-600 mt-2">Manage client signups and workflow requests</p>
        </div>

        <Tabs defaultValue="signups" className="space-y-6">
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organization Name</TableHead>
                      <TableHead>Contact Email</TableHead>
                      <TableHead>Signup Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {signupRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.organizationName}</TableCell>
                        <TableCell>{request.contactEmail}</TableCell>
                        <TableCell>{request.signupDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprove(request.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleReject(request.id)}>
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflows">
            <Card>
              <CardHeader>
                <CardTitle>New Workflow Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client Name</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Marketplace</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workflowRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.clientName}</TableCell>
                        <TableCell>{request.brand}</TableCell>
                        <TableCell>{request.marketplace}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              className="bg-indigo-600 hover:bg-indigo-700"
                              onClick={() => handleAcceptRequest(request.id)}
                            >
                              Accept Request
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleViewDetails(request.id)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="changes">
            <Card>
              <CardHeader>
                <CardTitle>Change Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client Name</TableHead>
                      <TableHead>Workflow Name</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {changeRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.clientName}</TableCell>
                        <TableCell>{request.workflowName}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewDetails(request.id)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleMarkComplete(request.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark Complete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProviderLayout>
  )
}
