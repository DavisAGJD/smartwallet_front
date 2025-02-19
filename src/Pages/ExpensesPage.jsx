import { useState } from "react";
import { Plus } from "lucide-react";
import GastosList from "../components/ui/Componentes/GastosList";
import Header from "../components/ui/Componentes/Header";
import Sidebar from "../components/ui/Componentes/Sidebar";
import AddExpenseModal from "../components/ui/Componentes/Modales/AddExpenseModal";
import SuccessModal from "../components/ui/Componentes/Modales/SuccessModal"; // Importa el nuevo SuccessModal

export default function ExpensesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshExpenses, setRefreshExpenses] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [points, setPoints] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleExpenseAdded = (puntosObtenidos) => {
    setIsModalOpen(false); // Cerrar el modal de agregar gasto
    setPoints(puntosObtenidos); // Establecer los puntos obtenidos
    setIsSuccessModalOpen(true); // Abrir el modal de éxito
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false); // Cerrar el modal de éxito
    setRefreshExpenses(!refreshExpenses); // Refrescar la lista de gastos
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-[#F5F5F5] h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex-auto bg-gray-100 p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Últimos gastos registrados</h2>
            <button
              onClick={openModal}
              className="flex items-center justify-center px-4 py-2 text-white rounded-full bg-gradient-to-r from-[#21AA58] via-[#21AA58] to-[#247D61] hover:from-[#247D61] hover:to-[#21AA58] transition-colors duration-300"
            >
              <Plus size={20} className="mr-2" />
              <span className="font-semibold">Agregar Gasto</span>
            </button>
          </div>

          <GastosList refreshExpenses={refreshExpenses} />
        </div>
      </div>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onExpenseAdded={handleExpenseAdded}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
        points={points}
      />
    </div>
  );
}
