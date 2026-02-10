-- ============================================
-- USEFUL QUERIES FOR TESTING
-- Library Management System
-- ============================================

USE library_db;

-- ============================================
-- USER QUERIES
-- ============================================

-- View all users
SELECT id, name, email, role, phone, is_active, created_at 
FROM user 
ORDER BY id;

-- Count users by role
SELECT role, COUNT(*) as count 
FROM user 
GROUP BY role;

-- Active users only
SELECT id, name, email, role 
FROM user 
WHERE is_active = TRUE;

-- ============================================
-- BOOK QUERIES
-- ============================================

-- All books with availability
SELECT id, title, author, isbn, category, quantity, available_copies, price 
FROM book 
ORDER BY title;

-- Books by category
SELECT category, COUNT(*) as total_books, SUM(quantity) as total_copies 
FROM book 
GROUP BY category 
ORDER BY total_books DESC;

-- Available books only
SELECT title, author, category, available_copies 
FROM book 
WHERE available_copies > 0 
ORDER BY category, title;

-- Out of stock books
SELECT title, author, category, quantity 
FROM book 
WHERE available_copies = 0;

-- Most expensive books
SELECT title, author, price 
FROM book 
ORDER BY price DESC 
LIMIT 10;

-- Books by publication year
SELECT publication_year, COUNT(*) as count 
FROM book 
WHERE publication_year IS NOT NULL 
GROUP BY publication_year 
ORDER BY publication_year DESC;

-- Search books by title (example)
SELECT title, author, isbn, available_copies 
FROM book 
WHERE title LIKE '%Java%' OR author LIKE '%Java%';

-- ============================================
-- ISSUE QUERIES
-- ============================================

-- All issues with book details
SELECT 
    i.id,
    b.title,
    b.author,
    i.member_name,
    i.member_email,
    i.issue_date,
    i.due_date,
    i.return_date,
    i.fine,
    i.status
FROM issue i
JOIN book b ON i.book_id = b.id
ORDER BY i.id DESC;

-- Active issues (currently borrowed)
SELECT 
    i.id,
    b.title,
    i.member_name,
    i.issue_date,
    i.due_date,
    DATEDIFF(CURDATE(), i.due_date) as days_overdue,
    i.status
FROM issue i
JOIN book b ON i.book_id = b.id
WHERE i.status = 'ISSUED'
ORDER BY i.due_date;

-- Overdue books
SELECT 
    i.id,
    b.title,
    i.member_name,
    i.member_email,
    i.due_date,
    DATEDIFF(CURDATE(), i.due_date) as days_overdue,
    i.fine,
    i.status
FROM issue i
JOIN book b ON i.book_id = b.id
WHERE i.status = 'OVERDUE'
ORDER BY i.due_date;

-- Returned books
SELECT 
    i.id,
    b.title,
    i.member_name,
    i.issue_date,
    i.return_date,
    DATEDIFF(i.return_date, i.issue_date) as days_borrowed,
    i.fine,
    i.status
FROM issue i
JOIN book b ON i.book_id = b.id
WHERE i.status = 'RETURNED'
ORDER BY i.return_date DESC;

-- Issues with fines
SELECT 
    i.id,
    b.title,
    i.member_name,
    i.fine,
    i.status
FROM issue i
JOIN book b ON i.book_id = b.id
WHERE i.fine > 0
ORDER BY i.fine DESC;

-- ============================================
-- STATISTICS QUERIES
-- ============================================

-- Total books and copies
SELECT 
    COUNT(*) as total_books,
    SUM(quantity) as total_copies,
    SUM(available_copies) as available_copies,
    SUM(quantity) - SUM(available_copies) as borrowed_copies
FROM book;

-- Books borrowed count
SELECT 
    b.title,
    b.author,
    COUNT(i.id) as times_borrowed
FROM book b
LEFT JOIN issue i ON b.id = i.book_id
GROUP BY b.id, b.title, b.author
ORDER BY times_borrowed DESC
LIMIT 10;

-- Most active members
SELECT 
    member_name,
    member_email,
    COUNT(*) as books_borrowed,
    SUM(fine) as total_fines
FROM issue
GROUP BY member_name, member_email
ORDER BY books_borrowed DESC;

-- Total fines collected
SELECT 
    COUNT(*) as total_issues_with_fines,
    SUM(fine) as total_fines_collected
FROM issue
WHERE fine > 0;

-- Monthly statistics
SELECT 
    DATE_FORMAT(issue_date, '%Y-%m') as month,
    COUNT(*) as books_issued,
    SUM(CASE WHEN status = 'RETURNED' THEN 1 ELSE 0 END) as returned,
    SUM(CASE WHEN status = 'OVERDUE' THEN 1 ELSE 0 END) as overdue,
    SUM(fine) as total_fines
FROM issue
GROUP BY DATE_FORMAT(issue_date, '%Y-%m')
ORDER BY month DESC;

-- Current status summary
SELECT 
    status,
    COUNT(*) as count,
    SUM(fine) as total_fines
FROM issue
GROUP BY status;

-- ============================================
-- ADVANCED QUERIES
-- ============================================

-- Books never borrowed
SELECT b.title, b.author, b.category
FROM book b
LEFT JOIN issue i ON b.id = i.book_id
WHERE i.id IS NULL;

-- Members with overdue books
SELECT DISTINCT
    i.member_name,
    i.member_email,
    COUNT(*) as overdue_books,
    SUM(i.fine) as total_fines
FROM issue i
WHERE i.status = 'OVERDUE'
GROUP BY i.member_name, i.member_email
ORDER BY total_fines DESC;

-- Average borrowing duration
SELECT 
    AVG(DATEDIFF(return_date, issue_date)) as avg_days_borrowed
FROM issue
WHERE status = 'RETURNED' AND return_date IS NOT NULL;

-- Books by price range
SELECT 
    CASE 
        WHEN price < 15 THEN 'Under $15'
        WHEN price BETWEEN 15 AND 30 THEN '$15-$30'
        WHEN price BETWEEN 30 AND 50 THEN '$30-$50'
        ELSE 'Over $50'
    END as price_range,
    COUNT(*) as count
FROM book
WHERE price IS NOT NULL
GROUP BY price_range
ORDER BY MIN(price);

-- ============================================
-- DATA CLEANUP QUERIES (Use with caution!)
-- ============================================

-- Delete all issues (CAUTION!)
-- DELETE FROM issue;

-- Reset book availability (CAUTION!)
-- UPDATE book SET available_copies = quantity;

-- Delete all data but keep structure (CAUTION!)
-- TRUNCATE TABLE issue;
-- TRUNCATE TABLE book;
-- TRUNCATE TABLE user;

-- ============================================
-- USEFUL UPDATES
-- ============================================

-- Mark overdue issues (run this periodically)
-- UPDATE issue 
-- SET status = 'OVERDUE', 
--     fine = DATEDIFF(CURDATE(), due_date) * 2.50
-- WHERE status = 'ISSUED' 
-- AND due_date < CURDATE();

-- Reactivate a user
-- UPDATE user SET is_active = TRUE WHERE email = 'user@example.com';

-- Update book availability after manual changes
-- UPDATE book b
-- SET available_copies = quantity - (
--     SELECT COUNT(*) 
--     FROM issue i 
--     WHERE i.book_id = b.id AND i.status = 'ISSUED'
-- );
