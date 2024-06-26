import Keycloak from 'keycloak-js';

const keycloakSetting = {
    url: "http://localhost:8080/",
    realm: "react-demo",
    clientId: "react-client",
    redirectUri: "http://localhost:3000/admin",
};


const authInstance = new Keycloak(keycloakSetting);


export default authInstance;