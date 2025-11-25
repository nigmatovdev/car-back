#!/bin/bash
# Setup nginx to work with IP address only (no domain needed)

echo "Setting up nginx for IP-only access..."

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

# Test configuration
echo "Testing nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✓ Configuration is valid!"
    echo "Reloading nginx..."
    systemctl reload nginx
    echo "✓ Nginx reloaded!"
    echo ""
    echo "Your API is now accessible at:"
    echo "  http://$(curl -s ifconfig.me)/api"
    echo "  http://$(curl -s ifconfig.me)/"
    echo ""
    echo "Test it:"
    echo "  curl http://$(curl -s ifconfig.me)/api"
else
    echo "✗ Configuration has errors!"
    exit 1
fi

