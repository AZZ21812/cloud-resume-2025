# Google Calendar Booking Setup Guide

## Overview

Your Cloud Resume now includes a prominent "Schedule a Call" button that will integrate with Google Calendar appointment scheduling. This allows visitors to book time with you directly through Google Workspace.

## What Was Added

### Frontend Changes

**File:** `frontend/app/components/Resume.tsx`

Added a call-to-action button at the top of the contact card:
- Large, gradient button (blue to purple)
- Calendar icon with "Schedule a Call" text
- Positioned prominently above other contact methods
- Responsive design with hover effects

## Google Calendar Setup Instructions

### Step 1: Enable Appointment Schedules in Google Calendar

1. Go to [Google Calendar](https://calendar.google.com)
2. Log in with your Google Workspace account (Amanuelzegeye63@gmail.com)
3. On the left sidebar, click **"+"** next to "Other calendars"
4. Select **"Create appointment schedule"**

### Step 2: Configure Your Appointment Schedule

Configure the following settings:

**Basic Information:**
- **Title:** "Consultation Call with Amanuel"
- **Duration:** 30 minutes (or your preference: 15, 30, 45, or 60 minutes)
- **Location:**
  - Option 1: Google Meet (auto-generated for each booking)
  - Option 2: Phone call
  - Option 3: In-person (if applicable)

**Availability:**
- **Days:** Select which days you're available (e.g., Monday-Friday)
- **Time range:** Set your available hours (e.g., 9:00 AM - 5:00 PM EST)
- **Buffer time:** Add 15-minute buffer between meetings (recommended)
- **Maximum bookings per day:** Set a limit (e.g., 4 meetings/day)
- **Minimum scheduling notice:** At least 24 hours (recommended)
- **Maximum booking window:** How far in advance people can book (e.g., 60 days)

**Booking form customization:**
- **Name:** Required
- **Email:** Required
- **Phone number:** Optional
- **Custom questions:** Add questions like:
  - "What would you like to discuss?" (text field)
  - "How did you hear about me?" (dropdown)
  - "Company/Organization" (text field)

**Confirmation & Reminders:**
- ✅ Send email confirmation to guest
- ✅ Send email notification to you
- ✅ Send reminder 24 hours before
- ✅ Send reminder 1 hour before

### Step 3: Get Your Booking URL

After creating the appointment schedule:

1. Click on the appointment schedule you just created
2. Click **"Get booking page link"** or **"View booking page"**
3. Copy the URL - it will look like:
   ```
   https://calendar.google.com/calendar/appointments/schedules/AcZssZ1234567890abcdefg
   ```
   or
   ```
   https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1234567890abcdefg
   ```

### Step 4: Update Your Website

Replace the placeholder URL in your code:

**File to edit:** `frontend/app/components/Resume.tsx`

Find this line (around line 13):
```typescript
href="https://calendar.google.com/calendar/appointments/schedules/YOUR_CALENDAR_ID"
```

Replace `YOUR_CALENDAR_ID` with your actual booking URL:
```typescript
href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1234567890abcdefg"
```

### Step 5: Deploy the Changes

After updating the URL, rebuild and deploy:

```bash
# Build the frontend
cd frontend
export PATH="/usr/local/bin:/Users/amanuelzegeye/.local/bin:$PATH"
/usr/local/bin/node node_modules/.bin/next build

# Upload to S3
BUCKET=cloud-resume-2025-frontend-1762138195
/usr/local/aws-cli/aws s3 sync out/ s3://$BUCKET/ --delete

# Invalidate CloudFront cache
/usr/local/aws-cli/aws cloudfront create-invalidation \
  --distribution-id E16DTCEFPKHA5M \
  --paths "/*"
```

Or use the automated deployment script:
```bash
git add .
git commit -m "Add Google Calendar booking button"
git push origin main
```

GitHub Actions will automatically deploy the changes.

## Alternative: Calendly Integration

If you prefer using Calendly (free tier available):

### Step 1: Create Calendly Account

1. Go to [Calendly.com](https://calendly.com)
2. Sign up with your Google Workspace account
3. Connect your Google Calendar

### Step 2: Create Event Type

1. Click **"Create"** → **"Event Type"**
2. Configure:
   - **Event name:** "Consultation Call"
   - **Duration:** 30 minutes
   - **Location:** Google Meet
   - **Availability:** Set your schedule

### Step 3: Get Your Calendly Link

Copy your Calendly link (e.g., `https://calendly.com/amanuel-alemu/30min`)

### Step 4: Update Code

In `frontend/app/components/Resume.tsx`, change:
```typescript
href="https://calendly.com/amanuel-alemu/30min"
```

## User Experience

When visitors click "Schedule a Call":

1. **Opens in new tab** - Google Calendar appointment page
2. **Selects date & time** - Shows your available slots
3. **Fills out form** - Name, email, custom questions
4. **Receives confirmation** - Email with:
   - Meeting details
   - Google Meet link (if selected)
   - Calendar invite (.ics file)
   - Reminder notifications

You'll receive:
- Email notification of new booking
- Calendar event automatically added
- Guest information
- Reminder before meeting

## Design Details

The button has been designed to be highly visible:

**Visual Features:**
- **Size:** Large (px-8 py-4) for prominence
- **Color:** Gradient from blue-600 to purple-600 (matches your brand)
- **Position:** Top of contact card (first thing visitors see)
- **Icons:** Calendar icon + external link indicator
- **Effects:**
  - Hover lifts button (-translate-y-0.5)
  - Shadow intensifies on hover
  - Smooth transitions
- **Text:** Clear call-to-action + helpful subtext

**Responsive:**
- Works on mobile, tablet, desktop
- Touch-friendly on mobile devices
- Accessible keyboard navigation

## Benefits

### For You:
- ✅ **Professional appearance** - Modern booking system
- ✅ **Time-saving** - No back-and-forth emails
- ✅ **Calendar integration** - Auto-syncs to Google Calendar
- ✅ **Automatic reminders** - Reduces no-shows
- ✅ **Control your schedule** - Set availability rules
- ✅ **Visitor information** - Collect context before calls

### For Visitors:
- ✅ **Instant booking** - See real-time availability
- ✅ **Timezone conversion** - Automatic timezone handling
- ✅ **Email confirmation** - Calendar invite + details
- ✅ **Easy rescheduling** - Manage their own bookings
- ✅ **Google Meet link** - Automatic video conferencing

## Cost

**Google Calendar Appointment Scheduling:**
- ✅ **FREE** with Google Workspace or personal Gmail
- ✅ Unlimited bookings
- ✅ Google Meet integration included
- ✅ No additional fees

**Calendly (Alternative):**
- **Free Tier:** 1 event type, unlimited bookings
- **Premium:** $10/month (multiple event types, custom branding)

## Testing

After setup, test your booking flow:

1. Visit your live site: https://d5rk3dryo0e0i.cloudfront.net
2. Click "Schedule a Call"
3. Test booking as if you're a visitor
4. Verify:
   - Available times show correctly
   - Timezone is correct
   - Booking form works
   - Confirmation email arrives
   - Calendar event is created

## Customization Options

### Change Button Text

Edit line 19 in `Resume.tsx`:
```typescript
<span>Schedule a Call</span>
```

To:
```typescript
<span>Book a Consultation</span>
// or
<span>Let's Chat</span>
// or
<span>Schedule a Meeting</span>
```

### Change Button Color

Edit line 16 to change gradient:
```typescript
// Current: Blue to Purple
className="... bg-gradient-to-r from-blue-600 to-purple-600 ..."

// Green to Blue
className="... bg-gradient-to-r from-green-600 to-blue-600 ..."

// Red to Orange
className="... bg-gradient-to-r from-red-600 to-orange-600 ..."
```

### Add Multiple Booking Options

You can add multiple buttons for different types of calls:

```typescript
<div className="flex flex-wrap gap-4 justify-center">
  <a href="YOUR_15MIN_CALENDAR_URL" className="...">
    <Calendar className="w-5 h-5" />
    <span>Quick Chat (15 min)</span>
  </a>
  <a href="YOUR_30MIN_CALENDAR_URL" className="...">
    <Calendar className="w-5 h-5" />
    <span>Consultation (30 min)</span>
  </a>
  <a href="YOUR_60MIN_CALENDAR_URL" className="...">
    <Calendar className="w-5 h-5" />
    <span>Deep Dive (60 min)</span>
  </a>
</div>
```

## Analytics & Tracking

### Google Calendar Insights

View booking analytics in Google Calendar:
- Number of bookings
- Most popular times
- Cancellation rate
- Response time

### Add Google Analytics Tracking (Optional)

Track button clicks:

```typescript
<a
  href="YOUR_CALENDAR_URL"
  onClick={() => {
    // Google Analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'booking_clicked', {
        event_category: 'engagement',
        event_label: 'schedule_call_button',
      })
    }
  }}
  className="..."
>
```

## Troubleshooting

### Button Not Appearing

1. Check if code was saved properly
2. Rebuild frontend: `npm run build`
3. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
4. Check CloudFront invalidation completed

### Calendar Link Not Working

1. Verify appointment schedule is published (not draft)
2. Check Google Calendar sharing settings
3. Ensure URL was copied completely
4. Test URL in incognito/private browser

### Timezone Issues

1. In Google Calendar appointment settings:
   - Set your default timezone
   - Enable "Display timezone to guests"
2. Google Calendar auto-converts to guest's timezone

### Bookings Not Syncing

1. Check Google Calendar permissions
2. Verify calendar is not set to "Private"
3. Check appointment schedule calendar settings
4. Ensure notifications are enabled

## Privacy & Security

**Google Calendar Handles:**
- ✅ Email verification
- ✅ Spam protection
- ✅ Guest data privacy (GDPR compliant)
- ✅ Secure booking links
- ✅ Cancellation/rescheduling

**Best Practices:**
- Don't share personal calendar, only appointment schedule
- Set reasonable booking limits (prevent spam)
- Use buffer times to avoid back-to-back meetings
- Review booking confirmation emails

## Next Steps

1. **Set up Google Calendar appointment schedule** (15 minutes)
2. **Copy your booking URL**
3. **Update `Resume.tsx` with your URL** (1 minute)
4. **Deploy to production** (5 minutes)
5. **Test the booking flow** (5 minutes)
6. **Share your resume with booking capability** (LinkedIn, portfolio, etc.)

## Support Resources

- **Google Calendar Help:** https://support.google.com/calendar/answer/10729749
- **Calendly Help Center:** https://help.calendly.com
- **Google Workspace Admin:** https://admin.google.com

## Summary

✅ **Booking button added** to your contact card
✅ **Professional design** with gradient, icons, animations
⏳ **Waiting for:** Your Google Calendar booking URL
⏳ **Next step:** Set up appointment schedule and update URL
⏳ **Deploy:** Rebuild and upload to S3 + CloudFront

**Your resume now has a clear call-to-action for visitors to connect with you!**
