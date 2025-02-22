"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Menu, Bell } from "lucide-react"
import RecordatoriosList from "../components/ui/Componentes/RemindersList"
import Sidebar from "../components/ui/Componentes/Sidebar"
import AddReminderModal from "../components/ui/Componentes/Modales/AddReminderModal"

export default function RemindersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refreshReminders, setRefreshReminders] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleReminderAdded = () => {
    setIsModalOpen(false)
    setRefreshReminders(!refreshReminders)
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
              <span className="text-sm font-medium">Recordatorios</span>
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
              <h1 className="text-2xl font-bold text-gray-800">Recordatorios</h1>
              <button
                onClick={openModal}
                className="flex items-center justify-center px-4 py-2 text-white rounded-full bg-gradient-to-r from-[#21AA58] via-[#21AA58] to-[#247D61] hover:from-[#247D61] hover:to-[#21AA58] transition-colors duration-300 w-full sm:w-auto"
              >
                <Plus size={20} className="mr-2" />
                <span className="font-semibold">Agregar Recordatorio</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <RecordatoriosList refreshReminders={refreshReminders} />
            </div>
          </motion.div>
        </main>
      </div>

      <AddReminderModal isOpen={isModalOpen} onClose={closeModal} onReminderAdded={handleReminderAdded} />
    </div>
  )
}

