import axios from "axios";

export const loginUsuario = async (email, password_usuario) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/usuarios/login`,
      { email, password_usuario }
    );

    // Aquí recibimos la respuesta que ahora contiene el token y la racha
    const { token, racha, rol } = response.data;

    // Hacer algo con el token, racha y rol (por ejemplo, almacenarlos en el localStorage o el estado global)
    localStorage.setItem("token", token); // Guardar el token
    localStorage.setItem("racha", racha); // Guardar la racha
    localStorage.setItem("rol", rol); // Guardar el rol (si lo necesitas)

    return response.data; // Devolver los datos para usarlos donde sea necesario
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
    return response.data.ingresos;
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

export const obtenerUsuariosPaginados = async (page = 1, limit = 10, searchQuery = "") => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/usuarios/paginados`, // Asegúrate de que esta ruta coincida con tu backend
      {
        params: {
          page,       // Página actual
          limit,      // Límite de elementos por página
          search: searchQuery, // Término de búsqueda (opcional)
        },
      }
    );
    return response.data; // Devuelve los datos paginados y los metadatos
  } catch (error) {
    console.error("Error al obtener usuarios paginados:", error);
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

export const obtenerInfoUsuario = async (token, usuarioId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/usuarios/info-user/${usuarioId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token en el header de autorización
        },
      }
    );

    // Devuelve la información del usuario. Aquí puedes adaptar la respuesta según lo que devuelva el backend
    return response.data; // Devolver la respuesta completa si se requiere toda la info
  } catch (error) {
    console.error("Error al obtener la información del usuario:", error);
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
};
