import { Close } from "@mui/icons-material";
import { Fade, Grid, IconButton, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface DevelopmentBannerProps {
    hasNavigationRoutes: boolean;
}

export const DevelopmentBanner: React.FC<DevelopmentBannerProps> = ({ hasNavigationRoutes }) => {
    const { t } = useTranslation();
    const [bannerOpen, setBannerOpen] = useState<boolean>(true);

    const closeBanner = () => setBannerOpen(false);

    return (
        <Fade appear={false} in={bannerOpen}>
            <Paper square variant="outlined" tabIndex={-1} sx={theme => ({
                position: "fixed",
                bottom: 0,
                left: { xs: 0, sm: hasNavigationRoutes ? 63.3 : 0 },
                right: 0,
                m: 0,
                p: 2,
                borderWidth: 0,
                borderTopWidth: 1,
                bgcolor: theme.palette.mode === "dark" ? grey[900] : grey[100]
            })}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid size={10}>
                        <Typography fontWeight="bold">{t("Layout.DevelopmentDialogTitle")}</Typography>
                        <Typography variant="body2">{t("Layout.DevelopmentDialogContent")}</Typography>
                    </Grid>

                    <Grid size={2} sx={{ p: 1, textAlign: "right" }}>
                        <IconButton size="small" onClick={closeBanner}>
                            <Close />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        </Fade>
    );
};