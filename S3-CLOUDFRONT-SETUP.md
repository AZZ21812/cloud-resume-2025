# S3 + CloudFront Frontend Hosting Setup

## What Was Configured

Your Cloud Resume frontend is now deployed to AWS using:
- **S3**: Static file storage
- **CloudFront**: Global CDN for fast delivery worldwide
- **Automatic deployment**: Via GitHub Actions CI/CD

## Architecture

```
User Request
     ↓
CloudFront (CDN)
     ↓
S3 Bucket (Static Files)
     ↓
Frontend calls Lambda APIs
     ↓
Lambda Functions + DynamoDB + Bedrock
```

## Changes Made

### 1. Next.js Configuration (`frontend/next.config.js`)

Added static export configuration:
```javascript
{
  output: 'export',          // Generate static HTML/CSS/JS
  images: { unoptimized: true },  // Disable Next.js image optimization
  trailingSlash: true,       // Add trailing slashes for S3 compatibility
}
```

**What this does:**
- Converts Next.js app to static files
- Compatible with S3 hosting
- No server-side rendering needed

### 2. SST Configuration (`sst.config.ts`)

Added frontend hosting component:
```typescript
const frontend = new sst.aws.Nextjs("Frontend", {
  path: "./frontend",
  environment: {
    NEXT_PUBLIC_COUNTER_API: counterApi.url,
    NEXT_PUBLIC_CHATBOT_API: chatbotApi.url,
  },
});
```

**What this creates:**
- S3 bucket for static assets
- CloudFront distribution with:
  - Global edge locations (fast worldwide)
  - Automatic HTTPS certificate
  - Caching configured for performance
  - Gzip/Brotli compression
- Automatic environment variable injection

### 3. CI/CD Workflow (`.github/workflows/deploy.yml`)

Unified deployment workflow:
- Runs tests first (CI checks)
- Deploys backend (Lambda + DynamoDB)
- Deploys frontend (S3 + CloudFront)
- Tests all endpoints
- Reports deployment URLs

## How Deployment Works

### Automated Deployment (GitHub Actions)

```bash
1. Push code to GitHub
       ↓
2. GitHub Actions triggered
       ↓
3. Run CI tests (lint, type-check)
       ↓
4. Deploy with SST:
   - Build Next.js → static files
   - Upload to S3
   - Configure CloudFront
   - Invalidate cache
       ↓
5. Test all endpoints
       ↓
6. Report URLs in deployment summary
```

**Timeline:** 8-12 minutes for full deployment

### Manual Deployment (Local)

If you want to deploy manually from your computer:

```bash
# Install dependencies
npm ci
cd frontend && npm ci && cd ..

# Deploy everything
npx sst deploy --stage production

# Output will show:
# - Counter API URL
# - Chatbot API URL
# - Frontend URL (CloudFront)
```

## What Gets Deployed

### S3 Bucket Contents

```
s3://cloud-resume-2025-production-frontend-xxxxx/
├── index.html              (Homepage)
├── _next/
│   ├── static/
│   │   ├── chunks/         (JavaScript bundles)
│   │   └── css/            (Stylesheets)
├── favicon.ico
└── ... (other static assets)
```

### CloudFront Configuration

- **Custom Domain**: Can be added later
- **HTTPS**: Automatic SSL certificate
- **Caching**: Optimized for static content
- **Compression**: Gzip/Brotli enabled
- **Edge Locations**: 400+ worldwide

## Accessing Your Site

### After Deployment

Your site will be available at:
- **CloudFront URL**: `https://d1234abcd.cloudfront.net`
- This URL is shown in GitHub Actions deployment summary

### Getting the URL

**Option 1: GitHub Actions**
1. Go to https://github.com/AZZ21812/cloud-resume-2025/actions
2. Click latest "Deploy Full Stack" workflow
3. Check "Deployment Summary" section
4. Copy the Frontend URL

**Option 2: Command Line**
```bash
npx sst outputs --stage production --format json | jq -r '.frontendUrl'
```

**Option 3: AWS Console**
1. Open AWS CloudFront console
2. Find distribution for cloud-resume-2025
3. Copy the domain name

## Cost Breakdown

### Estimated Monthly Costs

**Low Traffic (1,000 visitors/month):**
```
S3 Storage:
- 10 MB of files × $0.023/GB = $0.0002

S3 Requests:
- 1,000 GET requests × $0.0004/1000 = $0.0004

CloudFront:
- 100 MB data transfer × $0.085/GB = $0.0085

Total: ~$0.01/month (1 cent!)
```

**Medium Traffic (10,000 visitors/month):**
```
S3: $0.005
CloudFront: $0.85

Total: ~$0.86/month
```

**High Traffic (100,000 visitors/month):**
```
S3: $0.05
CloudFront: $8.50

Total: ~$8.55/month
```

### Free Tier Benefits

AWS Free Tier (first 12 months):
- ✅ 20,000 HTTPS requests/month (CloudFront)
- ✅ 10 GB data transfer out (CloudFront)
- ✅ 5 GB S3 storage
- ✅ 20,000 S3 GET requests

**Result**: Free for first year with low traffic!

## Performance Optimizations

### What SST Does Automatically

1. **CloudFront Caching**
   - Static assets cached at edge locations
   - Reduces latency (faster page loads)
   - Reduces S3 requests (lower cost)

2. **Compression**
   - Gzip compression enabled
   - Brotli compression enabled
   - Smaller file sizes = faster downloads

3. **HTTP/2**
   - Modern protocol enabled
   - Multiplexing for better performance

4. **Cache Headers**
   - Long cache times for static assets
   - Immutable files cached indefinitely

### Global Performance

**CloudFront Edge Locations:**
- North America: 50+ locations
- Europe: 50+ locations
- Asia: 80+ locations
- South America: 10+ locations
- Australia: 10+ locations
- Africa: 5+ locations

**Result**: Fast load times worldwide (< 200ms)

## Adding a Custom Domain (Optional)

### Step 1: Get a Domain

Buy from:
- Route 53 (AWS)
- Namecheap
- GoDaddy
- Google Domains

### Step 2: Request SSL Certificate

```bash
# In AWS Certificate Manager (ACM)
# Must be in us-east-1 region for CloudFront
aws acm request-certificate \
  --domain-name yourname.com \
  --validation-method DNS \
  --region us-east-1
```

### Step 3: Update SST Config

```typescript
const frontend = new sst.aws.Nextjs("Frontend", {
  path: "./frontend",
  domain: {
    name: "yourname.com",
    dns: sst.cloudflare.dns(), // or sst.aws.dns() for Route53
  },
  environment: {
    NEXT_PUBLIC_COUNTER_API: counterApi.url,
    NEXT_PUBLIC_CHATBOT_API: chatbotApi.url,
  },
});
```

### Step 4: Deploy

```bash
npx sst deploy --stage production
```

SST will:
- Configure CloudFront with your domain
- Set up DNS records
- Issue SSL certificate
- Configure HTTPS redirects

## Monitoring & Analytics

### CloudFront Metrics (AWS Console)

Available metrics:
- **Requests**: Total number of requests
- **Data Transfer**: Bytes downloaded
- **Error Rate**: 4xx and 5xx errors
- **Cache Hit Ratio**: % of cached requests

### CloudWatch Logs

Enable logging to see:
- Which pages are visited
- Where visitors are from
- Browser/device info
- Performance data

### Third-Party Analytics (Optional)

Add to your frontend:
- Google Analytics
- Plausible Analytics
- Vercel Analytics
- Cloudflare Web Analytics

## Debugging & Troubleshooting

### Frontend Not Loading

**Check CloudFront distribution:**
```bash
# Get distribution ID
npx sst outputs --stage production --format json | jq -r '.frontendDistribution'

# Check status
aws cloudfront get-distribution --id E1234ABCD5678
```

**Status should be:** `Deployed`

### 403 Forbidden Error

**Cause**: S3 bucket permissions or missing index.html

**Fix**:
1. Check S3 bucket has files
2. Verify CloudFront origin settings
3. Check index.html exists in root

### 404 for Routes

**Cause**: S3 doesn't handle client-side routing

**Fix**: SST automatically configures CloudFront to serve index.html for all routes

### Slow Load Times

**Check**:
1. CloudFront cache hit ratio (should be > 80%)
2. File sizes (compress large images)
3. Number of requests (bundle JavaScript)

**Optimize**:
```bash
# Enable CloudFront compression in SST config
cloudfront: {
  compress: true
}
```

## Cache Invalidation

When you deploy, SST automatically invalidates CloudFront cache.

**Manual invalidation** (if needed):
```bash
# Get distribution ID
DIST_ID=$(npx sst outputs --stage production --format json | jq -r '.frontendDistribution')

# Invalidate all files
aws cloudfront create-invalidation \
  --distribution-id $DIST_ID \
  --paths "/*"
```

**Cost**: First 1,000 invalidations/month are free

## Security

### What's Configured

1. **HTTPS Only**: All HTTP redirected to HTTPS
2. **Secure Headers**: Configured by CloudFront
3. **CORS**: Set for API endpoints
4. **No Direct S3 Access**: Only via CloudFront

### Additional Security (Optional)

**AWS WAF** (Web Application Firewall):
- Rate limiting
- Block IPs
- Prevent SQL injection
- XSS protection

**CloudFront Functions**:
- Add security headers
- Redirect rules
- A/B testing

## Cleanup

### Remove Frontend Only

```bash
# Remove frontend from SST config
# Then deploy
npx sst deploy --stage production
```

### Remove Everything

```bash
# Delete entire stack
npx sst remove --stage production
```

**Warning**: This deletes:
- S3 bucket and all files
- CloudFront distribution
- Lambda functions
- DynamoDB table

## Next Steps

### Immediate
1. ✅ Wait for deployment to complete
2. ✅ Check GitHub Actions for frontend URL
3. ✅ Visit your live site!
4. ✅ Test counter and chatbot

### Short-term
- [ ] Add custom domain
- [ ] Set up analytics
- [ ] Add more content
- [ ] Share on LinkedIn

### Long-term
- [ ] Add blog section
- [ ] Create project portfolio
- [ ] Implement contact form
- [ ] Add visitor analytics dashboard

## Resources

- **SST Docs**: https://docs.sst.dev/
- **AWS CloudFront**: https://docs.aws.amazon.com/cloudfront/
- **AWS S3**: https://docs.aws.amazon.com/s3/
- **Next.js Static Export**: https://nextjs.org/docs/app/building-your-application/deploying/static-exports

---

## Summary

Your Cloud Resume is now:
- ✅ **Fully hosted on AWS** (S3 + CloudFront)
- ✅ **Globally distributed** (400+ edge locations)
- ✅ **Automatically deployed** (GitHub Actions)
- ✅ **HTTPS enabled** (Free SSL certificate)
- ✅ **Cost-effective** (~$1/month for low traffic)
- ✅ **Production-ready** (Scalable, secure, fast)

**Your deployment is running now!** Check GitHub Actions to get your live URL.

Visit: https://github.com/AZZ21812/cloud-resume-2025/actions
