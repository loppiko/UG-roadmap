import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { keycloak } = useKeycloak();

    const isLoggedIn = keycloak.authenticated;

    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute