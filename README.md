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

---

## 🚀 Live Demo

> **Note:** Demo links will be updated upon deployment

| Service | URL | Status |
|---------|-----|--------|
| Frontend | [Vercel URL — TBD] | 🟡 Coming Soon |
| Backend API | [Render URL — TBD] | 🟡 Coming Soon |

### 🔑 Demo Credentials

Test the application with these pre-configured accounts:

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Admin** | admin@library.com | Admin@123 | Full system access |
| **Librarian** | librarian@library.com | Librarian@123 | Book & issue management |

> ⚠️ **Security Note:** These are demo credentials. Change default passwords in production environments.

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
VITE_API_URL=http://localhost:8080/api
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
   | `ALLOWED_ORIGINS` | CORS allowed origins | `https://your-app.vercel.app` |

4. **Deploy**
   - Click "Create Web Service"
   - Wait for build completion

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
   | `VITE_API_URL` | `https://your-backend.onrender.com/api` |

3. **Deploy**
   - Click "Deploy"
   - Access your app at the provided Vercel URL

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

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [Material-UI](https://mui.com/)
- [Vite](https://vitejs.dev/)

---

## 📞 Support

For support, email your.email@example.com or open an issue in the repository.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Your Name]

</div>
