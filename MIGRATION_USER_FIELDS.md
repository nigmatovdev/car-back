# Migration: Add User Fields

## New Fields Added to User Model

- `firstName` (String?, nullable)
- `lastName` (String?, nullable)
- `phone` (String?, nullable)
- `avatar` (String?, nullable) - URL to profile picture
- `address` (String?, nullable) - User's address for service location
- `isActive` (Boolean, default: true)

## Migration Steps

### 1. Generate Prisma Client
```bash
npx prisma generate
```

### 2. Create Migration
```bash
npx prisma migrate dev --name add_user_fields
```

### 3. For Production (if deploying)
```bash
npx prisma migrate deploy
```

## SQL Migration (Manual Alternative)

If you prefer to run SQL directly:

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
```

## Notes

- All new fields are nullable to support existing users
- `isActive` defaults to `true` for all users
- Existing users will have `null` values for the new fields until they update their profile

