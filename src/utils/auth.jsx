// Guardar el token en localStorage
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Obtener el token de localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Eliminar el token de localStorage (logout)
export const removeToken = () => {
  localStorage.removeItem("token");
};
