"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Briefcase, ArrowLeft, Mail, Lock, Building } from "lucide-react"

export default function EmployerLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Removed the TypeScript type definition for 'e'
  const handleLogin = (e) => {
    e.preventDefault()
    if (email && password) {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userRole", "employer")
      window.location.href = "/employer-dashboard"
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link href="/login" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to role selection
        </Link>

        <Card className="bg-card border-border p-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Employer Login</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="recruiter@company.com"
                  className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-2">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account? <Link href="/employer-signup" className="text-primary hover:underline">Sign up</Link>
          </p>
        </Card>

        {/* Demo Credentials Section */}
        <Card className="bg-card/50 border border-border p-4 mt-6">
          <p className="text-xs text-muted-foreground mb-2 font-semibold">Demo Credentials:</p>
          <p className="text-xs text-muted-foreground">Email: recruiter@techcorp.com</p>
          <p className="text-xs text-muted-foreground">Password: password123</p>
        </Card>
      </div>
    </div>
  )
}