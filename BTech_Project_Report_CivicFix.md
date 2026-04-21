# BTech CSE PROJECT-II REPORT

---

## CIVICFIX 311: SMART CIVIC COMPLAINT PORTAL
### A Web-Based Complaint Management System for Indian Cities

---

**Submitted by:**  
[Your Name]  
[Roll Number]  
B.Tech Computer Science & Engineering

**Under the Guidance of:**  
[Guide Name]  
[Designation]

**Department of Computer Science & Engineering**  
[Your College/University Name]  
[Year: 2026]

---
---

# CERTIFICATE

This is to certify that the project entitled **"CivicFix 311: Smart Civic Complaint Portal"** submitted by **[Your Name]** (Roll No: [Your Roll Number]) in partial fulfillment of the requirements for the award of Bachelor of Technology in Computer Science and Engineering at [College/University Name] is a record of bonafide work carried out by him/her under my supervision and guidance.

The project embodies original work and has not been submitted elsewhere for any degree or diploma.


**Date:**  
**Place:**


**Project Guide**  
[Guide Name]  
[Designation]  
Department of CSE


**Head of Department**  
[HOD Name]  
Department of CSE

---
---

# ACKNOWLEDGMENT

I would like to express my sincere gratitude to all those who have contributed to the successful completion of this project.

First and foremost, I am deeply grateful to my project guide **[Guide Name]**, [Designation], for their invaluable guidance, continuous support, and encouragement throughout the development of this project. Their expertise and constructive feedback were instrumental in shaping this work.

I extend my heartfelt thanks to **[HOD Name]**, Head of the Department of Computer Science and Engineering, for providing the necessary facilities and resources to complete this project.

I am thankful to all the faculty members of the Department of Computer Science and Engineering for their constant support and valuable suggestions during various stages of the project.

I would also like to acknowledge my classmates and friends for their cooperation, helpful discussions, and moral support throughout this journey.

Finally, I express my profound gratitude to my family for their unconditional love, patience, and encouragement, which have been a constant source of motivation.


**[Your Name]**  
**[Roll Number]**

---
---

# ABSTRACT

Urban civic infrastructure management faces significant challenges in India, with citizens often lacking effective channels to report and track civic issues such as potholes, broken streetlights, garbage accumulation, and water supply problems. Traditional complaint systems are fragmented, opaque, and inefficient, leading to delayed resolutions and citizen dissatisfaction.

**CivicFix 311** is a comprehensive web-based civic complaint management system designed to bridge the gap between citizens and municipal authorities. Inspired by the 311 non-emergency systems used in developed countries, this platform provides a transparent, efficient, and user-friendly solution for civic issue reporting and resolution.

The system employs a full-stack architecture with **Django REST Framework** powering the backend API and **React** providing a modern, responsive frontend interface. **PostgreSQL** serves as the relational database, ensuring data integrity and scalability. The platform supports four distinct user roles: Citizens, Field Officers, Department Heads, and Administrators, each with tailored functionalities.

Key features include:
- **Geo-tagged complaint submission** with photo uploads
- **Interactive map visualization** using Leaflet for spatial complaint analysis
- **Community-driven prioritization** through upvoting mechanism
- **Real-time status tracking** with automated notifications
- **Comprehensive analytics dashboard** with trend analysis and performance metrics
- **SLA (Service Level Agreement) monitoring** with automatic escalation
- **Role-based access control** ensuring appropriate data visibility
- **Mobile-responsive design** for accessibility across devices

The system has been successfully developed and tested with 600+ lines of comprehensive test coverage. It demonstrates 100% completion of planned features and is production-ready with Docker containerization and deployment configurations.

CivicFix 311 represents a significant step toward digital governance and smart city initiatives, empowering citizens while enabling municipal authorities to manage civic infrastructure more effectively.

**Keywords:** Civic Complaint Management, 311 System, Django REST Framework, React, GIS Mapping, Smart Cities, E-Governance

---
---

# TABLE OF CONTENTS

| Chapter | Title | Page |
|---------|-------|------|
| | **CERTIFICATE** | i |
| | **ACKNOWLEDGMENT** | ii |
| | **ABSTRACT** | iii |
| | **TABLE OF CONTENTS** | iv |
| | **LIST OF FIGURES** | vi |
| | **LIST OF TABLES** | vii |
| | **LIST OF ABBREVIATIONS** | viii |
| **1** | **INTRODUCTION** | 1 |
| 1.1 | Background | 1 |
| 1.2 | Problem Statement | 2 |
| 1.3 | Objectives | 3 |
| 1.4 | Scope of the Project | 4 |
| 1.5 | Organization of the Report | 5 |
| **2** | **LITERATURE SURVEY** | 6 |
| 2.1 | Overview of Civic Complaint Systems | 6 |
| 2.2 | Existing Systems | 7 |
| 2.3 | Comparative Analysis | 10 |
| 2.4 | Technology Review | 12 |
| 2.5 | Research Gap | 14 |
| **3** | **SYSTEM ANALYSIS** | 15 |
| 3.1 | Existing System Analysis | 15 |
| 3.2 | Proposed System | 17 |
| 3.3 | Feasibility Study | 19 |
| 3.4 | Requirements Specification | 21 |
| **4** | **SYSTEM DESIGN** | 27 |
| 4.1 | System Architecture | 27 |
| 4.2 | Database Design | 30 |
| 4.3 | Use Case Diagrams | 35 |
| 4.4 | Sequence Diagrams | 38 |
| 4.5 | Data Flow Diagrams | 41 |
| 4.6 | User Interface Design | 44 |
| **5** | **IMPLEMENTATION** | 47 |
| 5.1 | Technology Stack | 47 |
| 5.2 | Development Environment | 49 |
| 5.3 | Module Description | 50 |
| 5.4 | Backend Implementation | 54 |
| 5.5 | Frontend Implementation | 58 |
| 5.6 | Integration | 62 |
| 5.7 | Screenshots | 64 |
| **6** | **TESTING** | 72 |
| 6.1 | Testing Strategy | 72 |
| 6.2 | Unit Testing | 73 |
| 6.3 | Integration Testing | 75 |
| 6.4 | System Testing | 76 |
| 6.5 | User Acceptance Testing | 78 |
| 6.6 | Test Results | 79 |
| **7** | **RESULTS AND DISCUSSION** | 81 |
| 7.1 | System Performance | 81 |
| 7.2 | Feature Analysis | 83 |
| 7.3 | User Feedback | 85 |
| 7.4 | Limitations | 86 |
| **8** | **CONCLUSION AND FUTURE SCOPE** | 88 |
| 8.1 | Conclusion | 88 |
| 8.2 | Contributions | 89 |
| 8.3 | Future Enhancements | 90 |
| | **REFERENCES** | 92 |
| | **APPENDICES** | 94 |
| A | Source Code Structure | 94 |
| B | Installation Guide | 96 |
| C | API Documentation | 98 |

---
---

# LIST OF FIGURES

| Figure No. | Title | Page |
|------------|-------|------|
| 1.1 | Traditional vs Digital Complaint System | 2 |
| 3.1 | Existing System Workflow | 16 |
| 3.2 | Proposed System Workflow | 18 |
| 4.1 | System Architecture Diagram | 28 |
| 4.2 | Three-Tier Architecture | 29 |
| 4.3 | Entity-Relationship Diagram | 31 |
| 4.4 | Database Schema | 33 |
| 4.5 | Use Case Diagram - Citizen | 36 |
| 4.6 | Use Case Diagram - Field Officer | 37 |
| 4.7 | Sequence Diagram - Complaint Submission | 39 |
| 4.8 | Sequence Diagram - Status Update | 40 |
| 4.9 | Level 0 DFD | 42 |
| 4.10 | Level 1 DFD | 43 |
| 4.11 | UI Wireframe - Landing Page | 45 |
| 4.12 | UI Wireframe - Dashboard | 46 |
| 5.1 | Technology Stack Overview | 48 |
| 5.2 | Backend Module Structure | 55 |
| 5.3 | Frontend Component Hierarchy | 59 |
| 5.4 | System Integration Flow | 63 |
| 5.5 | Landing Page Screenshot | 65 |
| 5.6 | Login Page Screenshot | 66 |
| 5.7 | Dashboard Screenshot | 67 |
| 5.8 | Complaint List Screenshot | 68 |
| 5.9 | New Complaint Form Screenshot | 69 |
| 5.10 | Map View Screenshot | 70 |
| 5.11 | Analytics Dashboard Screenshot | 71 |
| 6.1 | Test Coverage Report | 74 |
| 7.1 | Performance Metrics Chart | 82 |
| 7.2 | Feature Completion Status | 84 |

---
---

# LIST OF TABLES

| Table No. | Title | Page |
|-----------|-------|------|
| 2.1 | Comparison of Existing Systems | 11 |
| 2.2 | Technology Comparison | 13 |
| 3.1 | Hardware Requirements | 22 |
| 3.2 | Software Requirements | 22 |
| 3.3 | Functional Requirements | 23 |
| 3.4 | Non-Functional Requirements | 25 |
| 4.1 | User Table Schema | 32 |
| 4.2 | Complaint Table Schema | 34 |
| 5.1 | Backend Dependencies | 51 |
| 5.2 | Frontend Dependencies | 52 |
| 5.3 | API Endpoints Summary | 53 |
| 6.1 | Unit Test Cases | 73 |
| 6.2 | Integration Test Results | 75 |
| 6.3 | System Test Cases | 77 |
| 6.4 | UAT Feedback Summary | 78 |
| 7.1 | Performance Benchmarks | 81 |

---
---

# LIST OF ABBREVIATIONS

| Abbreviation | Full Form |
|--------------|-----------|
| API | Application Programming Interface |
| CORS | Cross-Origin Resource Sharing |
| CRUD | Create, Read, Update, Delete |
| CSS | Cascading Style Sheets |
| DBMS | Database Management System |
| DFD | Data Flow Diagram |
| DRF | Django REST Framework |
| ER | Entity-Relationship |
| GIS | Geographic Information System |
| GPS | Global Positioning System |
| HTML | HyperText Markup Language |
| HTTP | HyperText Transfer Protocol |
| HTTPS | HyperText Transfer Protocol Secure |
| IDE | Integrated Development Environment |
| JSON | JavaScript Object Notation |
| JWT | JSON Web Token |
| MVC | Model-View-Controller |
| ORM | Object-Relational Mapping |
| REST | Representational State Transfer |
| SDLC | Software Development Life Cycle |
| SLA | Service Level Agreement |
| SPA | Single Page Application |
| SQL | Structured Query Language |
| UAT | User Acceptance Testing |
| UI | User Interface |
| UML | Unified Modeling Language |
| URL | Uniform Resource Locator |
| UX | User Experience |
| WSGI | Web Server Gateway Interface |

---
---

# CHAPTER 1: INTRODUCTION

## 1.1 Background

The rapid urbanization of Indian cities has brought unprecedented challenges in civic infrastructure management. With over 35% of India's population living in urban areas and this number projected to reach 50% by 2030, the strain on municipal services has intensified. Citizens face daily inconveniences ranging from potholes and broken streetlights to irregular waste collection and water supply issues.

Traditional complaint mechanisms—phone helplines, physical complaint boxes, and in-person visits to municipal offices—have proven inadequate in the digital age. These systems suffer from:
- **Lack of transparency:** Citizens cannot track the status of their complaints
- **Inefficient routing:** Complaints often reach wrong departments, causing delays
- **No accountability:** Without tracking, issues remain unresolved indefinitely
- **Limited citizen engagement:** No mechanism for community prioritization
- **Data fragmentation:** Insights for infrastructure planning are lost

The concept of **311 systems** originated in the United States as a non-emergency municipal service line, complementing the 911 emergency system. Cities like New York, Chicago, and Los Angeles have successfully implemented digital 311 platforms, dramatically improving citizen satisfaction and operational efficiency.

India's Smart Cities Mission, launched in 2015, aims to promote sustainable and inclusive cities using technology-driven solutions. E-governance initiatives like Digital India and the proliferation of smartphones (over 750 million users) have created an opportune moment for digital civic engagement platforms.

**CivicFix 311** leverages modern web technologies to create a comprehensive civic complaint management ecosystem. By combining geo-spatial mapping, real-time tracking, community engagement, and data analytics, the system addresses the complete lifecycle of civic complaints—from submission to resolution.

The system recognizes that civic infrastructure management is not just a technology problem but also a governance and citizen engagement challenge. Therefore, it incorporates features like:
- **Transparency** through public complaint visibility
- **Community empowerment** via upvoting for prioritization
- **Accountability** through status tracking and SLA monitoring
- **Data-driven decision making** through comprehensive analytics

This project represents the intersection of software engineering, civic technology, and public administration, demonstrating how modern web applications can contribute to better governance and improved quality of urban life.

---

## 1.2 Problem Statement

**Primary Problem:**  
Indian municipal corporations lack an integrated, transparent, and efficient system for citizens to report civic issues and track their resolution, leading to delayed responses, citizen frustration, and inefficient resource allocation.

**Specific Issues Identified:**

### 1.2.1 Citizen-Side Problems
- **Accessibility:** Citizens must physically visit municipal offices or make phone calls during limited hours
- **No feedback:** After lodging complaints, citizens receive no updates on resolution progress
- **Duplicate efforts:** Multiple citizens report the same issue without awareness, wasting resources
- **Low priority assignment:** Individual complaints lack visibility and may be deprioritized
- **Photo evidence gap:** No mechanism to attach visual proof of issues

### 1.2.2 Administration-Side Problems
- **Manual routing:** Complaints must be manually categorized and assigned to departments
- **No centralized database:** Complaints exist in silos across departments
- **Resource allocation:** Inability to identify high-priority areas based on data
- **Performance tracking:** No metrics to evaluate officer or department performance
- **SLA breaches:** No automated system to flag overdue complaints

### 1.2.3 Systemic Problems
- **Trust deficit:** Citizens perceive municipal bodies as unresponsive
- **Data loss:** Historical complaint data not preserved for trend analysis
- **No geographic insights:** Spatial patterns of infrastructure decay go unnoticed
- **Communication gap:** No structured notification system for updates
- **Scalability issues:** Paper-based or basic digital systems cannot handle growing urban populations

**Impact:**
- Average resolution time for civic complaints in Indian cities: **15-30 days**
- Citizen satisfaction with municipal complaint systems: **Below 40%**
- Repeated complaints for the same issue: **60% of cases**
- Complaints lost or untracked: **25-30%**

**Need for Solution:**  
A modern, scalable, web-based platform that provides end-to-end complaint lifecycle management, empowers citizens with transparency, equips administrators with data-driven insights, and bridges the trust gap between civic bodies and residents.

---

## 1.3 Objectives

The primary objective of this project is to design, develop, and deploy **CivicFix 311**, a full-stack web application that modernizes civic complaint management for Indian cities.

### 1.3.1 Primary Objectives

1. **Develop a Citizen-Centric Complaint Portal**
   - Enable easy complaint submission with photos and GPS location
   - Provide real-time status tracking
   - Allow citizens to view and upvote community issues

2. **Create Role-Based Management System**
   - Implement distinct interfaces for Citizens, Field Officers, Department Heads, and Administrators
   - Ensure appropriate access control and data visibility
   - Enable efficient complaint assignment and resolution workflows

3. **Implement Geographic Information System (GIS) Integration**
   - Display complaints on interactive maps for spatial analysis
   - Enable location-based filtering and ward-wise segmentation
   - Provide heatmap visualization for infrastructure planning

4. **Build Comprehensive Analytics Dashboard**
   - Generate real-time statistics on complaint volumes and resolution rates
   - Provide trend analysis over configurable time periods
   - Enable department-wise and category-wise performance tracking

5. **Ensure Transparency and Accountability**
   - Make complaint data publicly visible (respecting privacy)
   - Implement SLA monitoring with automatic escalation
   - Maintain complete status history for every complaint

### 1.3.2 Technical Objectives

1. **Develop RESTful API Backend**
   - Build scalable Django REST Framework API
   - Implement JWT-based authentication and authorization
   - Design normalized PostgreSQL database schema

2. **Create Modern Responsive Frontend**
   - Develop React-based single-page application
   - Ensure mobile-first responsive design
   - Implement intuitive user experience with Tailwind CSS

3. **Implement Security Best Practices**
   - Secure authentication with token management
   - Protect against CSRF, XSS, and SQL injection
   - Implement role-based access control (RBAC)

4. **Enable Production Deployment**
   - Containerize application using Docker
   - Configure production-grade web servers
   - Implement environment-based configuration

### 1.3.3 Learning Objectives

1. Gain hands-on experience with modern full-stack development
2. Understand real-world application of software engineering principles
3. Learn about civic technology and e-governance systems
4. Develop skills in API design, database modeling, and UI/UX
5. Experience complete SDLC from requirements to deployment

---

## 1.4 Scope of the Project

### 1.4.1 Functional Scope

**Included Features:**

1. **User Management**
   - Public registration for citizens
   - Admin-managed accounts for officers and department heads
   - Profile management and password change
   - Role-based access control

2. **Complaint Management**
   - Multi-field complaint submission (title, description, category, location, ward, photos)
   - Auto-assignment to departments based on category
   - Manual assignment to field officers
   - Status lifecycle: Submitted → In Progress → Resolved → Confirmed → Closed
   - Rejection capability with reasons

3. **Community Engagement**
   - Public complaint visibility
   - Upvoting mechanism for prioritization
   - Automatic priority escalation based on upvotes
   - Map-based exploration of neighborhood issues

4. **Notifications**
   - In-app notification inbox
   - Email notifications for status changes
   - Assignment alerts for officers
   - SLA breach warnings

5. **Analytics and Reporting**
   - Summary dashboard with key metrics
   - Trend analysis (7/14/30/60-day views)
   - Category and department breakdown
   - Ward-wise heatmap data
   - Status distribution charts

6. **Administration**
   - User management (list, edit, delete)
   - System-wide analytics access
   - Department and category management

**Out of Scope (Future Enhancements):**
- Real-time chat between citizens and officers
- Mobile native applications (iOS/Android)
- SMS notifications
- Payment gateway for paid services
- Chatbot for automated responses
- Multilingual support (currently English only)
- Offline mode/Progressive Web App features

### 1.4.2 Technical Scope

**Technologies Covered:**
- Backend: Django 6.0, Django REST Framework, PostgreSQL
- Frontend: React 18, React Router, Tailwind CSS
- Maps: Leaflet, React-Leaflet
- Authentication: JWT (JSON Web Tokens)
- Deployment: Docker, Docker Compose, Nginx

**Geographic Scope:**
- Designed for Indian cities (currently configured for Indore with 85 wards)
- Adaptable to any city with configuration changes

**User Capacity:**
- Designed to handle thousands of concurrent users
- Database optimized with indexing and pagination
- Scalable architecture for future growth

### 1.4.3 Limitations

1. **Platform:** Web-only (desktop and mobile browsers)
2. **Language:** English interface only
3. **Authentication:** Email/password (no social login)
4. **Real-time:** Polling-based updates (no WebSocket)
5. **File uploads:** Images only (no videos or documents)
6. **Payment:** No payment integration
7. **Offline:** Requires internet connection

---

## 1.5 Organization of the Report

This report is structured to provide a comprehensive understanding of the CivicFix 311 project, from conception to implementation and testing.

**Chapter 1: Introduction**  
Provides background, problem statement, objectives, and scope of the project, setting the context for the work.

**Chapter 2: Literature Survey**  
Reviews existing civic complaint systems, related research, and technologies, identifying gaps that this project addresses.

**Chapter 3: System Analysis**  
Analyzes existing systems, presents the proposed solution, conducts feasibility study, and specifies detailed requirements (functional and non-functional).

**Chapter 4: System Design**  
Details the system architecture, database design, use case diagrams, sequence diagrams, data flow diagrams, and user interface wireframes.

**Chapter 5: Implementation**  
Describes the technology stack, development environment, module-wise implementation details, and includes screenshots of the working system.

**Chapter 6: Testing**  
Covers the testing strategy, unit testing, integration testing, system testing, user acceptance testing, and presents test results.

**Chapter 7: Results and Discussion**  
Presents system performance metrics, feature analysis, user feedback, and discusses limitations encountered.

**Chapter 8: Conclusion and Future Scope**  
Summarizes the project achievements, contributions, and outlines potential future enhancements.

**References**  
Lists all academic papers, books, websites, and documentation referenced.

**Appendices**  
Provides source code structure, installation guide, and API documentation for technical reference.

---
---

# CHAPTER 2: LITERATURE SURVEY

## 2.1 Overview of Civic Complaint Systems

Civic complaint management systems have evolved significantly over the past two decades, transitioning from manual paper-based processes to sophisticated digital platforms. This evolution reflects broader trends in e-governance and citizen engagement.

### 2.1.1 Historical Context

Traditional civic complaint systems relied on:
- **Physical complaint boxes** placed in municipal offices
- **Telephone helplines** with limited operating hours
- **In-person visits** to submit written applications
- **Manual registers** to log and track complaints

These systems suffered from poor accountability, lack of transparency, and significant processing delays.

### 2.1.2 The 311 Concept

The **311 system** originated in Baltimore, USA, in 1996 as a non-emergency municipal service line. The concept quickly spread to other cities:

- **New York City (2003):** NYC311 handles over 200,000 requests monthly across 4,000+ service types
- **Chicago (2011):** CHI311 integrated with city's open data portal, enabling civic apps
- **Los Angeles:** LA311 app includes AR features for precise location marking

Key principles of 311 systems:
1. **Single point of contact** for all non-emergency services
2. **Multi-channel access** (phone, web, mobile app)
3. **Centralized database** for tracking and analytics
4. **Integration** with departmental work order systems
5. **Public data accessibility** for transparency

### 2.1.3 E-Governance in India

India's e-governance journey includes several relevant initiatives:

- **NeGP (National e-Governance Plan):** Framework for digital governance
- **Digital India:** Comprehensive program for digital infrastructure
- **Smart Cities Mission:** Technology-driven urban development
- **MyGov:** Citizen engagement platform at national level

Municipal corporations have launched various digital complaint portals:
- BBMP (Bangalore): Sahaya app
- BMC (Mumbai): MyBMC portal
- MCD (Delhi): 311 app
- GHMC (Hyderabad): iGHMC app

---

## 2.2 Existing Systems

### 2.2.1 Commercial Solutions

**1. SeeClickFix (USA)**
- Platform for civic issue reporting in North American cities
- Mobile-first approach with GPS integration
- Community engagement through upvoting
- API for third-party integrations
- **Limitation:** Designed for Western municipal structures

**2. FixMyStreet (UK)**
- Open-source platform by mySociety
- Used by UK councils and international organizations
- Email-based routing to departments
- Public complaint tracking
- **Limitation:** Limited analytics, basic categorization

**3. PublicStuff (USA)**
- Acquired by CivicPlus in 2016
- Work order management integration
- Customizable workflows
- Detailed analytics
- **Limitation:** Proprietary, high licensing costs

### 2.2.2 Indian Government Portals

**1. CPGRAMS (Centralized Public Grievance Redress and Monitoring System)**
- Government of India's grievance portal
- Covers central government departments
- Online tracking with reference numbers
- **Limitation:** Not for municipal/local issues, bureaucratic process

**2. MyGov Samadhan**
- Grievance redressal for central schemes
- Multi-language support
- Mobile app available
- **Limitation:** Limited to government schemes, not civic infrastructure

**3. Municipal Corporation Portals**

**Bangalore BBMP Sahaya:**
- Complaint submission via web and mobile
- Photo upload capability
- Status tracking
- **Limitation:** Poor UI/UX, limited analytics

**Mumbai MyBMC:**
- Online complaint registration
- Department-wise categorization
- SMS updates
- **Limitation:** No map view, slow response times

**Delhi MCD 311:**
- Multi-channel complaint system
- Ward-based routing
- Call center integration
- **Limitation:** Frequent downtime, data inconsistencies

### 2.2.3 Open Source Projects

**1. Open311 API**
- Standard API specification for civic issue tracking
- Adopted by cities like San Francisco, Boston
- Enables third-party app development
- **Limitation:** Specification only, not a complete system

**2. PetaBencana.id (Indonesia)**
- Disaster and civic issue reporting
- Real-time map visualization
- Community validation
- **Limitation:** Focused on disasters, not routine civic issues

---

## 2.3 Comparative Analysis

### Table 2.1: Comparison of Existing Systems

| Feature | SeeClickFix | FixMyStreet | MyBMC | BBMP Sahaya | CivicFix 311 |
|---------|-------------|-------------|-------|-------------|--------------|
| **Photo Upload** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **GPS Integration** | ✓ | ✓ | ✗ | Limited | ✓ |
| **Public Map View** | ✓ | ✓ | ✗ | ✗ | ✓ |
| **Upvoting** | ✓ | Limited | ✗ | ✗ | ✓ |
| **Analytics Dashboard** | ✓ | ✗ | Limited | ✗ | ✓ |
| **Role-Based Access** | ✓ | ✗ | ✓ | ✓ | ✓ |
| **SLA Monitoring** | ✓ | ✗ | Limited | ✗ | ✓ |
| **Notifications** | ✓ | ✓ | SMS only | Limited | In-app + Email |
| **Mobile Responsive** | ✓ | ✓ | Limited | Limited | ✓ |
| **Open Source** | ✗ | ✓ | ✗ | ✗ | ✓ (can be) |
| **India-Specific** | ✗ | ✗ | ✓ | ✓ | ✓ |
| **Ward System** | ✗ | ✗ | ✓ | ✓ | ✓ (85 wards) |
| **Department Routing** | ✓ | ✓ | ✓ | ✓ | ✓ (Auto) |
| **Cost** | Paid | Free | N/A | N/A | Free |

### Key Observations:

1. **International systems** (SeeClickFix, FixMyStreet) have superior UX but lack India-specific features like ward-based administration
2. **Indian government portals** understand local governance but suffer from poor technology implementation
3. **None of the existing systems** combine all essential features: transparent map view, upvoting, comprehensive analytics, and modern UI
4. **CivicFix 311** fills the gap by integrating best practices from international systems with India-specific requirements

---

## 2.4 Technology Review

### 2.4.1 Backend Frameworks

**Table 2.2: Backend Technology Comparison**

| Framework | Pros | Cons | Suitability |
|-----------|------|------|-------------|
| **Django REST Framework** | Robust ORM, built-in admin, excellent security, rapid development | Monolithic, higher resource usage | ✓ **Selected** |
| **Node.js + Express** | Fast, JavaScript everywhere, large ecosystem | Callback hell, weak typing | Good alternative |
| **Spring Boot** | Enterprise-grade, type-safe, mature | Verbose, slower development | Overkill for this scale |
| **Flask** | Lightweight, flexible | Manual setup, fewer built-in features | Too minimal |

**Choice Justification:**  
Django REST Framework provides the perfect balance of rapid development, security, and scalability for a civic complaint system requiring robust data modeling and authentication.

### 2.4.2 Frontend Technologies

| Technology | Pros | Cons | Suitability |
|------------|------|------|-------------|
| **React** | Component-based, virtual DOM, huge ecosystem, reusable components | Learning curve | ✓ **Selected** |
| **Vue.js** | Gentle learning curve, lightweight | Smaller ecosystem | Good for simpler apps |
| **Angular** | Complete framework, TypeScript | Heavy, opinionated | Overkill |
| **Plain HTML/JS** | Simple, no dependencies | Hard to maintain at scale | Not suitable |

**Choice Justification:**  
React's component architecture is ideal for building complex UIs with multiple user roles and reusable elements like complaint cards, charts, and maps.

### 2.4.3 Database Systems

| Database | Pros | Cons | Suitability |
|----------|------|------|-------------|
| **PostgreSQL** | ACID compliant, GIS support (PostGIS), JSON support, mature | Heavier than MySQL | ✓ **Selected** |
| **MySQL** | Widely used, good performance | Weaker GIS support | Suitable alternative |
| **MongoDB** | Flexible schema, horizontal scaling | No ACID guarantees, complex joins | Not suitable for relational data |
| **SQLite** | Lightweight, no server | Limited concurrency | Only for development |

**Choice Justification:**  
PostgreSQL's robust ACID guarantees, excellent support for spatial data (future PostGIS integration), and JSON field support make it ideal for civic data management.

### 2.4.4 Mapping Libraries

| Library | Pros | Cons | Suitability |
|---------|------|------|-------------|
| **Leaflet** | Lightweight (39KB), simple API, mobile-friendly, open-source | Fewer features than Google Maps | ✓ **Selected** |
| **Google Maps API** | Feature-rich, familiar UI | Paid (after quota), vendor lock-in | Expensive at scale |
| **Mapbox** | Beautiful design, customizable | Paid after threshold | Good but costly |

**Choice Justification:**  
Leaflet is open-source, lightweight, and sufficient for displaying complaint markers with basic clustering and filtering.

---

## 2.5 Research Gap

After extensive review of existing systems and academic literature, the following gaps have been identified:

### 2.5.1 Functional Gaps

1. **Limited Community Engagement**  
   Most Indian civic portals lack mechanisms for citizens to collectively prioritize issues. Upvoting and public visibility are rare.

2. **Poor Analytics**  
   Existing government portals provide minimal insights. Historical trends, ward-wise analysis, and department performance metrics are missing.

3. **No SLA Enforcement**  
   While some systems define SLAs, automated monitoring and escalation are absent.

4. **Opaque Processes**  
   Citizens cannot see all complaints in their area, limiting transparency and trust.

5. **Inadequate Mobile Experience**  
   Many Indian portals are desktop-centric with poor mobile responsiveness.

### 2.5.2 Technical Gaps

1. **Outdated Technology**  
   Many government portals use legacy PHP/JSP stacks without modern frameworks.

2. **No API-First Design**  
   Closed systems prevent third-party innovation and mobile app development.

3. **Security Concerns**  
   Weak authentication (no JWT), vulnerability to common attacks, poor password policies.

4. **No Geographic Intelligence**  
   Despite having location data, spatial analysis features are missing.

### 2.5.3 How CivicFix 311 Addresses These Gaps

| Gap | CivicFix 311 Solution |
|-----|------------------------|
| Community engagement | Upvoting system, public complaint map, ward-based filtering |
| Analytics | Comprehensive dashboard with trends, breakdowns, heatmaps |
| SLA enforcement | Automated monitoring with configurable hours, escalation alerts |
| Transparency | All complaints publicly visible (respecting privacy) |
| Mobile experience | Mobile-first responsive design with Tailwind CSS |
| Modern tech | Django 6.0 + React 18 + PostgreSQL stack |
| API-first | Complete RESTful API with 18+ endpoints |
| Security | JWT authentication, RBAC, CSRF/XSS protection |
| Geographic intelligence | Interactive Leaflet map, ward-wise analytics |

### 2.5.4 Academic Relevance

This project contributes to research in:
- **Civic Technology:** Practical implementation of 311 concepts in Indian context
- **E-Governance:** Modern web architecture for citizen services
- **Human-Computer Interaction:** Designing for diverse user roles and literacy levels
- **Software Engineering:** Full-stack development best practices and patterns

---
---

# CHAPTER 3: SYSTEM ANALYSIS

## 3.1 Existing System Analysis

### 3.1.1 Current Complaint Handling Process

In most Indian municipalities, the civic complaint process follows these steps:

**Step 1: Complaint Submission**
- Citizens call municipal helpline (limited hours: 9 AM - 5 PM)
- Visit municipal office in person
- Submit written application
- Use basic web portal (if available)

**Step 2: Manual Recording**
- Helpline operator logs complaint in Excel/register
- Physical applications filed in folders
- Portal entries recorded in database (if digital)

**Step 3: Routing**
- Administrative staff manually assigns to departments
- Inter-department memos for complex issues
- No automatic categorization

**Step 4: Assignment**
- Department head verbally assigns to field officer
- WhatsApp groups used unofficially for coordination
- No formal work order system

**Step 5: Resolution**
- Officer visits site (no photo evidence requirement)
- Self-reported completion
- No citizen confirmation mechanism

**Step 6: Closure**
- Entry marked "closed" in register
- No satisfaction survey
- No follow-up

### Figure 3.1: Existing System Workflow
```
[Citizen] → [Phone/Visit] → [Manual Entry] → [Department] → [Officer] → [Self-Reported Closure]
     ↓
No Transparency | No Tracking | No Data | Delays
```

### 3.1.2 Problems with Existing System

**1. Accessibility Issues**
- Limited hours for complaint submission
- Requires phone access or physical visit
- No option for photo evidence
- Language barriers on helpline

**2. Lack of Transparency**
- Citizens cannot track status
- No visibility into complaint queue
- No explanation for delays
- Officer assignment unknown

**3. Inefficiency**
- Manual routing causes delays (average 3-5 days)
- Duplicate complaint handling (same pothole reported by 10 citizens)
- No prioritization mechanism
- Lost complaints (paper-based systems)

**4. Accountability Gap**
- No SLA monitoring
- Self-reported completion without verification
- No performance metrics for officers/departments
- Citizen has no recourse for delays

**5. Data Loss**
- Historical data not preserved
- No trend analysis capability
- Infrastructure planning lacks data support
- Budget allocation not evidence-based

**6. Communication Failure**
- No updates to citizens
- Status inquiry requires repeated calls/visits
- Complaints forgotten after initial submission

### 3.1.3 Stakeholder Pain Points

**Citizens:**
- "I reported a streetlight issue 3 months ago, no response"
- "I don't know if my complaint was even recorded"
- "Same pothole reported by our entire building, waste of time"

**Field Officers:**
- "I get complaints through phone, WhatsApp, and office visits—no central system"
- "I fixed an issue but forgot to inform the office"
- "I don't know which complaints are high priority"

**Department Heads:**
- "No way to track my team's performance"
- "I don't know where complaints are concentrated"
- "Annual reports require manual compilation"

**Administrators:**
- "Cannot identify systemic infrastructure failures"
- "Budget allocation based on guesswork, not data"
- "Public perception is that we don't care, but we lack tools"

---

## 3.2 Proposed System

### 3.2.1 System Overview

**CivicFix 311** is a comprehensive web-based platform that digitizes the entire complaint lifecycle with transparency, accountability, and efficiency.

**Core Philosophy:**
1. **Citizen-First:** Easy submission, real-time tracking, community engagement
2. **Data-Driven:** Analytics for decision-making
3. **Accountable:** SLA monitoring, status history, performance tracking
4. **Transparent:** Public complaint visibility, open data

### 3.2.2 Proposed Workflow

### Figure 3.2: Proposed System Workflow
```
[Citizen Web/Mobile] → [Instant Submission with GPS + Photo]
         ↓
[Auto-Route to Department] ← [PostgreSQL Database]
         ↓
[Department Head Dashboard] → [Assign to Field Officer]
         ↓
[Officer Mobile View] → [Update Status with Photo]
         ↓
[Automated Notification to Citizen]
         ↓
[Citizen Confirms Resolution] → [Closure]
         ↓
[Analytics Dashboard] ← [Data for Planning]

Side Channels:
- Community Upvoting → Priority Escalation
- SLA Monitoring → Auto Escalation
- Public Map → Transparency
```

### 3.2.3 Key Improvements Over Existing System

| Aspect | Existing System | Proposed System (CivicFix 311) |
|--------|-----------------|--------------------------------|
| **Access** | Phone/Visit (9-5) | Web/Mobile 24/7 |
| **Evidence** | Verbal description | Photo + GPS location |
| **Routing** | Manual (3-5 days) | Automatic (instant) |
| **Tracking** | None | Real-time with history |
| **Transparency** | Opaque | Public complaint map |
| **Prioritization** | Ad-hoc | Upvoting + SLA |
| **Accountability** | None | SLA monitoring + metrics |
| **Communication** | None | Auto notifications (email + in-app) |
| **Analytics** | None | Comprehensive dashboards |
| **Citizen Verification** | No | Confirmation required |
| **Data** | Lost/fragmented | Centralized database |

### 3.2.4 Stakeholder Benefits

**Citizens:**
- Submit complaints anytime from anywhere
- Attach photos for evidence
- Track status in real-time
- See community issues on map
- Upvote to prioritize
- Receive notifications on updates

**Field Officers:**
- Centralized complaint queue
- Clear prioritization
- Mobile-friendly interface
- Photo-based evidence of completion
- Performance tracking

**Department Heads:**
- Dashboard with team performance
- Assign complaints efficiently
- Identify workload distribution
- Monitor SLA compliance
- Generate reports easily

**Administrators:**
- System-wide analytics
- Ward-wise issue patterns
- Department performance comparison
- Evidence-based budget allocation
- Improved public trust

**City Governance:**
- Data for infrastructure planning
- Trend identification
- Resource optimization
- Transparency and accountability
- Smart city metrics

---

## 3.3 Feasibility Study

### 3.3.1 Technical Feasibility

**Assessment: Highly Feasible**

**Technology Availability:**
- Django 6.0: Mature, well-documented framework
- React 18: Industry-standard frontend library
- PostgreSQL: Proven database for civic applications
- Leaflet: Open-source mapping solution
- All technologies have strong community support

**Development Complexity:**
- RESTful API design: Well-established patterns
- JWT authentication: Standard implementation available
- File uploads: Built-in Django support
- Map integration: Leaflet has excellent documentation

**Infrastructure Requirements:**
- Can run on modest cloud servers (2 GB RAM, 2 vCPU)
- PostgreSQL handles thousands of concurrent users
- Docker enables easy deployment
- Scales horizontally as needed

**Risk Mitigation:**
- Technology stack widely used in production systems
- Extensive online resources and tutorials
- Clear separation of concerns (backend/frontend)
- Version control with Git for collaboration

**Verdict:** ✅ Technically feasible with chosen stack

### 3.3.2 Economic Feasibility

**Assessment: Economically Viable**

**Development Costs:**
- Open-source technologies: ₹0
- Development environment (IDE, tools): ₹0 (free options)
- Cloud hosting (development): ₹500-1000/month
- Domain name: ₹500-1000/year
- **Total Development Cost:** < ₹15,000

**Deployment Costs (for municipality):**
- Cloud hosting (DigitalOcean/AWS): ₹3,000-10,000/month depending on scale
- Database: Included in hosting or managed PostgreSQL ₹2,000/month
- Domain + SSL: ₹1,000-2,000/year
- Maintenance: In-house staff or ₹20,000/month contract
- **Annual Operating Cost:** ₹60,000 - ₹1,50,000

**Savings:**
- Reduced staff time for manual complaint logging: ₹2,00,000/year
- Faster resolution = fewer repeat complaints: 30% efficiency gain
- Data-driven maintenance = optimized resource allocation: 15-20% budget efficiency
- Improved citizen satisfaction = reduced escalation costs

**Return on Investment:**
- System pays for itself within 6-12 months
- Long-term benefits in transparency and governance are invaluable

**Comparison:**
- Commercial solutions: ₹10-50 lakhs/year licensing
- **CivicFix 311:** < ₹2 lakhs/year total cost

**Verdict:** ✅ Economically viable and cost-effective

### 3.3.3 Operational Feasibility

**Assessment: Operationally Feasible with Change Management**

**User Adoption:**

*Citizens:*
- 750 million smartphone users in India
- Increasing digital literacy
- Preference for app-based services (UPI, e-commerce)
- **Mitigation:** Simple UI, vernacular language support (future), helpline for onboarding

*Officers:*
- Varying digital literacy levels
- Resistance to change from manual systems
- **Mitigation:** Training sessions, phased rollout, clear benefits communication

*Administrators:*
- Familiarity with digital dashboards
- Motivated by transparency goals
- **Mitigation:** Role-based training, analytics workshops

**Integration:**
- Standalone system, no need for legacy system integration initially
- Can be integrated with existing departmental systems via APIs later
- Municipal staff can continue parallel systems during transition period

**Support:**
- Online documentation and user guides
- Video tutorials for each role
- Helpdesk for technical issues
- Community forums for peer support

**Change Management Plan:**
1. **Phase 1 (Month 1):** Pilot in 2-3 wards with training
2. **Phase 2 (Month 2-3):** Citywide rollout with ongoing support
3. **Phase 3 (Month 4+):** Optimization based on feedback

**Verdict:** ✅ Operationally feasible with structured change management

### 3.3.4 Legal and Ethical Feasibility

**Assessment: Compliant with Safeguards**

**Data Privacy:**
- Complies with IT Act 2000 and upcoming Data Protection Bill
- No collection of sensitive personal data beyond name, email, phone
- Complaint data: public interest (addresses, photos of infrastructure)
- GDPR-like principles: data minimization, purpose limitation

**Security:**
- Password hashing (Django's PBKDF2)
- HTTPS encryption for data in transit
- SQL injection protection (ORM)
- CSRF and XSS protection built-in

**Accessibility:**
- Web Content Accessibility Guidelines (WCAG) compliance goal
- Keyboard navigation support
- Screen reader compatibility (semantic HTML)

**Ethical Considerations:**
- Transparent data usage (complaints are public)
- No user tracking/profiling
- Equal access to all citizens (no discrimination)
- Anonymization option for sensitive reports (future feature)

**Verdict:** ✅ Legally compliant with ethical safeguards

### 3.3.5 Schedule Feasibility

**Assessment: Feasible within Academic Timeline**

**Development Timeline:**
- Requirements & Design: 2 weeks
- Backend Development: 4 weeks
- Frontend Development: 4 weeks
- Integration & Testing: 2 weeks
- Documentation: 1 week
- **Total:** 13 weeks (3.25 months)

**Academic Calendar Fit:**
- Typical BTech Project-II: January-May (4-5 months)
- Leaves buffer for:
  - Iterations and feedback
  - Additional features
  - Report writing
  - Presentation preparation

**Verdict:** ✅ Feasible within academic semester

---

## 3.4 Requirements Specification

### 3.4.1 Hardware Requirements

**Table 3.1: Hardware Requirements**

| Component | Development | Production (Small City) | Production (Large City) |
|-----------|-------------|-------------------------|-------------------------|
| **Server** | Personal laptop | 2 vCPU, 4 GB RAM | 4 vCPU, 8 GB RAM |
| **Storage** | 10 GB | 50 GB SSD | 200 GB SSD |
| **Database** | Included | 2 GB RAM | 4 GB RAM |
| **Bandwidth** | Personal internet | 1 TB/month | 5 TB/month |
| **Client** | Any device with browser | Smartphone/Desktop | Smartphone/Desktop |

### 3.4.2 Software Requirements

**Table 3.2: Software Requirements**

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Operating System** | Linux (Ubuntu) | 20.04+ | Server OS |
| **Backend Framework** | Django | 6.0 | Web framework |
| **REST API** | Django REST Framework | 3.16+ | API development |
| **Database** | PostgreSQL | 14+ | Data storage |
| **Programming Language** | Python | 3.11+ | Backend logic |
| **Frontend Library** | React | 18 | UI development |
| **Routing** | React Router | 6 | SPA routing |
| **Styling** | Tailwind CSS | 3 | Responsive design |
| **Maps** | Leaflet | 1.9+ | Interactive maps |
| **Charts** | Recharts | 2.5+ | Data visualization |
| **Authentication** | SimpleJWT | 5.3+ | JWT tokens |
| **Web Server** | Gunicorn + Nginx | Latest | Production serving |
| **Containerization** | Docker | Latest | Deployment |
| **Version Control** | Git | Latest | Source code management |
| **IDE** | VS Code / PyCharm | Latest | Development |
| **API Testing** | Postman | Latest | API testing |
| **Browser** | Chrome / Firefox | Latest | Client access |

### 3.4.3 Functional Requirements

**Table 3.3: Functional Requirements**

| ID | Module | Requirement | Priority |
|----|--------|-------------|----------|
| **FR-01** | **User Management** | | |
| FR-01.1 | Registration | System shall allow citizens to self-register with email, name, phone, password | High |
| FR-01.2 | Login | System shall authenticate users with email/password and issue JWT tokens | High |
| FR-01.3 | Profile | Users shall view/edit profile (name, phone, ward, avatar) | Medium |
| FR-01.4 | Password | Users shall change password with current password verification | High |
| FR-01.5 | Roles | System shall support 4 roles: Citizen, Field Officer, Dept Head, Admin | High |
| FR-01.6 | User Management | Admins shall create/edit/delete user accounts | High |
| **FR-02** | **Complaint Management** | | |
| FR-02.1 | Submission | Citizens shall submit complaints with title, description, category, location, ward, photo | High |
| FR-02.2 | Auto-Route | System shall auto-assign complaints to departments based on category | High |
| FR-02.3 | List View | Users shall view complaints based on role (citizens: all, officers: assigned, dept heads: department) | High |
| FR-02.4 | Detail View | Users shall view complete complaint details including status history | High |
| FR-02.5 | Filtering | Users shall filter complaints by status, priority, ward, category, date range | Medium |
| FR-02.6 | Search | Users shall search complaints by ID, title, description, address | Medium |
| FR-02.7 | Assignment | Dept heads shall manually assign complaints to field officers | High |
| FR-02.8 | Status Update | Officers shall update status with optional notes and after-photos | High |
| FR-02.9 | Rejection | Officers/dept heads shall reject complaints with reasons | Medium |
| FR-02.10 | Confirmation | Citizens shall confirm resolution before closure | High |
| **FR-03** | **Community Features** | | |
| FR-03.1 | Upvoting | Citizens shall upvote any public complaint | High |
| FR-03.2 | Auto-Escalation | System shall auto-escalate priority: 50 upvotes → Medium, 100 → High | Medium |
| FR-03.3 | Public Visibility | All complaints shall be visible to all users (transparency) | High |
| FR-03.4 | Map View | System shall display complaints on interactive map with filters | High |
| **FR-04** | **Notifications** | | |
| FR-04.1 | In-App | System shall create in-app notifications for status changes, assignments | High |
| FR-04.2 | Email | System shall send email notifications for key events | Medium |
| FR-04.3 | Inbox | Users shall view notification inbox with read/unread status | Medium |
| FR-04.4 | Unread Count | System shall display unread notification count | Low |
| **FR-05** | **Analytics** | | |
| FR-05.1 | Summary | System shall display dashboard with total, pending, resolved complaint counts | High |
| FR-05.2 | Trends | System shall generate trend charts for configurable periods (7/14/30/60 days) | Medium |
| FR-05.3 | Category Breakdown | System shall show complaint distribution by category | Medium |
| FR-05.4 | Dept Performance | System shall show department resolution rates (admin/dept head only) | Medium |
| FR-05.5 | Ward Heatmap | System shall provide ward-wise complaint data for heatmap visualization | Low |
| FR-05.6 | Status Distribution | System shall show pie chart of status distribution | Low |
| **FR-06** | **SLA & Escalation** | | |
| FR-06.1 | SLA Monitoring | System shall track time since complaint submission | High |
| FR-06.2 | Breach Detection | System shall flag SLA breaches after configured hours (e.g., 24h) | Medium |
| FR-06.3 | Auto-Escalation | System shall send alerts for SLA breaches | Medium |
| **FR-07** | **Administration** | | |
| FR-07.1 | User Management | Admins shall list all users with search and filtering | High |
| FR-07.2 | Role Assignment | Admins shall assign roles to users | High |
| FR-07.3 | Dept/Category | Admins shall manage departments and categories via Django admin | Medium |
| FR-07.4 | System Analytics | Admins shall access all analytics dashboards | High |

### 3.4.4 Non-Functional Requirements

**Table 3.4: Non-Functional Requirements**

| ID | Category | Requirement | Metric |
|----|----------|-------------|--------|
| **NFR-01** | **Performance** | | |
| NFR-01.1 | Response Time | API responses shall complete within 2 seconds for 95% of requests | < 2s |
| NFR-01.2 | Page Load | Frontend pages shall load within 3 seconds on 4G connection | < 3s |
| NFR-01.3 | Concurrent Users | System shall support 1000 concurrent users without degradation | 1000 users |
| NFR-01.4 | Database | Query execution shall complete within 500ms for 95% of queries | < 500ms |
| **NFR-02** | **Scalability** | | |
| NFR-02.1 | Horizontal | System architecture shall support horizontal scaling | ✓ |
| NFR-02.2 | Data Volume | Database shall handle 100,000+ complaints | 100K+ records |
| NFR-02.3 | Pagination | Lists shall be paginated (20 items/page) to handle large datasets | 20/page |
| **NFR-03** | **Security** | | |
| NFR-03.1 | Authentication | System shall use JWT tokens with expiry (2 hours access, 7 days refresh) | JWT |
| NFR-03.2 | Authorization | System shall enforce role-based access control on all endpoints | RBAC |
| NFR-03.3 | Password | Passwords shall be hashed using PBKDF2 with SHA256 | PBKDF2 |
| NFR-03.4 | HTTPS | Production system shall enforce HTTPS for all communications | TLS 1.2+ |
| NFR-03.5 | Injection | System shall prevent SQL injection via ORM parameterization | ORM |
| NFR-03.6 | XSS | Frontend shall escape all user inputs to prevent XSS | React auto-escape |
| NFR-03.7 | CSRF | Backend shall implement CSRF protection for state-changing operations | CSRF tokens |
| NFR-03.8 | File Upload | System shall validate file types (images only) and size (< 5MB) | Validation |
| **NFR-04** | **Usability** | | |
| NFR-04.1 | Responsive | UI shall be responsive across desktop (1920px), tablet (768px), mobile (375px) | 3 breakpoints |
| NFR-04.2 | Intuitive | Common tasks (submit complaint, check status) shall require ≤ 3 clicks | ≤ 3 clicks |
| NFR-04.3 | Consistency | UI shall maintain consistent design language (colors, spacing, typography) | ✓ |
| NFR-04.4 | Feedback | System shall provide immediate feedback for all user actions | ✓ |
| NFR-04.5 | Error Messages | Error messages shall be clear and actionable | ✓ |
| **NFR-05** | **Reliability** | | |
| NFR-05.1 | Uptime | System shall maintain 99% uptime (excluding planned maintenance) | 99% |
| NFR-05.2 | Data Integrity | Database transactions shall be ACID-compliant | PostgreSQL ACID |
| NFR-05.3 | Backup | Database shall be backed up daily with 30-day retention | Daily |
| NFR-05.4 | Error Handling | System shall gracefully handle errors without exposing stack traces | ✓ |
| **NFR-06** | **Maintainability** | | |
| NFR-06.1 | Code Quality | Code shall follow PEP 8 (Python) and Airbnb (JavaScript) style guides | Linters |
| NFR-06.2 | Documentation | All APIs shall be documented with request/response schemas | ✓ |
| NFR-06.3 | Modularity | System shall use modular architecture (Django apps, React components) | ✓ |
| NFR-06.4 | Version Control | All code shall be tracked in Git with meaningful commits | Git |
| **NFR-07** | **Compatibility** | | |
| NFR-07.1 | Browsers | System shall support Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ | 4 browsers |
| NFR-07.2 | Devices | System shall work on iOS 14+, Android 10+, Windows 10+, macOS 11+ | Cross-platform |
| NFR-07.3 | Screen Sizes | UI shall adapt to screen widths 320px to 2560px | Responsive |
| **NFR-08** | **Accessibility** | | |
| NFR-08.1 | Standards | UI shall follow WCAG 2.1 Level AA guidelines where feasible | WCAG AA |
| NFR-08.2 | Keyboard | All functionality shall be accessible via keyboard | ✓ |
| NFR-08.3 | Contrast | Text shall have minimum 4.5:1 contrast ratio | 4.5:1 |

---
---

