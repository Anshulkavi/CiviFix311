# CIVICFIX 311 - CHAPTERS 2-7
## (Continuation - Medicaps University Format)

---

# CHAPTER 2: REQUIREMENT ANALYSIS AND SYSTEM SPECIFICATION

## 2.1 Feasibility Study

A feasibility study is conducted to assess the practicality and viability of the proposed CivicFix 311 system across multiple dimensions before committing resources to full-scale development.

### 2.1.1 Technical Feasibility

**Objective:** Determine whether the required technology and technical expertise are available to build the system.

**Assessment:**

**Technology Availability:**
- **Backend Framework:** Django 6.0 is a mature, well-documented framework with extensive community support
- **Frontend Library:** React 18 is the industry standard with vast ecosystem and learning resources
- **Database:** PostgreSQL 14+ is proven reliable for government and enterprise applications
- **Authentication:** JWT (JSON Web Tokens) is a widely adopted standard with robust libraries
- **Mapping:** Leaflet is open-source with comprehensive documentation
- **All technologies have active communities and regular updates**

**Development Complexity:**
- RESTful API design follows well-established patterns
- Django REST Framework provides built-in serializers, authentication, and permissions
- React component-based architecture simplifies UI development
- JWT authentication has standard implementation in Django SimpleJWT
- Photo uploads supported natively by Django
- Map integration well-documented in React-Leaflet library

**Infrastructure Requirements:**
- **Development:** Can run on standard developer laptops (8GB RAM, 4 cores)
- **Production:** Modest cloud servers sufficient (2-4 GB RAM, 2 vCPU)
- **Database:** PostgreSQL handles millions of records efficiently
- **Storage:** File uploads scale with cloud storage (AWS S3, etc.)

**Team Expertise:**
- Python programming: Available
- JavaScript/React: Learnable within project timeline
- Database design: Covered in curriculum
- API development: Standard software engineering skill
- Deployment: Docker provides simplified deployment

**Risk Mitigation:**
- Extensive online documentation and tutorials available
- Stack Overflow has 100,000+ Django and React questions answered
- GitHub has numerous reference implementations
- Clear separation of frontend/backend enables parallel development

**Conclusion:** ✅ **Technically Feasible** - All required technologies are mature, well-documented, and accessible. Team has necessary skills or can acquire them within project timeline.

---

### 2.1.2 Economic Feasibility

**Objective:** Evaluate the cost-effectiveness and financial viability of developing and deploying the system.

**Development Costs:**

| Item | Cost | Justification |
|------|------|---------------|
| Development Tools (IDEs, editors) | ₹0 | VS Code, PyCharm Community - Free |
| Technologies (Django, React, PostgreSQL) | ₹0 | All open-source |
| Cloud Hosting (Development) | ₹500-1000/month | DigitalOcean, AWS Free Tier |
| Domain Name | ₹500-1000/year | .in domain |
| Learning Resources | ₹0 | Free documentation, tutorials |
| **Total Development Cost** | **< ₹15,000** | 4-month project |

**Deployment Costs (For Municipality - Annual):**

| Item | Cost (₹/year) | Notes |
|------|---------------|-------|
| Cloud Server (2 vCPU, 4GB RAM) | 36,000 - 60,000 | DigitalOcean, AWS, Azure |
| Managed PostgreSQL | 24,000 | Or included in server |
| Domain + SSL Certificate | 1,000 - 2,000 | Let's Encrypt SSL free |
| Backup Storage | 6,000 - 12,000 | Cloud storage |
| Maintenance (In-house staff) | 0 - 2,40,000 | Or external contractor |
| **Total Annual Cost** | **₹67,000 - ₹3,14,000** | Depends on scale |

**Cost Savings for Municipality:**

| Savings Area | Annual Savings (₹) |
|--------------|-------------------|
| Reduced call center staffing (2 staff) | 2,00,000 |
| Reduced paper/filing costs | 20,000 |
| Faster resolution reduces repeat complaints (30% efficiency) | 1,50,000 (indirect) |
| Optimized resource allocation (15% budget efficiency) | 5,00,000+ (large cities) |
| **Total Annual Savings** | **₹8,70,000+** |

**Return on Investment (ROI):**
- **Investment:** ₹67,000 - ₹3,14,000 annually
- **Savings:** ₹8,70,000+ annually
- **ROI:** System pays for itself in **1-4 months**
- **Long-term:** Continuous cost savings + improved governance value

**Comparison with Alternatives:**

| Option | Cost/Year | Limitations |
|--------|-----------|-------------|
| Commercial SaaS (SeeClickFix type) | ₹10-50 lakhs | Vendor lock-in, licensing fees |
| Custom Development (Agency) | ₹25-75 lakhs (one-time) + ₹5-10 lakhs (maintenance) | High initial cost |
| **CivicFix 311 (Open Source)** | **₹67,000 - ₹3,14,000** | **No licensing, customizable** |

**Conclusion:** ✅ **Economically Feasible** - Extremely cost-effective solution with ROI in months. Significantly cheaper than commercial alternatives while providing equal or better functionality.

---

### 2.1.3 Operational Feasibility

**Objective:** Assess whether the system can be successfully operated and adopted by intended users.

**User Adoption Analysis:**

**Citizens:**
- **Digital Literacy:** 750 million smartphone users in India (2024)
- **Readiness:** Widespread use of UPI, e-commerce, government apps (Aadhaar, DigiLocker)
- **Motivation:** Strong desire for better civic services
- **Barriers:** Varying digital literacy levels
- **Mitigation:** Simple UI, visual guides, helpline support, future vernacular languages

**Field Officers:**
- **Current State:** Many use WhatsApp for coordination already
- **Technical Comfort:** Moderate (smartphones common)
- **Training Need:** 2-4 hour orientation session
- **Resistance:** Potential pushback from status quo preference
- **Mitigation:** Clear benefits communication (organized workload, performance tracking), phased rollout, management support

**Department Heads:**
- **Current State:** Familiar with digital dashboards (email, basic software)
- **Motivation:** High (need for performance visibility)
- **Training Need:** 1-2 hour dashboard orientation
- **Adoption:** Expected to be smooth

**Administrators:**
- **Current State:** Experience with government portals
- **Motivation:** High (transparency goals, smart city initiatives)
- **Training Need:** Minimal
- **Adoption:** Champions of the system

**Integration with Existing Workflows:**

| Current Process | Proposed Process | Transition Ease |
|----------------|------------------|-----------------|
| Phone/walk-in complaints | Web/mobile submission | Easy (citizens opt-in) |
| Manual complaint registers | Database records | Moderate (parallel for 1 month) |
| Verbal officer assignment | Digital assignment | Easy (formalized process) |
| Self-reported completion | Photo evidence + citizen confirmation | Moderate (accountability increase) |

**Change Management Plan:**

**Phase 1 (Month 1): Pilot**
- Launch in 2-3 wards
- Intensive training for officers in pilot wards
- Gather feedback, iterate

**Phase 2 (Months 2-3): Citywide Rollout**
- Expand to all wards
- Ongoing training sessions
- Help desk support (phone/email)

**Phase 3 (Month 4+): Optimization**
- Based on usage data, improve features
- Address pain points
- Continuous improvement

**Support Infrastructure:**

- **Documentation:** User manuals for each role (PDF, video)
- **Training:** In-person sessions, online tutorials
- **Helpdesk:** Dedicated email/phone for technical issues
- **Community:** User forum for peer support

**Operational Requirements:**

- **Internet:** Required for real-time access (most areas have 4G coverage)
- **Devices:** Citizens - smartphones/computers; Officers - smartphones (provided by municipality if needed)
- **Backup:** Parallel phone/walk-in system for initial months

**Conclusion:** ✅ **Operationally Feasible** with proper change management. Phased rollout, training, and support infrastructure will ensure smooth adoption. Citizens are ready; staff need managed transition.

---

### 2.1.4 Legal and Ethical Feasibility

**Objective:** Ensure compliance with legal requirements and ethical standards.

**Legal Compliance:**

**1. IT Act 2000 & Amendments**
- **Compliance:** System adheres to electronic record requirements
- **Digital Signatures:** Not required for civic complaints (non-financial)
- **Data Protection:** Follows best practices pending India's Data Protection law

**2. Right to Information Act 2005**
- **Compliance:** Public complaint visibility aligns with RTI principles
- **Transparency:** All complaints visible to public (addresses shown, personal details protected)
- **Accountability:** Audit trail maintained

**3. Personal Data Protection**
- **Data Collected:** Name, email, phone, address (minimal necessary data)
- **Sensitive Data:** None (no Aadhaar, financial, health data)
- **Consent:** Explicit consent during registration
- **Purpose Limitation:** Data used only for complaint management
- **Data Minimization:** Only essential fields collected
- **Retention:** Configurable (e.g., 5 years for audit purposes)

**4. Indian Copyright Act**
- **Open Source:** All technologies used are open-source (MIT, Apache licenses)
- **Original Work:** System design and code are original
- **Attribution:** Proper attribution for libraries used

**Security Compliance:**

**1. Password Security**
- **Hashing:** PBKDF2_SHA256 (Django default)
- **Strength:** Minimum 8 characters, complexity requirements
- **Storage:** Never stored in plain text

**2. Data Encryption**
- **In Transit:** HTTPS/TLS 1.2+ (production)
- **At Rest:** Database encryption optional (PostgreSQL supports)
- **Tokens:** JWT signed with secret key

**3. SQL Injection Prevention**
- **ORM:** Django ORM parameterizes all queries
- **Validation:** Input sanitization at serializer level

**4. XSS Prevention**
- **React:** Auto-escapes all user input
- **CSP Headers:** Content Security Policy implemented

**Ethical Considerations:**

**1. Privacy**
- **Complaint Details:** Public (addresses, photos of infrastructure)
- **Personal Info:** Protected (phone, email not displayed publicly)
- **Anonymity Option:** Future feature for sensitive reports

**2. Accessibility**
- **WCAG Compliance:** Aim for Level AA
- **Keyboard Navigation:** Supported
- **Screen Readers:** Semantic HTML for compatibility

**3. Fairness**
- **Equal Access:** No discrimination based on location, demographics
- **Transparent Prioritization:** Algorithm-based (upvotes + SLA), not influence-based
- **Data Use:** Aggregated data for planning, not individual profiling

**4. Accountability**
- **Audit Trail:** Every action logged (who, what, when)
- **Dispute Resolution:** Citizens can dispute resolved status
- **Transparency:** System logic open to scrutiny

**5. Environmental**
- **Paperless:** Reduces paper waste significantly
- **Energy Efficient:** Cloud servers optimized for energy efficiency

**Intellectual Property:**

- **Ownership:** Code developed by student, owned by student/university (as per university policy)
- **License:** Can be open-sourced (MIT/Apache license) for public benefit
- **Municipality Use:** Free to use, modify, redistribute

**Conclusion:** ✅ **Legally and Ethically Feasible** - System complies with Indian laws (IT Act, RTI). Follows data protection best practices. Ethical considerations (privacy, fairness, accessibility) built into design. No legal barriers to deployment.

---

### 2.1.5 Schedule Feasibility

**Objective:** Determine if the project can be completed within the available timeframe.

**Academic Timeline:** January - June 2026 (20 weeks available)

**Project Timeline:**

| Phase | Duration | Weeks | Deliverables |
|-------|----------|-------|--------------|
| **Requirements & Design** | 2 weeks | 1-2 | SRS, Architecture, Database schema, Wireframes |
| **Sprint 1: Foundation** | 2 weeks | 3-4 | User auth, Basic CRUD APIs, Database setup |
| **Sprint 2: Core Features** | 2 weeks | 5-6 | Complaint submission, Routing, Frontend pages |
| **Sprint 3: Management** | 2 weeks | 7-8 | Assignment, Status updates, Notifications, Dashboard |
| **Sprint 4: Advanced** | 2 weeks | 9-10 | Map, Upvoting, Analytics, Filters |
| **Sprint 5: Testing & Deployment** | 2 weeks | 11-12 | Comprehensive testing, Docker, Documentation |
| **Buffer & Documentation** | 2 weeks | 13-14 | Report writing, Presentation preparation |
| **Final Review** | 1 week | 15 | Guide review, revisions |
| **Submission Preparation** | 1 week | 16 | Printing, binding, final submission |
| **Presentation Preparation** | 1 week | 17 | PPT, demo rehearsal |
| **Buffer** | 3 weeks | 18-20 | Contingency for delays |

**Critical Path:**
1. Database Design (Week 1-2) - Blocks all development
2. User Authentication (Week 3-4) - Blocks complaint features
3. Complaint CRUD (Week 5-6) - Blocks status updates
4. Integration (Week 11-12) - Blocks final testing

**Risk Mitigation:**
- **3-week buffer** for unexpected delays
- **Parallel development** where possible (frontend + backend)
- **Incremental delivery** ensures working system at each sprint
- **Daily progress** tracking to catch delays early

**Conclusion:** ✅ **Schedule Feasible** - 20-week timeline sufficient for development, testing, and documentation with adequate buffer for contingencies.

---

### 2.1.6 Overall Feasibility Conclusion

| Feasibility Dimension | Assessment | Confidence |
|----------------------|------------|------------|
| Technical | ✅ Feasible | High |
| Economic | ✅ Feasible | Very High |
| Operational | ✅ Feasible | High |
| Legal & Ethical | ✅ Feasible | Very High |
| Schedule | ✅ Feasible | High |
| **Overall** | **✅ FEASIBLE** | **HIGH** |

**Recommendation:** **PROCEED** with full-scale development of CivicFix 311. All feasibility dimensions show positive outcomes with manageable risks.

---

## 2.2 Software Requirement Specification (SRS)

### 2.2.1 Purpose

This Software Requirement Specification (SRS) document provides a complete description of the CivicFix 311 system. It specifies the functional and non-functional requirements, hardware and software requirements, and serves as a contract between the development team and stakeholders.

### 2.2.2 Scope

**Product Name:** CivicFix 311  
**Product Description:** A web-based civic complaint management system for Indian municipalities

**Benefits:**
- Citizens: Convenient complaint submission, real-time tracking, transparency
- Officers: Organized task management, clear accountability
- Government: Data-driven governance, improved citizen satisfaction

**Goals:**
- Digitize complete complaint lifecycle
- Achieve 99% system uptime
- Support 1000+ concurrent users
- Reduce average resolution time by 50%

### 2.2.3 Hardware Requirements

**Table 1: Hardware Requirements**

| Component | Development Environment | Production Environment (Small City) | Production Environment (Large City) |
|-----------|------------------------|-------------------------------------|-------------------------------------|
| **Server** | | | |
| Processor | Personal laptop (i5/Ryzen 5) | 2 vCPU (Cloud server) | 4+ vCPU (Cloud server) |
| RAM | 8 GB | 4 GB | 8-16 GB |
| Storage | 50 GB (local) | 50 GB SSD | 200 GB SSD |
| Bandwidth | Personal internet | 1 TB/month | 5 TB/month |
| **Database Server** | | | |
| Processor | Included in server | 1-2 vCPU | 2-4 vCPU |
| RAM | Included | 2 GB | 4-8 GB |
| Storage | Included | 20 GB | 100+ GB |
| **Client** | | | |
| Device | Any device with browser | Smartphone (4G+) / Desktop | Smartphone / Desktop / Tablet |
| Screen | 1920x1080 (dev) | 375px+ width | 375px+ width |
| Network | WiFi/4G | 4G/Broadband | 4G/Broadband |

### 2.2.4 Software Requirements

**Table 2: Software Requirements**

| Category | Component | Version | Purpose |
|----------|-----------|---------|---------|
| **Operating System** | | | |
| Development | Windows 10/11, macOS, Linux | Latest | Development environment |
| Production | Ubuntu Server | 20.04 LTS+ | Server OS |
| **Backend** | | | |
| Framework | Django | 6.0+ | Web framework |
| REST API | Django REST Framework | 3.16+ | API development |
| Database | PostgreSQL | 14+ | Data storage |
| Authentication | djangorestframework-simplejwt | 5.3+ | JWT tokens |
| WSGI Server | Gunicorn | Latest | Production server |
| Static Files | WhiteNoise | Latest | Serve static files |
| **Frontend** | | | |
| Library | React | 18.2+ | UI framework |
| Routing | React Router | 6+ | Client-side routing |
| Styling | Tailwind CSS | 3+ | Utility-first CSS |
| HTTP Client | Axios | 1+ | API requests |
| Maps | Leaflet | 1.9+ | Interactive maps |
| | react-leaflet | 4+ | React wrapper for Leaflet |
| Charts | Recharts | 2.5+ | Data visualization |
| Notifications | react-hot-toast | 2+ | Toast messages |
| **Development Tools** | | | |
| Language (Backend) | Python | 3.11+ | Programming language |
| Language (Frontend) | JavaScript (ES6+) | - | Programming language |
| Package Manager | pip (Python), npm (Node) | Latest | Dependency management |
| Version Control | Git | Latest | Source control |
| IDE | VS Code / PyCharm | Latest | Code editor |
| API Testing | Postman | Latest | API testing |
| **Deployment** | | | |
| Containerization | Docker | Latest | Container platform |
| Orchestration | Docker Compose | Latest | Multi-container setup |
| Web Server | Nginx | Latest | Reverse proxy |
| **Browsers (Client)** | | | |
| Chrome | Google Chrome | 90+ | Primary browser |
| Firefox | Mozilla Firefox | 88+ | Secondary browser |
| Safari | Safari | 14+ | macOS/iOS |
| Edge | Microsoft Edge | 90+ | Windows |

---

### 2.2.5 Functional Requirements

**Table 3: Functional Requirements**

| Req ID | Module | Requirement Description | Priority | Acceptance Criteria |
|--------|--------|------------------------|----------|---------------------|
| **FR-1** | **User Management** | | | |
| FR-1.1 | Registration | System shall allow public registration with email, name, phone, password | High | User account created with role='citizen' |
| FR-1.2 | Login | System shall authenticate users with email/password and issue JWT tokens | High | Access and refresh tokens returned |
| FR-1.3 | Profile View | Users shall view their profile (name, email, phone, ward, avatar, role) | Medium | Profile data displayed correctly |
| FR-1.4 | Profile Edit | Users shall update name, phone, ward, avatar | Medium | Changes saved to database |
| FR-1.5 | Password Change | Users shall change password with current password verification | High | Password updated, re-login required |
| FR-1.6 | Role Management | System shall support 4 roles: citizen, field_officer, dept_head, admin | High | Role-based access working |
| FR-1.7 | User List (Admin) | Admins shall view all users with search and filters | High | Paginated user list displayed |
| FR-1.8 | User Edit (Admin) | Admins shall edit user roles and details | High | User details updated |
| FR-1.9 | User Delete (Admin) | Admins shall deactivate/delete user accounts | Medium | User account deactivated |
| **FR-2** | **Complaint Management** | | | |
| FR-2.1 | Complaint Submission | Citizens shall submit complaints with title, description, category, address, GPS, ward, photo | High | Complaint created with status='submitted' |
| FR-2.2 | Auto Routing | System shall auto-assign complaints to departments based on category | High | Department assigned correctly |
| FR-2.3 | Complaint List | Users shall view complaints filtered by role (citizens: all, officers: assigned, dept heads: department, admin: all) | High | Correct complaints displayed per role |
| FR-2.4 | Complaint Detail | Users shall view full complaint details including status history | High | All fields and history shown |
| FR-2.5 | Search | Users shall search complaints by ID, title, description, address | Medium | Search results accurate |
| FR-2.6 | Filters | Users shall filter by status, priority, ward, category, date range | Medium | Filtered results correct |
| FR-2.7 | Sorting | Users shall sort by created_at, upvote_count | Medium | Sorted results displayed |
| FR-2.8 | Pagination | Complaint lists shall paginate (20 per page) | Medium | Pagination controls working |
| FR-2.9 | Assignment | Dept heads shall assign complaints to field officers | High | Officer assigned, notified |
| FR-2.10 | Status Update | Officers shall update status with notes and after-photo | High | Status changed, history recorded |
| FR-2.11 | Rejection | Officers/dept heads shall reject complaints with reason | Medium | Status='rejected', reason saved |
| FR-2.12 | Confirmation | Citizens shall confirm resolution | High | Status='confirmed', rating saved |
| FR-2.13 | Rating | Citizens shall rate resolution (1-5 stars) | Low | Rating saved |
| **FR-3** | **Community Features** | | | |
| FR-3.1 | Public Visibility | All complaints shall be visible to all authenticated users | High | Any user can view any complaint |
| FR-3.2 | Upvoting | Citizens shall upvote any complaint | High | Upvote toggled, count updated |
| FR-3.3 | Upvote Count | System shall display upvote count on complaint cards | High | Count displayed correctly |
| FR-3.4 | Auto Escalation | System shall auto-escalate priority: 50 upvotes→medium, 100→high | Medium | Priority changes automatically |
| FR-3.5 | Map View | System shall display complaints on interactive map | High | Map shows markers at correct GPS |
| FR-3.6 | Map Filters | Map shall support status, priority, ward filters | Medium | Filtered markers displayed |
| FR-3.7 | Map Popup | Clicking marker shall show complaint summary | High | Popup with details appears |
| **FR-4** | **Notifications** | | | |
| FR-4.1 | In-App Notifications | System shall create notifications for status changes, assignments | High | Notification created in DB |
| FR-4.2 | Notification List | Users shall view notification inbox | Medium | All user's notifications listed |
| FR-4.3 | Mark Read | Users shall mark notifications as read | Medium | is_read flag updated |
| FR-4.4 | Unread Count | System shall display unread notification count | Low | Badge shows correct count |
| FR-4.5 | Email Notifications | System shall send emails for key events (status change, assignment) | Medium | Email sent successfully |
| **FR-5** | **Analytics** | | | |
| FR-5.1 | Summary Stats | Dashboard shall show total, pending, in_progress, resolved counts | High | Correct counts displayed |
| FR-5.2 | Trend Charts | System shall generate line charts for 7/14/30/60-day trends | Medium | Chart shows complaint count over time |
| FR-5.3 | Category Breakdown | System shall show pie/bar chart of complaints by category | Medium | Chart accurate |
| FR-5.4 | Dept Performance | System shall show department resolution rates (admin/dept head only) | Medium | Dept stats calculated correctly |
| FR-5.5 | Ward Heatmap Data | System shall provide ward-wise complaint counts | Low | Ward data accurate |
| FR-5.6 | Status Distribution | System shall show pie chart of status distribution | Low | Chart matches database |
| **FR-6** | **SLA & Escalation** | | | |
| FR-6.1 | SLA Tracking | System shall track hours since complaint submission | High | Time calculated correctly |
| FR-6.2 | SLA Configuration | Admins shall configure SLA hours per category | Medium | SLA hours saved |
| FR-6.3 | SLA Breach Detection | System shall flag complaints exceeding SLA | Medium | Breaches identified |
| FR-6.4 | Escalation Alerts | System shall notify dept heads of SLA breaches | Medium | Notification sent |
| **FR-7** | **Categories & Departments** | | | |
| FR-7.1 | Category List | System shall provide API to list all categories | High | All categories returned |
| FR-7.2 | Department List | System shall provide API to list all departments | High | All departments returned |
| FR-7.3 | Category-Dept Link | Each category shall be linked to a department | High | Auto-routing works |
| FR-7.4 | Seed Data | System shall have command to seed initial categories/departments | High | seed_demo command works |

---

### 2.2.6 Non-Functional Requirements

**Table 4: Non-Functional Requirements**

| Req ID | Category | Requirement | Metric | Acceptance Criteria |
|--------|----------|-------------|--------|---------------------|
| **NFR-1** | **Performance** | | | |
| NFR-1.1 | API Response Time | 95% of API requests shall complete within 500ms | < 500ms | Load testing confirms |
| NFR-1.2 | Page Load Time | Frontend pages shall load within 3 seconds on 4G | < 3s | Lighthouse score 90+ |
| NFR-1.3 | Concurrent Users | System shall support 150+ concurrent users without degradation | 150+ users | JMeter load test passes |
| NFR-1.4 | Database Queries | 95% of queries shall execute within 100ms | < 100ms | Django Debug Toolbar confirms |
| NFR-1.5 | File Upload | Photo uploads shall complete within 5 seconds for 5MB files | < 5s | Timed tests pass |
| **NFR-2** | **Scalability** | | | |
| NFR-2.1 | Data Volume | Database shall handle 100,000+ complaints efficiently | 100K+ records | Query performance maintained |
| NFR-2.2 | Horizontal Scaling | Architecture shall support adding more servers | Stateless design | Docker scaling works |
| NFR-2.3 | Pagination | Lists shall paginate to handle large datasets | 20 items/page | Memory usage stable |
| **NFR-3** | **Security** | | | |
| NFR-3.1 | Authentication | System shall use JWT tokens with 2-hour access, 7-day refresh | JWT standard | Token verification works |
| NFR-3.2 | Authorization | System shall enforce role-based permissions on all endpoints | RBAC | Permission tests pass |
| NFR-3.3 | Password Security | Passwords shall be hashed with PBKDF2_SHA256 | Django default | Passwords never stored plain |
| NFR-3.4 | HTTPS | Production shall enforce HTTPS for all traffic | TLS 1.2+ | SSL certificate valid |
| NFR-3.5 | SQL Injection | System shall prevent SQL injection via ORM | Parameterized queries | Security audit passes |
| NFR-3.6 | XSS Prevention | Frontend shall escape all user inputs | React auto-escape | XSS audit passes |
| NFR-3.7 | CSRF Protection | Backend shall implement CSRF tokens for state-changing requests | Django middleware | CSRF tests pass |
| NFR-3.8 | File Validation | Uploads shall validate file type (images only) and size (< 5MB) | Server-side validation | Invalid files rejected |
| NFR-3.9 | Token Blacklisting | Refresh tokens shall be blacklisted on rotation | SimpleJWT blacklist | Tokens invalidated correctly |
| **NFR-4** | **Usability** | | | |
| NFR-4.1 | Responsive Design | UI shall work on desktop (1920px), tablet (768px), mobile (375px) | 3 breakpoints | Visual testing confirms |
| NFR-4.2 | Task Efficiency | Common tasks shall require ≤ 3 clicks | ≤ 3 clicks | Usability testing |
| NFR-4.3 | Consistency | UI shall maintain consistent design (colors, fonts, spacing) | Design system | Visual audit passes |
| NFR-4.4 | Immediate Feedback | All user actions shall provide immediate visual feedback | < 100ms | Toast messages, spinners |
| NFR-4.5 | Error Messages | Error messages shall be clear and actionable | User testing | Messages understandable |
| NFR-4.6 | Intuitive Navigation | Users shall complete first-time tasks without help | UAT | 80%+ success rate |
| **NFR-5** | **Reliability** | | | |
| NFR-5.1 | System Uptime | System shall maintain 99% uptime (excluding maintenance) | 99% | Monitoring confirms |
| NFR-5.2 | Data Integrity | Database transactions shall be ACID-compliant | PostgreSQL ACID | No data corruption |
| NFR-5.3 | Backup | Database backups shall occur daily with 30-day retention | Daily | Automated backups |
| NFR-5.4 | Error Handling | System shall gracefully handle errors without stack trace exposure | User-friendly errors | Production errors hidden |
| NFR-5.5 | Failover | Critical services shall restart automatically on failure | Docker restart policy | Services recover |
| **NFR-6** | **Maintainability** | | | |
| NFR-6.1 | Code Quality | Code shall follow PEP 8 (Python) and ESLint (JavaScript) | Linter compliance | Linters pass |
| NFR-6.2 | Documentation | All APIs shall have docstrings and serializer documentation | 100% coverage | Docs complete |
| NFR-6.3 | Modularity | System shall use modular architecture (Django apps, React components) | Separation of concerns | Code review confirms |
| NFR-6.4 | Version Control | All code shall be tracked in Git with meaningful commits | Git history | Commits descriptive |
| NFR-6.5 | Logging | System shall log errors, warnings, and key actions | Django logging | Logs useful for debugging |
| **NFR-7** | **Compatibility** | | | |
| NFR-7.1 | Browser Support | System shall work on Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ | 4 browsers | Cross-browser testing |
| NFR-7.2 | Device Support | System shall work on iOS 14+, Android 10+, Windows 10+, macOS 11+ | Cross-platform | Device testing |
| NFR-7.3 | Screen Sizes | UI shall adapt to screen widths 320px to 2560px | Responsive | Visual testing |
| **NFR-8** | **Accessibility** | | | |
| NFR-8.1 | Standards | UI shall aim for WCAG 2.1 Level AA compliance | WCAG AA | Accessibility audit |
| NFR-8.2 | Keyboard Navigation | All functionality shall be accessible via keyboard | Tab navigation | Keyboard-only test |
| NFR-8.3 | Color Contrast | Text shall have minimum 4.5:1 contrast ratio | 4.5:1 | Contrast checker |
| **NFR-9** | **Portability** | | | |
| NFR-9.1 | Containerization | All components shall run in Docker containers | Dockerfile present | docker-compose up works |
| NFR-9.2 | Configuration | Environment-specific settings via .env files | 12-factor app | Config externalized |
| NFR-9.3 | Database Migration | System shall work with any PostgreSQL 14+ instance | Standard SQL | DB portable |

---

## 2.3 Validation

### 2.3.1 Requirement Validation Techniques

Requirements validation ensures that the specified requirements are correct, complete, consistent, and testable.

**Techniques Used:**

**1. Reviews and Walkthroughs**
- **Requirement Review Sessions:** Guide and peer review of SRS document
- **Stakeholder Validation:** Simulated stakeholder (citizen, officer, admin) perspective analysis
- **Checklist-Based Review:** Systematic check against requirement quality criteria

**Quality Checklist:**
- [ ] Is the requirement necessary? (Each requirement traces to a problem)
- [ ] Is it unambiguous? (Single interpretation)
- [ ] Is it testable? (Acceptance criteria defined)
- [ ] Is it feasible? (Can be implemented with available technology)
- [ ] Is it consistent? (No conflicts with other requirements)
- [ ] Is it complete? (All necessary details present)

**2. Prototyping**
- **UI Wireframes:** Created using Figma/Draw.io to validate interface requirements
- **Database Schema:** Designed and reviewed for completeness
- **API Endpoint List:** Documented all required APIs
- **Stakeholder Feedback:** Simulated user feedback on wireframes

**3. Test Case Derivation**
- For each functional requirement, test cases derived
- Example: FR-2.1 (Complaint Submission) → Test cases:
  - Valid submission with all fields
  - Submission without photo (should succeed)
  - Submission without GPS (should fail)
  - Invalid category ID (should fail)

**4. Traceability Matrix**

| Requirement | Design Element | Implementation | Test Case |
|-------------|---------------|----------------|-----------|
| FR-1.1 Register | RegisterSerializer | users/views.py | TC-U-01 |
| FR-2.1 Submit Complaint | ComplaintSerializer | complaints/views.py | TC-C-01 |
| FR-3.2 Upvote | UpvoteView | complaints/views.py | TC-C-10 |
| FR-5.1 Dashboard | AnalyticsSummaryView | analytics/views.py | TC-A-01 |

**5. Consistency Checking**
- **Cross-Check:** Functional requirements vs. Non-functional (e.g., FR-2.1 requires file upload, NFR-3.8 validates file upload)
- **Role Consistency:** Ensure role-based requirements don't conflict (e.g., citizen can't assign officers)
- **Data Consistency:** Database fields support all required operations

### 2.3.2 Validation Results

**Completeness:** ✅ All user stories covered by requirements  
**Correctness:** ✅ Requirements align with problem statement  
**Consistency:** ✅ No conflicting requirements identified  
**Testability:** ✅ All requirements have measurable acceptance criteria  
**Feasibility:** ✅ All requirements implementable with chosen tech stack  

**Issues Identified and Resolved:**
1. **Issue:** Initial requirement for video upload  
   **Resolution:** Removed due to bandwidth and storage constraints (future scope)

2. **Issue:** Real-time updates via WebSocket in initial requirements  
   **Resolution:** Deferred to future scope; polling sufficient for MVP

3. **Issue:** Multi-language support in initial requirements  
   **Resolution:** English-only MVP; i18n planned for future

---

## 2.4 Expected Hurdles

### 2.4.1 Technical Hurdles

**1. JWT Token Management**
- **Challenge:** Handling token expiry, refresh mechanism, blacklisting
- **Mitigation:** Use `djangorestframework-simplejwt` library (battle-tested); implement automatic refresh in Axios interceptor
- **Contingency:** Detailed documentation review, fallback to session-based auth if JWT proves complex

**2. Map Integration**
- **Challenge:** Leaflet marker clustering, popup performance with 1000+ complaints
- **Mitigation:** Use `react-leaflet-cluster` library; implement lazy loading
- **Contingency:** Limit map to 500 complaints per view, use server-side clustering

**3. Photo Upload & Storage**
- **Challenge:** Large file sizes, storage management, image optimization
- **Mitigation:** Client-side validation (< 5MB); server-side compression; use Django media handling
- **Contingency:** External storage (AWS S3) if local storage insufficient

**4. Database Query Performance**
- **Challenge:** Slow queries with 10,000+ complaints
- **Mitigation:** Proper indexing on foreign keys, status, created_at; use `select_related` and `prefetch_related`
- **Contingency:** Database query profiling with Django Debug Toolbar; add composite indexes

**5. Cross-Browser Compatibility**
- **Challenge:** CSS inconsistencies, JavaScript compatibility across browsers
- **Mitigation:** Tailwind CSS (handles prefixing); Babel transpilation for JS
- **Contingency:** Progressive enhancement; prioritize Chrome/Firefox, graceful degradation for Safari

### 2.4.2 Development Hurdles

**1. Learning Curve**
- **Challenge:** React and Django REST Framework are new technologies
- **Mitigation:** Allocate Week 1-2 for tutorials, documentation study; start with simple CRUD
- **Contingency:** Use well-documented patterns; seek help from online communities (Stack Overflow)

**2. Time Management**
- **Challenge:** Balancing project with other courses and exams
- **Mitigation:** Detailed sprint planning; daily 2-hour minimum commitment; weekend intensive work
- **Contingency:** 3-week buffer in timeline; prioritize MVP features, defer nice-to-haves

**3. Integration Complexity**
- **Challenge:** Frontend-backend integration, CORS issues, API contract mismatches
- **Mitigation:** API-first development; Postman testing before frontend integration; clear API documentation
- **Contingency:** Mock API responses for frontend development; fix integration in final sprint

**4. Debugging**
- **Challenge:** Distributed system debugging (React + Django + PostgreSQL)
- **Mitigation:** Extensive logging (Django logging framework); Chrome DevTools; database query logs
- **Contingency:** Simplified architecture if debugging becomes overwhelming (monolithic frontend-backend initially)

### 2.4.3 Deployment Hurdles

**1. Docker Configuration**
- **Challenge:** Multi-container orchestration, environment variables, networking
- **Mitigation:** Follow official Docker documentation; use docker-compose templates
- **Contingency:** Manual deployment without Docker if containerization proves too complex

**2. Production Database Setup**
- **Challenge:** PostgreSQL configuration, user permissions, connection pooling
- **Mitigation:** Use managed PostgreSQL (Supabase, ElephantSQL free tier) for simplicity
- **Contingency:** SQLite for demo (not recommended for production but works for presentation)

**3. HTTPS/SSL Configuration**
- **Challenge:** SSL certificate setup, HTTPS enforcement
- **Mitigation:** Use Let's Encrypt free certificates; Nginx configuration guides
- **Contingency:** HTTP for local demo; HTTPS for production deployment (optional)

### 2.4.4 User Adoption Hurdles

**1. Digital Literacy**
- **Challenge:** Some citizens/officers may struggle with web interface
- **Mitigation:** Intuitive UI design; visual guides; video tutorials
- **Contingency:** Helpline support; parallel traditional system for transitional period

**2. Resistance to Change**
- **Challenge:** Officers comfortable with status quo may resist digital system
- **Mitigation:** Demonstrate clear benefits (organized workload, accountability); management buy-in
- **Contingency:** Gradual rollout; keep parallel manual system initially

**3. Data Quality**
- **Challenge:** Users may submit incomplete or spam complaints
- **Mitigation:** Form validation; required fields; photo evidence encouragement; admin moderation
- **Contingency:** Manual review queue; auto-rejection of obvious spam

### 2.4.5 Risk Mitigation Summary

| Risk | Probability | Impact | Mitigation Strategy | Contingency |
|------|-------------|--------|---------------------|-------------|
| JWT complexity | Medium | High | Use well-tested library | Session auth fallback |
| Map performance | Low | Medium | Clustering, lazy load | Limit markers shown |
| Time overrun | Medium | High | Detailed planning, buffer | Prioritize MVP, defer extras |
| Browser issues | Low | Medium | Tailwind, Babel | Focus on Chrome/Firefox |
| Deployment complexity | Medium | Medium | Docker tutorials, managed DB | Manual deployment |
| User resistance | Medium | Medium | Training, benefits demo | Parallel traditional system |

---

## 2.5 SDLC Model

### 2.5.1 Selected Model: Agile (Iterative and Incremental)

**Justification:**

CivicFix 311 development follows the **Agile Iterative and Incremental** model for the following reasons:

**1. Evolving Requirements**
- Civic tech requirements may evolve based on user feedback
- Ability to incorporate changes mid-development is crucial
- Waterfall's rigidity unsuitable for exploratory project

**2. Early Deliverables**
- Working software available after each sprint (2 weeks)
- Allows for early testing and feedback
- Reduces risk of major failures at end

**3. Risk Mitigation**
- High-risk features (map, JWT auth) tackled early
- Issues identified and resolved incrementally
- Continuous integration reduces integration shock

**4. Flexibility**
- Can reprioritize features based on progress
- Nice-to-have features can be deferred if time-constrained
- Adapts to unforeseen challenges

**5. Academic Environment**
- Regular guide reviews align with sprint demos
- Progress trackable for academic assessment
- Learning happens incrementally (not all upfront)

### 2.5.2 Agile Principles Applied

1. **Iterative Development:** 5 sprints of 2 weeks each
2. **Incremental Delivery:** Each sprint adds working features
3. **Continuous Testing:** Testing after each sprint
4. **Refactoring:** Code improvements in each iteration
5. **User Feedback:** UAT after Sprint 5
6. **Prioritization:** MVP features first, enhancements later

### 2.5.3 Sprint Planning

**Sprint 1 (Weeks 3-4): Foundation**
- **Goal:** Basic infrastructure ready
- **Features:**
  - User registration and login (JWT)
  - Database models (User, Department, Category, Complaint)
  - Basic API endpoints (auth, complaint CRUD)
  - Frontend routing setup
- **Deliverables:** Users can register, login, submit dummy complaints
- **Testing:** Unit tests for models, API endpoint tests

**Sprint 2 (Weeks 5-6): Core Complaint Features**
- **Goal:** Citizens can submit real complaints
- **Features:**
  - Complaint submission with photo upload
  - GPS coordinate capture
  - Auto department routing
  - Frontend: Landing, Login, Register, New Complaint pages
- **Deliverables:** Complete complaint submission flow
- **Testing:** Integration tests for complaint creation

**Sprint 3 (Weeks 7-8): Management Features**
- **Goal:** Officers can manage complaints
- **Features:**
  - Officer assignment by dept head
  - Status update with notes and photos
  - Notifications (in-app + email)
  - Dashboard with basic stats
  - Frontend: Dashboard, Complaints List, Complaint Detail
- **Deliverables:** Complete workflow from submission to resolution
- **Testing:** End-to-end workflow testing

**Sprint 4 (Weeks 9-10): Advanced Features**
- **Goal:** Community engagement and analytics
- **Features:**
  - Map view with Leaflet integration
  - Upvoting system with auto-escalation
  - Analytics dashboards (trends, breakdowns)
  - Search, filters, pagination
  - Frontend: Map, Analytics, Profile, Admin Users pages
- **Deliverables:** Full-featured system
- **Testing:** Performance testing, security audit

**Sprint 5 (Weeks 11-12): Testing & Deployment**
- **Goal:** Production-ready system
- **Features:**
  - Comprehensive testing (95%+ coverage)
  - Bug fixes from UAT
  - Docker containerization
  - Deployment configuration (Nginx, Gunicorn)
  - Documentation (README, API docs)
- **Deliverables:** Deployed system, complete documentation
- **Testing:** UAT, load testing, final system testing

### 2.5.4 Agile Ceremonies (Adapted for Solo Project)

**Daily Standup (Self):**
- 15-minute self-review each morning
- What did I accomplish yesterday?
- What will I do today?
- Any blockers?

**Sprint Planning:**
- Before each sprint: Define features, create tasks
- Estimate effort (hours)
- Set sprint goal

**Sprint Review:**
- End of sprint: Demo to guide (if available)
- Review completed features
- Document lessons learned

**Sprint Retrospective:**
- What went well?
- What can be improved?
- Action items for next sprint

**Backlog Grooming:**
- Maintain prioritized feature list
- Refine requirements as understanding grows
- Add/remove features based on progress

### 2.5.5 Comparison with Other Models

| Model | Pros for CivicFix | Cons for CivicFix | Verdict |
|-------|-------------------|-------------------|---------|
| **Waterfall** | Clear phases, easy to plan | Inflexible, late testing, high risk | ❌ Unsuitable |
| **V-Model** | Testing focus | Still sequential, inflexible | ❌ Unsuitable |
| **Spiral** | Risk-driven, iterative | Complex, overhead for small team | ⚠️ Overkill |
| **Agile** | Flexible, early delivery, risk mitigation | Requires discipline for solo | ✅ **Selected** |
| **RAD** | Fast prototyping | Requires reusable components library | ⚠️ Possible but less structured |
| **Incremental** | Similar to Agile | Less feedback loops | ⚠️ Agile better |

### 2.5.6 Why NOT Other Models?

**Waterfall:**
- Cannot accommodate requirement changes
- Testing only at end (risky)
- No working software until final phase
- Not suitable for learning environment

**Spiral:**
- Too much overhead for single developer
- Risk analysis overkill for academic project
- Better for large teams

**RAD (Rapid Application Development):**
- Requires pre-built component library (not available)
- Less emphasis on design (we need good architecture)

---

## 2.6 Summary

This chapter presented a comprehensive requirement analysis and system specification for CivicFix 311:

**Feasibility Study:**
- Technical: ✅ Feasible with Django + React + PostgreSQL
- Economic: ✅ Highly cost-effective (< ₹15K dev, < ₹3L/year deployment)
- Operational: ✅ Feasible with change management
- Legal: ✅ Compliant with Indian laws and ethical standards
- Schedule: ✅ Achievable in 20-week timeline

**Software Requirements:**
- **Hardware:** Modest cloud server (2-4 vCPU, 4-8 GB RAM) sufficient
- **Software:** Open-source stack (Django 6, React 18, PostgreSQL 14)
- **Functional:** 30+ requirements across 7 modules (User, Complaint, Community, Notifications, Analytics, SLA, Admin)
- **Non-Functional:** Performance (< 500ms API), Security (JWT, RBAC, HTTPS), Usability (responsive, < 3 clicks), Reliability (99% uptime)

**Validation:**
- All requirements reviewed for completeness, correctness, consistency
- Traceability matrix ensures all requirements covered in design and testing
- Test cases derived for all functional requirements

**Expected Hurdles:**
- Technical: JWT complexity, map performance (mitigated with libraries)
- Development: Learning curve, time management (mitigated with planning)
- Deployment: Docker configuration (mitigated with tutorials)
- Adoption: Digital literacy, resistance (mitigated with training)

**SDLC Model:**
- **Agile (Iterative and Incremental)** selected
- 5 sprints of 2 weeks each
- Continuous testing and integration
- Flexible to accommodate changes

The system is ready to proceed to the **Design Phase** (Chapter 3).

---
---

# CHAPTER 3: SYSTEM DESIGN

## 3.1 System Architecture

System architecture defines the high-level structure of CivicFix 311, identifying major components, their relationships, and interaction patterns.

### 3.1.1 Architectural Style

CivicFix 311 employs a **Three-Tier Architecture** with **RESTful API** communication, separating concerns into presentation, application, and data layers.

**Advantages:**
- **Separation of Concerns:** Each tier has distinct responsibility
- **Scalability:** Tiers can be scaled independently
- **Maintainability:** Changes in one tier don't affect others
- **Reusability:** API can be consumed by multiple frontends (web, mobile)
- **Security:** Each tier can have different security policies

**Tier 1: Presentation Layer (Frontend)**
- **Technology:** React 18, React Router, Tailwind CSS
- **Responsibility:** User interface, user interaction, client-side validation
- **Components:** Pages, shared components, routing, state management
- **Communication:** HTTP/HTTPS requests to application tier via REST API

**Tier 2: Application Layer (Backend)**
- **Technology:** Django 6.0, Django REST Framework, Gunicorn
- **Responsibility:** Business logic, authentication, authorization, data processing
- **Components:** Django apps (users, complaints, notifications, analytics), serializers, views, permissions
- **Communication:** SQL queries to data tier via ORM; JSON responses to presentation tier

**Tier 3: Data Layer (Database)**
- **Technology:** PostgreSQL 14
- **Responsibility:** Data storage, data integrity, transactions
- **Components:** Tables, indexes, constraints, triggers
- **Communication:** SQL queries from application tier

**Figure 2: System Architecture Diagram**
```
┌────────────────────────────────────────────────────────┐
│              CLIENT TIER (Presentation)                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ Desktop  │  │  Mobile  │  │  Tablet  │            │
│  │ Browser  │  │ Browser  │  │ Browser  │            │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘            │
│       └─────────────┼─────────────┘                   │
│              React Application                         │
│      (Components, Router, State, API Client)           │
└──────────────────────┬─────────────────────────────────┘
                       │
             REST API (HTTP/JSON + JWT)
                       │
┌──────────────────────▼─────────────────────────────────┐
│           APPLICATION TIER (Business Logic)            │
│  ┌──────────────────────────────────────────────────┐  │
│  │             Nginx (Reverse Proxy)                │  │
│  └─────────────────────┬────────────────────────────┘  │
│  ┌─────────────────────▼────────────────────────────┐  │
│  │          Gunicorn (WSGI Server)                  │  │
│  └─────────────────────┬────────────────────────────┘  │
│  ┌─────────────────────▼────────────────────────────┐  │
│  │          Django REST Framework                   │  │
│  │  ┌─────────┬─────────┬──────────┬─────────────┐  │  │
│  │  │  Users  │Complaints│Notifica- │ Analytics  │  │  │
│  │  │   App   │   App    │tions App │    App     │  │  │
│  │  └─────────┴─────────┴──────────┴─────────────┘  │  │
│  └──────────────────────┬───────────────────────────┘  │
└─────────────────────────┼──────────────────────────────┘
                          │
                   SQL Queries (ORM)
                          │
┌─────────────────────────▼──────────────────────────────┐
│               DATA TIER (Persistence)                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │              PostgreSQL DBMS                     │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  users_user                               │  │  │
│  │  │  complaints_complaint                     │  │  │
│  │  │  complaints_category                      │  │  │
│  │  │  complaints_department                    │  │  │
│  │  │  complaints_upvote                        │  │  │
│  │  │  complaints_statushistory                 │  │  │
│  │  │  notifications_notification               │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### 3.1.2 RESTful API Architecture

**REST Principles Applied:**

1. **Stateless:** Each request contains all information needed (JWT token in header)
2. **Client-Server:** Clear separation between frontend (client) and backend (server)
3. **Resource-Based:** URLs represent resources (e.g., `/api/complaints/`, `/api/users/`)
4. **HTTP Methods:** Standard methods for CRUD operations
   - GET: Retrieve resources
   - POST: Create new resources
   - PATCH/PUT: Update resources
   - DELETE: Remove resources
5. **Representation:** JSON format for all requests and responses
6. **HATEOAS (optional):** Hypermedia links in responses for discoverability

**API Base URL:** `http://localhost:8000/api/`

**Resource Hierarchy:**
```
/api/
├── auth/
│   ├── register/ (POST)
│   ├── login/ (POST)
│   ├── token/refresh/ (POST)
│   ├── profile/ (GET, PATCH)
│   ├── change-password/ (POST)
│   └── users/ (GET, POST)
│       └── <id>/ (GET, PATCH, DELETE)
├── complaints/
│   ├── (GET, POST)
│   ├── <id>/ (GET, PATCH)
│   ├── <id>/status/ (PATCH)
│   ├── <id>/upvote/ (POST)
│   ├── <id>/confirm/ (POST)
│   ├── <id>/assign/ (PATCH)
│   ├── map/ (GET)
│   ├── categories/ (GET)
│   └── departments/ (GET)
├── notifications/
│   ├── (GET)
│   ├── unread/ (GET)
│   ├── read/ (POST)
│   └── <id>/read/ (POST)
└── analytics/
    ├── summary/ (GET)
    ├── trend/ (GET)
    ├── categories/ (GET)
    ├── departments/ (GET)
    ├── wards/ (GET)
    └── status/ (GET)
```

### 3.1.3 Authentication Flow

**JWT (JSON Web Token) Authentication:**

1. **Registration/Login:**
   - User sends credentials (email, password)
   - Backend validates credentials
   - Backend generates two tokens:
     - Access Token (short-lived: 2 hours)
     - Refresh Token (long-lived: 7 days)
   - Frontend stores tokens in `localStorage`

2. **Authenticated Requests:**
   - Frontend includes access token in header: `Authorization: Bearer <token>`
   - Backend validates token signature and expiry
   - If valid, request processed
   - If expired, 401 Unauthorized returned

3. **Token Refresh:**
   - On 401, frontend sends refresh token to `/auth/token/refresh/`
   - Backend validates refresh token
   - If valid, issues new access token
   - Frontend retries original request with new token
   - If refresh token expired, logout and redirect to login

4. **Logout:**
   - Frontend clears `localStorage`
   - Refresh token blacklisted in database (optional)

**Security Features:**
- Tokens signed with secret key (prevents tampering)
- Short-lived access tokens reduce exposure window
- Refresh token rotation on each refresh
- Token blacklisting prevents reuse

### 3.1.4 Deployment Architecture

**Production Deployment (Docker-based):**

```
┌───────────────────────────────────────────────────────┐
│            Docker Host (Cloud Server)                 │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │  docker-compose.yml (Orchestrator)              │ │
│  └────────────┬──────────────┬──────────────┬───────┘ │
│               │              │              │         │
│  ┌────────────▼────┐  ┌──────▼──────┐  ┌───▼──────┐ │
│  │ Container 1:    │  │ Container 2: │  │Container 3│ │
│  │ frontend        │  │ backend     │  │ postgres  │ │
│  │                 │  │             │  │           │ │
│  │ React Build     │  │ Django 6    │  │PostgreSQL │ │
│  │ Nginx :80       │  │ DRF         │  │ :5432     │ │
│  │                 │  │ Gunicorn    │  │           │ │
│  │                 │  │ :8000       │  │           │ │
│  └─────────────────┘  └─────────────┘  └───────────┘ │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Volumes (Persistent Storage)                   │ │
│  │  - postgres_data (database)                     │ │
│  │  - media_files (uploaded photos)                │ │
│  └─────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────┘
                         │
                    Internet (Port 80)
                         │
                    ┌────▼────┐
                    │ Users   │
                    └─────────┘
```

---

## 3.2 Use Case Model

Use case diagrams capture functional requirements from user perspective, showing actors and their interactions with the system.

### 3.2.1 Actors

| Actor | Description | Examples |
|-------|-------------|----------|
| **Citizen** | General public user who reports civic issues | Resident reporting pothole |
| **Field Officer** | Municipal worker assigned to resolve complaints | Sanitation worker, electrician |
| **Department Head** | Manager overseeing a municipal department | Head of Roads Department |
| **Administrator** | System admin with full access | Municipal IT admin |

### 3.2.2 Use Case Diagram - Citizen

**Figure 3: Use Case Diagram - Citizen**

```
                    ┌──────────┐
                    │ Citizen  │
                    └────┬─────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
  ┌──────────┐     ┌──────────┐    ┌──────────┐
  │ Register │     │  Login   │    │  View    │
  │ Account  │     │          │    │ Profile  │
  └──────────┘     └──────────┘    └──────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
  ┌──────────┐     ┌──────────┐    ┌──────────┐
  │ Submit   │     │  View    │    │  Upvote  │
  │Complaint │     │Complaints│    │Complaint │
  │          │     │          │    │          │
  │<<include>>     └──────────┘    └──────────┘
  │Upload    │           │
  │ Photo    │           ▼
  │          │     ┌──────────┐
  └──────────┘     │  Search  │
        │          │  Filter  │
        │          │  Sort    │
        │          └──────────┘
        │                │
        ▼                ▼
  ┌──────────┐     ┌──────────┐
  │  Track   │     │View Map  │
  │  Status  │     │          │
  └──────────┘     └──────────┘
        │
        ▼
  ┌──────────┐
  │ Confirm  │
  │Resolution│
  │ & Rate   │
  └──────────┘
```

**Use Cases:**
1. Register Account
2. Login
3. View/Edit Profile
4. Submit Complaint (includes: Upload Photo, Select GPS Location, Choose Category)
5. View All Complaints
6. Search/Filter/Sort Complaints
7. View Complaint Details
8. Upvote Complaint
9. View Map (Leaflet map with all complaints)
10. Track Own Complaint Status
11. Confirm Resolution & Rate Service
12. View Notifications
13. Change Password

---

### 3.2.3 Use Case Diagram - Field Officer

**Figure 4: Use Case Diagram - Field Officer**

```
                  ┌──────────────┐
                  │Field Officer │
                  └──────┬───────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
  ┌──────────┐     ┌──────────┐    ┌──────────┐
  │  Login   │     │  View    │    │  View    │
  │          │     │ Assigned │    │Complaint │
  └──────────┘     │Complaints│    │ Details  │
                   └──────────┘    └──────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
  ┌──────────┐     ┌──────────┐    ┌──────────┐
  │  Update  │     │  Upload  │    │  Add     │
  │  Status  │     │  After   │    │  Notes   │
  │          │     │  Photo   │    │          │
  └──────────┘     └──────────┘    └──────────┘
                         │
                         ▼
                   ┌──────────┐
                   │  Reject  │
                   │Complaint │
                   │(Optional)│
                   └──────────┘
```

**Use Cases:**
1. Login
2. View Assigned Complaints (filtered list)
3. View Complaint Details
4. Update Status (Submitted → In Progress → Resolved)
5. Upload After-Photo (resolution evidence)
6. Add Notes to complaints
7. Reject Complaint (with reason)
8. View Notifications (assignment alerts)

---

### 3.2.4 Use Case Diagram - Department Head

```
                ┌─────────────────┐
                │ Department Head │
                └────────┬────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
  ┌──────────┐     ┌──────────┐    ┌──────────┐
  │  Login   │     │  View    │    │  Assign  │
  │          │     │  Dept    │    │Complaint │
  └──────────┘     │Complaints│    │to Officer│
                   └──────────┘    └──────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
  ┌──────────┐     ┌──────────┐    ┌──────────┐
  │  View    │     │  Monitor │    │  View    │
  │Department│     │   SLA    │    │Analytics │
  │Analytics │     │ Breaches │    │          │
  └──────────┘     └──────────┘    └──────────┘
```

**Use Cases:**
1. Login
2. View Department Complaints (all in dept)
3. Assign Complaint to Field Officer
4. View Department Analytics (performance, resolution rates)
5. Monitor SLA Breaches
6. View Team Workload Distribution
7. Update Status (override if needed)

---

### 3.2.5 Use Case Diagram - Administrator

```
                  ┌──────────────┐
                  │Administrator │
                  └──────┬───────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
  ┌──────────┐     ┌──────────┐    ┌──────────┐
  │  Login   │     │  Manage  │    │  View    │
  │          │     │  Users   │    │  All     │
  └──────────┘     │(Add/Edit/│    │Complaints│
                   │ Delete)  │    └──────────┘
                   └──────────┘          │
                         │                │
        ┌────────────────┼────────────────┤
        │                │                │
        ▼                ▼                ▼
  ┌──────────┐     ┌──────────┐    ┌──────────┐
  │  View    │     │  System  │    │Configure │
  │System    │     │Analytics │    │  SLA     │
  │Analytics │     │          │    │  Hours   │
  └──────────┘     └──────────┘    └──────────┘
```

**Use Cases:**
1. Login
2. Manage Users (Create officers/dept heads, Edit roles, Delete users)
3. View All Complaints (system-wide)
4. View System Analytics (all departments, wards, categories)
5. Configure SLA Hours per Category
6. Monitor System Health
7. Access Audit Logs

---

## 3.3 Class Diagram

Class diagrams show the static structure of the system, representing classes, attributes, methods, and relationships.

**Figure 5: Class Diagram - Backend Models**

```
┌────────────────────────────┐
│         User               │
├────────────────────────────┤
│ - id: Integer (PK)         │
│ - email: String (UK)       │
│ - password: String         │
│ - name: String             │
│ - phone: String            │
│ - role: Enum               │
│ - ward: String             │
│ - avatar: ImageField       │
│ - is_verified: Boolean     │
│ - department: FK           │
│ - date_joined: DateTime    │
├────────────────────────────┤
│ + is_citizen(): Boolean    │
│ + is_officer(): Boolean    │
│ + is_dept_head(): Boolean  │
│ + is_admin(): Boolean      │
└──────────┬─────────────────┘
           │ 1
           │
           │ N
┌──────────▼─────────────────┐
│      Complaint             │
├────────────────────────────┤
│ - id: Integer (PK)         │
│ - title: String            │
│ - description: Text        │
│ - address: String          │
│ - latitude: Decimal        │
│ - longitude: Decimal       │
│ - ward: String             │
│ - status: Enum             │
│ - priority: Enum           │
│ - photo: ImageField        │
│ - after_photo: ImageField  │
│ - upvote_count: Integer    │
│ - category: FK             │
│ - department: FK           │
│ - created_by: FK (User)    │
│ - assigned_to: FK (User)   │
│ - created_at: DateTime     │
│ - updated_at: DateTime     │
│ - resolved_at: DateTime    │
│ - rating: Integer          │
├────────────────────────────┤
│ + auto_escalate(): void    │
│ + assign_officer(u): void  │
│ + update_status(s): void   │
└──────────┬─────────────────┘
           │ N
           │
           │ 1
┌──────────▼─────────────────┐
│       Category             │
├────────────────────────────┤
│ - id: Integer (PK)         │
│ - name: String             │
│ - description: Text        │
│ - department: FK           │
│ - sla_hours: Integer       │
├────────────────────────────┤
│ + get_department(): Dept   │
└────────────────────────────┘
           │ N
           │
           │ 1
┌──────────▼─────────────────┐
│      Department            │
├────────────────────────────┤
│ - id: Integer (PK)         │
│ - name: String             │
│ - description: Text        │
│ - created_at: DateTime     │
├────────────────────────────┤
│ + get_categories(): List   │
│ + get_complaints(): List   │
└────────────────────────────┘

┌────────────────────────────┐
│        Upvote              │
├────────────────────────────┤
│ - id: Integer (PK)         │
│ - user: FK (User)          │
│ - complaint: FK            │
│ - created_at: DateTime     │
├────────────────────────────┤
│ - UNIQUE(user, complaint)  │
└────────────────────────────┘

┌────────────────────────────┐
│    StatusHistory           │
├────────────────────────────┤
│ - id: Integer (PK)         │
│ - complaint: FK            │
│ - status: Enum             │
│ - note: Text               │
│ - changed_by: FK (User)    │
│ - changed_at: DateTime     │
└────────────────────────────┘

┌────────────────────────────┐
│     Notification           │
├────────────────────────────┤
│ - id: Integer (PK)         │
│ - user: FK (User)          │
│ - type: String             │
│ - title: String            │
│ - message: Text            │
│ - is_read: Boolean         │
│ - complaint: FK            │
│ - created_at: DateTime     │
├────────────────────────────┤
│ + mark_read(): void        │
└────────────────────────────┘
```

**Relationships:**
- User **1** ↔ **N** Complaint (created_by)
- User **1** ↔ **N** Complaint (assigned_to)
- User **N** ↔ **1** Department (officers/heads belong to dept)
- Department **1** ↔ **N** Category
- Department **1** ↔ **N** Complaint
- Category **1** ↔ **N** Complaint
- Complaint **1** ↔ **N** Upvote
- Complaint **1** ↔ **N** StatusHistory
- User **1** ↔ **N** Upvote
- User **1** ↔ **N** Notification

---

*(Continue to next section...)*
