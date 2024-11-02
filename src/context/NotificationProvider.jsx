// src/context/NotificationProvider.js
import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { obtenerNotificacionesPorUsuario } from "../api/notificacionesApi";
import { AuthContext } from "./AuthContext";
import { NotificationContext } from "./NotificationContext";

export function NotificationProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(null);

  // Obtener el usuarioId del token decodificado
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64));
    } catch {
      return null;
    }
  };

  const usuarioId = parseJwt(token)?.id;

  useEffect(() => {
    const fetchNotifications = async () => {
      if (token && usuarioId) {
        try {
          const response = await obtenerNotificacionesPorUsuario(usuarioId, token);
          setNotifications(response);

          // Si hay notificaciones, establece el mensaje de alerta
          if (response.length > 0) {
            setNewNotification("¡Tienes notificaciones pendientes!");
          } else {
            // Si no hay notificaciones, limpia el mensaje de alerta
            setNewNotification(null);
          }
        } catch (error) {
          console.error("Error al obtener notificaciones:", error);
        }
      }
    };

    // Ejecuta la función inmediatamente al montar el componente
    fetchNotifications();

    // Configura el intervalo para verificar cada minuto
    const intervalId = setInterval(fetchNotifications, 60000);

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, [token, usuarioId]);

  const clearNotification = () => setNewNotification(null);

  return (
    <NotificationContext.Provider value={{ newNotification, clearNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
