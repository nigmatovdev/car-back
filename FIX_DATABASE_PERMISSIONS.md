# Fix PostgreSQL Permission Error

## Problem
```
Error: ERROR: permission denied for schema public
```

This error occurs when your PostgreSQL database user doesn't have the necessary permissions to create or modify objects in the `public` schema.

## Solutions

### Solution 1: Grant Permissions (Recommended)

1. **Connect to PostgreSQL as superuser:**
   ```bash
   psql -U postgres -d carwash
   ```
   Or if you're on Windows:
   ```powershell
   psql -U postgres -d carwash
   ```

2. **Find your database username** from your `DATABASE_URL`:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/carwash?schema=public"
   ```
   The username is the part after `postgresql://` and before `:`

3. **Run these SQL commands** (replace `your_username` with your actual username):
   ```sql
   -- Grant all privileges on the public schema
   GRANT ALL PRIVILEGES ON SCHEMA public TO your_username;
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_username;
   GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_username;
   GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO your_username;
   
   -- Set default privileges for future objects
   ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO your_username;
   ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO your_username;
   ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO your_username;
   ```

4. **Exit psql:**
   ```sql
   \q
   ```

5. **Try Prisma commands again:**
   ```bash
   npx prisma migrate deploy
   ```

---

### Solution 2: Use Superuser Account for Migrations

If you can't modify permissions, temporarily use the `postgres` superuser for migrations:

1. **Update your `.env` file** temporarily:
   ```env
   DATABASE_URL="postgresql://postgres:your_postgres_password@localhost:5432/carwash?schema=public"
   ```

2. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

3. **Switch back to your regular user** after migrations are complete.

---

### Solution 3: Create Schema if Missing

If the schema doesn't exist:

1. **Connect as superuser:**
   ```bash
   psql -U postgres -d carwash
   ```

2. **Create the schema:**
   ```sql
   CREATE SCHEMA IF NOT EXISTS public;
   GRANT ALL ON SCHEMA public TO your_username;
   ```

---

### Solution 4: Quick Fix Script

You can also use the provided SQL script:

1. **Edit `fix-db-permissions.sql`** and replace `your_username` with your actual username

2. **Run the script:**
   ```bash
   psql -U postgres -d carwash -f fix-db-permissions.sql
   ```

---

## Verify Permissions

After granting permissions, verify they work:

```sql
-- Connect to your database
psql -U your_username -d carwash

-- Check schema permissions
\dn+ public

-- Try creating a test table
CREATE TABLE test_permissions (id SERIAL PRIMARY KEY);
DROP TABLE test_permissions;
```

---

## Common Issues

### Issue: "role does not exist"
- Make sure the username in your `DATABASE_URL` matches an existing PostgreSQL user
- Create the user if needed: `CREATE USER your_username WITH PASSWORD 'your_password';`

### Issue: "database does not exist"
- Create the database: `CREATE DATABASE carwash;`
- Or use an existing database name in your `DATABASE_URL`

### Issue: Still getting permission errors
- Make sure you're running the GRANT commands as a superuser (usually `postgres`)
- Check if the user has been granted permissions: `\du your_username`

---

## Prevention

For future projects, when creating a new database user, grant permissions immediately:

```sql
-- Create user
CREATE USER app_user WITH PASSWORD 'secure_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE carwash TO app_user;
\c carwash
GRANT ALL PRIVILEGES ON SCHEMA public TO app_user;
```

---

## Need Help?

If you're still having issues:
1. Check your `DATABASE_URL` format is correct
2. Verify PostgreSQL is running: `pg_isready`
3. Check PostgreSQL logs for more details
4. Ensure you're using the correct database name and username

