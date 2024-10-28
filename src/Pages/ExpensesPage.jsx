import { useState } from "react";
import { Plus } from "lucide-react";
import GastosList from "../components/ui/Componentes/GastosList";
import Header from "../components/ui/Componentes/Header";
import Sidebar from "../components/ui/Componentes/Sidebar";
import AddExpenseModal from "../components/ui/Componentes/Modales/AddExpenseModal"; // Importa el modal

export default function ExpensesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshExpenses, setRefreshExpenses] = useState(false); // Para controlar la actualización de la lista

  // Función para abrir el modal
  const openModal = () => setIsModalOpen(true);

  // Función para cerrar el modal
  const closeModal = () => setIsModalOpen(false);

  // Función para manejar el agregado de un nuevo gasto
  const handleExpenseAdded = () => {
    setIsModalOpen(false);
    setRefreshExpenses(!refreshExpenses); // Cambia el estado para recargar GastosList
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
              <span className="font-semibold">Agregar Gasto</span>
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <GastosList refreshExpenses={refreshExpenses} />
          </div>
        </div>
      </div>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onExpenseAdded={handleExpenseAdded}
      />
    </div>
  );
}
