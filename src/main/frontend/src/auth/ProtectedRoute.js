import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from './AuthContext';

/**
 * Check if user is logged in
 * If yes, renders child components
 * If not, redirects to login page
 */
const ProtectedRoute = ({children}) => {
    const {loggedInUser} = useAuth();

    if (!loggedInUser) {
        return <Navigate to="/login"/>;
    }

    return children;
};

export default ProtectedRoute;
