-- ============================================
-- ADDITIONAL SAMPLE DATA
-- More Books and Members for Testing
-- ============================================

USE library_db;

-- More Programming Books
INSERT INTO book (title, author, isbn, category, publisher, publication_year, quantity, available_copies, price, description) VALUES
('Head First Java', 'Kathy Sierra, Bert Bates', '9780596009205', 'Programming', 'O''Reilly Media', 2005, 5, 5, 39.99, 'A Brain-Friendly Guide to Java'),
('Python Crash Course', 'Eric Matthes', '9781593279288', 'Programming', 'No Starch Press', 2019, 6, 6, 34.99, 'A Hands-On, Project-Based Introduction to Programming'),
('Eloquent JavaScript', 'Marijn Haverbeke', '9781593279509', 'Web Development', 'No Starch Press', 2018, 4, 4, 32.99, 'A Modern Introduction to Programming'),
('You Don''t Know JS', 'Kyle Simpson', '9781491924464', 'Web Development', 'O''Reilly Media', 2015, 5, 5, 29.99, 'Scope & Closures'),
('Refactoring', 'Martin Fowler', '9780134757599', 'Programming', 'Addison-Wesley', 2018, 3, 3, 54.99, 'Improving the Design of Existing Code'),

-- More Fiction
('The Hobbit', 'J.R.R. Tolkien', '9780547928227', 'Fantasy', 'Mariner Books', 1937, 8, 6, 14.99, 'There and Back Again'),
('The Catcher in the Rye', 'J.D. Salinger', '9780316769174', 'Fiction', 'Little, Brown', 1951, 5, 4, 13.99, 'The story of Holden Caulfield'),
('Brave New World', 'Aldous Huxley', '9780060850524', 'Fiction', 'Harper Perennial', 1932, 4, 3, 14.99, 'Dystopian novel'),
('The Lord of the Rings', 'J.R.R. Tolkien', '9780544003415', 'Fantasy', 'Mariner Books', 1954, 6, 4, 29.99, 'Epic high-fantasy novel'),
('Animal Farm', 'George Orwell', '9780451526342', 'Fiction', 'Signet Classic', 1945, 5, 5, 9.99, 'Allegorical novella'),

-- Science & Technology
('The Code Book', 'Simon Singh', '9780385495325', 'Science', 'Anchor', 1999, 3, 3, 16.99, 'The Science of Secrecy'),
('Gödel, Escher, Bach', 'Douglas Hofstadter', '9780465026562', 'Philosophy', 'Basic Books', 1979, 2, 2, 19.99, 'An Eternal Golden Braid'),
('The Gene', 'Siddhartha Mukherjee', '9781476733524', 'Biology', 'Scribner', 2016, 4, 4, 28.99, 'An Intimate History'),
('Astrophysics for People in a Hurry', 'Neil deGrasse Tyson', '9780393609394', 'Science', 'W. W. Norton', 2017, 6, 5, 18.99, 'Quick guide to the universe'),

-- Business & Economics
('The Lean Startup', 'Eric Ries', '9780307887894', 'Business', 'Crown Business', 2011, 5, 4, 26.99, 'How Today''s Entrepreneurs Use Continuous Innovation'),
('Zero to One', 'Peter Thiel', '9780804139298', 'Business', 'Crown Business', 2014, 4, 3, 25.99, 'Notes on Startups, or How to Build the Future'),
('Good to Great', 'Jim Collins', '9780066620992', 'Business', 'HarperBusiness', 2001, 5, 4, 27.99, 'Why Some Companies Make the Leap'),
('The Innovator''s Dilemma', 'Clayton Christensen', '9781633691780', 'Business', 'Harvard Business Review Press', 1997, 3, 3, 29.99, 'When New Technologies Cause Great Firms to Fail'),

-- More Children's Books
('Goodnight Moon', 'Margaret Wise Brown', '9780064430173', 'Children', 'HarperFestival', 1947, 6, 6, 8.99, 'Classic bedtime story'),
('Green Eggs and Ham', 'Dr. Seuss', '9780394800165', 'Children', 'Random House', 1960, 5, 5, 8.99, 'Sam-I-Am''s persistent offering'),
('Matilda', 'Roald Dahl', '9780142410370', 'Children', 'Puffin Books', 1988, 7, 6, 12.99, 'The story of an extraordinary girl'),
('The Giving Tree', 'Shel Silverstein', '9780060256654', 'Children', 'Harper & Row', 1964, 4, 4, 9.99, 'Story of unconditional love');

-- More Issue Records
INSERT INTO issue (book_id, user_id, member_name, member_email, issue_date, due_date, return_date, fine, status, remarks) VALUES
-- Recent issues
(22, 2, 'Helen Carter', 'helen.carter@email.com', '2026-02-09', '2026-02-23', NULL, 0.00, 'ISSUED', 'New member'),
(25, 3, 'Ian Foster', 'ian.foster@email.com', '2026-02-07', '2026-02-21', NULL, 0.00, 'ISSUED', 'Premium member'),
(28, 3, 'Julia Green', 'julia.green@email.com', '2026-02-06', '2026-02-20', NULL, 0.00, 'ISSUED', NULL),

-- More returned records
(23, 2, 'Kevin Hall', 'kevin.hall@email.com', '2026-01-18', '2026-02-01', '2026-01-31', 0.00, 'RETURNED', 'Excellent condition'),
(26, 3, 'Laura King', 'laura.king@email.com', '2026-01-22', '2026-02-05', '2026-02-04', 0.00, 'RETURNED', 'Returned on time'),
(29, 4, 'Mark Lewis', 'mark.lewis@email.com', '2026-01-12', '2026-01-26', '2026-02-02', 17.50, 'RETURNED', 'Late return - 7 days'),
(31, 2, 'Nancy Moore', 'nancy.moore@email.com', '2026-01-16', '2026-01-30', '2026-01-29', 0.00, 'RETURNED', 'Good member'),

-- More overdue
(24, 4, 'Oliver Nelson', 'oliver.nelson@email.com', '2026-01-08', '2026-01-22', NULL, 47.50, 'OVERDUE', 'Contacted multiple times'),
(27, 4, 'Patricia Owen', 'patricia.owen@email.com', '2026-01-30', '2026-02-13', NULL, 0.00, 'OVERDUE', 'Reminder sent');

-- ============================================
-- QUICK STATISTICS QUERIES
-- ============================================

-- Total books by category
-- SELECT category, COUNT(*) as count, SUM(quantity) as total_copies
-- FROM book
-- GROUP BY category
-- ORDER BY count DESC;

-- Most borrowed books
-- SELECT b.title, b.author, COUNT(i.id) as borrow_count
-- FROM book b
-- LEFT JOIN issue i ON b.id = i.book_id
-- GROUP BY b.id, b.title, b.author
-- ORDER BY borrow_count DESC
-- LIMIT 10;

-- Total fines collected
-- SELECT SUM(fine) as total_fines
-- FROM issue
-- WHERE status = 'RETURNED' AND fine > 0;

-- Current overdue books
-- SELECT COUNT(*) as overdue_count, SUM(fine) as total_overdue_fines
-- FROM issue
-- WHERE status = 'OVERDUE';

-- Active members (who have borrowed books)
-- SELECT DISTINCT member_name, member_email, COUNT(*) as books_borrowed
-- FROM issue
-- GROUP BY member_name, member_email
-- ORDER BY books_borrowed DESC;
