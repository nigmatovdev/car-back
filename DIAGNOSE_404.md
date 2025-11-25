# Diagnosing 404 Error

## Issue: Nginx returns 404 but app should be running

### Step 1: Test if app is running on port 3000

```bash
# Test direct connection to app
curl http://localhost:3000/api

# Check if port 3000 is listening
netstat -tlnp | grep :3000

# Check PM2 logs for errors
pm2 logs car-wash-api --lines 50
```

### Step 2: Check nginx configuration

```bash
# View current nginx config
cat /etc/nginx/sites-available/car-wash-api

# Check for other nginx configs that might interfere
ls -la /etc/nginx/sites-enabled/

# Test nginx config
nginx -t
```

### Step 3: Check nginx error logs

```bash
# Check nginx error logs
tail -50 /var/log/nginx/error.log

# Check nginx access logs
tail -50 /var/log/nginx/access.log
```

### Step 4: Verify app is actually running

```bash
# Check if app process is running
ps aux | grep node

# Check PM2 details
pm2 describe car-wash-api

# Check app logs
pm2 logs car-wash-api --err --lines 100
```

