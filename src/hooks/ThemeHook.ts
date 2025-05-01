// use get theme

// const theme: Theme = createTheme({
//     palette: {
//         mode: resolvedMode,
//         primary: { main: (colors.primary as any)?.[resolvedMode] || (colors.primary as any)?.main, },
//         secondary: { main: (colors.secondary as any)?.[resolvedMode] || (colors.secondary as any)?.main, },
//         background: resolvedMode === "light" && colors.background ? { default: colors.background.default, paper: colors.background.paper, } : {},
//     },
//     components: {
//         MuiCssBaseline: {
//             styleOverrides: (theme) => ({
//                 body: {
//                     "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
//                         width: "0.7em",
//                         height: "0.7em",
//                     },
//                     "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
//                         backgroundColor: theme.palette.mode === "dark" ? grey[900] : grey[200],
//                         borderRadius: "5px",
//                     },
//                     "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
//                         backgroundColor: theme.palette.mode === "dark" ? grey[800] : grey[400],
//                         borderRadius: "10px",
//                     },
//                     "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
//                         backgroundColor: theme.palette.mode === "dark" ? grey[700] : grey[500],
//                     },
//                     "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
//                         backgroundColor: "transparent",
//                     },
//                 },
//             }),
//         },
//     },
// },
//     i18n.language === "cs" ? datePickersCsCz : datePickersEnUs,
//     i18n.language === "cs" ? dataGridCsCz : dataGridEnUs,
//     i18n.language === "cs" ? csCZ : enUS
// );