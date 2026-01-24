"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)

  // Removed TypeScript types from the event parameter
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Removed TypeScript types from the event parameter
  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "support@verified.edu",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Call us during business hours"
    },
    {
      icon: MapPin,
      title: "Address",
      value: "Tech Park Building, Level 5",
      description: "Innovation District, San Francisco CA 94105"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      value: "Available 24/7",
      description: "Get instant support from our team"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 bg-card/50 border-b border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6 text-foreground">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Have questions? Our team is here to help. Reach out to us through any of these channels.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      

      {/* Contact Form Section */}
      <section className="px-6 py-20 bg-card/50 border-t border-b border-border">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Send us a Message</h2>
          
          {submitted ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-8 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
              <p className="text-muted-foreground">Thank you for reaching out. We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="How can we help?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              
              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-6 text-base">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Frequently Asked Questions</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              q: "How long does credential verification take?",
              a: "Verification is instant! Your credentials are verified in real-time using our blockchain-backed system."
            },
            {
              q: "Is my data safe on VerifyED?",
              a: "Yes, we use military-grade encryption and blockchain technology to ensure your data is completely secure and tamper-proof."
            },
            {
              q: "Can I share my report with employers?",
              a: "Absolutely! You can generate a secure shareable link that employers can use to instantly verify your credentials."
            },
            {
              q: "How often is my data updated?",
              a: "Your academic records are updated in real-time as new results are published by your institution."
            },
            {
              q: "What if I have missing semesters?",
              a: "You can request your institution to upload missing semester records. We'll guide you through the process."
            },
            {
              q: "Is there a mobile app?",
              a: "Yes! VerifyED is fully responsive and works seamlessly on all devices. A dedicated app is coming soon."
            }
          ].map((faq, index) => (
            <Card key={index} className="bg-card border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}