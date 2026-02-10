package com.library.management.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "book", indexes = {
        @Index(name = "idx_isbn", columnList = "isbn"),
        @Index(name = "idx_title", columnList = "title"),
        @Index(name = "idx_author", columnList = "author")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Author is required")
    @Column(nullable = false)
    private String author;

    @NotBlank(message = "ISBN is required")
    @Column(unique = true, nullable = false, length = 13)
    private String isbn;

    @Column(length = 100)
    private String category;

    @Column(length = 200)
    private String publisher;

    private Integer publicationYear;

    @Min(value = 0)
    @Column(nullable = false)
    private Integer quantity = 0;

    @Min(value = 0)
    @Column(nullable = false)
    private Integer availableCopies = 0;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Column(columnDefinition = "TEXT")
    private String description;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
