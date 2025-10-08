# Deployment Guide for Vercel

This guide will help you deploy your authentication app to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. A Supabase project (your credentials are already in the `.env` file)
3. Google OAuth configured in Supabase

## Step 1: Configure Google OAuth in Supabase

1. Go to your Supabase Dashboard: https://0ec90b57d6e95fcbda19832f.supabase.co
2. Navigate to **Authentication** > **Providers**
3. Enable **Google** provider
4. Add your authorized redirect URLs:
   - For local development: `http://localhost:5173/`
   - For production: `https://your-app-name.vercel.app/`
   - Make sure to add both URLs

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts and deploy to production:
   ```bash
   vercel --prod
   ```

### Option B: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Configure your project:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. Add environment variables:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

6. Click **Deploy**

## Step 3: Update OAuth Redirect URLs

After deployment, update your Google OAuth settings:

1. Go to Supabase Dashboard > Authentication > Providers > Google
2. Add your production URL to authorized redirect URLs:
   ```
   https://your-app-name.vercel.app/
   ```

## Step 4: Test Your Deployment

1. Visit your deployed app URL
2. Click "Continue with Google"
3. Sign in with your Google account
4. Verify that you're redirected back to the dashboard

## Features

Your deployed app includes:

- Google OAuth authentication
- Automatic profile creation for new users
- Profile editing with phone number (country code + number)
- Username display with first letter capitalized
- Responsive design that works on all devices
- Secure authentication powered by Supabase

## Environment Variables

Make sure these environment variables are set in Vercel:

```
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Troubleshooting

### OAuth redirect not working
- Make sure you've added the production URL to authorized redirect URLs in Supabase
- Check that the URL format matches exactly (with or without trailing slash)

### Environment variables not loading
- Vercel requires a rebuild after adding environment variables
- Go to your project settings and redeploy

### Profile not created after Google sign-in
- Check the browser console for errors
- Verify that RLS policies allow profile creation
- Check that the `user_profiles` table exists in your database

## Support

For issues with:
- **Vercel deployment**: https://vercel.com/docs
- **Supabase**: https://supabase.com/docs
- **Google OAuth**: Check Supabase provider settings
