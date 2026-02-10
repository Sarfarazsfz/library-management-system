import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
} from '@mui/material';
import { WarningAmber as WarningIcon } from '@mui/icons-material';

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    severity?: 'warning' | 'error' | 'info';
}

const severityColors = {
    warning: { bg: '#fff3e0', icon: '#e65100', border: '#ff9800' },
    error: { bg: '#ffebee', icon: '#c62828', border: '#f44336' },
    info: { bg: '#e0ecef', icon: '#2c5364', border: '#2c5364' },
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    title = 'Confirm Action',
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    severity = 'warning',
}) => {
    const colors = severityColors[severity];

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    overflow: 'hidden',
                },
            }}
        >
            <Box
                sx={{
                    height: 4,
                    background: colors.border,
                }}
            />
            <DialogTitle sx={{ pb: 1, pt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 2,
                            backgroundColor: colors.bg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}
                    >
                        <WarningIcon sx={{ color: colors.icon, fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" fontWeight={600}>
                        {title}
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 1, ml: 7.5, lineHeight: 1.6 }}
                >
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
                <Button
                    onClick={onCancel}
                    variant="outlined"
                    sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        px: 3,
                        fontWeight: 500,
                        borderColor: '#e0e0e0',
                        color: 'text.secondary',
                        '&:hover': {
                            borderColor: '#bdbdbd',
                            backgroundColor: '#fafafa',
                        },
                    }}
                >
                    {cancelText}
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color={severity === 'error' ? 'error' : severity === 'warning' ? 'warning' : 'primary'}
                    sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        px: 3,
                        fontWeight: 600,
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        },
                    }}
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
