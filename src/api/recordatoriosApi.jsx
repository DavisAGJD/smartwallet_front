// api/recordatoriosApi.js
import axios from "axios";

// Agregar un nuevo recordatorio
export const agregarRecordatorio = async (token, recordatorioData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/recordatorios/create`,
      recordatorioData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al agregar recordatorio:", error);
    throw error;
  }
};

// Obtener recordatorios de un usuario específico
export const obtenerRecordatoriosPorUsuario = async (usuarioId, token) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/recordatorios/user/${usuarioId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los recordatorios del usuario:", error);
    throw error;
  }
};

// Editar un recordatorio
export const editarRecordatorio = async (recordatorioId, data, token) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/recordatorios/update/${recordatorioId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al editar recordatorio:", error);
    throw error;
  }
};

// Eliminar un recordatorio
export const eliminarRecordatorio = async (recordatorioId, token) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/recordatorios/delete/${recordatorioId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar recordatorio:", error);
    throw error;
  }
};
