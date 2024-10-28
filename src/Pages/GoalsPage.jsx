import { useState, useEffect, useContext } from "react";
import Header from "../components/ui/Componentes/Header";
import Sidebar from "../components/ui/Componentes/Sidebar";
import { Plus } from "lucide-react";
import AddGoalModal from "../components/ui/Componentes/Modales/AddGoalModal";
import MetasList from "../components/ui/Componentes/MetasList";
import { obtenerMetasPorUsuario, eliminarMeta } from "../api/metasApi";
import { AuthContext } from "../context/AuthContext";

export default function GoalsPage() {
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
  const [metas, setMetas] = useState([]); // Estado para almacenar metas
  const { token } = useContext(AuthContext);

  // Función para decodificar el token y obtener el usuarioId
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64)).id;
    } catch {
      return null;
    }
  };

  const usuarioId = parseJwt(token);

  // Función para abrir el modal de agregar meta
  const handleAddGoalClick = () => {
    setIsAddGoalModalOpen(true);
  };

  // Función para cerrar el modal y refrescar las metas cuando se agrega una nueva
  const handleGoalAdded = () => {
    setIsAddGoalModalOpen(false);
    cargarMetas();
  };

  // Función para cargar las metas desde el backend
  const cargarMetas = async () => {
    if (!usuarioId || !token) {
      console.warn("Token o usuarioId no disponible");
      return;
    }
    try {
      const metasUsuario = await obtenerMetasPorUsuario(usuarioId, token);
      if (metasUsuario && Array.isArray(metasUsuario)) {
        // Convertimos `monto_actual` a número para cada meta
        const metasConvertidas = metasUsuario.map((meta) => ({
          ...meta,
          monto_objetivo: Number(meta.monto_objetivo),
          monto_actual: Number(meta.monto_actual) || 0, // Convertir a número, o 0 si es null/undefined
        }));
        setMetas(metasConvertidas);
      } else {
        console.warn(
          "No se obtuvieron metas o el formato de respuesta no es correcto"
        );
        setMetas([]); // Establece el estado en un array vacío si la respuesta es `null`
      }
    } catch (error) {
      console.error("Error al cargar las metas:", error);
      setMetas([]); // En caso de error, asegúrate de que `metas` esté definido como un array vacío
    }
  };

  // useEffect para cargar las metas al montar el componente
  useEffect(() => {
    cargarMetas();
  }, [usuarioId, token]);

  // Función para manejar la eliminación de una meta
  const handleDeleteMeta = async (idMeta) => {
    try {
      await eliminarMeta(idMeta, token);
      cargarMetas(); // Recargar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar la meta:", error);
    }
  };

  // Función para manejar la edición de una meta
  const handleEditMeta = (meta) => {
    console.log("Editar meta:", meta);
  };

  // Función para manejar la adición de monto a una meta
  const handleAddAmount = (idMeta) => {
    console.log("Añadir monto a la meta:", idMeta);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-[#F5F5F5] shadow-lg">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <div>
          <Header />
        </div>

        <div className="p-4 bg-gray-100 flex-1">
          <button
            onClick={handleAddGoalClick}
            className="flex items-center justify-center px-4 py-2 text-white rounded-full bg-gradient-to-r from-[#21AA58] via-[#21AA58] to-[#247D61] hover:from-[#247D61] hover:to-[#21AA58] transition-colors duration-300"
          >
            <Plus size={20} className="mr-2" />
            <span className="font-semibold">Agregar meta</span>
          </button>

          <div className="flex-1 p-6 overflow-y-auto">
            <Header />
            <div className="flex-auto mt-3 bg-gray-100 p-6">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                {/* Renderizamos el componente de lista de metas */}
                <MetasList
                  metas={metas}
                  onMetasUpdated={cargarMetas}
                  onAddAmount={handleAddAmount}
                  onEdit={handleEditMeta}
                  onDelete={handleDeleteMeta}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isAddGoalModalOpen && (
        <AddGoalModal
          isOpen={isAddGoalModalOpen}
          onClose={() => setIsAddGoalModalOpen(false)}
          onGoalAdded={handleGoalAdded}
        />
      )}
    </div>
  );
}
