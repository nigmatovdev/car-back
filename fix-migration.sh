#!/bin/bash

# Fix Migration - Add User Fields
# This script will add the new user fields to the database

echo "🔧 Fixing database migration..."

# Get database connection details from .env
if [ -f .env ]; then
    source .env
    DB_URL="${DATABASE_URL}"
else
    echo "❌ .env file not found!"
    exit 1
fi

# Extract database name, user, and password from DATABASE_URL
# Format: postgresql://user:password@host:port/database

# Try to connect and run migration
echo "📦 Running migration..."

# Option 1: Use Prisma migrate (preferred)
if command -v npx &> /dev/null; then
    echo "Using Prisma migrate..."
    npx prisma migrate deploy
    if [ $? -eq 0 ]; then
        echo "✅ Migration successful!"
        exit 0
    fi
fi

# Option 2: Manual SQL migration
echo "Using manual SQL migration..."

# Extract connection details
DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')
DB_USER=$(echo $DATABASE_URL | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
DB_PASS=$(echo $DATABASE_URL | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')
DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p' || echo "5432")

echo "Connecting to database: $DB_NAME on $DB_HOST:$DB_PORT as $DB_USER"

# Run SQL migration
PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" << EOF
-- Add new columns to users table
ALTER TABLE "users" 
ADD COLUMN IF NOT EXISTS "firstName" TEXT,
ADD COLUMN IF NOT EXISTS "lastName" TEXT,
ADD COLUMN IF NOT EXISTS "phone" TEXT,
ADD COLUMN IF NOT EXISTS "avatar" TEXT,
ADD COLUMN IF NOT EXISTS "address" TEXT,
ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT true;

-- Update existing users to have isActive = true
UPDATE "users" SET "isActive" = true WHERE "isActive" IS NULL;

-- Verify columns were added
\d users
EOF

if [ $? -eq 0 ]; then
    echo "✅ Migration successful!"
else
    echo "❌ Migration failed!"
    exit 1
fi

