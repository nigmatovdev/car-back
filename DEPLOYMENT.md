# Deployment Guide - Ubuntu Server (Root User)

This guide will help you deploy the Car Wash Management System backend to an Ubuntu server using the root user.

## Prerequisites

- Ubuntu 20.04 LTS or later
- Root access to the server
- Domain name (optional, for production)
- SSL certificate (for HTTPS)

## Step 1: Server Setup

### 1.1 Update System

```bash
apt update && apt upgrade -y
```

### 1.2 Install Node.js (v20.x)

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 1.3 Install PostgreSQL

```bash
# Install PostgreSQL
apt install postgresql postgresql-contrib -y

# Start PostgreSQL service
systemctl start postgresql
systemctl enable postgresql

# Set password for postgres user (optional but recommended)
passwd postgres

# Connect to PostgreSQL as root (using postgres system user)
sudo -u postgres psql

# In PostgreSQL prompt, create database:
CREATE DATABASE car_wash;
\q
```

**Note:** We'll use the `postgres` user for database operations. The DATABASE_URL will use `postgres` user.

### 1.4 Install PM2 (Process Manager)

```bash
npm install -g pm2
```

### 1.5 Install Nginx (Reverse Proxy)

```bash
apt install nginx -y
systemctl start nginx
systemctl enable nginx
```

## Step 2: Application Deployment

### 2.1 Clone Repository

```bash
# Navigate to root home or create app directory
cd /root
mkdir -p apps
cd apps

# Clone your repository
git clone <your-repository-url> car-wash-backend
cd car-wash-backend
```

### 2.2 Install Dependencies

```bash
npm install --production
```

### 2.3 Environment Configuration

```bash
# Create .env file
nano .env
```

Add the following configuration:

```env
# Database - Using postgres user
DATABASE_URL="postgresql://postgres:your_postgres_password@localhost:5432/car_wash?schema=public"

# JWT
JWT_SECRET="your-very-secure-secret-key-min-32-characters-long"
JWT_REFRESH_SECRET="your-very-secure-refresh-secret-key-min-32-characters-long"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV=production

# CORS
ALLOWED_ORIGINS="https://yourdomain.com,https://www.yourdomain.com"

# Stripe (if not using demo mode)
# STRIPE_SECRET_KEY=sk_live_...
# STRIPE_WEBHOOK_SECRET=whsec_...

# Payment Demo Mode
DEMO_MODE=true

# Logging
LOG_LEVEL=info
```

**Important:** Generate secure secrets:
```bash
# Generate secure JWT secrets
openssl rand -base64 32
```

**Set PostgreSQL password for postgres user:**
```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Set password
ALTER USER postgres WITH PASSWORD 'your_postgres_password';
\q
```

### 2.4 Grant Database Permissions

```bash
# Connect to PostgreSQL
sudo -u postgres psql -d car_wash

# Grant all permissions to postgres user (should already have them, but ensure it)
GRANT ALL PRIVILEGES ON SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO postgres;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;

\q
```

### 2.5 Build Application

```bash
npm run build
```

### 2.6 Run Database Migrations

```bash
npx prisma generate
npx prisma migrate deploy
```

### 2.7 Create Logs Directory

```bash
mkdir -p logs
chmod 755 logs
```

## Step 3: PM2 Configuration

### 3.1 Create PM2 Ecosystem File

```bash
nano ecosystem.config.js
```

Add the following:

```javascript
module.exports = {
  apps: [
    {
      name: 'car-wash-api',
      script: 'dist/src/main.js',
      instances: 2, // Use cluster mode for better performance
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1G',
    },
  ],
};
```

### 3.2 Start Application with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd -u root --hp /root
```

Follow the instructions to enable PM2 on system startup.

### 3.3 PM2 Useful Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs car-wash-api

# Restart application
pm2 restart car-wash-api

# Stop application
pm2 stop car-wash-api

# Monitor
pm2 monit
```

## Step 4: Nginx Configuration

### Option A: Simple IP-Only Configuration (Recommended for Quick Setup)

This configuration works with just your server's IP address - no domain needed:

```bash
# Remove old configs
rm -f /etc/nginx/sites-enabled/car-wash-api
rm -f /etc/nginx/sites-enabled/default

# Create simple IP-based config
cat > /etc/nginx/sites-available/car-wash-api << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /ws/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 86400;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Enable the config
ln -s /etc/nginx/sites-available/car-wash-api /etc/nginx/sites-enabled/

# Test and reload
nginx -t
systemctl reload nginx

# Get your server IP
echo "Your API is accessible at: http://$(curl -s ifconfig.me)/api"
```

### Option B: Domain-Based Configuration (For Production with SSL)

If you have a domain name and want SSL:

```bash
nano /etc/nginx/sites-available/car-wash-api
```

Add the following configuration (replace `yourdomain.com` with your domain):

```nginx
# HTTP to HTTPS redirect
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl;
    http2 on;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration (will be auto-configured by certbot)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /ws/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 86400;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Then enable and test:

```bash
ln -s /etc/nginx/sites-available/car-wash-api /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## Step 5: SSL Certificate (Let's Encrypt)

### 5.1 Install Certbot

```bash
apt install certbot python3-certbot-nginx -y
```

### 5.2 Obtain SSL Certificate

```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts. Certbot will automatically configure Nginx.

### 5.3 Auto-renewal

Certbot sets up auto-renewal automatically. Test it:

```bash
certbot renew --dry-run
```

## Step 6: Firewall Configuration

### 6.1 Configure UFW

```bash
# Allow SSH
ufw allow 22/tcp

# Allow HTTP and HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw enable
ufw status
```

## Step 7: Monitoring and Maintenance

### 7.1 Set Up Log Rotation

```bash
nano /etc/logrotate.d/car-wash-api
```

Add:

```
/root/apps/car-wash-backend/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0644 root root
    sharedscripts
    postrotate
        pm2 reloadLogs
    endscript
}
```

### 7.2 Health Check Script

Create a health check script:

```bash
nano /root/health-check.sh
```

```bash
#!/bin/bash
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
if [ $response != "200" ]; then
    pm2 restart car-wash-api
    echo "$(date): Health check failed, restarted application" >> /root/health-check.log
fi
```

Make it executable:

```bash
chmod +x /root/health-check.sh
```

Add to crontab (check every 5 minutes):

```bash
crontab -e
```

Add:

```
*/5 * * * * /root/health-check.sh
```

## Step 8: Database Backups

### 8.1 Create Backup Script

```bash
nano /root/backup-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/root/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup database (using postgres user)
sudo -u postgres pg_dump car_wash > $BACKUP_DIR/car_wash_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "car_wash_*.sql" -mtime +7 -delete

echo "$(date): Database backup completed" >> /root/backup.log
```

Make executable:

```bash
chmod +x /root/backup-db.sh
```

Add to crontab (daily at 2 AM):

```bash
crontab -e
```

Add:

```
0 2 * * * /root/backup-db.sh
```

## Step 9: Post-Deployment Checklist

- [ ] Application is running (check `pm2 status`)
- [ ] Nginx is running (`systemctl status nginx`)
- [ ] SSL certificate is valid
- [ ] Database migrations completed
- [ ] Environment variables configured
- [ ] Firewall configured
- [ ] Logs directory created and writable
- [ ] Health check script working
- [ ] Backup script configured
- [ ] API accessible via domain
- [ ] WebSocket connections working
- [ ] Swagger documentation accessible (if enabled)

## Step 10: Troubleshooting

### Check Application Logs

```bash
# PM2 logs
pm2 logs car-wash-api

# Application logs
tail -f /root/apps/car-wash-backend/logs/combined.log
tail -f /root/apps/car-wash-backend/logs/error.log

# Nginx logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

### Common Issues

1. **Application won't start:**
   - Check environment variables
   - Verify database connection
   - Check logs for errors

2. **502 Bad Gateway:**
   - Ensure application is running: `pm2 status`
   - Check Nginx configuration: `nginx -t`
   - Verify port 3000 is accessible

3. **WebSocket not working:**
   - Check Nginx WebSocket configuration
   - Verify proxy headers are set correctly
   - Check firewall rules

4. **Database connection errors:**
   - Verify PostgreSQL is running: `systemctl status postgresql`
   - Check database credentials in `.env`
   - Verify postgres user password is correct
   - Check database permissions

5. **Permission denied for schema public:**
   - Run the permission grant commands from Step 2.4
   - Ensure you're using the postgres user in DATABASE_URL

## Step 11: Updates and Maintenance

### Update Application

```bash
cd /root/apps/car-wash-backend
git pull origin main
npm install --production
npm run build
npx prisma generate
npx prisma migrate deploy
pm2 restart car-wash-api
```

### Update Dependencies

```bash
npm audit
npm update
npm run build
pm2 restart car-wash-api
```

## Security Recommendations

1. **Keep system updated:**
   ```bash
   apt update && apt upgrade -y
   ```

2. **Use strong passwords:**
   - Database passwords
   - JWT secrets
   - System passwords

3. **Restrict SSH access:**
   - Use SSH keys instead of passwords
   - Consider changing default SSH port (optional)

4. **Regular backups:**
   - Database backups (automated)
   - Application code backups (Git)
   - Configuration backups

5. **Monitor logs:**
   - Set up log monitoring
   - Alert on errors
   - Regular log review

6. **Rate limiting:**
   - Already configured in application
   - Consider additional Nginx rate limiting

## Performance Optimization

1. **Enable PM2 cluster mode** (already configured)
2. **Database indexing** (ensure Prisma indexes are created)
3. **Enable Nginx caching** (for static content)
4. **CDN for static assets** (if applicable)
5. **Database connection pooling** (configured in Prisma)

## Quick Reference

### Application Location
- **Path:** `/root/apps/car-wash-backend`
- **Logs:** `/root/apps/car-wash-backend/logs`
- **Environment:** `/root/apps/car-wash-backend/.env`

### Database
- **User:** `postgres`
- **Database:** `car_wash`
- **Connection:** `postgresql://postgres:password@localhost:5432/car_wash`

### Useful Commands
```bash
# Restart application
pm2 restart car-wash-api

# View logs
pm2 logs car-wash-api

# Check status
pm2 status

# Reload Nginx
systemctl reload nginx

# Check PostgreSQL
systemctl status postgresql

# Backup database
/root/backup-db.sh
```

## Support

For issues or questions:
- Check application logs
- Review Nginx error logs
- Check PM2 status
- Review this deployment guide

---

**Last Updated:** November 2025  
**Version:** 2.0 (Simplified for Root User)
