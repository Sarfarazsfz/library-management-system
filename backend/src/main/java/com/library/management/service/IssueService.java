package com.library.management.service;

import com.library.management.dto.IssueDTO;
import com.library.management.exception.ResourceNotFoundException;
import com.library.management.model.Book;
import com.library.management.model.Issue;
import com.library.management.model.User;
import com.library.management.repository.BookRepository;
import com.library.management.repository.IssueRepository;
import com.library.management.repository.UserRepository;
import com.library.management.util.FineCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class IssueService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public IssueDTO issueBook(IssueDTO issueDTO) {
        Book book = bookRepository.findById(issueDTO.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", issueDTO.getBookId()));

        if (book.getAvailableCopies() <= 0) {
            throw new IllegalArgumentException("No available copies for book: " + book.getTitle());
        }

        // Get the logged-in user
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        LocalDate issueDate = LocalDate.now();
        LocalDate dueDate = FineCalculator.calculateDueDate(issueDate);

        Issue issue = Issue.builder()
                .book(book)
                .user(user)
                .memberName(issueDTO.getMemberName())
                .memberEmail(issueDTO.getMemberEmail())
                .issueDate(issueDate)
                .dueDate(dueDate)
                .status(Issue.IssueStatus.ISSUED)
                .fine(BigDecimal.ZERO)
                .remarks(issueDTO.getRemarks())
                .build();

        // Decrease available copies
        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);

        Issue savedIssue = issueRepository.save(issue);
        return convertToDTO(savedIssue);
    }

    @Transactional
    public IssueDTO returnBook(Long issueId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue", "id", issueId));

        if (issue.getStatus() == Issue.IssueStatus.RETURNED) {
            throw new IllegalArgumentException("Book has already been returned");
        }

        LocalDate returnDate = LocalDate.now();
        BigDecimal fine = FineCalculator.calculateFine(issue.getDueDate(), returnDate);

        issue.setReturnDate(returnDate);
        issue.setFine(fine);
        issue.setStatus(Issue.IssueStatus.RETURNED);

        // Increase available copies
        Book book = issue.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookRepository.save(book);

        Issue updatedIssue = issueRepository.save(issue);
        return convertToDTO(updatedIssue);
    }

    public List<IssueDTO> getAllIssues() {
        return issueRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public IssueDTO getIssueById(Long id) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue", "id", id));
        return convertToDTO(issue);
    }

    public List<IssueDTO> getOverdueIssues() {
        return issueRepository.findOverdueIssues().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<IssueDTO> getActiveIssues() {
        return issueRepository.findActiveIssues().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        long totalBooks = bookRepository.count();
        long availableBooks = bookRepository.findAll().stream()
                .filter(b -> b.getAvailableCopies() > 0)
                .count();
        long issuedBooks = issueRepository.countActiveIssues();
        long overdueBooks = issueRepository.countOverdueIssues();

        stats.put("totalBooks", totalBooks);
        stats.put("availableBooks", availableBooks);
        stats.put("issuedBooks", issuedBooks);
        stats.put("overdueBooks", overdueBooks);
        stats.put("totalUsers", userRepository.count());

        return stats;
    }

    private IssueDTO convertToDTO(Issue issue) {
        return IssueDTO.builder()
                .id(issue.getId())
                .bookId(issue.getBook().getId())
                .bookTitle(issue.getBook().getTitle())
                .bookIsbn(issue.getBook().getIsbn())
                .userId(issue.getUser().getId())
                .userName(issue.getUser().getName())
                .memberName(issue.getMemberName())
                .memberEmail(issue.getMemberEmail())
                .issueDate(issue.getIssueDate() != null ? issue.getIssueDate().toString() : null)
                .dueDate(issue.getDueDate() != null ? issue.getDueDate().toString() : null)
                .returnDate(issue.getReturnDate() != null ? issue.getReturnDate().toString() : null)
                .fine(issue.getFine())
                .status(issue.getStatus().name())
                .remarks(issue.getRemarks())
                .createdAt(issue.getCreatedAt() != null ? issue.getCreatedAt().toString() : null)
                .updatedAt(issue.getUpdatedAt() != null ? issue.getUpdatedAt().toString() : null)
                .build();
    }
}
