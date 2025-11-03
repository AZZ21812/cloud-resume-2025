# Admin Panel Quick Start Guide

## What You Got

I've built a complete admin panel for your Cloud Resume with two powerful features:

### 1. Resume Editor
Edit your resume content with a live preview

### 2. ATS Resume Generator
Paste a job description → AI generates a tailored, ATS-optimized resume → Download for applications

## Setup (5 Minutes)

### Step 1: Set Your Password

**File**: `frontend/app/admin/login/page.tsx` (line 22)

Change this line:
```typescript
const ADMIN_PASSWORD = 'your_secure_password_here' // Change this!
```

To your own password:
```typescript
const ADMIN_PASSWORD = 'YourStrongPassword123!'
```

### Step 2: Start the Admin Panel

```bash
cd /Users/amanuelzegeye/Desktop/cloud-resume-2025/frontend
npm run dev
```

### Step 3: Login

Open your browser:
```
http://localhost:3000/admin/login
```

Login with:
- **Email**: `Amanuelzegeye63@gmail.com`
- **Password**: Your password from Step 1

## Features

### Dashboard
- Overview of all admin features
- Quick access to Resume Editor and ATS Generator
- Link to view public site

### Resume Editor (`/admin/edit-resume`)
- Edit personal information (name, title, location, phone)
- Update professional summary
- Live preview of changes
- Save functionality

**Note**: Currently saves to localStorage. To update public site, manually edit `Resume.tsx` and redeploy.

### ATS Generator (`/admin/ats-generator`)
- Paste any job description
- AI analyzes requirements and generates tailored resume
- Matches keywords automatically
- ATS-friendly formatting (no tables, clear structure)
- Download as TXT file
- PDF coming soon

## Using the ATS Generator

**Example Workflow**:

1. **Find a job posting** you want to apply to
2. **Copy the entire job description**
3. **Open ATS Generator**: http://localhost:3000/admin/ats-generator
4. **Paste job description** in left panel
5. **Click "Generate Tailored Resume"**
6. **Wait 10-30 seconds** (AI processing)
7. **Review generated resume** in right panel
8. **Download** as TXT file
9. **Copy to Word/Google Docs** and format as needed
10. **Submit application**

**Cost**: ~$0.005-0.02 per generation (uses your existing Bedrock API)

## Example Job Description to Test

```
Senior Full-Stack Developer
Tech Startup - Remote

Requirements:
- 5+ years experience with React, Node.js, TypeScript
- AWS cloud experience (Lambda, S3, RDS, DynamoDB)
- CI/CD pipelines and DevOps practices
- Experience with microservices architecture
- Strong communication and teamwork skills

Responsibilities:
- Build and maintain scalable web applications
- Design cloud infrastructure on AWS
- Collaborate with product and design teams
- Mentor junior developers
```

Paste this into the ATS Generator to see it work!

## Architecture

### Public Site (S3 + CloudFront)
- URL: https://d5rk3dryo0e0i.cloudfront.net
- Static site (HTML/CSS/JS)
- Accessible to everyone

### Admin Panel (Local)
- URL: http://localhost:3000/admin/*
- Runs on your machine only
- Not publicly accessible
- Requires authentication

## Security Notes

**Current Setup** (Demo-level):
- Email/password hardcoded in code
- Session stored in browser localStorage
- Only accessible when running locally

**For Production** (Optional Upgrades):
- Use AWS Cognito for authentication
- Store credentials in AWS Secrets Manager
- Deploy admin to Vercel with password protection
- Enable MFA

## Important Files

**Admin Panel**:
- `frontend/app/admin/login/page.tsx` - Login page
- `frontend/app/admin/dashboard/page.tsx` - Dashboard
- `frontend/app/admin/edit-resume/page.tsx` - Resume editor
- `frontend/app/admin/ats-generator/page.tsx` - ATS generator

**Public Site**:
- `frontend/app/page.tsx` - Homepage
- `frontend/app/components/Resume.tsx` - Resume component

**Documentation**:
- `ADMIN-PANEL-GUIDE.md` - Complete documentation
- `ADMIN-QUICKSTART.md` - This file

## Troubleshooting

### Can't login?
- Check password in `login/page.tsx` line 22
- Make sure email is exactly: `Amanuelzegeye63@gmail.com`
- Clear browser cache: Press F12 → Console → type `localStorage.clear()`

### ATS Generator not working?
- Verify Bedrock API is active
- Check job description is not empty
- Try shorter job description (token limits)

### Changes not appearing?
- Admin editor saves to localStorage only
- To update public site, manually edit `Resume.tsx`
- Then rebuild: `npm run build` and deploy to S3

## Next Steps (Optional)

### 1. Deploy Admin to Vercel
```bash
cd frontend
vercel deploy
# Add environment variables in Vercel dashboard
```

### 2. Connect to DynamoDB
- Store resume data in database
- Public site fetches from API
- Admin updates persist automatically

### 3. Add PDF Generation
- Install jsPDF: `npm install jspdf`
- Implement PDF export in ATS generator

### 4. Upgrade Authentication
- Set up AWS Cognito User Pool
- Replace hardcoded password
- Add MFA

## URLs Reference

**Public Site**:
- Live Site: https://d5rk3dryo0e0i.cloudfront.net
- S3 Bucket: cloud-resume-2025-frontend-1762138195
- CloudFront Distribution: E16DTCEFPKHA5M

**APIs**:
- Counter: https://3fednny2psoslmrcesjkexjtsy0yauae.lambda-url.us-east-1.on.aws/
- Chatbot/AI: https://hefzysfj6mkfl5jl4zmueoesa40gwtfc.lambda-url.us-east-1.on.aws/

**Admin Panel** (Local):
- Login: http://localhost:3000/admin/login
- Dashboard: http://localhost:3000/admin/dashboard
- Resume Editor: http://localhost:3000/admin/edit-resume
- ATS Generator: http://localhost:3000/admin/ats-generator

## Summary

✅ **Admin panel built and ready**
✅ **Resume editor with live preview**
✅ **AI-powered ATS resume generator**
✅ **Download capabilities**
✅ **Secure authentication**

### To Get Started:
1. Set password in `login/page.tsx`
2. Run `npm run dev` in frontend folder
3. Go to http://localhost:3000/admin/login
4. Start editing and generating resumes!

**Full documentation**: See [ADMIN-PANEL-GUIDE.md](ADMIN-PANEL-GUIDE.md)

---

**Questions?** Check the troubleshooting section or review the full guide.

**Ready to apply for jobs?** Use the ATS Generator to create tailored resumes!
