# Cloud Resume 2025

A modern serverless resume website built with Next.js, AWS Lambda, DynamoDB, and Amazon Bedrock. Features real-time visitor counter, AI-powered chatbot, and admin panel for ATS-optimized resume generation.

## Live Demo

**Website:** https://d5rk3dryo0e0i.cloudfront.net

## Features

- Modern, responsive Next.js frontend with TypeScript and Tailwind CSS
- Real-time visitor counter using AWS Lambda and DynamoDB
- AI-powered chatbot using Amazon Bedrock (Claude 3 Haiku)
- Admin panel with ATS resume generator
- Serverless architecture with Infrastructure as Code (SST)
- CI/CD pipeline with GitHub Actions
- Hosted on AWS S3 + CloudFront

## Architecture

```
┌──────────────────┐
│  CloudFront CDN  │ ← Frontend (Next.js)
└────────┬─────────┘
         │
┌────────▼──────────────────────────┐
│         AWS Services               │
│                                    │
│  ┌────────────┐   ┌────────────┐  │
│  │  Lambda    │──▶│ DynamoDB   │  │
│  │  Counter   │   └────────────┘  │
│  └────────────┘                    │
│                                    │
│  ┌────────────┐   ┌────────────┐  │
│  │  Lambda    │──▶│  Bedrock   │  │
│  │  Chatbot   │   │  (Claude)  │  │
│  └────────────┘   └────────────┘  │
└────────────────────────────────────┘
```

## Tech Stack

**Frontend:**
- Next.js 16 (canary)
- React 19
- TypeScript
- Tailwind CSS
- jsPDF for PDF generation

**Backend:**
- AWS Lambda (Python 3.12)
- Amazon DynamoDB
- Amazon Bedrock (Claude 3 Haiku)
- AWS S3 + CloudFront

**Infrastructure:**
- SST v3 (Infrastructure as Code)
- GitHub Actions (CI/CD)
- AWS OIDC authentication

## Project Structure

```
cloud-resume-2025/
├── frontend/                    # Next.js application
│   ├── app/
│   │   ├── components/         # React components
│   │   ├── admin/              # Admin panel
│   │   └── page.tsx            # Main page
│   └── package.json
├── cloud_resume_2025/          # Lambda handlers
│   ├── counter_handler.py      # Visitor counter
│   └── chatbot_handler.py      # AI chatbot
├── sst.config.ts               # Infrastructure config
├── .github/workflows/          # CI/CD pipelines
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- AWS Account with CLI configured
- Python 3.12+
- Git

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd cloud-resume-2025
```

2. Install dependencies
```bash
npm install
cd frontend && npm install && cd ..
```

3. Configure environment variables

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_COUNTER_API=<your-counter-lambda-url>
NEXT_PUBLIC_CHATBOT_API=<your-chatbot-lambda-url>
NEXT_PUBLIC_ADMIN_EMAIL=<your-admin-email>
NEXT_PUBLIC_ADMIN_PASSWORD=<your-admin-password>
```

4. Deploy infrastructure
```bash
npx sst deploy --stage production
```

5. Build and deploy frontend
```bash
cd frontend
npm run build
aws s3 sync out/ s3://<your-bucket-name>/ --delete
aws cloudfront create-invalidation --distribution-id <your-distribution-id> --paths "/*"
```

## Development

### Run locally
```bash
# Start dev server
cd frontend
npm run dev
```

### Deploy backend
```bash
npx sst deploy
```

### Deploy frontend
```bash
cd frontend
npm run build
# Upload to S3 and invalidate CloudFront cache
```

## Admin Panel

Access the admin panel at `/admin/login` (local development only, not deployed to S3).

Features:
- Resume editor with live preview
- ATS-optimized resume generator
- AI-powered job description analysis
- Professional PDF export

## CI/CD Pipeline

GitHub Actions automatically:
- Runs tests and linting
- Builds frontend
- Deploys to S3
- Invalidates CloudFront cache

Triggered on push to `main` branch.

## Cost Estimate

For 10,000 monthly visitors:
- Lambda: $0.20
- DynamoDB: $0.25
- S3: $0.23
- CloudFront: $1.00
- Bedrock: $5.00 (varies by usage)
- Data Transfer: $0.40

**Total: ~$7.08/month**

## Security

- No hardcoded credentials in repository
- Admin credentials stored in environment variables
- All .env files excluded from version control
- HTTPS enforced via CloudFront
- CORS configured for Lambda Function URLs

## License

MIT

## Contact

Amanuel Z. Alemu
- Email: Amanuelzegeye63@gmail.com
- LinkedIn: [linkedin.com/in/amanuel-alemu-50b014255](https://linkedin.com/in/amanuel-alemu-50b014255)
- GitHub: [github.com/AZZ2181](https://github.com/AZZ2181)
