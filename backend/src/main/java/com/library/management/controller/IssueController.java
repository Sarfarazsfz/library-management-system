package com.library.management.controller;

import com.library.management.dto.IssueDTO;
import com.library.management.service.IssueService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @PostMapping
    public ResponseEntity<IssueDTO> issueBook(@Valid @RequestBody IssueDTO issueDTO) {
        return ResponseEntity.ok(issueService.issueBook(issueDTO));
    }

    @PutMapping("/return/{id}")
    public ResponseEntity<IssueDTO> returnBook(@PathVariable Long id) {
        return ResponseEntity.ok(issueService.returnBook(id));
    }

    @GetMapping
    public ResponseEntity<List<IssueDTO>> getAllIssues() {
        return ResponseEntity.ok(issueService.getAllIssues());
    }

    @GetMapping("/{id}")
    public ResponseEntity<IssueDTO> getIssueById(@PathVariable Long id) {
        return ResponseEntity.ok(issueService.getIssueById(id));
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<IssueDTO>> getOverdueIssues() {
        return ResponseEntity.ok(issueService.getOverdueIssues());
    }

    @GetMapping("/active")
    public ResponseEntity<List<IssueDTO>> getActiveIssues() {
        return ResponseEntity.ok(issueService.getActiveIssues());
    }

    @GetMapping("/dashboard/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        return ResponseEntity.ok(issueService.getDashboardStats());
    }
}
