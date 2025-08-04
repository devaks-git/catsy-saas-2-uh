"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Clock, FileText, ArrowLeft, Mail } from "lucide-react"

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Navigation back to landing page */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Catsy</span>
          </Link>
        </div>

        <Card className="text-center">
          <CardHeader className="pb-6">
            {/* Catsy Logo */}
            <div className="flex justify-center mb-4">
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </Link>
            </div>

            {/* Status Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-slate-900">Your Account is Under Review</h1>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-slate-600 leading-relaxed">
              Thank you for signing up. An account manager will approve your request within 24 hours.
              {"We'll"} notify you by email once {"it's"} ready.
            </p>

            {/* Contact Options */}
            <div className="border-t pt-6">
              <p className="text-sm text-slate-500 mb-4">Need faster approval or have questions?</p>

              {/* Improved Email Support Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:bg-slate-100 transition-colors">
                <a
                  href="mailto:hello@nexenlabs.com?subject=Account Approval Request&body=Hi Catsy Team,%0D%0A%0D%0AI recently signed up for Catsy and am waiting for account approval. I would appreciate any updates on the status or if there's anything I can do to expedite the process.%0D%0A%0D%0AThank you!"
                  className="flex items-center gap-4 text-left group"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <Mail className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      Write to us
                    </div>
                    <div className="text-sm text-slate-500">hello@nexenlabs.com</div>
                  </div>
                </a>
              </div>

              <p className="text-xs text-slate-400 mt-4">
                Our team typically responds within 2-4 hours during business hours.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Help Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            Having trouble? Check your spam folder for our approval email or{" "}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 underline">
              try logging in
            </Link>{" "}
            if you think your account may already be approved.
          </p>
        </div>
      </div>
    </div>
  )
}
