#!/bin/bash
# Fix nginx configuration for car.cityn.uz

echo "Step 1: Removing broken symlink..."
rm -f /etc/nginx/sites-enabled/car-wash-api

echo "Step 2: Creating new nginx config..."
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

echo "Step 3: Creating symlink..."
ln -s /etc/nginx/sites-available/car-wash-api /etc/nginx/sites-enabled/

echo "Step 4: Testing nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✓ Nginx config is valid!"
    echo "Step 5: Reloading nginx..."
    systemctl reload nginx
    echo "✓ Nginx reloaded successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Test locally: curl http://localhost/api"
    echo "2. Test with domain: curl http://car.cityn.uz/api"
    echo "3. If DNS is not working, check: nslookup car.cityn.uz"
else
    echo "✗ Nginx config has errors. Please check the output above."
    exit 1
fi

