# CivicFix 311 - Deployment Guide

This guide will help you deploy CivicFix 311 to production using Docker.

## Prerequisites

- Docker and Docker Compose installed
- Domain name configured (for production)
- SSL certificate (recommended - use Let's Encrypt)
- PostgreSQL database (or use Docker)
- SMTP email service (Gmail, SendGrid, AWS SES, etc.)

---

## Quick Start (Docker)

### 1. Clone and Configure

```bash
git clone <your-repo-url> civicfix
cd civicfix
```

### 2. Backend Configuration

```bash
cd backend
cp .env.production.example .env
```

Edit `.env` and set:
- `SECRET_KEY` - Generate with `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
- `ALLOWED_HOSTS` - Your domain (e.g., `civicfix.com,www.civicfix.com`)
- `DB_PASSWORD` - Strong database password
- `CORS_ALLOWED_ORIGINS` - Your frontend URL
- `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD` - Email credentials

### 3. Frontend Configuration

```bash
cd ../frontend
```

Edit `.env.production`:
```env
REACT_APP_API_URL=https://yourdomain.com/api
```

### 4. Build and Run

```bash
cd ..
docker-compose build
docker-compose up -d
```

### 5. Initialize Database

```bash
# Run migrations
docker-compose exec backend python manage.py migrate

# Create categories and departments
docker-compose exec backend python manage.py seed_demo

# Create admin user
docker-compose exec backend python manage.py createsuperuser
```

### 6. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api
- **Django Admin:** http://localhost:8000/admin

---

## Production Deployment

### SSL Configuration

1. **Get SSL Certificate** (Let's Encrypt):
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

2. **Update nginx configuration** to use SSL (port 443)

3. **Set environment variables:**
```env
SECURE_SSL_REDIRECT=True
ENABLE_HSTS=True
```

### Environment Variables

**Required:**
- `SECRET_KEY` - Django secret key (50+ random characters)
- `ALLOWED_HOSTS` - Comma-separated domain list
- `DB_PASSWORD` - Strong database password
- `EMAIL_HOST_USER` - SMTP username
- `EMAIL_HOST_PASSWORD` - SMTP password

**Optional:**
- `DB_HOST` - Database host (default: `db`)
- `DB_PORT` - Database port (default: `5432`)
- `SLA_HOURS` - Auto-escalation hours (default: `24`)

### Docker Compose Services

- **db** - PostgreSQL 15 database
- **backend** - Django API with Gunicorn
- **frontend** - React app served by Nginx
- **nginx** - Reverse proxy (optional, for production SSL)

### Volumes

- `postgres_data` - Database persistence
- `media_files` - Uploaded images
- `static_files` - Collected static files

---

## Development Setup (Without Docker)

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure database
cp .env.example .env
# Edit .env with your local database credentials

# Run migrations
python manage.py migrate
python manage.py seed_demo
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Access at http://localhost:3000

---

## Monitoring & Maintenance

### Logs

```bash
# View all logs
docker-compose logs -f

# View backend logs only
docker-compose logs -f backend

# View last 100 lines
docker-compose logs --tail=100 backend
```

### Database Backup

```bash
# Backup
docker-compose exec db pg_dump -U civicfix_user civicfix_db > backup_$(date +%Y%m%d).sql

# Restore
cat backup_20250101.sql | docker-compose exec -T db psql -U civicfix_user civicfix_db
```

### Updates

```bash
# Pull latest code
git pull

# Rebuild containers
docker-compose build

# Restart services
docker-compose up -d

# Run new migrations
docker-compose exec backend python manage.py migrate
```

### Health Checks

```bash
# Check all services
docker-compose ps

# Test backend API
curl http://localhost:8000/api/

# Test frontend
curl http://localhost:3000
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :8000  # or :3000

# Kill process
kill -9 <PID>
```

### Database Connection Failed
- Check `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` in `.env`
- Ensure PostgreSQL is running: `docker-compose ps db`
- Check logs: `docker-compose logs db`

### Static Files Not Loading
```bash
docker-compose exec backend python manage.py collectstatic --noinput
```

### 502 Bad Gateway
- Backend might not be running: `docker-compose ps backend`
- Check backend logs: `docker-compose logs backend`
- Verify `ALLOWED_HOSTS` includes your domain

### CORS Errors
- Check `CORS_ALLOWED_ORIGINS` in backend `.env`
- Must match exact frontend URL (including https://)

---

## Performance Optimization

### Production Checklist

- [ ] `DEBUG=False` in production settings
- [ ] Strong `SECRET_KEY` set
- [ ] `ALLOWED_HOSTS` configured
- [ ] SSL/HTTPS enabled
- [ ] Database connection pooling (`CONN_MAX_AGE=60`)
- [ ] Static files compressed (WhiteNoise)
- [ ] Email backend configured (not console)
- [ ] Regular database backups scheduled
- [ ] Monitoring/error tracking (Sentry recommended)

### Optional Enhancements

- **Redis** - Add caching for better performance
- **Celery** - Background tasks for emails and SLA checks
- **CDN** - Serve static files from CDN
- **Load Balancer** - Distribute traffic across multiple instances

---

## Security

### Best Practices

1. **Never commit secrets** - Use `.env` files (in `.gitignore`)
2. **Regular updates** - Keep dependencies up to date
3. **Strong passwords** - For database and admin accounts
4. **Rate limiting** - Add to prevent abuse
5. **Firewall** - Only expose ports 80, 443
6. **Backups** - Automated daily backups
7. **Monitoring** - Track errors and suspicious activity

### Environment-Specific Settings

**Development:**
```env
DEBUG=True
ALLOWED_HOSTS=*
SECURE_SSL_REDIRECT=False
```

**Production:**
```env
DEBUG=False
ALLOWED_HOSTS=yourdomain.com
SECURE_SSL_REDIRECT=True
ENABLE_HSTS=True
```

---

## Scaling

### Horizontal Scaling

1. **Multiple backend instances:**
```yaml
backend:
  deploy:
    replicas: 3
```

2. **Load balancer** - Use nginx or cloud load balancer

3. **Shared storage** - Use S3 or NFS for media files

### Database Scaling

- **Read replicas** - For read-heavy workloads
- **Connection pooling** - Use PgBouncer
- **Managed database** - RDS, Cloud SQL, Azure Database

---

## Support

For issues or questions:
- Check logs: `docker-compose logs -f`
- Review this guide
- Check GitHub issues
- Contact support team

---

*Last updated: April 2026*
