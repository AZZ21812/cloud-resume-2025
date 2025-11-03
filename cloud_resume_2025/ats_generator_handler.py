import json
import boto3
import os

# Initialize Bedrock client
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

def handler(event, context):
    """
    Lambda function to generate ATS-optimized resumes using Amazon Bedrock.
    """

    # Handle CORS preflight
    if event.get('requestContext', {}).get('http', {}).get('method') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': ''
        }

    try:
        # Parse request body
        if isinstance(event.get('body'), str):
            body = json.loads(event['body'])
        else:
            body = event.get('body', {})

        job_description = body.get('jobDescription', '')

        if not job_description:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                'body': json.dumps({'error': 'Job description is required'})
            }

        # Candidate information (your resume data)
        candidate_info = """
AMANUEL Z. ALEMU
Email: Amanuelzegeye63@gmail.com | Phone: +1 (240) 927-7827
Location: Hyattsville, MD
LinkedIn: https://www.linkedin.com/in/amanuel-alemu-50b014255
GitHub: https://github.com/AZZ2181

PROFESSIONAL SUMMARY:
AWS Certified Solutions Architect and full-stack developer with expertise in cloud-native architectures, fintech solutions, and mobile development. Proven track record of leading cross-functional teams to deliver scalable applications serving 100,000+ users. Specialized in serverless computing, Infrastructure as Code, and secure payment systems with deep knowledge of KYC/AML compliance and PCI DSS standards.

TECHNICAL SKILLS:
• Cloud & DevOps: AWS (EC2, S3, Lambda, RDS, CloudFormation, Textract, Cognito), Kubernetes, CI/CD (GitHub Actions, Jenkins), Linux, Infrastructure as Code, CloudWatch, Prometheus, Grafana
• Software Development: Java/Kotlin, Spring Boot, Node.js, React, TypeScript, REST APIs, Microservices, MySQL, PostgreSQL, MongoDB
• Fintech: Digital wallets, Remittance systems, Payment APIs, KYC/AML compliance, PCI DSS compliance, Data encryption & security
• Data & Analytics: ETL pipelines, Data analytics, QlikSense dashboards, NumPy, SQL, Python
• Leadership: Certified Scrum Master, Agile delivery, Cross-functional team management, Stakeholder communication, Technical documentation

PROFESSIONAL EXPERIENCE:

Strategy & Product Design Lead
IE Networks Solution | Sep 2024 - Apr 2025
• Led launch of BPO-ITO and Tech Talent Academy initiatives, projected to contribute 20%+ of annual revenue
• Managed cross-functional team of 10+ engineers, analysts, and project managers delivering digital solutions
• Spearheaded Selamnew Workspace platform, cutting internal coordination time by 30% through cloud workflows
• Developed 3-year strategic plan using Stanford Seed methodology, aligning technology with growth milestones
• Secured 5+ strategic partnerships generating 15% increase in B2B sales opportunities

Senior Mobile Developer (Data Analytics & Software Lead)
Lersha, Green Agro Solution | Sep 2021 - May 2024
• Led development of native Android applications using Java/Kotlin, serving 1,300+ agents and 100,000+ farmers
• Built and maintained Node.js backend systems and REST APIs for reliable data synchronization
• Integrated offline-first functionality and real-time API data exchange for low-connectivity rural areas
• Implemented data analytics pipelines using SQL and Python supporting reporting for 100,000+ farmers
• Generated KYC dashboards and project-specific reports for clients

FEATURED PROJECTS:

AP Wallet - Personal Fintech Project
Built a digital payments and remittance app leveraging 15+ AWS services (Lambda, S3, RDS, Cognito) for secure, scalable, cloud-native architecture. Deployed CI/CD pipelines on GitHub Actions, reducing release cycles by 40%.
Tech: AWS Lambda, S3, RDS, Cognito, GitHub Actions, CI/CD

Lersha App - Android & Backend Development
Developed and deployed 4 native Android apps (Agent, Service Provider, Dashboard, and Loan modules) serving 1,300+ agents and 100,000+ farmers with offline-first functionality.
Tech: Java/Kotlin, Node.js, MySQL, REST APIs, Android SDK

Dashen Malt Barley Project - Cloud Dashboard
Designed and deployed QlikSense dashboards to track agricultural loan disbursements and repayment metrics across multiple partner institutions.
Tech: QlikSense, SQL, Data Analytics, ETL Pipelines

Cloud Resume Challenge (2025)
Modern serverless resume website featuring real-time visitor counter and AI-powered chatbot using Amazon Bedrock and Claude. Demonstrates cloud-native architecture with Infrastructure as Code.
Tech: Next.js, TypeScript, AWS Lambda, DynamoDB, Bedrock, SST

EDUCATION:
Bachelor of Science in Software Engineering
Staffordshire University | 2018 - 2021

CERTIFICATIONS:
• AWS Certified Solutions Architect - Associate
• Certified Scrum Master (CSM)
• HashiCorp Certified: Terraform Associate
"""

        # Create the prompt for Bedrock
        prompt = f"""You are an expert resume writer specializing in ATS (Applicant Tracking System) optimization. Your task is to create a tailored resume for a job application.

CANDIDATE INFORMATION:
{candidate_info}

JOB DESCRIPTION:
{job_description}

INSTRUCTIONS:
Create an ATS-optimized resume that:
1. Matches keywords from the job description naturally throughout the resume
2. Highlights the most relevant experience and skills for THIS specific role
3. Uses strong action verbs and quantifiable achievements
4. Follows ATS-friendly formatting (plain text, no tables, no columns, no special characters)
5. Includes a customized professional summary tailored to this job
6. Prioritizes and expands on relevant experience while keeping less relevant items brief
7. Uses the exact terminology from the job description where appropriate
8. Keeps the same factual information but reorders and emphasizes based on job requirements

FORMAT REQUIREMENTS:
- Plain text only
- Use standard section headers: PROFESSIONAL SUMMARY, TECHNICAL SKILLS, PROFESSIONAL EXPERIENCE, EDUCATION, CERTIFICATIONS
- Use bullet points (•) for lists
- Include contact information at the top
- Keep it to 1-2 pages worth of content
- Do NOT invent experience or skills - only use what's provided in the candidate information

Generate the complete, ready-to-use resume now:"""

        # Call Bedrock API
        request_body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 4096,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 0.7,
            "top_p": 0.9,
        }

        response = bedrock.invoke_model(
            modelId='anthropic.claude-3-haiku-20240307-v1:0',
            body=json.dumps(request_body)
        )

        # Parse response
        response_body = json.loads(response['body'].read())
        resume_text = response_body['content'][0]['text']

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            'body': json.dumps({
                'resume': resume_text,
                'success': True
            })
        }

    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            'body': json.dumps({
                'error': str(e),
                'success': False
            })
        }
