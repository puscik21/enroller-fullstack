import {createContext, useContext, useEffect, useState} from "react";
import {loginRequest} from "../api/authApi";
import {notifyError} from "../info/notifier";
import {setupTokenExpirationInterceptor} from "../api/apiInstance";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState(() => localStorage.getItem("loggedInUser"));

    // TODO: use token for login and roles someday
    const loginUser = async (login, password) => {
        try {
            const returnedToken = await loginRequest({login, password}) || "";
            if (!returnedToken) return;

            setLoggedInUser(login);
            localStorage.setItem("bearerToken", returnedToken);
            localStorage.setItem("loggedInUser", login);
        } catch (err) {
            notifyError("Could not log in");
        }
    }

    const logoutUser = () => {
        setLoggedInUser(null);
        localStorage.removeItem("bearerToken");
        localStorage.removeItem("loggedInUser");
    }

    useEffect(() => {
        setupTokenExpirationInterceptor(logoutUser)
    }, [logoutUser]);

    return (
        <AuthContext.Provider value={{loggedInUser, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
