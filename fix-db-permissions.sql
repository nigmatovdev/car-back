-- Fix PostgreSQL Permissions for Prisma Migrations
-- Run this script as a PostgreSQL superuser (usually 'postgres')

-- Connect to your database first:
-- psql -U postgres -d carwash

-- Grant necessary permissions to your database user
-- Replace 'your_username' with your actual database username from DATABASE_URL

-- Option 1: Grant all privileges on the public schema
GRANT ALL PRIVILEGES ON SCHEMA public TO your_username;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_username;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_username;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO your_username;

-- Option 2: Make the user the owner of the public schema (if you have superuser access)
-- ALTER SCHEMA public OWNER TO your_username;

-- Option 3: Grant CREATE privilege (minimum required for migrations)
-- GRANT CREATE ON SCHEMA public TO your_username;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO your_username;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO your_username;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO your_username;

