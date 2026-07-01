import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layouts/Spinner";

const PrivateRoute = ({ element: Element }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // Show loading while checking authentication
  if (loading) {
    return <Spinner />;
  }

  // Only redirect to login if not authenticated and not loading
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if authenticated
  return <Element />;
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
