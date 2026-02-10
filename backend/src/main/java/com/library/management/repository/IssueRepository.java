package com.library.management.repository;

import com.library.management.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {

    List<Issue> findByStatus(Issue.IssueStatus status);

    List<Issue> findByBookId(Long bookId);

    List<Issue> findByUserId(Long userId);

    List<Issue> findByMemberEmail(String memberEmail);

    @Query("SELECT i FROM Issue i WHERE i.status = 'ISSUED' AND i.dueDate < CURRENT_DATE")
    List<Issue> findOverdueIssues();

    @Query("SELECT i FROM Issue i WHERE i.status = 'ISSUED'")
    List<Issue> findActiveIssues();

    @Query("SELECT COUNT(i) FROM Issue i WHERE i.status = 'ISSUED'")
    long countActiveIssues();

    @Query("SELECT COUNT(i) FROM Issue i WHERE i.status = 'ISSUED' AND i.dueDate < CURRENT_DATE")
    long countOverdueIssues();
}
