# Troubleshooting Deployment Issues

## Current Issue: Can't Connect to car.cityn.uz

### Step 1: Fix Nginx Configuration

Run this script to fix the nginx config:

```bash
cd /root/apps/car-wash-backend
cat > /tmp/fix-nginx.sh << 'SCRIPT'
#!/bin/bash
rm -f /etc/nginx/sites-enabled/car-wash-api
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
ln -s /etc/nginx/sites-available/car-wash-api /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
SCRIPT
chmod +x /tmp/fix-nginx.sh
/tmp/fix-nginx.sh
```

### Step 2: Test Locally First

```bash
# Test if app is running on port 3000
curl http://localhost:3000/api

# Test if nginx is proxying correctly
curl http://localhost/api

# Check what nginx is listening on
netstat -tlnp | grep nginx
```

### Step 3: Check DNS Configuration

```bash
# Check if DNS is pointing to your server
nslookup car.cityn.uz

# Get your server's public IP
curl ifconfig.me
# or
hostname -I

# Compare: DNS should point to your server's public IP
```

### Step 4: Check if Port 80 is Accessible

```bash
# Check if nginx is listening on port 80
netstat -tlnp | grep :80

# Should show nginx listening on 0.0.0.0:80
```

### Step 5: Test from External Network

If DNS is correct, test from your local machine:

```bash
# From your local computer (not server)
curl http://car.cityn.uz/api

# Or use browser
# http://car.cityn.uz/api
```

## Common Issues and Solutions

### Issue 1: "Failed to connect" - DNS Not Configured

**Solution:**
1. Go to your domain registrar (where you bought car.cityn.uz)
2. Add an A record:
   - Type: A
   - Name: car (or @)
   - Value: Your server's public IP
   - TTL: 3600

3. Wait for DNS propagation (5 minutes to 48 hours)
4. Check DNS: `nslookup car.cityn.uz`

### Issue 2: Nginx Not Listening on Port 80

**Check:**
```bash
netstat -tlnp | grep :80
```

**Fix:**
```bash
# Make sure nginx is running
systemctl status nginx

# Check nginx config
nginx -t

# Restart nginx
systemctl restart nginx
```

### Issue 3: Firewall Blocking Port 80

**Check:**
```bash
ufw status
```

**Fix:**
```bash
ufw allow 80/tcp
ufw allow 443/tcp
ufw reload
```

### Issue 4: App Not Running on Port 3000

**Check:**
```bash
pm2 status
pm2 logs car-wash-api
netstat -tlnp | grep :3000
```

**Fix:**
```bash
cd /root/apps/car-wash-backend
pm2 restart car-wash-api
```

### Issue 5: Nginx Config Errors

**Check:**
```bash
nginx -t
```

**View current config:**
```bash
cat /etc/nginx/sites-available/car-wash-api
```

**Fix:** Use the script in Step 1 above.

## Quick Diagnostic Commands

```bash
# 1. Check app status
pm2 status
pm2 logs car-wash-api --lines 50

# 2. Check nginx status
systemctl status nginx
nginx -t

# 3. Check ports
netstat -tlnp | grep -E ':(80|3000)'

# 4. Check firewall
ufw status

# 5. Test locally
curl http://localhost:3000/api
curl http://localhost/api

# 6. Check DNS
nslookup car.cityn.uz
dig car.cityn.uz

# 7. Get server IP
curl ifconfig.me
```

## Expected Results

After fixing everything:

1. **Local test should work:**
   ```bash
   curl http://localhost:3000/api
   # Should return API response
   
   curl http://localhost/api
   # Should return same API response (via nginx)
   ```

2. **External test should work:**
   ```bash
   # From your local computer
   curl http://car.cityn.uz/api
   # Should return API response
   ```

3. **Nginx should be listening:**
   ```bash
   netstat -tlnp | grep :80
   # Should show: nginx listening on 0.0.0.0:80
   ```

## Next Steps After HTTP Works

Once HTTP is working:

1. Install certbot:
   ```bash
   apt install certbot python3-certbot-nginx -y
   ```

2. Get SSL certificate:
   ```bash
   certbot --nginx -d car.cityn.uz -d www.car.cityn.uz
   ```

3. Certbot will automatically configure HTTPS!

