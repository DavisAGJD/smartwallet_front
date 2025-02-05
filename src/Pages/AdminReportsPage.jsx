import { useEffect, useState } from "react";
import { obtenerReportes, eliminarReporte } from "../api/reportesApi";
import { Input } from "../components/ui/input";
import ScrollArea from "../components/ui/Componentes/scroll-area";
import HeaderAdmin from "../components/ui/Componentes/HeaderAdmin";
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
    setCurrentPage(1);
  };

  const openConfirmModal = (id) => {
    setReportToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setReportToDelete(null);
    setIsConfirmModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      if (reportToDelete) {
        await eliminarReporte(reportToDelete);
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

  // Cálculo para la paginación
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  // Lógica para mostrar solo 5 botones de página
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = startPage + maxPageButtons - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  // Arreglo de números de página a mostrar
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />
      <main className="flex-1 p-6">
        <HeaderAdmin />

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex flex-col space-y-4 mb-4">
            <h1 className="text-xl font-semibold">Reportes</h1>
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
                  key={report.reporte_id}
                  titulo={report.titulo}
                  descripcion={report.descripcion}
                  fecha_creacion={report.fecha_creacion}
                  onDelete={() => openConfirmModal(report.reporte_id)}
                />
              ))}
              {currentReports.length === 0 && <p>No se encontraron reportes</p>}
            </div>
          </ScrollArea>

          {/* Sección de paginación con diseño similar al de tu otro código */}
          <div className="flex items-center justify-center mt-6 space-x-2">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Anterior
            </Button>

            {startPage > 1 && (
              <span className="px-3 py-2 text-gray-600">...</span>
            )}

            {pageNumbers.map((number) => (
              <Button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === number
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {number}
              </Button>
            ))}

            {endPage < totalPages && (
              <span className="px-3 py-2 text-gray-600">...</span>
            )}

            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Siguiente
            </Button>
          </div>
        </div>

        {/* Modal de confirmación para eliminar */}
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
                <Button
                  onClick={closeConfirmModal}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
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
