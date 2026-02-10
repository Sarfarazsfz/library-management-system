# MySQL Database Setup Guide

## 📋 Files Included

1. **sample_data.sql** - Complete database schema + initial sample data
2. **additional_data.sql** - More books and records for extensive testing
3. **quick_queries.sql** - Useful queries for testing and verification

## 🚀 How to Import Data into MySQL

### Method 1: Using MySQL Workbench (GUI)

1. **Open MySQL Workbench**
2. **Connect to your MySQL server**
3. **Click** on "File" → "Open SQL Script"
4. **Select** `sample_data.sql`
5. **Click** the lightning bolt icon (⚡) to execute
6. **Repeat** for `additional_data.sql` (optional)

### Method 2: Using MySQL Command Line

```bash
# Navigate to the database folder
cd "E:\III-II\SE\Project\Library Management System\backend\database"

# Login to MySQL
mysql -u root -p

# Run the SQL files
source sample_data.sql
source additional_data.sql

# Exit MySQL
exit
```

### Method 3: Direct Command (Windows)

```cmd
cd "E:\III-II\SE\Project\Library Management System\backend\database"

mysql -u root -p < sample_data.sql
mysql -u root -p < additional_data.sql
```

### Method 4: One-Line Command

```bash
mysql -u root -p library_db < sample_data.sql
```

## 📊 What's Included

### Users (4 accounts)
- **Admin**: admin@library.com (password: admin123)
- **Librarian**: librarian@library.com (password: librarian123)
- **Jane Doe**: jane.doe@library.com (password: password123)
- **Mike Wilson**: mike.wilson@library.com (password: password123)

### Books (41 books total)
- **Programming**: 10 books (Clean Code, Design Patterns, etc.)
- **Fiction**: 10 books (1984, Harry Potter, etc.)
- **Science**: 8 books (Sapiens, Cosmos, etc.)
- **Business**: 8 books (Atomic Habits, Rich Dad Poor Dad, etc.)
- **Children**: 5 books (Cat in the Hat, Charlotte's Web, etc.)

### Issue Records (20 records)
- **Active Issues**: 7 books currently borrowed
- **Returned**: 10 completed transactions
- **Overdue**: 3 books with fines

## 🔐 Login Credentials

All passwords are BCrypt hashed. Use these credentials to login:

| Email | Password | Role |
|-------|----------|------|
| admin@library.com | admin123 | ADMIN |
| librarian@library.com | librarian123 | LIBRARIAN |
| jane.doe@library.com | password123 | LIBRARIAN |
| mike.wilson@library.com | password123 | LIBRARIAN |

## ✅ Verification

After importing, verify the data:

```sql
-- Check users
SELECT id, name, email, role FROM user;

-- Check books count
SELECT COUNT(*) as total_books FROM book;

-- Check available books
SELECT title, author, available_copies FROM book WHERE available_copies > 0;

-- Check active issues
SELECT i.id, b.title, i.member_name, i.status 
FROM issue i 
JOIN book b ON i.book_id = b.id 
WHERE i.status = 'ISSUED';
```

## 🔧 Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"
**Solution**: Make sure MySQL is running and you're using the correct password.

### Error: "Unknown database 'library_db'"
**Solution**: The script creates the database automatically. Just run `sample_data.sql`.

### Error: "Table already exists"
**Solution**: The script drops existing tables first. If you want to keep existing data, comment out the DROP TABLE statements.

## 📝 Next Steps

After importing the data:

1. **Start your Spring Boot application** with MySQL profile:
   ```bash
   .\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=mysql
   ```

2. **Test the API** using the login credentials above

3. **Verify** that books and issues are displayed correctly

## 🎯 Quick Test Scenarios

1. **Login as Admin**: admin@library.com / admin123
2. **View all books**: Should see 41 books (or 21 with just sample_data.sql)
3. **Check issued books**: Should see active borrowing records
4. **View overdue books**: Should see books with fines
5. **Issue a new book**: Test the borrowing functionality
6. **Return a book**: Test the return functionality

---

**Need help?** Check the main `HOW_TO_RUN.md` for application setup instructions.
