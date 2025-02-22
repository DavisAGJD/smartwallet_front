"use client"

import { useState, useEffect, useContext, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import ScrollArea from "../components/ui/Componentes/scroll-area"
import { PlusCircle, Menu, Bell, Search } from "lucide-react"
import Sidebar from "../components/ui/Componentes/Sidebar"
import CardReport from "../components/ui/Componentes/CardReport"
import AddReportModal from "../components/ui/Componentes/Modales/AddReportModal"
import { AuthContext } from "../context/AuthContext"
import { obtenerReportesPorUsuario, crearReporte, eliminarReporte } from "../api/reportesApi"

export default function ReportsPage() {
  const { token } = useContext(AuthContext)
  const [isAddReportModalOpen, setIsAddReportModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [reportes, setReportes] = useState([])
  const [filteredReportes, setFilteredReportes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [reporteAEliminar, setReporteAEliminar] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const parseJwt = useCallback((token) => {
    try {
      const base64Url = token.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      return JSON.parse(window.atob(base64))
    } catch {
      return null
    }
  }, [])

  const cargarReportes = useCallback(async () => {
    const usuario_id = parseJwt(token)?.id
    if (!usuario_id) return
    try {
      const usuarioReports = await obtenerReportesPorUsuario(token, usuario_id)
      setReportes(usuarioReports)
      setFilteredReportes(usuarioReports)
    } catch (error) {
      console.error("Error al cargar reportes:", error)
    }
  }, [token, parseJwt])

  useEffect(() => {
    cargarReportes()
  }, [cargarReportes])

  const handleAddReportClick = () => {
    setIsAddReportModalOpen(true)
  }

  const handleReportAdded = async (newReport) => {
    try {
      await crearReporte(newReport, token)
      cargarReportes()
      setIsAddReportModalOpen(false)
    } catch (error) {
      console.error("Error al agregar reporte:", error)
    }
  }

  const handleDelete = (reporteId) => {
    setReporteAEliminar(reporteId)
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteReport = async () => {
    try {
      await eliminarReporte(reporteAEliminar, token)
      cargarReportes()
      setIsDeleteModalOpen(false)
    } catch (error) {
      console.error("Error al eliminar el reporte:", error)
    }
  }

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase()
    setSearchTerm(searchValue)
    const filtered = reportes.filter((reporte) => reporte.titulo.toLowerCase().includes(searchValue))
    setFilteredReportes(filtered)
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
              <span className="text-sm font-medium">Reportes</span>
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
              <h1 className="text-2xl font-bold text-gray-800">Mis Reportes</h1>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
                onClick={handleAddReportClick}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Añadir Reporte
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Buscar reporte por título..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full p-2 pl-10 border rounded-lg"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-4">
                  {filteredReportes.map((reporte) => (
                    <CardReport
                      key={reporte.reporte_id}
                      titulo={reporte.titulo}
                      descripcion={reporte.descripcion}
                      fecha_creacion={reporte.fecha_creacion}
                      onDelete={() => handleDelete(reporte.reporte_id)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        </main>
      </div>

      {isAddReportModalOpen && (
        <AddReportModal
          isOpen={isAddReportModalOpen}
          onClose={() => setIsAddReportModalOpen(false)}
          onReportAdded={handleReportAdded}
        />
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-lg w-96 p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Confirmar Eliminación</h2>
            <p className="mb-4">¿Estás seguro de que deseas eliminar este reporte?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteReport}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

