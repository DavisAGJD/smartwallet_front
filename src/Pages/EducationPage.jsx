import ScrollArea from "../components/ui/Componentes/scroll-area";
import Header from "../components/ui/Componentes/Header";
import Sidebar from "../components/ui/Componentes/Sidebar";
import CardEducation from "../components/ui/Componentes/CardEducation";
import { fetchArticles } from "../services/newsAPI"; 
import { useEffect, useState } from "react";

export default function EducationPage() {
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
      <Sidebar className="h-full" />
      <main className="flex-1 flex flex-col h-full overflow-hidden p-6">
        <Header />
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
