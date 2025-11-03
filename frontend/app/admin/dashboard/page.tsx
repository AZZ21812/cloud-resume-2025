'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, FileDown, LogOut, Home, Edit, Briefcase } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin_token')
    const adminEmail = localStorage.getItem('admin_email')

    if (!token || !adminEmail) {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      setEmail(adminEmail)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_email')
    router.push('/admin/login')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation Bar */}
      <nav className="bg-slate-800/90 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">Admin Portal</span>
            </div>

            {/* Nav Links */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => router.push('/admin/edit-resume')}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Resume</span>
              </button>
              <button
                onClick={() => router.push('/admin/ats-generator')}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white transition-colors"
              >
                <FileDown className="w-4 h-4" />
                <span>ATS Generator</span>
              </button>
              <a
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                <span>View Public Site</span>
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ml-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back!</h1>
          <p className="text-slate-300">Logged in as: {email}</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Edit Resume Card */}
          <button
            onClick={() => router.push('/admin/edit-resume')}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700 hover:border-blue-500 transition-all hover:scale-105 text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Edit className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Edit Resume</h2>
                <p className="text-slate-600 dark:text-slate-400">Update public resume content</p>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Modify your professional summary, experience, skills, and projects. Changes will be reflected on the public-facing website.
            </p>
          </button>

          {/* ATS Generator Card */}
          <button
            onClick={() => router.push('/admin/ats-generator')}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700 hover:border-purple-500 transition-all hover:scale-105 text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileDown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">ATS Generator</h2>
                <p className="text-slate-600 dark:text-slate-400">Create tailored resumes</p>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Paste a job description and generate an ATS-optimized resume tailored to the role. Download as PDF for applications.
            </p>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">Website Visitors</div>
            <div className="text-3xl font-bold text-white">Live Counter</div>
            <div className="text-slate-500 text-xs mt-1">Check public site for current count</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">Resume Version</div>
            <div className="text-3xl font-bold text-white">v1.0</div>
            <div className="text-slate-500 text-xs mt-1">Last updated today</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">Generated Resumes</div>
            <div className="text-3xl font-bold text-white">0</div>
            <div className="text-slate-500 text-xs mt-1">ATS-optimized downloads</div>
          </div>
        </div>
      </div>
    </div>
  )
}
