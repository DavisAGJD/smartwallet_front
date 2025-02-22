"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Menu, Bell } from "lucide-react"
import ScrollArea from "../components/ui/Componentes/scroll-area"
import Sidebar from "../components/ui/Componentes/Sidebar"
import CardEducation from "../components/ui/Componentes/CardEducation"
import { fetchArticles } from "../services/newsAPI"

export default function EducationPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const getArticles = useCallback(async () => {
    try {
      const data = await fetchArticles("finance")
      setArticles(data)
    } catch (error) {
      console.error("Error fetching articles:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getArticles()
  }, [getArticles])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header Section */}
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="flex items-center h-16 px-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden mr-4 p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Dashboards</span>
              <span className="text-gray-400">/</span>
              <span className="text-sm font-medium">Educación</span>
            </div>

            <div className="ml-auto">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h1 className="text-2xl font-bold text-gray-800">Educación Financiera</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <ScrollArea className="h-[calc(100vh-12rem)] px-6 py-4">
              {loading ? (
                <p className="text-center text-gray-600">Cargando noticias...</p>
              ) : (
                <div className="space-y-6">
                  {articles.map((article, index) => (
                    <CardEducation
                      key={index}
                      title={article.title}
                      description={article.description || "Descripción no disponible"}
                      image={article.image_url || "/placeholder.svg"}
                      timeAgo={article.pubDate}
                      author={article.creator ? article.creator[0] : "Desconocido"}
                      url={article.link}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

