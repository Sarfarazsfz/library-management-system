import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Typography,
    Box,
    Button,
    ToggleButtonGroup,
    ToggleButton,
    Alert,
    Snackbar,
    Tooltip,
    IconButton,
} from '@mui/material';
import { Undo as ReturnIcon } from '@mui/icons-material';
import { Issue } from '../../types/Issue';
import issueService from '../../services/issueService';
import { formatDate, formatCurrency, getStatusColor, isOverdue } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';

interface IssueHistoryProps {
    onReturn: (issue: Issue) => void;
    refreshTrigger: number;
}

const IssueHistory: React.FC<IssueHistoryProps> = ({ onReturn, refreshTrigger }) => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    useEffect(() => {
        fetchIssues();
    }, [refreshTrigger]);

    const fetchIssues = async () => {
        setLoading(true);
        try {
            const data = await issueService.getAllIssues();
            setIssues(data);
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to fetch issues', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const filteredIssues = issues.filter((issue) => {
        if (filter === 'all') return true;
        if (filter === 'active') return issue.status === 'ISSUED';
        if (filter === 'overdue') return issue.status === 'ISSUED' && isOverdue(issue.dueDate);
        if (filter === 'returned') return issue.status === 'RETURNED';
        return true;
    });

    if (loading) return <LoadingSpinner message="Loading issues..." />;

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <ToggleButtonGroup
                    value={filter}
                    exclusive
                    onChange={(_, val) => val && setFilter(val)}
                    size="small"
                    sx={{
                        '& .MuiToggleButton-root': {
                            textTransform: 'none',
                            borderRadius: 2,
                            px: 2,
                        },
                    }}
                >
                    <ToggleButton value="all">All ({issues.length})</ToggleButton>
                    <ToggleButton value="active">
                        Active ({issues.filter((i) => i.status === 'ISSUED').length})
                    </ToggleButton>
                    <ToggleButton value="overdue">
                        Overdue ({issues.filter((i) => i.status === 'ISSUED' && isOverdue(i.dueDate)).length})
                    </ToggleButton>
                    <ToggleButton value="returned">
                        Returned ({issues.filter((i) => i.status === 'RETURNED').length})
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 600 }}>Book</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Member</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Issue Date</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Return Date</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Fine</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredIssues.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                                    <Typography color="text.secondary">No issues found</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredIssues.map((issue) => {
                                const overdue = issue.status === 'ISSUED' && isOverdue(issue.dueDate);
                                return (
                                    <TableRow
                                        key={issue.id}
                                        hover
                                        sx={overdue ? { backgroundColor: 'rgba(244,67,54,0.05)' } : {}}
                                    >
                                        <TableCell>
                                            <Typography variant="body2" fontWeight={500}>
                                                {issue.bookTitle}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {issue.bookIsbn}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">{issue.memberName}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {issue.memberEmail}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{formatDate(issue.issueDate)}</TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body2"
                                                color={overdue ? 'error' : 'text.primary'}
                                                fontWeight={overdue ? 600 : 400}
                                            >
                                                {formatDate(issue.dueDate)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{issue.returnDate ? formatDate(issue.returnDate) : '-'}</TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body2"
                                                fontWeight={600}
                                                color={issue.fine > 0 ? 'error' : 'text.primary'}
                                            >
                                                {formatCurrency(issue.fine)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={overdue ? 'OVERDUE' : issue.status}
                                                size="small"
                                                color={overdue ? 'error' : getStatusColor(issue.status)}
                                                sx={{ fontWeight: 600, borderRadius: 1.5 }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            {issue.status === 'ISSUED' && (
                                                <Tooltip title="Return Book">
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => onReturn(issue)}
                                                    >
                                                        <ReturnIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

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

export default IssueHistory;
