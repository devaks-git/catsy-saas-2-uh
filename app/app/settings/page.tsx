"use client"

import type React from "react"

import { useState } from "react"
import { ClientLayout } from "@/components/layouts/client-layout"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User, Building, CreditCard, Bell, Shield, Key, Download, Eye, EyeOff, Copy, Trash2, Plus } from "lucide-react"

const billingHistory = [
  {
    id: 1,
    date: "2024-01-01",
    amount: "$299.00",
    status: "paid",
    invoice: "INV-2024-001",
    plan: "Professional",
  },
  {
    id: 2,
    date: "2023-12-01",
    amount: "$299.00",
    status: "paid",
    invoice: "INV-2023-012",
    plan: "Professional",
  },
  {
    id: 3,
    date: "2023-11-01",
    amount: "$299.00",
    status: "paid",
    invoice: "INV-2023-011",
    plan: "Professional",
  },
]

const apiKeys = [
  {
    id: 1,
    name: "Production API Key",
    key: "sk_live_51H7...",
    created: "2024-01-15",
    lastUsed: "2024-01-20",
    status: "active",
  },
  {
    id: 2,
    name: "Development API Key",
    key: "sk_test_51H7...",
    created: "2024-01-10",
    lastUsed: "2024-01-19",
    status: "active",
  },
]

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState<{ [key: number]: boolean }>({})
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [notifications, setNotifications] = useState({
    workflowUpdates: true,
    billingAlerts: true,
    securityAlerts: true,
    marketingEmails: false,
  })

  const toggleApiKeyVisibility = (keyId: number) => {
    setShowApiKey((prev) => ({ ...prev, [keyId]: !prev[keyId] }))
  }

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key)
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match")
      return
    }
    // Handle password change logic here
    console.log("Password change attempt")
    // Reset form
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    alert("Password updated successfully!")
  }

  return (
    <ClientLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-slate-600 mt-2">Manage your account preferences and settings</p>
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
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              API Keys
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
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
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
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
                  <Input id="companyName" defaultValue="TechBrand Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue="technology">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://techbrand.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    defaultValue="123 Business St, Suite 100&#10;New York, NY 10001&#10;United States"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID</Label>
                    <Input id="taxId" defaultValue="12-3456789" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employees">Number of Employees</Label>
                    <Select defaultValue="50-200">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10</SelectItem>
                        <SelectItem value="11-50">11-50</SelectItem>
                        <SelectItem value="50-200">50-200</SelectItem>
                        <SelectItem value="200+">200+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <div className="space-y-6">
              {/* Current Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Professional Plan</h3>
                      <p className="text-slate-600">$299/month • Billed monthly</p>
                      <p className="text-sm text-slate-500 mt-1">Next billing date: February 1, 2024</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="outline">Cancel Subscription</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Available Plans */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Plans</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold">Basic</h4>
                      <p className="text-2xl font-bold mt-2">
                        $99<span className="text-sm font-normal">/month</span>
                      </p>
                      <ul className="text-sm text-slate-600 mt-4 space-y-1">
                        <li>• Up to 5 workflows</li>
                        <li>• 2 marketplaces</li>
                        <li>• Basic support</li>
                      </ul>
                      <Button variant="outline" className="w-full mt-4 bg-transparent">
                        Downgrade
                      </Button>
                    </div>
                    <div className="border-2 border-indigo-600 rounded-lg p-4 relative">
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-indigo-600">
                        Current
                      </Badge>
                      <h4 className="font-semibold">Professional</h4>
                      <p className="text-2xl font-bold mt-2">
                        $299<span className="text-sm font-normal">/month</span>
                      </p>
                      <ul className="text-sm text-slate-600 mt-4 space-y-1">
                        <li>• Up to 25 workflows</li>
                        <li>• All marketplaces</li>
                        <li>• Priority support</li>
                        <li>• Advanced analytics</li>
                      </ul>
                      <Button disabled className="w-full mt-4">
                        Current Plan
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold">Enterprise</h4>
                      <p className="text-2xl font-bold mt-2">
                        $599<span className="text-sm font-normal">/month</span>
                      </p>
                      <ul className="text-sm text-slate-600 mt-4 space-y-1">
                        <li>• Unlimited workflows</li>
                        <li>• All marketplaces</li>
                        <li>• 24/7 support</li>
                        <li>• Custom integrations</li>
                      </ul>
                      <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">Upgrade</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing History */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Invoice</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {billingHistory.map((bill) => (
                        <TableRow key={bill.id}>
                          <TableCell>{bill.date}</TableCell>
                          <TableCell>{bill.amount}</TableCell>
                          <TableCell>{bill.plan}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">{bill.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              {bill.invoice}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
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
                    <Label htmlFor="workflowUpdates">Workflow Updates</Label>
                    <p className="text-sm text-slate-600">Get notified when workflows complete or fail</p>
                  </div>
                  <Switch
                    id="workflowUpdates"
                    checked={notifications.workflowUpdates}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, workflowUpdates: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="billingAlerts">Billing Alerts</Label>
                    <p className="text-sm text-slate-600">Receive notifications about billing and payments</p>
                  </div>
                  <Switch
                    id="billingAlerts"
                    checked={notifications.billingAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, billingAlerts: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="securityAlerts">Security Alerts</Label>
                    <p className="text-sm text-slate-600">Important security notifications and login alerts</p>
                  </div>
                  <Switch
                    id="securityAlerts"
                    checked={notifications.securityAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, securityAlerts: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-slate-600">Product updates, tips, and promotional content</p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, marketingEmails: checked }))}
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
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter your current password"
                          className="w-full pr-10"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          className="w-full pr-10"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your new password"
                          className="w-full pr-10"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                      Update Password
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-factor authentication is disabled</p>
                      <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                    </div>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">Enable 2FA</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Login Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-slate-600">Chrome on macOS • New York, NY</p>
                        <p className="text-xs text-slate-500">Last active: Now</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Mobile Session</p>
                        <p className="text-sm text-slate-600">Safari on iOS • New York, NY</p>
                        <p className="text-xs text-slate-500">Last active: 2 hours ago</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>API Keys</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-indigo-600 hover:bg-indigo-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Create API Key
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New API Key</DialogTitle>
                        <DialogDescription>
                          Create a new API key for integrating with external services
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="keyName">Key Name</Label>
                          <Input id="keyName" placeholder="e.g., Production Integration" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="keyDescription">Description (Optional)</Label>
                          <Textarea id="keyDescription" placeholder="Describe what this key will be used for" />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-indigo-600 hover:bg-indigo-700">Create Key</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{apiKey.name}</h4>
                          <Badge className="bg-green-100 text-green-800">{apiKey.status}</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <code className="text-sm bg-slate-100 px-2 py-1 rounded">
                            {showApiKey[apiKey.id] ? apiKey.key : "sk_live_••••••••••••••••"}
                          </code>
                          <Button variant="ghost" size="sm" onClick={() => toggleApiKeyVisibility(apiKey.id)}>
                            {showApiKey[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => copyApiKey(apiKey.key)}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          Created: {apiKey.created} • Last used: {apiKey.lastUsed}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClientLayout>
  )
}
