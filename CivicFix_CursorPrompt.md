# CivicFix 311 — Project specification (as implemented)

> **Living document.** This file describes how the **CivicFix 311** codebase is built and behaves today.  
> For setup steps, see **[README.md](./README.md)**.

---

## WHAT WE BUILD

A full-stack web application called **CivicFix 311 — Smart Civic Complaint Portal**: a civic complaint system for Indian cities. Citizens submit complaints, officers resolve them, department heads monitor, admins manage users and see analytics.

---

## TECH STACK (current)

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + React Router v6 + Axios |
| Styling | **Tailwind CSS v3** + `@tailwindcss/forms` (Create React App compatible) |
| Maps | Leaflet + react-leaflet (`CircleMarker`; no default marker icon hack) |
| Charts | Recharts |
| Toasts | react-hot-toast |
| Backend | **Django 6** + Django REST Framework |
| Auth | JWT (`djangorestframework-simplejwt`) + **`token_blacklist`** app for rotated refresh tokens |
| Database | PostgreSQL |
| Notifications | Django email (console backend in dev) + in-app `Notification` model |
| Fonts (UI) | **Public Sans** + **Material Symbols Outlined** (see `public/index.html`) |

**Note:** An earlier iteration of this doc specified Syne / DM Sans / DM Mono and a pure `index.css` design system. The app now uses **Tailwind** and **Public Sans** for the Stitch-based screens; brand colors remain aligned (navy `#0B1D51`, accent `#E8590C`, etc.).

---

## REPOSITORY LAYOUT

```
civicfix/
├── README.md
├── CivicFix_CursorPrompt.md      # This file
├── backend/
│   ├── manage.py
│   ├── requirements.txt            # Pinned versions (Django 6.x — see file)
│   ├── .env.example
│   ├── seed_data.py              # Optional one-off seed script
│   ├── civicfix/                 # Project settings, urls, wsgi, asgi
│   ├── users/
│   ├── complaints/
│   │   └── management/commands/
│   │       ├── check_sla.py      # Delegates to notifications.tasks.check_sla_breaches
│   │       └── seed_demo.py      # Departments + categories for empty DB
│   ├── notifications/
│   └── analytics/
├── frontend/
│   ├── public/index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js         # If present — Tailwind pipeline
│   ├── .env                      # REACT_APP_API_URL
│   └── src/
│       ├── index.js
│       ├── index.css             # @tailwind + small global utilities (charts, fadeUp, scrollbar)
│       ├── App.jsx               # Routes; BrowserRouter future flags for RR v7 compat
│       ├── context/AuthContext.jsx
│       ├── services/api.js       # auth, complaints, notifications, analytics clients
│       ├── components/Shared/Layout.jsx
│       └── pages/
│           ├── LandingPage.jsx   # Public marketing / entry at /
│           ├── LoginPage.jsx
│           ├── RegisterPage.jsx
│           ├── DashboardPage.jsx
│           ├── ComplaintsPage.jsx
│           ├── NewComplaintPage.jsx
│           ├── ComplaintDetailPage.jsx
│           ├── MapPage.jsx
│           ├── AnalyticsPage.jsx
│           ├── ProfilePage.jsx
│           └── AdminUsersPage.jsx
└── stitch/                       # Original HTML design references (optional)
```

---

## BACKEND SPECIFICATIONS

### settings.py (high level)

- `AUTH_USER_MODEL = 'users.User'`
- `INSTALLED_APPS`: AppConfig paths (`users.apps.UsersConfig`, …) + **`rest_framework_simplejwt.token_blacklist`**
- REST framework: `JWTAuthentication`, default `IsAuthenticated`, `PageNumberPagination` `PAGE_SIZE=20`
- `SIMPLE_JWT`: access ~2h, refresh ~7d, rotate refresh tokens, blacklist after rotation
- `CORS_ALLOWED_ORIGINS`: `localhost:3000` and `127.0.0.1:3000`
- `DATABASES`: PostgreSQL via environment variables with defaults
- `MEDIA_URL` / `MEDIA_ROOT` for uploads
- `TIME_ZONE = 'Asia/Kolkata'`
- `SLA_HOURS` (e.g. 24)

**Dependencies:** See **`backend/requirements.txt`** for exact pins (Django 6.x, DRF 3.16.x, etc.). Add **gunicorn** when deploying behind a process manager.

### users

- **Model:** `User(AbstractUser)` with `role` (citizen | field_officer | dept_head | admin), `phone`, `avatar`, `ward`, `department` (FK → `complaints.Department`, null), `is_verified`, plus convenience flags `is_citizen`, …
- **RegisterSerializer:** Password match validation; **self-registration is always `citizen`** (`role` is not accepted from the client).
- **UserSerializer:** Includes read-only **`department_name`**, **`date_joined`** (and `department` id where applicable).
- **CustomTokenObtainPairSerializer:** JWT claims + **`user`** object in login JSON for the SPA.
- **Views:** Register, login, profile GET/PATCH, change password, user list (admin/dept head scoped), user detail (admin).

### complaints

- **Models:** Department, Category, Complaint, Upvote, StatusHistory — as in original design (statuses include `closed`, `rejected`, etc.).
- **Complaint create:** Client sends **`category_id`** (write-only) mapping to `category` on the model.
- **ComplaintListCreateView — list queryset (important):**
  - **Citizen:** **all complaints** (transparency; aligns with map and upvoting any complaint).
  - **Field officer:** complaints **assigned_to** this user.
  - **Dept head:** complaints in **their department**.
  - **Admin:** all.
- **ComplaintDetailView:** Citizens may **GET any** complaint (e.g. from map links); **PATCH** only their **own**. Officers / dept heads / admin per queryset rules above.
- **UpvoteView:** Toggle; response includes **`upvote_count`** and **`has_upvoted`** (and legacy `count` / `upvoted` for compatibility). Priority may auto-escalate at 50 / 100 upvotes.
- **Filters / search / ordering:** As originally specified (status, priority, ward, dates, search on title/description/id/address, ordering).

### notifications & analytics

- **Notifications:** Models + list / unread count / mark read; **`send_status_notification`** after status changes (see `notifications/tasks.py`). SLA escalation logic may live in **`check_sla_breaches`** (called from `check_sla` management command).
- **Analytics:** Summary, trend (`?days=`), category breakdown, department breakdown (permissioned), ward heatmap, status breakdown — **backend implemented**; frontend may not call every endpoint yet (e.g. ward heatmap).

### URLs (`/api/`)

- `/api/auth/` → users
- `/api/complaints/` → complaints
- `/api/notifications/` → notifications
- `/api/analytics/` → analytics

---

## FRONTEND SPECIFICATIONS

### Environment

```env
REACT_APP_API_URL=http://localhost:8000/api
```

### index.html

- `#root` mount point
- Leaflet CSS (CDN) and/or import in map component
- Fonts: Public Sans + Material Symbols (current UI)

### Styling strategy

- **Tailwind** utility classes in components; **`tailwind.config.js`** extends brand colors (navy, primary, `background-light`, `teal-accent`, …).
- **`index.css`:** `@tailwind` layers + optional globals (scrollbar, chart helpers, `fadeUp`, `.hero-pattern`, `.hide-scrollbar` for landing).
- **Legacy note:** The old spec listed `.btn`, `.badge-*`, `.fu1`–`.fu6` in plain CSS. Those are **not** the primary system anymore; dashboards use Tailwind + Recharts.

### api.js

- Axios `baseURL` from env
- Request: `Authorization: Bearer <access_token>`
- Response: on **401**, refresh via `/auth/token/refresh/`, retry once, else clear storage and redirect to `/login`
- Exports: **`authAPI`**, **`complaintsAPI`**, **`notificationsAPI`**, **`analyticsAPI`**

### AuthContext

- Boot: if `access_token` → `GET /auth/profile/`
- `login` / `logout` / `updateUser` as standard SPA pattern

### App routing

- **`/`** → **LandingPage** (public)
- **`/login`**, **`/register`** → public routes (redirect if already logged in)
- Authenticated routes wrapped in layout + **role guards** where needed (e.g. new complaint citizen-only, analytics admin/dept head, …)
- React Router **future flags** (`v7_startTransition`, `v7_relativeSplatPath`) may be enabled on `BrowserRouter` to silence v7 migration warnings

### Layout

- Sidebar: navy background, CF logo, user chip, role-based nav, sign out
- Logo navigates to **`/`** (landing)

### Pages (behavioral summary)

| Page | Role |
|------|------|
| **LandingPage** | Marketing content; auth-aware header (Dashboard vs Login/Register); anchors to sections |
| **LoginPage** | Split layout; demo credentials hint; JWT login |
| **RegisterPage** | Split layout; citizen registration only |
| **DashboardPage** | Stats, charts, recent complaints; may merge **demo placeholders** with API data for demos |
| **ComplaintsPage** | Filters, table, pagination, upvote; demo rows optional |
| **NewComplaintPage** | `category_id` in `FormData`; **Fill Demo** helper; categories from API with dummy fallback |
| **ComplaintDetailPage** | Detail, history, officer status update, citizen confirm resolution |
| **MapPage** | Leaflet map, markers, filters |
| **AnalyticsPage** | Charts and tables (dept breakdown admin/dept head) |
| **ProfilePage** | Profile + password |
| **AdminUsersPage** | User list; uses **`department_name`** when present |

**Notifications UI:** API client exists; a dedicated **notifications inbox page** is **not** required for core flows — can be added later.

---

## DATA SEEDING

- **`python manage.py seed_demo`** — creates departments and categories (required before citizens can file complaints against real IDs).
- Optional **`backend/seed_data.py`** — same idea as a standalone script.

---

## IMPLEMENTATION RULES (maintain these)

1. Django apps use **AppConfig** in `INSTALLED_APPS`.
2. Keep **`AUTH_USER_MODEL`** before first migrations on a fresh project.
3. **JWT refresh:** `token_blacklist` installed and migrated when using rotation + blacklist.
4. **`send_status_notification`** runs **after** persisting complaint status changes.
5. **Complaint POST** uses **`category_id`**, not `category` alone.
6. **Plain JS only** in `frontend/src` (no TypeScript requirement).
7. Prefer **shared** Tailwind patterns over one-off inline styles for new UI.
8. When behavior or stack **changes**, update **this file** and **README.md**.

---

## SETUP (abbreviated)

Full PostgreSQL + migrate + seed + run instructions are in **[README.md](./README.md)**.

```bash
# Backend
cd backend
python -m venv venv && venv\Scripts\activate   # or source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_demo
python manage.py runserver

# Frontend
cd ../frontend
npm install
npm start
```

---

## CHANGE LOG (vs. original “build prompt”)

- **Django** upgraded to **6.x** (see `requirements.txt`).
- **Tailwind** + **Public Sans** UI instead of only Syne/DM Sans utility CSS.
- **Landing page** + **`/`** route added.
- **Citizen complaint list** shows **all** complaints (not only own) for transparency and parity with map/upvotes.
- **Map:** `CircleMarker` + CSS import; no `L.Icon.Default` deletion workaround.
- **Register** layout: split panel (not single centered card).
- **New complaint:** flat category list (no `<optgroup>` by department) unless added later.
- **JWT blacklist** app enabled in settings.
- **Demo / placeholder data** in several pages for presentations; real API data prepended or merged where applicable.

---

*End of document.*
