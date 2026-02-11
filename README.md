# 📚 Library Management System

<div align="center">

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

A modern, full-stack library management solution with role-based access control, built for efficiency and scalability.

[Live Demo](#-live-demo) • [Features](#-features) • [Documentation](#-documentation) • [Installation](#-installation)

</div>

---

## 📖 Overview

The Library Management System is a comprehensive web application designed to streamline library operations. Built with enterprise-grade technologies, it offers a robust backend API powered by Spring Boot and an intuitive, responsive frontend using React and TypeScript.

### Key Highlights

- 🔐 **Secure Authentication** - JWT-based authentication with role-based access control
- 📊 **Real-time Dashboard** - Interactive statistics and analytics
- 🎨 **Modern UI/UX** - Responsive design with Material-UI components
- 🚀 **Production Ready** - Dockerized deployment with CI/CD support
- 🔍 **Advanced Search** - Efficient book cataloging and search functionality

### 🚀 Quick Start

**Try It Live**
1. Visit [library-management-system-alpha-lac.vercel.app](https://library-management-system-alpha-lac.vercel.app)
2. Login with demo credentials (see below)

**Run Locally**
```bash
# Clone the repository
git clone https://github.com/yourusername/library-management-system.git

# Start Backend
cd backend
mvn spring-boot:run

# Start Frontend (new terminal)
cd frontend
npm install && npm run dev
```
Visit `http://localhost:5173` and you're ready to go!


---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          Client Layer (Browser)                          │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    React + TypeScript (Vite)                     │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │   │
│  │  │   Pages  │  │Components│  │  Hooks   │  │   Services   │   │   │
│  │  │          │  │          │  │          │  │              │   │   │
│  │  │ Dashboard│  │  Cards   │  │ useAuth  │  │  API Client  │   │   │
│  │  │  Books   │  │  Forms   │  │          │  │   (Axios)    │   │   │
│  │  │  Users   │  │  Tables  │  │          │  │              │   │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                    │                                     │
│                                    │ HTTPS (REST API)                    │
│                                    │                                     │
└────────────────────────────────────┼─────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       Application Layer (Render)                         │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                  Spring Boot 3.2 (Java 17)                       │   │
│  │                                                                   │   │
│  │  ┌─────────────────────────────────────────────────────────┐   │   │
│  │  │              Security Layer (Spring Security)            │   │   │
│  │  │  ┌────────────────┐  ┌─────────────────────────────┐   │   │   │
│  │  │  │ JWT Filter     │  │   Authentication Manager    │   │   │   │
│  │  │  └────────────────┘  └─────────────────────────────┘   │   │   │
│  │  └─────────────────────────────────────────────────────────┘   │   │
│  │                                                                   │   │
│  │  ┌─────────────────────────────────────────────────────────┐   │   │
│  │  │                  Controller Layer                        │   │   │
│  │  │  • AuthController    • BookController                    │   │   │
│  │  │  • UserController    • IssueController                   │   │   │
│  │  └─────────────────────────────────────────────────────────┘   │   │
│  │                           │                                     │   │
│  │  ┌─────────────────────────────────────────────────────────┐   │   │
│  │  │                   Service Layer                          │   │   │
│  │  │  • AuthService      • BookService                        │   │   │
│  │  │  • UserService      • IssueService                       │   │   │
│  │  │  (Business Logic, Validation, Fine Calculation)          │   │   │
│  │  └─────────────────────────────────────────────────────────┘   │   │
│  │                           │                                     │   │
│  │  ┌─────────────────────────────────────────────────────────┐   │   │
│  │  │              Repository Layer (Spring Data JPA)          │   │   │
│  │  │  • UserRepository    • BookRepository                    │   │   │
│  │  │  • IssueRepository                                       │   │   │
│  │  └─────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                    │                                     │
│                                    │ JDBC                                │
│                                    ▼                                     │
└─────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      Data Layer (Render PostgreSQL)                      │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      PostgreSQL Database                         │   │
│  │                                                                   │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │   │
│  │  │  users   │  │  books   │  │  issues  │  │  roles       │   │   │
│  │  │          │  │          │  │          │  │              │   │   │
│  │  │ • id     │  │ • id     │  │ • id     │  │ • id         │   │   │
│  │  │ • email  │  │ • isbn   │  │ • bookId │  │ • name       │   │   │
│  │  │ • pass   │  │ • title  │  │ • userId │  │ • privileges │   │   │
│  │  │ • role   │  │ • author │  │ • issueD │  │              │   │   │
│  │  │          │  │ • status │  │ • returnD│  │              │   │   │
│  │  │          │  │          │  │ • fine   │  │              │   │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Architecture Components

#### **Frontend (Vercel)**
- **Framework**: React 18 with TypeScript for type-safe development
- **Build Tool**: Vite for lightning-fast HMR and optimized builds
- **UI Library**: Material-UI v7 for consistent, professional components
- **State Management**: React Context API + Custom Hooks
- **Routing**: React Router v6 for client-side navigation
- **API Communication**: Axios with interceptors for JWT handling

#### **Backend (Render)**
- **Framework**: Spring Boot 3.2 with embedded Tomcat server
- **Security**: Spring Security with JWT token-based authentication
- **Data Layer**: Spring Data JPA with Hibernate ORM
- **Architecture**: Layered architecture (Controller → Service → Repository)
- **Validation**: Bean Validation (JSR-380) for input validation

#### **Database (Render PostgreSQL)**
- **Type**: PostgreSQL 15 (Relational Database)
- **Features**: ACID compliance, referential integrity, indexing
- **Connection Pooling**: HikariCP for efficient connection management

### Data Flow

1. **User Request**: User interacts with React frontend
2. **API Call**: Axios sends HTTP request with JWT token
3. **Authentication**: JWT Filter validates token
4. **Controller**: Routes request to appropriate controller
5. **Service Layer**: Executes business logic
6. **Repository**: Performs database operations via JPA
7. **Database**: PostgreSQL processes query
8. **Response**: Data flows back through layers to frontend

---

## 🚀 Live Demo

Experience the application live:

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | [https://library-management-system-alpha-lac.vercel.app](https://library-management-system-alpha-lac.vercel.app) | 🟢 Live |
| **Backend API** | [https://library-api-rfxm.onrender.com/api](https://library-api-rfxm.onrender.com/api) | 🟢 Live |

> **Note:** The backend may take 30-60 seconds to wake up on first request due to Render's free tier cold starts.

### 🔑 Demo Credentials

Test the application with these pre-configured accounts:

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Admin** | admin@library.com | Admin@123 | Full system access |
| **Librarian** | librarian@library.com | Librarian@123 | Book & issue management |

> ⚠️ **Security Note:** These are demo credentials. Change default passwords in production environments.

---

## 📸 Screenshots

<div align="center">

### 🔐 Login Page
<img width="950" alt="image" src="https://github.com/user-attachments/assets/56d5f36e-afdd-4e1e-97a3-f08b75b01460" />

### 📊 Dashboard
<img width="950" alt="image" src="https://github.com/user-attachments/assets/ac5dc47e-a687-468e-868a-240b49bc945e" />

### 📚 Books Management
<img width="950" alt="image" src="https://github.com/user-attachments/assets/e9fbcb41-20b1-4da6-b7c7-181b80b75b57" />

### 📋 Issue Management
<img width="900" alt="image" src="https://github.com/user-attachments/assets/494701dc-fd50-4828-94d0-9266b88462ad" />

</div>

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT token-based authentication
- Role-based access control (RBAC)
- Secure password encryption
- Session management

### 📚 Book Management
- Complete CRUD operations
- Advanced search and filtering
- ISBN validation
- Book availability tracking
- Multiple view modes (Card/List)
- Category management

### 👥 User Management
- User registration and profiles
- Admin-controlled user CRUD
- Role assignment
- User activity tracking

### 📋 Issue Management
- Book checkout system
- Return processing
- Overdue tracking
- Automatic fine calculation
- Issue history and analytics

### 📊 Dashboard & Analytics
- Real-time statistics
- Visual data representation
- Quick action cards
- System health monitoring

### 🎨 User Interface
- Responsive design for all devices
- Professional dark teal theme
- Intuitive navigation
- Form validation with user feedback
- Loading states and error handling

---

## 🛠️ Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17 | Core language |
| Spring Boot | 3.2 | Application framework |
| Spring Security | 6.x | Authentication & authorization |
| Spring Data JPA | 3.2 | Data persistence |
| PostgreSQL | 15+ | Production database |
| MySQL | 8.0 | Local development database |
| Maven | 3.8+ | Dependency management |
| Lombok | Latest | Boilerplate reduction |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18 | UI framework |
| TypeScript | 5 | Type safety |
| Vite | 5.x | Build tool & dev server |
| Material-UI | 7 | Component library |
| React Router | 6 | Client-side routing |
| Axios | 1.x | HTTP client |
| React Hook Form | 7.x | Form management |

### DevOps & Deployment

- **Containerization:** Docker
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Render
- **Database:** PostgreSQL (Cloud)
- **Version Control:** Git

### Why These Technologies?

| Technology | Reason |
|------------|--------|
| **Spring Boot** | Rapid development, auto-configuration, production-ready features |
| **React + TypeScript** | Type-safe development, component reusability, strong ecosystem |
| **PostgreSQL** | ACID compliance, reliability, advanced features for production |
| **JWT** | Stateless authentication, scalable across multiple servers |
| **Material-UI** | Professional components, accessibility, responsive design |
| **Vite** | Lightning-fast HMR, optimized builds, modern development experience |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK)** 17 or higher
- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **MySQL** 8.0+ (for local development) or **PostgreSQL** 15+
- **Maven** 3.8+ (or use Maven wrapper)
- **Git** for version control

---

## 🚀 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/library-management-system.git
cd library-management-system
```

### 2️⃣ Backend Setup

#### Configure Database

Create a MySQL database:

```sql
CREATE DATABASE library_management;
```

Update `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/library_management
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT Configuration
jwt.secret=your-secret-key-min-256-bits
jwt.expiration=86400000

# Server Configuration
server.port=8080
```

#### Install Dependencies & Run

```bash
cd backend

# Using Maven
mvn clean install
mvn spring-boot:run

# Using Maven Wrapper
./mvnw clean install
./mvnw spring-boot:run
```

The backend API will be available at `http://localhost:8080`

**API Documentation:** `http://localhost:8080/swagger-ui.html` (if Swagger is configured)

### 3️⃣ Frontend Setup

#### Configure Environment

Create `frontend/.env`:

```env
# For local development
VITE_API_URL=http://localhost:8080/api

# For production (Vercel deployment)
# VITE_API_URL=https://library-api-rfxm.onrender.com/api
```

#### Install Dependencies & Run

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 4️⃣ Environment Variables Reference

#### Backend Environment Variables

Create `backend/src/main/resources/application-local.properties`:

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/library_management
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JWT Configuration
jwt.secret=YourSuperSecretKeyMustBeAtLeast256BitsLongForHS256Algorithm
jwt.expiration=86400000

# CORS Configuration
allowed.origins=http://localhost:5173

# Logging
logging.level.com.library.management=DEBUG
```

#### Frontend Environment Variables

Create `frontend/.env.local`:

```env
# API Base URL
VITE_API_URL=http://localhost:8080/api

# App Configuration
VITE_APP_NAME=Library Management System
VITE_APP_VERSION=1.0.0

# Feature Flags (optional)
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

---

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

Create a `docker-compose.yml` in the project root:

```yaml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: library_management
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: jdbc:postgresql://db:5432/library_management
      DB_USERNAME: admin
      DB_PASSWORD: admin123
      JWT_SECRET: your-secret-key
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    environment:
      VITE_API_URL: http://localhost:8080/api

volumes:
  postgres_data:
```

Run the application:

```bash
docker-compose up -d
```

---

## ☁️ Cloud Deployment

### Backend Deployment (Render)

1. **Create PostgreSQL Database**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Create a new PostgreSQL database
   - Save the connection details

2. **Deploy Web Service**
   - Create a new Web Service
   - Connect your GitHub repository
   - Select Docker environment
   - Configure build settings:
     - **Build Command:** `docker build -t library-backend ./backend`
     - **Start Command:** Auto-detected from Dockerfile

3. **Environment Variables**

   | Variable | Description | Example |
   |----------|-------------|---------|
   | `DATABASE_URL` | PostgreSQL connection string | `jdbc:postgresql://host:5432/dbname` |
   | `DB_USERNAME` | Database username | From Render dashboard |
   | `DB_PASSWORD` | Database password | From Render dashboard |
   | `JWT_SECRET` | Secret key for JWT (min 256 bits) | `your-strong-secret-key-here` |
   | `SPRING_PROFILES_ACTIVE` | Active profile | `prod` |
   | `ALLOWED_ORIGINS` | CORS allowed origins | `https://library-management-system-alpha-lac.vercel.app` |

4. **Deploy**
   - Click "Create Web Service"
   - Wait for build completion
   - Your API will be live at: `https://library-api-rfxm.onrender.com/api`

### Frontend Deployment (Vercel)

1. **Import Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository
   - Configure project:
     - **Framework Preset:** Vite
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`

2. **Environment Variables**

   | Variable | Value |
   |----------|-------|
   | `VITE_API_URL` | `https://library-api-rfxm.onrender.com/api` |

3. **Deploy**
   - Click "Deploy"
   - Your app will be live at: `https://library-management-system-alpha-lac.vercel.app`

> **Production URLs:**
> - Frontend: https://library-management-system-alpha-lac.vercel.app
> - Backend: https://library-api-rfxm.onrender.com/api

---

## 📁 Project Structure

```
library-management-system/
│
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/library/management/
│   │   │   │   ├── config/          # Configuration classes
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   └── CorsConfig.java
│   │   │   │   ├── controller/      # REST API controllers
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── BookController.java
│   │   │   │   │   ├── UserController.java
│   │   │   │   │   └── IssueController.java
│   │   │   │   ├── model/           # JPA entities
│   │   │   │   │   ├── User.java
│   │   │   │   │   ├── Book.java
│   │   │   │   │   └── Issue.java
│   │   │   │   ├── repository/      # Spring Data repositories
│   │   │   │   │   ├── UserRepository.java
│   │   │   │   │   ├── BookRepository.java
│   │   │   │   │   └── IssueRepository.java
│   │   │   │   ├── security/        # Security components
│   │   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   │   └── UserDetailsServiceImpl.java
│   │   │   │   ├── service/         # Business logic
│   │   │   │   │   ├── AuthService.java
│   │   │   │   │   ├── BookService.java
│   │   │   │   │   ├── UserService.java
│   │   │   │   │   └── IssueService.java
│   │   │   │   └── dto/             # Data Transfer Objects
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── application-prod.properties
│   │   └── test/                    # Unit and integration tests
│   ├── Dockerfile
│   ├── pom.xml
│   └── .dockerignore
│
├── frontend/                         # React Frontend
│   ├── public/
│   │   └── assets/
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── common/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── DataTable.tsx
│   │   │   └── forms/
│   │   │       ├── LoginForm.tsx
│   │   │       └── BookForm.tsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Books.tsx
│   │   │   ├── Users.tsx
│   │   │   ├── Issues.tsx
│   │   │   └── Login.tsx
│   │   ├── services/                # API services
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   ├── bookService.ts
│   │   │   └── userService.ts
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   └── useDebounce.ts
│   │   ├── types/                   # TypeScript interfaces
│   │   │   ├── Book.ts
│   │   │   ├── User.ts
│   │   │   └── Issue.ts
│   │   ├── utils/                   # Utility functions
│   │   │   └── helpers.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── router.tsx
│   ├── .env.example
│   ├── vercel.json
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🔌 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/register` | User registration | No |
| POST | `/api/auth/refresh` | Refresh JWT token | Yes |

### Book Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/books` | Get all books | Yes |
| GET | `/api/books/{id}` | Get book by ID | Yes |
| POST | `/api/books` | Create new book | Yes (Admin) |
| PUT | `/api/books/{id}` | Update book | Yes (Admin) |
| DELETE | `/api/books/{id}` | Delete book | Yes (Admin) |
| GET | `/api/books/search?q={query}` | Search books | Yes |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Get all users | Yes (Admin) |
| GET | `/api/users/{id}` | Get user by ID | Yes (Admin) |
| POST | `/api/users` | Create new user | Yes (Admin) |
| PUT | `/api/users/{id}` | Update user | Yes (Admin) |
| DELETE | `/api/users/{id}` | Delete user | Yes (Admin) |

### Issue Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/issues` | Get all issues | Yes |
| POST | `/api/issues` | Issue a book | Yes |
| PUT | `/api/issues/{id}/return` | Return a book | Yes |
| GET | `/api/issues/overdue` | Get overdue issues | Yes |

---

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication with expiration
- **Password Encryption**: BCrypt hashing with salt rounds
- **CORS Protection**: Configured allowed origins for production
- **SQL Injection Prevention**: Parameterized queries via JPA
- **XSS Protection**: Input sanitization and validation
- **HTTPS Only**: All production traffic encrypted via TLS
- **Role-Based Access Control**: Fine-grained permission system
- **Environment Variables**: Sensitive data stored securely

## ⚡ Performance Optimizations

### Backend
- **Connection Pooling**: HikariCP for efficient database connections
- **Query Optimization**: Indexed database columns for faster searches
- **Lazy Loading**: JPA lazy fetching to reduce memory footprint
- **Caching**: Spring Cache abstraction for frequently accessed data
- **Pagination**: Server-side pagination for large datasets

### Frontend
- **Code Splitting**: Route-based lazy loading
- **Tree Shaking**: Vite removes unused code
- **Asset Optimization**: Compressed images and minified bundles
- **CDN Delivery**: Vercel Edge Network for global distribution
- **Memoization**: React.memo and useMemo for expensive computations

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
mvn test

# Run with coverage
mvn test jacoco:report

# View coverage report
open target/site/jacoco/index.html
```

### Frontend Tests

```bash
cd frontend

# Run unit tests
npm run test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Backend takes long to respond on first request
- **Solution**: Render free tier has cold starts. Wait 30-60 seconds for the service to wake up.

**Problem**: Database connection errors
- **Solution**: Verify `DATABASE_URL`, `DB_USERNAME`, and `DB_PASSWORD` environment variables are correct.

**Problem**: CORS errors in browser console
- **Solution**: Ensure `ALLOWED_ORIGINS` environment variable includes your frontend URL.

**Problem**: JWT token expired errors
- **Solution**: Check `jwt.expiration` in application.properties. Default is 24 hours.

### Frontend Issues

**Problem**: API calls failing with 404
- **Solution**: Verify `VITE_API_URL` in `.env` points to the correct backend URL.

**Problem**: Build fails on Vercel
- **Solution**: Check that all dependencies are in `package.json` and `tsconfig.json` is valid.

**Problem**: Blank page after deployment
- **Solution**: Check browser console for errors. Ensure environment variables are set in Vercel.

**Problem**: Authentication not persisting
- **Solution**: Check if browser is blocking localStorage/sessionStorage or if tokens are expiring too quickly.

### Common Issues

**Problem**: "Cannot connect to database" error locally
- **Solution**: Ensure MySQL/PostgreSQL is running and credentials in `application.properties` are correct.

**Problem**: Port already in use
- **Solution**: Kill the process using the port or change port in configuration:
  ```bash
  # Find process on port 8080
  lsof -i :8080
  # Kill process
  kill -9 <PID>
  ```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow Java Code Conventions for backend
- Follow Airbnb React/TypeScript Style Guide for frontend
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 🗺️ Roadmap

### Phase 1 - Core Features ✅
- [x] User authentication and authorization
- [x] Book CRUD operations
- [x] Issue and return management
- [x] Basic dashboard
- [x] Deployment to production

### Phase 2 - Enhanced Features 🚧
- [ ] Email notifications for overdue books
- [ ] QR code generation for books
- [ ] Book reservation system
- [ ] Advanced analytics and reports
- [ ] Export data to PDF/Excel
- [ ] Mobile responsive improvements

### Phase 3 - Advanced Features 📋
- [ ] Multi-library support
- [ ] Book recommendation system
- [ ] Integration with external book APIs
- [ ] Real-time notifications using WebSocket
- [ ] Mobile app (React Native)
- [ ] Barcode scanner integration

### Phase 4 - Enterprise Features 🎯
- [ ] Multi-tenancy support
- [ ] Advanced reporting and BI dashboards
- [ ] Integration with payment gateways for fines
- [ ] Book procurement management
- [ ] Inventory management
- [ ] API rate limiting and monitoring

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Md Sarfaraz Alam**

- GitHub: [@Sarfarazsfz](https://github.com/Sarfarazsfz)
- LinkedIn: https://www.linkedin.com/in/faraz4237
- Email: sarfaraz.alam.dev@gmail.com

---

## 🙏 Acknowledgments

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [Material-UI](https://mui.com/)
- [Vite](https://vitejs.dev/)

---

## ❓ Frequently Asked Questions (FAQ)

<details>
<summary><b>Q: Can I use this project for commercial purposes?</b></summary>
<br>
A: Yes, this project is licensed under MIT License, which allows commercial use.
</details>

<details>
<summary><b>Q: How do I reset the admin password?</b></summary>
<br>
A: You can reset it directly in the database or use the password reset API endpoint. For security, passwords are BCrypt hashed.
</details>

<details>
<summary><b>Q: Can I use MySQL instead of PostgreSQL?</b></summary>
<br>
A: Yes! Update the dependencies in pom.xml and change the database configuration in application.properties.
</details>

<details>
<summary><b>Q: Is there a limit to the number of books I can add?</b></summary>
<br>
A: No hard limit in the application. The limit depends on your database capacity and hosting plan.
</details>

<details>
<summary><b>Q: How are fines calculated?</b></summary>
<br>
A: Fines are calculated based on the number of overdue days multiplied by a configurable daily fine rate set in the backend.
</details>

<details>
<summary><b>Q: Can I customize the theme colors?</b></summary>
<br>
A: Yes! Modify the theme configuration in the frontend code. Material-UI themes are fully customizable.
</details>

<details>
<summary><b>Q: Why does the backend take time to respond on first load?</b></summary>
<br>
A: The free tier of Render has "cold starts" - the server spins down after inactivity and takes 30-60 seconds to wake up.
</details>

<details>
<summary><b>Q: How can I contribute to this project?</b></summary>
<br>
A: Fork the repository, make your changes, and submit a pull request. See the Contributing section for guidelines.
</details>

---

## 📞 Support

If you have any questions, suggestions, or feedback, feel free to open an issue in this repository or contact me directly at:

📧 **sarfaraz.alam.dev@gmail.com**

---

<div align="center">

⭐ **If you found this project helpful, please consider giving it a star!**

Made with ❤️ by **Md Sarfaraz Alam**

</div>
