import { createTheme, CssVarsThemeOptions, darken, lighten } from "@mui/material";
import { grey } from "@mui/material/colors";
import { csCZ, enUS } from "@mui/material/locale";
import { csCZ as dataGridCsCz, enUS as dataGridEnUs } from "@mui/x-data-grid-premium/locales";
import { csCZ as datePickersCsCz, enUS as datePickersEnUs } from "@mui/x-date-pickers-pro/locales";
import { useTranslation } from "react-i18next";

const WISTRON_PRIMARY = "#00506E";
const WISTRON_SECONDARY = "#64DC00";

export const useGetTheme = (theme?: Pick<CssVarsThemeOptions, 'colorSchemes' | 'components'>) => {
    const { i18n } = useTranslation();

    return createTheme(
        {
            cssVariables: {
                colorSchemeSelector: "data-toolpad-color-scheme",
            },
            colorSchemes: {
                light: {
                    palette: {
                        primary: { main: WISTRON_PRIMARY },
                        secondary: { main: WISTRON_SECONDARY },
                    },
                },
                dark: {
                    palette: {
                        primary: { main: lighten(WISTRON_PRIMARY, 0.1) },
                        secondary: { main: darken(WISTRON_SECONDARY, 0.1) },
                    },
                },
                ...theme?.colorSchemes
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
                ...theme?.components
            },
        },
        i18n.language === "cs" ? datePickersCsCz : datePickersEnUs,
        i18n.language === "cs" ? dataGridCsCz : dataGridEnUs,
        i18n.language === "cs" ? csCZ : enUS
    );
};