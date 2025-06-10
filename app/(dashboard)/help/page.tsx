"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LayoutDashboard, Package, ShoppingCart, DollarSign, Gauge, Settings, ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Guide {
  id: string
  title: string
  icon: React.ElementType
  description: string
  faqs?: { question: string; answer: string }[]
  detailsLink?: string // For a more detailed page if needed in the future
}

const guides: Guide[] = [
  {
    id: "dashboard",
    title: "Getting Started: Dashboard Overview",
    icon: LayoutDashboard,
    description: "Understand the main dashboard sections, quick actions, and how to navigate your seller central.",
    faqs: [
      {
        question: "What are Quick Actions?",
        answer:
          "Quick Actions provide shortcuts to common tasks like adding products or checking orders directly from your dashboard.",
      },
      {
        question: "How do I check my onboarding progress?",
        answer:
          "The 'Complete Onboarding' section shows your progress. Click 'Finish Setup' to complete any pending steps.",
      },
    ],
  },
  {
    id: "products",
    title: "Managing Your Products",
    icon: Package,
    description:
      "Learn how to add new products individually, use batch entry, upload in bulk, and edit existing listings.",
    faqs: [
      {
        question: "How do I add a single product?",
        answer:
          "Navigate to Products > Add New Item (Manual Entry) and fill in the product details, images, and shipping information.",
      },
      {
        question: "What is batch entry?",
        answer:
          "Batch entry allows you to quickly find and add products from the catalog using ASIN, UPC, or product titles before adding them to your inventory.",
      },
      {
        question: "How does bulk upload work?",
        answer:
          "You can download a template, fill it with your product UPCs/ASINs or SKU for stock/price updates, and upload the file via the Bulk Upload modal on the Products page.",
      },
    ],
  },
  {
    id: "orders",
    title: "Processing Orders",
    icon: ShoppingCart,
    description:
      "A guide to viewing your orders, adding/editing tracking information, managing shipments, and handling cancellations.",
    faqs: [
      {
        question: "How do I add tracking to an order?",
        answer:
          "In the Orders table, find the order and click the 'Add Tracking' button or the edit icon next to existing tracking. Enter the tracking code and select the carrier.",
      },
      {
        question: "What happens when I cancel an order?",
        answer:
          "Cancelling an order requires a reason and may impact your Seller Pulse score. The order status will be updated to 'Cancelled'.",
      },
      {
        question: "How can I filter my orders?",
        answer:
          "Use the search bar and filter options at the top of the Orders page to filter by order ID, product, customer, status, or date range.",
      },
    ],
  },
  {
    id: "balance",
    title: "Understanding Your Balance",
    icon: DollarSign,
    description:
      "How to check your accumulated balance, understand sales, fees, cancellations, and view your report history.",
    faqs: [
      {
        question: "Where can I see my total balance?",
        answer:
          "The 'Accumulated balance' card on the Balance page shows your current estimated total, broken down by sales, cancellations, and fees.",
      },
      {
        question: "What is the minimum balance for payout?",
        answer: "You must reach a minimum accumulated balance of U$S 500 to receive payments.",
      },
    ],
  },
  {
    id: "seller-pulse",
    title: "Improving Your Seller Pulse",
    icon: Gauge,
    description:
      "Learn about the Seller Pulse score, key performance factors like cancellations and problematic orders, and tips to improve your seller reputation.",
    faqs: [
      {
        question: "What affects my Seller Pulse score?",
        answer:
          "Key factors include order cancellation rate, delayed deliveries, and problematic orders. Each has a different weight on your overall score.",
      },
      {
        question: "How can I improve my score?",
        answer:
          "Focus on minimizing cancellations, ensuring timely shipments, and quickly resolving any order issues. Refer to the 'Learn More' links for specific tips on each metric.",
      },
    ],
  },
  {
    id: "account-settings",
    title: "Account Settings",
    icon: Settings,
    description:
      "Manage your profile, notification preferences, language settings, and other account-specific configurations.",
    faqs: [
      {
        question: "How do I change my profile information?",
        answer: "Click on your user icon in the top right header, then select 'Profile' from the dropdown menu.",
      },
      { question: "Can I change the language?", answer: "Yes, select 'Language' from the user menu in the header." },
    ],
  },
]

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (guide.faqs &&
        guide.faqs.some(
          (faq) =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
        )),
  )

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 bg-slate-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Help Center</h1>
          <p className="text-muted-foreground">
            Find guides, FAQs, and answers to common questions about using the ssello Seller Central.
          </p>
        </div>

        <div className="mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search help articles..."
            className="w-full pl-10 pr-4 py-2 h-11 text-base rounded-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredGuides.length > 0 ? (
          <div className="space-y-6">
            {filteredGuides.map((guide) => (
              <Card key={guide.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <guide.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">{guide.title}</CardTitle>
                    <CardDescription className="mt-1">{guide.description}</CardDescription>
                  </div>
                </CardHeader>
                {guide.faqs && guide.faqs.length > 0 && (
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={`faq-${guide.id}`}>
                        <AccordionTrigger className="text-sm font-medium hover:no-underline">
                          Frequently Asked Questions ({guide.faqs.length})
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <ul className="space-y-3 pl-1">
                            {guide.faqs.map((faq, index) => (
                              <li key={index}>
                                <p className="font-semibold text-sm text-foreground mb-0.5">{faq.question}</p>
                                <p className="text-xs text-muted-foreground">{faq.answer}</p>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    {guide.detailsLink && (
                      <Button variant="link" asChild className="p-0 h-auto text-xs text-primary mt-3">
                        <Link href={guide.detailsLink}>
                          View Full Guide <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground">No Results Found</h3>
            <p className="text-muted-foreground mt-2">
              We couldn&apos;t find any help articles matching &quot;{searchTerm}&quot;. Try a different search term.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
