import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material';
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
    children: React.ReactNode;
}

export const LayoutProvider: FC<ProvidersProps> = ({ getNavigation, children }) => {
    const emotionCache = createCache({ key: 'css' });
    const theme = createTheme();
    const { t, i18n } = useTranslation();

    const navigation: Navigation = getNavigation({ user: { name: "Dalibor" }, i18n, t });

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.resolvedLanguage}>
                    <QueryClientProvider client={queryClient}>
                        <DashboardLayout
                            defaultSidebarCollapsed
                            navigation={navigation}
                            branding={{
                                logo: (
                                    <img
                                        src="/android-chrome-192x192.png"
                                        alt="Logo"
                                    />
                                ),
                                title: "Test", /* přidat chip development */
                            }}
                        // slots={{
                        //     toolbarActions: ToolbarActions,
                        //     toolbarAccount: ToolbarAccount,
                        // }}
                        >
                            {children}
                        </DashboardLayout>
                    </QueryClientProvider>,
                </LocalizationProvider>
            </ThemeProvider>
        </CacheProvider>
    )
}
