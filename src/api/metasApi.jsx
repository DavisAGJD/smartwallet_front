import axios from "axios";

export const agregarMeta = async (token, data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/metas/create`,
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
    console.error("Error al agregar meta:", error);
    throw error;
  }
};

export const obtenerMetasPorUsuario = async (usuarioId, token) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/metas/user/${usuarioId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener metas del usuario:", error);
    throw error;
  }
};

export const actualizarMontoActual = async (meta_id, montoAdicional, token) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/metas/updateMonto/${meta_id}`,
      { montoAdicional },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el monto:", error);
    throw error;
  }
};

export const actualizarMeta = async (meta_id, data, token) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/metas/update/${meta_id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la meta en la API:", error);
    throw error;
  }
};

export const eliminarMeta = async (meta_id, token) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/metas/delete/${meta_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la meta:", error);
    throw error;
  }
};

