import { useState, useEffect, useContext } from "react";
import Sidebar from "../components/ui/Componentes/Sidebar";
import Header from "../components/ui/Componentes/Header";
import CategoryExpensesChart from "../components/ui/Componentes/Charts/CategoryExpensesChart";
import ExpensesDistributionChart from "../components/ui/Componentes/Charts/ExpensesDistributionChart";
import IncomeExpensesPieChart from "../components/ui/Componentes/Charts/IncomeExpensesPieChart";
import GoalProgressChart from "../components/ui/Componentes/Charts/GoalProgressChart";
import { AuthContext } from "../context/AuthContext";
import { obtenerIngresoUsuario } from "../api/usuariosApi";
import { obtenerGastosPorUsuario } from "../api/gastosApi";
import { obtenerMetasPorUsuario } from "../api/metasApi";

export default function AnalysisPage() {
  const { token } = useContext(AuthContext);
  const [income, setIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [goals, setGoals] = useState([]); // Inicializa como array vacío

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
        setIncome(parseFloat(userIncome) || 0);
      } catch (error) {
        console.error("Error al obtener ingreso:", error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const expenses = await obtenerGastosPorUsuario(usuario_id, token);
        const total = expenses.reduce(
          (acc, expense) => acc + parseFloat(expense.monto),
          0
        );
        setTotalExpenses(total);

        const groupedExpenses = expenses.reduce((acc, expense) => {
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
          .map((item) => ({ name: item.nombre, amount: item.monto }));

        const pieData = categoriesData.map((category) => ({
          name: category.name,
          value: category.amount,
        }));

        setExpenseCategories(categoriesData);
        setExpenseData(pieData);
      } catch (error) {
        console.error("Error al obtener gastos del usuario:", error);
      }
    };

    const fetchGoals = async () => {
        if (!usuario_id || !token) {
          console.warn("Token o usuarioId no disponible");
          return;
        }
        try {
          const metasUsuario = await obtenerMetasPorUsuario(usuario_id, token);
          if (metasUsuario && Array.isArray(metasUsuario)) {
            const metasConvertidas = metasUsuario.map((meta) => ({
              name: meta.nombre_meta || "Meta sin nombre", 
              targetAmount: Number(meta.monto_objetivo) || 0, 
              amountAchieved: Number(meta.monto_actual) || 0, 
            }));
            setGoals(metasConvertidas);
          } else {
            console.warn("No se obtuvieron metas o el formato de respuesta no es correcto");
            setGoals([]);
          }
        } catch (error) {
          console.error("Error al obtener las metas:", error);
          setGoals([]);
        }
      };
      

    if (usuario_id) {
      fetchIncome();
      fetchExpenses();
      fetchGoals(); // Llamada para cargar las metas
    }
  }, [token, usuario_id]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 bg-[#F5F5F5]">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex-auto overflow-y-auto p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-6">Análisis Financiero</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">
                Gastos por Categoría
              </h2>
              <CategoryExpensesChart data={expenseCategories} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">
                Distribución de Gastos
              </h2>
              <ExpensesDistributionChart data={expenseData} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">
                Comparación de Ingresos vs Gastos
              </h2>
              <IncomeExpensesPieChart
                income={income}
                totalExpenses={totalExpenses}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Progreso de Metas</h2>
              {goals.length > 0 ? (
                <GoalProgressChart goals={goals} />
              ) : (
                <p>No hay metas disponibles.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
