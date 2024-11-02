import { useState, useEffect, useContext } from "react";
import { XCircle } from "lucide-react";
import PropTypes from "prop-types";
import {
  obtenerNotificacionesPorUsuario,
  eliminarNotificacion,
} from "../../../api/notificacionesApi";
import { AuthContext } from "../../../context/AuthContext";

export default function NotificacionesList({
  refreshNotifications,
  onNotificationDeleted,
}) {
  const { token } = useContext(AuthContext);
  const [notificaciones, setNotificaciones] = useState([]);

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
    const fetchNotificaciones = async () => {
      try {
        if (usuarioId && token) {
          const response = await obtenerNotificacionesPorUsuario(
            usuarioId,
            token
          );
          setNotificaciones(response);
        }
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    };

    fetchNotificaciones();
  }, [refreshNotifications, token, usuarioId]);

  const handleDelete = async (id) => {
    try {
      await eliminarNotificacion(id, token);
      onNotificationDeleted();
    } catch (error) {
      console.error("Error al eliminar la notificación:", error);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-y-auto h-full p-6">
      {" "}
      {/* Ajuste de altura completa */}
      {notificaciones.length === 0 ? (
        <p className="text-gray-500 text-center">No hay notificaciones</p>
      ) : (
        <ul className="space-y-2">
          {notificaciones.map((notificacion) => (
            <li
              key={notificacion.notificacion_id}
              className="flex justify-between items-center p-3 border-b border-gray-200"
            >
              <span>{notificacion.mensaje}</span>
              <button
                onClick={() => handleDelete(notificacion.notificacion_id)}
              >
                <XCircle className="text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

NotificacionesList.propTypes = {
  refreshNotifications: PropTypes.bool.isRequired,
  onNotificationDeleted: PropTypes.func.isRequired,
};
