"use client"

import { ClientLayout } from "@/components/layouts/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, CheckCircle, Plus, ArrowRight, FileText, Workflow, Users } from "lucide-react"
import Link from "next/link"

// Mock data
const stats = [
  {
    title: "Active Workflows",
    value: "12",
    change: "+2 from last month",
    icon: Workflow,
    trend: "up",
  },
  {
    title: "Files Generated",
    value: "1,247",
    change: "+18% from last month",
    icon: FileText,
    trend: "up",
  },
  {
    title: "Success Rate",
    value: "94.2%",
    change: "+2.1% from last month",
    icon: CheckCircle,
    trend: "up",
  },
  {
    title: "Avg. Processing Time",
    value: "3.2 min",
    change: "-0.8 min from last month",
    icon: Clock,
    trend: "down",
  },
]

const recentWorkflows = [
  {
    id: 1,
    name: "TechBrand Electronics",
    marketplace: "Amazon, Flipkart",
    status: "Active",
    lastRun: "2 hours ago",
    successRate: 98.5,
  },
  {
    id: 2,
    name: "FashionCorp Apparel",
    marketplace: "Myntra, Ajio",
    status: "Active",
    lastRun: "4 hours ago",
    successRate: 95.2,
  },
  {
    id: 3,
    name: "HomeDecor Furniture",
    marketplace: "Amazon, Pepperfry",
    status: "Paused",
    lastRun: "1 day ago",
    successRate: 89.3,
  },
  {
    id: 4,
    name: "SportsCorp Fitness",
    marketplace: "Amazon, Flipkart, Decathlon",
    status: "Active",
    lastRun: "6 hours ago",
    successRate: 92.1,
  },
]

const recentFiles = [
  {
    id: 1,
    name: "electronics_batch_jan2025.csv",
    workflow: "TechBrand Electronics",
    createdAt: "2 hours ago",
    size: "2.4 MB",
    status: "Ready",
  },
  {
    id: 2,
    name: "apparel_winter_collection.xlsx",
    workflow: "FashionCorp Apparel",
    createdAt: "4 hours ago",
    size: "1.8 MB",
    status: "Ready",
  },
  {
    id: 3,
    name: "furniture_catalog_update.csv",
    workflow: "HomeDecor Furniture",
    createdAt: "1 day ago",
    size: "3.1 MB",
    status: "Ready",
  },
]

export default function DashboardPage() {
  return (
    <ClientLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Welcome back! Here's what's happening with your workflows.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link href="/app/create-listings">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Listings
              </Button>
            </Link>
          </div>
        </div>

        {/* Create Listings CTA */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Ready to create new listings?</h3>
                <p className="text-indigo-100 mb-4 sm:mb-0">
                  Upload your product data and generate marketplace-ready listing files in minutes.
                </p>
              </div>
              <Link href="/app/create-listings">
                <Button variant="secondary" className="bg-white text-indigo-600 hover:bg-slate-50">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
                <p
                  className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"} flex items-center mt-1`}
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Workflows */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Workflows</CardTitle>
                <Link href="/app/workflows">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              <CardDescription>Your most recently active workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentWorkflows.map((workflow) => (
                  <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">{workflow.name}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{workflow.marketplace}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <Badge variant={workflow.status === "Active" ? "default" : "secondary"}>
                          {workflow.status}
                        </Badge>
                        <span className="text-xs text-slate-500">Last run: {workflow.lastRun}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {workflow.successRate}%
                      </div>
                      <Progress value={workflow.successRate} className="w-16 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Files */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Files</CardTitle>
                <Link href="/app/files">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              <CardDescription>Your recently generated listing files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-indigo-600" />
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-slate-100">{file.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{file.workflow}</p>
                        <div className="flex items-center mt-1 space-x-2 text-xs text-slate-500">
                          <span>{file.createdAt}</span>
                          <span>•</span>
                          <span>{file.size}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {file.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/app/create-listings">
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-slate-50 bg-transparent"
                >
                  <Plus className="w-6 h-6 text-indigo-600" />
                  <span className="font-medium">Create New Listings</span>
                  <span className="text-xs text-slate-500 text-center">
                    Upload product data and generate marketplace files
                  </span>
                </Button>
              </Link>
              <Link href="/app/requests/new">
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-slate-50 bg-transparent"
                >
                  <Workflow className="w-6 h-6 text-indigo-600" />
                  <span className="font-medium">Request New Workflow</span>
                  <span className="text-xs text-slate-500 text-center">Set up a new workflow for your products</span>
                </Button>
              </Link>
              <Link href="/app/team">
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-slate-50 bg-transparent"
                >
                  <Users className="w-6 h-6 text-indigo-600" />
                  <span className="font-medium">Manage Team</span>
                  <span className="text-xs text-slate-500 text-center">Add team members and manage permissions</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  )
}
