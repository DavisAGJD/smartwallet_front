"use client"

import { useState, useEffect, useContext, useCallback } from "react"
import { motion } from "framer-motion"
import { Menu, Bell } from "lucide-react"
import Sidebar from "../components/ui/Componentes/Sidebar"
import CategoryExpensesChart from "../components/ui/Componentes/Charts/CategoryExpensesChart"
import ExpensesDistributionChart from "../components/ui/Componentes/Charts/ExpensesDistributionChart"
import IncomeExpensesPieChart from "../components/ui/Componentes/Charts/IncomeExpensesPieChart"
import GoalProgressChart from "../components/ui/Componentes/Charts/GoalProgressChart"
import { AuthContext } from "../context/AuthContext"
import { obtenerIngresoUsuario } from "../api/usuariosApi"
import { obtenerGastosPorUsuario } from "../api/gastosApi"
import { obtenerMetasPorUsuario } from "../api/metasApi"

export default function AnalysisPage() {
  const { token } = useContext(AuthContext)
  const [income, setIncome] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [expenseData, setExpenseData] = useState([])
  const [expenseCategories, setExpenseCategories] = useState([])
  const [goals, setGoals] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const parseJwt = useCallback((token) => {
    try {
      const base64Url = token.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      return JSON.parse(window.atob(base64))
    } catch {
      return null
    }
  }, [])

  const usuario_id = parseJwt(token)?.id

  const fetchIncome = useCallback(async () => {
    try {
      const userIncome = await obtenerIngresoUsuario(token, usuario_id)
      setIncome(Number.parseFloat(userIncome) || 0)
    } catch (error) {
      console.error("Error al obtener ingreso:", error)
    }
  }, [token, usuario_id])

  const fetchExpenses = useCallback(async () => {
    try {
      const expenses = await obtenerGastosPorUsuario(usuario_id, token)
      const total = expenses.reduce((acc, expense) => acc + Number.parseFloat(expense.monto), 0)
      setTotalExpenses(total)

      const groupedExpenses = expenses.reduce((acc, expense) => {
        const categoriaId = expense.categoria_gasto_id
        const monto = Number.parseFloat(expense.monto)
        if (!acc[categoriaId]) {
          acc[categoriaId] = {
            nombre: expense.nombre_categoria,
            monto: 0,
          }
        }
        acc[categoriaId].monto += monto
        return acc
      }, {})

      const categoriesData = Object.values(groupedExpenses)
        .sort((a, b) => b.monto - a.monto)
        .slice(0, 4)
        .map((item) => ({ name: item.nombre, amount: item.monto }))

      const pieData = categoriesData.map((category) => ({
        name: category.name,
        value: category.amount,
      }))

      setExpenseCategories(categoriesData)
      setExpenseData(pieData)
    } catch (error) {
      console.error("Error al obtener gastos del usuario:", error)
    }
  }, [usuario_id, token])

  const fetchGoals = useCallback(async () => {
    if (!usuario_id || !token) {
      console.warn("Token o usuarioId no disponible")
      return
    }
    try {
      const metasUsuario = await obtenerMetasPorUsuario(usuario_id, token)
      if (metasUsuario && Array.isArray(metasUsuario)) {
        const metasConvertidas = metasUsuario.map((meta) => ({
          name: meta.nombre_meta || "Meta sin nombre",
          targetAmount: Number(meta.monto_objetivo) || 0,
          amountAchieved: Number(meta.monto_actual) || 0,
        }))
        setGoals(metasConvertidas)
      } else {
        console.warn("No se obtuvieron metas o el formato de respuesta no es correcto")
        setGoals([])
      }
    } catch (error) {
      console.error("Error al obtener las metas:", error)
      setGoals([])
    }
  }, [usuario_id, token])

  useEffect(() => {
    if (usuario_id) {
      fetchIncome()
      fetchExpenses()
      fetchGoals()
    }
  }, [usuario_id, fetchIncome, fetchExpenses, fetchGoals])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header Section */}
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="flex items-center h-16 px-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden mr-4 p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Dashboards</span>
              <span className="text-gray-400">/</span>
              <span className="text-sm font-medium">Análisis Financiero</span>
            </div>

            <div className="ml-auto">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h1 className="text-2xl font-bold text-gray-800">Análisis Financiero</h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-lg font-semibold mb-4">Gastos por Categoría</h2>
              <CategoryExpensesChart data={expenseCategories} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-lg font-semibold mb-4">Distribución de Gastos</h2>
              <ExpensesDistributionChart data={expenseData} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-lg font-semibold mb-4">Comparación de Ingresos vs Gastos</h2>
              <IncomeExpensesPieChart income={income} totalExpenses={totalExpenses} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-lg font-semibold mb-4">Progreso de Metas</h2>
              {goals.length > 0 ? (
                <GoalProgressChart goals={goals} />
              ) : (
                <p className="text-gray-500 text-center">No hay metas disponibles.</p>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

