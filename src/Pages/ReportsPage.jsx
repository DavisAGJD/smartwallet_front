import { useState, useEffect, useContext } from "react";
import { Button } from "../components/ui/button";
import ScrollArea from "../components/ui/Componentes/scroll-area";
import { PlusCircle } from "lucide-react";
import Header from "../components/ui/Componentes/Header";
import Sidebar from "../components/ui/Componentes/Sidebar";
import CardReport from "../components/ui/Componentes/CardReport";
import AddReportModal from "../components/ui/Componentes/Modales/AddReportModal";
import { AuthContext } from "../context/AuthContext";
import { obtenerReportesPorUsuario, crearReporte, eliminarReporte } from "../api/reportesApi";

export default function ReportsPage() {
  const { token } = useContext(AuthContext);
  const [isAddReportModalOpen, setIsAddReportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reportes, setReportes] = useState([]);
  const [filteredReportes, setFilteredReportes] = useState([]); // Para almacenar los reportes filtrados
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [reporteAEliminar, setReporteAEliminar] = useState(null);

  // Obtener usuario_id del token
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64));
    } catch {
      return null;
    }
  };

  const cargarReportes = async () => {
    const usuario_id = parseJwt(token)?.id;
    if (!usuario_id) return;
    try {
      const usuarioReports = await obtenerReportesPorUsuario(token, usuario_id);
      setReportes(usuarioReports);
      setFilteredReportes(usuarioReports); // Inicializa los reportes filtrados
    } catch (error) {
      console.error("Error al cargar reportes:", error);
    }
  };

  useEffect(() => {
    cargarReportes();
  }, []);

  const handleAddReportClick = () => {
    setIsAddReportModalOpen(true);
  };

  const handleReportAdded = async (newReport) => {
    try {
      await crearReporte(newReport, token);
      cargarReportes();
      setIsAddReportModalOpen(false);
    } catch (error) {
      console.error("Error al agregar reporte:", error);
    }
  };

  const handleDelete = (reporteId) => {
    setReporteAEliminar(reporteId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteReport = async () => {
    try {
      await eliminarReporte(reporteAEliminar, token);
      cargarReportes();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar el reporte:", error);
    }
  };

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = reportes.filter((reporte) =>
      reporte.titulo.toLowerCase().includes(searchValue)
    );
    setFilteredReportes(filtered);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex flex-row items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">Mis reportes</h1>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={handleAddReportClick}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Añadir Reporte
            </Button>
          </div>

          {/* Campo de búsqueda */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar reporte por título..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
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
      </main>

      {isAddReportModalOpen && (
        <AddReportModal
          isOpen={isAddReportModalOpen}
          onClose={() => setIsAddReportModalOpen(false)}
          onReportAdded={handleReportAdded}
        />
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
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
          </div>
        </div>
      )}
    </div>
  );
}
