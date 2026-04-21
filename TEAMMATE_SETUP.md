# CivicFix 311 - Setup Guide for Teammates

**You received this project as a ZIP file. Follow these steps to run it on your machine.**

---

## 📋 Prerequisites (Install First)

Before starting, install these tools:

### 1. **Python 3.11 or higher**
- Download: https://www.python.org/downloads/
- ✅ **IMPORTANT:** Check "Add Python to PATH" during installation
- Verify: Open Command Prompt and run `python --version`

### 2. **Node.js 18 or higher**
- Download: https://nodejs.org/ (LTS version)
- Verify: `node --version` and `npm --version`

### 3. **Docker Desktop** (Recommended for database)
- Download: https://www.docker.com/products/docker-desktop/
- Install and start Docker Desktop
- Verify: `docker --version`

**Alternative:** Install PostgreSQL 15 if you don't want Docker
- Download: https://www.postgresql.org/download/windows/

---

## 🚀 Quick Setup (Step-by-Step)

### **Step 1: Extract the ZIP**

Extract `civicfix.zip` to a folder, for example:
```
C:\Users\YourName\Projects\civicfix\
```

---

### **Step 2: Start Docker Desktop**

1. Open **Docker Desktop** application
2. Wait until it shows **"Docker Desktop is running"**
3. Leave it running in the background

---

### **Step 3: Set Up Backend**

Open **Command Prompt** or **PowerShell** and run:

```bash
# Navigate to the project folder
cd C:\Users\YourName\Projects\civicfix

# Go to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# You should see (venv) in your terminal now

# Install Python packages (takes 2-3 minutes)
pip install -r requirements.txt

# Create .env file from example
copy .env.example .env

# Stay in backend folder for now
```

---

### **Step 4: Start Database with Docker**

Open **NEW Command Prompt** window (keep the first one open):

```bash
# Navigate to project root
cd C:\Users\YourName\Projects\civicfix

# Start only the database container
docker-compose up -d db

# Wait 10 seconds for database to start
timeout /t 10

# Check if database is running
docker ps
```

You should see a container named **`civicfix-db`** running.

---

### **Step 5: Initialize Database**

Go back to the **FIRST Command Prompt** (where venv is activated):

```bash
# Make sure you're in backend folder with venv activated
# You should see (venv) at the start of the line

# Run database migrations
python manage.py migrate

# Load demo data (departments and categories)
python manage.py seed_demo

# Create admin account (you'll be asked for username, email, password)
python manage.py createsuperuser

# Start Django backend server
python manage.py runserver
```

✅ **Backend is now running at:** http://localhost:8000

**Keep this terminal open!** Don't close it.

---

### **Step 6: Set Up Frontend**

Open **THIRD Command Prompt** window:

```bash
# Navigate to frontend folder
cd C:\Users\YourName\Projects\civicfix\frontend

# Install Node packages (takes 3-5 minutes)
npm install

# Check if .env file exists
type .env

# If .env doesn't exist, create it:
echo REACT_APP_API_URL=http://localhost:8000/api > .env

# Start React development server
npm start
```

✅ **Frontend will automatically open in your browser at:** http://localhost:3000

**Keep this terminal open too!**

---

## 🎉 You're Done! Now Test It

You should now have **3 Command Prompts open**:

1. ✅ **Backend** - Running Django on port 8000
2. ✅ **Frontend** - Running React on port 3000  
3. ✅ **Docker** - (can close this one)

**Browser should show:** CivicFix landing page at http://localhost:3000

---

## 🧪 Quick Test

### **Test 1: Register a User**
1. Click **"Register"** or go to http://localhost:3000/register
2. Fill in the form:
   - Email: `test@example.com`
   - Username: `testuser`
   - First Name: `Test`
   - Last Name: `User`
   - Password: `Test@123` (or any strong password)
   - Confirm Password: `Test@123`
3. Click **"Sign Up"**
4. You should be redirected to Login page

### **Test 2: Login**
1. Enter your email and password
2. Click **"Login"**
3. You should see the **Dashboard**

### **Test 3: Create a Complaint**
1. Click **"New Complaint"** in the sidebar
2. Click **"Fill Demo"** button (auto-fills the form)
3. Click **"Submit Complaint"**
4. You should see success message

### **Test 4: View Complaints**
1. Click **"Complaints"** in sidebar
2. You should see your complaint in the list
3. Click on it to view details

### **Test 5: View Map**
1. Click **"Map"** in sidebar
2. You should see a marker on the map (might be in Indore, India)
3. Click the marker to see complaint details

✅ **If all tests pass, the project is working correctly!**

---

## 🛑 How to Stop Everything

When you're done testing:

1. **Stop Frontend:**
   - Go to the terminal running `npm start`
   - Press `Ctrl + C`
   - Type `Y` and press Enter

2. **Stop Backend:**
   - Go to the terminal running `python manage.py runserver`
   - Press `Ctrl + C`

3. **Stop Database:**
   ```bash
   docker-compose down
   ```

4. **Close Docker Desktop** (optional)

---

## 🔄 How to Start Again Later

Next time you want to run the project:

### **Terminal 1 - Backend:**
```bash
cd C:\Users\YourName\Projects\civicfix\backend
venv\Scripts\activate
python manage.py runserver
```

### **Terminal 2 - Frontend:**
```bash
cd C:\Users\YourName\Projects\civicfix\frontend
npm start
```

### **Terminal 3 - Database:**
```bash
cd C:\Users\YourName\Projects\civicfix
docker-compose up -d db
```

Or use the **all-in-one** command:
```bash
docker-compose up -d
```
This starts database, backend, and frontend together.

---

## ❌ Troubleshooting

### **Problem 1: `python` command not found**
**Solution:**
- Reinstall Python and check "Add to PATH"
- OR use `py` instead of `python`
- OR use `python3` instead of `python`

### **Problem 2: `npm` command not found**
**Solution:**
- Reinstall Node.js
- Restart your terminal after installation

### **Problem 3: Port 8000 already in use**
**Solution:**
```bash
# Find what's using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

### **Problem 4: Docker says "Cannot connect"**
**Solution:**
- Open Docker Desktop application
- Wait for it to fully start (green icon in system tray)
- Try again

### **Problem 5: Frontend shows blank page**
**Solution:**
- Check if backend is running at http://localhost:8000/api/
- Check browser console for errors (F12)
- Verify `.env` file in frontend has correct API URL

### **Problem 6: Login doesn't work / 401 errors**
**Solution:**
- Clear browser cache and localStorage
- Make sure backend is running
- Check that email/password are correct

### **Problem 7: Can't create complaint - "Category required"**
**Solution:**
- Run `python manage.py seed_demo` again
- This creates the necessary categories

### **Problem 8: Database connection error**
**Solution:**
```bash
# Check if database container is running
docker ps

# If not running, start it:
docker-compose up -d db

# Check logs if still failing:
docker-compose logs db
```

---

## 📁 Project Structure (What's What)

```
civicfix/
├── backend/               ← Django API (Python)
│   ├── manage.py         ← Main Django command tool
│   ├── requirements.txt  ← Python dependencies
│   ├── .env             ← Database credentials (create this)
│   └── civicfix/        ← Main Django project
├── frontend/             ← React app (JavaScript)
│   ├── package.json     ← Node.js dependencies
│   ├── .env            ← API URL config (create this)
│   └── src/            ← React source code
├── docker-compose.yml   ← Docker configuration
├── README.md           ← Main documentation
├── QUICKSTART.md       ← Quick start guide
└── TEAMMATE_SETUP.md   ← This file!
```

---

## 🔑 Default Credentials

**Database:**
- Host: `localhost`
- Port: `5432`
- Database: `civicfix_db`
- Username: `civicfix_user`
- Password: `civicfix_pass`

**Admin Account:**
- Create using `python manage.py createsuperuser`
- Access at: http://localhost:8000/admin

**Test User:**
- Register through the app at http://localhost:3000/register

---

## 📱 User Roles

After registration, you'll be a **Citizen** (default role).

To test other roles:
1. Login to Django Admin: http://localhost:8000/admin
2. Go to **Users**
3. Edit your user
4. Change **Role** field to:
   - `field_officer` - Handle complaints
   - `dept_head` - View analytics
   - `admin` - Full access

---

## 📊 Demo Data Included

After running `seed_demo`, you'll have:

**8 Departments:**
- Public Works, Water, Sanitation, Electrical, Drainage, Horticulture, Anti-Encroachment, Traffic

**8 Complaint Categories:**
- Roads & Potholes, Water Supply, Garbage & Sanitation, Street Lighting, Drainage, Parks & Gardens, Encroachment, Traffic & Signals

---

## 🌐 Access Points

- **Landing Page:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Register:** http://localhost:3000/register
- **Dashboard:** http://localhost:3000/dashboard
- **API:** http://localhost:8000/api/
- **Django Admin:** http://localhost:8000/admin

---

## 💡 Tips

1. **Use different browsers/incognito** to test multiple user roles simultaneously
2. **Check browser console (F12)** if something doesn't work
3. **Keep both terminals open** while testing
4. **Use "Fill Demo" button** when creating complaints to save time
5. **Check backend terminal** for API errors
6. **Docker Desktop must be running** for the database to work

---

## 🎓 Key Features to Test

✅ User registration and login  
✅ Create complaint with photo upload  
✅ View complaints list with filters  
✅ Interactive map with markers  
✅ Dashboard with statistics  
✅ Notifications system  
✅ Upvoting complaints  
✅ Comment on complaints  
✅ Profile management  
✅ Admin panel (if admin role)  

---

## 📞 Need Help?

If you're stuck:

1. **Check the troubleshooting section** above
2. **Look at these files:**
   - `README.md` - Full documentation
   - `QUICKSTART.md` - Quick start guide
3. **Check terminal output** for error messages
4. **Ask your teammate** who sent you this project

---

## 🎯 Summary - TL;DR

**One-time setup:**
```bash
# 1. Install Python, Node.js, Docker
# 2. Extract ZIP
# 3. Backend setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env

# 4. Start database
cd ..
docker-compose up -d db

# 5. Initialize
cd backend
python manage.py migrate
python manage.py seed_demo
python manage.py createsuperuser
python manage.py runserver

# 6. Frontend (new terminal)
cd frontend
npm install
npm start

# 7. Open browser: http://localhost:3000
```

**Every time after:**
```bash
# Terminal 1
cd backend
venv\Scripts\activate
python manage.py runserver

# Terminal 2  
cd frontend
npm start

# Terminal 3
docker-compose up -d db
```

---

**Good luck! 🚀**

If you see the CivicFix landing page, you did it right! 🎉
