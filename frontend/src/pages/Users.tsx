import React, { useState } from 'react';
import { Box, Typography, Button, Alert, Snackbar } from '@mui/material';
import { PersonAdd as AddIcon } from '@mui/icons-material';
import UserList from '../components/users/UserList';
import UserForm from '../components/users/UserForm';
import { User, UserFormData } from '../types/User';
import authService from '../services/authService';
import userService from '../services/userService';

const Users: React.FC = () => {
    const [formOpen, setFormOpen] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    const handleAdd = () => {
        setEditUser(null);
        setFormOpen(true);
    };

    const handleEdit = (user: User) => {
        setEditUser(user);
        setFormOpen(true);
    };

    const handleSubmit = async (data: UserFormData) => {
        try {
            if (editUser) {
                await userService.updateUser(editUser.id, data);
                setSnackbar({ open: true, message: 'User updated successfully!', severity: 'success' });
            } else {
                await authService.register(data);
                setSnackbar({ open: true, message: 'User registered successfully!', severity: 'success' });
            }
            setRefreshTrigger((prev) => prev + 1);
        } catch (error: any) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Operation failed',
                severity: 'error',
            });
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" fontWeight={700}>
                        Users
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage system users and librarians
                    </Typography>
                </Box>
                <Button
                    id="add-user-btn"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                    sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        px: 3,
                        boxShadow: '0 4px 15px rgba(25,118,210,0.3)',
                    }}
                >
                    Add User
                </Button>
            </Box>

            <UserList onEdit={handleEdit} refreshTrigger={refreshTrigger} />

            <UserForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={handleSubmit}
                user={editUser}
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

export default Users;
