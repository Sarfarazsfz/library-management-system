import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    IconButton,
    Divider,
    Chip,
} from '@mui/material';
import { Close as CloseIcon, Warning as WarningIcon } from '@mui/icons-material';
import { Issue } from '../../types/Issue';
import { formatDate, formatCurrency, isOverdue } from '../../utils/helpers';

interface ReturnFormProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (issueId: number) => void;
    issue: Issue | null;
}

const ReturnForm: React.FC<ReturnFormProps> = ({ open, onClose, onConfirm, issue }) => {
    if (!issue) return null;

    const overdue = isOverdue(issue.dueDate);
    const today = new Date();
    const dueDate = new Date(issue.dueDate);
    const daysLate = overdue ? Math.ceil((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;
    const estimatedFine = overdue ? Math.min(daysLate * 5, 500) : 0;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Return Book
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Book
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                        {issue.bookTitle}
                    </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Member
                    </Typography>
                    <Typography variant="body1">
                        {issue.memberName} ({issue.memberEmail})
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Issue Date
                        </Typography>
                        <Typography variant="body2">{formatDate(issue.issueDate)}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Due Date
                        </Typography>
                        <Typography variant="body2">{formatDate(issue.dueDate)}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Return Date
                        </Typography>
                        <Typography variant="body2">{new Date().toLocaleDateString('en-IN')}</Typography>
                    </Box>
                </Box>

                {overdue && (
                    <Box
                        sx={{
                            p: 2,
                            backgroundColor: '#fff3e0',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            mt: 2,
                        }}
                    >
                        <WarningIcon color="warning" />
                        <Box>
                            <Typography variant="body2" fontWeight={600} color="warning.dark">
                                This book is {daysLate} day(s) overdue
                            </Typography>
                            <Typography variant="body2" color="warning.dark">
                                Estimated Fine: {formatCurrency(estimatedFine)}
                            </Typography>
                        </Box>
                    </Box>
                )}

                {!overdue && (
                    <Chip label="Returned on time - No fine" color="success" variant="outlined" sx={{ mt: 1 }} />
                )}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} sx={{ textTransform: 'none' }}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={() => onConfirm(issue.id)}
                    color={overdue ? 'warning' : 'success'}
                    sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}
                >
                    Confirm Return
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReturnForm;
