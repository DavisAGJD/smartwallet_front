import axios from "axios";

// Obtener notificaciones por ID de usuario
export const obtenerNotificacionesPorUsuario = async (usuarioId, token) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/notificaciones/user/${usuarioId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener las notificaciones del usuario:", error);
    throw error;
  }
};

// Crear una nueva notificación
export const crearNotificacion = async (token, notificacionData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/notificaciones/create`,
      notificacionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear la notificación:", error);
    throw error;
  }
};

// Actualizar una notificación por ID
export const actualizarNotificacion = async (notificacionId, token, notificacionData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/notificaciones/update/${notificacionId}`,
      notificacionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la notificación:", error);
    throw error;
  }
};

// Eliminar una notificación por ID
export const eliminarNotificacion = async (notificacionId, token) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/notificaciones/delete/${notificacionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la notificación:", error);
    throw error;
  }
};
