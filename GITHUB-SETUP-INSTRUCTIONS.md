# GitHub Repository Setup Instructions

## ✅ AWS Infrastructure Setup Complete!

The following AWS resources have been created for your CI/CD pipeline:

### 🔐 Created Resources:

1. **OIDC Provider**: `arn:aws:iam::600592587584:oidc-provider/token.actions.githubusercontent.com`
2. **IAM Role**: `GitHubActionsDeployRole`
3. **IAM Policy**: `GitHubActionsDeployPolicy`

---

## 📋 Next Steps: Configure GitHub Secrets

### Step 1: Create/Access Your GitHub Repository

If you haven't created a GitHub repository yet:

```bash
# Initialize git (if not already done)
git init

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/cloud-resume-2025.git

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Cloud Resume Challenge with CI/CD"

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

Add the following secret:

#### Required Secret:

| Name | Value |
|------|-------|
| `AWS_ROLE_ARN` | `arn:aws:iam::600592587584:role/GitHubActionsDeployRole` |

**How to add:**
1. Name: `AWS_ROLE_ARN`
2. Secret: `arn:aws:iam::600592587584:role/GitHubActionsDeployRole`
3. Click **Add secret**

#### Optional Secrets (for frontend deployment to S3):

| Name | Value | Description |
|------|-------|-------------|
| `S3_BUCKET` | your-bucket-name | S3 bucket for frontend hosting |
| `CLOUDFRONT_DISTRIBUTION_ID` | E1234567890ABC | CloudFront distribution ID |

---

## 🔧 Update Trust Policy (Important!)

The IAM role trust policy currently allows **any** repository named `cloud-resume-2025`. For security, you should update it with your specific GitHub username.

### Option 1: Using AWS Console

1. Go to [IAM Console](https://console.aws.amazon.com/iam/)
2. Click **Roles** → **GitHubActionsDeployRole**
3. Click **Trust relationships** tab
4. Click **Edit trust policy**
5. Replace `"token.actions.githubusercontent.com:sub": "repo:*/cloud-resume-2025:*"`
   with `"token.actions.githubusercontent.com:sub": "repo:YOUR_USERNAME/cloud-resume-2025:*"`
6. Click **Update policy**

### Option 2: Using AWS CLI

```bash
# Save your GitHub username
GITHUB_USERNAME="your-github-username"

# Create updated trust policy
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

# Update the trust policy
aws iam update-assume-role-policy \
  --role-name GitHubActionsDeployRole \
  --policy-document file://updated-trust-policy.json
```

---

## 🚀 Test Your CI/CD Pipeline

Once you've added the GitHub secret:

### Option 1: Push to Main Branch

```bash
# Make a small change
echo "# Cloud Resume Challenge" >> README.md

# Commit and push
git add README.md
git commit -m "test: Trigger CI/CD pipeline"
git push origin main
```

### Option 2: Manual Workflow Trigger

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select **Deploy Backend Only** workflow
4. Click **Run workflow**
5. Select branch: `main`
6. Click **Run workflow** button

---

## 📊 Monitor Your Deployment

### GitHub Actions
- Go to **Actions** tab to see workflow runs
- Click on a run to see detailed logs
- View deployment summaries with API URLs

### AWS Console
- **Lambda**: Check function logs in CloudWatch
- **DynamoDB**: Verify table creation
- **CloudWatch**: View metrics and logs

---

## 🎯 Expected Workflow Behavior

When you push to `main` branch:

1. **CI Workflow** runs automatically:
   - Lints Python and TypeScript code
   - Runs security scans
   - Validates infrastructure

2. **Deploy Backend** workflow (if backend files changed):
   - Deploys Lambda functions
   - Creates/updates DynamoDB table
   - Tests API endpoints
   - Outputs API URLs

3. **Full Deploy** workflow (on main branch):
   - Runs CI checks
   - Deploys backend
   - Builds frontend with API URLs
   - Deploys to S3/CloudFront (if configured)

---

## ✅ Verification Checklist

- [ ] GitHub repository created
- [ ] Git remote configured
- [ ] `AWS_ROLE_ARN` secret added to GitHub
- [ ] Trust policy updated with your GitHub username
- [ ] First commit pushed to `main` branch
- [ ] GitHub Actions workflow triggered
- [ ] Deployment successful
- [ ] API endpoints accessible

---

## 🐛 Troubleshooting

### Issue: "Error: Failed to assume role"

**Solution**: Verify the `AWS_ROLE_ARN` secret is correct and the trust policy includes your GitHub username.

### Issue: "Permission denied" errors during deployment

**Solution**: Check that the IAM policy attached to the role has all necessary permissions.

### Issue: Workflows not triggering

**Solution**:
- Verify you pushed to the `main` branch
- Check workflow files are in `.github/workflows/` directory
- Ensure YAML syntax is correct

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS IAM OIDC Guide](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)
- [SST Documentation](https://docs.sst.dev/)
- [CI/CD Setup Guide](./CI-CD-SETUP.md)

---

## 🎉 Success!

Once setup is complete, your CI/CD pipeline will automatically:
- ✅ Test code on every push
- ✅ Deploy backend changes to AWS
- ✅ Build and deploy frontend
- ✅ Provide deployment summaries with URLs

**Your Role ARN**: `arn:aws:iam::600592587584:role/GitHubActionsDeployRole`

Copy this ARN and add it to your GitHub repository secrets as `AWS_ROLE_ARN`.
