"use client"

import { useState } from "react"
import { ClientLayout } from "@/components/layouts/client-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  UserPlus,
  Users,
  Shield,
  Mail,
  Phone,
  MoreHorizontal,
  Trash2,
  Edit,
  Crown,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Eye,
  Send,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@company.com",
    phone: "+1 (555) 123-4567",
    role: "Admin",
    status: "active",
    joinDate: "2023-08-15",
    lastActivity: "2024-01-15 14:30:00",
    permissions: ["all"],
    avatar: "JD",
    department: "Management",
    isOwner: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@company.com",
    phone: "+1 (555) 234-5678",
    role: "Editor",
    status: "active",
    joinDate: "2023-09-22",
    lastActivity: "2024-01-15 11:20:00",
    permissions: ["manage_workflows", "view_analytics", "edit_settings"],
    avatar: "JS",
    department: "Operations",
    isOwner: false,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@company.com",
    phone: "+1 (555) 345-6789",
    role: "Analyst",
    status: "active",
    joinDate: "2023-11-10",
    lastActivity: "2024-01-15 09:45:00",
    permissions: ["view_workflows", "view_analytics", "view_files"],
    avatar: "MJ",
    department: "Analytics",
    isOwner: false,
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@company.com",
    phone: "+1 (555) 456-7890",
    role: "Editor",
    status: "pending",
    joinDate: "2024-01-10",
    lastActivity: "Never",
    permissions: ["manage_workflows", "view_analytics"],
    avatar: "SW",
    department: "Operations",
    isOwner: false,
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@company.com",
    phone: "+1 (555) 567-8901",
    role: "Analyst",
    status: "inactive",
    joinDate: "2023-10-15",
    lastActivity: "2024-01-05 16:20:00",
    permissions: ["view_workflows", "view_analytics"],
    avatar: "DB",
    department: "Analytics",
    isOwner: false,
  },
]

const pendingInvitations = [
  {
    id: 1,
    email: "alex.garcia@company.com",
    role: "Editor",
    invitedBy: "John Doe",
    inviteDate: "2024-01-12",
    expiresAt: "2024-01-19",
    status: "pending",
  },
  {
    id: 2,
    email: "lisa.chen@company.com",
    role: "Analyst",
    invitedBy: "John Doe",
    inviteDate: "2024-01-10",
    expiresAt: "2024-01-17",
    status: "expired",
  },
]

const rolePermissions = {
  Admin: {
    description: "Full access to all features and team management",
    permissions: [
      "Manage all team members",
      "Access all workflows and analytics",
      "Request new workflows",
      "Manage generated files",
      "Configure account settings",
      "Billing and subscription management",
    ],
    color: "bg-purple-100 text-purple-800",
  },
  Editor: {
    description: "Can manage workflows and access most features",
    permissions: [
      "Manage existing workflows",
      "Request new workflows",
      "Access workflow analytics",
      "Download generated files",
      "View team information",
    ],
    color: "bg-blue-100 text-blue-800",
  },
  Analyst: {
    description: "Read-only access to workflows and analytics",
    permissions: [
      "View all workflows",
      "Access analytics and reports",
      "Download generated files",
      "View team information",
    ],
    color: "bg-green-100 text-green-800",
  },
}

function StatusBadge({ status }: { status: string }) {
  const variants = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    inactive: "bg-gray-100 text-gray-800",
    suspended: "bg-red-100 text-red-800",
  }

  const icons = {
    active: CheckCircle,
    pending: Clock,
    inactive: XCircle,
    suspended: AlertTriangle,
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

function RoleBadge({ role }: { role: string }) {
  const config = rolePermissions[role as keyof typeof rolePermissions]
  return <Badge className={config?.color || "bg-gray-100 text-gray-800"}>{role}</Badge>
}

function InviteStatusBadge({ status }: { status: string }) {
  const variants = {
    pending: "bg-yellow-100 text-yellow-800",
    expired: "bg-red-100 text-red-800",
    accepted: "bg-green-100 text-green-800",
  }

  return <Badge className={variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"}>{status}</Badge>
}

export default function TeamPage() {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<(typeof teamMembers)[0] | null>(null)
  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "",
    department: "",
    message: "",
    sendWelcomeEmail: true,
  })
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    status: "",
  })

  const activeMembers = teamMembers.filter((m) => m.status === "active").length
  const pendingMembers = teamMembers.filter((m) => m.status === "pending").length
  const totalInvites = pendingInvitations.length

  const handleInviteMember = () => {
    console.log("Inviting member:", inviteForm)
    setInviteForm({
      email: "",
      role: "",
      department: "",
      message: "",
      sendWelcomeEmail: true,
    })
    setIsInviteDialogOpen(false)
  }

  const handleEditMember = (member: (typeof teamMembers)[0]) => {
    setSelectedMember(member)
    setEditForm({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      department: member.department,
      status: member.status,
    })
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    console.log("Saving member edit:", selectedMember?.id, editForm)
    setIsEditDialogOpen(false)
  }

  const handleViewPermissions = (member: (typeof teamMembers)[0]) => {
    setSelectedMember(member)
    setIsPermissionsDialogOpen(true)
  }

  const handleRemoveMember = (memberId: number) => {
    console.log("Removing member:", memberId)
  }

  const handleResendInvite = (inviteId: number) => {
    console.log("Resending invite:", inviteId)
  }

  const handleCancelInvite = (inviteId: number) => {
    console.log("Canceling invite:", inviteId)
  }

  return (
    <ClientLayout>
      <div className="p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Manage Team</h1>
              <p className="text-slate-600 mt-2">Invite and manage team members with role-based access control</p>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setIsInviteDialogOpen(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Team Member
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Members</CardTitle>
              <Users className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{teamMembers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Members</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{activeMembers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Pending Invites</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{pendingMembers + totalInvites}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Roles</CardTitle>
              <Shield className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{Object.keys(rolePermissions).length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="invitations">Pending Invitations</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {member.avatar}
                            </div>
                            <div>
                              <div className="font-medium flex items-center">
                                {member.name}
                                {member.isOwner && <Crown className="w-4 h-4 ml-2 text-yellow-500" />}
                              </div>
                              <div className="text-sm text-slate-500">
                                Joined {new Date(member.joinDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="flex items-center text-sm">
                              <Mail className="w-4 h-4 mr-2 text-slate-400" />
                              {member.email}
                            </div>
                            <div className="flex items-center text-sm text-slate-500 mt-1">
                              <Phone className="w-4 h-4 mr-2 text-slate-400" />
                              {member.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <RoleBadge role={member.role} />
                        </TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>
                          <StatusBadge status={member.status} />
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {member.lastActivity !== "Never"
                              ? new Date(member.lastActivity).toLocaleDateString()
                              : "Never"}
                          </div>
                          {member.lastActivity !== "Never" && (
                            <div className="text-xs text-slate-500">
                              {new Date(member.lastActivity).toLocaleTimeString()}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline" onClick={() => handleViewPermissions(member)}>
                              <Eye className="h-3 w-3" />
                            </Button>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline" disabled={member.isOwner}>
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditMember(member)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Member
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Send className="w-4 h-4 mr-2" />
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleRemoveMember(member.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remove Member
                                </DropdownMenuItem>
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
          </TabsContent>

          <TabsContent value="invitations">
            <Card>
              <CardHeader>
                <CardTitle>Pending Invitations</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Invited By</TableHead>
                      <TableHead>Invite Date</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingInvitations.map((invite) => (
                      <TableRow key={invite.id}>
                        <TableCell className="font-medium">{invite.email}</TableCell>
                        <TableCell>
                          <RoleBadge role={invite.role} />
                        </TableCell>
                        <TableCell>{invite.invitedBy}</TableCell>
                        <TableCell>{new Date(invite.inviteDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(invite.expiresAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <InviteStatusBadge status={invite.status} />
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleResendInvite(invite.id)}>
                              <Send className="h-3 w-3 mr-1" />
                              Resend
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleCancelInvite(invite.id)}>
                              <XCircle className="h-3 w-3 mr-1" />
                              Cancel
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

          <TabsContent value="roles">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {Object.entries(rolePermissions).map(([role, config]) => (
                <Card key={role}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      {role}
                    </CardTitle>
                    <p className="text-sm text-slate-600">{config.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Permissions:</h4>
                      <ul className="space-y-1">
                        {config.permissions.map((permission, index) => (
                          <li key={index} className="text-sm text-slate-600 flex items-center">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                            {permission}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Invite Member Dialog */}
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>Send an invitation to join your team with specific role permissions</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select
                    value={inviteForm.role}
                    onValueChange={(value) => setInviteForm({ ...inviteForm, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Analyst">Analyst</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={inviteForm.department}
                  onValueChange={(value) => setInviteForm({ ...inviteForm, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Welcome Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Add a personal welcome message..."
                  rows={3}
                  value={inviteForm.message}
                  onChange={(e) => setInviteForm({ ...inviteForm, message: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="welcomeEmail"
                  checked={inviteForm.sendWelcomeEmail}
                  onCheckedChange={(checked) => setInviteForm({ ...inviteForm, sendWelcomeEmail: checked })}
                />
                <Label htmlFor="welcomeEmail">Send welcome email with platform overview</Label>
              </div>

              {inviteForm.role && (
                <div className="bg-slate-50 p-4 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Role Permissions: {inviteForm.role}</h4>
                  <ul className="space-y-1">
                    {rolePermissions[inviteForm.role as keyof typeof rolePermissions]?.permissions.map(
                      (permission, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-center">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                          {permission}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700"
                  onClick={handleInviteMember}
                  disabled={!inviteForm.email || !inviteForm.role}
                >
                  Send Invitation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Member Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Team Member</DialogTitle>
              <DialogDescription>Update member information and permissions</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editName">Full Name</Label>
                  <Input
                    id="editName"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEmail">Email Address</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editPhone">Phone Number</Label>
                  <Input
                    id="editPhone"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editDepartment">Department</Label>
                  <Select
                    value={editForm.department}
                    onValueChange={(value) => setEditForm({ ...editForm, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Analytics">Analytics</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editRole">Role</Label>
                  <Select value={editForm.role} onValueChange={(value) => setEditForm({ ...editForm, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Analyst">Analyst</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStatus">Status</Label>
                  <Select
                    value={editForm.status}
                    onValueChange={(value) => setEditForm({ ...editForm, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleSaveEdit}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Permissions Dialog */}
        <Dialog open={isPermissionsDialogOpen} onOpenChange={setIsPermissionsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                {selectedMember?.name} - Permissions
              </DialogTitle>
              <DialogDescription>Current role permissions and access levels</DialogDescription>
            </DialogHeader>
            {selectedMember && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{selectedMember.role}</h3>
                    <p className="text-sm text-slate-600">
                      {rolePermissions[selectedMember.role as keyof typeof rolePermissions]?.description}
                    </p>
                  </div>
                  <RoleBadge role={selectedMember.role} />
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Permissions:</h4>
                  <div className="space-y-2">
                    {rolePermissions[selectedMember.role as keyof typeof rolePermissions]?.permissions.map(
                      (permission, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                          {permission}
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => setIsPermissionsDialogOpen(false)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ClientLayout>
  )
}
