import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createTheme, Theme, ThemeProvider } from '@mui/material';
import { grey, indigo } from '@mui/material/colors';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import I18NextHttpBackend from "i18next-http-backend";
import { FC } from 'react';
import { initReactI18next, useTranslation } from "react-i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import zodCsTranslations from "zod-i18n-map/locales/cs/zod.json";
import zodEnTranslations from "zod-i18n-map/locales/en/zod.json";
import { NavigationParams } from '~/models/NavigationParams';
import { TanstackRouterAppProvider } from './TanstackRouterAppProvider';

const queryClient = new QueryClient();

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(I18NextHttpBackend)
    .init({ fallbackLng: "en" });

i18next.addResourceBundle("en", "zod", zodEnTranslations);
i18next.addResourceBundle("cs", "zod", zodCsTranslations);
z.setErrorMap(zodI18nMap);

interface ProvidersProps {
    getNavigation: (params: NavigationParams) => Navigation;
    title: string;
    //theme: Theme;
    children: React.ReactNode;
}

export const LayoutProvider: FC<ProvidersProps> = ({ getNavigation, title, children }) => {
    const emotionCache = createCache({ key: 'css' });
    const { t, i18n } = useTranslation();

    const createdTheme = createTheme({
        cssVariables: {
            colorSchemeSelector: "data-toolpad-color-scheme",
        },
        colorSchemes: {
            light: {
                palette: {
                    primary: { main: indigo[600] },
                    secondary: { main: indigo[600] },
                    background: {
                        paper: grey[200],
                    },
                },
            },
            dark: {
                palette: {
                    primary: { main: indigo[600] },
                    secondary: { main: indigo[600] },
                    background: {
                        paper: grey[900],
                    },
                },
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: (theme) => {
                    return {
                        body: {
                            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                                width: "0.7em",
                                height: "0.7em",
                            },
                            "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
                                backgroundColor:
                                    theme.palette.mode === "dark" ? grey[900] : grey[200],
                                borderRadius: "5px",
                            },
                            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                                backgroundColor:
                                    theme.palette.mode === "dark" ? grey[800] : grey[400],
                                borderRadius: "10px",
                            },
                            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                            {
                                backgroundColor:
                                    theme.palette.mode === "dark" ? grey[700] : grey[500],
                            },
                            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                                backgroundColor: "transparent",
                            },
                        },
                    };
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: ({ theme }) => ({
                        backgroundColor: "inherit",
                        [theme.breakpoints.down("sm")]: {
                            backgroundColor: theme.palette.background.paper,
                        },
                    }),
                },
            },
            MuiTextField: {
                defaultProps: {
                    variant: "outlined",
                    size: "medium",
                    fullWidth: true,
                },
            },
        },
    });

    const navigation: Navigation = getNavigation({ user: { name: "Dalibor" }, i18n, t });

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={createdTheme}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.resolvedLanguage}>
                    <QueryClientProvider client={queryClient}>
                        <TanstackRouterAppProvider theme={createdTheme}>
                            <DashboardLayout
                                defaultSidebarCollapsed
                                navigation={navigation}
                                branding={{
                                    logo: <img src="/android-chrome-192x192.png" alt="Logo" />,
                                    title: title
                                }}
                            // slots={{
                            //     toolbarActions: ToolbarActions,
                            //     toolbarAccount: ToolbarAccount,
                            // }}
                            >
                                {children}
                            </DashboardLayout>
                        </TanstackRouterAppProvider>
                    </QueryClientProvider>,
                </LocalizationProvider>
            </ThemeProvider>
        </CacheProvider>
    )
}
