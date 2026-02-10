# Database Setup Guide

## Problem: MySQL Connection Error

If you see the error `Connection refused: getsockopt`, it means MySQL is not running or not accessible.

## Solutions

### Option 1: Use H2 In-Memory Database (Quickest - No MySQL Required) ✅

Run the application with the `dev` profile to use H2 database:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

**Benefits:**
- No MySQL installation required
- Works immediately
- Perfect for development and testing
- Access H2 Console at: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:library_db`
  - Username: `sa`
  - Password: (leave empty)

**Note:** Data is stored in memory and will be lost when the application stops.

---

### Option 2: Start MySQL Service

#### Windows:
1. Press `Win + R`, type `services.msc`, press Enter
2. Find "MySQL80" (or your MySQL version)
3. Right-click → Start

#### Or use Command Prompt (Run as Administrator):
```cmd
net start MySQL80
```

Then run normally:
```bash
mvn spring-boot:run
```

---

### Option 3: Install MySQL

If MySQL is not installed:

1. Download MySQL Community Server: https://dev.mysql.com/downloads/mysql/
2. Install and set root password to `root` (or update `application.properties`)
3. Start MySQL service
4. Run the application:
```bash
mvn spring-boot:run
```

---

## Database Configuration

### Default (MySQL - Local):
- URL: `jdbc:mysql://localhost:3306/library_db`
- Username: `root`
- Password: `root`

### Development (H2 - In-Memory):
- URL: `jdbc:h2:mem:library_db`
- Username: `sa`
- Password: (empty)

### Production (PostgreSQL - Render):
- Configured via environment variables

---

## Quick Start

**Recommended for immediate testing:**
```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

The application will start on http://localhost:8080 with H2 database.
