"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Users, Building2, Briefcase, Shield, ArrowRight } from "lucide-react";
import Navigation from "@/components/navigation";

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: "student",
      title: "Student",
      description:
        "Access your academic credentials, report cards, and verified certifications",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      href: "/student-login",
    },
    {
      id: "institution",
      title: "Institution",
      description:
        "Register your institution and manage student enrollment and credentials",
      icon: Building2,
      color: "from-purple-500 to-purple-600",
      href: "/institution-login",
    },
    {
      id: "employer",
      title: "Employer",
      description:
        "Verify student credentials and access certified academic reports",
      icon: Briefcase,
      color: "from-green-500 to-green-600",
      href: "/employer-login",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="px-6 py-20 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Select Your Role
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your role to access the appropriate dashboard and manage your
            credentials securely
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Link key={role.id} href={role.href}>
                <Card className="bg-card border-border p-8 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div
                      className={`w-16 h-16 bg-linear-to-br ${role.color} rounded-xl flex items-center justify-center`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        {role.title}
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        {role.description}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-primary font-semibold">
                      Continue <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Help Section */}
        <div className="max-w-3xl mx-auto bg-card/50 border border-border rounded-xl p-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Need Help?</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-semibold text-foreground mb-2">Students</p>
              <p className="text-muted-foreground">
                Sign in with your email to access your verified academic
                credentials and report cards
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Institutions</p>
              <p className="text-muted-foreground">
                Register your institution to manage students and issue verified
                digital credentials
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Employers</p>
              <p className="text-muted-foreground">
                Verify student credentials and access certified reports through
                our verification portal
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
