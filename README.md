# Advanced Authentication System with 2FA

A secure web application providing password reset and user authentication system with two-factor authentication.

<div style="display: flex; flex-direction: row; justify-content: center; gap: 20px; margin: 40px 0;">
  <img src="https://res.cloudinary.com/dkqu2s9gz/image/upload/v1737040650/x6fucj6hhz45mjfkxy5p.png" alt="Project Screenshot 1" width="300">
  <img src="https://res.cloudinary.com/dkqu2s9gz/image/upload/v1737040651/dbi2owasiidesjxpzfij.png" alt="Project Screenshot 2" width="420">
</div>

## 🚀 Features

### User Authentication
- Email and password login
- Two-factor authentication (2FA) support
- Session management and secure logout
- Multiple session control

### Password Reset
- Email-based password reset
- 6-digit activation code verification
- Time-limited verification codes
- Secure password update

### Account Management
- Email verification system
- Account confirmation
- Multiple session control
- Session history viewing

## 🛠️ Technologies

### Frontend
- Next.js 14
- React Hook Form
- Zod Validation
- TanStack Query
- Tailwind CSS
- Shadcn/ui
- TypeScript

### Backend
- Node.js
- Express.js
- MongoDB
- TypeScript
- JWT Authentication
- RESEND Mail

## 📂 Project Structure


### Frontend (`/next-frontend`)
````
├── app/
│   ├── (auth)/                  # Authentication related pages
│   │   ├── forgot-password/     # Password reset flow
│   │   │   ├── _forgotpassword.tsx    # Main component
│   │   │   ├── components/            # Modular components
│   │   │   ├── schemas.ts             # Validation schemas
│   │   │   └── page.tsx               # Page component
│   │   ├── reset-password/      
│   │   │   ├── _resetpassword.tsx     # Password reset form
│   │   │   └── page.tsx
│   │   ├── verify-mfa/         
│   │   │   ├── _verifymfa.tsx         # 2FA verification
│   │   │   └── components/
│   │   ├── confirm-account/    
│   │   │   └── _confirmaccount.tsx    # Email confirmation
│   │   └── page.tsx            # Login page
│   └── (main)/                 # Protected routes
│       ├── home/               # Dashboard
│       ├── settings/           # User settings
│       └── _components/        # Shared components
├── components/
│   ├── ui/                    # UI components
│   │   ├── button.tsx
│   │   ├── form.tsx
│   │   └── input.tsx
│   └── shared/               # Shared components
├── lib/
│   ├── api.ts                # API client
│   ├── axios-client.ts       # Axios configuration
│   └── utils/               # Utility functions
├── hooks/                   # Custom React hooks
│   ├── use-toast.ts
│   └── use-auth.ts
├── styles/                 # Global styles
└── types/                 # TypeScript definitions
````

### Backend (`/backend`)
````
├── src/
│   ├── modules/            # Feature modules
│   │   ├── auth/          # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   └── dtos/     # Data transfer objects
│   │   ├── mfa/          # 2FA module
│   │   │   ├── mfa.controller.ts
│   │   │   └── mfa.service.ts
│   │   └── session/      # Session management
│   ├── common/           # Shared resources
│   │   ├── interfaces/   # TypeScript interfaces
│   │   ├── validators/   # Request validation
│   │   ├── enums/       # Enumerations
│   │   ├── decorators/  # Custom decorators
│   │   └── utils/       # Helper functions
│   ├── config/          # Configuration
│   │   ├── app.config.ts
│   │   └── http.config.ts
│   ├── database/        # Database related
│   │   ├── models/      # MongoDB schemas
│   │   └── migrations/  # Database migrations
│   ├── mailers/         # Email functionality
│   │   ├── mailer.ts
│   │   └── templates/   # Email templates
│   ├── middlewares/     # Custom middlewares
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── routes/          # API routes
│   │   ├── auth.route.ts
│   │   └── index.ts
│   └── types/          # Type definitions
└── scripts/         # Utility scripts
````

This structure follows:
- Feature-based organization
- Clear separation of concerns
- Modular architecture
- Scalable folder structure
- Easy to maintain and extend
- Testing support
- Development tools integration


## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/kemalcalak/Advanced-Auth-2FA.git
```

2. Backend setup:
```bash
cd backend
npm install
```

3. Frontend setup:
```bash
cd next-frontend
npm install
```

4. Configure environment variables:

Backend `.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_uri
APP_ORIGIN=http://localhost:3000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRES_IN=30d
RESEND_API_KEY=your_resend_api_key
MAILER_SENDER=onboarding@resend.dev
```

Frontend `.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

5. Start the application:

Backend:
```bash
cd backend
npm install
npm run dev
```

Frontend:
```bash
cd next-frontend
npm install
npm run dev
```

## 🔒 Security Features

- JWT-based authentication
- Secure password hashing
- Rate limiting
- CORS protection
- XSS protection
- Time-limited verification codes
- Secure session management

## 📱 User Interface Flow

### Password Reset Flow
1. User navigates to "Forgot Password" page
2. Enters email address
3. Chooses reset method (email or activation code)
4. Enters 6-digit verification code
5. Sets new password

### Account Verification
1. User registers
2. Receives email verification link
3. Confirms account by clicking the link

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Kemal Çalak - [kemalcalak.com](https://kemalcalak.com/contact)

