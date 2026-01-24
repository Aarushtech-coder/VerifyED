"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  LogOut,
  Building2,
  Users,
  Plus,
  Edit2,
  Trash2,
  BarChart3,
  Download,
  X,
  Eye,
} from "lucide-react";

// Mock student data with full details
const mockStudents = [
  {
    id: 1,
    name: "Ayaan Sharma",
    email: "ayaan@example.com",
    rollNo: "CSE2023-041",
    cgpa: 8.23,
    status: "Active",
    program: "B.Tech in Computer Science & Engineering",
    duration: "2023-2027",
    attendance: 87.5,
    totalCredits: 69,
    midsemMarks: 85,
    endsemMarks: 78,
    certificates: ["Python Certification", "Web Development Bootcamp"],
    achievements: ["Dean's List 2023", "Hackathon Winner 2024"],
    semesters: [
      {
        semester: 1,
        sgpa: 8.1,
        subjects: [
          {
            code: "CS101",
            name: "Programming Fundamentals",
            credits: 4,
            midterm: 35,
            endterm: 42,
            total: 77,
            grade: "B+",
            status: "Pass",
          },
          {
            code: "CS102",
            name: "Computer Architecture",
            credits: 3,
            midterm: 38,
            endterm: 43,
            total: 81,
            grade: "A-",
            status: "Pass",
          },
          {
            code: "CS103",
            name: "Discrete Mathematics",
            credits: 3,
            midterm: 32,
            endterm: 38,
            total: 70,
            grade: "B",
            status: "Pass",
          },
        ],
      },
      {
        semester: 2,
        sgpa: 8.35,
        subjects: [
          {
            code: "CS201",
            name: "Object-Oriented Programming",
            credits: 4,
            midterm: 38,
            endterm: 44,
            total: 82,
            grade: "A-",
            status: "Pass",
          },
          {
            code: "CS202",
            name: "Database Management Systems",
            credits: 4,
            midterm: 36,
            endterm: 45,
            total: 81,
            grade: "A-",
            status: "Pass",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya@example.com",
    rollNo: "CSE2023-042",
    cgpa: 8.56,
    status: "Active",
    program: "B.Tech in Computer Science & Engineering",
    duration: "2023-2027",
    attendance: 92.0,
    totalCredits: 69,
    midsemMarks: 92,
    endsemMarks: 88,
    certificates: ["Java Certification", "Cloud Computing Basics"],
    achievements: ["Academic Excellence Award"],
    semesters: [
      {
        semester: 1,
        sgpa: 8.4,
        subjects: [
          {
            code: "CS101",
            name: "Programming Fundamentals",
            credits: 4,
            midterm: 38,
            endterm: 44,
            total: 82,
            grade: "A-",
            status: "Pass",
          },
          {
            code: "CS102",
            name: "Computer Architecture",
            credits: 3,
            midterm: 40,
            endterm: 45,
            total: 85,
            grade: "A",
            status: "Pass",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Rahul Singh",
    email: "rahul@example.com",
    rollNo: "CSE2023-043",
    cgpa: 7.89,
    status: "Active",
    program: "B.Tech in Computer Science & Engineering",
    duration: "2023-2027",
    attendance: 78.5,
    totalCredits: 69,
    midsemMarks: 79,
    endsemMarks: 81,
    certificates: ["Machine Learning Basics"],
    achievements: ["Sports Achievement Award"],
    semesters: [],
  },
  {
    id: 4,
    name: "Neha Gupta",
    email: "neha@example.com",
    rollNo: "CSE2023-044",
    cgpa: 9.12,
    status: "Graduated",
    program: "B.Tech in Computer Science & Engineering",
    duration: "2023-2027",
    attendance: 95.0,
    totalCredits: 120,
    midsemMarks: 95,
    endsemMarks: 92,
    certificates: ["Advanced Python", "AWS Developer Associate"],
    achievements: ["Valedictorian 2023", "Industry Internship Award"],
    semesters: [],
  },
  {
    id: 5,
    name: "Arjun Patel",
    email: "arjun@example.com",
    rollNo: "CSE2023-045",
    cgpa: 8.45,
    status: "Active",
    program: "B.Tech in Computer Science & Engineering",
    duration: "2023-2027",
    attendance: 85.0,
    totalCredits: 69,
    midsemMarks: 88,
    endsemMarks: 85,
    certificates: ["Data Science Fundamentals"],
    achievements: ["Best Project Award 2024"],
    semesters: [],
  },
];

export default function InstitutionDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [students, setStudents] = useState(mockStudents);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showViewStudent, setShowViewStudent] = useState(false);
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNo: "",
    program: "",
    duration: "",
    attendance: 0,
    totalCredits: 0,
    midsemMarks: 0,
    endsemMarks: 0,
    certificates: "",
    achievements: "",
  });
  const [institutionName, setInstitutionName] = useState(
    "XYZ Institute of Technology"
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isLoggedIn");
      const role = localStorage.getItem("userRole");

      if (loggedIn === "true" && role === "institution") {
        setIsLoggedIn(true);
        setIsLoading(false);
      } else {
        window.location.href = "/login";
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.rollNo &&
      formData.program &&
      formData.midsemMarks &&
      formData.endsemMarks
    ) {
      const newStudent = {
        id: students.length + 1,
        name: formData.name,
        email: formData.email,
        rollNo: formData.rollNo,
        program: formData.program,
        duration: formData.duration,
        attendance: formData.attendance,
        totalCredits: formData.totalCredits,
        midsemMarks: formData.midsemMarks,
        endsemMarks: formData.endsemMarks,
        cgpa: (formData.midsemMarks + formData.endsemMarks) / 2 / 10,
        status: "Active",
        certificates: formData.certificates
          ? formData.certificates.split(",").map((c) => c.trim())
          : [],
        achievements: formData.achievements
          ? formData.achievements.split(",").map((a) => a.trim())
          : [],
        semesters: [],
      };
      setStudents([...students, newStudent]);
      resetForm();
      setShowAddStudent(false);
    }
  };

  const handleEditStudent = (e) => {
    e.preventDefault();
    if (selectedStudent && formData.name && formData.email && formData.rollNo) {
      const updatedStudents = students.map((s) =>
        s.id === selectedStudent.id
          ? {
              ...s,
              name: formData.name,
              email: formData.email,
              rollNo: formData.rollNo,
              program: formData.program,
              duration: formData.duration,
              attendance: formData.attendance,
              totalCredits: formData.totalCredits,
              midsemMarks: formData.midsemMarks,
              endsemMarks: formData.endsemMarks,
              cgpa: (formData.midsemMarks + formData.endsemMarks) / 2 / 10,
              certificates: formData.certificates
                ? formData.certificates.split(",").map((c) => c.trim())
                : [],
              achievements: formData.achievements
                ? formData.achievements.split(",").map((a) => a.trim())
                : [],
            }
          : s
      );
      setStudents(updatedStudents);
      resetForm();
      setShowEditStudent(false);
      setSelectedStudent(null);
    }
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      rollNo: "",
      program: "",
      duration: "",
      attendance: 0,
      totalCredits: 0,
      midsemMarks: 0,
      endsemMarks: 0,
      certificates: "",
      achievements: "",
    });
  };

  const openViewStudent = (student) => {
    setSelectedStudent(student);
    setShowViewStudent(true);
  };

  const openEditStudent = (student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      rollNo: student.rollNo,
      program: student.program,
      duration: student.duration,
      attendance: student.attendance,
      totalCredits: student.totalCredits,
      midsemMarks: student.midsemMarks,
      endsemMarks: student.endsemMarks,
      certificates: student.certificates.join(", "),
      achievements: student.achievements.join(", "),
    });
    setShowEditStudent(true);
  };

  const activeStudents = students.filter((s) => s.status === "Active").length;
  const graduatedStudents = students.filter(
    (s) => s.status === "Graduated"
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-card/95 backdrop-blur z-40">
        <div className="px-6 py-4 max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-foreground">
                {institutionName}
              </h1>
              <p className="text-xs text-muted-foreground">
                Institution Dashboard
              </p>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome, Admin
          </h2>
          <p className="text-muted-foreground">
            Manage your institution's students and credentials
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Students</p>
            <p className="text-4xl font-bold text-primary">{students.length}</p>
            <p className="text-xs text-muted-foreground mt-2">Enrolled</p>
          </Card>

          <Card className="bg-card border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">
              Active Students
            </p>
            <p className="text-4xl font-bold text-secondary">
              {activeStudents}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Currently Studying
            </p>
          </Card>

          <Card className="bg-card border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Graduated</p>
            <p className="text-4xl font-bold text-accent">
              {graduatedStudents}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Completed Program
            </p>
          </Card>

          <Card className="bg-card border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Avg. CGPA</p>
            <p className="text-4xl font-bold text-blue-400">
              {(
                students.reduce((sum, s) => sum + s.cgpa, 0) / students.length
              ).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Institution Average
            </p>
          </Card>
        </div>

        {/* Student Management Section */}
        <Card className="bg-card border-border mb-8">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5" />
                Enrolled Students
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Manage student enrollment and credentials
              </p>
            </div>
            <Button
              onClick={() => setShowAddStudent(!showAddStudent)}
              className="bg-secondary hover:bg-secondary/90 gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Student
            </Button>
          </div>

          {/* Add Student Form */}
          {showAddStudent && (
            <div className="p-6 bg-background/50 border-b border-border">
              <form onSubmit={handleAddStudent} className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Student Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Full Name"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="student@example.com"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      value={formData.rollNo}
                      onChange={(e) =>
                        setFormData({ ...formData, rollNo: e.target.value })
                      }
                      placeholder="CSE2024-XXX"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Program
                    </label>
                    <input
                      type="text"
                      value={formData.program}
                      onChange={(e) =>
                        setFormData({ ...formData, program: e.target.value })
                      }
                      placeholder="e.g., B.Tech in CSE"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      placeholder="e.g., 2023-2027"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Total Credits
                    </label>
                    <input
                      type="number"
                      value={formData.totalCredits}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          totalCredits: Number(e.target.value),
                        })
                      }
                      placeholder="0-120"
                      min="0"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Attendance (%)
                    </label>
                    <input
                      type="number"
                      value={formData.attendance}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          attendance: Number(e.target.value),
                        })
                      }
                      placeholder="0-100"
                      min="0"
                      max="100"
                      step="0.1"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Mid-Sem Marks
                    </label>
                    <input
                      type="number"
                      value={formData.midsemMarks}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          midsemMarks: Number(e.target.value),
                        })
                      }
                      placeholder="0-100"
                      min="0"
                      max="100"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      End-Sem Marks
                    </label>
                    <input
                      type="number"
                      value={formData.endsemMarks}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          endsemMarks: Number(e.target.value),
                        })
                      }
                      placeholder="0-100"
                      min="0"
                      max="100"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Certificates
                    </label>
                    <input
                      type="text"
                      value={formData.certificates}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          certificates: e.target.value,
                        })
                      }
                      placeholder="e.g., Python, Java, AWS"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Achievements
                    </label>
                    <input
                      type="text"
                      value={formData.achievements}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          achievements: e.target.value,
                        })
                      }
                      placeholder="e.g., Dean's List, Award"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="bg-secondary hover:bg-secondary/90"
                  >
                    Add Student
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setShowAddStudent(false);
                      resetForm();
                    }}
                    variant="outline"
                    className="border-border bg-transparent"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Students Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-6 font-semibold text-muted-foreground">
                    Name
                  </th>
                  <th className="text-left p-6 font-semibold text-muted-foreground">
                    Roll Number
                  </th>
                  <th className="text-left p-6 font-semibold text-muted-foreground">
                    Email
                  </th>
                  <th className="text-center p-6 font-semibold text-muted-foreground">
                    CGPA
                  </th>
                  <th className="text-center p-6 font-semibold text-muted-foreground">
                    Status
                  </th>
                  <th className="text-right p-6 font-semibold text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-6 text-foreground font-medium">
                      {student.name}
                    </td>
                    <td className="p-6 text-foreground">{student.rollNo}</td>
                    <td className="p-6 text-muted-foreground">
                      {student.email}
                    </td>
                    <td className="p-6 text-center">
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {student.cgpa}
                      </Badge>
                    </td>
                    <td className="p-6 text-center">
                      <Badge
                        className={`${
                          student.status === "Active"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                        }`}
                      >
                        {student.status}
                      </Badge>
                    </td>
                    <td className="p-6 text-right flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border bg-transparent gap-1"
                        onClick={() => openViewStudent(student)}
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border bg-transparent gap-1"
                        onClick={() => openEditStudent(student)}
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-destructive/50 hover:bg-destructive/10 text-destructive gap-1 bg-transparent"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Reports & Analytics */}
        <Card className="bg-card border-border p-6">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Reports & Analytics
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Credentials Issued
              </p>
              <p className="text-3xl font-bold text-secondary">
                {students.filter((s) => s.status === "Graduated").length}
              </p>
            </div>
            <div className="bg-background rounded-lg p-6">
              <Button className="w-full bg-primary hover:bg-primary/90 gap-2">
                <Download className="w-4 h-4" />
                Export Student Report
              </Button>
            </div>
          </div>
        </Card>
      </main>

      {/* View Student Dialog */}
      <Dialog open={showViewStudent} onOpenChange={setShowViewStudent}>
        <DialogContent className="bg-card border-border max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Student Details - {selectedStudent?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Basic Information
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-background rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      Full Name
                    </p>
                    <p className="text-foreground font-medium">
                      {selectedStudent.name}
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="text-foreground font-medium text-sm">
                      {selectedStudent.email}
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      Roll Number
                    </p>
                    <p className="text-foreground font-medium">
                      {selectedStudent.rollNo}
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <Badge
                      className={`${
                        selectedStudent.status === "Active"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }`}
                    >
                      {selectedStudent.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Program Info */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Program Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-background rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      Program
                    </p>
                    <p className="text-foreground font-medium">
                      {selectedStudent.program}
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      Duration
                    </p>
                    <p className="text-foreground font-medium">
                      {selectedStudent.duration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Academic Performance Summary */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Academic Performance
                </h3>
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="bg-background rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-2">CGPA</p>
                    <p className="text-2xl font-bold text-secondary">
                      {selectedStudent.cgpa.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-2">
                      Mid-Sem
                    </p>
                    <p className="text-2xl font-bold text-blue-400">
                      {selectedStudent.midsemMarks}
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-2">
                      End-Sem
                    </p>
                    <p className="text-2xl font-bold text-blue-400">
                      {selectedStudent.endsemMarks}
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-2">
                      Attendance
                    </p>
                    <p className="text-2xl font-bold text-accent">
                      {selectedStudent.attendance.toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-2">
                      Total Credits
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {selectedStudent.totalCredits}
                    </p>
                  </div>
                </div>
              </div>

              {/* Semester-wise Details */}
              {selectedStudent.semesters.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Semester-wise Breakdown
                  </h3>
                  <div className="space-y-3">
                    {selectedStudent.semesters.map((sem) => (
                      <div
                        key={sem.semester}
                        className="bg-background rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold text-foreground">
                              Semester {sem.semester}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              SGPA: {sem.sgpa}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">
                              Subjects
                            </p>
                            <p className="text-lg font-bold text-primary">
                              {sem.subjects.length}
                            </p>
                          </div>
                        </div>
                        <div className="border-t border-border/50 pt-3 mt-3">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="text-muted-foreground">
                                <th className="text-left">Code</th>
                                <th className="text-left">Subject</th>
                                <th className="text-center">Total</th>
                                <th className="text-center">Grade</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sem.subjects.map((sub, idx) => (
                                <tr
                                  key={idx}
                                  className="border-t border-border/30"
                                >
                                  <td className="py-2 text-foreground">
                                    {sub.code}
                                  </td>
                                  <td className="py-2 text-foreground text-xs">
                                    {sub.name}
                                  </td>
                                  <td className="py-2 text-center text-foreground">
                                    {sub.total}
                                  </td>
                                  <td className="py-2 text-center">
                                    <Badge
                                      className={`text-xs ${
                                        sub.grade === "A"
                                          ? "bg-green-500/20 text-green-400"
                                          : sub.grade.includes("A")
                                          ? "bg-blue-500/20 text-blue-400"
                                          : sub.grade === "B"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-red-500/20 text-red-400"
                                      }`}
                                    >
                                      {sub.grade}
                                    </Badge>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificates */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Certificates
                </h3>
                {selectedStudent.certificates.length > 0 ? (
                  <div className="space-y-2">
                    {selectedStudent.certificates.map((cert, idx) => (
                      <div
                        key={idx}
                        className="bg-background rounded-lg p-3 flex items-center gap-2"
                      >
                        <div className="w-2 h-2 rounded-full bg-secondary" />
                        <p className="text-foreground">{cert}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No certificates yet</p>
                )}
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Achievements
                </h3>
                {selectedStudent.achievements.length > 0 ? (
                  <div className="space-y-2">
                    {selectedStudent.achievements.map((achievement, idx) => (
                      <div
                        key={idx}
                        className="bg-background rounded-lg p-3 flex items-center gap-2"
                      >
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <p className="text-foreground">{achievement}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No achievements recorded
                  </p>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => setShowViewStudent(false)}
              variant="outline"
              className="border-border bg-transparent"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={showEditStudent} onOpenChange={setShowEditStudent}>
        <DialogContent className="bg-card border-border max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Edit Student Details - {selectedStudent?.name}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditStudent} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                Basic Information
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Full Name"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="student@example.com"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    value={formData.rollNo}
                    onChange={(e) =>
                      setFormData({ ...formData, rollNo: e.target.value })
                    }
                    placeholder="CSE2024-XXX"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Program Information */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                Program Information
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Program
                  </label>
                  <input
                    type="text"
                    value={formData.program}
                    onChange={(e) =>
                      setFormData({ ...formData, program: e.target.value })
                    }
                    placeholder="e.g., B.Tech in CSE"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    placeholder="e.g., 2023-2027"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                Academic Information
              </h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Total Credits
                  </label>
                  <input
                    type="number"
                    value={formData.totalCredits}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalCredits: Number(e.target.value),
                      })
                    }
                    placeholder="0-120"
                    min="0"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Attendance (%)
                  </label>
                  <input
                    type="number"
                    value={formData.attendance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attendance: Number(e.target.value),
                      })
                    }
                    placeholder="0-100"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mid-Sem Marks
                  </label>
                  <input
                    type="number"
                    value={formData.midsemMarks}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        midsemMarks: Number(e.target.value),
                      })
                    }
                    placeholder="0-100"
                    min="0"
                    max="100"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    End-Sem Marks
                  </label>
                  <input
                    type="number"
                    value={formData.endsemMarks}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endsemMarks: Number(e.target.value),
                      })
                    }
                    placeholder="0-100"
                    min="0"
                    max="100"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Certifications & Achievements */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                Certifications & Achievements
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Certificates (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.certificates}
                    onChange={(e) =>
                      setFormData({ ...formData, certificates: e.target.value })
                    }
                    placeholder="e.g., Python, Java, AWS"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Achievements (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.achievements}
                    onChange={(e) =>
                      setFormData({ ...formData, achievements: e.target.value })
                    }
                    placeholder="e.g., Dean's List, Award"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={() => {
                  setShowEditStudent(false);
                  resetForm();
                }}
                variant="outline"
                className="border-border bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-secondary hover:bg-secondary/90"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
