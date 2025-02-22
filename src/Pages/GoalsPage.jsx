"use client"

import { useState, useEffect, useContext, useCallback } from "react"
import { Plus, Menu, Bell } from "lucide-react"
import { motion } from "framer-motion"
import Sidebar from "../components/ui/Componentes/Sidebar"
import AddGoalModal from "../components/ui/Componentes/Modales/AddGoalModal"
import MetasList from "../components/ui/Componentes/MetasList"
import { obtenerMetasPorUsuario, eliminarMeta } from "../api/metasApi"
import { obtenerCategoriasMeta } from "../api/categoriasApi"
import { AuthContext } from "../context/AuthContext"
import SuccessModal from "../components/ui/Componentes/Modales/SuccessModal"

export default function GoalsPage() {
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false)
  const [metas, setMetas] = useState([])
  const [categorias, setCategorias] = useState(null)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [points, setPoints] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { token } = useContext(AuthContext)

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      return JSON.parse(window.atob(base64)).id
    } catch {
      return null
    }
  }

  const usuarioId = parseJwt(token)

  const handleAddGoalClick = () => {
    setIsAddGoalModalOpen(true)
  }

  const handleGoalAdded = (newPoints) => {
    setIsAddGoalModalOpen(false)
    setPoints(newPoints || 0)
    setIsSuccessModalOpen(true)
    cargarMetas()
  }

  const cargarCategorias = useCallback(async () => {
    try {
      const categoriasData = await obtenerCategoriasMeta()
      const categoriasMap = categoriasData.reduce((acc, categoria) => {
        acc[categoria.categoria_meta_id] = categoria.nombre_categoria
        return acc
      }, {})
      setCategorias(categoriasMap)
    } catch (error) {
      console.error("Error al cargar las categorías:", error)
    }
  }, [])

  const cargarMetas = useCallback(async () => {
    if (!usuarioId || !token || !categorias) {
      return
    }
    try {
      const metasUsuario = await obtenerMetasPorUsuario(usuarioId, token)
      if (metasUsuario && Array.isArray(metasUsuario)) {
        const metasConvertidas = metasUsuario.map((meta) => ({
          ...meta,
          monto_objetivo: Number(meta.monto_objetivo),
          monto_actual: Number(meta.monto_actual) || 0,
          nombre_categoria: categorias[meta.categoria_meta_id] || "Sin categoría",
        }))
        setMetas(metasConvertidas)
      } else {
        console.warn("No se obtuvieron metas o el formato de respuesta no es correcto")
        setMetas([])
      }
    } catch (error) {
      console.error("Error al cargar las metas:", error)
      setMetas([])
    }
  }, [usuarioId, token, categorias])

  useEffect(() => {
    cargarCategorias()
  }, [cargarCategorias])

  useEffect(() => {
    if (categorias) {
      cargarMetas()
    }
  }, [categorias, cargarMetas])

  const handleDeleteMeta = async (idMeta) => {
    try {
      await eliminarMeta(idMeta, token)
      cargarMetas()
    } catch (error) {
      console.error("Error al eliminar la meta:", error)
    }
  }

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
              <span className="text-sm font-medium">Metas</span>
            </div>

            <div className="ml-auto">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800">Metas</h1>
              <button
                onClick={handleAddGoalClick}
                className="flex items-center justify-center px-4 py-2 text-white rounded-full bg-gradient-to-r from-[#21AA58] via-[#21AA58] to-[#247D61] hover:from-[#247D61] hover:to-[#21AA58] transition-colors duration-300 w-full sm:w-auto"
              >
                <Plus size={20} className="mr-2" />
                <span className="font-semibold">Agregar meta</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm"
          >
            <div className="p-6">
              <MetasList metas={metas} onMetasUpdated={cargarMetas} onDelete={handleDeleteMeta} />
            </div>
          </motion.div>
        </main>
      </div>

      {isAddGoalModalOpen && (
        <AddGoalModal
          isOpen={isAddGoalModalOpen}
          onClose={() => setIsAddGoalModalOpen(false)}
          onGoalAdded={handleGoalAdded}
          setPoints={setPoints}
        />
      )}

      <SuccessModal isOpen={isSuccessModalOpen} points={points || 0} onClose={() => setIsSuccessModalOpen(false)} />
    </div>
  )
}

