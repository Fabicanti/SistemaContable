import React from 'react'
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ isAuth, redirectTo, children }) => {
    return isAuth ? children : <Navigate to={redirectTo} />;

}
