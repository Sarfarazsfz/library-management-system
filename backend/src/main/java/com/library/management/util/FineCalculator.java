package com.library.management.util;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class FineCalculator {

    private static final BigDecimal FINE_PER_DAY = new BigDecimal("5.00");
    private static final BigDecimal MAX_FINE = new BigDecimal("500.00");
    public static final int DEFAULT_LOAN_DAYS = 14;

    /**
     * Calculate fine based on due date and return date.
     * Fine = min(daysLate × ₹5, ₹500)
     */
    public static BigDecimal calculateFine(LocalDate dueDate, LocalDate returnDate) {
        if (returnDate == null || !returnDate.isAfter(dueDate)) {
            return BigDecimal.ZERO;
        }

        long daysLate = ChronoUnit.DAYS.between(dueDate, returnDate);
        BigDecimal fine = FINE_PER_DAY.multiply(BigDecimal.valueOf(daysLate));

        return fine.compareTo(MAX_FINE) > 0 ? MAX_FINE : fine;
    }

    /**
     * Calculate due date from issue date using default loan period.
     */
    public static LocalDate calculateDueDate(LocalDate issueDate) {
        return issueDate.plusDays(DEFAULT_LOAN_DAYS);
    }
}
