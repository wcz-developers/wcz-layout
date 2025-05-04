import { Box, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export function RouterNotFound() {
  const { t } = useTranslation();

  return (
    <Box height="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" px={2} >
      <Box display="flex" alignItems="center" mb={4}>
        <Typography variant="h3" component="span" fontWeight={500} sx={{ lineHeight: 1 }} >404</Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
        <Typography variant="h5" component="span">{t("Layout.ThisPageCouldNotBeFound")}</Typography>
      </Box>
    </Box>
  );
}
