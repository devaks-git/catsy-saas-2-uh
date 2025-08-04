"use client"

import { useState } from "react"
import { ClientLayout } from "@/components/layouts/client-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"

const steps = [
  { id: 1, name: "Basic Info", description: "Brand and marketplace details" },
  { id: 2, name: "Data Source", description: "Source data configuration" },
  { id: 3, name: "Upload Templates", description: "Template files" },
  { id: 4, name: "Describe Requirements", description: "Additional requirements" },
]

export default function NewRequestPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    brand: "",
    marketplaces: [],
    sourceUrl: "",
    templateUrl: "",
    requirements: "",
  })

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Submitting request:", formData)
    // Handle form submission
  }

  return (
    <ClientLayout>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Request New Workflow</h1>
          <p className="text-slate-600 mt-2">Create a new automated workflow for your product listings</p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                      currentStep > step.id
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : currentStep === step.id
                          ? "border-indigo-600 text-indigo-600"
                          : "border-slate-300 text-slate-400"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <div className="ml-3">
                    <div
                      className={`text-sm font-medium ${currentStep >= step.id ? "text-slate-900" : "text-slate-400"}`}
                    >
                      {step.name}
                    </div>
                    <div className="text-xs text-slate-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${currentStep > step.id ? "bg-indigo-600" : "bg-slate-300"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand Name</Label>
                  <Input
                    id="brand"
                    placeholder="Enter your brand name"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marketplaces">Marketplace Channels</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select marketplace channels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amazon">Amazon</SelectItem>
                      <SelectItem value="ebay">eBay</SelectItem>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="walmart">Walmart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <div className="space-y-2">
                <Label htmlFor="sourceUrl">Source Sheet URL</Label>
                <Input
                  id="sourceUrl"
                  placeholder="https://docs.google.com/spreadsheets/..."
                  value={formData.sourceUrl}
                  onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                />
                <p className="text-sm text-slate-500">Or upload a file using the file picker below</p>
                <Input type="file" accept=".xlsx,.csv" />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-2">
                <Label htmlFor="templateUrl">Template Sheets URL</Label>
                <Input
                  id="templateUrl"
                  placeholder="https://docs.google.com/spreadsheets/..."
                  value={formData.templateUrl}
                  onChange={(e) => setFormData({ ...formData, templateUrl: e.target.value })}
                />
                <p className="text-sm text-slate-500">Or upload template files using the file picker below</p>
                <Input type="file" accept=".xlsx,.csv" multiple />
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-2">
                <Label htmlFor="requirements">Describe Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="Please describe any specific requirements, transformations, or business rules for this workflow..."
                  rows={6}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            Previous Step
          </Button>
          {currentStep < steps.length ? (
            <Button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700">
              Next Step
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700">
              Submit Request
            </Button>
          )}
        </div>
      </div>
    </ClientLayout>
  )
}
