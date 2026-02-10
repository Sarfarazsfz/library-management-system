import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Box, Toolbar, useMediaQuery, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Header from './components/common/Header';
import Sidebar, { DRAWER_WIDTH } from './components/common/Sidebar';
import Footer from './components/common/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Users from './pages/Users';
import Issues from './pages/Issues';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2c5364',
            dark: '#0f2027',
            light: '#4a8a9e',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#203a43',
            dark: '#0f2027',
            light: '#3d6570',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8f9fa',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Header />
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    ml: isMobile ? 0 : 0,
                    width: isMobile ? '100%' : `calc(100% - ${DRAWER_WIDTH}px)`,
                }}
            >
                <Toolbar />
                {isMobile && (
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={() => setSidebarOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                )}
                <Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
                <Footer />
            </Box>
        </Box>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route element={<PrivateRoute />}>
                            <Route
                                path="/"
                                element={
                                    <AppLayout>
                                        <Dashboard />
                                    </AppLayout>
                                }
                            />
                            <Route
                                path="/books"
                                element={
                                    <AppLayout>
                                        <Books />
                                    </AppLayout>
                                }
                            />
                            <Route
                                path="/issues"
                                element={
                                    <AppLayout>
                                        <Issues />
                                    </AppLayout>
                                }
                            />
                            <Route
                                path="/users"
                                element={
                                    <AppLayout>
                                        <Users />
                                    </AppLayout>
                                }
                            />
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
