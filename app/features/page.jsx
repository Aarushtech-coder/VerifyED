"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { Shield, Lock, Zap, BarChart3, Users, Clock, CheckCircle2, Eye } from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      icon: Shield,
      title: "Blockchain-Backed Security",
      description: "All academic records are secured with blockchain technology, ensuring tamper-proof and immutable credentials that cannot be forged or altered.",
      color: "bg-primary"
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Your personal academic data is encrypted and protected with military-grade security standards, ensuring complete privacy.",
      color: "bg-secondary"
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description: "Employers and institutions can verify your credentials in seconds with real-time processing and instant confirmation.",
      color: "bg-accent"
    },
    {
      icon: BarChart3,
      title: "Detailed Report Cards",
      description: "Comprehensive semester-wise reports including mid-term marks, end-term marks, credits, SGPA calculations, and fail status tracking.",
      color: "bg-primary"
    },
    {
      icon: Users,
      title: "Multi-Institution Support",
      description: "Consolidate credentials from multiple institutions in one secure platform for easier verification and management.",
      color: "bg-secondary"
    },
    {
      icon: Clock,
      title: "Real-Time Updates",
      description: "Your academic records are updated in real-time as new results are published by your institution.",
      color: "bg-accent"
    },
    {
      icon: CheckCircle2,
      title: "Verified Badges",
      description: "Earn and display verified badges for academic achievements, certifications, and additional credentials.",
      color: "bg-primary"
    },
    {
      icon: Eye,
      title: "Complete Transparency",
      description: "Know exactly who accessed your credentials and when with detailed audit logs and access history.",
      color: "bg-secondary"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 bg-card/50 border-b border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6 text-foreground">
            Powerful Features for Modern Students
          </h1>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            VerifyED provides comprehensive tools to manage, verify, and share your academic credentials securely.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors overflow-hidden">
                <div className={`h-1 ${feature.color}`}></div>
                <div className="p-6">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Report Card Highlights */}
      <section className="px-6 py-20 bg-card/50 border-t border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Comprehensive Report Card</h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Semester-wise Breakdown</h3>
                  <p className="text-muted-foreground">View detailed marks, credits, and performance metrics for each semester separately.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Subject Analysis</h3>
                  <p className="text-muted-foreground">Track marks for every subject with mid-term and end-term evaluations clearly separated.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">SGPA & Overall Performance</h3>
                  <p className="text-muted-foreground">Automatic SGPA calculation per semester and cumulative CGPA tracking across all semesters.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Fail Status Tracking</h3>
                  <p className="text-muted-foreground">Clear indication of failed subjects with details for improvement and remedial options.</p>
                </div>
              </div>
            </div>
            <div className="bg-background border border-border rounded-xl p-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <span className="text-sm font-semibold text-muted-foreground">SEMESTER 1</span>
                  <span className="text-lg font-bold text-secondary">SGPA: 8.1</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground">Data Structures</span>
                    <span className="text-accent font-medium">84/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Algorithm Design</span>
                    <span className="text-accent font-medium">78/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground text-red-400">Web Development</span>
                    <span className="text-red-400 font-medium">45/100 (FAIL)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border mt-4">
                  <span className="text-sm font-semibold text-muted-foreground">SEMESTER 2</span>
                  <span className="text-lg font-bold text-secondary">SGPA: 8.35</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="text-sm font-semibold text-muted-foreground">CUMULATIVE CGPA</span>
                  <span className="text-2xl font-bold text-secondary">8.22</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Why Students Love VerifyED</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">98%</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Verification Success</h3>
            <p className="text-muted-foreground">Instant credential verification accepted by employers worldwide</p>
          </div>
          
          <div className="text-center">
            <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-secondary">&lt;1s</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">Access your complete academic records in under a second</p>
          </div>
          
          <div className="text-center">
            <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-accent">100%</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Secure</h3>
            <p className="text-muted-foreground">Military-grade encryption protects all your personal data</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-card/50 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Start Using VerifyED Today</h2>
          <p className="text-lg text-muted-foreground mb-8">Get instant access to your complete academic records and verified credentials</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base px-8 py-6">
                View Demo
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent text-base px-8 py-6">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}