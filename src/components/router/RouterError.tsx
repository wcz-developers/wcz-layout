import { Box, Divider, Typography } from '@mui/material';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { FC } from 'react';

interface RouterErrorProps {
  error: ErrorComponentProps['error'];
}

export const RouterError: FC<RouterErrorProps> = ({ error }) => {

  return (
    <Box height="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" px={2} >
      <Box display="flex" alignItems="center" mb={4}>
        <Typography variant="h3" component="span" fontWeight={500} sx={{ lineHeight: 1 }} >500</Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
        <Typography variant="h5" component="span">{error.message}</Typography>
      </Box>
    </Box>
  );
}
