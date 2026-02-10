import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Avatar,
    Chip,
    IconButton,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    MenuBook as MenuBookIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                background: 'linear-gradient(135deg, #203a43 0%, #0f2027 100%)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
        >
            <Toolbar>
                <MenuBookIcon sx={{ mr: 1.5, fontSize: 28 }} />
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        fontSize: isMobile ? '1rem' : '1.25rem',
                    }}
                >
                    {isMobile ? 'LMS' : 'Library Management System'}
                </Typography>

                {user && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Chip
                            icon={<PersonIcon />}
                            label={isMobile ? user.role : `${user.name} (${user.role})`}
                            sx={{
                                color: 'white',
                                borderColor: 'rgba(255,255,255,0.4)',
                                '& .MuiChip-icon': { color: 'white' },
                            }}
                            variant="outlined"
                            size={isMobile ? 'small' : 'medium'}
                        />
                        {isMobile ? (
                            <IconButton color="inherit" onClick={handleLogout} size="small">
                                <LogoutIcon />
                            </IconButton>
                        ) : (
                            <Button
                                color="inherit"
                                onClick={handleLogout}
                                startIcon={<LogoutIcon />}
                                sx={{
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                    },
                                }}
                            >
                                Logout
                            </Button>
                        )}
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
