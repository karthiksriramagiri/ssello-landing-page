"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Building, Sparkles, Send, Package, Globe, Phone } from "lucide-react"
import { useState, type FormEvent } from "react"
import Link from "next/link"
import { getCalendlyUrl } from "@/lib/calendly"

const shippingLocations = [
  { id: "usa", label: "USA" },
  { id: "china", label: "China" },
  { id: "korea", label: "Korea" },
  { id: "other", label: "Other" },
]

const productTypes = [
  { id: "own_brand", label: "I sell my own brand" },
  { id: "distributor", label: "I am an official brand distributor" },
  { id: "generic", label: "I sell generic products" },
]

export default function SignUpPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    shippingLocations: [] as string[],
    productType: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleShippingLocationChange = (locationId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        shippingLocations: [...formData.shippingLocations, locationId]
      })
    } else {
      setFormData({
        ...formData,
        shippingLocations: formData.shippingLocations.filter(id => id !== locationId)
      })
    }
  }

  const handleProductTypeChange = (productType: string) => {
    setFormData({ ...formData, productType })
  }

  const sendSlackWebhook = async (data: typeof formData) => {
    try {
      const message = {
        text: "New Sign Up Registration!",
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "🎉 New Sign Up Registration"
            }
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Name:*\n${data.firstName} ${data.lastName}`
              },
              {
                type: "mrkdwn",
                text: `*Email:*\n${data.email}`
              },
              {
                type: "mrkdwn",
                text: `*Phone:*\n${data.phoneNumber}`
              },
              {
                type: "mrkdwn",
                text: `*Company:*\n${data.companyName}`
              },
              {
                type: "mrkdwn",
                text: `*Product Type:*\n${productTypes.find(pt => pt.id === data.productType)?.label || data.productType}`
              }
            ]
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Shipping Locations:*\n${data.shippingLocations.map(id => shippingLocations.find(sl => sl.id === id)?.label).join(", ")}`
            }
          }
        ]
      }

      const response = await fetch("https://hooks.slack.com/services/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", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
        mode: 'no-cors'
      })
      
      console.log("Webhook sent successfully")
    } catch (error) {
      console.error("Failed to send Slack webhook:", error)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send to Slack webhook
      await sendSlackWebhook(formData)
      
      // Redirect to Calendly instead of thank you page
      window.location.href = getCalendlyUrl()
    } catch (error) {
      // Even if webhook fails, redirect to Calendly
      window.location.href = getCalendlyUrl()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl animate-float delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-300/20 to-amber-300/20 rounded-full blur-2xl animate-float delay-1000"></div>
        </div>

        <div className="container text-center relative z-10">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-200 to-amber-200 text-orange-800 text-sm font-semibold mb-8 shadow-lg">
            <Building className="w-4 h-4 mr-2" />
            Join ssello
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-8">
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
              Start Your Online Expansion
            </span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Get started with ssello and expand your business across Latin America's biggest marketplaces.
            <span className="font-semibold text-foreground"> It only takes 2 minutes.</span>
          </p>
        </div>
      </section>

      {/* Sign Up Form */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50"></div>
        
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-orange-500 to-amber-600 opacity-10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-32 w-64 h-64 bg-orange-200/20 rounded-full blur-2xl animate-float delay-2000"></div>
        </div>

        <div className="container max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white text-sm font-semibold shadow-lg mb-6">
              <Send className="h-5 w-5 mr-2" />
              Registration Form
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              Tell us about{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                your business
              </span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Help us understand your business so we can provide the best onboarding experience.
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Get Started with ssello
              </CardTitle>
              <CardDescription className="text-lg">
                Fill out the form below and we'll set up your account within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name Fields */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-semibold">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      required
                      className="h-12 border-slate-300 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-semibold">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      required
                      className="h-12 border-slate-300 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@company.com"
                    required
                    className="h-12 border-slate-300 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
                  />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-sm font-semibold">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        required
                        className="h-12 pl-10 border-slate-300 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-semibold">Company Name *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Your Company Inc."
                    required
                    className="h-12 border-slate-300 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
                  />
                </div>

                {/* Shipping Locations */}
                <div className="space-y-4">
                  <Label className="text-sm font-semibold">Where do you ship your products from? *</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {shippingLocations.map((location) => (
                      <div key={location.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={location.id}
                          checked={formData.shippingLocations.includes(location.id)}
                          onCheckedChange={(checked) => 
                            handleShippingLocationChange(location.id, checked as boolean)
                          }
                          className="border-orange-300 data-[state=checked]:bg-orange-600"
                        />
                        <Label htmlFor={location.id} className="text-sm font-medium cursor-pointer">
                          {location.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Type */}
                <div className="space-y-4">
                  <Label className="text-sm font-semibold">What type of products do you sell? *</Label>
                  <div className="space-y-3">
                    {productTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={type.id}
                          checked={formData.productType === type.id}
                          onCheckedChange={(checked) => 
                            checked ? handleProductTypeChange(type.id) : handleProductTypeChange("")
                          }
                          className="border-orange-300 data-[state=checked]:bg-orange-600"
                        />
                        <Label htmlFor={type.id} className="text-sm font-medium cursor-pointer">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white h-12 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Package className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Start Selling with ssello
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
} 