"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, CheckCircle, Users, Rocket, ArrowRight, Upload, Settings, Download, Menu, X } from "lucide-react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header / Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-slate-800">Catsy</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#how-it-works" className="text-slate-600 hover:text-slate-900 font-medium">
                How it Works
              </Link>
              <Link href="#who-its-for" className="text-slate-600 hover:text-slate-900 font-medium">
                Who it's for
              </Link>
              <Link href="#pricing" className="text-slate-600 hover:text-slate-900 font-medium">
                Pricing
              </Link>
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
                <Link href="/signup">Get Started for Free</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200 py-4">
              <div className="flex flex-col space-y-4">
                <Link
                  href="#how-it-works"
                  className="text-slate-600 hover:text-slate-900 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How it Works
                </Link>
                <Link
                  href="#who-its-for"
                  className="text-slate-600 hover:text-slate-900 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Who it's for
                </Link>
                <Link
                  href="#pricing"
                  className="text-slate-600 hover:text-slate-900 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-slate-200">
                  <Button variant="outline" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
                    <Link href="/signup">Get Started for Free</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Stop Drowning in <span className="text-indigo-600">Spreadsheets</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Catsy is a managed listing-automation platform that eliminates manual spreadsheet labor for e-commerce
              brands on Amazon, Flipkart, and more. Get ready-to-upload listing files, fast.
            </p>
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-4 h-auto" asChild>
              <Link href="/signup">
                Sign Up and Automate Your First Listing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-2xl p-8 lg:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Before: Messy Spreadsheet */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-700 mb-4">Before: Manual Chaos</h3>
                  <div className="bg-white rounded-lg shadow-md p-6 border-2 border-red-200">
                    <div className="space-y-2">
                      <div className="h-3 bg-red-100 rounded w-full"></div>
                      <div className="h-3 bg-red-100 rounded w-3/4"></div>
                      <div className="h-3 bg-red-100 rounded w-5/6"></div>
                      <div className="h-3 bg-red-100 rounded w-2/3"></div>
                    </div>
                    <div className="mt-4 text-xs text-red-600 font-medium">
                      Hours of manual work, errors, frustration
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowRight className="h-8 w-8 text-indigo-600" />
                </div>

                {/* After: Clean Marketplace Logos */}
                <div className="text-center md:order-last">
                  <h3 className="text-lg font-semibold text-slate-700 mb-4">After: Automated Success</h3>
                  <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-200">
                    <div className="flex justify-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        AMZ
                      </div>
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        FK
                      </div>
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        MYN
                      </div>
                    </div>
                    <div className="text-xs text-green-600 font-medium">Perfect listings in minutes, not hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who is it for Section */}
      <section id="who-its-for" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Built for the Heroes of E-commerce</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Whether you're managing catalogs, running an agency, or working as a freelancer, Catsy is designed for
              your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Catalog Manager */}
            <Card className="card-shadow card-no-border bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Catalog Owner Riya</h3>
                <p className="text-slate-600 leading-relaxed">
                  Need ready-to-upload listing files delivered consistently without the manual data work? We've got you
                  covered.
                </p>
              </CardContent>
            </Card>

            {/* Card 2: Agency Manager */}
            <Card className="card-shadow card-no-border bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Account Manager Arjun</h3>
                <p className="text-slate-600 leading-relaxed">
                  Manage multiple brands with a reliable, multi-client system and a guaranteed SLA.
                </p>
              </CardContent>
            </Card>

            {/* Card 3: Freelance VA */}
            <Card className="card-shadow card-no-border bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Rocket className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Solo Operator Meera</h3>
                <p className="text-slate-600 leading-relaxed">
                  Offload time-consuming data mapping to focus on higher-value consulting for your clients.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              From Chaos to Control in 3 Simple Steps
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our streamlined process gets you from manual spreadsheet work to automated listing generation in no time.
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-200 transform -translate-y-1/2"></div>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 card-shadow card-no-border hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute top-8 left-8 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Sign Up & Request</h3>
                  <p className="text-slate-600 text-center leading-relaxed">
                    Join the platform and submit a request for a new workflow, telling us your brands and marketplaces.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 card-shadow card-no-border hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                    <Settings className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute top-8 left-8 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">We Build Your Automations</h3>
                  <p className="text-slate-600 text-center leading-relaxed">
                    Our expert team builds the bespoke automation that connects your master data to the marketplace
                    templates.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 card-shadow card-no-border hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute top-8 left-8 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Run & Download</h3>
                  <p className="text-slate-600 text-center leading-relaxed">
                    Upload your product data, run the workflow from your dashboard, and download perfectly formatted
                    listing files in minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Reclaim Your Time?</h2>
          <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
            Become the "Zapier + FBA bulk-upload template" for your business. Simple, reliable, and extremely fast.
          </p>
          <Button
            size="lg"
            className="bg-white text-indigo-600 hover:bg-slate-50 text-lg px-12 py-4 h-auto font-semibold"
            asChild
          >
            <Link href="/signup">
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Column 1: Logo and Mission */}
            <div>
              <div className="flex items-center mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold">Catsy</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Eliminating manual spreadsheet labor for e-commerce brands with intelligent listing automation.
              </p>
            </div>

            {/* Column 2: Product Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#how-it-works" className="text-slate-400 hover:text-white transition-colors">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="#who-its-for" className="text-slate-400 hover:text-white transition-colors">
                    Who it's for
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-slate-400 hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="text-slate-400 hover:text-white transition-colors">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-400">© 2025 Nexen Labs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
