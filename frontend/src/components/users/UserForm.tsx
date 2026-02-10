import React, { useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    MenuItem,
    IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { User, UserFormData } from '../../types/User';
import { USER_ROLES } from '../../utils/constants';

interface UserFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: UserFormData) => void;
    user?: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ open, onClose, onSubmit, user }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserFormData>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            role: 'LIBRARIAN',
            phone: '',
            address: '',
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email,
                password: '',
                role: user.role,
                phone: user.phone || '',
                address: user.address || '',
            });
        } else {
            reset({
                name: '',
                email: '',
                password: '',
                role: 'LIBRARIAN',
                phone: '',
                address: '',
            });
        }
    }, [user, reset]);

    const handleFormSubmit = (data: UserFormData) => {
        onSubmit(data);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {user ? 'Edit User' : 'Add New User'}
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Name is required', maxLength: { value: 255, message: 'Max 255 characters' } }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Name"
                                        fullWidth
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: 'Email is required',
                                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Email"
                                        type="email"
                                        fullWidth
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        disabled={!!user}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Controller
                                name="password"
                                control={control}
                                rules={
                                    user
                                        ? {}
                                        : { required: 'Password is required', minLength: { value: 8, message: 'Min 8 characters' } }
                                }
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={user ? 'New Password (leave blank to keep)' : 'Password'}
                                        type="password"
                                        fullWidth
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Controller
                                name="role"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Role" fullWidth select>
                                        {USER_ROLES.map((role) => (
                                            <MenuItem key={role} value={role}>
                                                {role}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Phone" fullWidth />
                                )}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Address" fullWidth multiline rows={2} />
                                )}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose} sx={{ textTransform: 'none' }}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}>
                        {user ? 'Update User' : 'Add User'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UserForm;
