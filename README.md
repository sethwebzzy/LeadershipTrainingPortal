# Leadership JOYCEP Training College Website

A comprehensive web platform for Leadership JOYCEP Training College in Kitengela, Kenya. This system provides a public-facing website for course information and student registration, plus a complete admin dashboard for managing all college operations.

## Features

### Public Website
- Course information and registration (HIV counselling, ECDE, Kenya Sign Language, etc.)
- Services showcase (psychological counselling, therapy, testing)
- Contact forms and inquiry management
- MPESA payment integration (Paybill: 544069, Account: 831298)
- Mobile-responsive design

### Admin Dashboard
- Student management and admissions tracking
- Course and service management
- Payment processing and tracking
- Message and inquiry management
- User authentication and security
- Export functionality for reports

## Technology Stack

- **Frontend**: React 18 with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Node.js with Express.js and TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT-based authentication system
- **Build Tool**: Vite for fast development and optimized builds
- **Deployment**: Optimized for Replit and serverless deployment

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (or use Replit's built-in PostgreSQL)
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd joycep-college-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` (or create `.env` from the template)
   - Update the following required variables:
     ```bash
     DATABASE_URL=your_postgresql_connection_string
     JWT_SECRET=your_secure_jwt_secret_key
     SESSION_SECRET=your_secure_session_secret
     ```

4. **Set up the database**
   ```bash
   # Push the database schema
   npm run db:push
   
   # Optional: Open Drizzle Studio to view/manage database
   npm run db:studio
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## Environment Configuration

### Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database (Required)
DATABASE_URL=postgresql://username:password@localhost:5432/joycep_college

# Authentication (Required)
JWT_SECRET=your-super-secure-jwt-secret-key-here
SESSION_SECRET=your-super-secure-session-secret-here

# Application
NODE_ENV=development
PORT=5000
```

### Optional Environment Variables

```bash
# MPESA Integration
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_PAYBILL=544069
MPESA_ACCOUNT=831298

# Email Notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# WhatsApp Integration
WHATSAPP_API_KEY=your_whatsapp_api_key
WHATSAPP_PHONE_NUMBER=your_business_number
```

## Development Commands

```bash
# Start development server (frontend + backend)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database commands
npm run db:push          # Push schema changes to database
npm run db:studio        # Open Drizzle Studio
npm run db:generate      # Generate migration files

# Code quality
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript checks
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts (auth, etc.)
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions and configs
│   └── index.html         # HTML template
├── server/                 # Express backend
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API routes
│   ├── db.ts              # Database connection
│   └── storage.ts         # Data access layer
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema and types
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## Admin Access

### Default Credentials
- **Username**: `admin`
- **Password**: `admin123`

**Important**: Change these credentials in production by updating the database or environment variables.

### Admin Features
- **Dashboard**: Overview of students, courses, and activities
- **Students**: View, manage, and track student registrations
- **Admissions**: Process and approve student applications
- **Courses**: Manage course offerings and details
- **Services**: Manage health and wellness services
- **Messages**: View and respond to contact inquiries
- **Payments**: Track and manage student payments
- **Settings**: System configuration and preferences

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create new student registration
- `PUT /api/students/:id` - Update student information
- `DELETE /api/students/:id` - Delete student record

### Contacts
- `GET /api/contacts` - Get all contact messages
- `POST /api/contacts` - Submit contact form
- `DELETE /api/contacts/:id` - Delete contact message

### Courses & Services
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

## Database Schema

### Tables
- **users**: Admin user accounts
- **students**: Student registration records
- **contacts**: Contact form submissions
- **courses**: Course information (future enhancement)
- **services**: Service offerings (future enhancement)

### Relationships
- Students can have multiple course enrollments
- Contact messages link to inquiry types
- Users have role-based permissions

## Deployment

### Replit Deployment
1. Ensure all environment variables are set in Replit Secrets
2. Database should be automatically configured if using Replit PostgreSQL
3. Run `npm run build` to build the application
4. The app will be available at your Replit URL

### Manual Deployment
1. Set up a PostgreSQL database
2. Configure environment variables on your hosting platform
3. Run `npm run build` to create production builds
4. Start the server with `npm start`
5. Ensure the database schema is up to date with `npm run db:push`

## Payment Integration

The system is configured for MPESA payments:
- **Paybill Number**: 544069
- **Account Number**: 831298

Students receive these details after course registration for payment processing.

## Security Features

- JWT-based authentication
- Password hashing for admin accounts
- Input validation and sanitization
- CORS configuration
- Environment variable protection
- SQL injection prevention via ORM

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check `DATABASE_URL` in `.env`
   - Ensure PostgreSQL is running
   - Verify database credentials

2. **Authentication Not Working**
   - Verify `JWT_SECRET` is set
   - Check admin credentials
   - Clear browser localStorage

3. **Build Errors**
   - Run `npm install` to ensure dependencies
   - Check for TypeScript errors
   - Verify environment variables

4. **Development Server Issues**
   - Check if port 5000 is available
   - Restart the development server
   - Clear browser cache

### Getting Help

For technical support or questions:
1. Check the console logs for error messages
2. Verify all environment variables are correctly set
3. Ensure the database schema is up to date
4. Check the network tab in browser dev tools for API errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is developed for Leadership JOYCEP Training College. All rights reserved.

---

For more information about Leadership JOYCEP Training College, visit our website or contact us directly.