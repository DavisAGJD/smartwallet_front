import { useEffect, useState } from "react";
import ScrollArea from "../components/ui/Componentes/scroll-area";
import HeaderAdmin from "../components/ui/Componentes/HeaderAdmin";
import SidebarAdmin from "../components/ui/Componentes/SidebarAdmin";
import CardEducation from "../components/ui/Componentes/CardEducation";
import { fetchArticles } from "../services/newsAPI";

export default function EducationAdminPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles("finance");
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <SidebarAdmin className="h-full" />
      <main className="flex-1 flex flex-col h-full overflow-hidden p-6">
        <HeaderAdmin />
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-green-700">Educación</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ScrollArea className="space-y-6">
            {loading ? (
              <p className="text-center text-gray-600">Cargando noticias...</p>
            ) : (
              articles.map((article, index) => (
                <CardEducation
                  key={index}
                  title={article.title}
                  description={article.description || "Descripción no disponible"}
                  image={article.image_url || "url_placeholder.png"} // Imagen de reserva si no está disponible
                  timeAgo={article.pubDate}
                  author={article.creator ? article.creator[0] : "Desconocido"}
                  url={article.link}
                />
              ))
            )}
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}
