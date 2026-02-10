import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Divider,
    Box,
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    MenuBook as BookIcon,
    People as PeopleIcon,
    SwapHoriz as IssueIcon,
    AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const DRAWER_WIDTH = 260;

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAdmin } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Books', icon: <BookIcon />, path: '/books' },
        { text: 'Issues', icon: <IssueIcon />, path: '/issues' },
    ];

    if (isAdmin()) {
        menuItems.push({ text: 'Users', icon: <PeopleIcon />, path: '/users' });
    }

    const handleNavigation = (path: string) => {
        navigate(path);
        if (isMobile) {
            onClose();
        }
    };

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Toolbar />
            <Box sx={{ p: 2 }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: 'text.secondary',
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        fontSize: '0.7rem',
                        fontWeight: 600,
                    }}
                >
                    Navigation
                </Typography>
            </Box>
            <List sx={{ px: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => handleNavigation(item.path)}
                                sx={{
                                    borderRadius: 2,
                                    mx: 0.5,
                                    backgroundColor: isActive ? 'primary.main' : 'transparent',
                                    color: isActive ? 'white' : 'text.primary',
                                    '&:hover': {
                                        backgroundColor: isActive ? 'primary.dark' : 'action.hover',
                                    },
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: isActive ? 'white' : 'primary.main',
                                        minWidth: 40,
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 400,
                                        fontSize: '0.9rem',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                    Library Management System v1.0
                </Typography>
            </Box>
        </Box>
    );

    return (
        <>
            {isMobile ? (
                <Drawer
                    variant="temporary"
                    open={open}
                    onClose={onClose}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: DRAWER_WIDTH,
                            boxSizing: 'border-box',
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            ) : (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: DRAWER_WIDTH,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: DRAWER_WIDTH,
                            boxSizing: 'border-box',
                            borderRight: '1px solid',
                            borderColor: 'divider',
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}
        </>
    );
};

export { DRAWER_WIDTH };
export default Sidebar;
