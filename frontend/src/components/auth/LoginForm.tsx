import React, { useState } from 'react';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
    InputAdornment,
    IconButton,
    CircularProgress,
} from '@mui/material';
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Visibility,
    VisibilityOff,
    MenuBook as MenuBookIcon,
    AutoStories as AutoStoriesIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { LoginRequest } from '../../types/User';
import authService from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>();

    const onSubmit = async (data: LoginRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login(data);
            login(response.token, response.user);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #0f2027 0%, #203a43 40%, #2c5364 100%)',
                p: 2,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(44,83,100,0.25) 0%, transparent 70%)',
                    pointerEvents: 'none',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-30%',
                    left: '-10%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(32,58,67,0.2) 0%, transparent 70%)',
                    pointerEvents: 'none',
                },
            }}
        >
            {/* Floating branding */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 40,
                    left: 40,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    zIndex: 1,
                }}
            >
                <AutoStoriesIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 28 }} />
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: 'rgba(255,255,255,0.7)',
                        fontWeight: 600,
                        letterSpacing: 0.5,
                    }}
                >
                    Library Management System
                </Typography>
            </Box>

            <Paper
                elevation={0}
                sx={{
                    p: 5,
                    maxWidth: 440,
                    width: '100%',
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.97)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.3), 0 5px 15px rgba(0,0,0,0.1)',
                    position: 'relative',
                    zIndex: 2,
                    border: '1px solid rgba(255,255,255,0.2)',
                }}
            >
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box
                        sx={{
                            width: 68,
                            height: 68,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #2c5364, #0f2027)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2.5,
                            boxShadow: '0 8px 25px rgba(15,32,39,0.35)',
                        }}
                    >
                        <MenuBookIcon sx={{ fontSize: 36, color: 'white' }} />
                    </Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#0f2027' }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                        Sign in to access your library dashboard
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        id="login-email"
                        fullWidth
                        label="Email Address"
                        type="email"
                        margin="normal"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon sx={{ color: '#2c5364' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2.5,
                                backgroundColor: '#f8fafc',
                                '&:hover': {
                                    backgroundColor: '#f1f5f9',
                                },
                                '&.Mui-focused': {
                                    backgroundColor: '#fff',
                                },
                            },
                        }}
                    />

                    <TextField
                        id="login-password"
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        margin="normal"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon sx={{ color: '#2c5364' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2.5,
                                backgroundColor: '#f8fafc',
                                '&:hover': {
                                    backgroundColor: '#f1f5f9',
                                },
                                '&.Mui-focused': {
                                    backgroundColor: '#fff',
                                },
                            },
                        }}
                    />

                    <Button
                        id="login-submit"
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{
                            mt: 3,
                            mb: 2,
                            py: 1.5,
                            borderRadius: 2.5,
                            fontWeight: 600,
                            fontSize: '1rem',
                            textTransform: 'none',
                            background: 'linear-gradient(135deg, #2c5364, #0f2027)',
                            boxShadow: '0 4px 15px rgba(15,32,39,0.35)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #3d6e80, #203a43)',
                                boxShadow: '0 6px 20px rgba(15,32,39,0.45)',
                                transform: 'translateY(-1px)',
                            },
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                    </Button>
                </form>

                <Box
                    sx={{
                        mt: 3,
                        p: 2,
                        background: 'linear-gradient(135deg, #e8f0f2, #f0f4f5)',
                        borderRadius: 2.5,
                        border: '1px solid #dce6e8',
                    }}
                >
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom sx={{ fontWeight: 600 }}>
                        🔑 Demo Credentials
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ fontFamily: 'monospace' }}>
                        Admin: admin@library.com / Admin@123
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ fontFamily: 'monospace' }}>
                        Librarian: librarian@library.com / Librarian@123
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginForm;
