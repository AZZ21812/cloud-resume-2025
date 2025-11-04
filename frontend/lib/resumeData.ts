/**
 * Resume data for Amanuel Z. Alemu
 * This file contains all professional information used by the ATS generator
 */

export const CANDIDATE_INFO = {
  name: "Amanuel Z. Alemu",
  email: "Amanuelzegeye63@gmail.com",
  phone: "+1 (240) 927-7827",
  location: "Hyattsville, MD",
  linkedin: "linkedin.com/in/amanuel-alemu-50b014255",
  github: "github.com/AZZ2181"
}

export const TECHNICAL_SKILLS = {
  "Cloud & Infrastructure": [
    "AWS (EC2, S3, Lambda, RDS, DynamoDB, CloudFormation, CloudFront, API Gateway, IAM, VPC, Route53, CloudWatch, SNS, SQS, Textract, Cognito, Bedrock, ECS, Fargate)",
    "Azure",
    "Google Cloud Platform",
    "Kubernetes",
    "Docker",
    "Terraform",
    "Infrastructure as Code (IaC)",
    "Serverless Architecture",
    "Microservices",
    "CI/CD Pipelines"
  ],
  "Programming Languages": [
    "Java",
    "Kotlin",
    "JavaScript",
    "TypeScript",
    "Python",
    "Node.js",
    "SQL",
    "HTML",
    "CSS",
    "Bash/Shell scripting"
  ],
  "Frameworks & Libraries": [
    "React.js",
    "Next.js",
    "React Native",
    "Spring Boot",
    "Express.js",
    "Redux",
    "REST APIs",
    "GraphQL",
    "WebSockets",
    "OAuth",
    "JWT"
  ],
  "Databases & Data": [
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "DynamoDB",
    "Redis",
    "SQL",
    "NoSQL",
    "Database design",
    "ETL pipelines",
    "Data analytics",
    "Data warehousing",
    "QlikSense",
    "NumPy",
    "Pandas"
  ],
  "DevOps & Tools": [
    "GitHub Actions",
    "Jenkins",
    "GitLab CI",
    "CircleCI",
    "Git",
    "GitHub",
    "Jira",
    "Confluence",
    "Agile/Scrum",
    "Linux/Unix",
    "Nginx",
    "Apache",
    "Prometheus",
    "Grafana",
    "ELK Stack",
    "New Relic"
  ],
  "Software Engineering": [
    "Object-Oriented Programming (OOP)",
    "Design Patterns",
    "SOLID principles",
    "Test-Driven Development (TDD)",
    "Unit Testing",
    "Integration Testing",
    "Jest",
    "Enzyme",
    "JUnit",
    "Code Review",
    "Refactoring",
    "Performance Optimization",
    "Security Best Practices"
  ],
  "Fintech & Payment Systems": [
    "Digital wallets",
    "Remittance systems",
    "Payment gateway integration",
    "PCI DSS compliance",
    "KYC/AML compliance",
    "Fraud detection",
    "Transaction processing",
    "Financial APIs",
    "Banking systems",
    "Payment APIs (Stripe, PayPal)",
    "Data encryption",
    "Security compliance"
  ],
  "Mobile Development": [
    "Android SDK",
    "Android Studio",
    "Kotlin",
    "Java for Android",
    "React Native",
    "Mobile-first design",
    "Offline-first architecture",
    "Push notifications",
    "App distribution (Google Play)",
    "Mobile analytics"
  ]
}

export const PROFESSIONAL_EXPERIENCE = [
  {
    title: "Strategy & Product Design Lead",
    company: "IE Networks Solution",
    period: "Sep 2024 - Apr 2025",
    achievements: [
      "Led strategic technology initiatives including BPO-ITO services and Tech Talent Academy, projected to contribute 20%+ of annual revenue through cloud-based solutions and modern software architecture",
      "Managed cross-functional engineering team of 10+ developers, analysts, and project managers delivering enterprise-grade digital transformation solutions using Agile methodologies and modern tech stacks",
      "Architected and spearheaded Selamnew Workspace platform using cloud infrastructure, cutting internal coordination time by 30% through automated workflows and real-time collaboration features",
      "Developed comprehensive 3-year technology roadmap using Stanford Seed methodology, aligning software development practices with business growth milestones and industry best practices",
      "Secured 5+ strategic technology partnerships generating 15% increase in B2B sales opportunities through innovative software solutions and integration capabilities"
    ]
  },
  {
    title: "Senior Mobile Developer & Data Analytics Lead",
    company: "Lersha, Green Agro Solution",
    period: "Sep 2021 - May 2024",
    achievements: [
      "Led end-to-end development of 4 native Android applications using Java/Kotlin and Android SDK, serving 1,300+ field agents and 100,000+ farmers with offline-first architecture and real-time synchronization",
      "Designed and built scalable Node.js backend systems with RESTful APIs handling 100,000+ daily transactions, implementing microservices architecture and database optimization for high-volume data processing",
      "Integrated offline-first functionality with intelligent data synchronization, enabling seamless operation in low-connectivity rural areas through local caching, conflict resolution, and batch processing algorithms",
      "Implemented comprehensive data analytics pipelines using SQL, Python, and ETL frameworks, processing agricultural data for 100,000+ farmers and generating actionable business intelligence dashboards",
      "Developed KYC verification dashboards and automated reporting systems using QlikSense, Python scripts, and SQL queries for financial compliance and project management stakeholders",
      "Optimized application performance achieving 40% faster load times through code refactoring, lazy loading, caching strategies, and database query optimization",
      "Collaborated with cross-functional teams including product managers, UX designers, and QA engineers in Agile sprints, conducting code reviews and maintaining 95%+ test coverage"
    ]
  }
]

export const PROJECTS = [
  {
    name: "AP Wallet - Cloud-Native Fintech Application",
    type: "Personal Project",
    description: [
      "Architected and developed full-stack digital payments and remittance platform leveraging 15+ AWS services including Lambda for serverless compute, S3 for object storage, RDS for relational data, Cognito for authentication, API Gateway for RESTful endpoints, and CloudFormation for infrastructure as code",
      "Implemented secure, PCI DSS-compliant payment processing system with end-to-end encryption, tokenization, fraud detection algorithms, and multi-factor authentication",
      "Built CI/CD pipelines using GitHub Actions with automated testing, code quality checks, security scanning, and zero-downtime deployments, reducing release cycles by 40%",
      "Designed scalable microservices architecture handling concurrent user sessions with auto-scaling, load balancing, and fault-tolerant distributed systems",
      "Built the AP wallet to be scalable for a seamless AI integration"
    ]
  },
  {
    name: "Cloud Resume Challenge - Modern Serverless Web Application",
    type: "2025",
    description: [
      "Developed production-ready serverless resume website using Next.js, TypeScript, and AWS serverless stack demonstrating cloud-native architecture and modern web development practices",
      "Implemented real-time visitor counter using AWS Lambda, DynamoDB, and API Gateway with CORS configuration, achieving 99.99% uptime and sub-50ms response times",
      "Integrated AI-powered chatbot using Amazon Bedrock (Claude 3 Haiku) for intelligent Q&A, natural language processing, and dynamic content generation",
      "Automated infrastructure deployment using SST (Serverless Stack), implementing Infrastructure as Code principles with version control and reproducible deployments",
      "Configured CloudFront CDN for global content delivery, S3 for static hosting, and implemented comprehensive monitoring with CloudWatch metrics and alarms"
    ]
  },
  {
    name: "Lersha Agricultural Platform - Enterprise Mobile & Backend System",
    type: "Android & Backend Development",
    description: [
      "Led development of comprehensive agricultural tech platform with 4 interconnected Android applications: Agent app, Service Provider app, Admin Dashboard, and Loan Management module",
      "Built robust backend infrastructure using Node.js, Express.js, MySQL database with optimized indexes, and RESTful API architecture supporting 100,000+ active users",
      "Implemented real-time data synchronization with conflict resolution algorithms, offline queue management, and background sync workers for unreliable network conditions",
      "Developed automated ETL pipelines for agricultural data processing, transforming raw field data into actionable analytics and business intelligence reports",
      "Delivered offline-first functionality and real-time data sync, enabling 1,300+ farmers to access financial and agricultural services seamlessly",
      "Integrated REST APIs and cloud-hosted backend services, achieving 99% app uptime in low-connectivity regions"
    ]
  },
  {
    name: "Dashen Malt Barley Project - Cloud Dashboard Development",
    type: "Data Analytics",
    description: [
      "Designed and deployed Qlik Sense dashboards to track agricultural loan disbursements and repayment metrics across multiple partner institutions"
    ]
  },
  {
    name: "GSMA-IF Program - Technical & Data Solutions",
    type: "Technical Lead",
    description: [
      "Built 4 interactive Qlik dashboards for quarterly reporting using customized analytics for stakeholders",
      "Supported backend data migration and customization of partner apps to align with GSMA project requirements",
      "Represented organization at GSMA Mobile World Congress, contributing to partnership discussions and technical showcases"
    ]
  },
  {
    name: "Mercy Corps Agri-Fin Project - Business & Technical Lead",
    type: "Technical Lead",
    description: [
      "Drafted and finalized RFPs and technical proposals for SNNPR region rollout, securing partnership approval for deployment",
      "Led the customization of digital service applications, translating stakeholder requirements into scalable software and cloud-based solutions",
      "Delivered project documentation and quarterly reports aligning with donor and compliance standards"
    ]
  }
]

export const EDUCATION = {
  degree: "Bachelor of Science in Software Engineering",
  university: "Staffordshire University",
  period: "2018 - 2021",
  coursework: [
    "Data Structures & Algorithms",
    "Database Systems",
    "Software Architecture",
    "Web Development",
    "Cloud Computing",
    "Computer Networks",
    "Operating Systems"
  ]
}

export const CERTIFICATIONS = [
  "AWS Certified Solutions Architect - Associate (Amazon Web Services)",
  "Certified Scrum Master (CSM) - Scrum Alliance",
  "HashiCorp Certified: Terraform Associate - Infrastructure as Code"
]

export function getFormattedResumeForATS(jobDescription: string): string {
  let resume = `You are an expert ATS resume writer for SOFTWARE ENGINEERING and TECH ROLES. Your task is to create a resume that will score 95%+ in ATS systems by ensuring MAXIMUM keyword matching.

=== CANDIDATE PROFILE ===
Name: ${CANDIDATE_INFO.name}
Email: ${CANDIDATE_INFO.email}
Phone: ${CANDIDATE_INFO.phone}
Location: ${CANDIDATE_INFO.location}
LinkedIn: ${CANDIDATE_INFO.linkedin}
GitHub: ${CANDIDATE_INFO.github}

=== TECHNICAL SKILLS (Use these to match job requirements) ===
`

  for (const [category, skills] of Object.entries(TECHNICAL_SKILLS)) {
    resume += `\n${category.toUpperCase()}:\n`
    resume += skills.join(", ") + "\n"
  }

  resume += "\n=== PROFESSIONAL EXPERIENCE (Highlight relevant parts based on job) ===\n"
  for (const exp of PROFESSIONAL_EXPERIENCE) {
    resume += `\n${exp.title} | ${exp.company} | ${exp.period}\n`
    for (const achievement of exp.achievements) {
      resume += `• ${achievement}\n`
    }
  }

  resume += "\n=== FEATURED PROJECTS (Emphasize technical depth) ===\n"
  for (const project of PROJECTS) {
    resume += `\n${project.name} (${project.type})\n`
    for (const desc of project.description) {
      resume += `• ${desc}\n`
    }
  }

  resume += `\n=== EDUCATION ===\n`
  resume += `${EDUCATION.degree} | ${EDUCATION.university} | ${EDUCATION.period}\n`
  resume += `Relevant Coursework: ${EDUCATION.coursework.join(", ")}\n`

  resume += "\n=== CERTIFICATIONS ===\n"
  for (const cert of CERTIFICATIONS) {
    resume += `• ${cert}\n`
  }

  resume += `\n=== JOB DESCRIPTION TO MATCH ===\n${jobDescription}\n`

  resume += `
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
   - Create a 3-4 line summary that integrates 10-15 keywords from the job description
   - Focus on years of experience with their specific tech stack
   - Mention exact role title they're hiring for

3. **TECHNICAL SKILLS SECTION:**
   - List ALL relevant technologies from job description first
   - Group by categories that match their requirements
   - Include proficiency levels if they mention them
   - Add synonyms and related tech (e.g., if they want "containers" mention both "Docker" and "Kubernetes")

4. **EXPERIENCE SECTION:**
   - Rewrite bullet points to emphasize technologies mentioned in job description
   - Start bullets with their required skills: "Developed React applications..." not "Developed applications using React..."
   - Add metrics and numbers (users served, performance improvements, team size)
   - Mirror their language: if they say "collaborate", use "collaborated" not "worked with"

5. **QUANTIFY EVERYTHING:**
   - Add specific numbers: "100,000+ users", "40% performance improvement", "10+ team members"
   - Include timeframes: "Led 3-month project", "Reduced costs by 30% within 6 months"

6. **ATS FORMAT REQUIREMENTS:**
   - Use standard section headers: PROFESSIONAL SUMMARY, TECHNICAL SKILLS, PROFESSIONAL EXPERIENCE, EDUCATION, CERTIFICATIONS
   - Avoid tables, columns, graphics
   - Use simple bullet points (•)
   - Keep formatting minimal and clean

7. **MATCH THEIR REQUIREMENTS:**
   - If they list 10 requirements, address ALL 10 explicitly in the resume
   - Use their exact phrasing: "Agile/Scrum environment" not just "Agile"
   - If they want "5+ years" make sure experience reflects that clearly

8. **KEYWORD DENSITY:**
   - Aim for each critical skill to appear 3-5 times throughout resume
   - Natural integration - don't just list keywords
   - Use in context: "Architected AWS Lambda functions", "Implemented React components", "Deployed Kubernetes clusters"

**OUTPUT FORMAT:**
CRITICAL: Output ONLY the final resume text. Do NOT include any preamble, explanations, or phrases like "Here is the optimized resume" or "I've created". Start IMMEDIATELY with the candidate's name.

Create a complete, ready-to-submit resume in plain text format that includes:
- Name and contact information (at the top)
- Professional Summary (3-4 lines)
- Technical Skills (organized by category)
- Professional Experience (ALL positions with ALL bullet points)
- Projects (ALL projects listed above)
- Education
- Certifications

IMPORTANT: Include ALL work experiences and ALL projects. Do not truncate or shorten the resume. Make it comprehensive and complete - 2 pages is acceptable for this level of experience.

OUTPUT THE RESUME NOW WITHOUT ANY PREAMBLE:
`

  return resume
}
