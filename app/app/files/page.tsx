"use client"

import { useState } from "react"
import { ClientLayout } from "@/components/layouts/client-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Filter } from "lucide-react"

const filesData = [
  {
    id: 1,
    name: "amazon_products_2024_01_15.xlsx",
    workflow: "Amazon Product Sync",
    generationDate: "2024-01-15 09:32:00",
    fileSize: "2.4 MB",
    status: "Ready",
  },
  {
    id: 2,
    name: "ebay_inventory_update_2024_01_15.csv",
    workflow: "eBay Inventory Update",
    generationDate: "2024-01-15 08:15:00",
    fileSize: "1.8 MB",
    status: "Ready",
  },
  {
    id: 3,
    name: "shopify_price_sync_2024_01_14.xlsx",
    workflow: "Shopify Price Sync",
    generationDate: "2024-01-14 16:45:00",
    fileSize: "3.2 MB",
    status: "Ready",
  },
  {
    id: 4,
    name: "walmart_listings_2024_01_14.csv",
    workflow: "Walmart Listings",
    generationDate: "2024-01-14 14:20:00",
    fileSize: "4.1 MB",
    status: "Processing",
  },
]

function StatusBadge({ status }: { status: string }) {
  const variants = {
    Ready: "bg-green-100 text-green-800",
    Processing: "bg-blue-100 text-blue-800",
    Failed: "bg-red-100 text-red-800",
  }

  return <Badge className={variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"}>{status}</Badge>
}

export default function FilesPage() {
  const [dateRange, setDateRange] = useState("")
  const [workflowFilter, setWorkflowFilter] = useState("")

  return (
    <ClientLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Generated Files</h1>
          <p className="text-slate-600 mt-2">Download and manage your generated workflow files</p>
        </div>

        {/* Filtering Controls */}
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
                <label className="text-sm font-medium text-slate-700 mb-2 block">Date Range</label>
                <Input type="date" value={dateRange} onChange={(e) => setDateRange(e.target.value)} />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-slate-700 mb-2 block">Workflow</label>
                <Select value={workflowFilter} onValueChange={setWorkflowFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All workflows" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All workflows</SelectItem>
                    <SelectItem value="amazon">Amazon Product Sync</SelectItem>
                    <SelectItem value="ebay">eBay Inventory Update</SelectItem>
                    <SelectItem value="shopify">Shopify Price Sync</SelectItem>
                    <SelectItem value="walmart">Walmart Listings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline">Apply Filters</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Files History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Files History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Workflow</TableHead>
                  <TableHead>Generation Date</TableHead>
                  <TableHead>File Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filesData.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell className="font-medium">{file.name}</TableCell>
                    <TableCell>{file.workflow}</TableCell>
                    <TableCell>{file.generationDate}</TableCell>
                    <TableCell>{file.fileSize}</TableCell>
                    <TableCell>
                      <StatusBadge status={file.status} />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-700"
                        disabled={file.status !== "Ready"}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  )
}
