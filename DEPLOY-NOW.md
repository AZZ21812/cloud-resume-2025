# 🚀 Deploy Your Cloud Resume - Final Steps

## ✅ What's Ready:

- ✅ Code committed to local git repository (commit: 17d0d48)
- ✅ AWS OIDC provider created
- ✅ IAM role configured: `GitHubActionsDeployRole`
- ✅ CI/CD workflows ready in `.github/workflows/`
- ✅ Modern frontend design complete
- ✅ Backend Lambda functions working
- ✅ 70 files committed with 13,535 lines of code

---

## 📋 Step 1: Create GitHub Repository

### Option A: Using GitHub Website (Recommended)

1. Go to https://github.com/new
2. Repository name: `cloud-resume-2025`
3. Description: "Cloud Resume Challenge - AWS serverless resume with AI chatbot"
4. Visibility: **Public** (recommended for portfolio)
5. ❌ **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

### Option B: Using Command Line (if you have gh CLI)

```bash
gh repo create cloud-resume-2025 --public --source=. --remote=origin --push
```

---

## 📋 Step 2: Push Code to GitHub

After creating the repository on GitHub, you'll see a page with commands. Use these:

```bash
# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/cloud-resume-2025.git

# Push the code
git push -u origin main
```

**Your current commit is ready to push:** `17d0d48`

---

## 📋 Step 3: Configure GitHub Secrets

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**

### Add This Secret:

| Name | Value |
|------|-------|
| `AWS_ROLE_ARN` | `arn:aws:iam::600592587584:role/GitHubActionsDeployRole` |

**Steps:**
1. Name: `AWS_ROLE_ARN`
2. Secret: `arn:aws:iam::600592587584:role/GitHubActionsDeployRole`
3. Click **"Add secret"**

---

## 📋 Step 4: Update IAM Trust Policy

Update the trust policy with your actual GitHub username:

```bash
# Replace YOUR_GITHUB_USERNAME with your actual username
GITHUB_USERNAME="YOUR_GITHUB_USERNAME"

cat > updated-trust-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::600592587584:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:$GITHUB_USERNAME/cloud-resume-2025:*"
        }
      }
    }
  ]
}
EOF

# Update the policy
/usr/local/aws-cli/aws iam update-assume-role-policy \
  --role-name GitHubActionsDeployRole \
  --policy-document file://updated-trust-policy.json

echo "✅ Trust policy updated for $GITHUB_USERNAME"
```

---

## 📋 Step 5: Watch CI/CD Pipeline Execute!

Once you push to GitHub:

1. Go to https://github.com/YOUR_USERNAME/cloud-resume-2025/actions
2. You should see the workflow running:
   - **CI - Test and Lint** (runs automatically)
   - **Deploy Backend Only** (if backend files changed)
   - **Deploy Full Stack** (on main branch push)

### What Will Happen:

```
1. ✅ Code pushed to GitHub
2. ✅ CI Pipeline starts
   - Lints Python code
   - Lints TypeScript code
   - Runs security scan
   - Validates infrastructure
3. ✅ Backend Deployment
   - Deploys Lambda functions
   - Creates DynamoDB table
   - Tests API endpoints
4. ✅ Deployment Complete!
   - API URLs displayed
   - Summary generated
```

---

## 🎯 Monitoring Deployment

### GitHub Actions

View real-time logs:
```
https://github.com/YOUR_USERNAME/cloud-resume-2025/actions
```

### Expected Timeline:
- **CI Pipeline**: 3-5 minutes
- **Backend Deployment**: 2-3 minutes
- **Total**: 6-10 minutes

---

## ✅ Success Indicators

You'll know it worked when you see:

1. ✅ Green checkmark on workflow run
2. ✅ Deployment summary with API URLs
3. ✅ Counter API URL in output
4. ✅ Chatbot API URL in output

### Example Output:

```
🚀 Backend Deployment Summary

API Endpoints
- Counter API: https://xxxx.lambda-url.us-east-1.on.aws/
- Chatbot API: https://yyyy.lambda-url.us-east-1.on.aws/

Infrastructure
- DynamoDB Table: cloud-resume-2025-production-VisitorCounterTable-xxxxx
- AWS Region: us-east-1
- Stage: production

✅ Backend deployment completed successfully!
```

---

## 🧪 Test Your Deployment

After successful deployment, test the APIs:

```bash
# Get the API URLs from GitHub Actions output
COUNTER_URL="https://xxxx.lambda-url.us-east-1.on.aws/"
CHATBOT_URL="https://yyyy.lambda-url.us-east-1.on.aws/"

# Test Counter
curl $COUNTER_URL

# Test Chatbot
curl -X POST $CHATBOT_URL \
  -H "Content-Type: application/json" \
  -d '{"question": "What are your skills?"}'
```

---

## 📊 What Was Deployed

### Backend Infrastructure:
- ✅ 2x Lambda Functions (Python 3.12)
  - Counter Function
  - Chatbot Function (Claude 3 Haiku)
- ✅ 1x DynamoDB Table
- ✅ 2x Lambda Function URLs
- ✅ IAM Roles & Policies
- ✅ CloudWatch Log Groups

### CI/CD Pipeline:
- ✅ Automated testing
- ✅ Code linting (Python & TypeScript)
- ✅ Security scanning
- ✅ Infrastructure validation
- ✅ Automated deployments
- ✅ Health checks

---

## 🎨 Update Frontend URLs

After backend deploys, you'll need to update your frontend `.env.local` with the new API URLs:

```bash
# In frontend/.env.local
NEXT_PUBLIC_COUNTER_API=https://xxxx.lambda-url.us-east-1.on.aws/
NEXT_PUBLIC_CHATBOT_API=https://yyyy.lambda-url.us-east-1.on.aws/
```

---

## 🔄 Making Changes

Every time you push to `main`:

```bash
# Make changes
vim frontend/app/page.tsx

# Commit
git add .
git commit -m "Update homepage design"

# Push - triggers CI/CD automatically!
git push origin main
```

---

## 🆘 Troubleshooting

### Issue: Workflow doesn't start

**Check:**
- ✅ Secret `AWS_ROLE_ARN` is configured
- ✅ Trust policy updated with your username
- ✅ Pushed to `main` branch

### Issue: Authentication failed

**Solution:**
```bash
# Verify role ARN
/usr/local/aws-cli/aws iam get-role --role-name GitHubActionsDeployRole
```

### Issue: Deployment fails

**Check GitHub Actions logs:**
1. Go to Actions tab
2. Click on failed run
3. Expand failed step
4. Read error message

---

## 📚 Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [AWS IAM OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)
- [SST Documentation](https://docs.sst.dev/)
- [Your CI/CD Setup Guide](./CI-CD-SETUP.md)
- [GitHub Setup Instructions](./GITHUB-SETUP-INSTRUCTIONS.md)

---

## 🎉 You're Ready!

### Quick Checklist:

- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
- [ ] Added `AWS_ROLE_ARN` secret
- [ ] Updated trust policy with your username
- [ ] Watched CI/CD pipeline run
- [ ] Got API URLs from deployment output
- [ ] Tested Counter API
- [ ] Tested Chatbot API

### Commands Summary:

```bash
# 1. Add remote
git remote add origin https://github.com/YOUR_USERNAME/cloud-resume-2025.git

# 2. Push code
git push -u origin main

# 3. Update trust policy
GITHUB_USERNAME="your-username"
# ... run the trust policy update command above

# 4. Watch deployment
# Go to: https://github.com/YOUR_USERNAME/cloud-resume-2025/actions
```

---

**Your IAM Role ARN (for GitHub Secrets):**
```
arn:aws:iam::600592587584:role/GitHubActionsDeployRole
```

**Current Git Status:**
- ✅ Repository initialized
- ✅ All files committed
- ✅ Commit SHA: 17d0d48
- ✅ Branch: main
- ⏳ Ready to push to GitHub!

---

**Go create your GitHub repo and push! 🚀**
