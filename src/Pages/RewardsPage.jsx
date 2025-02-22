"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Menu, Bell } from "lucide-react"
import Sidebar from "../components/ui/Componentes/Sidebar"
import RewardCard from "../components/ui/Componentes/RewardCard"
import axios from "axios"

const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    return JSON.parse(window.atob(base64)).id
  } catch {
    return null
  }
}

export default function RewardsPage() {
  const [usuarioId, setUsuarioId] = useState(null)
  const [token] = useState(localStorage.getItem("token"))
  const [puntosUsuario, setPuntosUsuario] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchPuntos = useCallback(async () => {
    if (!usuarioId) return
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/usuarios/puntos/${usuarioId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setPuntosUsuario(response.data.puntos)
    } catch (error) {
      console.error("Error al obtener los puntos del usuario:", error)
    } finally {
      setIsLoading(false)
    }
  }, [usuarioId, token])

  useEffect(() => {
    if (token) {
      const decodedUsuarioId = parseJwt(token)
      if (decodedUsuarioId) {
        setUsuarioId(decodedUsuarioId)
      } else {
        console.error("No se pudo decodificar el token correctamente.")
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (usuarioId) {
      fetchPuntos()
    }
  }, [usuarioId, fetchPuntos])

  const handleRecompensaCanjeada = () => {
    setPuntosUsuario(puntosUsuario - 100)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
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
              <span className="text-sm font-medium">Recompensas</span>
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
            <h1 className="text-2xl font-bold text-gray-800">Recompensas</h1>
            <p className="text-gray-600 mt-2">Puntos disponibles: {puntosUsuario}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <RewardCard
              usuarioId={usuarioId}
              token={token}
              puntosUsuario={puntosUsuario}
              onRecompensaCanjeada={handleRecompensaCanjeada}
            />
            {/* Aquí puedes agregar más tarjetas si tienes más recompensas */}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

