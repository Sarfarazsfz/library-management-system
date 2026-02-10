import React, { useState } from 'react';
import { Box, Typography, Button, Alert, Snackbar } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import IssueHistory from '../components/issues/IssueHistory';
import IssueForm from '../components/issues/IssueForm';
import ReturnForm from '../components/issues/ReturnForm';
import { Issue, IssueFormData } from '../types/Issue';
import issueService from '../services/issueService';

const Issues: React.FC = () => {
    const [issueFormOpen, setIssueFormOpen] = useState(false);
    const [returnFormOpen, setReturnFormOpen] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    const handleIssueBook = async (data: IssueFormData) => {
        try {
            await issueService.issueBook(data);
            setSnackbar({ open: true, message: 'Book issued successfully!', severity: 'success' });
            setRefreshTrigger((prev) => prev + 1);
        } catch (error: any) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Failed to issue book',
                severity: 'error',
            });
        }
    };

    const handleReturn = (issue: Issue) => {
        setSelectedIssue(issue);
        setReturnFormOpen(true);
    };

    const handleConfirmReturn = async (issueId: number) => {
        try {
            const result = await issueService.returnBook(issueId);
            const fineMessage = result.fine > 0 ? ` Fine: ₹${result.fine}` : '';
            setSnackbar({
                open: true,
                message: `Book returned successfully!${fineMessage}`,
                severity: 'success',
            });
            setReturnFormOpen(false);
            setRefreshTrigger((prev) => prev + 1);
        } catch (error: any) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Failed to return book',
                severity: 'error',
            });
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" fontWeight={700}>
                        Issues
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage book issues and returns
                    </Typography>
                </Box>
                <Button
                    id="issue-book-btn"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setIssueFormOpen(true)}
                    sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        px: 3,
                        boxShadow: '0 4px 15px rgba(25,118,210,0.3)',
                    }}
                >
                    Issue Book
                </Button>
            </Box>

            <IssueHistory onReturn={handleReturn} refreshTrigger={refreshTrigger} />

            <IssueForm
                open={issueFormOpen}
                onClose={() => setIssueFormOpen(false)}
                onSubmit={handleIssueBook}
            />

            <ReturnForm
                open={returnFormOpen}
                onClose={() => setReturnFormOpen(false)}
                onConfirm={handleConfirmReturn}
                issue={selectedIssue}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Issues;
