package com.library.management.config;

import com.library.management.model.Book;
import com.library.management.model.Issue;
import com.library.management.model.User;
import com.library.management.repository.BookRepository;
import com.library.management.repository.IssueRepository;
import com.library.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Only seed if database is empty
        if (userRepository.count() > 0) {
            return;
        }

        // Create Admin user
        User admin = userRepository.save(User.builder()
                .name("Admin User")
                .email("admin@library.com")
                .password(passwordEncoder.encode("Admin@123"))
                .role(User.Role.ADMIN)
                .phone("9876543210")
                .address("Library Admin Office")
                .isActive(true)
                .build());

        // Create Librarian user
        User librarian = userRepository.save(User.builder()
                .name("Librarian User")
                .email("librarian@library.com")
                .password(passwordEncoder.encode("Librarian@123"))
                .role(User.Role.LIBRARIAN)
                .phone("9876543211")
                .address("Library Front Desk")
                .isActive(true)
                .build());

        // Create 10 sample books
        Book book1 = bookRepository.save(Book.builder()
                .title("Introduction to Algorithms")
                .author("Thomas H. Cormen")
                .isbn("9780262033848")
                .category("Computer Science")
                .publisher("MIT Press")
                .publicationYear(2009)
                .quantity(5)
                .availableCopies(5)
                .price(new BigDecimal("599.00"))
                .description("A comprehensive textbook on algorithms")
                .build());

        Book book2 = bookRepository.save(Book.builder()
                .title("Clean Code")
                .author("Robert C. Martin")
                .isbn("9780132350884")
                .category("Software Engineering")
                .publisher("Prentice Hall")
                .publicationYear(2008)
                .quantity(3)
                .availableCopies(3)
                .price(new BigDecimal("450.00"))
                .description("A handbook of agile software craftsmanship")
                .build());

        Book book3 = bookRepository.save(Book.builder()
                .title("Design Patterns")
                .author("Gang of Four")
                .isbn("9780201633610")
                .category("Software Engineering")
                .publisher("Addison-Wesley")
                .publicationYear(1994)
                .quantity(4)
                .availableCopies(4)
                .price(new BigDecimal("520.00"))
                .description("Elements of reusable object-oriented software")
                .build());

        Book book4 = bookRepository.save(Book.builder()
                .title("The Pragmatic Programmer")
                .author("David Thomas, Andrew Hunt")
                .isbn("9780135957059")
                .category("Software Engineering")
                .publisher("Addison-Wesley")
                .publicationYear(2019)
                .quantity(3)
                .availableCopies(3)
                .price(new BigDecimal("480.00"))
                .description("Your journey to mastery")
                .build());

        Book book5 = bookRepository.save(Book.builder()
                .title("Java: The Complete Reference")
                .author("Herbert Schildt")
                .isbn("9781260440232")
                .category("Programming")
                .publisher("McGraw-Hill")
                .publicationYear(2021)
                .quantity(6)
                .availableCopies(6)
                .price(new BigDecimal("650.00"))
                .description("Comprehensive guide to Java programming")
                .build());

        Book book6 = bookRepository.save(Book.builder()
                .title("Operating System Concepts")
                .author("Abraham Silberschatz")
                .isbn("9781119800361")
                .category("Computer Science")
                .publisher("Wiley")
                .publicationYear(2021)
                .quantity(4)
                .availableCopies(4)
                .price(new BigDecimal("550.00"))
                .description("Fundamental concepts of operating systems")
                .build());

        Book book7 = bookRepository.save(Book.builder()
                .title("Database System Concepts")
                .author("Abraham Silberschatz")
                .isbn("9780078022159")
                .category("Database")
                .publisher("McGraw-Hill")
                .publicationYear(2019)
                .quantity(3)
                .availableCopies(3)
                .price(new BigDecimal("500.00"))
                .description("Comprehensive database management textbook")
                .build());

        Book book8 = bookRepository.save(Book.builder()
                .title("Artificial Intelligence: A Modern Approach")
                .author("Stuart Russell, Peter Norvig")
                .isbn("9780134610993")
                .category("Artificial Intelligence")
                .publisher("Pearson")
                .publicationYear(2020)
                .quantity(3)
                .availableCopies(3)
                .price(new BigDecimal("700.00"))
                .description("The leading textbook in artificial intelligence")
                .build());

        Book book9 = bookRepository.save(Book.builder()
                .title("Computer Networks")
                .author("Andrew S. Tanenbaum")
                .isbn("9780132126953")
                .category("Networking")
                .publisher("Pearson")
                .publicationYear(2010)
                .quantity(4)
                .availableCopies(4)
                .price(new BigDecimal("475.00"))
                .description("Classic textbook on computer networking")
                .build());

        Book book10 = bookRepository.save(Book.builder()
                .title("Head First Java")
                .author("Kathy Sierra, Bert Bates")
                .isbn("9780596009205")
                .category("Programming")
                .publisher("O'Reilly Media")
                .publicationYear(2005)
                .quantity(5)
                .availableCopies(5)
                .price(new BigDecimal("399.00"))
                .description("A brain-friendly guide to Java programming")
                .build());

        // Create 5 sample issues (3 active, 2 returned)
        // Issue 1 - Active
        book1.setAvailableCopies(book1.getAvailableCopies() - 1);
        bookRepository.save(book1);
        issueRepository.save(Issue.builder()
                .book(book1)
                .user(librarian)
                .memberName("Rahul Sharma")
                .memberEmail("rahul@example.com")
                .issueDate(LocalDate.now().minusDays(5))
                .dueDate(LocalDate.now().plusDays(9))
                .status(Issue.IssueStatus.ISSUED)
                .fine(BigDecimal.ZERO)
                .remarks("Student - Computer Science")
                .build());

        // Issue 2 - Active
        book2.setAvailableCopies(book2.getAvailableCopies() - 1);
        bookRepository.save(book2);
        issueRepository.save(Issue.builder()
                .book(book2)
                .user(librarian)
                .memberName("Priya Patel")
                .memberEmail("priya@example.com")
                .issueDate(LocalDate.now().minusDays(3))
                .dueDate(LocalDate.now().plusDays(11))
                .status(Issue.IssueStatus.ISSUED)
                .fine(BigDecimal.ZERO)
                .remarks("Faculty member")
                .build());

        // Issue 3 - Active (overdue)
        book3.setAvailableCopies(book3.getAvailableCopies() - 1);
        bookRepository.save(book3);
        issueRepository.save(Issue.builder()
                .book(book3)
                .user(librarian)
                .memberName("Amit Kumar")
                .memberEmail("amit@example.com")
                .issueDate(LocalDate.now().minusDays(20))
                .dueDate(LocalDate.now().minusDays(6))
                .status(Issue.IssueStatus.ISSUED)
                .fine(BigDecimal.ZERO)
                .remarks("Student - Software Engineering")
                .build());

        // Issue 4 - Returned
        issueRepository.save(Issue.builder()
                .book(book4)
                .user(librarian)
                .memberName("Sneha Reddy")
                .memberEmail("sneha@example.com")
                .issueDate(LocalDate.now().minusDays(30))
                .dueDate(LocalDate.now().minusDays(16))
                .returnDate(LocalDate.now().minusDays(17))
                .status(Issue.IssueStatus.RETURNED)
                .fine(BigDecimal.ZERO)
                .remarks("Returned on time")
                .build());

        // Issue 5 - Returned with fine
        issueRepository.save(Issue.builder()
                .book(book5)
                .user(librarian)
                .memberName("Deepak Singh")
                .memberEmail("deepak@example.com")
                .issueDate(LocalDate.now().minusDays(25))
                .dueDate(LocalDate.now().minusDays(11))
                .returnDate(LocalDate.now().minusDays(7))
                .status(Issue.IssueStatus.RETURNED)
                .fine(new BigDecimal("20.00"))
                .remarks("Late return - 4 days overdue")
                .build());

        System.out.println("===== Database seeded successfully =====");
        System.out.println("Admin: admin@library.com / Admin@123");
        System.out.println("Librarian: librarian@library.com / Librarian@123");
        System.out.println("Books: 10 sample books created");
        System.out.println("Issues: 5 sample issues (3 active, 2 returned)");
    }
}
