import axios from "axios";

export const loginUsuario = async (email, password_usuario) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/usuarios/login`,
      {
        email,
        password_usuario,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export const registerUsuario = async (usuarioData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/usuarios/register`,
      usuarioData
    );
    return response.data;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
};

export const obtenerIngresoUsuario = async (token, usuario_id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/ingresos/usuario/${usuario_id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.ingreso_mensual;
  } catch (error) {
    console.error("Error al obtener ingreso:", error);
    throw error;
  }
};

export const actualizarIngreso = async (token, usuario_id, ingresos) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/ingresos/usuario/${usuario_id}`,
      { ingresos },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar ingreso:", error);
    throw error;
  }
};

export const obtenerUsuarios = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/usuarios`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const actualizarUsuario = async (usuario_id, payload) => {
  try {
    console.log("Enviando datos a la API:", payload);
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/usuarios/update/${usuario_id}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Respuesta de la API:", response);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

export const obtenerInfoUsuarios = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/usuarios/info`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const eliminarUsuario = async (usuarioId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/usuarios/delete/${usuarioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};
