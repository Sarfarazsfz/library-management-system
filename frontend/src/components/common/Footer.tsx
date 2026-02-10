import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                px: 3,
                mt: 'auto',
                backgroundColor: '#f5f5f5',
                borderTop: '1px solid',
                borderColor: 'divider',
                textAlign: 'center',
            }}
        >
            <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Library Management System. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
