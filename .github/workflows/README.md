# GitHub Actions Workflows

This directory contains all CI/CD workflows for the Cloud Resume Challenge project.

## Available Workflows

### 🧪 [ci.yml](./ci.yml) - Continuous Integration
**Trigger**: Push or PR to `main` or `develop`

Tests and validates code quality before deployment:
- Python linting (pylint)
- Frontend linting (ESLint)
- TypeScript type checking
- Build verification
- Security scanning (Trivy)
- Infrastructure validation

**Status Badge**:
```markdown
![CI](https://github.com/YOUR_USERNAME/cloud-resume-2025/actions/workflows/ci.yml/badge.svg)
```

---

### 🚀 [deploy-backend.yml](./deploy-backend.yml) - Backend Deployment
**Trigger**: Changes to Python handlers, SST config, or manual dispatch

Deploys backend infrastructure only:
- Lambda functions (Counter, Chatbot)
- DynamoDB table
- API Gateway endpoints
- Runs endpoint health checks

**Status Badge**:
```markdown
![Backend Deploy](https://github.com/YOUR_USERNAME/cloud-resume-2025/actions/workflows/deploy-backend.yml/badge.svg)
```

---

### 🌐 [deploy.yml](./deploy.yml) - Full Stack Deployment
**Trigger**: Push to `main` or manual dispatch

Complete deployment pipeline:
1. Runs CI checks
2. Deploys backend infrastructure
3. Builds frontend with API URLs
4. Deploys frontend to S3/CloudFront
5. Creates deployment summary

**Status Badge**:
```markdown
![Deploy](https://github.com/YOUR_USERNAME/cloud-resume-2025/actions/workflows/deploy.yml/badge.svg)
```

---

## Quick Start

### 1. Set Up AWS Authentication

Create an IAM OIDC provider and role for GitHub Actions. See [CI-CD-SETUP.md](../../CI-CD-SETUP.md) for detailed instructions.

### 2. Add GitHub Secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret Name | Description | Required |
|------------|-------------|----------|
| `AWS_ROLE_ARN` | IAM Role ARN for OIDC authentication | ✅ Yes |
| `S3_BUCKET` | Frontend hosting bucket | ⚠️ Optional |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution | ⚠️ Optional |

### 3. Manual Deployment

Trigger a manual deployment:
1. Go to **Actions** tab
2. Select the desired workflow
3. Click **Run workflow**
4. Choose options and confirm

## Workflow Files Overview

```
.github/workflows/
├── ci.yml                    # Continuous Integration
├── deploy-backend.yml        # Backend Only Deployment
├── deploy.yml               # Full Stack Deployment
└── README.md                # This file
```

## Environment Variables

Workflows use these environment variables:

```yaml
AWS_REGION: us-east-1
NODE_VERSION: '20'
PYTHON_VERSION: '3.12'
```

## Outputs

### Deployment Outputs
- API endpoint URLs (Counter, Chatbot)
- DynamoDB table name
- Deployment status and summary

### Artifacts
- Frontend build artifacts (retention: 7 days)
- Test coverage reports
- Security scan results (SARIF format)

## Monitoring

### View Workflow Runs
```
https://github.com/YOUR_USERNAME/cloud-resume-2025/actions
```

### Check Deployment Logs
1. Click on a workflow run
2. Expand job steps to view detailed logs
3. Download artifacts if needed

## Tips

### Speed Up CI
- Use caching for dependencies
- Run tests in parallel
- Skip redundant steps

### Debug Failed Workflows
1. Check job logs for error messages
2. Verify AWS credentials and permissions
3. Test deployment locally first
4. Enable debug logging if needed

### Best Practices
- Keep secrets secure and rotated
- Use branch protection rules
- Require status checks before merge
- Test in staging before production
- Monitor AWS costs

## Support

For detailed documentation, see:
- [CI/CD Setup Guide](../../CI-CD-SETUP.md)
- [Project README](../../README.md)

---

**Last Updated**: November 2025
