# CIVICFIX 311 - PROJECT DIAGRAMS

This file contains all diagrams for the BTech Project Report in multiple formats:
1. **Mermaid Code** - Can be rendered at https://mermaid.live/ or in VS Code with Mermaid extension
2. **ASCII Art** - For quick reference
3. **Draw.io Instructions** - For creating professional diagrams

---

## FIGURE 4.1: SYSTEM ARCHITECTURE DIAGRAM

### Mermaid Code:

```mermaid
graph TB
    subgraph "CLIENT TIER"
        A[Desktop Browser]
        B[Mobile Browser]
        C[Tablet Browser]
    end
    
    subgraph "PRESENTATION LAYER"
        D[React Application<br/>Components, Routing, State]
    end
    
    A --> D
    B --> D
    C --> D
    
    D -->|HTTPS/JSON REST API| E
    
    subgraph "APPLICATION TIER"
        E[Nginx Reverse Proxy]
        F[Gunicorn WSGI Server]
        G[Django Application]
        H[Django REST Framework]
        I[Django Apps:<br/>Users | Complaints<br/>Notifications | Analytics]
    end
    
    E --> F
    F --> G
    G --> H
    H --> I
    
    I -->|SQL Queries via ORM| J
    
    subgraph "DATA TIER"
        J[PostgreSQL Database]
        K[Tables:<br/>Users | Complaints<br/>Categories | Departments<br/>Upvotes | Notifications]
    end
    
    J --> K
    
    style D fill:#e1f5ff
    style I fill:#fff4e1
    style K fill:#e8f5e9
```

### Draw.io Instructions:
1. Create 3 horizontal swim lanes labeled "Client Tier", "Application Tier", "Data Tier"
2. **Client Tier:** Add 3 rectangles for Desktop/Mobile/Tablet browsers → all connect to React box below
3. **Application Tier:** Stack vertically: Nginx → Gunicorn → Django → DRF → Apps (4 boxes side by side)
4. **Data Tier:** PostgreSQL cylinder with table list inside
5. Use arrows: Client→React (HTTP), React→Nginx (REST API/JSON), Apps→DB (SQL)
6. Color code: Client (blue), Application (orange), Data (green)

---

## FIGURE 4.2: THREE-TIER ARCHITECTURE

### ASCII Diagram:

```
┌────────────────────────────────────────────────────────┐
│                   PRESENTATION TIER                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │          React Single Page Application           │  │
│  │  • Components (Pages, Shared, Forms)             │  │
│  │  • React Router (Client-side routing)            │  │
│  │  • State Management (Context API)                │  │
│  │  • Styling (Tailwind CSS)                        │  │
│  │  • Maps (Leaflet), Charts (Recharts)             │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────┬───────────────────────────────┘
                         │
              REST API (HTTP/JSON + JWT)
                         │
┌────────────────────────▼───────────────────────────────┐
│                   APPLICATION TIER                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Django REST Framework API               │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  Authentication & Authorization (JWT)      │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │  ┌───────┬──────────┬──────────┬──────────────┐  │  │
│  │  │ Users │Complaints│Notifica- │  Analytics   │  │  │
│  │  │  App  │   App    │tions App │     App      │  │  │
│  │  └───────┴──────────┴──────────┴──────────────┘  │  │
│  │  • Business Logic  • Validation  • Permissions   │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────┬───────────────────────────────┘
                         │
                   SQL Queries (ORM)
                         │
┌────────────────────────▼───────────────────────────────┐
│                      DATA TIER                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │            PostgreSQL RDBMS                       │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  Tables:                                   │  │  │
│  │  │  • users_user (Auth, Roles, Profiles)      │  │  │
│  │  │  • complaints_complaint (Issues)           │  │  │
│  │  │  • complaints_category (Types)             │  │  │
│  │  │  • complaints_department (Depts)           │  │  │
│  │  │  • complaints_upvote (Votes)               │  │  │
│  │  │  • complaints_statushistory (Audit)        │  │  │
│  │  │  • notifications_notification (Alerts)     │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │  • ACID Transactions  • Indexes  • Constraints   │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## FIGURE 4.3: ENTITY-RELATIONSHIP DIAGRAM

### Mermaid Code:

```mermaid
erDiagram
    USER ||--o{ COMPLAINT : creates
    USER ||--o{ COMPLAINT : "assigned to"
    USER ||--o{ UPVOTE : votes
    USER }o--|| DEPARTMENT : "belongs to"
    USER ||--o{ NOTIFICATION : receives
    
    DEPARTMENT ||--o{ CATEGORY : contains
    DEPARTMENT ||--o{ COMPLAINT : "routed to"
    
    CATEGORY ||--o{ COMPLAINT : categorizes
    
    COMPLAINT ||--o{ UPVOTE : "has"
    COMPLAINT ||--o{ STATUS_HISTORY : tracks
    COMPLAINT ||--o{ NOTIFICATION : generates
    
    USER {
        int id PK
        string email UK
        string password
        string name
        string phone
        enum role
        string ward
        string avatar
        bool is_verified
        int department_id FK
        datetime date_joined
    }
    
    DEPARTMENT {
        int id PK
        string name
        text description
        datetime created_at
    }
    
    CATEGORY {
        int id PK
        string name
        text description
        int department_id FK
        int sla_hours
    }
    
    COMPLAINT {
        int id PK
        string title
        text description
        string address
        decimal latitude
        decimal longitude
        string ward
        enum status
        enum priority
        string photo
        string after_photo
        int upvote_count
        int category_id FK
        int department_id FK
        int created_by_id FK
        int assigned_to_id FK
        datetime created_at
        datetime updated_at
        datetime resolved_at
    }
    
    UPVOTE {
        int id PK
        int user_id FK
        int complaint_id FK
        datetime created_at
    }
    
    STATUS_HISTORY {
        int id PK
        int complaint_id FK
        enum status
        text note
        int changed_by_id FK
        datetime changed_at
    }
    
    NOTIFICATION {
        int id PK
        int user_id FK
        string type
        string title
        text message
        bool is_read
        int complaint_id FK
        datetime created_at
    }
```

### Detailed ER Diagram for Draw.io:

**Entities (Rectangles):**
1. **USER** - Primary Key: id, Attributes: email (UK), password, name, phone, role, ward, avatar, department_id (FK)
2. **DEPARTMENT** - PK: id, Attributes: name, description
3. **CATEGORY** - PK: id, Attributes: name, description, department_id (FK), sla_hours
4. **COMPLAINT** - PK: id, Attributes: title, description, address, lat/lng, ward, status, priority, photo, category_id (FK), department_id (FK), created_by_id (FK), assigned_to_id (FK)
5. **UPVOTE** - PK: id, Attributes: user_id (FK), complaint_id (FK), created_at
6. **STATUS_HISTORY** - PK: id, Attributes: complaint_id (FK), status, note, changed_by_id (FK)
7. **NOTIFICATION** - PK: id, Attributes: user_id (FK), type, title, message, is_read, complaint_id (FK)

**Relationships (Diamond shapes or lines):**
- USER → COMPLAINT (1:N) "creates" via created_by_id
- USER → COMPLAINT (1:N) "assigned to" via assigned_to_id
- USER → DEPARTMENT (N:1) "belongs to"
- USER → UPVOTE (1:N) "votes"
- USER → NOTIFICATION (1:N) "receives"
- DEPARTMENT → CATEGORY (1:N) "contains"
- DEPARTMENT → COMPLAINT (1:N) "routed to"
- CATEGORY → COMPLAINT (1:N) "categorizes"
- COMPLAINT → UPVOTE (1:N) "has"
- COMPLAINT → STATUS_HISTORY (1:N) "tracks"
- COMPLAINT → NOTIFICATION (1:N) "generates"

**Cardinality:**
- 1:N (one-to-many) - Use crow's foot notation
- N:1 (many-to-one) - Reverse crow's foot
- Unique constraint on (user_id, complaint_id) in UPVOTE table

---

## FIGURE 4.5: USE CASE DIAGRAM - CITIZEN

### Mermaid Code:

```mermaid
graph TD
    CITIZEN([Citizen])
    
    CITIZEN --> UC1[Register Account]
    CITIZEN --> UC2[Login]
    CITIZEN --> UC3[View Profile]
    CITIZEN --> UC4[Submit Complaint]
    CITIZEN --> UC5[View All Complaints]
    CITIZEN --> UC6[Search Complaints]
    CITIZEN --> UC7[Filter Complaints]
    CITIZEN --> UC8[View Complaint Details]
    CITIZEN --> UC9[Upvote Complaint]
    CITIZEN --> UC10[View Map]
    CITIZEN --> UC11[Track Status]
    CITIZEN --> UC12[Confirm Resolution]
    CITIZEN --> UC13[Rate Service]
    CITIZEN --> UC14[View Notifications]
    CITIZEN --> UC15[Change Password]
    
    UC4 -.includes.-> UC16[Upload Photo]
    UC4 -.includes.-> UC17[Select Location]
    UC4 -.includes.-> UC18[Choose Category]
    
    UC10 -.includes.-> UC19[View Markers]
    UC10 -.includes.-> UC20[Filter by Ward]
    
    style CITIZEN fill:#4a90e2,stroke:#333,stroke-width:3px,color:#fff
    style UC4 fill:#f39c12
    style UC9 fill:#f39c12
    style UC12 fill:#f39c12
```

### ASCII Diagram:

```
                          ┌─────────────┐
                          │   CITIZEN   │
                          └──────┬──────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
   ┌────▼────┐             ┌─────▼─────┐           ┌─────▼─────┐
   │Register │             │   Login   │           │   View    │
   │ Account │             │           │           │  Profile  │
   └─────────┘             └───────────┘           └───────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
   ┌────▼────┐             ┌─────▼─────┐           ┌─────▼─────┐
   │ Submit  │             │   View    │           │  Search/  │
   │Complaint│◄──includes──┤ All       │           │  Filter   │
   │         │   • Photo   │Complaints │           │Complaints │
   │         │   • GPS     │           │           │           │
   │         │   • Category│           │           │           │
   └─────────┘             └───────────┘           └───────────┘
        │                        │                        │
        │                        ▼                        │
        │                  ┌───────────┐                 │
        │                  │   View    │                 │
        │                  │Complaint  │                 │
        │                  │  Detail   │                 │
        │                  └─────┬─────┘                 │
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
   ┌────▼────┐             ┌─────▼─────┐           ┌─────▼─────┐
   │ Upvote  │             │View Map   │           │  Track    │
   │Complaint│             │ • Markers │           │  Status   │
   │         │             │ • Filters │           │           │
   └─────────┘             └───────────┘           └───────────┘
                                                          │
                                                          ▼
                                                    ┌───────────┐
                                                    │  Confirm  │
                                                    │Resolution │
                                                    │& Rate     │
                                                    └───────────┘
```

---

## FIGURE 4.6: USE CASE DIAGRAM - FIELD OFFICER

### Mermaid Code:

```mermaid
graph TD
    OFFICER([Field Officer])
    
    OFFICER --> UC1[Login]
    OFFICER --> UC2[View Assigned Complaints]
    OFFICER --> UC3[View Complaint Details]
    OFFICER --> UC4[Update Status]
    OFFICER --> UC5[Add Notes]
    OFFICER --> UC6[Upload After Photo]
    OFFICER --> UC7[Mark In Progress]
    OFFICER --> UC8[Mark Resolved]
    OFFICER --> UC9[Reject Complaint]
    OFFICER --> UC10[View Notifications]
    OFFICER --> UC11[Update Profile]
    
    UC4 -.includes.-> UC5
    UC4 -.includes.-> UC6
    UC8 -.requires.-> UC6
    
    style OFFICER fill:#27ae60,stroke:#333,stroke-width:3px,color:#fff
    style UC4 fill:#e74c3c
    style UC8 fill:#e74c3c
```

---

## FIGURE 4.7: SEQUENCE DIAGRAM - COMPLAINT SUBMISSION

### Mermaid Code:

```mermaid
sequenceDiagram
    participant C as Citizen
    participant F as Frontend<br/>(React)
    participant A as Backend API<br/>(Django)
    participant DB as Database<br/>(PostgreSQL)
    participant N as Notification<br/>Service
    
    C->>F: Fill complaint form<br/>(title, desc, photo, GPS)
    C->>F: Click Submit
    F->>F: Validate form data
    F->>A: POST /api/complaints/<br/>(FormData with photo)
    
    A->>A: Authenticate JWT token
    A->>A: Validate data
    A->>DB: Get Category by ID
    DB-->>A: Category object<br/>(with department_id)
    
    A->>A: Auto-assign department<br/>from category
    A->>DB: Save Complaint<br/>(status=submitted)
    DB-->>A: Complaint object (id=123)
    
    A->>DB: Create StatusHistory entry
    A->>N: Send notification to<br/>Department Head
    N-->>N: Create in-app notification<br/>Send email
    
    A-->>F: 201 Created<br/>{id: 123, status: submitted}
    F->>F: Show success toast
    F->>F: Redirect to /complaints
    F-->>C: "Complaint submitted<br/>successfully!"
    
    Note over C,N: Entire process takes < 2 seconds
```

### ASCII Sequence Diagram:

```
Citizen     Frontend      Backend API    Database    Notification
  │             │              │             │              │
  │  Fill Form  │              │             │              │
  ├────────────►│              │             │              │
  │   Submit    │              │             │              │
  ├────────────►│              │             │              │
  │             │ POST /complaints/          │              │
  │             ├─────────────►│             │              │
  │             │              │ Validate    │              │
  │             │              │             │              │
  │             │              │ Get Category│              │
  │             │              ├────────────►│              │
  │             │              │◄────────────┤              │
  │             │              │  category   │              │
  │             │              │             │              │
  │             │              │ Auto-assign │              │
  │             │              │ department  │              │
  │             │              │             │              │
  │             │              │Save Complaint              │
  │             │              ├────────────►│              │
  │             │              │◄────────────┤              │
  │             │              │ complaint   │              │
  │             │              │  (id=123)   │              │
  │             │              │             │              │
  │             │              │Send Notification           │
  │             │              ├────────────────────────────►│
  │             │              │             │    Email +   │
  │             │              │             │    In-app    │
  │             │◄─────────────┤             │              │
  │◄────────────┤ 201 Created  │             │              │
  │  Success!   │ {id: 123}    │             │              │
  │             │              │             │              │
```

---

## FIGURE 4.8: SEQUENCE DIAGRAM - STATUS UPDATE

### Mermaid Code:

```mermaid
sequenceDiagram
    participant O as Field Officer
    participant F as Frontend
    participant A as Backend API
    participant DB as Database
    participant N as Notification
    
    O->>F: Navigate to assigned complaints
    F->>A: GET /api/complaints/<br/>(filtered by assigned_to)
    A->>DB: Query complaints WHERE<br/>assigned_to = officer_id
    DB-->>A: List of complaints
    A-->>F: 200 OK {results: [...]}
    F-->>O: Display complaint list
    
    O->>F: Click complaint #123
    F->>A: GET /api/complaints/123/
    A->>DB: Get complaint + history
    DB-->>A: Complaint details
    A-->>F: 200 OK {complaint details}
    F-->>O: Show detail page
    
    O->>F: Update status to "in_progress"<br/>Add note: "Working on it"<br/>Upload after-photo
    F->>A: PATCH /api/complaints/123/status/<br/>{status, note, photo}
    
    A->>A: Check permission<br/>(is complaint assigned<br/>to this officer?)
    A->>DB: Update complaint<br/>SET status='in_progress'
    A->>DB: Create StatusHistory entry<br/>(status, note, changed_by, timestamp)
    
    A->>N: Notify citizen<br/>(complaint #123 updated)
    N->>DB: Create Notification
    N-->>N: Send email to citizen
    
    A-->>F: 200 OK<br/>{updated complaint}
    F->>F: Refresh detail view
    F-->>O: "Status updated<br/>successfully!"
    
    Note over O,N: Citizen receives notification immediately
```

---

## FIGURE 4.9: DATA FLOW DIAGRAM - LEVEL 0 (CONTEXT)

### Mermaid Code:

```mermaid
graph TB
    subgraph External
        C[Citizen]
        O[Municipal Staff<br/>Officers & Dept Heads]
        A[Administrator]
    end
    
    C -->|Complaints<br/>Upvotes<br/>Confirmations| SYS
    SYS[CivicFix 311<br/>System] -->|Status Updates<br/>Notifications| C
    
    O -->|Status Updates<br/>Assignments<br/>Notes| SYS
    SYS -->|Complaint Queue<br/>Analytics| O
    
    A -->|User Management<br/>System Config| SYS
    SYS -->|Reports<br/>System Stats| A
    
    style SYS fill:#4a90e2,stroke:#333,stroke-width:4px,color:#fff
    style C fill:#27ae60,color:#fff
    style O fill:#e67e22,color:#fff
    style A fill:#e74c3c,color:#fff
```

### ASCII DFD Level 0:

```
                    ┌──────────────────────────┐
                    │                          │
    ┌──────────┐    │                          │    ┌──────────┐
    │          │───►│                          │◄───│          │
    │ Citizen  │    │    CivicFix 311         │    │Municipal │
    │          │◄───│       System            │───►│  Staff   │
    └──────────┘    │                          │    └──────────┘
                    │  (All Processing &       │
    Complaints,     │   Data Management)       │    Status Updates,
    Upvotes,        │                          │    Analytics,
    Confirmations   │                          │    Assignments
                    │                          │
                    │                          │    ┌──────────┐
                    │                          │◄───│          │
                    │                          │    │  Admin   │
                    │                          │───►│          │
                    └──────────────────────────┘    └──────────┘
                                                    
                                                    User Mgmt,
                                                    Reports,
                                                    System Config
```

---

## FIGURE 4.10: DATA FLOW DIAGRAM - LEVEL 1

### Mermaid Code:

```mermaid
graph TB
    C[Citizen] -->|1. Complaint Data| P1
    C -->|4. Upvote| P4
    
    P1[P1: Register &<br/>Submit Complaint]
    P1 -->|Complaint| D1[(D1: Complaints<br/>Database)]
    
    D1 -->|Complaint Info| P2[P2: Route to<br/>Department]
    P2 -->|Department Assignment| D2[(D2: Departments<br/>& Categories)]
    
    D2 -->|Category Info| P2
    
    DH[Dept Head] -->|3. Assignment| P3[P3: Assign<br/>to Officer]
    P3 -->|Assignment| D1
    
    D1 -->|Assigned Complaints| O[Field Officer]
    
    O -->|5. Status Update| P4[P4: Update &<br/>Notify]
    
    P4 -->|Updated Status| D1
    P4 -->|Notification| D3[(D3: Notifications)]
    
    D3 -->|Alert| C
    D3 -->|Alert| O
    
    D1 -->|Data| P5[P5: Generate<br/>Analytics]
    P5 -->|Stats & Charts| A[Administrator]
    
    style P1 fill:#3498db,color:#fff
    style P2 fill:#3498db,color:#fff
    style P3 fill:#3498db,color:#fff
    style P4 fill:#3498db,color:#fff
    style P5 fill:#3498db,color:#fff
    style D1 fill:#2ecc71,color:#fff
    style D2 fill:#2ecc71,color:#fff
    style D3 fill:#2ecc71,color:#fff
```

---

## FIGURE 5.1: TECHNOLOGY STACK OVERVIEW

### ASCII Diagram:

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND STACK                         │
├─────────────────────────────────────────────────────────────┤
│  React 18          │  Component-based UI library            │
│  React Router 6    │  Client-side routing                   │
│  Tailwind CSS 3    │  Utility-first styling                 │
│  Axios             │  HTTP client for API calls             │
│  Leaflet           │  Interactive maps                      │
│  Recharts          │  Data visualization charts             │
│  React Hot Toast   │  Notification toasts                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ REST API
                              │ (HTTPS/JSON)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND STACK                          │
├─────────────────────────────────────────────────────────────┤
│  Django 6.0        │  Web application framework             │
│  DRF 3.16          │  RESTful API toolkit                   │
│  SimpleJWT 5.3     │  JWT authentication                    │
│  Gunicorn          │  WSGI HTTP server                      │
│  WhiteNoise        │  Static file serving                   │
│  django-cors       │  CORS headers handling                 │
│  django-filters    │  Queryset filtering                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ SQL (ORM)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE                               │
├─────────────────────────────────────────────────────────────┤
│  PostgreSQL 14     │  Relational database                   │
│                    │  ACID transactions                     │
│                    │  Indexed queries                       │
│                    │  Foreign key constraints               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT STACK                         │
├─────────────────────────────────────────────────────────────┤
│  Docker            │  Application containerization          │
│  Docker Compose    │  Multi-container orchestration         │
│  Nginx             │  Reverse proxy & static serving        │
│  Git               │  Version control                       │
└─────────────────────────────────────────────────────────────┘
```

---

## FIGURE 5.4: SYSTEM INTEGRATION FLOW

### Mermaid Code:

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant React
    participant Axios
    participant Nginx
    participant Django
    participant PostgreSQL
    
    User->>Browser: Access http://localhost:3000
    Browser->>React: Load React App
    React->>Browser: Render Landing Page
    
    User->>Browser: Click Login
    Browser->>React: Navigate to /login
    React->>Browser: Show Login Form
    
    User->>Browser: Enter credentials & submit
    Browser->>React: Handle form submission
    React->>Axios: POST credentials
    Axios->>Nginx: HTTPS Request<br/>POST /api/auth/login/
    Nginx->>Django: Proxy to backend
    Django->>PostgreSQL: Query user
    PostgreSQL-->>Django: User data
    Django->>Django: Verify password<br/>Generate JWT tokens
    Django-->>Nginx: 200 OK + tokens
    Nginx-->>Axios: Response
    Axios->>React: Store tokens in localStorage
    React->>Browser: Redirect to /dashboard
    
    React->>Axios: GET /api/complaints/<br/>(with JWT header)
    Axios->>Nginx: HTTPS Request
    Nginx->>Django: Proxy with headers
    Django->>Django: Validate JWT
    Django->>PostgreSQL: Query complaints
    PostgreSQL-->>Django: Complaint data
    Django-->>Nginx: 200 OK + JSON
    Nginx-->>Axios: Response
    Axios->>React: Update state
    React->>Browser: Render dashboard<br/>with data
    Browser-->>User: Display dashboard
    
    Note over User,PostgreSQL: Complete flow: Login → Fetch Data → Display
```

---

## FIGURE 5.5-5.11: SCREENSHOT PLACEHOLDERS

### Instructions for Screenshots:

**Figure 5.5: Landing Page**
- Capture full-page screenshot at 1920x1080
- Show hero section with "CivicFix 311" branding
- Include "How It Works" section
- Annotate: Navigation menu, CTA buttons, Features section

**Figure 5.6: Login Page**
- Split-panel layout
- Left: Illustration/graphic
- Right: Login form with email/password fields
- Highlight "Demo credentials" note if present

**Figure 5.7: Dashboard**
- Summary statistics cards (4 cards showing Total, Pending, In Progress, Resolved)
- Trend line chart (30 days)
- Recent complaints table
- Annotate: "Summary Stats", "Trend Chart", "Recent Complaints"

**Figure 5.8: Complaint List**
- Table view with columns: ID, Title, Status, Priority, Upvotes, Date
- Show filters: Status dropdown, Ward dropdown, Search box
- Pagination controls at bottom
- Highlight one row to show clickable nature

**Figure 5.9: New Complaint Form**
- Multi-field form layout
- Show: Title, Description, Category dropdown, Address, Ward, Photo upload
- GPS coordinates fields
- "Fill Demo" button (if present)
- Submit button at bottom

**Figure 5.10: Map View**
- Full Leaflet map with multiple markers
- Marker cluster visible
- Popup showing complaint details when marker clicked
- Filter sidebar on left
- Legend for marker colors/priorities

**Figure 5.11: Analytics Dashboard**
- Multiple charts:
  - Status distribution pie chart
  - Category bar chart
  - Trend line graph
  - Department performance table
- Date range selector
- Export button (if present)

---

## DEPLOYMENT ARCHITECTURE DIAGRAM

### Mermaid Code:

```mermaid
graph TB
    subgraph "Production Server (Cloud)"
        subgraph "Docker Environment"
            C1[Container: Frontend<br/>React Build + Nginx<br/>Port 80]
            C2[Container: Backend<br/>Django + Gunicorn<br/>Port 8000]
            C3[Container: Database<br/>PostgreSQL<br/>Port 5432]
            
            V1[(Volume:<br/>postgres_data)]
            V2[(Volume:<br/>media_files)]
        end
        
        C1 -->|Proxy API calls| C2
        C2 -->|SQL Queries| C3
        C3 -.->|Persist| V1
        C2 -.->|Store uploads| V2
    end
    
    Internet((Internet)) -->|HTTPS| C1
    
    DevMachine[Developer Machine] -->|docker-compose up| Docker[Docker Compose]
    Docker -->|Orchestrates| C1
    Docker -->|Orchestrates| C2
    Docker -->|Orchestrates| C3
    
    style C1 fill:#61dafb,color:#000
    style C2 fill:#092e20,color:#fff
    style C3 fill:#336791,color:#fff
```

### ASCII Deployment:

```
┌──────────────────────────────────────────────────────────────┐
│              PRODUCTION SERVER (Cloud/VPS)                   │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Docker Compose Orchestration                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                          │                                   │
│     ┌────────────────────┼────────────────────┐             │
│     │                    │                    │             │
│  ┌──▼──────────┐  ┌──────▼──────┐  ┌─────────▼────┐        │
│  │  Container  │  │  Container  │  │  Container   │        │
│  │  frontend   │  │  backend    │  │  postgres    │        │
│  ├─────────────┤  ├─────────────┤  ├──────────────┤        │
│  │ Nginx       │  │ Django 6    │  │ PostgreSQL   │        │
│  │ :80         │  │ DRF         │  │ :5432        │        │
│  │             │  │ Gunicorn    │  │              │        │
│  │ React Build │  │ :8000       │  │ Database     │        │
│  │ (Static)    │  │             │  │              │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬───────┘        │
│         │                │                │                 │
│         │  Proxy /api    │                │                 │
│         └───────────────►│                │                 │
│                          │   SQL Queries  │                 │
│                          └───────────────►│                 │
│                                            │                 │
│  ┌──────────────────┐           ┌─────────▼────────┐        │
│  │ Volume:          │           │ Volume:          │        │
│  │ media_files      │◄──────────┤ postgres_data    │        │
│  │ (uploads)        │           │ (persistent DB)  │        │
│  └──────────────────┘           └──────────────────┘        │
└──────────────────────────────────────────────────────────────┘
                       ▲
                       │
                  HTTPS (443)
                       │
                  ┌────┴────┐
                  │ Internet│
                  │  Users  │
                  └─────────┘
```

---

## AUTHENTICATION FLOW DIAGRAM

### Mermaid Code:

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant DB as Database
    
    rect rgb(200, 220, 240)
        Note over U,DB: 1. LOGIN
        U->>F: Enter email & password
        F->>A: POST /api/auth/login/
        A->>DB: SELECT * FROM users<br/>WHERE email=?
        DB-->>A: User record
        A->>A: Verify password<br/>(PBKDF2 hash)
        A->>A: Generate JWT<br/>access + refresh tokens
        A-->>F: 200 {access, refresh, user}
        F->>F: localStorage.setItem(<br/>'access_token', ...)
        F-->>U: Redirect to dashboard
    end
    
    rect rgb(220, 240, 200)
        Note over U,DB: 2. AUTHENTICATED REQUEST
        U->>F: Navigate to complaints
        F->>F: token = localStorage<br/>.getItem('access_token')
        F->>A: GET /api/complaints/<br/>Authorization: Bearer {token}
        A->>A: Decode JWT<br/>Verify signature<br/>Check expiry
        A->>DB: Query complaints<br/>(filtered by user role)
        DB-->>A: Complaint data
        A-->>F: 200 {results: [...]}
        F-->>U: Display complaints
    end
    
    rect rgb(240, 200, 200)
        Note over U,DB: 3. TOKEN EXPIRED (After 2 hours)
        U->>F: Action requiring API call
        F->>A: GET /api/complaints/<br/>Bearer {expired_access}
        A->>A: Decode JWT → EXPIRED
        A-->>F: 401 Unauthorized
        F->>F: refresh = localStorage<br/>.getItem('refresh_token')
        F->>A: POST /api/auth/token/refresh/<br/>{refresh: refresh_token}
        A->>A: Verify refresh token<br/>Generate new access token
        A-->>F: 200 {access: new_token}
        F->>F: Update localStorage
        F->>A: Retry original request<br/>with new access token
        A-->>F: 200 {data}
        F-->>U: Success
    end
    
    rect rgb(240, 220, 200)
        Note over U,DB: 4. LOGOUT
        U->>F: Click Logout
        F->>F: localStorage.clear()
        F->>A: (Optional) Blacklist<br/>refresh token
        F-->>U: Redirect to /login
    end
```

---

## COMPLAINT LIFECYCLE STATE DIAGRAM

### Mermaid Code:

```mermaid
stateDiagram-v2
    [*] --> Submitted: Citizen creates<br/>complaint
    
    Submitted --> InProgress: Officer starts work
    Submitted --> Rejected: Officer/Dept Head<br/>rejects (invalid/duplicate)
    
    InProgress --> Resolved: Officer marks<br/>resolved (with photo)
    InProgress --> Submitted: Officer<br/>reassigns
    
    Resolved --> Confirmed: Citizen confirms<br/>& rates service
    Resolved --> InProgress: Citizen disputes<br/>resolution
    
    Confirmed --> Closed: Admin closes<br/>after confirmation
    
    Rejected --> [*]
    Closed --> [*]
    
    note right of Submitted
        Auto-assigned to department
        based on category
    end note
    
    note right of InProgress
        SLA monitoring active
        Escalate after 24 hours
    end note
    
    note right of Resolved
        Citizen notified
        Awaiting confirmation
    end note
```

---

## USER ROLE HIERARCHY

### ASCII Diagram:

```
                    ┌──────────────────┐
                    │  ADMINISTRATOR   │
                    │                  │
                    │  • Full access   │
                    │  • User mgmt     │
                    │  • All analytics │
                    └────────┬─────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
      ┌───────▼────────┐          ┌─────────▼────────┐
      │ DEPARTMENT HEAD │          │      CITIZEN     │
      │                 │          │                  │
      │ • Dept analytics│          │ • Submit issues  │
      │ • Assign to     │          │ • View all       │
      │   officers      │          │ • Upvote         │
      │ • Monitor SLA   │          │ • Track own      │
      └────────┬────────┘          └──────────────────┘
               │
       ┌───────▼────────┐
       │ FIELD OFFICER  │
       │                │
       │ • View assigned│
       │ • Update status│
       │ • Upload photos│
       │ • Add notes    │
       └────────────────┘

Access Control Matrix:

Feature              │ Citizen │ Officer │ Dept Head │ Admin │
─────────────────────┼─────────┼─────────┼───────────┼───────┤
Submit Complaint     │    ✓    │    ✗    │     ✗     │   ✗   │
View All Complaints  │    ✓    │    ✗    │     ✗     │   ✓   │
View Assigned        │    ✗    │    ✓    │     ✗     │   ✗   │
Update Status        │    ✗    │    ✓    │     ✓     │   ✓   │
Assign to Officer    │    ✗    │    ✗    │     ✓     │   ✓   │
Upvote Complaint     │    ✓    │    ✗    │     ✗     │   ✗   │
View Analytics       │    ✗    │    ✗    │     ✓     │   ✓   │
Manage Users         │    ✗    │    ✗    │     ✗     │   ✓   │
```

---

## HOW TO USE THESE DIAGRAMS

### Option 1: Render Mermaid Diagrams
1. Go to https://mermaid.live/
2. Paste the Mermaid code
3. Export as PNG or SVG
4. Insert image in Word document

### Option 2: Draw.io (Recommended for Professional Look)
1. Download Draw.io Desktop or use https://app.diagrams.net/
2. Follow the detailed instructions provided for each diagram
3. Use shapes: Rectangles (processes), Cylinders (databases), Diamonds (decisions), Actors (stick figures)
4. Export as PNG (300 DPI for print quality)
5. Insert in Word document

### Option 3: Microsoft Visio
1. Use Visio if available
2. Follow similar structure as Draw.io instructions
3. Use UML templates for ER diagrams and Use Cases
4. Use flowchart templates for DFDs

### Option 4: PowerPoint
1. Use SmartArt and shapes in PowerPoint
2. Create diagrams based on ASCII layouts
3. Export slides as images
4. Insert in Word

---

## DIAGRAM CHECKLIST FOR REPORT

- [ ] Figure 4.1: System Architecture Diagram
- [ ] Figure 4.2: Three-Tier Architecture
- [ ] Figure 4.3: Entity-Relationship Diagram
- [ ] Figure 4.4: Database Schema (use ER diagram + table list)
- [ ] Figure 4.5: Use Case Diagram - Citizen
- [ ] Figure 4.6: Use Case Diagram - Field Officer
- [ ] Figure 4.7: Sequence Diagram - Complaint Submission
- [ ] Figure 4.8: Sequence Diagram - Status Update
- [ ] Figure 4.9: Data Flow Diagram Level 0
- [ ] Figure 4.10: Data Flow Diagram Level 1
- [ ] Figure 4.11: UI Wireframe - Landing Page (screenshot)
- [ ] Figure 4.12: UI Wireframe - Dashboard (screenshot)
- [ ] Figure 5.1: Technology Stack Overview
- [ ] Figure 5.4: System Integration Flow
- [ ] Figures 5.5-5.11: Application Screenshots

---

All diagrams designed for CivicFix 311 BTech Project Report
Created: April 2026
