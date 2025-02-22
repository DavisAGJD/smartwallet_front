"use client"

import { useState } from "react"
import { Plus, Menu, Bell } from "lucide-react"
import { motion } from "framer-motion"
import GastosList from "../components/ui/Componentes/GastosList"
import Sidebar from "../components/ui/Componentes/Sidebar"
import AddExpenseModal from "../components/ui/Componentes/Modales/AddExpenseModal"
import SuccessModal from "../components/ui/Componentes/Modales/SuccessModal"

export default function ExpensesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refreshExpenses, setRefreshExpenses] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [points, setPoints] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleExpenseAdded = (puntosObtenidos) => {
    setIsModalOpen(false)
    setPoints(puntosObtenidos)
    setIsSuccessModalOpen(true)
  }

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false)
    setRefreshExpenses(!refreshExpenses)
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
              <span className="text-sm font-medium">Gastos</span>
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
              <h1 className="text-2xl font-bold text-gray-800">Últimos gastos registrados</h1>
              <button
                onClick={openModal}
                className="flex items-center justify-center px-4 py-2 text-white rounded-full bg-gradient-to-r from-[#21AA58] via-[#21AA58] to-[#247D61] hover:from-[#247D61] hover:to-[#21AA58] transition-colors duration-300 w-full sm:w-auto"
              >
                <Plus size={20} className="mr-2" />
                <span className="font-semibold">Agregar Gasto</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm"
          >
            <GastosList refreshExpenses={refreshExpenses} />
          </motion.div>
        </main>
      </div>

      {/* Modals */}
      <AddExpenseModal isOpen={isModalOpen} onClose={closeModal} onExpenseAdded={handleExpenseAdded} />

      <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} points={points} />
    </div>
  )
}

