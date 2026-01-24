"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Shield, Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const isLoggedIn = mounted && typeof window !== "undefined" && localStorage.getItem("isLoggedIn")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    window.location.href = "/"
  }

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true")
    window.location.href = "/dashboard"
  }

  if (!mounted) return null

  if (pathname === "/dashboard" && isLoggedIn) {
    return (
      <header className="border-b border-border sticky top-0 bg-card/95 backdrop-blur z-50">
        <div className="px-6 py-4 max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">VerifyED</span>
          </Link>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-border text-foreground hover:bg-muted gap-2 bg-transparent"
          >
            Logout
          </Button>
        </div>
      </header>
    )
  }

  // Show navigation for all non-dashboard pages when not logged in
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-bold text-xl text-foreground">VerifyED</span>
      </Link>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        <Link href="/" className={`transition-colors ${pathname === "/" ? "text-secondary font-semibold" : "text-foreground hover:text-accent"}`}>
          Home
        </Link>
        <Link href="/features" className={`transition-colors ${pathname === "/features" ? "text-secondary font-semibold" : "text-foreground hover:text-accent"}`}>
          Features
        </Link>
        <Link href="/contact" className={`transition-colors ${pathname === "/contact" ? "text-secondary font-semibold" : "text-foreground hover:text-accent"}`}>
          Contact
        </Link>
        <Button onClick={handleLogin} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
          Login
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b border-border md:hidden z-40">
          <div className="flex flex-col gap-4 p-6">
            <Link href="/" className="text-foreground hover:text-accent" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/features" className="text-foreground hover:text-accent" onClick={() => setIsOpen(false)}>
              Features
            </Link>
            <Link href="/contact" className="text-foreground hover:text-accent" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Button onClick={() => {
              handleLogin()
              setIsOpen(false)
            }} className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
