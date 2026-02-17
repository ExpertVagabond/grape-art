import React from 'react';
import { Box, Typography } from '@mui/material';

// Dialect chat SDK was removed (deprecated/dead project)
// InboxView is now a placeholder stub
export default function InboxView() {
    return (
        <Box width="100%" height={550} display="flex" alignItems="center" justifyContent="center">
            <Typography variant="body2" color="text.secondary">
                Chat inbox is no longer available.
            </Typography>
        </Box>
    );
}
