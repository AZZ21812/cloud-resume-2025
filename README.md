# Cloud Resume Challenge - 2025 Edition

A modern cloud resume built with Next.js, AWS Lambda, DynamoDB, and Amazon Bedrock.

## 🚀 Features

- **Modern Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Serverless Backend**: AWS Lambda with Function URLs
- **Real-time Counter**: DynamoDB-powered visitor tracking
- **AI Chatbot**: Amazon Bedrock integration for resume Q&A
- **Infrastructure as Code**: SST v3 for easy deployment
- **CI/CD**: GitHub Actions with OIDC
- **Cost-Optimized**: ~$0-5/month

## 📁 Project Structure

```
cloud-resume-2025/
├── frontend/           # Next.js application
├── backend/            # Lambda functions
├── sst.config.ts       # SST infrastructure
├── .github/            # CI/CD workflows
└── README.md
```

## 🛠️ Prerequisites

- Node.js 18+ and npm
- AWS Account with credentials configured
- AWS CLI installed
- Git and GitHub account

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo>
cd cloud-resume-2025
npm install
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 3. Deploy Infrastructure

```bash
# Deploy to dev environment
npx sst deploy

# This will create:
# - DynamoDB table
# - Lambda functions
# - Function URLs
```

### 4. Configure Frontend

After deployment, SST will output your API URLs. Create `frontend/.env.local`:

```env
NEXT_PUBLIC_COUNTER_API=<your-counter-function-url>
NEXT_PUBLIC_CHATBOT_API=<your-chatbot-function-url>
```

### 5. Run Frontend Locally

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000`

### 6. Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

## 🏗️ Architecture

```
┌─────────────┐
│   Vercel    │  Frontend (Next.js)
│   (Free)    │
└──────┬──────┘
       │
       │ HTTPS
       │
┌──────▼──────────────────────────┐
│         AWS Cloud               │
│                                 │
│  ┌─────────────┐               │
│  │   Lambda    │               │
│  │   Counter   │───┐           │
│  └─────────────┘   │           │
│                     │           │
│  ┌─────────────┐   │  ┌──────┐ │
│  │   Lambda    │   └─▶│ Dyna │ │
│  │   Chatbot   │──────│  DB  │ │
│  └─────┬───────┘      └──────┘ │
│        │                        │
│        │                        │
│  ┌─────▼───────┐               │
│  │   Bedrock   │               │
│  │   Claude    │               │
│  └─────────────┘               │
└─────────────────────────────────┘
```

## 📝 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_COUNTER_API=https://xxx.lambda-url.us-east-1.on.aws
NEXT_PUBLIC_CHATBOT_API=https://yyy.lambda-url.us-east-1.on.aws
```

### Backend (set in SST config)
```env
DYNAMODB_TABLE_NAME=<auto-set-by-sst>
```

## 🧪 Testing

```bash
# Test counter API
curl https://your-counter-url.lambda-url.us-east-1.on.aws

# Test chatbot API
curl -X POST https://your-chatbot-url.lambda-url.us-east-1.on.aws \
  -H "Content-Type: application/json" \
  -d '{"question": "What is your experience with AWS?"}'
```

## 🚢 Deployment

### Development
```bash
npx sst deploy --stage dev
```

### Production
```bash
npx sst deploy --stage prod
```

## 💰 Cost Breakdown

- **Vercel**: FREE (personal projects)
- **Lambda**: FREE tier (1M requests/month)
- **DynamoDB**: ~$0 (on-demand, low traffic)
- **Bedrock**: ~$0.003 per 1K tokens (pay-as-you-go)
- **Total**: $0-5/month for personal use

## 🔧 Customization

### Update Resume Content
Edit `frontend/app/components/Resume.tsx`

### Modify Chatbot Responses
Edit `backend/chatbot/index.py` to customize the system prompt

### Change Styling
Update Tailwind config in `frontend/tailwind.config.ts`

## 📚 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Python 3.13, AWS Lambda
- **Database**: Amazon DynamoDB
- **AI**: Amazon Bedrock (Claude)
- **IaC**: SST v3
- **Hosting**: Vercel (frontend), AWS (backend)
- **CI/CD**: GitHub Actions

## 🎯 Next Steps

1. ✅ Get basic site running
2. ✅ Deploy infrastructure
3. ✅ Connect frontend to backend
4. 🔲 Add custom domain
5. 🔲 Enable Bedrock chatbot
6. 🔲 Set up CI/CD pipeline
7. 🔲 Add monitoring and alerts
8. 🔲 Write blog post about the project

## 📖 Resources

- [SST Documentation](https://sst.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Amazon Bedrock Documentation](https://docs.aws.amazon.com/bedrock/)

## 📄 License

MIT