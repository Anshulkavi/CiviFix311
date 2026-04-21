# CivicFix 311 - Quick Start Guide

Get CivicFix 311 running in 5 minutes!

## 🚀 Quick Start (Development)

### Option 1: Docker (Recommended)

```bash
# 1. Clone and enter directory
git clone <repo-url> civicfix && cd civicfix

# 2. Start all services
docker-compose up -d

# 3. Initialize database
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py seed_demo
docker-compose exec backend python manage.py createsuperuser

# 4. Open in browser
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000/api
# Django Admin: http://localhost:8000/admin
```

### Option 2: Local Development

**Prerequisites:**
- Python 3.11+
- Node.js 18+
- PostgreSQL

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

pip install -r requirements.txt
cp .env.example .env

# Edit .env with your database credentials
python manage.py migrate
python manage.py seed_demo
python manage.py createsuperuser
python manage.py runserver
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

Access at **http://localhost:3000**

---

## 📝 Default Demo Data

After running `seed_demo`, you'll have:

**8 Departments:**
- Public Works
- Water Department
- Sanitation
- Electrical
- Drainage
- Horticulture
- Anti-Encroachment
- Traffic

**8 Categories:**
- Roads & Potholes
- Water Supply
- Garbage & Sanitation
- Street Lighting
- Drainage Issue
- Parks & Gardens
- Encroachment
- Traffic & Signals

---

## 👤 User Roles

The system supports 4 user roles:

1. **Citizen** - File complaints, upvote, track status
2. **Field Officer** - Handle assigned complaints, update status
3. **Department Head** - Manage department, view analytics
4. **Admin** - Full system access, user management

*Note: Public registration creates Citizen accounts only. Use Django admin to create staff accounts.*

---

## 🎯 Quick Test Flow

1. **Register** as a citizen at `/register`
2. **Login** with your credentials
3. **Create a complaint** - Click "New Complaint" or use "Fill Demo" button
4. **View on map** - See your complaint pinned on the map
5. **Check dashboard** - View stats and charts
6. **View notifications** - Get updates on complaint status

---

## 🔑 Environment Variables

**Backend (.env):**
```env
SECRET_KEY=your-secret-key
DEBUG=True
DB_NAME=civicfix_db
DB_USER=civicfix_user
DB_PASSWORD=civicfix_pass
DB_HOST=localhost
DB_PORT=5432
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:8000/api
```

---

## 📚 Key Features Implemented

✅ **Authentication** - JWT with token refresh
✅ **Complaint Management** - Create, track, update, close
✅ **Photo Upload** - Before/after images
✅ **Interactive Map** - Leaflet with complaint markers
✅ **Analytics Dashboard** - Charts and statistics
✅ **Notifications** - In-app + email alerts
✅ **SLA Tracking** - Auto-escalation after 24 hours
✅ **Upvoting** - Community engagement
✅ **Mobile Responsive** - Works on all devices
✅ **Role-Based Access** - Different views per role
✅ **Ward Management** - 85 Indore wards
✅ **Production Ready** - Docker deployment included

---

## 🛠️ Development Tools

**Backend:**
- Django Admin: http://localhost:8000/admin
- API Docs: http://localhost:8000/api/
- Database: PostgreSQL on port 5432

**Frontend:**
- React Dev Tools (browser extension)
- Hot reload enabled
- Source maps for debugging

---

## 📖 Next Steps

- **Customize branding** - Update colors in `tailwind.config.js`
- **Add more categories** - Via Django admin
- **Configure email** - Set SMTP settings in `.env`
- **Deploy to production** - See `DEPLOYMENT.md`
- **Add users** - Create staff via Django admin

---

## ❓ Troubleshooting

**Build fails:**
```bash
# Clear caches
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

**Frontend can't reach backend:**
- Check `REACT_APP_API_URL` in `.env`
- Ensure backend is running on port 8000
- Check CORS settings in Django

**Database errors:**
- Verify PostgreSQL is running
- Check credentials in backend `.env`
- Run migrations: `python manage.py migrate`

---

## 📞 Support

- Full deployment guide: See `DEPLOYMENT.md`
- Project documentation: See `README.md`
- Technical spec: See `CivicFix_CursorPrompt.md`

---

**Happy building! 🎉**
