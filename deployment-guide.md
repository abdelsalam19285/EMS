# EgyptianMindset Deployment Guide

This guide provides instructions for deploying your EgyptianMindset e-learning platform to Vercel, which is the recommended hosting solution for Next.js applications.

## Why Vercel?

Vercel is the ideal platform for hosting your Next.js application because:

1. It's created by the same team that built Next.js
2. It has native support for all Next.js features including API routes and authentication
3. It offers a generous free tier with unlimited personal projects
4. It provides serverless functions support (needed for your API routes)
5. It includes automatic HTTPS and a global CDN for fast loading

## Deployment Steps

### 1. Create a Vercel Account

1. Go to [vercel.com](https://vercel.com) and sign up for a free account
2. You can sign up using your GitHub, GitLab, or Bitbucket account, or with an email address

### 2. Install Git and Create a Repository

1. Install Git on your computer if you haven't already
2. Create a new repository on GitHub, GitLab, or Bitbucket
3. Push your EgyptianMindset project to the repository:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

### 3. Deploy to Vercel

1. Log in to your Vercel account
2. Click "Add New" > "Project"
3. Import your Git repository
4. Configure your project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: next build
   - Output Directory: .next
5. Click "Deploy"

Vercel will automatically build and deploy your application. Once deployed, you'll receive a URL where your EgyptianMindset platform is accessible (e.g., egyptianmindset.vercel.app).

## Environment Variables

For your application to work correctly, you'll need to set up the following environment variables in your Vercel project settings:

1. `NEXTAUTH_SECRET`: A random string used to encrypt session cookies
2. `NEXTAUTH_URL`: Your deployment URL (e.g., https://egyptianmindset.vercel.app)

## Google Drive API Setup

To use the Google Drive integration, you'll need to:

1. Create a Google Cloud project
2. Enable the Google Drive API
3. Create service account credentials
4. Add the service account credentials as environment variables in Vercel:
   - `GOOGLE_CLIENT_EMAIL`: Your service account email
   - `GOOGLE_PRIVATE_KEY`: Your service account private key

## Maintaining Your Application

1. **Updates**: Push changes to your Git repository, and Vercel will automatically redeploy
2. **Monitoring**: Use Vercel's built-in analytics to monitor performance
3. **Custom Domain**: You can add a custom domain in the Vercel project settings

## Alternative Deployment Options

If Vercel doesn't meet your needs, consider these alternatives:

1. **Netlify**: Similar to Vercel with a generous free tier
2. **Railway**: Good for full-stack applications with a database
3. **Render**: Offers free static site hosting and paid server options

## Need Help?

If you encounter any issues with deployment, refer to the [Vercel documentation](https://vercel.com/docs) or contact their support team.
