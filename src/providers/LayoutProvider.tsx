import { createTheme } from '@mui/material';
import { grey, indigo } from '@mui/material/colors';
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
import { AppTitle } from '~/components/AppTitle';
import { NavigationParams } from '~/models/NavigationParams';
import { TanstackRouterAppProvider } from './TanstackRouterAppProvider';

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
    //theme: Theme;
    children: React.ReactNode;
}

export const LayoutProvider: FC<ProvidersProps> = (props) => {
    const { t, i18n } = useTranslation();
    const [title, setTitle] = useState(props.title);

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
                    primary: { main: indigo[400] },
                    secondary: { main: indigo[400] },
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
                    fullWidth: true,
                },
            },
            MuiTableContainer: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        height: 'calc(100vh - 56px)',
                        [theme.breakpoints.up('sm')]: {
                            height: 'calc(100vh - 64px)',
                        },
                        "& .MuiDataGrid-cell--editing": {
                            "& .MuiInputBase-root": {
                                height: "100%",
                            },
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                            fontWeight: 600,
                        },
                        "& .Mui-error": {
                            backgroundColor: theme.palette.error.main,
                            color: theme.palette.error.contrastText,
                        },
                        "& .MuiDataGrid-booleanCell[data-value='true']": {
                            color: `${theme.palette.success.main} !important`,
                        },
                        "& .MuiDataGrid-booleanCell[data-value='false']": {
                            color: `${theme.palette.error.main} !important`,
                        },
                    }),
                },
            },
            MuiDialog: {
                defaultProps: {
                    fullWidth: true,
                }
            },
        },
    });

    const navigation: Navigation = props.getNavigation({ user: { name: "Dalibor", department: "MD0L50", employeeId: "C2503017", company: "", category: "" }, t });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.resolvedLanguage}>
            <TanstackRouterAppProvider navigation={navigation} theme={createdTheme}>
                <DashboardLayout
                    defaultSidebarCollapsed
                    branding={{
                        logo: <img src="/android-chrome-192x192.png" alt="Logo" />,
                        title: title
                    }}
                    slots={{
                        toolbarActions: () => null,
                        toolbarAccount: () => <div>acc</div>,
                        appTitle: (props) => <AppTitle title={title} environment="Development" />,
                    }}
                >
                    {props.children}
                </DashboardLayout>
            </TanstackRouterAppProvider>
        </LocalizationProvider>
    )
}
