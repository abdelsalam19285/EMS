# EgyptianMindset E-Learning Platform Documentation

## Overview

EgyptianMindset is a comprehensive e-learning platform built to provide educational content in various fields including data, management, personal development, quality, TPM, and industrial courses. The platform features user authentication, course management, Google Drive integration for storage, YouTube video embedding for course content, and Session app integration for group discussions.

## Features

### Authentication System
- User registration and login
- Profile management
- Role-based access control (admin/user)

### Course Display System
- Course listing with category filtering
- Detailed course pages
- Search functionality

### Content Management
- Google Drive integration for course materials
- YouTube video embedding with progress tracking
- Session app integration for group discussions

### Admin Panel
- Course management
- User management
- Platform statistics

## Technical Implementation

### Frontend
- Next.js 15.1.4
- React 19.1.0
- Tailwind CSS for styling
- Responsive design for mobile and desktop

### Authentication
- NextAuth.js for authentication
- JWT for session management
- Role-based access control

### Storage
- Google Drive API for file storage and retrieval
- Secure access controls

### Video Integration
- YouTube iframe API
- Video progress tracking
- Playlist functionality

### Collaboration
- Session app integration for secure group chats
- Invitation system for course participants

## Deployment

The application is configured for deployment on Vercel, which provides optimal support for Next.js applications. See the deployment-guide.md file for detailed instructions on how to deploy the platform.

## Project Structure

```
egyptianmindset/
├── src/
│   ├── app/                  # Next.js pages
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # Authentication API
│   │   │   └── google-drive/ # Google Drive API
│   │   ├── courses/          # Course pages
│   │   ├── login/            # Login page
│   │   ├── register/         # Registration page
│   │   ├── dashboard/        # User dashboard
│   │   └── admin/            # Admin dashboard
│   ├── components/           # Reusable components
│   │   ├── Header.tsx        # Navigation header
│   │   ├── YouTubePlayer.jsx # YouTube video player
│   │   ├── YouTubePlaylist.jsx # Video playlist
│   │   ├── SessionGroupChat.jsx # Session app integration
│   │   └── ...
│   └── lib/                  # Utility functions
│       ├── auth-context.tsx  # Authentication context
│       ├── google-drive.js   # Google Drive utilities
│       └── ...
├── public/                   # Static assets
├── next.config.ts            # Next.js configuration
└── vercel.json               # Vercel deployment configuration
```

## Google Drive Integration

The platform integrates with Google Drive for storing and retrieving course materials. The integration includes:

1. File listing and browsing
2. File uploads and downloads
3. Secure access controls
4. Folder management

To use this feature, you'll need to set up a Google Cloud project and configure the Google Drive API credentials as described in the deployment guide.

## YouTube Video Integration

Course videos are hosted on YouTube and embedded in the platform with additional features:

1. Video player with custom controls
2. Progress tracking
3. Playlist functionality
4. Course-specific video organization

## Session App Integration

The platform integrates with Session app for secure group discussions:

1. Course-specific group chats
2. Secure, encrypted communication
3. Anonymous participation
4. No phone number or email required for Session app

## Getting Started

1. Deploy the application using the instructions in deployment-guide.md
2. Set up the required environment variables
3. Create an admin account
4. Add courses and course materials
5. Invite users to register and participate

## Customization

The platform can be customized in several ways:

1. Update the branding in the Header component
2. Modify the color scheme in the Tailwind configuration
3. Add or remove course categories
4. Extend the admin functionality as needed

## Future Enhancements

Potential future enhancements could include:

1. Quiz and assessment functionality
2. Certificate generation
3. Payment integration for premium courses
4. Analytics dashboard for course performance
5. Mobile app version

## Support

For any issues or questions, refer to the deployment guide or contact the developer.
