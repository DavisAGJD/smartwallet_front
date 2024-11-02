import { useEffect, useState } from "react";
import { obtenerInfoUsuarios } from "../api/usuariosApi";
import SidebarAdmin from "../components/ui/Componentes/SidebarAdmin";
import HeaderAdmin from "../components/ui/Componentes/HeaderAdmin";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { AdminCard } from "../components/ui/Componentes/AdminCard";

export default function AdminOverviewPage() {
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(null);
  const [usuariosRegistradosMes, setUsuariosRegistradosMes] = useState(null);
  const [graficaData, setGraficaData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { totalUsuarios, usuariosMes, graficaUsuarios } =
          await obtenerInfoUsuarios();

        setUsuariosRegistrados(totalUsuarios);
        setUsuariosRegistradosMes(usuariosMes);
        setGraficaData(graficaUsuarios);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />

      <main className="flex-1 p-8">
        <HeaderAdmin />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <AdminCard
            title="Usuarios Registrados"
            value={usuariosRegistrados ?? "N/A"}
            percentage={8.25}
            color="bg-blue-100"
            loading={loading}
          />
          <AdminCard
            title="Usuarios Registrados este Mes"
            value={usuariosRegistradosMes ?? "N/A"}
            percentage={15.03}
            color="bg-purple-100"
            loading={loading}
          />
        </div>

        {/* Gráfico de Usuarios */}
        <div className="mb-6">
          <AdminCard
            title="Usuarios"
            value={usuariosRegistrados ?? "N/A"}
            color="bg-white"
          >
            {loading ? (
              <p>Cargando gráfico...</p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={graficaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </AdminCard>
        </div>
      </main>
    </div>
  );
}
