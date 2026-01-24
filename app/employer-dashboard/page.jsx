"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LogOut, Briefcase, Search, Download, Eye, CheckCircle2, AlertCircle, FileText } from "lucide-react"

// Mock candidate data with verification status
const mockCandidates = [
  {
    id: 1,
    name: "Ayaan Sharma",
    email: "ayaan@example.com",
    rollNo: "CSE2023-041",
    institution: "XYZ Institute of Technology",
    degree: "B.Tech in Computer Science",
    cgpa: 8.23,
    verificationStatus: "verified",
    appliedFor: "Software Engineer",
    hasResume: true,
    hasTranscript: true,
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya@example.com",
    rollNo: "CSE2023-042",
    institution: "ABC Institute",
    degree: "B.Tech in Computer Science",
    cgpa: 8.56,
    verificationStatus: "pending",
    appliedFor: "Data Scientist",
    hasResume: true,
    hasTranscript: true,
  },
  {
    id: 3,
    name: "Rahul Singh",
    email: "rahul@example.com",
    rollNo: "CSE2023-043",
    institution: "DEF Institute",
    degree: "B.Tech in Computer Science",
    cgpa: 7.89,
    verificationStatus: "verified",
    appliedFor: "Full Stack Developer",
    hasResume: true,
    hasTranscript: false,
  },
  {
    id: 4,
    name: "Neha Gupta",
    email: "neha@example.com",
    rollNo: "CS2022-098",
    institution: "GHI Institute",
    degree: "B.Tech in Information Technology",
    cgpa: 9.12,
    verificationStatus: "failed",
    appliedFor: "Machine Learning Engineer",
    hasResume: true,
    hasTranscript: true,
  },
  {
    id: 5,
    name: "Arjun Patel",
    email: "arjun@example.com",
    rollNo: "CSE2023-045",
    institution: "XYZ Institute of Technology",
    degree: "B.Tech in Computer Science",
    cgpa: 8.45,
    verificationStatus: "pending",
    appliedFor: "Backend Developer",
    hasResume: true,
    hasTranscript: true,
  },
]

// Loading component for Suspense
const Loading = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
)

function EmployerDashboardContent() {
  const [candidates, setCandidates] = useState(mockCandidates)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedCandidate, setSelectedCandidate] = useState(null)

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userRole")
    window.location.href = "/"
  }

  const handleVerify = (id, status) => {
    setCandidates(candidates.map((c) => (c.id === id ? { ...c, verificationStatus: status } : c)))
  }

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || candidate.verificationStatus === filterStatus
    return matchesSearch && matchesFilter
  })

  const verifiedCount = candidates.filter((c) => c.verificationStatus === "verified").length
  const pendingCount = candidates.filter((c) => c.verificationStatus === "pending").length
  const failedCount = candidates.filter((c) => c.verificationStatus === "failed").length

  const getStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending Review</Badge>
      case "failed":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Failed Verification</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-card/95 backdrop-blur z-40">
        <div className="px-6 py-4 max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-foreground">TechCorp Recruitment</h1>
              <p className="text-xs text-muted-foreground">Employer Verification Portal</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-border text-foreground hover:bg-muted gap-2 bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Credential Verification Portal</h2>
          <p className="text-muted-foreground">Review and verify student credentials and academic reports</p>
        </div>

        {/* Verification Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Candidates</p>
            <p className="text-4xl font-bold text-primary">{candidates.length}</p>
          </Card>
          <Card className="bg-card border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Verified</p>
            <p className="text-4xl font-bold text-green-400">{verifiedCount}</p>
          </Card>
          <Card className="bg-card border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Pending Review</p>
            <p className="text-4xl font-bold text-yellow-400">{pendingCount}</p>
          </Card>
          <Card className="bg-card border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Failed</p>
            <p className="text-4xl font-bold text-red-400">{failedCount}</p>
          </Card>
        </div>

        {/* Search & Filter Section */}
        <Card className="bg-card border-border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or roll number..."
                className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-foreground"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-background border border-border rounded-lg px-4 py-2 text-foreground"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </Card>

        {/* Candidates List */}
        <Card className="bg-card border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background">
                  <th className="text-left p-6 font-semibold text-muted-foreground">Candidate Name</th>
                  <th className="text-left p-6 font-semibold text-muted-foreground">Position</th>
                  <th className="text-left p-6 font-semibold text-muted-foreground">Institution</th>
                  <th className="text-center p-6 font-semibold text-muted-foreground">CGPA</th>
                  <th className="text-center p-6 font-semibold text-muted-foreground">Status</th>
                  <th className="text-right p-6 font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.length > 0 ? (
                  filteredCandidates.map((candidate) => (
                    <tr key={candidate.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-6">
                        <p className="font-medium text-foreground">{candidate.name}</p>
                        <p className="text-xs text-muted-foreground">{candidate.email}</p>
                      </td>
                      <td className="p-6 text-foreground">{candidate.appliedFor}</td>
                      <td className="p-6 text-foreground">{candidate.institution}</td>
                      <td className="p-6 text-center">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{candidate.cgpa}</Badge>
                      </td>
                      <td className="p-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {getStatusIcon(candidate.verificationStatus)} {getStatusBadge(candidate.verificationStatus)}
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => setSelectedCandidate(candidate)}>
                            <Eye className="w-3 h-3 mr-1" /> View
                          </Button>
                          {candidate.verificationStatus === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-500/20 text-green-400 border-green-500/30"
                                onClick={() => handleVerify(candidate.id, "verified")}
                              >
                                <CheckCircle2 className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                className="bg-red-500/20 text-red-400 border-red-500/30"
                                onClick={() => handleVerify(candidate.id, "failed")}
                              >
                                <AlertCircle className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-muted-foreground">No candidates found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Candidate Details Modal */}
        {selectedCandidate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <Card className="bg-card border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{selectedCandidate.name}</h3>
                  <p className="text-muted-foreground">{selectedCandidate.rollNo}</p>
                </div>
                <button onClick={() => setSelectedCandidate(null)} className="text-2xl text-muted-foreground">×</button>
              </div>

              <div className="space-y-6">
                <div className="bg-background rounded-lg p-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-foreground">{selectedCandidate.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Degree</p>
                    <p className="text-foreground">{selectedCandidate.degree}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-foreground">Documents</h4>
                  {selectedCandidate.hasResume && (
                    <div className="flex justify-between items-center bg-background p-4 rounded-lg">
                      <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Resume</span>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                  )}
                </div>

                {selectedCandidate.verificationStatus === "pending" && (
                  <div className="flex gap-3 mt-4">
                    <Button
                      className="flex-1 bg-green-500/20 text-green-400 border-green-500/30"
                      onClick={() => { handleVerify(selectedCandidate.id, "verified"); setSelectedCandidate(null); }}
                    >
                      Verify
                    </Button>
                    <Button
                      className="flex-1 bg-red-500/20 text-red-400 border-red-500/30"
                      onClick={() => { handleVerify(selectedCandidate.id, "failed"); setSelectedCandidate(null); }}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

export default function EmployerDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isLoggedIn")
      const role = localStorage.getItem("userRole")
      
      if (loggedIn === "true" && role === "employer") {
        setIsLoggedIn(true)
      } else {
        window.location.href = "/login"
      }
      setIsLoading(false)
    }
  }, [])

  return (
    <Suspense fallback={<Loading />}>
      {isLoading ? <Loading /> : isLoggedIn ? <EmployerDashboardContent /> : null}
    </Suspense>
  )
}