# Leadership JOYCEP Training College Website

## Overview

This is a full-stack web application for Leadership JOYCEP Training College, a health and wellness education institution in Kitengela, Kenya. The website serves as a comprehensive platform for course registration, service information, and student management, featuring monthly intake programs and multiple educational offerings.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state and React hooks for local state
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript throughout the entire stack
- **API Design**: RESTful API with JSON responses
- **Middleware**: Custom logging and error handling middleware
- **Development**: Hot reloading with Vite integration

### Database and ORM
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Validation**: Zod for runtime type validation and schema generation

## Key Components

### Core Pages
1. **Home Page**: Hero section with call-to-action for monthly intakes
2. **Courses Section**: Detailed course listings (HIV counselling, ECDE, etc.)
3. **Services Section**: Health and wellness services offered
4. **Admissions Section**: Registration process and payment information
5. **About Section**: College information and mission
6. **Contact Section**: Contact details and inquiry form

### Forms and Data Collection
- **Student Registration Form**: Course enrollment with validation
- **Contact Form**: General inquiries and support requests
- **Payment Integration**: MPESA payment instructions (Paybill: 544069)

### UI Components
- Responsive design with mobile-first approach
- Accessible form components with proper validation
- Toast notifications for user feedback
- Loading states and error handling
- Custom college branding with green color scheme

## Data Flow

### Student Registration Flow
1. User selects course from dropdown menu
2. Form validation using Zod schemas
3. Data submitted to `/api/students` endpoint
4. Database insertion with Drizzle ORM
5. Success notification and form reset

### Contact Form Flow
1. User fills contact form with subject categories
2. Client-side validation before submission
3. Data sent to `/api/contacts` endpoint
4. Database storage and confirmation response
5. User feedback through toast notifications

### Data Retrieval
- Admin endpoints for viewing all students and contacts
- Real-time query invalidation using TanStack Query
- Type-safe data fetching with automatic error handling

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-***: Accessible UI primitives
- **react-hook-form**: Form handling and validation
- **wouter**: Lightweight routing solution

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first CSS framework
- **Drizzle Kit**: Database schema management
- **ESBuild**: Production build optimization

### UI and Styling
- **shadcn/ui**: Pre-built component library
- **Tailwind CSS**: Responsive design system
- **Lucide React**: Icon library
- **class-variance-authority**: Component variant management

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Schema pushed using Drizzle Kit
4. **Environment**: Production environment variables required

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment mode (development/production)
- Build outputs optimized for serverless deployment

### Development Workflow
- Hot reloading in development mode
- Automatic TypeScript checking
- Database schema synchronization
- Error overlay for debugging

### Production Considerations
- Static asset serving from `dist/public`
- API routes under `/api` prefix
- Database connection pooling with Neon
- Error handling and logging middleware
- CORS and security headers (to be configured)

## Database Schema

### Tables
- **users**: Admin user management
- **students**: Course registration records
- **contacts**: Contact form submissions

### Data Validation
- Zod schemas for runtime validation
- TypeScript types generated from database schema
- Form validation with error messages
- Server-side validation for all endpoints