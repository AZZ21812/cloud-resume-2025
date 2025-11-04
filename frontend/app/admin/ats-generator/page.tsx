'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, FileDown, Sparkles, Upload, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import jsPDF from 'jspdf'
import { getFormattedResumeForATS } from '@/lib/resumeData'

export default function ATSGenerator() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [jobDescription, setJobDescription] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [tailoredResume, setTailoredResume] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError('Please paste a job description first')
      return
    }

    setGenerating(true)
    setError('')
    setGenerated(false)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CHATBOT_API
      if (!apiUrl) {
        setError('Chatbot API URL not configured')
        setGenerating(false)
        return
      }

      // Build the prompt for resume generation using resume data file
      const prompt = getFormattedResumeForATS(jobDescription)

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: prompt,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate resume')
      }

      const data = await response.json()
      // Chatbot API returns "answer" field
      setTailoredResume(data.answer || data.response || data.message || 'Resume generated successfully')
      setGenerated(true)
    } catch (err) {
      setError('Failed to generate resume. Please try again.')
      console.error(err)
    } finally {
      setGenerating(false)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([tailoredResume], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Amanuel_Alemu_Resume_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownloadPDF = async () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const leftMargin = 20
      const rightMargin = 20
      const maxWidth = pageWidth - leftMargin - rightMargin
      let y = 20

      // Helper function to check if we need a new page
      const checkPageBreak = (heightNeeded: number) => {
        if (y + heightNeeded > pageHeight - 20) {
          doc.addPage()
          y = 20
          return true
        }
        return false
      }

      // Parse the resume text
      const resumeLines = tailoredResume.split('\n')

      // Process each line
      for (let i = 0; i < resumeLines.length; i++) {
        const line = resumeLines[i].trim()

        // Skip empty lines but add spacing
        if (!line) {
          y += 2
          continue
        }

        // Detect different types of content
        const isSectionHeader = /^(PROFESSIONAL SUMMARY|TECHNICAL SKILLS|PROFESSIONAL EXPERIENCE|EXPERIENCE|PROJECTS|EDUCATION|CERTIFICATIONS)$/i.test(line)
        const isContactInfo = line.includes('@') || line.includes('linkedin.com') || line.includes('github.com') || /^\+?\d/.test(line)
        const isBullet = line.startsWith('•') || line.startsWith('-')
        const isJobTitle = line.includes('|') && (line.includes('20') || line.includes('19'))
        const isName = i === 0 || (i < 5 && /^[A-Z][a-z]+\s+[A-Z]\.?\s+[A-Z][a-z]+/.test(line))

        // Render based on content type
        if (isName) {
          // Name - large, bold, centered
          checkPageBreak(10)
          doc.setFontSize(18)
          doc.setFont('helvetica', 'bold')
          doc.setTextColor(0, 0, 0)
          doc.text(line, pageWidth / 2, y, { align: 'center' })
          y += 8
        } else if (isContactInfo && i < 10) {
          // Contact info - smaller, centered
          checkPageBreak(5)
          doc.setFontSize(9)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(60, 60, 60)
          doc.text(line, pageWidth / 2, y, { align: 'center' })
          y += 4
        } else if (isSectionHeader) {
          // Section headers - bold, with line underneath
          checkPageBreak(10)
          y += 4
          doc.setFontSize(12)
          doc.setFont('helvetica', 'bold')
          doc.setTextColor(0, 0, 0)
          doc.text(line.toUpperCase(), leftMargin, y)
          y += 2
          doc.setLineWidth(0.5)
          doc.setDrawColor(0, 0, 0)
          doc.line(leftMargin, y, pageWidth - rightMargin, y)
          y += 5
        } else if (isJobTitle) {
          // Job titles with dates - bold
          checkPageBreak(6)
          doc.setFontSize(11)
          doc.setFont('helvetica', 'bold')
          doc.setTextColor(0, 0, 0)
          const lines = doc.splitTextToSize(line, maxWidth)
          doc.text(lines, leftMargin, y)
          y += lines.length * 5
        } else if (isBullet) {
          // Bullet points - indented
          checkPageBreak(6)
          doc.setFontSize(10)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(40, 40, 40)
          const bulletText = line.substring(line.indexOf('•') + 1 || line.indexOf('-') + 1).trim()
          const lines = doc.splitTextToSize(bulletText, maxWidth - 8)
          doc.text('•', leftMargin + 2, y)
          doc.text(lines, leftMargin + 7, y)
          y += lines.length * 4 + 1
        } else {
          // Regular paragraph text
          checkPageBreak(6)
          doc.setFontSize(10)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(40, 40, 40)
          const lines = doc.splitTextToSize(line, maxWidth)
          doc.text(lines, leftMargin, y)
          y += lines.length * 4.5 + 1
        }
      }

      // Add footer with page numbers
      const totalPages = doc.internal.pages.length - 1
      doc.setTextColor(128, 128, 128)
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setFont('helvetica', 'normal')
        doc.text(
          `Amanuel Z. Alemu - Resume - Page ${i} of ${totalPages}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        )
      }

      // Save the PDF
      const fileName = `Amanuel_Alemu_Resume_${new Date().toISOString().split('T')[0]}.pdf`
      doc.save(fileName)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try downloading as TXT instead.')
    }
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-800/90 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>

            <h1 className="text-xl font-bold text-white">ATS Resume Generator</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Job Description</h2>
                  <p className="text-sm text-slate-400">Paste the job posting here</p>
                </div>
              </div>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here...

Example:
Senior Full-Stack Developer
We're looking for an experienced developer with:
- 5+ years of experience with React and Node.js
- Strong AWS cloud experience (Lambda, S3, RDS)
- Experience with CI/CD pipelines
- etc..."
                rows={20}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-slate-500"
              />

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={generating || !jobDescription.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Generating with AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Tailored Resume</span>
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              {generated && (
                <div className="mt-4 p-4 bg-green-900/30 border border-green-700 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <p className="text-sm text-green-200">Resume generated successfully! Review and download.</p>
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-200 mb-3">How it works:</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">1.</span>
                  <span>Paste the complete job description from the company</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">2.</span>
                  <span>AI (Amazon Bedrock Claude) analyzes keywords and requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">3.</span>
                  <span>Your resume is tailored with matching keywords and relevant experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">4.</span>
                  <span>Download ATS-optimized version for application</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                    <FileDown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Tailored Resume</h2>
                    <p className="text-sm text-slate-400">ATS-optimized output</p>
                  </div>
                </div>

                {generated && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Download TXT</span>
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                )}
              </div>

              {!generated && !generating && (
                <div className="h-[600px] flex items-center justify-center border-2 border-dashed border-slate-600 rounded-lg">
                  <div className="text-center text-slate-400">
                    <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-lg">Your tailored resume will appear here</p>
                    <p className="text-sm mt-2">Paste a job description and click Generate</p>
                  </div>
                </div>
              )}

              {generating && (
                <div className="h-[600px] flex items-center justify-center">
                  <div className="text-center text-white">
                    <Loader className="w-12 h-12 mx-auto mb-4 animate-spin text-purple-400" />
                    <p className="text-lg font-semibold">Analyzing job description...</p>
                    <p className="text-sm text-slate-400 mt-2">This may take 10-30 seconds</p>
                  </div>
                </div>
              )}

              {generated && (
                <div className="bg-white rounded-lg p-8 max-h-[1800px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800 leading-relaxed">
                    {tailoredResume}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
