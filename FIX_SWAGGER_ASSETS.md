# Fix Swagger UI Assets Loading Issues

## Problem
Swagger UI assets (CSS, JS files) are failing to load with `ERR_CONNECTION_REFUSED`. The browser is trying to use HTTPS when the server only has HTTP.

## Root Causes
1. Browser is forcing HTTPS (`https://170.64.168.79`) instead of HTTP
2. Content Security Policy might be blocking assets
3. Swagger UI trying to load assets from wrong URLs

## Solution 1: Disable CSP Completely (Quick Fix)

I've already updated the code to disable CSP. Now rebuild:

```bash
cd /root/apps/car-wash-backend
npm run build
pm2 restart car-wash-api
```

## Solution 2: Force HTTP in Browser

**Important:** Make sure you're accessing via HTTP, not HTTPS:

1. **Clear browser cache:**
   - Chrome/Edge: `Ctrl+Shift+Delete` → Clear cached images and files
   - Or use Incognito/Private mode

2. **Type HTTP explicitly:**
   - ✅ Use: `http://170.64.168.79/api`
   - ❌ Don't use: `https://170.64.168.79/api`

3. **If browser auto-redirects to HTTPS:**
   - Type `http://` explicitly in the address bar
   - Or use a different browser
   - Or clear HSTS cache (Chrome: `chrome://net-internals/#hsts`)

## Solution 3: Check if Assets are Being Served

Test if Swagger assets are accessible:

```bash
# Test Swagger JSON endpoint
curl http://170.64.168.79/api-json

# Test if Swagger UI HTML is served
curl http://170.64.168.79/api
```

## Solution 4: Alternative - Use Swagger UI Standalone

If the above doesn't work, we can configure Swagger to use standalone mode. But first try Solution 1 and 2.

## Solution 5: Check Nginx Configuration

Make sure nginx is proxying all Swagger routes correctly:

```bash
# Check nginx config
cat /etc/nginx/sites-available/car-wash-api

# Test nginx
nginx -t

# Check if nginx is serving Swagger correctly
curl -I http://170.64.168.79/api
```

## Debugging Steps

1. **Check browser console:**
   - Open DevTools (F12)
   - Go to Network tab
   - Reload the page
   - See which requests are failing

2. **Check server logs:**
   ```bash
   pm2 logs car-wash-api --lines 50
   tail -50 /var/log/nginx/access.log
   tail -50 /var/log/nginx/error.log
   ```

3. **Test direct access:**
   ```bash
   # From server
   curl http://localhost:3000/api
   
   # From your local machine
   curl http://170.64.168.79/api
   ```

## Expected Behavior

After fixes:
- ✅ `http://170.64.168.79/api` should load Swagger UI
- ✅ All CSS and JS files should load
- ✅ No ERR_CONNECTION_REFUSED errors
- ✅ Swagger UI should be fully functional

## If Still Not Working

1. Check if the app is actually running:
   ```bash
   pm2 status
   curl http://localhost:3000/api
   ```

2. Check if nginx is proxying correctly:
   ```bash
   curl -v http://170.64.168.79/api 2>&1 | grep -i "swagger"
   ```

3. Try accessing directly (bypass nginx):
   - Temporarily open port 3000 in firewall
   - Access: `http://170.64.168.79:3000/api`
   - If this works, the issue is with nginx configuration

