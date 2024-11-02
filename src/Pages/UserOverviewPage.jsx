import { useState, useEffect, useContext } from "react";
import Sidebar from "../components/ui/Componentes/Sidebar";
import Header from "../components/ui/Componentes/Header";
import { AuthContext } from "../context/AuthContext";
import { obtenerIngresoUsuario, actualizarIngreso } from "../api/usuariosApi";
import { obtenerGastosPorUsuario } from "../api/gastosApi";
import CategoryExpensesChart from "../components/ui/Componentes/Charts/CategoryExpensesChart";
import ExpensesDistributionChart from "../components/ui/Componentes/Charts/ExpensesDistributionChart";
import RecentExpensesTable from "../components/ui/Componentes/RecentExpensesTable";

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
        if (userIncome === null || userIncome === undefined || userIncome <= 0) {
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
        const sortedExpenses = expenses
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
          .map((expense) => ({
            ...expense,
            monto: parseFloat(expense.monto) // Convertimos `monto` a número
          }));
    
        const groupedExpenses = sortedExpenses.reduce((acc, expense) => {
          const categoriaId = expense.categoria_gasto_id;
          const monto = expense.monto; // `monto` ya está como número aquí
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
        setRecentExpenses(sortedExpenses.slice(0, 3)); // Ahora `monto` es un número
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
      await actualizarIngreso(token, usuario_id, parseFloat(income)); // Asegúrate de implementar `actualizarIngreso` en `usuariosApi`
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Gastos por Categoría</h2>
            <CategoryExpensesChart data={expenseCategories} />
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Distribución de Gastos</h2>
            <ExpensesDistributionChart data={expenseData} />
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Gastos Recientes</h2>
          <RecentExpensesTable expenses={recentExpenses} />
        </div>

        {isIncomeModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-md">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-50">
              <h2 className="text-xl font-semibold mb-4">Configura tu Ingreso Mensual</h2>
              <p className="text-gray-600 mb-4">
                Establecer tu ingreso mensual permite a la aplicación generar comparaciones de gastos y visualizar gráficas personalizadas sobre tu situación financiera.
              </p>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="Ingresa tu ingreso mensual"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex justify-end">
                <button onClick={handleSaveIncome} className="px-4 py-2 bg-blue-500 text-white rounded-md">Guardar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
