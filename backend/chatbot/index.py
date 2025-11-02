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
