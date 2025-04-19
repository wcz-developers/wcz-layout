export interface KeycloakSettings {
    url: string;
    realm: string;
    clientId: string;
    idpHint?: string;
    confidentialClientId?: string;
    confidentialClientSecret?: string;
}