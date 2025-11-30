#!/bin/bash

echo "🔍 Step 1: Verifying current database schema..."
sudo -u postgres psql -d car_wash -c "\d users" | grep -E "(firstName|lastName|phone|avatar|address|isActive)"

if [ $? -eq 0 ]; then
    echo "✅ Columns already exist!"
    echo "🔄 Regenerating Prisma Client and restarting..."
    cd /root/apps/car-wash-backend
    npx prisma generate
    pm2 restart car-wash-api
    echo "✅ Done! Check logs: pm2 logs car-wash-api --lines 30"
    exit 0
fi

echo "❌ Columns don't exist. Running migration..."

echo "🔧 Step 2: Adding columns to users table..."
sudo -u postgres psql -d car_wash << 'EOF'
ALTER TABLE "users" 
ADD COLUMN IF NOT EXISTS "firstName" TEXT,
ADD COLUMN IF NOT EXISTS "lastName" TEXT,
ADD COLUMN IF NOT EXISTS "phone" TEXT,
ADD COLUMN IF NOT EXISTS "avatar" TEXT,
ADD COLUMN IF NOT EXISTS "address" TEXT,
ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT true;

UPDATE "users" SET "isActive" = true WHERE "isActive" IS NULL;

-- Verify
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name IN ('firstName', 'lastName', 'phone', 'avatar', 'address', 'isActive');
EOF

if [ $? -eq 0 ]; then
    echo "✅ Migration successful!"
    echo "🔄 Step 3: Regenerating Prisma Client..."
    cd /root/apps/car-wash-backend
    npx prisma generate
    echo "🔄 Step 4: Restarting PM2..."
    pm2 restart car-wash-api
    echo "✅ Done! Check logs: pm2 logs car-wash-api --lines 30"
else
    echo "❌ Migration failed!"
    exit 1
fi

