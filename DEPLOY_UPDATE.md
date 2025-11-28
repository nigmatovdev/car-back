# Quick Deployment Guide - User Fields Update

## Step-by-Step Deployment Instructions

### 1. Connect to Your Server
```bash
ssh root@170.64.168.79
# Or use your preferred SSH method
```

### 2. Navigate to Application Directory
```bash
cd /root/apps/car-wash-backend
```

### 3. Pull Latest Code (if using Git)
```bash
# If you're using Git
git pull origin main
# Or if you're on a different branch
git pull origin <your-branch>
```

**OR** if you're transferring files manually:
```bash
# From your local machine, use SCP or SFTP to transfer files
# Example with SCP:
scp -r src prisma package.json root@170.64.168.79:/root/apps/car-wash-backend/
```

### 4. Install Dependencies (if package.json changed)
```bash
npm install
```

### 5. Generate Prisma Client
```bash
npx prisma generate
```

### 6. Run Database Migration
```bash
# This will add the new user fields to the database
npx prisma migrate deploy
```

**Note:** If you get permission errors, you might need to run:
```bash
# Make sure you're using the correct database user
export PGPASSWORD="your_postgres_password"
npx prisma migrate deploy
```

### 7. Build the Application
```bash
npm run build
```

### 8. Restart PM2 Application
```bash
pm2 restart car-wash-api
```

### 9. Check Application Status
```bash
# Check if app is running
pm2 status

# Check logs for any errors
pm2 logs car-wash-api --lines 50

# Check if app is responding
curl http://localhost:3000/api
```

### 10. Verify Database Changes
```bash
# Connect to PostgreSQL and verify columns exist
psql -U postgres -d car_wash -c "\d users"
```

You should see the new columns: `firstName`, `lastName`, `phone`, `avatar`, `address`, `isActive`

## Quick One-Liner (if using Git)

If you're using Git and everything is set up, you can run:

```bash
cd /root/apps/car-wash-backend && \
git pull && \
npm install && \
npx prisma generate && \
npx prisma migrate deploy && \
npm run build && \
pm2 restart car-wash-api && \
pm2 logs car-wash-api --lines 20
```

## Troubleshooting

### Migration Fails with Permission Error
```bash
# Grant permissions to postgres user
psql -U postgres -d car_wash -c "GRANT ALL PRIVILEGES ON SCHEMA public TO postgres;"
psql -U postgres -d car_wash -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;"
```

### PM2 App Won't Start
```bash
# Check detailed logs
pm2 logs car-wash-api --err --lines 100

# Delete and restart
pm2 delete car-wash-api
pm2 start npm --name "car-wash-api" -- run start:prod
pm2 save
```

### Database Connection Issues
```bash
# Check .env file has correct DATABASE_URL
cat .env | grep DATABASE_URL

# Test database connection
psql $DATABASE_URL -c "SELECT 1;"
```

## Verification Checklist

After deployment, verify:

- [ ] PM2 shows app as "online"
- [ ] No errors in `pm2 logs car-wash-api`
- [ ] API responds: `curl http://localhost:3000/api`
- [ ] Database has new columns: `psql -U postgres -d car_wash -c "\d users"`
- [ ] Swagger UI loads: `http://170.64.168.79/api`
- [ ] Can register user with new fields
- [ ] Can update user profile with new fields

## Rollback (if needed)

If something goes wrong:

```bash
# 1. Stop the app
pm2 stop car-wash-api

# 2. Revert code (if using Git)
git reset --hard HEAD~1

# 3. Rebuild
npm run build

# 4. Restart
pm2 restart car-wash-api
```

**Note:** Database migration rollback requires manual SQL or restoring from backup.

