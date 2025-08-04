"use client"

import { ProviderLayout } from "@/components/layouts/provider-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  DollarSign,
  Users,
  Workflow,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Building2,
  Download,
  UserPlus,
} from "lucide-react"

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
]

const workflowStatusData = [
  { name: "Completed", value: 65, color: "#10b981" },
  { name: "In Progress", value: 25, color: "#f59e0b" },
  { name: "Pending", value: 10, color: "#ef4444" },
]

const recentClients = [
  {
    name: "TechBrand Electronics",
    email: "contact@techbrand.com",
    status: "Active",
    workflows: 12,
    joinedDate: "2 days ago",
  },
  {
    name: "FashionCorp Apparel",
    email: "team@fashioncorp.com",
    status: "Active",
    workflows: 8,
    joinedDate: "1 week ago",
  },
  {
    name: "HomeGoods Plus",
    email: "info@homegoods.com",
    status: "Setup",
    workflows: 3,
    joinedDate: "3 days ago",
  },
]

const recentActivity = [
  {
    type: "workflow_completed",
    client: "TechBrand Electronics",
    description: "Electronics listing workflow completed",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    type: "client_onboarded",
    client: "HomeGoods Plus",
    description: "New client onboarded successfully",
    time: "3 hours ago",
    icon: UserPlus,
    color: "text-blue-600",
  },
  {
    type: "workflow_started",
    client: "FashionCorp Apparel",
    description: "Apparel workflow started processing",
    time: "5 hours ago",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    type: "issue_resolved",
    client: "TechBrand Electronics",
    description: "Data mapping issue resolved",
    time: "1 day ago",
    icon: AlertCircle,
    color: "text-red-600",
  },
]

export default function ProviderDashboard() {
  return (
    <ProviderLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">Welcome back! Here's what's happening with your business.</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button variant="outline" className="flex items-center bg-transparent">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-shadow card-no-border hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-slate-900">$328K</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12.5% from last month
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow card-no-border hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Clients</p>
                  <p className="text-3xl font-bold text-slate-900">47</p>
                  <p className="text-sm text-blue-600 flex items-center mt-1">
                    <UserPlus className="h-4 w-4 mr-1" />
                    +3 new this week
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow card-no-border hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Workflows</p>
                  <p className="text-3xl font-bold text-slate-900">156</p>
                  <p className="text-sm text-purple-600 flex items-center mt-1">
                    <Workflow className="h-4 w-4 mr-1" />
                    23 active now
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Workflow className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow card-no-border hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Completion Rate</p>
                  <p className="text-3xl font-bold text-slate-900">94.2%</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Above target
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="card-shadow card-no-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="mr-2 h-5 w-5 text-indigo-600" />
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Workflow Status Chart */}
          <Card className="card-shadow card-no-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Workflow className="mr-2 h-5 w-5 text-indigo-600" />
                Workflow Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={workflowStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {workflowStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-6 mt-4">
                {workflowStatusData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-sm text-slate-600">
                      {entry.name} ({entry.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Clients and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Clients */}
          <Card className="card-shadow card-no-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="mr-2 h-5 w-5 text-indigo-600" />
                Recent Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClients.map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{client.name}</p>
                        <p className="text-sm text-slate-500">{client.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={client.status === "Active" ? "default" : "secondary"}
                        className={client.status === "Active" ? "bg-green-100 text-green-800" : ""}
                      >
                        {client.status}
                      </Badge>
                      <p className="text-sm text-slate-500 mt-1">{client.workflows} workflows</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="card-shadow card-no-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-indigo-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-slate-100`}>
                      <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{activity.client}</p>
                      <p className="text-sm text-slate-600">{activity.description}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="card-shadow card-no-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-indigo-600" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">Client Satisfaction</span>
                  <span className="text-sm font-bold text-slate-900">4.8/5.0</span>
                </div>
                <Progress value={96} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">On-time Delivery</span>
                  <span className="text-sm font-bold text-slate-900">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">Quality Score</span>
                  <span className="text-sm font-bold text-slate-900">98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProviderLayout>
  )
}
