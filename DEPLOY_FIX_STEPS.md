# Quick Fix Steps for car.cityn.uz Deployment

## Step 1: Fix Nginx Configuration (HTTP Only First)

Run these commands on your server:

```bash
# Remove the broken symlink
rm /etc/nginx/sites-enabled/car-wash-api

# Create new nginx config with correct domain
cat > /etc/nginx/sites-available/car-wash-api << 'EOF'
server {
    listen 80;
    server_name car.cityn.uz www.car.cityn.uz;

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

# Create symlink
ln -s /etc/nginx/sites-available/car-wash-api /etc/nginx/sites-enabled/

# Test nginx config
nginx -t

# If test passes, reload nginx
systemctl reload nginx
```

## Step 2: Install Certbot

```bash
apt update
apt install certbot python3-certbot-nginx -y
```

## Step 3: Get SSL Certificate

```bash
# Make sure your domain points to this server's IP first!
# Then run:
certbot --nginx -d car.cityn.uz -d www.car.cityn.uz
```

Certbot will automatically:
- Get the SSL certificate
- Update your nginx config to use HTTPS
- Set up auto-renewal

## Step 4: Verify Everything Works

```bash
# Check nginx status
systemctl status nginx

# Check PM2 status
pm2 status

# Test API (should work on HTTP first, then HTTPS after SSL)
curl http://car.cityn.uz/api
```

## Troubleshooting

### If certbot fails:
1. Make sure DNS is pointing to your server:
   ```bash
   # Check DNS
   nslookup car.cityn.uz
   ```

2. Make sure port 80 is open:
   ```bash
   ufw allow 80/tcp
   ufw allow 443/tcp
   ```

3. Make sure nginx is running:
   ```bash
   systemctl status nginx
   ```

### If API is not accessible:
1. Check if PM2 is running:
   ```bash
   pm2 status
   pm2 logs car-wash-api
   ```

2. Check if app is listening on port 3000:
   ```bash
   netstat -tlnp | grep 3000
   ```

3. Test locally:
   ```bash
   curl http://localhost:3000/api
   ```

