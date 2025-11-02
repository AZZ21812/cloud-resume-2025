# CI/CD Pipeline Documentation

## Overview

This project uses GitHub Actions for Continuous Integration and Continuous Deployment. The pipeline automatically tests, builds, and deploys the full-stack cloud resume application to AWS.

## Pipeline Architecture

```
┌─────────────────┐
│   Git Push to   │
│   main branch   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   CI Pipeline   │
│  - Lint Code    │
│  - Run Tests    │
│  - Security     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Deploy Backend  │
│  - Lambda       │
│  - DynamoDB     │
│  - Test APIs    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Deploy Frontend │
│  - Build Next.js│
│  - Deploy to S3 │
│  - CloudFront   │
└─────────────────┘
```

## Workflows

### 1. **ci.yml** - Continuous Integration
Runs on every push and pull request to `main` or `develop` branches.

**Jobs:**
- **Backend Tests**: Python linting and testing
- **Frontend Tests**: ESLint, TypeScript checks, build verification
- **Infrastructure Validation**: SST configuration validation
- **Security Scan**: Trivy vulnerability scanning

**Triggers:**
```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
```

### 2. **deploy-backend.yml** - Backend Deployment
Deploys only backend changes (Lambda functions, DynamoDB).

**Runs when:**
- Changes to `*_handler.py` files
- Changes to `sst.config.ts`
- Changes to `pyproject.toml`
- Manual trigger via workflow_dispatch

**Steps:**
1. Validate Python handlers
2. Deploy infrastructure with SST
3. Test Lambda endpoints
4. Create deployment summary

### 3. **deploy.yml** - Full Stack Deployment
Complete deployment of both backend and frontend.

**Runs when:**
- Push to `main` branch
- Manual trigger with environment selection

**Steps:**
1. Run CI checks
2. Deploy backend infrastructure
3. Deploy frontend with API URLs
4. Create comprehensive deployment summary

## Required GitHub Secrets

### AWS Credentials
Set up these secrets in your GitHub repository:

1. **AWS_ROLE_ARN** (Required)
   - IAM Role ARN for GitHub Actions OIDC
   - Format: `arn:aws:iam::ACCOUNT_ID:role/GitHubActionsRole`

2. **S3_BUCKET** (Optional - for frontend deployment)
   - S3 bucket name for hosting frontend
   - Example: `my-resume-website`

3. **CLOUDFRONT_DISTRIBUTION_ID** (Optional)
   - CloudFront distribution ID for cache invalidation
   - Example: `E1234567890ABC`

### Setting up AWS OIDC Authentication

#### 1. Create IAM OIDC Identity Provider

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

#### 2. Create IAM Role

Create a file `github-actions-trust-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_USERNAME/cloud-resume-2025:*"
        }
      }
    }
  ]
}
```

Create the role:

```bash
aws iam create-role \
  --role-name GitHubActionsRole \
  --assume-role-policy-document file://github-actions-trust-policy.json
```

#### 3. Attach Policies

```bash
# For SST deployments
aws iam attach-role-policy \
  --role-name GitHubActionsRole \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess

# Or create a more restrictive policy with only required permissions:
# - Lambda (create, update, invoke)
# - DynamoDB (create, update tables)
# - S3 (read, write)
# - CloudFormation (all)
# - IAM (create roles for Lambda)
# - CloudWatch Logs (create log groups)
```

#### 4. Add Secret to GitHub

1. Go to your repository on GitHub
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `AWS_ROLE_ARN`
5. Value: `arn:aws:iam::ACCOUNT_ID:role/GitHubActionsRole`

## Local Testing

### Test CI Checks Locally

```bash
# Frontend linting
cd frontend
npm run lint

# Frontend type checking
npx tsc --noEmit

# Frontend build
npm run build

# Python linting
pip install pylint
pylint counter_handler.py chatbot_handler.py

# Python syntax validation
python -m py_compile counter_handler.py
python -m py_compile chatbot_handler.py
```

### Test Deployment Locally

```bash
# Deploy backend
npx sst deploy --stage development

# Get outputs
npx sst outputs --stage development

# Test endpoints
curl https://YOUR_COUNTER_URL/
curl -X POST https://YOUR_CHATBOT_URL/ \
  -H "Content-Type: application/json" \
  -d '{"question": "Hello"}'
```

## Workflow Outputs

### CI Pipeline
- ✅ Lint results
- ✅ Test coverage reports
- ✅ Security scan results
- ✅ Build artifacts

### Deployment Pipeline
- 📊 API endpoint URLs
- 📊 DynamoDB table name
- 📊 CloudFront distribution ID
- 📊 Deployment status and summary

## Monitoring Deployments

### GitHub Actions UI
1. Go to the **Actions** tab in your repository
2. Select the workflow run
3. View logs, summaries, and artifacts

### AWS Console
1. **Lambda Functions**:
   - CloudWatch Logs for function execution
   - Metrics for invocations, errors, duration

2. **DynamoDB**:
   - Table metrics
   - Item count and capacity

3. **CloudFront** (if used):
   - Cache hit ratio
   - Request statistics

## Troubleshooting

### Common Issues

#### 1. AWS Authentication Failed
```
Error: Failed to assume role
```
**Solution**: Verify `AWS_ROLE_ARN` secret and trust policy

#### 2. SST Deployment Fails
```
Error: Resource creation failed
```
**Solution**: Check IAM permissions and AWS service quotas

#### 3. Frontend Build Fails
```
Error: Environment variables not set
```
**Solution**: Ensure API URLs are correctly passed from backend deployment

#### 4. Lambda Tests Fail
```
Error: 502 Bad Gateway
```
**Solution**: Check Lambda logs in CloudWatch, verify handler paths

### Debug Mode

Enable debug logging in workflows:

```yaml
env:
  ACTIONS_STEP_DEBUG: true
  ACTIONS_RUNNER_DEBUG: true
```

## Best Practices

1. **Branch Protection**: Enable branch protection rules for `main`
2. **Required Status Checks**: Make CI checks required before merge
3. **Staging Environment**: Use separate stage for testing
4. **Rollback Strategy**: Keep previous SST stage for quick rollback
5. **Secret Rotation**: Regularly rotate AWS credentials
6. **Cost Monitoring**: Set up AWS budget alerts

## Performance Metrics

- **CI Pipeline Duration**: ~3-5 minutes
- **Backend Deployment**: ~2-3 minutes
- **Frontend Deployment**: ~1-2 minutes
- **Total Deployment Time**: ~6-10 minutes

## Contact & Support

For issues or questions about the CI/CD pipeline:
- Check workflow logs in GitHub Actions
- Review CloudWatch logs for Lambda functions
- Verify AWS console for infrastructure status

---

**Last Updated**: November 2025
**SST Version**: 3.17.21
**Node Version**: 20
**Python Version**: 3.12
