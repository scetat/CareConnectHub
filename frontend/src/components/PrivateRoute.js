import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAdmin = () => {
    const user = localStorage.getItem('user');
    return user && JSON.parse(user).role === 'Admin';
  };

  const currentPath = window.location.pathname;

  // Check conditions for access
  if (currentPath === '/adminevent' && isAdmin()) {
    return children; // Render the child component if conditions are met
  }

  // Redirect to the homepage if not authorized
  return <Navigate to="/" />;
};

export default PrivateRoute;
