<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Firebase Authentication Next.js App

This is a Next.js application with Firebase authentication that includes:

## Project Structure
- Uses Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Firebase SDK for authentication
- Context API for state management

## Key Features
- Email/password authentication
- Google OAuth integration
- Protected routes
- User dashboard
- Responsive design

## Authentication Flow
- Users can sign up with email/password or Google
- Protected routes redirect unauthenticated users to login
- User state is managed through React Context
- Firebase handles authentication state persistence

## Development Guidelines
- Use TypeScript for all new files
- Follow React best practices with hooks
- Use Tailwind CSS classes for styling
- Implement proper error handling
- Ensure responsive design for mobile devices

## Firebase Configuration
- Firebase config is located in `src/lib/firebase.ts`
- Authentication context is in `src/context/AuthContext.tsx`
- Protected routes use the `ProtectedRoute` component
