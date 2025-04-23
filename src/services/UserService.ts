import Keycloak from "keycloak-js";
import { env } from "node:process";
import { KeycloakSettings } from "~/models/KeycloakSettings";
import { User } from "~/models/User";

const keycloakConfig: KeycloakSettings = {
    url: env.KEYCLOAK_URL!,
    realm: env.KEYCLOAK_REALM!,
    clientId: env.KEYCLOAK_CLIENT_ID!,
    idpHint: env.KEYCLOAK_IDP_HINT,
    confidentialClientId: env.KEYCLOAK_CONFIDENTIAL_CLIENT_ID,
    confidentialClientSecret: env.KEYCLOAK_CONFIDENTIAL_CLIENT_SECRET
};

const _kc = new Keycloak({
    url: keycloakConfig.url,
    realm: keycloakConfig.realm,
    clientId: keycloakConfig.clientId,
});


const initKeycloak = async () => {
    if (typeof window === "undefined") return;

    const authenticated = await _kc.init({ onLoad: "check-sso" });
    if (authenticated) {
        return await loadUserInfo();
    } else {
        await _kc.login({ idpHint: keycloakConfig.idpHint });
        return await loadUserInfo();
    }
};

const login = _kc.login;

const logout = _kc.logout;

const getToken = () => {
    if (_kc.token) {
        return _kc.token;
    } else {
        return getConfidentialToken();
    }
};

const getConfidentialToken = async () => {
    const { confidentialClientId, confidentialClientSecret, url, realm } = keycloakConfig;

    if (!confidentialClientId || !confidentialClientSecret)
        throw new Error("Confidential client id or secret is missing");

    const credentials = btoa(`${confidentialClientId}:${confidentialClientSecret}`);
    const urlencoded = new URLSearchParams({ grant_type: "client_credentials" });

    const response = await fetch(`${url}/realms/${realm}/protocol/openid-connect/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${credentials}`
        },
        body: urlencoded
    });

    if (!response.ok)
        throw new Error("Failed to obtain confidential token");

    const data = await response.json();
    return data.access_token as string;
};

const updateToken = () => _kc.updateToken(30).catch(login);

const hasRole = (roles: string[]) => roles.some(role => _kc.hasRealmRole(role) || _kc.hasResourceRole(role));

const loadUserInfo = async (): Promise<User> => {
    const user: any = await _kc.loadUserInfo();
    return {
        name: user.name,
        employeeId: user.employeeId?.toUpperCase() ?? "",
        department: user.department ?? "",
        email: user.email,
        company: user.company,
        category: user.category,
    };
};

export const UserService = {
    initKeycloak,
    login,
    logout,
    getToken,
    updateToken,
    hasRole
};