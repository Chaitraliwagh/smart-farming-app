# 🚀 Deployment Guide

## Deployment Options

This guide covers deploying the Smart Farming application to production.

---

## Option 1: All-in-One Server (Easiest)

Deploy all components on a single server (VPS).

### Requirements:
- Ubuntu 20.04+ VPS
- 2GB+ RAM
- 20GB+ storage
- Node.js 16+
- Python 3.8+
- MongoDB

### Steps:

#### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Python & pip
sudo apt install -y python3 python3-pip python3-venv

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Nginx
sudo apt install -y nginx
```

#### 2. Upload Application
```bash
# Create app directory
sudo mkdir -p /var/www/smart-farming
sudo chown -R $USER:$USER /var/www/smart-farming

# Upload files (use SCP, SFTP, or Git)
cd /var/www/smart-farming
# ... copy your files here
```

#### 3. Setup Backend
```bash
cd /var/www/smart-farming/backend
npm install --production

# Create production .env
cat > .env << EOL
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-farming
OPENWEATHER_API_KEY=your_api_key_here
FLASK_ML_SERVICE_URL=http://localhost:5001
NODE_ENV=production
EOL
```

#### 4. Setup ML Service
```bash
cd /var/www/smart-farming/backend/ml_services
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### 5. Train Models
```bash
cd /var/www/smart-farming/ml_models
python3 train_all_models.py
```

#### 6. Setup Frontend
```bash
cd /var/www/smart-farming/frontend
npm install
npm run build

# This creates /var/www/smart-farming/frontend/dist
```

#### 7. Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/smart-farming
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain

    # Frontend (React build)
    location / {
        root /var/www/smart-farming/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/smart-farming /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 8. Setup PM2 (Process Manager)
```bash
sudo npm install -g pm2

# Start Backend
cd /var/www/smart-farming/backend
pm2 start server.js --name smart-farming-backend

# Start ML Service
cd /var/www/smart-farming/backend/ml_services
pm2 start app.py --name smart-farming-ml --interpreter python3

# Save PM2 config
pm2 save
pm2 startup
```

#### 9. Setup SSL (Optional but Recommended)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Testing Deployment:
```bash
# Check services
pm2 status
sudo systemctl status nginx
sudo systemctl status mongod

# View logs
pm2 logs smart-farming-backend
pm2 logs smart-farming-ml
```

---

## Option 2: Separate Deployments (Recommended)

### Frontend: Vercel/Netlify

#### Vercel Deployment:
1. Push code to GitHub
2. Go to https://vercel.com
3. Import repository
4. Set build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variable:
   - `VITE_API_URL=https://your-backend-url.com/api`
6. Deploy

#### Netlify Deployment:
Similar to Vercel:
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment variables: `VITE_API_URL`

### Backend: Railway/Heroku

#### Railway Deployment:
1. Create account at https://railway.app
2. New Project → Deploy from GitHub
3. Add MongoDB database
4. Set environment variables:
   ```
   PORT=5000
   MONGODB_URI=(from Railway MongoDB)
   OPENWEATHER_API_KEY=your_key
   FLASK_ML_SERVICE_URL=http://localhost:5001
   ```
5. Deploy

### ML Service: PythonAnywhere/AWS

#### PythonAnywhere:
1. Create account
2. Upload Flask app
3. Configure WSGI file
4. Set environment variables
5. Get public URL

---

## Option 3: Docker Deployment

### Create Dockerfiles:

#### Frontend Dockerfile:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Backend Dockerfile:
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

#### ML Service Dockerfile:
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5001
CMD ["python", "app.py"]
```

### Docker Compose:
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/smart-farming
      - OPENWEATHER_API_KEY=${OPENWEATHER_API_KEY}
      - FLASK_ML_SERVICE_URL=http://ml-service:5001
    depends_on:
      - mongodb
      - ml-service

  ml-service:
    build: ./backend/ml_services
    ports:
      - "5001:5001"

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo-data:
```

Run with:
```bash
docker-compose up -d
```

---

## Environment Variables Summary

### Backend (.env):
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-farming
OPENWEATHER_API_KEY=your_openweather_api_key
FLASK_ML_SERVICE_URL=http://localhost:5001
NODE_ENV=production
```

### Frontend (.env):
```bash
VITE_API_URL=https://your-backend-domain.com/api
```

---

## Post-Deployment Checklist

- [ ] All services running
- [ ] SSL certificate installed
- [ ] Environment variables set
- [ ] MongoDB secured (username/password)
- [ ] API keys working
- [ ] CORS configured correctly
- [ ] Error logging setup
- [ ] Backup system in place
- [ ] Monitoring configured
- [ ] Load testing completed

---

## Monitoring & Maintenance

### Setup Logging:
```bash
# PM2 logs
pm2 install pm2-logrotate

# Application logging
# Use Winston or similar in backend
```

### Setup Monitoring:
- Use PM2 Plus for application monitoring
- Use UptimeRobot for uptime monitoring
- Setup error tracking (Sentry)

### Backups:
```bash
# MongoDB backup script
#!/bin/bash
mongodump --out /backup/$(date +%Y%m%d)
```

### Updates:
```bash
# Pull latest code
cd /var/www/smart-farming
git pull

# Update backend
cd backend
npm install
pm2 restart smart-farming-backend

# Update ML service
cd backend/ml_services
source venv/bin/activate
pip install -r requirements.txt
pm2 restart smart-farming-ml

# Update frontend
cd frontend
npm install
npm run build
```

---

## Security Hardening

### 1. Firewall Setup:
```bash
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

### 2. Secure MongoDB:
```bash
# Create admin user
mongosh
use admin
db.createUser({
  user: "admin",
  pwd: "strong_password",
  roles: ["root"]
})

# Enable authentication in /etc/mongod.conf
security:
  authorization: enabled
```

### 3. Rate Limiting:
Add to backend:
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
```

### 4. Helmet.js:
```javascript
const helmet = require('helmet');
app.use(helmet());
```

---

## Performance Optimization

### 1. Enable Gzip:
In Nginx:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### 2. Caching:
```javascript
// Cache static assets
app.use(express.static('public', { maxAge: '1y' }));
```

### 3. CDN (Optional):
- Use Cloudflare for caching
- Improves global performance

---

## Troubleshooting Deployment

### Issue: Services not starting
```bash
# Check logs
pm2 logs
journalctl -u nginx
journalctl -u mongod
```

### Issue: Port conflicts
```bash
# Check what's using ports
sudo lsof -i :5000
sudo lsof -i :5001
```

### Issue: Permission errors
```bash
# Fix ownership
sudo chown -R $USER:$USER /var/www/smart-farming
```

### Issue: Memory issues
```bash
# Check memory usage
free -h
pm2 monit

# Increase swap if needed
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

---

## Cost Estimates

### Budget Hosting (< $20/month):
- **Frontend:** Vercel/Netlify (Free tier)
- **Backend:** Railway ($5-10/month)
- **ML Service:** PythonAnywhere ($5/month)
- **Database:** MongoDB Atlas (Free tier)
**Total:** ~$10-15/month

### Standard Hosting ($50-100/month):
- **VPS:** DigitalOcean/Linode ($12-20/month)
- **Domain:** $10-15/year
- **SSL:** Free (Let's Encrypt)
- **Backup storage:** $5/month
- **CDN:** Cloudflare (Free tier)
**Total:** ~$20-30/month

### Production Hosting ($200+/month):
- **Load balanced VPS cluster**
- **Managed MongoDB**
- **CDN with caching**
- **Monitoring services**
- **Automated backups**

---

## Support & Maintenance

### Regular Tasks:
- **Daily:** Check logs, monitor uptime
- **Weekly:** Review error logs, update dependencies
- **Monthly:** Security updates, performance review, backup verification
- **Quarterly:** Load testing, security audit

### Emergency Contacts:
- Keep deployment documentation updated
- Have rollback plan ready
- Maintain changelog

---

**Your Smart Farming application is now production-ready!** 🌾🚀

For questions or issues, refer to main README.md or create issue reports.
