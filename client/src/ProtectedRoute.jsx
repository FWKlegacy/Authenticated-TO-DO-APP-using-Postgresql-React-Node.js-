import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If there's no token, redirect to the login page
    return <Navigate to="/login" />;
  }

  // Token is present, render the protected content (children)
  return children;
};

// Prop validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Expect children as a React node (could be any renderable element)
};

export default ProtectedRoute;
