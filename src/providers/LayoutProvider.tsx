import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { FC, useState } from 'react';
import { initReactI18next, useTranslation } from "react-i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import zodCsTranslations from "zod-i18n-map/locales/cs/zod.json";
import zodEnTranslations from "zod-i18n-map/locales/en/zod.json";
import { AppTitle } from '~/components/core/AppTitle';
import { DevelopmentBanner } from '~/components/core/DevelopmentBanner';
import { ToolbarAccount } from '~/components/core/ToolbarAccount';
import { NavigationParams } from '~/models/NavigationParams';
import { theme } from '~/utils/Theme';
import { TanstackRouterAppProvider } from './TanstackRouterAppProvider';
import { LinearProgress } from '@mui/material';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

i18n.addResourceBundle("en", "zod", zodEnTranslations);
i18n.addResourceBundle("cs", "zod", zodCsTranslations);
z.setErrorMap(zodI18nMap);

interface ProvidersProps {
    getNavigation: (params: NavigationParams) => Navigation;
    title: string;
    children: React.ReactNode;
}

export const LayoutProvider: FC<ProvidersProps> = (props) => {
    const { t, i18n } = useTranslation();
    const isFetching = !!useIsFetching();
    const isMutating = !!useIsMutating();
    const [title, setTitle] = useState(props.title);

    const navigation: Navigation = props.getNavigation({ user: { name: "Dalibor", department: "MD0L50", employeeId: "C2503017", company: "", category: "" }, t });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.resolvedLanguage}>
            <TanstackRouterAppProvider navigation={navigation} theme={theme}>
                <DashboardLayout
                    defaultSidebarCollapsed
                    hideNavigation={!navigation.length}
                    slots={{
                        toolbarActions: () => null,
                        toolbarAccount: ToolbarAccount,
                        appTitle: () => <AppTitle title={title} environment="Development" />,
                    }}
                >
                    {props.children}
                    <DevelopmentBanner hasNavigationRoutes={!!navigation.length} />
                    {(isFetching || isMutating) && <LinearProgress sx={{ position: "fixed", top: { xs: 56, sm: 64 }, left: 0, right: 0 }} />}
                </DashboardLayout>
            </TanstackRouterAppProvider>
        </LocalizationProvider>
    )
}
