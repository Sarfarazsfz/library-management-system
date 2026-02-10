package com.library.management.service;

import com.library.management.dto.BookDTO;
import com.library.management.exception.ResourceNotFoundException;
import com.library.management.model.Book;
import com.library.management.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", id));
        return convertToDTO(book);
    }

    public BookDTO createBook(BookDTO bookDTO) {
        if (bookRepository.existsByIsbn(bookDTO.getIsbn())) {
            throw new IllegalArgumentException("Book with ISBN " + bookDTO.getIsbn() + " already exists");
        }

        Book book = Book.builder()
                .title(bookDTO.getTitle())
                .author(bookDTO.getAuthor())
                .isbn(bookDTO.getIsbn())
                .category(bookDTO.getCategory())
                .publisher(bookDTO.getPublisher())
                .publicationYear(bookDTO.getPublicationYear())
                .quantity(bookDTO.getQuantity() != null ? bookDTO.getQuantity() : 0)
                .availableCopies(bookDTO.getQuantity() != null ? bookDTO.getQuantity() : 0)
                .price(bookDTO.getPrice())
                .description(bookDTO.getDescription())
                .build();

        Book savedBook = bookRepository.save(book);
        return convertToDTO(savedBook);
    }

    public BookDTO updateBook(Long id, BookDTO bookDTO) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", id));

        // Calculate the difference in quantity to adjust available copies
        int quantityDiff = (bookDTO.getQuantity() != null ? bookDTO.getQuantity() : book.getQuantity()) - book.getQuantity();

        book.setTitle(bookDTO.getTitle() != null ? bookDTO.getTitle() : book.getTitle());
        book.setAuthor(bookDTO.getAuthor() != null ? bookDTO.getAuthor() : book.getAuthor());
        book.setIsbn(bookDTO.getIsbn() != null ? bookDTO.getIsbn() : book.getIsbn());
        book.setCategory(bookDTO.getCategory() != null ? bookDTO.getCategory() : book.getCategory());
        book.setPublisher(bookDTO.getPublisher() != null ? bookDTO.getPublisher() : book.getPublisher());
        book.setPublicationYear(bookDTO.getPublicationYear() != null ? bookDTO.getPublicationYear() : book.getPublicationYear());
        book.setQuantity(bookDTO.getQuantity() != null ? bookDTO.getQuantity() : book.getQuantity());
        book.setAvailableCopies(Math.max(0, book.getAvailableCopies() + quantityDiff));
        book.setPrice(bookDTO.getPrice() != null ? bookDTO.getPrice() : book.getPrice());
        book.setDescription(bookDTO.getDescription() != null ? bookDTO.getDescription() : book.getDescription());

        Book updatedBook = bookRepository.save(book);
        return convertToDTO(updatedBook);
    }

    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", id));
        bookRepository.delete(book);
    }

    public List<BookDTO> searchBooks(String keyword) {
        return bookRepository.searchBooks(keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private BookDTO convertToDTO(Book book) {
        return BookDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .isbn(book.getIsbn())
                .category(book.getCategory())
                .publisher(book.getPublisher())
                .publicationYear(book.getPublicationYear())
                .quantity(book.getQuantity())
                .availableCopies(book.getAvailableCopies())
                .price(book.getPrice())
                .description(book.getDescription())
                .createdAt(book.getCreatedAt() != null ? book.getCreatedAt().toString() : null)
                .updatedAt(book.getUpdatedAt() != null ? book.getUpdatedAt().toString() : null)
                .build();
    }
}
