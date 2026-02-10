-- ============================================
-- Library Management System - MySQL Database
-- Schema Creation and Sample Data
-- ============================================

-- Create Database
CREATE DATABASE IF NOT EXISTS library_db;
USE library_db;

-- ============================================
-- DROP EXISTING TABLES (if needed)
-- ============================================
DROP TABLE IF EXISTS issue;
DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS user;

-- ============================================
-- TABLE: user
-- ============================================
CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'LIBRARIAN',
    phone VARCHAR(15),
    address TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLE: book
-- ============================================
CREATE TABLE book (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(13) NOT NULL UNIQUE,
    category VARCHAR(100),
    publisher VARCHAR(200),
    publication_year INT,
    quantity INT NOT NULL DEFAULT 0,
    available_copies INT NOT NULL DEFAULT 0,
    price DECIMAL(10, 2),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_isbn (isbn),
    INDEX idx_title (title),
    INDEX idx_author (author)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLE: issue
-- ============================================
CREATE TABLE issue (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    book_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    member_name VARCHAR(255) NOT NULL,
    member_email VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
    fine DECIMAL(10, 2) DEFAULT 0.00,
    status VARCHAR(50) NOT NULL DEFAULT 'ISSUED',
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    INDEX idx_book_id (book_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Insert Users
-- Note: Passwords are BCrypt hashed. Plain text passwords:
-- admin@library.com -> admin123
-- librarian@library.com -> librarian123
-- john.doe@library.com -> password123

INSERT INTO user (name, email, password, role, phone, address, is_active) VALUES
('Admin User', 'admin@library.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN', '1234567890', '123 Admin Street, City', TRUE),
('John Librarian', 'librarian@library.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'LIBRARIAN', '9876543210', '456 Library Avenue, City', TRUE),
('Jane Doe', 'jane.doe@library.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'LIBRARIAN', '5551234567', '789 Book Lane, City', TRUE),
('Mike Wilson', 'mike.wilson@library.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'LIBRARIAN', '5559876543', '321 Reader Road, City', TRUE);

-- Insert Books
INSERT INTO book (title, author, isbn, category, publisher, publication_year, quantity, available_copies, price, description) VALUES
-- Programming & Technology
('Clean Code', 'Robert C. Martin', '9780132350884', 'Programming', 'Prentice Hall', 2008, 5, 5, 45.99, 'A Handbook of Agile Software Craftsmanship'),
('The Pragmatic Programmer', 'Andrew Hunt, David Thomas', '9780135957059', 'Programming', 'Addison-Wesley', 2019, 4, 3, 49.99, 'Your Journey to Mastery'),
('Design Patterns', 'Erich Gamma', '9780201633610', 'Programming', 'Addison-Wesley', 1994, 3, 2, 54.99, 'Elements of Reusable Object-Oriented Software'),
('Introduction to Algorithms', 'Thomas H. Cormen', '9780262033848', 'Computer Science', 'MIT Press', 2009, 6, 4, 89.99, 'Comprehensive guide to algorithms'),
('JavaScript: The Good Parts', 'Douglas Crockford', '9780596517748', 'Web Development', 'O''Reilly Media', 2008, 4, 4, 29.99, 'Unearthing the Excellence in JavaScript'),

-- Fiction
('To Kill a Mockingbird', 'Harper Lee', '9780061120084', 'Fiction', 'Harper Perennial', 1960, 8, 6, 14.99, 'Classic American novel'),
('1984', 'George Orwell', '9780451524935', 'Fiction', 'Signet Classic', 1949, 7, 5, 12.99, 'Dystopian social science fiction'),
('Pride and Prejudice', 'Jane Austen', '9780141439518', 'Fiction', 'Penguin Classics', 1813, 5, 4, 11.99, 'Romantic novel of manners'),
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 'Fiction', 'Scribner', 1925, 6, 5, 13.99, 'The story of Jay Gatsby'),
('Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', '9780747532699', 'Fantasy', 'Bloomsbury', 1997, 10, 7, 19.99, 'The beginning of Harry Potter series'),

-- Science & Mathematics
('A Brief History of Time', 'Stephen Hawking', '9780553380163', 'Science', 'Bantam', 1988, 4, 3, 18.99, 'From the Big Bang to Black Holes'),
('The Selfish Gene', 'Richard Dawkins', '9780198788607', 'Biology', 'Oxford University Press', 1976, 3, 2, 16.99, 'Gene-centered view of evolution'),
('Sapiens', 'Yuval Noah Harari', '9780062316097', 'History', 'Harper', 2015, 8, 6, 24.99, 'A Brief History of Humankind'),
('Cosmos', 'Carl Sagan', '9780345539434', 'Science', 'Ballantine Books', 1980, 4, 3, 19.99, 'Journey through space and time'),

-- Business & Self-Help
('Atomic Habits', 'James Clear', '9780735211292', 'Self-Help', 'Avery', 2018, 6, 4, 26.99, 'An Easy & Proven Way to Build Good Habits'),
('Think and Grow Rich', 'Napoleon Hill', '9781585424337', 'Business', 'Tarcher', 1937, 5, 4, 14.99, 'The classic guide to success'),
('The 7 Habits of Highly Effective People', 'Stephen Covey', '9781982137274', 'Self-Help', 'Simon & Schuster', 1989, 7, 5, 17.99, 'Powerful lessons in personal change'),
('Rich Dad Poor Dad', 'Robert Kiyosaki', '9781612680194', 'Finance', 'Plata Publishing', 1997, 6, 5, 16.99, 'What the Rich Teach Their Kids About Money'),

-- Children's Books
('The Cat in the Hat', 'Dr. Seuss', '9780394800011', 'Children', 'Random House', 1957, 5, 5, 8.99, 'Classic children''s book'),
('Where the Wild Things Are', 'Maurice Sendak', '9780060254926', 'Children', 'HarperCollins', 1963, 4, 4, 9.99, 'Max''s wild adventure'),
('Charlotte''s Web', 'E.B. White', '9780064400558', 'Children', 'Harper & Row', 1952, 6, 5, 10.99, 'Story of friendship and loyalty');

-- Insert Sample Issues (Book Borrowing Records)
INSERT INTO issue (book_id, user_id, member_name, member_email, issue_date, due_date, return_date, fine, status, remarks) VALUES
-- Active Issues
(2, 2, 'Alice Johnson', 'alice.johnson@email.com', '2026-02-01', '2026-02-15', NULL, 0.00, 'ISSUED', 'First time borrower'),
(4, 2, 'Bob Smith', 'bob.smith@email.com', '2026-02-05', '2026-02-19', NULL, 0.00, 'ISSUED', 'Regular member'),
(6, 3, 'Carol White', 'carol.white@email.com', '2026-02-08', '2026-02-22', NULL, 0.00, 'ISSUED', NULL),
(10, 3, 'David Brown', 'david.brown@email.com', '2026-02-10', '2026-02-24', NULL, 0.00, 'ISSUED', 'Student member'),

-- Returned Issues
(1, 2, 'Alice Johnson', 'alice.johnson@email.com', '2026-01-15', '2026-01-29', '2026-01-28', 0.00, 'RETURNED', 'Returned on time'),
(3, 2, 'Bob Smith', 'bob.smith@email.com', '2026-01-20', '2026-02-03', '2026-02-01', 0.00, 'RETURNED', 'Returned early'),
(7, 3, 'Carol White', 'carol.white@email.com', '2026-01-10', '2026-01-24', '2026-01-30', 15.00, 'RETURNED', 'Returned late - 6 days overdue'),
(8, 4, 'Emma Davis', 'emma.davis@email.com', '2026-01-25', '2026-02-08', '2026-02-07', 0.00, 'RETURNED', 'Returned on time'),

-- Overdue Issues
(11, 4, 'Frank Miller', 'frank.miller@email.com', '2026-01-05', '2026-01-19', NULL, 55.00, 'OVERDUE', 'Multiple reminders sent'),
(13, 4, 'Grace Lee', 'grace.lee@email.com', '2026-01-28', '2026-02-11', NULL, 0.00, 'OVERDUE', 'First reminder sent');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- View all users
-- SELECT * FROM user;

-- View all books with availability
-- SELECT id, title, author, isbn, category, quantity, available_copies, price FROM book;

-- View active issues
-- SELECT i.id, b.title, i.member_name, i.issue_date, i.due_date, i.status 
-- FROM issue i 
-- JOIN book b ON i.book_id = b.id 
-- WHERE i.status = 'ISSUED';

-- View overdue books
-- SELECT i.id, b.title, i.member_name, i.due_date, i.fine, i.status 
-- FROM issue i 
-- JOIN book b ON i.book_id = b.id 
-- WHERE i.status = 'OVERDUE';

-- Book statistics
-- SELECT 
--     category,
--     COUNT(*) as total_books,
--     SUM(quantity) as total_copies,
--     SUM(available_copies) as available_copies
-- FROM book
-- GROUP BY category
-- ORDER BY total_books DESC;

-- ============================================
-- NOTES
-- ============================================
-- 1. Default passwords (BCrypt hashed):
--    - admin@library.com: admin123
--    - librarian@library.com: librarian123
--    - Other users: password123
--
-- 2. To generate new BCrypt password:
--    Use online tool: https://bcrypt-generator.com/
--    Or use Spring Security's BCryptPasswordEncoder
--
-- 3. Fine calculation: $2.50 per day overdue
--
-- 4. Book availability is automatically managed by the application
--    when issues are created/returned
--
-- ============================================
