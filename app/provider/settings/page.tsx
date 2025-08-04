"use client"

import { useState } from "react"
import { ProviderLayout } from "@/components/layouts/provider-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  User,
  Building,
  Settings,
  Zap,
  Bell,
  Shield,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Cloud,
  Mail,
  MessageSquare,
  Download,
  CreditCard,
} from "lucide-react"

const systemMetrics = {
  totalClients: 1247,
  activeWorkflows: 3892,
  uptime: "99.9%",
  apiRequests: "2.4M",
}

const integrationStatus = {
  aws: { status: "connected", lastSync: "2024-01-20 14:30:00" },
  stripe: { status: "connected", lastSync: "2024-01-20 14:25:00" },
  sendgrid: { status: "connected", lastSync: "2024-01-20 14:20:00" },
  slack: { status: "disconnected", lastSync: "Never" },
}

const auditLogs = [
  {
    id: 1,
    timestamp: "2024-01-20 14:30:00",
    user: "admin@catsy.com",
    action: "User login",
    details: "Successful login from 192.168.1.100",
    severity: "info",
  },
  {
    id: 2,
    timestamp: "2024-01-20 14:25:00",
    user: "system",
    action: "Backup completed",
    details: "Daily system backup completed successfully",
    severity: "info",
  },
  {
    id: 3,
    timestamp: "2024-01-20 14:20:00",
    user: "admin@catsy.com",
    action: "Settings updated",
    details: "System configuration updated: maintenance mode disabled",
    severity: "warning",
  },
  {
    id: 4,
    timestamp: "2024-01-20 14:15:00",
    user: "client@techbrand.com",
    action: "Workflow created",
    details: "New workflow 'TechBrand Gaming Products' created",
    severity: "info",
  },
]

export default function ProviderSettingsPage() {
  const [systemConfig, setSystemConfig] = useState({
    maintenanceMode: false,
    autoApproval: true,
    debugMode: false,
    backupEnabled: true,
  })

  const [notifications, setNotifications] = useState({
    clientSignups: true,
    systemAlerts: true,
    dailyReports: true,
    securityAlerts: true,
  })

  return (
    <ProviderLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-slate-600 mt-2">Manage platform settings and configurations</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Company
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              System
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Administrator Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Admin" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="User" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="admin@catsy.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 987-6543" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="est">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                        <SelectItem value="cst">Central Time (CST)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Platform Administrator" disabled />
                  </div>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Tab */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Catsy Platform Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://catsy.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input id="supportEmail" defaultValue="support@catsy.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    defaultValue="456 Platform Ave, Suite 200&#10;San Francisco, CA 94105&#10;United States"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID</Label>
                    <Input id="taxId" defaultValue="98-7654321" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">Business License</Label>
                    <Input id="license" defaultValue="BL-2024-SF-001" />
                  </div>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system">
            <div className="space-y-6">
              {/* System Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>System Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{systemMetrics.totalClients}</div>
                      <div className="text-sm text-slate-600">Total Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{systemMetrics.activeWorkflows}</div>
                      <div className="text-sm text-slate-600">Active Workflows</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{systemMetrics.uptime}</div>
                      <div className="text-sm text-slate-600">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{systemMetrics.apiRequests}</div>
                      <div className="text-sm text-slate-600">API Requests/Month</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                      <p className="text-sm text-slate-600">Temporarily disable platform access for maintenance</p>
                    </div>
                    <Switch
                      id="maintenanceMode"
                      checked={systemConfig.maintenanceMode}
                      onCheckedChange={(checked) => setSystemConfig((prev) => ({ ...prev, maintenanceMode: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoApproval">Auto-approve New Clients</Label>
                      <p className="text-sm text-slate-600">Automatically approve new client registrations</p>
                    </div>
                    <Switch
                      id="autoApproval"
                      checked={systemConfig.autoApproval}
                      onCheckedChange={(checked) => setSystemConfig((prev) => ({ ...prev, autoApproval: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="debugMode">Debug Mode</Label>
                      <p className="text-sm text-slate-600">Enable detailed logging for troubleshooting</p>
                    </div>
                    <Switch
                      id="debugMode"
                      checked={systemConfig.debugMode}
                      onCheckedChange={(checked) => setSystemConfig((prev) => ({ ...prev, debugMode: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="backupEnabled">Automated Backups</Label>
                      <p className="text-sm text-slate-600">Enable daily automated system backups</p>
                    </div>
                    <Switch
                      id="backupEnabled"
                      checked={systemConfig.backupEnabled}
                      onCheckedChange={(checked) => setSystemConfig((prev) => ({ ...prev, backupEnabled: checked }))}
                    />
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Save Configuration</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>External Integrations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Cloud className="w-8 h-8 text-orange-600" />
                      <div>
                        <h4 className="font-medium">AWS Services</h4>
                        <p className="text-sm text-slate-600">S3, Lambda, RDS</p>
                        <p className="text-xs text-slate-500">Last sync: {integrationStatus.aws.lastSync}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-8 h-8 text-purple-600" />
                      <div>
                        <h4 className="font-medium">Stripe</h4>
                        <p className="text-sm text-slate-600">Payment processing</p>
                        <p className="text-xs text-slate-500">Last sync: {integrationStatus.stripe.lastSync}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">SendGrid</h4>
                        <p className="text-sm text-slate-600">Email delivery</p>
                        <p className="text-xs text-slate-500">Last sync: {integrationStatus.sendgrid.lastSync}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-8 h-8 text-green-600" />
                      <div>
                        <h4 className="font-medium">Slack</h4>
                        <p className="text-sm text-slate-600">Team notifications</p>
                        <p className="text-xs text-slate-500">Last sync: {integrationStatus.slack.lastSync}</p>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-800">
                      <XCircle className="w-3 h-3 mr-1" />
                      Disconnected
                    </Badge>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Configure Integrations</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="clientSignups">Client Signups</Label>
                    <p className="text-sm text-slate-600">Get notified when new clients register</p>
                  </div>
                  <Switch
                    id="clientSignups"
                    checked={notifications.clientSignups}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, clientSignups: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemAlerts">System Alerts</Label>
                    <p className="text-sm text-slate-600">Critical system notifications and errors</p>
                  </div>
                  <Switch
                    id="systemAlerts"
                    checked={notifications.systemAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, systemAlerts: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dailyReports">Daily Reports</Label>
                    <p className="text-sm text-slate-600">Daily platform usage and performance reports</p>
                  </div>
                  <Switch
                    id="dailyReports"
                    checked={notifications.dailyReports}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, dailyReports: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="securityAlerts">Security Alerts</Label>
                    <p className="text-sm text-slate-600">Security incidents and login anomalies</p>
                  </div>
                  <Switch
                    id="securityAlerts"
                    checked={notifications.securityAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, securityAlerts: checked }))}
                  />
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Administrator Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Audit Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-slate-600">Recent system activity and user actions</p>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Logs
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Severity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {auditLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell className="text-sm">{log.timestamp}</TableCell>
                            <TableCell className="text-sm">{log.user}</TableCell>
                            <TableCell className="text-sm">{log.action}</TableCell>
                            <TableCell className="text-sm">{log.details}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  log.severity === "info"
                                    ? "bg-blue-100 text-blue-800"
                                    : log.severity === "warning"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }
                              >
                                {log.severity === "info" && <Activity className="w-3 h-3 mr-1" />}
                                {log.severity === "warning" && <AlertTriangle className="w-3 h-3 mr-1" />}
                                {log.severity === "error" && <XCircle className="w-3 h-3 mr-1" />}
                                {log.severity}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProviderLayout>
  )
}
