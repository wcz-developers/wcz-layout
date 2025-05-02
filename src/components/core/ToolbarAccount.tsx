import { AccountCircle, ArrowBack, Brightness4, ChevronRight, DarkMode, LightMode, Login, Logout, SettingsBrightness, Translate } from "@mui/icons-material";
import { Avatar, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, Typography, useColorScheme } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

type TabType = "settings" | "theme" | "language";

const user = {
    name: "Dalibor Homola",
    employeeId: "C2503017",
    department: "MD0L50",
    login: () => { console.log("Login"); },
    logout: () => { console.log("Logout"); },
}

export const ToolbarAccount: FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [tab, setTab] = useState<TabType>("settings");
    const open = Boolean(anchorEl);
    const { t, i18n } = useTranslation();
    const { mode, setMode } = useColorScheme();

    const changeLanguage = (newLanguage: "en" | "cs") => () => {
        i18n.changeLanguage(newLanguage).finally(() => closeMenu());
    };

    const changeMode = (newMode: "light" | "dark" | "system") => () => {
        setMode(newMode);
        closeMenu();
    };

    const getModeText = () => {
        switch (mode) {
            case "light": return t("Layout.Light");
            case "dark": return t("Layout.Dark");
            default: return t("Layout.System");
        }
    };

    const usernameInitials = () => {
        const splittedName: string[] = user.name.split(" ");
        return `${splittedName[0][0]}${splittedName.length > 1 ? splittedName[1][0] : ""}`;
    };

    const openMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(e.currentTarget);
    const closeMenu = () => { setAnchorEl(null); setTimeout(() => setTab("settings"), 300); };

    const login = () => user.login();
    const logout = () => user.logout();

    const changeTab = (newTab: TabType) => () => setTab(newTab);

    const settings = (
        <List component="nav" subheader={<ListSubheader sx={{ backgroundColor: "transparent" }}>{t("Layout.Settings")}</ListSubheader>}>
            <ListItemButton onClick={changeTab("theme")} sx={{ py: 0.3 }}>
                <ListItemIcon>
                    <Brightness4 />
                </ListItemIcon>
                <ListItemText primary={t("Layout.Appearance")} secondary={getModeText()} />
                <ChevronRight />
            </ListItemButton>

            <ListItemButton onClick={changeTab("language")} sx={{ py: 0.3 }}>
                <ListItemIcon>
                    <Translate />
                </ListItemIcon>
                <ListItemText primary={t("Layout.Language")} secondary={i18n.resolvedLanguage === "en" ? "English" : "Čeština"} />
                <ChevronRight />
            </ListItemButton>
        </List>
    );

    const theme = (
        <List subheader={
            <ListSubheader onClick={changeTab("settings")} sx={{ backgroundColor: "transparent", display: "flex", alignItems: "center", px: 1, cursor: "pointer" }}>
                <IconButton size="small" sx={{ mr: 0.5 }}>
                    <ArrowBack fontSize="small" />
                </IconButton> {t("Layout.Appearance")}
            </ListSubheader>
        }>
            <ListItemButton onClick={changeMode("light")} disabled={mode === "light"}>
                <ListItemIcon>
                    <LightMode />
                </ListItemIcon>
                <ListItemText primary={t("Layout.Light")} />
            </ListItemButton>
            <ListItemButton onClick={changeMode("dark")} disabled={mode === "dark"}>
                <ListItemIcon>
                    <DarkMode />
                </ListItemIcon>
                <ListItemText primary={t("Layout.Dark")} />
            </ListItemButton>
            <ListItemButton onClick={changeMode("system")} disabled={mode === "system"}>
                <ListItemIcon>
                    <SettingsBrightness />
                </ListItemIcon>
                <ListItemText primary={t("Layout.System")} />
            </ListItemButton>
        </List>
    );

    const language = (
        <List subheader={
            <ListSubheader onClick={changeTab("settings")} sx={{ backgroundColor: "transparent", display: "flex", alignItems: "center", px: 1, cursor: "pointer" }}>
                <IconButton size="small" sx={{ mr: 0.5 }}>
                    <ArrowBack fontSize="small" />
                </IconButton> {t("Layout.Language")}
            </ListSubheader>
        }>
            <ListItemButton onClick={changeLanguage("en")} disabled={i18n.resolvedLanguage === "en"}>
                <ListItemText primary="English" />
            </ListItemButton>
            <ListItemButton onClick={changeLanguage("cs")} disabled={i18n.resolvedLanguage === "cs"}>
                <ListItemText primary="Čeština" />
            </ListItemButton>
        </List>
    );

    return (
        <Fragment>
            <IconButton size="small" onClick={openMenu}>
                {user.name ?
                    <Avatar sx={{ width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 }, bgcolor: "primary.main" }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold", lineHeight: 0 }}>
                            {usernameInitials()}
                        </Typography>
                    </Avatar>
                    :
                    <AccountCircle />
                }
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
                <Box sx={{ width: 240 }}>
                    <List>
                        {user.name ?
                            <Fragment>
                                <ListItem>
                                    <ListItemText primary={user.name} secondary={
                                        <span>
                                            <span>{user.employeeId}</span>
                                            <br />
                                            <span>{user.department}</span>
                                        </span>
                                    } />
                                </ListItem>

                                <ListItemButton onClick={logout}>
                                    <ListItemIcon><Logout color="error" /></ListItemIcon>
                                    <ListItemText primary={t("Layout.Logout")} />
                                </ListItemButton>
                            </Fragment>
                            :
                            <ListItemButton onClick={login}>
                                <ListItemIcon><Login color="success" /></ListItemIcon>
                                <ListItemText primary={t("Layout.LogIn")} />
                            </ListItemButton>
                        }
                    </List>

                    {tab === "settings" && settings}
                    {tab === "theme" && theme}
                    {tab === "language" && language}
                </Box>
            </Menu>
        </Fragment>
    );
};