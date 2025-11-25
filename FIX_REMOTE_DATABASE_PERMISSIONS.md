# Fix PostgreSQL Permissions on Remote Linux Server

## Problem
You're getting `permission denied for schema public` when running Prisma migrations. The database is on a remote Linux server.

## Solution: Fix Permissions on Remote Server

### Step 1: Connect to Your Remote Linux Server

```bash
ssh your_username@your_server_ip
```

### Step 2: Connect to PostgreSQL on the Server

Once connected to the server, connect to PostgreSQL:

```bash
# Option 1: If you know the postgres user password
psql -U postgres -d car_wash

# Option 2: If you need to use sudo
sudo -u postgres psql -d car_wash

# Option 3: If you have a specific database user
psql -U your_db_user -d car_wash
```

### Step 3: Grant Permissions

Once in the PostgreSQL prompt, run these commands:

```sql
-- Replace 'your_db_user' with the actual username from your DATABASE_URL
-- If your DATABASE_URL is: postgresql://username:password@server:5432/car_wash
-- Then 'username' is your database user

-- Grant all privileges on the public schema
GRANT ALL PRIVILEGES ON SCHEMA public TO your_db_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_db_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_db_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO your_db_user;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO your_db_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO your_db_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO your_db_user;

-- Verify the user exists and has permissions
\du your_db_user

-- Exit psql
\q
```

### Step 4: Verify Your DATABASE_URL

Make sure your local `.env` file has the correct remote database connection:

```env
DATABASE_URL="postgresql://username:password@your_server_ip:5432/car_wash?schema=public"
```

**Important points:**
- Replace `your_server_ip` with your actual server IP or domain
- Replace `username` with your database username
- Replace `password` with your database password
- Make sure PostgreSQL port (5432) is open in your server firewall

### Step 5: Test Connection from Local Machine

From your local Windows machine, test the connection:

```bash
# Test if you can connect (you'll need psql installed locally or use a tool like pgAdmin)
psql "postgresql://username:password@your_server_ip:5432/car_wash"
```

### Step 6: Run Prisma Migrations

Once permissions are fixed, run from your local machine:

```bash
npx prisma migrate deploy
```

---

## Alternative: One-Line Fix via SSH

If you want to fix it in one command from your local machine:

```bash
ssh your_username@your_server_ip "sudo -u postgres psql -d car_wash -c \"GRANT ALL PRIVILEGES ON SCHEMA public TO your_db_user; GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_db_user; GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_db_user; ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO your_db_user; ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO your_db_user;\""
```

---

## Common Issues

### Issue: Can't connect to remote database
- **Check firewall:** Make sure port 5432 is open
  ```bash
  # On server, check if PostgreSQL is listening
  sudo netstat -tlnp | grep 5432
  
  # Or check firewall
  sudo ufw status
  sudo ufw allow 5432/tcp
  ```

- **Check PostgreSQL config:** Edit `postgresql.conf` and `pg_hba.conf`
  ```bash
  # Usually located at:
  # /etc/postgresql/[version]/main/postgresql.conf
  # /etc/postgresql/[version]/main/pg_hba.conf
  ```

### Issue: PostgreSQL not allowing remote connections

Edit `/etc/postgresql/[version]/main/postgresql.conf`:
```conf
listen_addresses = '*'  # or specific IP
```

Edit `/etc/postgresql/[version]/main/pg_hba.conf`:
```conf
# Allow remote connections
host    all             all             0.0.0.0/0               md5
# Or for specific IP
host    all             all             your_client_ip/32        md5
```

Then restart PostgreSQL:
```bash
sudo systemctl restart postgresql
```

### Issue: User doesn't exist

Create the user on the server:
```sql
CREATE USER your_db_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE car_wash TO your_db_user;
```

### Issue: Database doesn't exist

Create the database on the server:
```sql
CREATE DATABASE car_wash;
```

---

## Security Best Practices

1. **Use strong passwords** for database users
2. **Limit remote access** to specific IPs in `pg_hba.conf`
3. **Use SSL connections** for remote databases:
   ```env
   DATABASE_URL="postgresql://user:pass@server:5432/db?sslmode=require"
   ```
4. **Don't commit `.env`** files to version control
5. **Use environment-specific users** with minimal required permissions

---

## Quick Reference Commands

```bash
# Connect to server
ssh user@server_ip

# Connect to PostgreSQL
sudo -u postgres psql -d car_wash

# Grant permissions (inside psql)
GRANT ALL PRIVILEGES ON SCHEMA public TO username;

# Check user permissions
\du username

# List databases
\l

# List schemas
\dn

# Exit psql
\q
```

---

**Note:** Replace all placeholders (`your_db_user`, `your_server_ip`, etc.) with your actual values.

