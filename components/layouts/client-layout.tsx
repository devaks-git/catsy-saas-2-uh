"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  LayoutDashboard,
  Plus,
  Workflow,
  FileText,
  Users,
  Settings,
  Search,
  ChevronDown,
  User,
  LogOut,
  Bell,
  File,
  UserCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { name: "Create Listings", href: "/app/create-listings", icon: Plus },
  { name: "Workflows", href: "/app/workflows", icon: Workflow },
  { name: "Generated Files", href: "/app/files", icon: FileText },
  { name: "Team", href: "/app/team", icon: Users },
  { name: "Account Settings", href: "/app/settings", icon: Settings },
]

// Mock search results data
const searchResults = [
  {
    type: "workflow",
    title: "TechBrand Electronics",
    description: "Electronics workflow for Amazon, Flipkart",
    href: "/app/workflows",
    icon: Workflow,
  },
  {
    type: "file",
    title: "electronics_products_jan2025.csv",
    description: "Generated 2 hours ago",
    href: "/app/files",
    icon: File,
  },
  {
    type: "team",
    title: "Sarah Johnson",
    description: "Product Analyst",
    href: "/app/team",
    icon: UserCheck,
  },
  {
    type: "workflow",
    title: "FashionCorp Apparel",
    description: "Apparel workflow for Myntra, Ajio",
    href: "/app/workflows",
    icon: Workflow,
  },
]

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResults = searchResults.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 flex flex-col" style={{ backgroundColor: "#ecf2fa" }}>
        {/* Logo */}
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-slate-800">Catsy</span>
          </div>
        </div>

        {/* Request New Workflow Button */}
        <div className="px-6 pb-4">
          <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
            <Link href="/app/requests/new">
              <Plus className="mr-2 h-4 w-4" />
              Request New Workflow
            </Link>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 pb-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-200 hover:text-slate-900",
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-6 border-t border-slate-300">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-700 hover:bg-slate-200 hover:text-slate-900"
              >
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-slate-500">john@company.com</p>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/app/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Built by Nexen Labs */}
        <div className="px-6 pb-4">
          <p className="text-xs text-slate-500 text-center">Built by Nexen Labs</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex h-16 items-center justify-between px-8">
            <div className="flex items-center space-x-4">{/* Breadcrumb or page title could go here */}</div>

            <div className="flex items-center space-x-4">
              {/* Global Search */}
              <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={searchOpen}
                    className="w-80 justify-start text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 bg-transparent"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search...
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <Command>
                    <CommandInput
                      placeholder="Search workflows, files, team..."
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                    />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      {searchQuery && (
                        <>
                          <CommandGroup heading="Workflows">
                            {filteredResults
                              .filter((item) => item.type === "workflow")
                              .map((item) => (
                                <CommandItem
                                  key={item.title}
                                  onSelect={() => {
                                    setSearchOpen(false)
                                    setSearchQuery("")
                                  }}
                                >
                                  <item.icon className="mr-2 h-4 w-4" />
                                  <div className="flex flex-col">
                                    <span className="font-medium">{item.title}</span>
                                    <span className="text-xs text-slate-500">{item.description}</span>
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                          <CommandGroup heading="Files">
                            {filteredResults
                              .filter((item) => item.type === "file")
                              .map((item) => (
                                <CommandItem
                                  key={item.title}
                                  onSelect={() => {
                                    setSearchOpen(false)
                                    setSearchQuery("")
                                  }}
                                >
                                  <item.icon className="mr-2 h-4 w-4" />
                                  <div className="flex flex-col">
                                    <span className="font-medium">{item.title}</span>
                                    <span className="text-xs text-slate-500">{item.description}</span>
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                          <CommandGroup heading="Team">
                            {filteredResults
                              .filter((item) => item.type === "team")
                              .map((item) => (
                                <CommandItem
                                  key={item.title}
                                  onSelect={() => {
                                    setSearchOpen(false)
                                    setSearchQuery("")
                                  }}
                                >
                                  <item.icon className="mr-2 h-4 w-4" />
                                  <div className="flex flex-col">
                                    <span className="font-medium">{item.title}</span>
                                    <span className="text-xs text-slate-500">{item.description}</span>
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">3</Badge>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
