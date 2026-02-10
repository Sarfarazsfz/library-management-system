# 🚀 How to Run the Library Management System Backend

## ✅ Quick Start (No MySQL Required!)

The application is now configured to use **H2 in-memory database** by default, so you can run it immediately without installing MySQL!

### Method 1: Using Maven Wrapper (Recommended)

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

### Method 2: Using Maven (if installed)

```bash
cd backend
mvn spring-boot:run
```

### Method 3: Using IDE (IntelliJ IDEA / Eclipse)

1. Open the project in your IDE
2. Navigate to `src/main/java/com/library/management/LibraryManagementApplication.java`
3. Right-click → Run 'LibraryManagementApplication'

---

## 🗄️ Database Options

### Option 1: H2 In-Memory Database (Default) ✅

**No setup required!** Just run the application.

- **URL:** `jdbc:h2:mem:library_db`
- **Username:** `sa`
- **Password:** (empty)
- **H2 Console:** http://localhost:8080/h2-console

**Note:** Data is stored in memory and will be lost when the application stops.

---

### Option 2: MySQL Database

If you want to use MySQL instead:

1. **Start MySQL Service:**
   - Windows: Press `Win + R` → type `services.msc` → Find "MySQL80" → Start
   - Or run as Administrator: `net start MySQL80`

2. **Run with MySQL profile:**
   ```bash
   .\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=mysql
   ```

**MySQL Configuration:**
- **URL:** `jdbc:mysql://localhost:3306/library_db`
- **Username:** `root`
- **Password:** `root`

---

### Option 3: PostgreSQL (Production - Render)

For production deployment:

```bash
.\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=prod
```

Requires environment variables:
- `DATABASE_URL`
- `DB_USERNAME`
- `DB_PASSWORD`

---

## 🔧 Troubleshooting

### Error: "Connection refused" or "Communications link failure"

**Solution:** The application is trying to connect to MySQL, but it's not running.

**Fix:**
1. Use the default H2 database (no changes needed)
2. Or start MySQL service (see Option 2 above)

### Error: "mvn is not recognized"

**Solution:** Maven is not in your PATH.

**Fix:** Use the Maven wrapper instead:
```bash
.\mvnw.cmd spring-boot:run
```

### Error: Maven wrapper fails

**Solution:** Download Maven or use your IDE to run the application.

---

## 📝 API Endpoints

Once running, the application will be available at:

- **Base URL:** http://localhost:8080
- **H2 Console:** http://localhost:8080/h2-console (if using H2)
- **API Documentation:** (Add Swagger/OpenAPI if needed)

### Example Endpoints:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/books` - Get all books
- `POST /api/books` - Add new book (requires authentication)

---

## 🎯 Summary

**For immediate testing:**
```bash
cd backend
.\mvnw.cmd spring-boot:run
```

The application will start with H2 database on http://localhost:8080

**No MySQL installation required!** 🎉
