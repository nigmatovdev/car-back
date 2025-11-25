# Fix Swagger UI and CORS Issues

## Problems Identified

1. **Browser trying HTTPS instead of HTTP** - The browser is attempting `https://170.64.168.79` but server only has HTTP
2. **CORS not allowing IP address** - Your IP `http://170.64.168.79` needs to be in allowed origins
3. **Helmet security headers** - Cross-Origin-Opener-Policy requires HTTPS or localhost
4. **Swagger static files not loading** - Connection refused errors

## Solution 1: Update CORS Configuration

Update your `.env` file on the server to include your IP address:

```bash
cd /root/apps/car-wash-backend
nano .env
```

Add or update `ALLOWED_ORIGINS`:

```env
ALLOWED_ORIGINS="http://170.64.168.79,http://localhost:3000,http://localhost:3001,http://localhost:5173"
```

Or allow all origins for development (less secure):

```env
ALLOWED_ORIGINS="*"
```

## Solution 2: Adjust Helmet Configuration for HTTP

The Helmet middleware is setting headers that require HTTPS. We need to configure it for HTTP.

Update `src/main.ts`:

```typescript
// Replace the helmet() line with:
app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    crossOriginOpenerPolicy: false, // Disable for HTTP
    crossOriginEmbedderPolicy: false, // Disable for HTTP
  }),
);
```

Then rebuild:

```bash
npm run build
pm2 restart car-wash-api
```

## Solution 3: Access via HTTP (Not HTTPS)

**Important:** Make sure you're accessing the API via HTTP, not HTTPS:

- ✅ Correct: `http://170.64.168.79/api`
- ❌ Wrong: `https://170.64.168.79/api`

If your browser automatically redirects to HTTPS, you can:
1. Type `http://` explicitly
2. Clear browser cache
3. Use incognito/private mode

## Solution 4: Quick Fix Script

Run this on your server to update everything:

```bash
cd /root/apps/car-wash-backend

# Update .env to allow IP address
sed -i 's|ALLOWED_ORIGINS=.*|ALLOWED_ORIGINS="http://170.64.168.79,http://localhost:3000,http://localhost:3001,http://localhost:5173"|' .env

# Or if ALLOWED_ORIGINS doesn't exist, add it
if ! grep -q "ALLOWED_ORIGINS" .env; then
    echo 'ALLOWED_ORIGINS="http://170.64.168.79,http://localhost:3000,http://localhost:3001,http://localhost:5173"' >> .env
fi

# Restart app
pm2 restart car-wash-api

# Check logs
pm2 logs car-wash-api --lines 20
```

## Solution 5: Update main.ts for HTTP Support

If you want to permanently fix the Helmet issue, update the code:

```bash
cd /root/apps/car-wash-backend
nano src/main.ts
```

Find this line:
```typescript
app.use(helmet());
```

Replace with:
```typescript
app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);
```

Then:
```bash
npm run build
pm2 restart car-wash-api
```

## Testing

After making changes:

1. **Test API directly:**
   ```bash
   curl http://170.64.168.79/api
   ```

2. **Test from browser:**
   - Open: `http://170.64.168.79/api`
   - Make sure it's HTTP, not HTTPS

3. **Check CORS:**
   ```bash
   curl -H "Origin: http://170.64.168.79" \
        -H "Access-Control-Request-Method: GET" \
        -H "Access-Control-Request-Headers: X-Requested-With" \
        -X OPTIONS \
        http://170.64.168.79/api
   ```

## Alternative: Disable Helmet Temporarily

If you want to quickly test without Helmet:

```bash
cd /root/apps/car-wash-backend
nano src/main.ts
```

Comment out the helmet line:
```typescript
// app.use(helmet());
```

Then rebuild and restart:
```bash
npm run build
pm2 restart car-wash-api
```

## Summary

The main fixes needed:
1. ✅ Add IP address to `ALLOWED_ORIGINS` in `.env`
2. ✅ Configure Helmet to work with HTTP
3. ✅ Access via HTTP (not HTTPS)
4. ✅ Restart the application

After these changes, Swagger UI should load correctly at `http://170.64.168.79/api`

