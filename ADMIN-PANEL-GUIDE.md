# Admin Panel Guide

## Overview

Your Cloud Resume website now includes a private admin panel accessible only to you. This admin system allows you to:

1. **Edit Resume Content** - Update your public-facing resume dynamically
2. **Generate ATS-Optimized Resumes** - Create tailored resumes for specific job applications using AI

## Architecture

### Frontend Components

**Admin Routes** (Not deployed to S3 static site):
- `/admin/login` - Authentication page
- `/admin/dashboard` - Main admin dashboard
- `/admin/edit-resume` - Resume content editor with live preview
- `/admin/ats-generator` - AI-powered ATS resume generator

**Public Routes** (Deployed to S3):
- `/` - Public resume website (unchanged)

### Authentication

**Current Implementation** (Simple client-side):
- Email: `Amanuelzegeye63@gmail.com`
- Password: `your_secure_password_here` (YOU MUST CHANGE THIS!)
- Session stored in localStorage
- Protected routes check for valid token

**Security Note**: This is a demo implementation. For production, you should:
- Use AWS Cognito for authentication
- Store credentials in AWS Secrets Manager
- Implement JWT tokens
- Add rate limiting
- Enable MFA

## Setup Instructions

### Step 1: Change Admin Password

**File**: `frontend/app/admin/login/page.tsx`

Find this line (around line 22):
```typescript
const ADMIN_PASSWORD = 'your_secure_password_here' // Change this!
```

Replace with a strong password:
```typescript
const ADMIN_PASSWORD = 'YourStrong!P@ssw0rd2025'
```

**Important**: DO NOT commit this password to Git. Use environment variables instead:
```typescript
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'fallback_password'
```

Then create a `.env.local` file:
```
NEXT_PUBLIC_ADMIN_PASSWORD=YourStrong!P@ssw0rd2025
```

### Step 2: Run Admin Panel Locally

The admin panel requires client-side JavaScript and cannot be deployed as a static site. Run it locally:

```bash
cd frontend
export PATH="/usr/local/bin:/Users/amanuelzegeye/.local/bin:$PATH"
/usr/local/bin/node node_modules/.bin/next dev
```

Access the admin panel at:
```
http://localhost:3000/admin/login
```

### Step 3: Login

1. Navigate to `http://localhost:3000/admin/login`
2. Enter:
   - **Email**: `Amanuelzegeye63@gmail.com`
   - **Password**: Your configured password
3. Click "Sign In"
4. You'll be redirected to the dashboard

### Step 4: Use the Admin Panel

#### Dashboard (`/admin/dashboard`)

The dashboard provides:
- Quick navigation to all admin features
- Overview of website statistics
- Links to edit resume and generate ATS resumes

#### Edit Resume (`/admin/edit-resume`)

Features:
- **Live Preview**: See changes in real-time
- **Form-based Editor**: Update personal info and summary easily
- **Save Changes**: Stores data locally (for now)

Current limitations:
- Only basic fields are editable (name, title, summary)
- Experience and projects require manual editing
- Saved data is stored in localStorage (not persisted to public site yet)

**To apply changes to public site**:
1. Edit resume data in admin panel
2. Manually update `frontend/app/components/Resume.tsx` with new content
3. Rebuild and redeploy to S3

**Future Enhancement**: Connect to DynamoDB to persist changes and dynamically load resume data on the public site.

#### ATS Generator (`/admin/ats-generator`)

Features:
- **Job Description Input**: Paste any job posting
- **AI-Powered Analysis**: Uses Amazon Bedrock (Claude) to analyze requirements
- **Keyword Matching**: Automatically matches your experience to job keywords
- **ATS Optimization**: Generates resume formatted for Applicant Tracking Systems
- **Download**: Save as TXT or PDF (PDF coming soon)

**How to use**:
1. Copy a job description from a job posting
2. Paste into the left panel
3. Click "Generate Tailored Resume"
4. Wait 10-30 seconds for AI processing
5. Review the generated resume in the right panel
6. Click "Download TXT" or "Download PDF"

**Cost**: Each generation costs ~$0.005-0.02 (uses your existing Bedrock chatbot API)

## Features Breakdown

### 1. Admin Login Page

**File**: `frontend/app/admin/login/page.tsx`

**Features**:
- Modern gradient background
- Email and password authentication
- Error handling
- Redirect to dashboard on success
- "Back to public site" link

**Security**:
- Client-side validation
- localStorage token storage
- Session management

### 2. Admin Dashboard

**File**: `frontend/app/admin/dashboard/page.tsx`

**Features**:
- Navigation bar with all admin links
- Dashboard cards for quick access
- Statistics display
- Logout functionality
- "View Public Site" link (opens in new tab)

**Navigation Bar**:
- Dashboard
- Edit Resume
- ATS Generator
- View Public Site
- Logout button

### 3. Resume Editor

**File**: `frontend/app/admin/edit-resume/page.tsx`

**Features**:
- Split-screen layout (editor + preview)
- Real-time preview updates
- Save/load functionality
- Form validation
- Success/error notifications

**Editable Fields**:
- Personal information (name, title, location, phone)
- Professional summary
- Contact links (email, GitHub, LinkedIn)

**Future Enhancements**:
- Edit experience, projects, skills
- Rich text editor
- Image upload
- Drag-and-drop reordering
- Version history
- DynamoDB integration

### 4. ATS Resume Generator

**File**: `frontend/app/admin/ats-generator/page.tsx`

**Features**:
- Job description input (textarea)
- AI-powered resume generation
- Loading states
- Download as TXT
- Download as PDF (coming soon)
- Success/error notifications

**AI Integration**:
- Uses your existing Bedrock chatbot Lambda function
- Sends job description + your resume data
- Claude analyzes and generates tailored resume
- Response includes keyword-optimized content

**ATS Optimization**:
- No tables or columns (ATS-friendly)
- Keyword matching from job description
- Action verbs and quantifiable achievements
- Clear section headers
- Plain text formatting
- Bullet points instead of paragraphs

## Deployment Options

### Option 1: Run Locally Only (Current Setup)

**Pros**:
- Private and secure (not publicly accessible)
- No additional AWS costs
- Easy to use

**Cons**:
- Requires running Next.js dev server
- Only accessible on your machine
- Can't access from mobile/other devices

**How to use**:
```bash
cd frontend
npm run dev
# Access at http://localhost:3000/admin/login
```

### Option 2: Deploy Admin to Separate Hosting

Deploy admin panel to a separate service that supports dynamic routes:

**Option A: Vercel (Recommended)**
```bash
# Create separate deployment for admin only
cd frontend
vercel deploy

# Configure environment variables in Vercel dashboard
# Add password protection
```

**Option B: AWS Amplify**
```bash
# Connect GitHub repo
# Configure build settings
# Enable authentication
```

**Option C: AWS ECS/Fargate**
- Dockerize the Next.js app
- Deploy to ECS
- Put behind ALB with authentication
- More expensive but fully AWS-integrated

### Option 3: API-Based Architecture (Future Enhancement)

**Architecture**:
1. Keep public site on S3 (static)
2. Create Lambda functions for admin operations
3. Store resume data in DynamoDB
4. Public site reads from DynamoDB
5. Admin panel updates DynamoDB via API

**Benefits**:
- Fully serverless
- Public site remains static (cheap)
- Admin operations are API-driven
- Can use AWS Cognito for auth
- Scalable and secure

**Implementation Steps** (Future):
1. Create DynamoDB table for resume data
2. Create Lambda functions:
   - `getResume` - Fetch resume data
   - `updateResume` - Update resume data
   - `generateATSResume` - AI resume generator (separate from chatbot)
3. Update public Resume component to fetch from API
4. Update admin editor to call update API
5. Deploy admin as serverless functions

## Configuration

### Environment Variables

Create `frontend/.env.local`:
```env
# Admin Authentication
NEXT_PUBLIC_ADMIN_EMAIL=Amanuelzegeye63@gmail.com
NEXT_PUBLIC_ADMIN_PASSWORD=YourStrong!P@ssw0rd2025

# API Endpoints
NEXT_PUBLIC_COUNTER_API=https://3fednny2psoslmrcesjkexjtsy0yauae.lambda-url.us-east-1.on.aws/
NEXT_PUBLIC_CHATBOT_API=https://hefzysfj6mkfl5jl4zmueoesa40gwtfc.lambda-url.us-east-1.on.aws/

# Future: Resume API
# NEXT_PUBLIC_RESUME_API=https://your-resume-api.lambda-url.us-east-1.on.aws/
```

**Important**: Add `.env.local` to `.gitignore`:
```
.env.local
.env*.local
```

### next.config.js Updates

The admin panel uses `'use client'` directives and requires JavaScript. For local development, no changes needed.

If deploying admin separately, update `next.config.js`:

```javascript
const nextConfig = {
  // Remove output: 'export' for admin deployment
  reactStrictMode: true,
  // Admin panel needs server-side rendering or client-side routing
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_COUNTER_API: process.env.NEXT_PUBLIC_COUNTER_API || 'https://3fednny2psoslmrcesjkexjtsy0yauae.lambda-url.us-east-1.on.aws/',
    NEXT_PUBLIC_CHATBOT_API: process.env.NEXT_PUBLIC_CHATBOT_API || 'https://hefzysfj6mkfl5jl4zmueoesa40gwtfc.lambda-url.us-east-1.on.aws/',
  },
}

module.exports = nextConfig
```

## Security Best Practices

### Authentication

**Current (Demo)**:
- Hardcoded email/password
- localStorage tokens
- Client-side validation only

**Recommended (Production)**:
1. **AWS Cognito**:
   ```bash
   # Create Cognito User Pool
   aws cognito-idp create-user-pool --pool-name CloudResumeAdmin

   # Add admin user
   aws cognito-idp admin-create-user \
     --user-pool-id YOUR_POOL_ID \
     --username admin@example.com \
     --temporary-password TempPass123!
   ```

2. **Environment Variables**:
   - Never hardcode passwords
   - Use AWS Secrets Manager
   - Rotate credentials regularly

3. **Multi-Factor Authentication**:
   - Enable MFA in Cognito
   - Require for admin access

### Access Control

1. **IP Whitelisting** (if deploying publicly):
   - Restrict admin routes to your IP
   - Use CloudFront geo-restrictions
   - Configure WAF rules

2. **Rate Limiting**:
   - Limit login attempts
   - Use AWS WAF rate-based rules
   - Implement exponential backoff

3. **Session Management**:
   - Set token expiration (1 hour)
   - Implement refresh tokens
   - Auto-logout on inactivity

### Data Protection

1. **HTTPS Only**:
   - Admin panel must use HTTPS
   - Set secure cookie flags
   - Enable HSTS headers

2. **Input Validation**:
   - Sanitize all inputs
   - Prevent XSS attacks
   - Validate file uploads

3. **Audit Logging**:
   - Log all admin actions
   - Store in CloudWatch
   - Monitor for suspicious activity

## Cost Analysis

### Current Implementation (Local Only)

**Cost**: $0/month (no additional costs)

### If Deployed to Vercel

**Cost**:
- **Free Tier**: Sufficient for admin-only use
- **Bandwidth**: Minimal (only you access it)
- **Build Minutes**: Minimal

### If Using API-Based Architecture

**Additional Costs**:
- **DynamoDB**: $0.25/month (on-demand pricing, minimal reads/writes)
- **Lambda**: $0.20/month (admin API calls)
- **API Gateway** (if used): $3.50/million requests (minimal usage)

**Total**: ~$0.50-1.00/month additional

## Usage Tips

### Generating ATS Resumes

**Best Practices**:
1. Copy the ENTIRE job description (not just requirements)
2. Include company name and role title
3. Be specific about technologies mentioned
4. Review generated resume for accuracy
5. Customize further if needed
6. Save multiple versions for different roles

**Example Job Description Input**:
```
Senior Full-Stack Developer
Acme Corp - San Francisco, CA

About Us:
Acme Corp is a leading fintech company...

Requirements:
- 5+ years of experience with React and Node.js
- Strong AWS cloud experience (Lambda, S3, DynamoDB, RDS)
- Experience with CI/CD pipelines and DevOps practices
- Knowledge of microservices architecture
- Excellent communication skills

Responsibilities:
- Build and maintain scalable web applications
- Design cloud infrastructure
- Collaborate with product team
- etc...
```

### Editing Resume

**Workflow**:
1. Make changes in admin editor
2. Review in live preview
3. Click "Save Changes"
4. Manually update `Resume.tsx` component (for now)
5. Rebuild and deploy to S3

**Future** (with API integration):
- Changes save to DynamoDB
- Public site automatically reflects updates
- No manual deployment needed

## Troubleshooting

### Login Not Working

**Issue**: "Invalid email or password"

**Solutions**:
1. Check password in `login/page.tsx` line 22
2. Ensure email exactly matches: `Amanuelzegeye63@gmail.com`
3. Clear browser localStorage: `localStorage.clear()`
4. Check browser console for errors

### ATS Generator Not Responding

**Issue**: "Failed to generate resume"

**Solutions**:
1. Check Bedrock API is working:
   ```bash
   curl -X POST https://hefzysfj6mkfl5jl4zmueoesa40gwtfc.lambda-url.us-east-1.on.aws/ \
     -H "Content-Type: application/json" \
     -d '{"question":"test"}'
   ```
2. Verify Lambda function has Bedrock permissions
3. Check CloudWatch logs for errors
4. Ensure job description is not empty
5. Try with shorter job description (token limits)

### Preview Not Updating

**Issue**: Changes in editor don't show in preview

**Solutions**:
1. Refresh the page
2. Check browser console for errors
3. Ensure JavaScript is enabled
4. Clear browser cache

### Can't Access Admin Panel

**Issue**: `/admin/login` shows 404

**Solutions**:
1. Ensure Next.js dev server is running:
   ```bash
   cd frontend && npm run dev
   ```
2. Check you're accessing `http://localhost:3000/admin/login` (not S3 URL)
3. Admin routes are NOT deployed to S3 (by design)

## Future Enhancements

### Short Term

1. **Full Resume Editor**:
   - Edit all sections (experience, projects, skills)
   - Drag-and-drop reordering
   - Add/remove items dynamically
   - Rich text editing

2. **PDF Generation**:
   - Use `react-pdf` or `jsPDF`
   - Professional templates
   - Custom styling options

3. **Resume Templates**:
   - Multiple design options
   - Switch between templates
   - Preview different styles

### Medium Term

4. **DynamoDB Integration**:
   - Store resume data in database
   - Public site fetches from API
   - Version control for resume data

5. **AWS Cognito Authentication**:
   - Replace hardcoded password
   - MFA support
   - Password reset functionality

6. **Analytics Dashboard**:
   - Track resume downloads
   - Monitor ATS generator usage
   - View visitor statistics

### Long Term

7. **Multi-User Support**:
   - Allow multiple admins
   - Role-based access control
   - Audit logs

8. **AI Enhancements**:
   - Resume scoring vs job description
   - Keyword optimization suggestions
   - Interview question generator

9. **Job Application Tracker**:
   - Track applications
   - Store generated resumes
   - Follow-up reminders

## Summary

### What You Have

- ✅ Private admin login page
- ✅ Admin dashboard with navigation
- ✅ Resume editor with live preview
- ✅ AI-powered ATS resume generator
- ✅ Download capabilities (TXT format)
- ✅ Secure client-side authentication
- ✅ Modern, responsive UI

### What's Next

1. **Set your admin password** in `login/page.tsx`
2. **Run the dev server**: `cd frontend && npm run dev`
3. **Access admin panel**: `http://localhost:3000/admin/login`
4. **Test ATS generator** with a real job description
5. **Consider deploying admin** to Vercel or AWS Amplify

### Important Notes

- Admin panel runs locally by default (not on S3)
- Changes in editor don't automatically update public site yet
- ATS generator uses your existing Bedrock API (same costs)
- Authentication is demo-level (upgrade to Cognito for production)
- PDF download coming soon (currently TXT only)

### Access URLs

- **Public Resume**: https://d5rk3dryo0e0i.cloudfront.net
- **Admin Login**: http://localhost:3000/admin/login (local only)
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Resume Editor**: http://localhost:3000/admin/edit-resume
- **ATS Generator**: http://localhost:3000/admin/ats-generator

**Your admin panel is ready to use! Start by setting your password and testing locally.**
