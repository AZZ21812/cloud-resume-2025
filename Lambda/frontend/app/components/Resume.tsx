'use client'

import { Briefcase, GraduationCap, Code, Award, MapPin, Phone, Mail } from 'lucide-react'

export default function Resume() {
  return (
    <div className="space-y-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 animate-slide-up">
      {/* Personal Info */}
      <section>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Amanuel Z. Alemu
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
          AWS Solutions Architect | Full-Stack Developer | Fintech Specialist
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
          <a href="tel:+12409277827" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
            <Phone className="w-4 h-4" />
            +1 (240) 927-7827
          </a>
          <a href="mailto:Amanuelzegeye63@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
            <Mail className="w-4 h-4" />
            Amanuelzegeye63@gmail.com
          </a>
          <a href="https://github.com/AZZ2181" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/amanuel-alemu-50b014255" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
            LinkedIn
          </a>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            Hyattsville, MD
          </span>
        </div>
      </section>

      {/* Summary */}
      <section>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
          <Award className="w-6 h-6" />
          Professional Summary
        </h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          AWS Certified Solutions Architect and full-stack developer with expertise in cloud-native 
          architectures, fintech solutions, and mobile development. Proven track record of leading 
          cross-functional teams to deliver scalable applications serving 100,000+ users. Specialized 
          in serverless computing, Infrastructure as Code, and secure payment systems with deep 
          knowledge of KYC/AML compliance and PCI DSS standards.
        </p>
      </section>

      {/* Skills */}
      <section>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
          <Code className="w-6 h-6" />
          Technical Skills
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Cloud & DevOps</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              AWS (EC2, S3, Lambda, RDS, CloudFormation, Textract, Cognito), Kubernetes, 
              CI/CD (GitHub Actions, Jenkins), Linux, Infrastructure as Code, CloudWatch, 
              Prometheus, Grafana
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Software Development</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Java/Kotlin, Spring Boot, Node.js, React, TypeScript, REST APIs, 
              Microservices, MySQL, PostgreSQL, MongoDB
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Fintech</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Digital wallets, remittance systems, payment APIs, KYC/AML compliance, 
              PCI DSS compliance, data encryption & security
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Data & Analytics</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              ETL pipelines, data analytics, QlikSense dashboards, NumPy, SQL, Python
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Leadership</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Certified Scrum Master, Agile delivery, cross-functional team management, 
              stakeholder communication, technical documentation
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Briefcase className="w-6 h-6" />
          Professional Experience
        </h3>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
              Strategy & Product Design Lead
            </h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
              IE Networks Solution | Sep 2024 - Apr 2025
            </p>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 text-sm">
              <li>Led launch of BPO-ITO and Tech Talent Academy initiatives, projected to contribute 20%+ of annual revenue</li>
              <li>Managed cross-functional team of 10+ engineers, analysts, and project managers delivering digital solutions</li>
              <li>Spearheaded Selamnew Workspace platform, cutting internal coordination time by 30% through cloud workflows</li>
              <li>Developed 3-year strategic plan using Stanford Seed methodology, aligning technology with growth milestones</li>
              <li>Secured 5+ strategic partnerships generating 15% increase in B2B sales opportunities</li>
            </ul>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
              Senior Mobile Developer (Data Analytics & Software Lead)
            </h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
              Lersha, Green Agro Solution | Sep 2021 - May 2024
            </p>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 text-sm">
              <li>Led development of native Android applications using Java/Kotlin, serving 1,300+ agents and 100,000+ farmers</li>
              <li>Built and maintained Node.js backend systems and REST APIs for reliable data synchronization</li>
              <li>Integrated offline-first functionality and real-time API data exchange for low-connectivity rural areas</li>
              <li>Implemented data analytics pipelines using SQL and Python supporting reporting for 100,000+ farmers</li>
              <li>Generated KYC dashboards and project-specific reports for clients</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Featured Projects
        </h3>
        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
              AP Wallet - Personal Fintech Project
            </h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
              Built a digital payments and remittance app leveraging 15+ AWS services (Lambda, S3, RDS, 
              Cognito) for secure, scalable, cloud-native architecture. Deployed CI/CD pipelines on 
              GitHub Actions, reducing release cycles by 40%.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              <strong>Tech:</strong> AWS Lambda, S3, RDS, Cognito, GitHub Actions, CI/CD
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Lersha App - Android & Backend Development
            </h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
              Developed and deployed 4 native Android apps (Agent, Service Provider, Dashboard, and Loan 
              modules) serving 1,300+ agents and 100,000+ farmers with offline-first functionality.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              <strong>Tech:</strong> Java/Kotlin, Node.js, MySQL, REST APIs, Android SDK
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Dashen Malt Barley Project - Cloud Dashboard
            </h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
              Designed and deployed QlikSense dashboards to track agricultural loan disbursements and 
              repayment metrics across multiple partner institutions.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              <strong>Tech:</strong> QlikSense, SQL, Data Analytics, ETL Pipelines
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
              GSMA-IF Program - Technical & Data Solutions
            </h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
              Built 4 interactive Qlik dashboards for quarterly reporting and represented organization 
              at GSMA Mobile World Congress for partnership discussions and technical showcases.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              <strong>Tech:</strong> QlikSense, Data Migration, Custom Analytics
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Cloud Resume Challenge (2025)
            </h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
              Modern serverless resume website featuring real-time visitor counter and 
              AI-powered chatbot using Amazon Bedrock and Claude. Demonstrates cloud-native architecture 
              with Infrastructure as Code.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              <strong>Tech:</strong> Next.js, TypeScript, AWS Lambda, DynamoDB, Bedrock, SST
            </p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <GraduationCap className="w-6 h-6" />
          Education
        </h3>
        <div className="border-l-4 border-blue-500 pl-4">
          <h4 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
            Bachelor of Science in Software Engineering
          </h4>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Staffordshire University | 2018 - 2021
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
          Certifications
        </h3>
        <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1">
          <li>AWS Certified Solutions Architect - Associate</li>
          <li>Certified Scrum Master (CSM)</li>
          <li>HashiCorp Certified: Terraform Associate</li>
        </ul>
      </section>
    </div>
  )
}