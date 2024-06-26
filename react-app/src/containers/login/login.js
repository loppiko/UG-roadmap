import React from "react";

import { Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';


function Login() {

    const { keycloak } = useKeycloak();

    const login = () => {
        keycloak.login();
    };

    if (keycloak.authenticated) return <Navigate to="/admin"/>;
    else return (
        <div className="login">
        <h1>This is site with my login</h1>
        <div>
            {
            <button className="login-button" onClick={login}>
                Login
            </button>
            }
        </div>
        </div>
    );
}

export default Login;