import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    Tooltip,
    Typography,
    Box,
    Alert,
    Snackbar,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    CheckCircle as ActiveIcon,
    Cancel as InactiveIcon,
} from '@mui/icons-material';
import { User } from '../../types/User';
import userService from '../../services/userService';
import LoadingSpinner from '../common/LoadingSpinner';
import ConfirmDialog from '../common/ConfirmDialog';

interface UserListProps {
    onEdit: (user: User) => void;
    refreshTrigger: number;
}

const UserList: React.FC<UserListProps> = ({ onEdit, refreshTrigger }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; userId: number | null; userName: string }>({
        open: false,
        userId: null,
        userName: '',
    });

    useEffect(() => {
        fetchUsers();
    }, [refreshTrigger]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to fetch users', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (user: User) => {
        setDeleteConfirm({ open: true, userId: user.id, userName: user.name });
    };

    const handleDeleteConfirm = async () => {
        if (deleteConfirm.userId === null) return;
        try {
            await userService.deleteUser(deleteConfirm.userId);
            setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' });
            fetchUsers();
        } catch (error: any) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Failed to delete user',
                severity: 'error',
            });
        } finally {
            setDeleteConfirm({ open: false, userId: null, userName: '' });
        }
    };

    if (loading) return <LoadingSpinner message="Loading users..." />;

    return (
        <Box>
            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                                    <Typography color="text.secondary">No users found</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id} hover>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={user.role}
                                            size="small"
                                            color={user.role === 'ADMIN' ? 'secondary' : 'primary'}
                                            variant="outlined"
                                            sx={{ fontWeight: 600, borderRadius: 1.5 }}
                                        />
                                    </TableCell>
                                    <TableCell>{user.phone || 'N/A'}</TableCell>
                                    <TableCell>
                                        {user.isActive ? (
                                            <Chip icon={<ActiveIcon />} label="Active" size="small" color="success" sx={{ borderRadius: 1.5 }} />
                                        ) : (
                                            <Chip icon={<InactiveIcon />} label="Inactive" size="small" color="error" sx={{ borderRadius: 1.5 }} />
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Edit">
                                            <IconButton size="small" color="primary" onClick={() => onEdit(user)}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton size="small" color="error" onClick={() => handleDeleteClick(user)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <ConfirmDialog
                open={deleteConfirm.open}
                title="Delete User"
                message={`Are you sure you want to delete "${deleteConfirm.userName}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                severity="error"
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteConfirm({ open: false, userId: null, userName: '' })}
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

export default UserList;
