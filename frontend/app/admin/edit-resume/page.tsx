'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'

// Define resume data structure
interface ResumeData {
  name: string
  title: string
  location: string
  phone: string
  email: string
  github: string
  linkedin: string
  summary: string
  skills: { [category: string]: string[] }
  experience: Array<{
    title: string
    company: string
    period: string
    achievements: string[]
  }>
  projects: Array<{
    title: string
    description: string
    tech: string
  }>
  education: {
    degree: string
    school: string
    period: string
  }
  certifications: string[]
}

export default function EditResume() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Resume data state
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: 'Amanuel Z. Alemu',
    title: 'AWS Solutions Architect • Full-Stack Developer • Fintech Specialist',
    location: 'Hyattsville, MD',
    phone: '+1 (240) 927-7827',
    email: 'Amanuelzegeye63@gmail.com',
    github: 'https://github.com/AZZ2181',
    linkedin: 'https://www.linkedin.com/in/amanuel-alemu-50b014255',
    summary: 'AWS Certified Solutions Architect and full-stack developer with expertise in cloud-native architectures, fintech solutions, and mobile development. Proven track record of leading cross-functional teams to deliver scalable applications serving 100,000+ users. Specialized in serverless computing, Infrastructure as Code, and secure payment systems with deep knowledge of KYC/AML compliance and PCI DSS standards.',
    skills: {
      'Cloud & DevOps': ['AWS (EC2, S3, Lambda, RDS, CloudFormation, Textract, Cognito)', 'Kubernetes', 'CI/CD (GitHub Actions, Jenkins)', 'Linux', 'Infrastructure as Code', 'CloudWatch', 'Prometheus', 'Grafana'],
      'Software Development': ['Java/Kotlin', 'Spring Boot', 'Node.js', 'React', 'TypeScript', 'REST APIs', 'Microservices', 'MySQL, PostgreSQL, MongoDB'],
      'Fintech': ['Digital wallets', 'Remittance systems', 'Payment APIs', 'KYC/AML compliance', 'PCI DSS compliance', 'Data encryption & security'],
      'Data & Analytics': ['ETL pipelines', 'Data analytics', 'QlikSense dashboards', 'NumPy', 'SQL', 'Python'],
      'Leadership': ['Certified Scrum Master', 'Agile delivery', 'Cross-functional team management', 'Stakeholder communication', 'Technical documentation'],
    },
    experience: [
      {
        title: 'Strategy & Product Design Lead',
        company: 'IE Networks Solution',
        period: 'Sep 2024 - Apr 2025',
        achievements: [
          'Led launch of BPO-ITO and Tech Talent Academy initiatives, projected to contribute 20%+ of annual revenue',
          'Managed cross-functional team of 10+ engineers, analysts, and project managers delivering digital solutions',
          'Spearheaded Selamnew Workspace platform, cutting internal coordination time by 30% through cloud workflows',
          'Developed 3-year strategic plan using Stanford Seed methodology, aligning technology with growth milestones',
          'Secured 5+ strategic partnerships generating 15% increase in B2B sales opportunities',
        ],
      },
      {
        title: 'Senior Mobile Developer (Data Analytics & Software Lead)',
        company: 'Lersha, Green Agro Solution',
        period: 'Sep 2021 - May 2024',
        achievements: [
          'Led development of native Android applications using Java/Kotlin, serving 1,300+ agents and 100,000+ farmers',
          'Built and maintained Node.js backend systems and REST APIs for reliable data synchronization',
          'Integrated offline-first functionality and real-time API data exchange for low-connectivity rural areas',
          'Implemented data analytics pipelines using SQL and Python supporting reporting for 100,000+ farmers',
          'Generated KYC dashboards and project-specific reports for clients',
        ],
      },
    ],
    projects: [
      {
        title: 'AP Wallet - Personal Fintech Project',
        description: 'Built a digital payments and remittance app leveraging 15+ AWS services (Lambda, S3, RDS, Cognito) for secure, scalable, cloud-native architecture. Deployed CI/CD pipelines on GitHub Actions, reducing release cycles by 40%.',
        tech: 'AWS Lambda • S3 • RDS • Cognito • GitHub Actions • CI/CD',
      },
      {
        title: 'Lersha App - Android & Backend Development',
        description: 'Developed and deployed 4 native Android apps (Agent, Service Provider, Dashboard, and Loan modules) serving 1,300+ agents and 100,000+ farmers with offline-first functionality.',
        tech: 'Java/Kotlin • Node.js • MySQL • REST APIs • Android SDK',
      },
    ],
    education: {
      degree: 'Bachelor of Science in Software Engineering',
      school: 'Staffordshire University',
      period: '2018 - 2021',
    },
    certifications: [
      'AWS Certified Solutions Architect - Associate',
      'Certified Scrum Master (CSM)',
      'HashiCorp Certified: Terraform Associate',
    ],
  })

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      // Load resume data from API (future implementation)
      // For now, using default data
    }
  }, [router])

  const handleSave = async () => {
    setSaving(true)
    setSaveStatus('idle')

    try {
      localStorage.setItem('resume_data', JSON.stringify(resumeData))
      await new Promise(resolve => setTimeout(resolve, 1000))

      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (error) {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } finally {
      setSaving(false)
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

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white transition-colors"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>

              {saveStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>Saved!</span>
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span>Error saving</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Edit Resume Content</h2>

            {/* Personal Info */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={resumeData.name}
                    onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Professional Title</label>
                  <input
                    type="text"
                    value={resumeData.title}
                    onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                    <input
                      type="text"
                      value={resumeData.location}
                      onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                    <input
                      type="text"
                      value={resumeData.phone}
                      onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Professional Summary</h3>
              <textarea
                value={resumeData.summary}
                onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-4">
              <p className="text-blue-200 text-sm">
                <strong>Note:</strong> This is a simplified editor. Currently saves to browser storage. For full resume editing, expand this interface or modify the Resume component directly.
              </p>
            </div>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Live Preview</h2>
              <div className="bg-white rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {resumeData.name}
                  </h1>
                  <p className="text-lg text-slate-700 font-medium">{resumeData.title}</p>
                  <p className="text-sm text-slate-600 mt-2">
                    {resumeData.location} • {resumeData.phone} • {resumeData.email}
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Professional Summary</h3>
                  <p className="text-slate-700 leading-relaxed">{resumeData.summary}</p>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Experience</h3>
                  {resumeData.experience.map((job, idx) => (
                    <div key={idx} className="mb-4">
                      <h4 className="font-bold text-slate-900">{job.title}</h4>
                      <p className="text-blue-600 text-sm">{job.company}</p>
                      <p className="text-slate-500 text-sm">{job.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
