# Quick Fix: Database Migration Error

## Problem
The error shows: `column users.firstName does not exist`

This means the database migration hasn't been run yet. The code expects the new columns, but they don't exist in the database.

## Solution: Run the Migration

### Option 1: Use Prisma Migrate (Recommended)

```bash
cd /root/apps/car-wash-backend

# Generate Prisma Client first
npx prisma generate

# Run the migration
npx prisma migrate deploy
```

### Option 2: Manual SQL Migration

If Prisma migrate doesn't work, run the SQL directly:

```bash
cd /root/apps/car-wash-backend

# Connect to PostgreSQL (try different methods)
# Method 1: Using postgres system user
sudo -u postgres psql -d car_wash

# Method 2: Using connection string from .env
source .env
psql "$DATABASE_URL"
```

Then run this SQL:

```sql
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
```

Type `\q` to exit PostgreSQL.

### Option 3: Use the Fix Script

```bash
cd /root/apps/car-wash-backend
chmod +x fix-migration.sh
./fix-migration.sh
```

## After Migration

1. **Restart PM2:**
```bash
pm2 restart car-wash-api
pm2 logs car-wash-api --lines 30
```

2. **Verify it works:**
```bash
curl http://localhost:3000/api
```

## Troubleshooting PostgreSQL Connection

If you get "Peer authentication failed":

### Method 1: Use postgres system user
```bash
sudo -u postgres psql -d car_wash
```

### Method 2: Check your .env file
```bash
cat .env | grep DATABASE_URL
```

The DATABASE_URL should look like:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/car_wash"
```

### Method 3: Set password and use it
```bash
# Set PGPASSWORD environment variable
export PGPASSWORD="your_postgres_password"
psql -U postgres -d car_wash -h localhost
```

### Method 4: Modify pg_hba.conf (if needed)
```bash
# Edit PostgreSQL config
sudo nano /etc/postgresql/*/main/pg_hba.conf

# Change this line:
# local   all             postgres                                peer
# To:
# local   all             postgres                                md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

## Verify Migration Success

After running the migration, verify:

```bash
# Connect to database
sudo -u postgres psql -d car_wash

# Check columns
\d users

# You should see:
# firstName | text | 
# lastName  | text |
# phone     | text |
# avatar    | text |
# address   | text |
# isActive  | boolean | default true
```

## Quick One-Liner

If your DATABASE_URL is set correctly in .env:

```bash
cd /root/apps/car-wash-backend && \
source .env && \
PGPASSWORD=$(echo $DATABASE_URL | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p') \
psql -h localhost -U postgres -d car_wash -c "ALTER TABLE users ADD COLUMN IF NOT EXISTS \"firstName\" TEXT, ADD COLUMN IF NOT EXISTS \"lastName\" TEXT, ADD COLUMN IF NOT EXISTS \"phone\" TEXT, ADD COLUMN IF NOT EXISTS \"avatar\" TEXT, ADD COLUMN IF NOT EXISTS \"address\" TEXT, ADD COLUMN IF NOT EXISTS \"isActive\" BOOLEAN DEFAULT true;" && \
pm2 restart car-wash-api
```

