import axios from "axios";

export const crearReporte = async (token, reportData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/reportes/create`,
      reportData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear reporte:", error);
    throw error;
  }
};

export const obtenerReportesPorUsuario = async (token, usuario_id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/reportes/user/${usuario_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en los headers para autenticación
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener reportes del usuario:", error);
    throw error;
  }
};

export const eliminarReporte = async (reporte_id, token) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/reportes/delete/${reporte_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el reporte:", error);
    throw error;
  }
};


export const obtenerReportes = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/reportes`); // Asegúrate de usar la ruta correcta
    return response.data;
  } catch (error) {
    console.error("Error al obtener los reportes:", error);
    throw error;
  }
};