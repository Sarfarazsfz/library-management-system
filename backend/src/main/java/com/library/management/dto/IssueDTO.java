package com.library.management.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IssueDTO {
    private Long id;

    @NotNull(message = "Book ID is required")
    private Long bookId;

    private String bookTitle;
    private String bookIsbn;

    private Long userId;
    private String userName;

    @NotBlank(message = "Member name is required")
    private String memberName;

    @NotBlank(message = "Member email is required")
    @Email(message = "Invalid email format")
    private String memberEmail;

    private String issueDate;
    private String dueDate;
    private String returnDate;
    private BigDecimal fine;
    private String status;
    private String remarks;
    private String createdAt;
    private String updatedAt;
}
