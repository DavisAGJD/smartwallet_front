import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Bell } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { obtenerNotificacionesPorUsuario } from "../../../api/notificacionesApi"; // Importa tu función para obtener notificaciones
import { AuthContext } from "../../../context/AuthContext"; // Importa el contexto de autenticación para obtener el token

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext); // Obtener el token de contexto
  const [notificationCount, setNotificationCount] = useState(0);

  // Mapeo de rutas a nombres que quieres mostrar en el header
  const breadcrumbNames = {
    "/": "Inicio",
    "/login": "Iniciar Sesión",
    "/register": "Registro",
    "/how-it-works": "Cómo Funciona",
    "/prices": "Precios",
    "/about-us": "Acerca de",
    "/goals": "Metas",
    "/expenses": "Gastos",
    "/reports": "Reportes",
    "/education": "Educación",
    "/user-overview": "Visión General de Usuario",
    "/user-configuration": "Configuración de Usuario",
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

  // Función para navegar a la página de notificaciones
  const goToNotifications = () => {
    navigate("/notifications");
  };

  // Función para decodificar el token y extraer el usuarioId
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64));
    } catch {
      return null;
    }
  };

  const usuarioId = parseJwt(token)?.id;

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        if (usuarioId && token) {
          const notifications = await obtenerNotificacionesPorUsuario(usuarioId, token);
          const unreadCount = notifications.filter(notif => !notif.leida).length;
          setNotificationCount(unreadCount);
        }
      } catch (error) {
        console.error("Error al obtener el conteo de notificaciones:", error);
      }
    };

    fetchNotificationCount();
  }, [usuarioId, token]);

  return (
    <header className="flex items-center justify-between bg-[#F5F5F5] p-4 border-b">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-3 text-gray-500">
        <LayoutDashboard size={20} className="text-black" />
        <span>Dashboards</span>
        <span>/</span>
        <span className="text-black font-semibold">{currentBreadcrumb}</span>
      </div>

      {/* Icono de campana para notificaciones con conteo */}
      <div className="relative flex items-center">
        <button
          onClick={goToNotifications}
          className="p-2 rounded-full hover:bg-gray-200 transition relative"
          aria-label="Ir a Notificaciones"
        >
          <Bell size={24} className="text-gray-700" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5">
              {notificationCount > 10 ? "10+" : notificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
