import { useEffect, useState } from "react";
import { obtenerReportes, eliminarReporte } from "../api/reportesApi"; // Asegúrate de tener `eliminarReporte` en `reportesApi`
import { Input } from "../components/ui/input";
import ScrollArea from "../components/ui/Componentes/scroll-area";
import Header from "../components/ui/Componentes/Header";
import SidebarAdmin from "../components/ui/Componentes/SidebarAdmin";
import CardReport from "../components/ui/Componentes/CardReport";
import { Button } from "../components/ui/button";

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);

  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  // Obtener los reportes desde el backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await obtenerReportes();
        setReports(data);
        setFilteredReports(data);
      } catch (error) {
        console.error("Error al cargar los reportes:", error);
      }
    };

    fetchReports();
  }, []);

  // Función de búsqueda
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = reports.filter((report) =>
        report.titulo.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredReports(filtered);
    } else {
      setFilteredReports(reports);
    }
    setCurrentPage(1); // Reiniciar la página cuando se realiza una búsqueda
  };

  // Función para abrir el modal de confirmación de eliminación
  const openConfirmModal = (id) => {
    setReportToDelete(id);
    setIsConfirmModalOpen(true);
  };

  // Función para cerrar el modal de confirmación de eliminación
  const closeConfirmModal = () => {
    setReportToDelete(null);
    setIsConfirmModalOpen(false);
  };

  // Función para manejar la eliminación de un reporte
  const handleDelete = async () => {
    try {
      if (reportToDelete) {
        await eliminarReporte(reportToDelete); // Asegúrate de que `eliminarReporte` esté implementado en `reportesApi`
        setReports((prevReports) =>
          prevReports.filter((report) => report.reporte_id !== reportToDelete)
        );
        setFilteredReports((prevReports) =>
          prevReports.filter((report) => report.reporte_id !== reportToDelete)
        );
        closeConfirmModal();
      }
    } catch (error) {
      console.error("Error al eliminar el reporte:", error);
    }
  };

  // Configuración de paginación
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />
      <main className="flex-1 p-6">
        <Header />

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex flex-col space-y-4 mb-4">
            <h1 className="text-xl font-semibold">Reportes</h1>

            {/* Barra de búsqueda */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar reporte por título..."
                className="w-full px-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-4">
              {currentReports.map((report) => (
                <CardReport
                  key={report.reporte_id} // Usa un ID único
                  titulo={report.titulo}
                  descripcion={report.descripcion}
                  fecha_creacion={report.fecha_creacion}
                  onDelete={() => openConfirmModal(report.reporte_id)} // Abre el modal de confirmación
                />
              ))}
              {currentReports.length === 0 && (
                <p>No se encontraron reportes</p>
              )}
            </div>
          </ScrollArea>

          {/* Paginación */}
          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Modal de confirmación */}
        {isConfirmModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">
                ¿Estás seguro de eliminar este reporte?
              </h2>
              <p className="text-gray-600 mb-4">
                Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end space-x-2">
                <Button onClick={closeConfirmModal} className="bg-gray-300 hover:bg-gray-400">
                  Cancelar
                </Button>
                <Button onClick={handleDelete} className="bg-red-500 text-white hover:bg-red-600">
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
