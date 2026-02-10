# Library Management System

A full-stack Library Management System with role-based access control, built with **Spring Boot** (backend) and **React + TypeScript** (frontend).

## 🚀 Live Demo

- **Frontend:** [Vercel URL — TBD]
- **Backend API:** [Render URL — TBD]

### Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@library.com | Admin@123 |
| Librarian | librarian@library.com | Librarian@123 |

## 🛠️ Tech Stack

### Backend
- Java 17, Spring Boot 3.2
- Spring Security + JWT Authentication
- Spring Data JPA
- PostgreSQL (production) / MySQL (local dev)
- Maven

### Frontend
- React 18 + TypeScript 5
- Vite (build tool)
- Material-UI v7
- React Router v6
- Axios
- React Hook Form

## 📦 Features

- **Authentication**: JWT-based login with role-based access (Admin / Librarian)
- **Books Management**: CRUD operations, search, card/list views
- **User Management**: Admin-only user CRUD
- **Issue Management**: Issue books, return with overdue/fine calculation
- **Dashboard**: Real-time statistics with visual cards
- **Responsive UI**: Dark teal theme, professional design

## 🖥️ Local Development

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8 (local) or PostgreSQL

### Backend
```bash
cd backend
mvn spring-boot:run
```
Runs on `http://localhost:8080`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

## ☁️ Deployment

### Backend → Render
1. Push to GitHub
2. Create a **PostgreSQL** database on Render
3. Create a **Web Service** → select **Docker** environment
4. Set these environment variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `jdbc:postgresql://HOST:5432/DB_NAME` |
| `DB_USERNAME` | from Render PostgreSQL |
| `DB_PASSWORD` | from Render PostgreSQL |
| `JWT_SECRET` | your-strong-secret-key |
| `SPRING_PROFILES_ACTIVE` | `prod` |
| `ALLOWED_ORIGINS` | `https://your-app.vercel.app` |

### Frontend → Vercel
1. Import GitHub repo → set **Root Directory** to `frontend`
2. Framework: **Vite**
3. Set environment variable:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://your-render-url.onrender.com/api` |

## 📁 Project Structure

```
Library Management System/
├── backend/                 # Spring Boot API
│   ├── src/main/java/com/library/management/
│   │   ├── config/          # Security, CORS config
│   │   ├── controller/      # REST controllers
│   │   ├── model/           # JPA entities
│   │   ├── repository/      # Data repositories
│   │   ├── security/        # JWT filter, utilities
│   │   └── service/         # Business logic
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                # React + Vite
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── hooks/           # Custom React hooks
│   │   └── types/           # TypeScript interfaces
│   ├── vercel.json
│   └── package.json
└── README.md
```
