# Deployment Guide - Ubuntu Server

This guide will help you deploy the Car Wash Management System backend to an Ubuntu server.

## Prerequisites

- Ubuntu 20.04 LTS or later
- Root or sudo access
- Domain name (optional, for production)
- SSL certificate (for HTTPS)

## Step 1: Server Setup

### 1.1 Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Node.js (v20.x)

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 1.3 Install PostgreSQL

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE carwash;
CREATE USER carwash_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE carwash TO carwash_user;
\q
```

### 1.4 Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### 1.5 Install Nginx (Reverse Proxy)

```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Step 2: Application Deployment

### 2.1 Create Application User

```bash
# Create a non-root user for the application
sudo adduser --disabled-password --gecos "" carwash
sudo usermod -aG sudo carwash
```

### 2.2 Clone Repository

```bash
# Switch to application user
sudo su - carwash

# Clone your repository
cd ~
git clone <your-repository-url> car-wash-backend
cd car-wash-backend
```

### 2.3 Install Dependencies

```bash
npm install --production
```

### 2.4 Environment Configuration

```bash
# Create .env file
nano .env
```

Add the following configuration:

```env
# Database
DATABASE_URL="postgresql://carwash_user:your_secure_password@localhost:5432/carwash?schema=public"

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
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Payment Demo Mode
DEMO_MODE=false

# Logging
LOG_LEVEL=info
```

**Important:** Generate secure secrets:
```bash
# Generate secure JWT secrets
openssl rand -base64 32
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
pm2 startup
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

### 4.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/car-wash-api
```

Add the following configuration:

```nginx
# HTTP to HTTPS redirect
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Client body size (for file uploads if needed)
    client_max_body_size 10M;

    # API endpoints
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

    # WebSocket support for location tracking
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

    # Swagger documentation (optional - restrict in production)
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

### 4.2 Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/car-wash-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Step 5: SSL Certificate (Let's Encrypt)

### 5.1 Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 5.2 Obtain SSL Certificate

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts. Certbot will automatically configure Nginx.

### 5.3 Auto-renewal

Certbot sets up auto-renewal automatically. Test it:

```bash
sudo certbot renew --dry-run
```

## Step 6: Firewall Configuration

### 6.1 Configure UFW

```bash
# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable
sudo ufw status
```

## Step 7: Monitoring and Maintenance

### 7.1 Set Up Log Rotation

```bash
sudo nano /etc/logrotate.d/car-wash-api
```

Add:

```
/home/carwash/car-wash-backend/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0644 carwash carwash
    sharedscripts
    postrotate
        pm2 reloadLogs
    endscript
}
```

### 7.2 Health Check Script

Create a health check script:

```bash
nano ~/health-check.sh
```

```bash
#!/bin/bash
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
if [ $response != "200" ]; then
    pm2 restart car-wash-api
    echo "$(date): Health check failed, restarted application" >> ~/health-check.log
fi
```

Make it executable:

```bash
chmod +x ~/health-check.sh
```

Add to crontab (check every 5 minutes):

```bash
crontab -e
```

Add:

```
*/5 * * * * /home/carwash/health-check.sh
```

## Step 8: Database Backups

### 8.1 Create Backup Script

```bash
nano ~/backup-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/home/carwash/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup database
pg_dump -U carwash_user -d carwash > $BACKUP_DIR/carwash_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "carwash_*.sql" -mtime +7 -delete

echo "$(date): Database backup completed" >> ~/backup.log
```

Make executable:

```bash
chmod +x ~/backup-db.sh
```

Add to crontab (daily at 2 AM):

```bash
0 2 * * * /home/carwash/backup-db.sh
```

## Step 9: Post-Deployment Checklist

- [ ] Application is running (check `pm2 status`)
- [ ] Nginx is running (`sudo systemctl status nginx`)
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
tail -f logs/combined.log
tail -f logs/error.log

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Common Issues

1. **Application won't start:**
   - Check environment variables
   - Verify database connection
   - Check logs for errors

2. **502 Bad Gateway:**
   - Ensure application is running: `pm2 status`
   - Check Nginx configuration: `sudo nginx -t`
   - Verify port 3000 is accessible

3. **WebSocket not working:**
   - Check Nginx WebSocket configuration
   - Verify proxy headers are set correctly
   - Check firewall rules

4. **Database connection errors:**
   - Verify PostgreSQL is running: `sudo systemctl status postgresql`
   - Check database credentials in `.env`
   - Verify user permissions

## Step 11: Updates and Maintenance

### Update Application

```bash
cd ~/car-wash-backend
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
   sudo apt update && sudo apt upgrade -y
   ```

2. **Use strong passwords:**
   - Database passwords
   - JWT secrets
   - System user passwords

3. **Restrict SSH access:**
   - Use SSH keys instead of passwords
   - Disable root login
   - Change default SSH port (optional)

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

## Support

For issues or questions:
- Check application logs
- Review Nginx error logs
- Check PM2 status
- Review this deployment guide

---

**Last Updated:** November 2025
**Version:** 1.0

