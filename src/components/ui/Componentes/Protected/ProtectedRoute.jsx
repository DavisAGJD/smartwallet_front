import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);

  // Si el usuario no está autenticado, redirigir al inicio de sesión
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Verifica si el usuario tiene el rol requerido para acceder a esta ruta
  if (requiredRole && userRole !== requiredRole) {
    // Redirige según el rol del usuario
    if (userRole === "admin") {
      return <Navigate to="/admin-dashboard" />;
    } else if (userRole === "usuario") {
      return <Navigate to="/user-overview" />;
    } else {
      // Si el rol no es ni "admin" ni "usuario", redirigir al login
      return <Navigate to="/login" />;
    }
  }

  // Si está autenticado y tiene el rol adecuado, renderizar el contenido de la ruta protegida
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string, // Define el rol requerido como prop opcional
};

export default ProtectedRoute;
