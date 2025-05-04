import { Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface AppTitleProps {
    title: string;
    environment: string;
}

export const AppTitle: FC<AppTitleProps> = ({ title, environment }) => {
    const { t } = useTranslation();

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <img src="/favicon-32x32.png" alt="Logo" />
            <Typography variant="h6">{title}</Typography>
            {environment && <Chip size="small" label={t("Layout.Development")} />}
        </Stack>
    );
};