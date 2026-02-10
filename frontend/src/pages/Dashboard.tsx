import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Chip,
} from '@mui/material';
import {
    MenuBook as BookIcon,
    CheckCircle as AvailableIcon,
    SwapHoriz as IssuedIcon,
    Warning as OverdueIcon,
    People as UserIcon,
    TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import issueService from '../services/issueService';
import { Issue } from '../types/Issue';
import { formatDate, isOverdue } from '../utils/helpers';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const [recentIssues, setRecentIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsData, issuesData] = await Promise.all([
                issueService.getDashboardStats(),
                issueService.getAllIssues(),
            ]);
            setStats(statsData);
            setRecentIssues(issuesData.slice(0, 5));
        } catch (error) {
            console.error('Failed to fetch dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner message="Loading dashboard..." />;

    const statCards = [
        {
            title: 'Total Books',
            value: stats?.totalBooks || 0,
            icon: <BookIcon sx={{ fontSize: 40 }} />,
            color: '#2c5364',
            bgColor: 'linear-gradient(135deg, #e0ecef, #c8dce1)',
        },
        {
            title: 'Available Books',
            value: stats?.availableBooks || 0,
            icon: <AvailableIcon sx={{ fontSize: 40 }} />,
            color: '#4caf50',
            bgColor: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
        },
        {
            title: 'Issued Books',
            value: stats?.issuedBooks || 0,
            icon: <IssuedIcon sx={{ fontSize: 40 }} />,
            color: '#ff9800',
            bgColor: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
        },
        {
            title: 'Overdue Books',
            value: stats?.overdueBooks || 0,
            icon: <OverdueIcon sx={{ fontSize: 40 }} />,
            color: '#f44336',
            bgColor: 'linear-gradient(135deg, #ffebee, #ffcdd2)',
        },
    ];

    return (
        <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Welcome to the Library Management System. Here's your overview.
            </Typography>

            {/* Stat Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {statCards.map((stat, idx) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                background: stat.bgColor,
                                border: '1px solid',
                                borderColor: 'divider',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                },
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Typography variant="h3" fontWeight={700} sx={{ color: stat.color }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ mt: 0.5 }}>
                                        {stat.title}
                                    </Typography>
                                </Box>
                                <Box sx={{ color: stat.color, opacity: 0.7 }}>{stat.icon}</Box>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Recent Activities */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <TrendingIcon color="primary" />
                            <Typography variant="h6" fontWeight={600}>
                                Recent Activity
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        {recentIssues.length === 0 ? (
                            <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                                No recent activity
                            </Typography>
                        ) : (
                            <List disablePadding>
                                {recentIssues.map((issue, idx) => {
                                    const overdueStatus = issue.status === 'ISSUED' && isOverdue(issue.dueDate);
                                    return (
                                        <React.Fragment key={issue.id}>
                                            <ListItem sx={{ px: 0 }}>
                                                <ListItemIcon sx={{ minWidth: 40 }}>
                                                    {issue.status === 'RETURNED' ? (
                                                        <AvailableIcon color="success" />
                                                    ) : overdueStatus ? (
                                                        <OverdueIcon color="error" />
                                                    ) : (
                                                        <IssuedIcon color="warning" />
                                                    )}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Typography variant="body2" fontWeight={500}>
                                                                {issue.bookTitle}
                                                            </Typography>
                                                            <Chip
                                                                label={overdueStatus ? 'OVERDUE' : issue.status}
                                                                size="small"
                                                                color={overdueStatus ? 'error' : issue.status === 'RETURNED' ? 'success' : 'warning'}
                                                                sx={{ fontSize: '0.65rem', height: 20 }}
                                                            />
                                                        </Box>
                                                    }
                                                    secondary={`${issue.memberName} • Issued: ${formatDate(issue.issueDate)} • Due: ${formatDate(issue.dueDate)}`}
                                                />
                                            </ListItem>
                                            {idx < recentIssues.length - 1 && <Divider variant="inset" component="li" />}
                                        </React.Fragment>
                                    );
                                })}
                            </List>
                        )}
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <UserIcon color="primary" />
                            <Typography variant="h6" fontWeight={600}>
                                Quick Stats
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Total Users
                                </Typography>
                                <Typography variant="body2" fontWeight={600}>
                                    {stats?.totalUsers || 0}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Books Available
                                </Typography>
                                <Typography variant="body2" fontWeight={600} color="success.main">
                                    {stats?.availableBooks || 0} / {stats?.totalBooks || 0}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Currently Issued
                                </Typography>
                                <Typography variant="body2" fontWeight={600} color="warning.main">
                                    {stats?.issuedBooks || 0}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Overdue Returns
                                </Typography>
                                <Typography variant="body2" fontWeight={600} color="error.main">
                                    {stats?.overdueBooks || 0}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
