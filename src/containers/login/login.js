import {initializeMsal} from "../../internal/msal";
import {useEffect, useState} from "react";
import {useAuth} from "../../internal/auth/authProvider";
import {Navigate, useNavigate} from "react-router-dom";


const loginRequest = {
    scopes: ["api://79ebd25b-6b35-41e7-9f3d-88af9b58232e/.default"],
};

function Login() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        if (token !== null) {
            navigate("/subject-list");
            return;
        }

        const initAndLogin = async () => {
            try {
                const msalInstance = await initializeMsal();
                const response = await msalInstance.loginPopup(loginRequest);

                login(response.accessToken);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        initAndLogin();
    }, [login, navigate, token]);

    if (error) {
        return <div>Error: {error.message || "Unable to initialize or login"}</div>;
    }

    return (loading) ? <div>Loading...</div> : <Navigate to="/subject-list"/>;
}

export default Login;