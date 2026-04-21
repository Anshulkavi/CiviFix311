# CivicFix 311

**CivicFix 311** is a full-stack civic complaint portal: citizens report issues (with location and photos), track status, and upvote local problems; field officers and department heads manage and resolve cases; admins oversee users and analytics.

For the **as-built** product and technical specification (stack, layout, API behavior, deviations from the original prompt), see **[CivicFix_CursorPrompt.md](./CivicFix_CursorPrompt.md)**.

---

## Prerequisites

- **Python** 3.11+ (3.13 works with the current `requirements.txt`)
- **Node.js** 18+ and npm
- **PostgreSQL** (database name/user/password must match your backend `.env`)

---

## 1. Clone the repository

```bash
git clone <your-repo-url> civicfix
cd civicfix
```

---

## 2. Backend (Django API)

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
# source venv/bin/activate

pip install -r requirements.txt
```

### Database

1. Create a PostgreSQL database and user (or use defaults below).
2. Copy the environment template and adjust if needed:

```bash
copy .env.example .env   # Windows
# cp .env.example .env   # macOS / Linux
```

Default connection in `civicfix/settings.py` matches `.env.example`: `civicfix_db` / `civicfix_user` / `civicfix_pass` on `localhost:5432`.

### Migrate and seed

```bash
python manage.py migrate
python manage.py seed_demo
```

`seed_demo` creates **departments** and **complaint categories** so the “New complaint” form and API accept `category_id`. Run it once per fresh database.

### Run the server

```bash
python manage.py runserver
```

API base URL: **http://localhost:8000/api/**  
Media (uploaded images): served under `/media/` when `DEBUG=True`.

### Optional: admin and staff users

```bash
python manage.py createsuperuser
```

Use Django admin to set roles (`citizen`, `field_officer`, `dept_head`, `admin`) for staff accounts. Public **registration** only creates **citizen** accounts.

---

## 3. Frontend (React)

```bash
cd ../frontend
npm install
```

Ensure **`frontend/.env`** exists (or create it):

```env
REACT_APP_API_URL=http://localhost:8000/api
```

### Run the app

```bash
npm start
```

Open **http://localhost:3000**. The landing page is public; most app routes require login.

---

## 4. Quick end-to-end check

1. Start PostgreSQL, then backend (`runserver`), then frontend (`npm start`).
2. **Register** a citizen account → **Login**.
3. **New complaint** → use **Fill Demo** (if present) or fill fields → submit **Category** must exist (`seed_demo`).
4. Open **Complaints**, **Map**, and **Dashboard** — data should load from the API.

---

## Project layout

High-level repository tree (omits `venv/`, `node_modules/`, `__pycache__/`, and migration files):

```
civicfix/
├── README.md
├── CivicFix_CursorPrompt.md    # Living spec: as-implemented backend + frontend
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── seed_data.py            # Optional one-off DB seed (categories/depts)
│   ├── civicfix/               # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── users/                  # Auth, profiles, JWT login, user list
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── permissions.py
│   │   └── migrations/
│   ├── complaints/             # Complaints, categories, departments, upvotes
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── management/
│   │   │   └── commands/
│   │   │       ├── check_sla.py
│   │   │       └── seed_demo.py
│   │   └── migrations/
│   ├── notifications/          # In-app notifications + email hooks
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── tasks.py
│   ├── analytics/              # Dashboard stats, trends, breakdowns
│   │   ├── views.py
│   │   └── urls.py
│   └── media/                  # Created at runtime (uploaded images)
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── App.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js          # Axios + auth / complaints / analytics clients
│   │   ├── components/
│   │   │   └── Shared/
│   │   │       └── Layout.jsx
│   │   └── pages/
│   │       ├── LandingPage.jsx
│   │       ├── LoginPage.jsx
│   │       ├── RegisterPage.jsx
│   │       ├── DashboardPage.jsx
│   │       ├── ComplaintsPage.jsx
│   │       ├── NewComplaintPage.jsx
│   │       ├── ComplaintDetailPage.jsx
│   │       ├── MapPage.jsx
│   │       ├── AnalyticsPage.jsx
│   │       ├── ProfilePage.jsx
│   │       └── AdminUsersPage.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env                    # REACT_APP_API_URL (not committed if secret)
└── stitch/                     # Original Stitch HTML design references (optional)
    └── *.html
```

| Path | Purpose |
|------|---------|
| `backend/` | Django REST API, JWT, PostgreSQL, media uploads |
| `frontend/` | React SPA: routing, API client, maps, charts |
| `stitch/` | Static HTML prototypes; not required to run the app |
| `CivicFix_CursorPrompt.md` | Living “as-built” spec (aligned with the repo) |

---

## Troubleshooting

- **401 / login loops:** Clear site data or `localStorage`; ensure backend is on port **8000** and `REACT_APP_API_URL` matches.
- **400 on complaint create:** Run `python manage.py seed_demo` so categories exist; request body must use **`category_id`**, not `category`.
- **Database errors:** Confirm PostgreSQL is running and credentials in `.env` match your server.
