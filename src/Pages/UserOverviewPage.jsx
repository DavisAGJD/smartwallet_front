import { useState, useEffect, useContext } from "react";
import Sidebar from "../components/ui/Componentes/Sidebar";
import Header from "../components/ui/Componentes/Header";
import {
  BarChart,
  Bar,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { AuthContext } from "../context/AuthContext";
import { obtenerIngresoUsuario, actualizarIngreso } from "../api/usuariosApi";
import { obtenerGastosPorUsuario } from "../api/gastosApi";
import { getIconForCategory } from "../utils/iconsUtils";

export default function UserOverviewPage() {
  const { token } = useContext(AuthContext);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [income, setIncome] = useState("");
  const [expenseData, setExpenseData] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64));
    } catch {
      return null;
    }
  };

  const usuario_id = parseJwt(token)?.id;

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const userIncome = await obtenerIngresoUsuario(token, usuario_id);
        // Mostrar el modal si no hay ingreso configurado

        if (
          userIncome === null ||
          userIncome === undefined ||
          userIncome <= 0
        ) {
          setIsIncomeModalOpen(true);
        } else {
          setIncome(userIncome);
          setIsIncomeModalOpen(false);
        }
      } catch (error) {
        console.error("Error al obtener ingreso:", error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const expenses = await obtenerGastosPorUsuario(usuario_id, token);
        const sortedExpenses = expenses.sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha)
        );
        const groupedExpenses = sortedExpenses.reduce((acc, expense) => {
          const categoriaId = expense.categoria_gasto_id;
          const monto = parseFloat(expense.monto);
          if (!acc[categoriaId]) {
            acc[categoriaId] = {
              nombre: expense.nombre_categoria,
              monto: 0,
            };
          }
          acc[categoriaId].monto += monto;
          return acc;
        }, {});

        const categoriesData = Object.values(groupedExpenses)
          .sort((a, b) => b.monto - a.monto)
          .slice(0, 4)
          .map((item) => ({
            name: item.nombre,
            amount: item.monto,
          }));

        const pieData = categoriesData.map((category) => ({
          name: category.name,
          value: category.amount,
        }));

        setExpenseCategories(categoriesData);
        setExpenseData(pieData);

        // Mostrar solo los 3 últimos gastos en la tabla de transacciones recientes
        setRecentExpenses(sortedExpenses.slice(0, 3));
      } catch (error) {
        console.error("Error al obtener gastos del usuario:", error);
      }
    };

    if (usuario_id) {
      fetchIncome();
      fetchExpenses();
    }
  }, [token, usuario_id]);

  const handleSaveIncome = async () => {
    if (income === "") {
      console.error("El ingreso no puede estar vacío.");
      return;
    }
    try {
      await actualizarIngreso(token, usuario_id, parseFloat(income));
      setIsIncomeModalOpen(false);
    } catch (error) {
      console.error("Error al guardar ingreso:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Resumen de Usuario</h1>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Gastos por Categoría</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenseCategories}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value}`, "monto"]}
                  labelFormatter={(label) => `Categoría: ${label}`}
                />
                <Legend
                  payload={expenseCategories.map((item, index) => ({
                    id: index,
                    type: "square",
                    value: item.name,
                    color: ["#8b5cf6", "#3b82f6", "#22c55e", "#ef4444"][
                      index % 4
                    ],
                  }))}
                />
                <Bar dataKey="amount" name="monto" fill="#8884d8">
                  {expenseCategories.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#8b5cf6", "#3b82f6", "#22c55e", "#ef4444"][index % 4]
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              Distribución de Gastos
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {expenseData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#8b5cf6", "#3b82f6", "#22c55e", "#ef4444"][index % 4]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabla de Transacciones Recientes */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Gastos Recientes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Cantidad
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentExpenses.map((gasto, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="flex items-center px-4 py-0 space-x-2 text-gray-700 text-sm">
                      <span>{getIconForCategory(gasto.nombre_categoria)}</span>
                      <span>{gasto.nombre_categoria}</span>
                    </td>
                    <td className="px-4 py-0 text-gray-500 text-sm">
                      {new Date(gasto.fecha).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-0 text-gray-500 text-sm">
                      {gasto.descripcion || "Sin descripción"}
                    </td>
                    <td
                      className={`px-4 py-0 text-right font-semibold ${
                        gasto.monto < 0 ? "text-red-500" : "text-red-500"
                      }`}
                    >
                      {gasto.monto < 0 ? `-${gasto.monto}` : `-${gasto.monto}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isIncomeModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-md">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-50">
              <h2 className="text-xl font-semibold mb-4">
                Configura tu Ingreso Mensual
              </h2>
              <p className="text-gray-600 mb-4">
                Establecer tu ingreso mensual permite a la aplicación generar
                comparaciones de gastos y visualizar gráficas personalizadas
                sobre tu situación financiera.
              </p>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="Ingresa tu ingreso mensual"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveIncome}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
