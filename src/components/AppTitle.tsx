import { Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";

interface AppTitleProps {
    title: string;
    environment: string;
}

export const AppTitle: FC<AppTitleProps> = ({ title, environment }) => {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <img src="/favicon-32x32.png" alt="Logo" />
            <Typography variant="h6">{title}</Typography>
            {environment && <Chip size="small" label={environment} color="info" />}
        </Stack>
    );
};