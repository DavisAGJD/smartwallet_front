import { useLocation } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

export default function Header() {
  const location = useLocation();

  // Mapeo de rutas a nombres que quieres mostrar en el header
  const breadcrumbNames = {
    "/": "Inicio",
    "/login": "Iniciar Sesión",
    "/register": "Registro",
    "/how-it-works": "Cómo Funciona",
    "/prices": "Precios",
    "/about-us": "Acerca de",
    "/admin-overview": "Panel de Admin",
    "/user-management": "Gestión de Usuarios",
    "/admin-reports": "Reportes Admin",
    "/admin-education": "Educación Admin",
    "/expense-categories": "Categorias de gastos",
    "/goals-management": "Categorias de metas",
    "/analysis": "Análisis",
    "/notifications": "Notificaciones" // Ruta para la página de notificaciones
  };

  // Obtiene el nombre según la ruta actual o usa una ruta por defecto
  const currentBreadcrumb = breadcrumbNames[location.pathname] || "Inicio";

  return (
    <header className="flex items-center justify-between bg-[#F5F5F5] p-4 border-b">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-3 text-gray-500">
        <LayoutDashboard size={20} className="text-black" />
        <span>Dashboards</span>
        <span>/</span>
        <span className="text-black font-semibold">{currentBreadcrumb}</span>
      </div>
    </header>
  );
}
