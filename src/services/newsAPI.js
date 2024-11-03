export async function fetchArticles(keyword = "finance") {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/articles?keyword=${keyword}`);
    if (!response.ok) throw new Error("Error fetching articles");

    const data = await response.json();
    console.log("Datos de la API:", data); // Para inspeccionar los datos
    return data;
  } catch (error) {
    console.error("Error en la solicitud de la API:", error);
    return [];
  }
}