// api/gastosApi.js
import axios from "axios";

export const agregarGasto = async (token, gastoData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/gastos/create`,
      gastoData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al agregar gasto:", error);
    throw error;
  }
};

export const obtenerGastosPorUsuario = async (usuarioId, token) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/gastos/user/${usuarioId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los gastos del usuario:", error);
    throw error;
  }
};

export const editarGasto = async (id_gasto, data, token) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/gastos/update/${id_gasto}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token si es necesario
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al editar gasto:", error);
    throw error;
  }
};


export const eliminarGasto = async (id_gasto, token) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/gastos/delete/${id_gasto}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar gasto:", error);
    throw error;
  }
};
