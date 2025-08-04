"use client"

import { useState } from "react"
import { ProviderLayout } from "@/components/layouts/provider-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  AlertTriangle,
  Clock,
  BarChart3,
  PieChartIcon,
  Download,
  Building2,
  Workflow,
  Target,
  Zap,
} from "lucide-react"

// Mock data for analytics
const monthlyRevenueData = [
  { month: "Jan", revenue: 12500, clients: 8, workflows: 24 },
  { month: "Feb", revenue: 15200, clients: 10, workflows: 28 },
  { month: "Mar", revenue: 18900, clients: 12, workflows: 35 },
  { month: "Apr", revenue: 22100, clients: 14, workflows: 42 },
  { month: "May", revenue: 25800, clients: 16, workflows: 48 },
  { month: "Jun", revenue: 28400, clients: 18, workflows: 52 },
]

const workflowPerformanceData = [
  { date: "2024-01-01", successRate: 95.2, totalRuns: 1200, errors: 58 },
  { date: "2024-01-02", successRate: 96.8, totalRuns: 1350, errors: 43 },
  { date: "2024-01-03", successRate: 94.1, totalRuns: 1180, errors: 70 },
  { date: "2024-01-04", successRate: 97.5, totalRuns: 1420, errors: 36 },
  { date: "2024-01-05", successRate: 98.2, totalRuns: 1380, errors: 25 },
  { date: "2024-01-06", successRate: 96.9, totalRuns: 1290, errors: 40 },
  { date: "2024-01-07", successRate: 97.8, totalRuns: 1450, errors: 32 },
]

const marketplaceDistribution = [
  { name: "Amazon", value: 45, color: "#FF9500" },
  { name: "eBay", value: 25, color: "#0064D2" },
  { name: "Shopify", value: 20, color: "#96BF48" },
  { name: "Walmart", value: 10, color: "#004C91" },
]

const clientPerformanceData = [
  {
    id: 1,
    name: "TechCorp Solutions",
    revenue: 2500,
    workflows: 5,
    successRate: 98.5,
    totalRuns: 1247,
    growth: 12.5,
    status: "excellent",
  },
  {
    id: 2,
    name: "E-commerce Plus",
    revenue: 1200,
    workflows: 3,
    successRate: 95.2,
    totalRuns: 892,
    growth: 8.3,
    status: "good",
  },
  {
    id: 3,
    name: "Digital Retail Co",
    revenue: 0,
    workflows: 1,
    successRate: 89.3,
    totalRuns: 45,
    growth: 0,
    status: "trial",
  },
  {
    id: 4,
    name: "Global Marketplace Inc",
    revenue: 0,
    workflows: 0,
    successRate: 92.1,
    totalRuns: 0,
    growth: -15.2,
    status: "suspended",
  },
]

const topWorkflowsData = [
  {
    id: 1,
    name: "Amazon Product Sync",
    client: "TechCorp Solutions",
    runs: 450,
    successRate: 98.5,
    avgDuration: "2m 34s",
    revenue: 850,
  },
  {
    id: 2,
    name: "eBay Inventory Update",
    client: "TechCorp Solutions",
    runs: 360,
    successRate: 95.2,
    avgDuration: "1m 45s",
    revenue: 720,
  },
  {
    id: 3,
    name: "Amazon Price Monitor",
    client: "E-commerce Plus",
    runs: 720,
    successRate: 97.8,
    avgDuration: "45s",
    revenue: 600,
  },
  {
    id: 4,
    name: "Shopify Price Sync",
    client: "E-commerce Plus",
    runs: 280,
    successRate: 89.3,
    avgDuration: "3m 12s",
    revenue: 480,
  },
]

const errorAnalysisData = [
  { category: "API Rate Limits", count: 45, percentage: 35 },
  { category: "Network Timeouts", count: 28, percentage: 22 },
  { category: "Data Validation", count: 22, percentage: 17 },
  { category: "Authentication", count: 18, percentage: 14 },
  { category: "Other", count: 15, percentage: 12 },
]

function StatusBadge({ status }: { status: string }) {
  const variants = {
    excellent: "bg-green-100 text-green-800",
    good: "bg-blue-100 text-blue-800",
    trial: "bg-yellow-100 text-yellow-800",
    suspended: "bg-red-100 text-red-800",
  }

  return <Badge className={variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"}>{status}</Badge>
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  const totalRevenue = monthlyRevenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalClients = Math.max(...monthlyRevenueData.map((item) => item.clients))
  const totalWorkflows = Math.max(...monthlyRevenueData.map((item) => item.workflows))
  const avgSuccessRate =
    workflowPerformanceData.reduce((sum, item) => sum + item.successRate, 0) / workflowPerformanceData.length

  const revenueGrowth =
    ((monthlyRevenueData[5].revenue - monthlyRevenueData[0].revenue) / monthlyRevenueData[0].revenue) * 100
  const clientGrowth =
    ((monthlyRevenueData[5].clients - monthlyRevenueData[0].clients) / monthlyRevenueData[0].clients) * 100

  return (
    <ProviderLayout>
      <div className="p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
              <p className="text-slate-600 mt-2">Comprehensive insights into platform performance and growth</p>
            </div>
            <div className="flex space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />+{revenueGrowth.toFixed(1)}% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{totalClients}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />+{clientGrowth.toFixed(1)}% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Workflows</CardTitle>
              <Workflow className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{totalWorkflows}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +16.7% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Avg Success Rate</CardTitle>
              <Target className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{avgSuccessRate.toFixed(1)}%</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.3% from last period
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="errors">Error Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Revenue Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                      <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Marketplace Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="w-5 h-5 mr-2" />
                    Marketplace Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={marketplaceDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {marketplaceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Performing Workflows */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Top Performing Workflows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Workflow Name</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Runs</TableHead>
                      <TableHead>Success Rate</TableHead>
                      <TableHead>Avg Duration</TableHead>
                      <TableHead>Revenue Impact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topWorkflowsData.map((workflow) => (
                      <TableRow key={workflow.id}>
                        <TableCell className="font-medium">{workflow.name}</TableCell>
                        <TableCell>{workflow.client}</TableCell>
                        <TableCell>{workflow.runs.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={workflow.successRate} className="w-16" />
                            <span className="text-sm">{workflow.successRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{workflow.avgDuration}</TableCell>
                        <TableCell className="font-medium text-green-600">${workflow.revenue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Monthly Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                      <Bar dataKey="revenue" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">MRR Growth</span>
                      <span className="text-sm text-green-600">+{revenueGrowth.toFixed(1)}%</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Client Retention</span>
                      <span className="text-sm text-green-600">94.2%</span>
                    </div>
                    <Progress value={94.2} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">ARPU</span>
                      <span className="text-sm">$1,578</span>
                    </div>
                    <Progress value={65} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Churn Rate</span>
                      <span className="text-sm text-red-600">5.8%</span>
                    </div>
                    <Progress value={5.8} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Performance Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={workflowPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      formatter={(value, name) => [
                        name === "successRate" ? `${value}%` : value.toLocaleString(),
                        name === "successRate" ? "Success Rate" : name === "totalRuns" ? "Total Runs" : "Errors",
                      ]}
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="successRate" stroke="#10b981" name="Success Rate" />
                    <Line yAxisId="right" type="monotone" dataKey="totalRuns" stroke="#6366f1" name="Total Runs" />
                    <Line yAxisId="right" type="monotone" dataKey="errors" stroke="#ef4444" name="Errors" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
                  <Activity className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">9,280</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4s</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -8% from last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2%</div>
                  <p className="text-xs text-red-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.5% from last period
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Client Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client Name</TableHead>
                      <TableHead>Monthly Revenue</TableHead>
                      <TableHead>Workflows</TableHead>
                      <TableHead>Success Rate</TableHead>
                      <TableHead>Total Runs</TableHead>
                      <TableHead>Growth</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientPerformanceData.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell className="font-medium text-green-600">${client.revenue.toLocaleString()}</TableCell>
                        <TableCell>{client.workflows}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={client.successRate} className="w-16" />
                            <span className="text-sm">{client.successRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{client.totalRuns.toLocaleString()}</TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center ${client.growth >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {client.growth >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(client.growth).toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={client.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Client Growth Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="clients" stroke="#6366f1" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Health Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Active Clients</span>
                      <span className="text-sm text-green-600">16</span>
                    </div>
                    <Progress value={88.9} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Trial Clients</span>
                      <span className="text-sm text-blue-600">1</span>
                    </div>
                    <Progress value={5.6} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Suspended</span>
                      <span className="text-sm text-red-600">1</span>
                    </div>
                    <Progress value={5.6} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="errors" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Error Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={errorAnalysisData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#ef4444"
                        dataKey="count"
                        label={({ category, percentage }) => `${category}: ${percentage}%`}
                      >
                        {errorAnalysisData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Error Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {errorAnalysisData.map((error, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{error.category}</span>
                          <span className="text-sm text-red-600">{error.count} errors</span>
                        </div>
                        <Progress value={error.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Error Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={workflowPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      formatter={(value) => [value.toLocaleString(), "Errors"]}
                    />
                    <Area type="monotone" dataKey="errors" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProviderLayout>
  )
}
