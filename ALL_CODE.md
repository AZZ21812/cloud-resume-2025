# Complete Code Reference - Cloud Resume Challenge 2025

This document contains all the code files for your project.

---

## ROOT LEVEL FILES

### package.json (Root)
```json
{
  "name": "cloud-resume-2025",
  "version": "1.0.0",
  "description": "Modern cloud resume with Next.js, AWS Lambda, and Bedrock",
  "type": "module",
  "scripts": {
    "dev": "sst dev",
    "deploy": "sst deploy",
    "deploy:prod": "sst deploy --stage prod",
    "remove": "sst remove",
    "console": "sst console"
  },
  "keywords": [
    "cloud-resume-challenge",
    "aws",
    "serverless",
    "nextjs",
    "bedrock"
  ],
  "author": "Amanuel Z. Alemu",
  "license": "MIT",
  "dependencies": {
    "sst": "^3.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "typescript": "^5.3.0"
  }
}
```

### sst.config.ts
```typescript
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "cloud-resume-2025",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    // DynamoDB table for visitor counter
    const table = new sst.aws.Dynamo("VisitorCounter", {
      fields: {
        pk: "string",
      },
      primaryIndex: { hashKey: "pk" },
    });

    // Lambda function for visitor counter
    const counterApi = new sst.aws.Function("CounterFunction", {
      handler: "backend/counter/index.handler",
      runtime: "python3.13",
      url: true,
      link: [table],
      environment: {
        TABLE_NAME: table.name,
      },
    });

    // Lambda function for AI chatbot (Bedrock)
    const chatbotApi = new sst.aws.Function("ChatbotFunction", {
      handler: "backend/chatbot/index.handler",
      runtime: "python3.13",
      timeout: "30 seconds",
      url: true,
      permissions: [
        {
          actions: ["bedrock:InvokeModel"],
          resources: ["*"],
        },
      ],
    });

    return {
      counterUrl: counterApi.url,
      chatbotUrl: chatbotApi.url,
      tableName: table.name,
    };
  },
});
```

### .gitignore
```
# Dependencies
node_modules/
.pnp
.pnp.js

# SST
.sst/
.sst-*

# Testing
coverage/
.nyc_output

# Next.js
frontend/.next/
frontend/out/
frontend/build
frontend/.cache

# Production
dist/
build/

# Environment variables
.env
.env.local
.env*.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# OS
.DS_Store
*.swp
*.swo
.vscode/
.idea/

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

---

## BACKEND FILES

### backend/counter/index.py
```python
import json
import os
import boto3
from decimal import Decimal

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table_name = os.environ['TABLE_NAME']
table = dynamodb.Table(table_name)

# Custom JSON encoder to handle Decimal types
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return int(obj)
        return super(DecimalEncoder, self).default(obj)

def handler(event, context):
    """
    Lambda handler for visitor counter.
    Increments and returns the visitor count stored in DynamoDB.
    """
    
    # CORS headers
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    # Handle OPTIONS request for CORS preflight
    if event.get('requestContext', {}).get('http', {}).get('method') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'CORS preflight successful'})
        }
    
    try:
        # Increment visitor count using atomic counter
        response = table.update_item(
            Key={'pk': 'visitor-count'},
            UpdateExpression='ADD #count :inc',
            ExpressionAttributeNames={'#count': 'count'},
            ExpressionAttributeValues={':inc': 1},
            ReturnValues='UPDATED_NEW'
        )
        
        # Get the updated count
        count = response['Attributes']['count']
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'count': count,
                'message': 'Visitor count updated successfully'
            }, cls=DecimalEncoder)
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'error': 'Failed to update visitor count',
                'message': str(e)
            })
        }
```

### backend/chatbot/index.py
```python
import json
import os
import boto3

# Initialize Bedrock client
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

def handler(event, context):
    """
    Lambda handler for AI chatbot using Amazon Bedrock.
    Answers questions about the resume using Claude.
    """
    
    # CORS headers
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    # Handle OPTIONS request for CORS preflight
    if event.get('requestContext', {}).get('http', {}).get('method') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'CORS preflight successful'})
        }
    
    try:
        # Parse request body
        body = json.loads(event.get('body', '{}'))
        question = body.get('question', '')
        
        if not question:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Question is required'})
            }
        
        # System prompt with resume context
        system_prompt = """You are an AI assistant helping visitors learn about Amanuel Z. Alemu's professional background. 
        
Here's his resume information:

**Name**: Amanuel Z. Alemu
**Title**: AWS Solutions Architect | Full-Stack Developer | Fintech Specialist
**Location**: Hyattsville, MD
**Contact**: 
- Email: Amanuelzegeye63@gmail.com
- Phone: +1 (240) 927-7827
- GitHub: https://github.com/AZZ2181
- LinkedIn: www.linkedin.com/in/amanuel-alemu-50b014255

**Skills**:
- Cloud & DevOps: AWS (EC2, S3, Lambda, RDS, CloudFormation, Textract, Cognito), Kubernetes, CI/CD (GitHub Actions, Jenkins), Linux, IaC, CloudWatch, Prometheus, Grafana
- Fintech: Digital wallets, remittance systems, payment APIs, KYC/AML compliance, PCI DSS compliance, data encryption & security
- Software Development: Java/Kotlin, Spring Boot, Node.js, React, TypeScript, REST APIs, microservices, MySQL, PostgreSQL, MongoDB
- Data & Analytics: ETL pipelines, data analytics, QlikSense, NumPy, SQL, Python
- Leadership: Certified Scrum Master, Agile delivery, cross-functional team management, stakeholder communication

**Professional Experience**:

1. Strategy & Product Design Lead at IE Networks Solution (Sep 2024 - Apr 2025)
   - Led launch of BPO-ITO and Tech Talent Academy initiatives, projected to contribute 20%+ of annual revenue
   - Managed cross-functional team of 10+ software engineers, data analysts, and project managers
   - Spearheaded Selamnew Workspace platform, cutting internal coordination time by 30%
   - Developed 3-year strategic plan using Stanford Seed methodology
   - Secured 5+ strategic partnerships generating 15% increase in B2B sales opportunities

2. Senior Mobile Developer (Data Analytics & Software Lead) at Lersha, Green Agro Solution (Sep 2021 - May 2024)
   - Led development of native Android applications using Java/Kotlin, serving 1,300+ agents and 100,000+ farmers
   - Built and maintained Node.js backend systems and REST APIs
   - Integrated offline-first functionality for low-connectivity rural areas
   - Implemented data analytics pipelines using SQL and Python
   - Generated KYC dashboards and project-specific reports

**Key Projects**:
- AP Wallet: Digital payments and remittance app using 15+ AWS services (Lambda, S3, RDS, Cognito) with CI/CD on GitHub Actions, reducing release cycles by 40%
- Lersha App: 4 native Android apps (Agent, Service Provider, Dashboard, Loan) using Java/Kotlin, Node.js, and MySQL
- Dashen Malt Barley Project: QlikSense dashboards for agricultural loan tracking
- GSMA-IF Program: Built 4 interactive Qlik dashboards, represented organization at GSMA Mobile World Congress
- Cloud Resume Challenge (2025): Modern serverless resume with Next.js, AWS Lambda, DynamoDB, and Bedrock

**Education**:
- BSc. Software Engineering, Staffordshire University (2018-2021)

**Certifications**:
- AWS Certified Solutions Architect - Associate
- Certified Scrum Master (CSM)
- HashiCorp Certified: Terraform Associate

Answer questions about Amanuel's background professionally and concisely. Highlight his strengths in cloud architecture, fintech solutions, mobile development, and leadership. If asked about something not in the resume, politely say you don't have that specific information but can discuss his documented experience."""
        
        # Prepare Bedrock request using Claude 3.5 Sonnet
        bedrock_request = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 500,
            "messages": [
                {
                    "role": "user",
                    "content": question
                }
            ],
            "system": system_prompt
        }
        
        # Call Bedrock
        response = bedrock.invoke_model(
            modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
            body=json.dumps(bedrock_request)
        )
        
        # Parse response
        response_body = json.loads(response['body'].read())
        answer = response_body['content'][0]['text']
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'question': question,
                'answer': answer,
                'model': 'claude-3-5-sonnet'
            })
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'error': 'Failed to process chatbot request',
                'message': str(e)
            })
        }
```

---

## FRONTEND FILES

### frontend/package.json
```json
{
  "name": "cloud-resume-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "^15.0.3",
    "lucide-react": "^0.460.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.56.0",
    "eslint-config-next": "^15.0.3"
  }
}
```

### frontend/tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### frontend/next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_COUNTER_API: process.env.NEXT_PUBLIC_COUNTER_API,
    NEXT_PUBLIC_CHATBOT_API: process.env.NEXT_PUBLIC_CHATBOT_API,
  },
}

module.exports = nextConfig
```

### frontend/tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
```

### frontend/postcss.config.js
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### frontend/.env.example
```
# Copy this to .env.local and fill in your values after deploying the backend

# Counter API URL (get this from SST deploy output)
NEXT_PUBLIC_COUNTER_API=https://your-counter-function-url.lambda-url.us-east-1.on.aws

# Chatbot API URL (get this from SST deploy output)
NEXT_PUBLIC_CHATBOT_API=https://your-chatbot-function-url.lambda-url.us-east-1.on.aws
```

### frontend/app/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --border: 214.3 31.8% 91.4%;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
  }
}

body {
  color: rgb(var(--foreground));
  background: rgb(var(--background));
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### frontend/app/layout.tsx
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amanuel Z. Alemu - Cloud Resume',
  description: 'AWS Solutions Architect and Full-Stack Developer specializing in cloud-native architectures, fintech solutions, and scalable applications. Experienced with AWS, Kubernetes, and modern web technologies.',
  keywords: ['cloud engineer', 'aws', 'solutions architect', 'fintech', 'full-stack developer', 'serverless', 'nextjs', 'java', 'kotlin', 'nodejs'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### frontend/app/page.tsx
```typescript
import Resume from './components/Resume'
import VisitorCounter from './components/VisitorCounter'
import Chatbot from './components/Chatbot'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="animate-fade-in">
          {/* Header with visitor counter */}
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              Cloud Resume
            </h1>
            <VisitorCounter />
          </div>

          {/* Main resume content */}
          <Resume />

          {/* AI Chatbot */}
          <div className="mt-12">
            <Chatbot />
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-600 dark:text-slate-400">
            <p>Built with Next.js, AWS Lambda, DynamoDB, and Amazon Bedrock</p>
            <p className="mt-2">
              Part of the{' '}
              <a
                href="https://cloudresumechallenge.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Cloud Resume Challenge
              </a>
            </p>
          </footer>
        </div>
      </div>
    </main>
  )
}
```

---

## FRONTEND COMPONENTS

### frontend/app/components/Resume.tsx

```typescript
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
```

### frontend/app/components/VisitorCounter.tsx

```typescript
'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCount = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_COUNTER_API

      if (!apiUrl) {
        setError('Counter API URL not configured')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch visitor count')
        }

        const data = await response.json()
        setCount(data.count)
        setError(null)
      } catch (err) {
        console.error('Error fetching visitor count:', err)
        setError('Unable to load count')
      } finally {
        setLoading(false)
      }
    }

    fetchCount()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-full">
        <Eye className="w-4 h-4 animate-pulse" />
        <span className="text-sm">Loading...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-full">
        <Eye className="w-4 h-4" />
        <span className="text-sm">{error}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-full shadow-sm">
      <Eye className="w-4 h-4" />
      <span className="text-sm font-medium">
        {count?.toLocaleString()} {count === 1 ? 'visitor' : 'visitors'}
      </span>
    </div>
  )
}
```

### frontend/app/components/Chatbot.tsx

```typescript
'use client'

import { useState } from 'react'
import { MessageCircle, Send, Loader2, Bot, User } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || loading) return

    const apiUrl = process.env.NEXT_PUBLIC_CHATBOT_API

    if (!apiUrl) {
      alert('Chatbot API URL not configured. Please set NEXT_PUBLIC_CHATBOT_API in your .env.local file.')
      return
    }

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot')
      }

      const data = await response.json()
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.answer },
      ])
    } catch (err) {
      console.error('Error sending message:', err)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 z-50"
          aria-label="Open chatbot"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <h3 className="font-semibold">Ask About My Resume</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-slate-200 transition-colors"
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 dark:text-slate-400 py-8">
                <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Ask me anything about my experience, skills, or projects!</p>
                <div className="mt-4 space-y-2 text-xs">
                  <p className="text-slate-400">Example questions:</p>
                  <p className="text-slate-500">"What cloud technologies do you know?"</p>
                  <p className="text-slate-500">"Tell me about your AWS experience"</p>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
                <div
                  className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0">
                    <User className="w-8 h-8 text-slate-600 dark:text-slate-400" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 justify-start">
                <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={loading}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
```

---

## CI/CD FILES

### .github/workflows/deploy-backend.yml
```yaml
name: Deploy Backend

on:
  push:
    branches:
      - main
    paths:
      - 'backend/**'
      - 'sst.config.ts'
      - '.github/workflows/deploy-backend.yml'
  workflow_dispatch:

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          aws-region: us-east-1

      - name: Deploy with SST
        run: npx sst deploy --stage prod

      - name: Output deployment info
        run: npx sst outputs --stage prod
```

---

## END OF CODE REFERENCE

All files are now documented above. You can copy these directly into your project structure.
