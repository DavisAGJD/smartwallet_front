import { useState, useEffect } from 'react';
import Header from "../components/ui/Componentes/Header";
import Sidebar from "../components/ui/Componentes/Sidebar";
import RewardCard from "../components/ui/Componentes/RewardCard";
import axios from 'axios';

// Función para decodificar el JWT y obtener el 'id' del usuario
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64)).id; // Devuelve el 'id' del token
  } catch {
    return null; // Retorna null si hay algún error en la decodificación
  }
};

export default function RewardsPage() {
  const [usuarioId, setUsuarioId] = useState(null); // Estado para el usuarioId
  const [token] = useState(localStorage.getItem('token')); // Obtener el token desde localStorage
  const [puntosUsuario, setPuntosUsuario] = useState(0); // Estado para los puntos del usuario

  useEffect(() => {
    if (token) {
      // Decodificar el token para obtener el usuarioId
      const decodedUsuarioId = parseJwt(token);
      if (decodedUsuarioId) {
        setUsuarioId(decodedUsuarioId); // Asignar el usuarioId si se decodifica correctamente
      } else {
        console.error("No se pudo decodificar el token correctamente.");
      }
    }
  }, [token]); // Solo se ejecuta cuando el token cambia

  useEffect(() => {
    if (usuarioId) {
      // Obtener los puntos del usuario desde el backend
      const fetchPuntos = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/usuarios/puntos/${usuarioId}`, // Reemplaza la URL por la que usas para tu API
            {
              headers: { Authorization: `Bearer ${token}` } // Incluir el token en la cabecera de la solicitud
            }
          );
          setPuntosUsuario(response.data.puntos); // Guardar los puntos obtenidos en el estado
        } catch (error) {
          console.error("Error al obtener los puntos del usuario:", error);
        }
      };

      fetchPuntos(); // Llamar a la función para obtener los puntos
    }
  }, [usuarioId, token]); // Solo se ejecuta cuando el usuarioId cambia

  const handleRecompensaCanjeada = () => {
    setPuntosUsuario(puntosUsuario - 100); // Reducir los puntos al canjear la recompensa (supone que cada recompensa cuesta 100 puntos)
  };

  if (usuarioId === null) {
    return <div>Cargando...</div>; // Mostrar algo mientras se obtiene el usuarioId
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-[#F5F5F5]">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Página de Recompensas</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <RewardCard 
              usuarioId={usuarioId}
              token={token}
              puntosUsuario={puntosUsuario}
              onRecompensaCanjeada={handleRecompensaCanjeada}
            />
            {/* Aquí puedes agregar más tarjetas si tienes más recompensas */}
          </div>
        </div>
      </div>
    </div>
  );
}
