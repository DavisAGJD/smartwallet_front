import { useEffect, useState } from "react";
import SidebarAdmin from "../components/ui/Componentes/SidebarAdmin";
import HeaderAdmin from "../components/ui/Componentes/HeaderAdmin";
import { Input } from "../components/ui/input";
import ScrollArea from "../components/ui/Componentes/scroll-area";
import CardReport from "../components/ui/Componentes/CardReport";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { obtenerReportes, eliminarReporte } from "../api/reportesApi";

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]); // Lista completa de reportes
  const [filteredReports, setFilteredReports] = useState([]); // Reportes filtrados por búsqueda y paginación
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Número de reportes por página

  // Función para cargar todos los reportes
  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await obtenerReportes();
      setReports(data);
      setFilteredReports(data);
    } catch (error) {
      console.error("Error al cargar reportes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Filtrar reportes por búsqueda
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = reports.filter((report) =>
      report.titulo.toLowerCase().includes(query)
    );
    setFilteredReports(filtered);
    setCurrentPage(1);
  }, [searchQuery, reports]);

  // Funciones para eliminar reporte
  const handleDeleteClick = (report) => {
    setSelectedReport(report);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (selectedReport) {
      try {
        await eliminarReporte(selectedReport.reporte_id);
        fetchReports(); // Recargar reportes después de eliminar
        setShowConfirm(false);
        setSelectedReport(null);
      } catch (error) {
        console.error("Error al eliminar reporte:", error);
      }
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedReport(null);
  };

  // Paginación: calcular reportes a mostrar en la página actual
  const totalPages = Math.ceil(filteredReports.length / pageSize);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Renderizar la paginación con flechas
  const renderPagination = () => {
    const visiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center mt-4 items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 mx-1 rounded-md ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  if (loading) {
    return <p>Cargando reportes...</p>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />
      <main className="flex-1 p-8">
        <HeaderAdmin />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reportes</h1>
        </div>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Buscar por título..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-4">
            {paginatedReports.map((report) => (
              <CardReport
                key={report.reporte_id}
                titulo={report.titulo}
                descripcion={report.descripcion}
                fecha_creacion={report.fecha_creacion}
                onDelete={() => handleDeleteClick(report)}
              />
            ))}
            {paginatedReports.length === 0 && (
              <p className="text-center">No se encontraron reportes.</p>
            )}
          </div>
        </ScrollArea>
        {renderPagination()}
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h2 className="text-lg font-semibold mb-4">
                ¿Seguro que deseas eliminar este reporte?
              </h2>
              <div className="flex justify-end space-x-2">
                <Button onClick={cancelDelete} variant="ghost">
                  Cancelar
                </Button>
                <Button onClick={confirmDelete} variant="danger">
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
