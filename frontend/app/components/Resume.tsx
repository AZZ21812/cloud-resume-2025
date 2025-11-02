'use client'

import { Briefcase, GraduationCap, Code, Award, MapPin, Phone, Mail, Github, Linkedin, ExternalLink, Sparkles } from 'lucide-react'

export default function Resume() {
  return (
    <div className="space-y-6">
      {/* Contact Info Card - Modern Design */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <a href="tel:+12409277827" className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
            <Phone className="w-4 h-4" />
            <span className="font-medium">+1 (240) 927-7827</span>
          </a>
          <a href="mailto:Amanuelzegeye63@gmail.com" className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
            <Mail className="w-4 h-4" />
            <span className="font-medium">Amanuelzegeye63@gmail.com</span>
          </a>
          <a href="https://github.com/AZZ2181" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
            <Github className="w-4 h-4" />
            <span className="font-medium">GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a href="https://www.linkedin.com/in/amanuel-alemu-50b014255" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <Linkedin className="w-4 h-4" />
            <span className="font-medium">LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">Hyattsville, MD</span>
          </span>
        </div>
      </div>

      {/* Professional Summary - Highlighted Card */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl shadow-lg p-8 border border-blue-200 dark:border-blue-800">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Award className="w-6 h-6 text-white" />
          </div>
          Professional Summary
        </h3>
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
          AWS Certified Solutions Architect and full-stack developer with expertise in <span className="font-semibold text-blue-600 dark:text-blue-400">cloud-native architectures</span>, fintech solutions, and mobile development. Proven track record of leading cross-functional teams to deliver <span className="font-semibold text-purple-600 dark:text-purple-400">scalable applications serving 100,000+ users</span>. Specialized in serverless computing, Infrastructure as Code, and secure payment systems with deep knowledge of KYC/AML compliance and PCI DSS standards.
        </p>
      </div>

      {/* Technical Skills - Modern Grid */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <Code className="w-6 h-6 text-white" />
          </div>
          Technical Skills
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Cloud & DevOps",
              skills: ["AWS (EC2, S3, Lambda, RDS, CloudFormation, Textract, Cognito)", "Kubernetes", "CI/CD (GitHub Actions, Jenkins)", "Linux", "Infrastructure as Code", "CloudWatch", "Prometheus", "Grafana"],
              color: "blue"
            },
            {
              title: "Software Development",
              skills: ["Java/Kotlin", "Spring Boot", "Node.js", "React", "TypeScript", "REST APIs", "Microservices", "MySQL, PostgreSQL, MongoDB"],
              color: "purple"
            },
            {
              title: "Fintech",
              skills: ["Digital wallets", "Remittance systems", "Payment APIs", "KYC/AML compliance", "PCI DSS compliance", "Data encryption & security"],
              color: "green"
            },
            {
              title: "Data & Analytics",
              skills: ["ETL pipelines", "Data analytics", "QlikSense dashboards", "NumPy", "SQL", "Python"],
              color: "orange"
            },
            {
              title: "Leadership",
              skills: ["Certified Scrum Master", "Agile delivery", "Cross-functional team management", "Stakeholder communication", "Technical documentation"],
              color: "pink"
            }
          ].map((category, idx) => (
            <div key={idx} className={`p-6 rounded-xl bg-gradient-to-br from-${category.color}-50 to-${category.color}-100 dark:from-${category.color}-900/20 dark:to-${category.color}-900/10 border border-${category.color}-200 dark:border-${category.color}-800 hover:shadow-lg transition-shadow`}>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-lg">{category.title}</h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <span key={skillIdx} className="text-xs px-3 py-1.5 bg-white dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Experience */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          Professional Experience
        </h3>
        <div className="space-y-8">
          {[
            {
              title: "Strategy & Product Design Lead",
              company: "IE Networks Solution",
              period: "Sep 2024 - Apr 2025",
              achievements: [
                "Led launch of BPO-ITO and Tech Talent Academy initiatives, projected to contribute 20%+ of annual revenue",
                "Managed cross-functional team of 10+ engineers, analysts, and project managers delivering digital solutions",
                "Spearheaded Selamnew Workspace platform, cutting internal coordination time by 30% through cloud workflows",
                "Developed 3-year strategic plan using Stanford Seed methodology, aligning technology with growth milestones",
                "Secured 5+ strategic partnerships generating 15% increase in B2B sales opportunities"
              ]
            },
            {
              title: "Senior Mobile Developer (Data Analytics & Software Lead)",
              company: "Lersha, Green Agro Solution",
              period: "Sep 2021 - May 2024",
              achievements: [
                "Led development of native Android applications using Java/Kotlin, serving 1,300+ agents and 100,000+ farmers",
                "Built and maintained Node.js backend systems and REST APIs for reliable data synchronization",
                "Integrated offline-first functionality and real-time API data exchange for low-connectivity rural areas",
                "Implemented data analytics pipelines using SQL and Python supporting reporting for 100,000+ farmers",
                "Generated KYC dashboards and project-specific reports for clients"
              ]
            }
          ].map((job, idx) => (
            <div key={idx} className="relative pl-8 border-l-4 border-gradient-to-b from-blue-500 to-purple-500">
              <div className="absolute left-[-13px] top-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 border-4 border-white dark:border-slate-800"></div>
              <h4 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-1">{job.title}</h4>
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-1">{job.company}</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                {job.period}
              </p>
              <ul className="space-y-2">
                {job.achievements.map((achievement, achIdx) => (
                  <li key={achIdx} className="flex gap-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    <span className="text-blue-600 dark:text-blue-400 mt-1">▸</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects - Card Grid */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          Featured Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "AP Wallet - Personal Fintech Project",
              description: "Built a digital payments and remittance app leveraging 15+ AWS services (Lambda, S3, RDS, Cognito) for secure, scalable, cloud-native architecture. Deployed CI/CD pipelines on GitHub Actions, reducing release cycles by 40%.",
              tech: "AWS Lambda • S3 • RDS • Cognito • GitHub Actions • CI/CD",
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              title: "Lersha App - Android & Backend Development",
              description: "Developed and deployed 4 native Android apps (Agent, Service Provider, Dashboard, and Loan modules) serving 1,300+ agents and 100,000+ farmers with offline-first functionality.",
              tech: "Java/Kotlin • Node.js • MySQL • REST APIs • Android SDK",
              gradient: "from-green-500 to-emerald-500"
            },
            {
              title: "Dashen Malt Barley Project - Cloud Dashboard",
              description: "Designed and deployed QlikSense dashboards to track agricultural loan disbursements and repayment metrics across multiple partner institutions.",
              tech: "QlikSense • SQL • Data Analytics • ETL Pipelines",
              gradient: "from-purple-500 to-pink-500"
            },
            {
              title: "Cloud Resume Challenge (2025)",
              description: "Modern serverless resume website featuring real-time visitor counter and AI-powered chatbot using Amazon Bedrock and Claude. Demonstrates cloud-native architecture with Infrastructure as Code.",
              tech: "Next.js • TypeScript • AWS Lambda • DynamoDB • Bedrock • SST",
              gradient: "from-orange-500 to-red-500"
            }
          ].map((project, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.gradient} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-3 relative z-10">{project.title}</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-4 leading-relaxed relative z-10">{project.description}</p>
              <div className="relative z-10">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">TECH STACK</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{project.tech}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Certifications - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            Education
          </h3>
          <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-2">
              Bachelor of Science in Software Engineering
            </h4>
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-1">Staffordshire University</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">2018 - 2021</p>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            Certifications
          </h3>
          <div className="space-y-3">
            {[
              { name: "AWS Certified Solutions Architect - Associate", color: "orange" },
              { name: "Certified Scrum Master (CSM)", color: "blue" },
              { name: "HashiCorp Certified: Terraform Associate", color: "purple" }
            ].map((cert, idx) => (
              <div key={idx} className={`flex items-center gap-3 p-4 bg-gradient-to-r from-${cert.color}-50 to-${cert.color}-100 dark:from-${cert.color}-900/20 dark:to-${cert.color}-900/10 rounded-lg border border-${cert.color}-200 dark:border-${cert.color}-800`}>
                <div className={`w-2 h-2 bg-${cert.color}-600 rounded-full`}></div>
                <span className="text-slate-800 dark:text-slate-200 font-medium text-sm">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
