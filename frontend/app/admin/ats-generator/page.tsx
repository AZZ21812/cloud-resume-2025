'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, FileDown, Sparkles, Upload, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import jsPDF from 'jspdf'

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
      // Using chatbot API for resume generation (dedicated ATS Lambda has import issues)
      const apiUrl = 'https://hefzysfj6mkfl5jl4zmueoesa40gwtfc.lambda-url.us-east-1.on.aws/'

      // Build the prompt for resume generation
      const prompt = `You are an expert ATS resume writer for SOFTWARE ENGINEERING and TECH ROLES. Your task is to create a resume that will score 95%+ in ATS systems by ensuring MAXIMUM keyword matching.

=== CANDIDATE PROFILE ===
Name: Amanuel Z. Alemu
Email: Amanuelzegeye63@gmail.com
Phone: +1 (240) 927-7827
Location: Hyattsville, MD
LinkedIn: linkedin.com/in/amanuel-alemu-50b014255
GitHub: github.com/AZZ2181

=== TECHNICAL SKILLS (Use these to match job requirements) ===
CLOUD & INFRASTRUCTURE:
AWS (EC2, S3, Lambda, RDS, DynamoDB, CloudFormation, CloudFront, API Gateway, IAM, VPC, Route53, CloudWatch, SNS, SQS, Textract, Cognito, Bedrock, ECS, Fargate), Azure, Google Cloud Platform, Kubernetes, Docker, Terraform, Infrastructure as Code (IaC), Serverless Architecture, Microservices, CI/CD Pipelines

PROGRAMMING LANGUAGES:
Java, Kotlin, JavaScript, TypeScript, Python, Node.js, SQL, HTML, CSS, Bash/Shell scripting

FRAMEWORKS & LIBRARIES:
React.js, Next.js, React Native, Spring Boot, Express.js, Redux, REST APIs, GraphQL, WebSockets, OAuth, JWT

DATABASES & DATA:
MySQL, PostgreSQL, MongoDB, DynamoDB, Redis, SQL, NoSQL, Database design, ETL pipelines, Data analytics, Data warehousing, QlikSense, NumPy, Pandas

DEVOPS & TOOLS:
GitHub Actions, Jenkins, GitLab CI, CircleCI, Git, GitHub, Jira, Confluence, Agile/Scrum, Linux/Unix, Nginx, Apache, Prometheus, Grafana, ELK Stack, New Relic

SOFTWARE ENGINEERING:
Object-Oriented Programming (OOP), Design Patterns, SOLID principles, Test-Driven Development (TDD), Unit Testing, Integration Testing, Jest, Enzyme, JUnit, Code Review, Refactoring, Performance Optimization, Security Best Practices

FINTECH & PAYMENT SYSTEMS:
Digital wallets, Remittance systems, Payment gateway integration, PCI DSS compliance, KYC/AML compliance, Fraud detection, Transaction processing, Financial APIs, Banking systems, Payment APIs (Stripe, PayPal), Data encryption, Security compliance

MOBILE DEVELOPMENT:
Android SDK, Android Studio, Kotlin, Java for Android, React Native, Mobile-first design, Offline-first architecture, Push notifications, App distribution (Google Play), Mobile analytics

=== PROFESSIONAL EXPERIENCE (Highlight relevant parts based on job) ===

Strategy & Product Design Lead | IE Networks Solution | Sep 2024 - Apr 2025
• Led strategic technology initiatives including BPO-ITO services and Tech Talent Academy, projected to contribute 20%+ of annual revenue through cloud-based solutions and modern software architecture
• Managed cross-functional engineering team of 10+ developers, analysts, and project managers delivering enterprise-grade digital transformation solutions using Agile methodologies and modern tech stacks
• Architected and spearheaded Selamnew Workspace platform using cloud infrastructure, cutting internal coordination time by 30% through automated workflows and real-time collaboration features
• Developed comprehensive 3-year technology roadmap using Stanford Seed methodology, aligning software development practices with business growth milestones and industry best practices
• Secured 5+ strategic technology partnerships generating 15% increase in B2B sales opportunities through innovative software solutions and integration capabilities

Senior Mobile Developer & Data Analytics Lead | Lersha, Green Agro Solution | Sep 2021 - May 2024
• Led end-to-end development of 4 native Android applications using Java/Kotlin and Android SDK, serving 1,300+ field agents and 100,000+ farmers with offline-first architecture and real-time synchronization
• Designed and built scalable Node.js backend systems with RESTful APIs handling 100,000+ daily transactions, implementing microservices architecture and database optimization for high-volume data processing
• Integrated offline-first functionality with intelligent data synchronization, enabling seamless operation in low-connectivity rural areas through local caching, conflict resolution, and batch processing algorithms
• Implemented comprehensive data analytics pipelines using SQL, Python, and ETL frameworks, processing agricultural data for 100,000+ farmers and generating actionable business intelligence dashboards
• Developed KYC verification dashboards and automated reporting systems using QlikSense, Python scripts, and SQL queries for financial compliance and project management stakeholders
• Optimized application performance achieving 40% faster load times through code refactoring, lazy loading, caching strategies, and database query optimization
• Collaborated with cross-functional teams including product managers, UX designers, and QA engineers in Agile sprints, conducting code reviews and maintaining 95%+ test coverage

=== FEATURED PROJECTS (Emphasize technical depth) ===

AP Wallet - Cloud-Native Fintech Application (Personal Project)
• Architected and developed full-stack digital payments and remittance platform leveraging 15+ AWS services including Lambda for serverless compute, S3 for object storage, RDS for relational data, Cognito for authentication, API Gateway for RESTful endpoints, and CloudFormation for infrastructure as code
• Implemented secure, PCI DSS-compliant payment processing system with end-to-end encryption, tokenization, fraud detection algorithms, and multi-factor authentication
• Built CI/CD pipelines using GitHub Actions with automated testing, code quality checks, security scanning, and zero-downtime deployments, reducing release cycles by 40%
• Designed scalable microservices architecture handling concurrent user sessions with auto-scaling, load balancing, and fault-tolerant distributed systems

Cloud Resume Challenge - Modern Serverless Web Application (2025)
• Developed production-ready serverless resume website using Next.js, TypeScript, and AWS serverless stack demonstrating cloud-native architecture and modern web development practices
• Implemented real-time visitor counter using AWS Lambda, DynamoDB, and API Gateway with CORS configuration, achieving 99.99% uptime and sub-50ms response times
• Integrated AI-powered chatbot using Amazon Bedrock (Claude 3 Haiku) for intelligent Q&A, natural language processing, and dynamic content generation
• Automated infrastructure deployment using SST (Serverless Stack), implementing Infrastructure as Code principles with version control and reproducible deployments
• Configured CloudFront CDN for global content delivery, S3 for static hosting, and implemented comprehensive monitoring with CloudWatch metrics and alarms

Lersha Agricultural Platform - Enterprise Mobile & Backend System
• Led development of comprehensive agricultural tech platform with 4 interconnected Android applications: Agent app, Service Provider app, Admin Dashboard, and Loan Management module
• Built robust backend infrastructure using Node.js, Express.js, MySQL database with optimized indexes, and RESTful API architecture supporting 100,000+ active users
• Implemented real-time data synchronization with conflict resolution algorithms, offline queue management, and background sync workers for unreliable network conditions
• Developed automated ETL pipelines for agricultural data processing, transforming raw field data into actionable analytics and business intelligence reports

=== EDUCATION ===
Bachelor of Science in Software Engineering | Staffordshire University | 2018 - 2021
Relevant Coursework: Data Structures & Algorithms, Database Systems, Software Architecture, Web Development, Cloud Computing, Computer Networks, Operating Systems

=== CERTIFICATIONS ===
• AWS Certified Solutions Architect - Associate (Amazon Web Services)
• Certified Scrum Master (CSM) - Scrum Alliance
• HashiCorp Certified: Terraform Associate - Infrastructure as Code

=== JOB DESCRIPTION TO MATCH ===
${jobDescription}

=== CRITICAL ATS OPTIMIZATION INSTRUCTIONS ===

**MANDATORY REQUIREMENTS - YOU MUST FOLLOW THESE:**

1. **KEYWORD MATCHING (HIGHEST PRIORITY):**
   - Extract EVERY technical keyword, tool, framework, and technology mentioned in the job description
   - Use those EXACT keywords and phrases throughout the resume (in skills section, experience bullets, project descriptions)
   - If the job mentions "React" - use "React", "React.js", and "ReactJS" in different places
   - If they want "AWS Lambda" - mention "AWS Lambda", "Lambda functions", and "serverless Lambda" multiple times
   - Mirror their exact terminology: if they say "CI/CD pipelines" use that exact phrase, not just "continuous integration"
   - Include keyword variations: "JavaScript" should appear as "JavaScript", "JS", and "ECMAScript" if relevant

2. **PROFESSIONAL SUMMARY:**
   - Write a powerful 3-4 sentence summary that is LASER-FOCUSED on the exact role
   - Include the job title they're hiring for in the first sentence
   - Pack it with the top 5-7 keywords from the job description
   - Mention years of experience that match or exceed their requirements
   - Include specific technologies they require in the summary itself

3. **TECHNICAL SKILLS SECTION:**
   - Create a comprehensive skills section organized by category
   - List technologies in order of relevance to the job description
   - Include EVERY technology from the job description that matches the candidate's skills
   - Group related technologies: "Frontend: React, Next.js, TypeScript, JavaScript, HTML5, CSS3"
   - Add proficiency keywords: "Expert in", "Advanced", "Proficient in", "Extensive experience with"

4. **EXPERIENCE SECTION - TECH-FOCUSED:**
   - Rewrite bullets to emphasize technologies and methodologies from the job description
   - Start each bullet with strong action verbs: Architected, Engineered, Developed, Implemented, Optimized, Designed, Built, Deployed
   - Include specific metrics and numbers: "Reduced latency by 40%", "Scaled to handle 100K+ users", "Improved performance by 60%"
   - For each bullet, try to include 2-3 technical keywords from the job description
   - If the job emphasizes cloud, make cloud technologies prominent in experience bullets
   - If they want leadership, emphasize team size, mentoring, and technical decisions

5. **PROJECT DESCRIPTIONS - TECHNICAL DEPTH:**
   - Highlight projects that align with the job requirements
   - Detail the tech stack used, matching job description keywords
   - Explain architecture decisions and technical challenges solved
   - Show progression from problem → solution → impact with metrics

6. **ATS FORMATTING RULES:**
   - Use standard section headers: PROFESSIONAL SUMMARY, TECHNICAL SKILLS, PROFESSIONAL EXPERIENCE, PROJECTS, EDUCATION, CERTIFICATIONS
   - Plain text format with bullet points (•)
   - No tables, no columns, no text boxes, no headers/footers
   - No special characters except bullets, hyphens, and standard punctuation
   - Date formats: "Month Year - Month Year" or "MMM YYYY - MMM YYYY"
   - Keep it to 1-2 pages maximum (aim for dense, keyword-rich content)

7. **KEYWORD DENSITY:**
   - Aim for high keyword density without keyword stuffing
   - Naturally incorporate job description keywords 3-5 times throughout the resume
   - Use variations: "AWS" and "Amazon Web Services", "AI" and "Artificial Intelligence"
   - Context matters: don't just list keywords, show them in action

8. **TRUTHFULNESS:**
   - Only use skills, experience, and achievements from the candidate profile provided
   - Do NOT invent job titles, companies, dates, or accomplishments
   - Do NOT claim experience with technologies not listed in the candidate's profile
   - You CAN emphasize and reframe existing experience to match the job

**OUTPUT FORMAT:**
Generate a complete, ready-to-paste resume that maximizes ATS score for this SPECIFIC job. Focus on software engineering/tech role optimization. Make it dense with relevant keywords while remaining readable and professional.

START RESUME NOW:`

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
                <div className="bg-white rounded-lg p-8 min-h-[600px]">
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
