import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface AppTitleProps {
    title: string;
}

export const AppTitle: FC<AppTitleProps> = ({ title }) => {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <img src="/favicon-32x32.png" alt="app-logo" loading="lazy" />
            <Typography variant="h6">{title}</Typography>
        </Stack>
    );
};