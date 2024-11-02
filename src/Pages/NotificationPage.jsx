import { useState } from "react";
import NotificacionesList from "../components/ui/Componentes/NotificacionesList"; // Componente de lista de notificaciones
import Header from "../components/ui/Componentes/Header";
import Sidebar from "../components/ui/Componentes/Sidebar";

export default function NotificationsPage() {
  const [refreshNotifications, setRefreshNotifications] = useState(false); // Controla la actualización de la lista

  // Función para manejar la eliminación de una notificación y refrescar la lista
  const handleNotificationDeleted = () => {
    setRefreshNotifications(!refreshNotifications); // Refresca NotificacionesList
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#F5F5F5]">
        <Sidebar />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Contenedor de Notificaciones */}
        <div className="flex-auto h-full bg-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
          
          <div className="bg-white p-4 rounded-lg shadow-lg h-[calc(100vh-150px)] overflow-y-auto"> {/* Ajuste en altura y scroll */}
            <NotificacionesList 
              refreshNotifications={refreshNotifications} 
              onNotificationDeleted={handleNotificationDeleted} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
