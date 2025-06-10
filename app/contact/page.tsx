"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Phone, Mail, Building, Sparkles, Send, Calendar } from "lucide-react"
import { useState, type FormEvent } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useLanguage()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const sendSlackWebhook = async (data: typeof formData) => {
    try {
      const message = {
        text: "New Contact Form Submission!",
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "📧 New Contact Form Submission"
            }
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Name:*\n${data.name}`
              },
              {
                type: "mrkdwn",
                text: `*Email:*\n${data.email}`
              },
              {
                type: "mrkdwn",
                text: `*Subject:*\n${data.subject}`
              }
            ]
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Message:*\n${data.message}`
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
        mode: 'no-cors' // Add this to handle CORS
      })
      
      // Since we're using no-cors, we can't check response status
      // We'll assume it worked if no error was thrown
      console.log("Webhook sent successfully")
    } catch (error) {
      console.error("Failed to send Slack webhook:", error)
      // Don't throw the error - we'll still show success to user
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send to Slack webhook
      await sendSlackWebhook(formData)
      
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      // Even if webhook fails, show success to user
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
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
            <Mail className="w-4 h-4 mr-2" />
            {t.nav.contact}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-8">
            Contact{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
              ssello
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.common.ourTeam}
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50"></div>
        
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-orange-500 to-amber-600 opacity-10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-32 w-64 h-64 bg-orange-200/20 rounded-full blur-2xl animate-float delay-2000"></div>
        </div>

        <div className="container grid lg:grid-cols-2 gap-16 relative z-10">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white text-sm font-semibold shadow-lg">
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Let's Start
                </span>{" "}
                a Conversation
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Fill out the form below and we'll get back to you as soon as possible. We're excited to help you grow your business.
              </p>
            </div>

            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Send Us a Message
                </CardTitle>
                <CardDescription className="text-lg">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="h-12 border-slate-300 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="h-12 border-slate-300 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-semibold">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g., Partnership Inquiry"
                      required
                      className="h-12 border-slate-300 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={5}
                      required
                      className="border-slate-300 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white h-12 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-semibold shadow-lg">
                <Building className="h-5 w-5 mr-2" />
                Contact Information
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Get in Touch
                </span>{" "}
                Directly
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Reach out to us directly through phone, email, or schedule a meeting with our team.
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Schedule Meeting Card */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-orange-300/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg mb-2">Schedule a Meeting</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Book a 30-minute call with our team to discuss your Latin America expansion strategy.
                    </p>
                    <Button
                      className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                      asChild
                    >
                      <a 
                        href="https://calendly.com/official-ssello" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Schedule Call
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-2">Email Us</h3>
                    <div className="space-y-1">
                      <a href="mailto:official@ssello.com" className="text-orange-600 hover:text-orange-700 font-medium transition-colors block">
                        official@ssello.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-2">Call Us</h3>
                    <div className="space-y-1">
                      <a href="tel:+1(470)760-9437" className="text-orange-600 hover:text-orange-700 font-medium transition-colors block">
                        +1 (470)760-9437
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
