#!/bin/bash

# Leadership JOYCEP Training College Setup Script
echo "🎓 Setting up Leadership JOYCEP Training College Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js $(node --version) detected"
echo "✅ npm $(npm --version) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo "✅ .env file created from template"
    echo "🔧 Please update the .env file with your configuration:"
    echo "   - DATABASE_URL: Your PostgreSQL connection string"
    echo "   - JWT_SECRET: A secure random string for JWT tokens"
    echo "   - SESSION_SECRET: A secure random string for sessions"
else
    echo "✅ .env file already exists"
fi

# Check if database is configured
if grep -q "your_postgresql_connection_string_here" .env; then
    echo "⚠️  Database URL not configured in .env file"
    echo "🔧 Please update DATABASE_URL in .env file before running the application"
else
    echo "✅ Database URL configured"
    
    # Try to push database schema
    echo "🗄️  Setting up database schema..."
    if npm run db:push; then
        echo "✅ Database schema setup complete"
    else
        echo "⚠️  Database schema setup failed. Please check your DATABASE_URL"
    fi
fi

# Create logs directory if it doesn't exist
mkdir -p logs

# Create uploads directory if it doesn't exist
mkdir -p uploads

echo ""
echo "🚀 Setup complete! Next steps:"
echo "1. Update your .env file with the correct database credentials"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:5000 to see your application"
echo "4. Access admin panel at http://localhost:5000/admin/login"
echo "   Default credentials: admin / admin123"
echo ""
echo "📚 For more information, see README.md"