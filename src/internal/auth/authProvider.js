import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            setUser({ token });
            navigate("/subject-list");
        }
    }, [navigate]);

    const login = (token) => {
        localStorage.setItem("access_token", token);
        setUser({ token });
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
