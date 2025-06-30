# Firebase Authentication with Next.js

A modern web application built with Next.js and Firebase that provides user authentication with email/password and Google OAuth.

## Features

- 🔐 **Email/Password Authentication** - Secure user registration and login
- 🌐 **Google OAuth Integration** - One-click sign-in with Google
- 🛡️ **Protected Routes** - Secure pages that require authentication
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- ⚡ **Real-time Auth State** - Instant updates when user signs in/out
- 🎨 **Modern UI** - Clean interface built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project with Authentication enabled

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd firebaseauth
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication and configure Email/Password and Google providers
   - Copy your Firebase config to `src/lib/firebase.ts`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Protected dashboard page
│   ├── login/             # Login page
│   ├── signup/            # Registration page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with auth provider
│   └── page.tsx           # Home page with route logic
├── components/            # Reusable React components
│   └── ProtectedRoute.tsx # Route protection wrapper
├── context/               # React Context providers
│   └── AuthContext.tsx    # Authentication context
└── lib/                   # Utility functions and configs
    └── firebase.ts        # Firebase configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Authentication Flow

1. **Registration**: New users can create accounts with email/password or Google
2. **Login**: Existing users sign in with their credentials
3. **Route Protection**: Unauthenticated users are redirected to login
4. **Dashboard**: Authenticated users access their personalized dashboard
5. **Logout**: Users can securely sign out from any page

## Firebase Configuration

The app uses the following Firebase services:
- **Authentication**: For user management
- **Google OAuth**: For social login integration

Make sure to enable these services in your Firebase console and update the configuration in `src/lib/firebase.ts`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
