import { useState } from "react";
import { Plus } from "lucide-react";
import RecordatoriosList from "../components/ui/Componentes/RemindersList"; // Importa el componente de lista de recordatorios
import Header from "../components/ui/Componentes/Header";
import Sidebar from "../components/ui/Componentes/Sidebar";
import AddReminderModal from "../components/ui/Componentes/Modales/AddReminderModal"; // Importa el modal para agregar recordatorios

export default function RemindersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshReminders, setRefreshReminders] = useState(false); // Para controlar la actualización de la lista

  // Función para abrir el modal
  const openModal = () => setIsModalOpen(true);

  // Función para cerrar el modal
  const closeModal = () => setIsModalOpen(false);

  // Función para manejar el agregado de un nuevo recordatorio
  const handleReminderAdded = () => {
    setIsModalOpen(false);
    setRefreshReminders(!refreshReminders); // Cambia el estado para recargar RecordatoriosList
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-[#F5F5F5]">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex-auto min-h-screen bg-gray-100 p-6">
          <div className="mb-4">
            <button
              onClick={openModal}
              className="flex items-center justify-center px-4 py-2 text-white rounded-full bg-gradient-to-r from-[#21AA58] via-[#21AA58] to-[#247D61] hover:from-[#247D61] hover:to-[#21AA58] transition-colors duration-300"
            >
              <Plus size={20} className="mr-2" />
              <span className="font-semibold">Agregar Recordatorio</span>
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <RecordatoriosList refreshReminders={refreshReminders} />
          </div>
        </div>
      </div>

      <AddReminderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onReminderAdded={handleReminderAdded}
      />
    </div>
  );
}
