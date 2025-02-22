"use client"

import { useState, useEffect, useContext } from "react"
import { motion } from "framer-motion"
import Sidebar from "../components/ui/Componentes/Sidebar"
import { AuthContext } from "../context/AuthContext"
import { obtenerIngresoUsuario, actualizarIngreso } from "../api/usuariosApi"
import { obtenerGastosPorUsuario } from "../api/gastosApi"
import CategoryExpensesChart from "../components/ui/Componentes/Charts/CategoryExpensesChart"
import ExpensesDistributionChart from "../components/ui/Componentes/Charts/ExpensesDistributionChart"
import RecentExpensesTable from "../components/ui/Componentes/RecentExpensesTable"
import { Menu, Bell } from "lucide-react"

export default function UserOverviewPage() {
  const { token } = useContext(AuthContext)
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false)
  const [income, setIncome] = useState("")
  const [expenseData, setExpenseData] = useState([])
  const [expenseCategories, setExpenseCategories] = useState([])
  const [recentExpenses, setRecentExpenses] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      return JSON.parse(window.atob(base64))
    } catch {
      return null
    }
  }

  const usuario_id = parseJwt(token)?.id

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const userIncome = await obtenerIngresoUsuario(token, usuario_id)
        if (userIncome === null || userIncome === undefined || userIncome <= 0) {
          setIsIncomeModalOpen(true)
        } else {
          setIncome(userIncome)
          setIsIncomeModalOpen(false)
        }
      } catch (error) {
        console.error("Error al obtener ingreso:", error)
      }
    }

    const fetchExpenses = async () => {
      try {
        const expenses = await obtenerGastosPorUsuario(usuario_id, token)
        const sortedExpenses = expenses
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
          .map((expense) => ({
            ...expense,
            monto: Number.parseFloat(expense.monto),
          }))

        const groupedExpenses = sortedExpenses.reduce((acc, expense) => {
          const categoriaId = expense.categoria_gasto_id
          const monto = expense.monto
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
        setRecentExpenses(sortedExpenses.slice(0, 3))
      } catch (error) {
        console.error("Error al obtener gastos del usuario:", error)
      }
    }

    if (usuario_id) {
      fetchIncome()
      fetchExpenses()
    }
  }, [token, usuario_id])

  const handleSaveIncome = async () => {
    if (income === "") {
      console.error("El ingreso no puede estar vacío.")
      return
    }
    try {
      await actualizarIngreso(token, usuario_id, Number.parseFloat(income))
      setIsIncomeModalOpen(false)
    } catch (error) {
      console.error("Error al guardar ingreso:", error)
    }
  }

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
              <span className="text-sm font-medium">Visión General de Usuario</span>
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
            <h1 className="text-2xl font-bold text-gray-800">Resumen de Usuario</h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-lg font-semibold mb-4">Gastos por Categoría</h2>
              <CategoryExpensesChart data={expenseCategories} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-lg font-semibold mb-4">Distribución de Gastos</h2>
              <ExpensesDistributionChart data={expenseData} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 bg-white p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-4">Gastos Recientes</h2>
            <RecentExpensesTable expenses={recentExpenses} />
          </motion.div>
        </main>
      </div>

      {/* Income Modal */}
      {isIncomeModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-md z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">Configura tu Ingreso Mensual</h2>
            <p className="text-sm text-gray-600 mb-6">
              Establecer tu ingreso mensual permite a la aplicación generar comparaciones de gastos y visualizar
              gráficas personalizadas sobre tu situación financiera.
            </p>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Ingresa tu ingreso mensual"
              className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSaveIncome}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Guardar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

