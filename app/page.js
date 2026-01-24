"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, Users, TrendingUp } from "lucide-react"
import Navigation from "@/components/navigation"

export default function HomePage() {
  const handleLogin = () => {
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6 text-foreground">
              Instant & Secure Academic Credential Verification
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-balance">
              Eliminating fraud and simplifying verification for institutions, employers, and students. A secure digital platform for the modern academic world.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={handleLogin}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base px-8"
              >
                Get Started
              </Button>
              <Link href="/features">
                <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 rounded-2xl blur-3xl"></div>
            {/* <div className="relative bg-card border border-border rounded-2xl p-8 backdrop-blur-sm"> */}
              <img src={'/download.png'} className="w-400px h-auto rounded-2xl"/>
            {/* </div> */}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="px-6 py-16 bg-card/50 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Why VerifyED?</h2>
          <p className="text-center text-muted-foreground mb-12 text-balance">
            The most trusted credential verification platform
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Fast & Reliable</h3>
              <p className="text-muted-foreground">
                Instant verification with 99.9% uptime and real-time processing
              </p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Comprehensive Data</h3>
              <p className="text-muted-foreground">
                Complete academic records, certificates, and performance metrics
              </p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Trusted Partner</h3>
              <p className="text-muted-foreground">
                Used by 500+ institutions and 100K+ students worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Ready to Get Started?</h2>
        <p className="text-lg text-muted-foreground mb-8">Join thousands of students accessing their verified credentials instantly</p>
        <Button
          onClick={handleLogin}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base px-8 py-6"
        >
          Access Your Dashboard
        </Button>
      </section>
    </div>
  )
}
