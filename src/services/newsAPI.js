const API_KEY = "e28870dadfa34f548a3a8298eb6675c1"; // Tu clave API
const BASE_URL = `https://newsapi.org/v2/everything`;

/**
 * Función para obtener artículos de noticias basados en una palabra clave.
 * @param {string} keyword - La palabra clave para buscar.
 * @returns {Promise<Array>} - Retorna un array de artículos.
 */
export async function fetchArticles(keyword = "finance") {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${keyword}&language=es&sortBy=publishedAt&apiKey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Error fetching articles");
    }
    const data = await response.json();
    console.log("Datos de la API:", data.articles); // Para inspeccionar la estructura de los datos
    return data.articles;
  } catch (error) {
    console.error("Error en la solicitud de la API:", error);
    return [];
  }
}
