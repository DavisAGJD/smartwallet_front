"use client"

import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { loginUsuario } from "../api/usuariosApi"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../assets/Logo.png"

export default function Login() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password_usuario, setPassword_usuario] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const data = await loginUsuario(email, password_usuario)

      if (data.token && data.rol) {
        login(data.token, data.rol, data.racha)
        localStorage.setItem("racha", data.racha)

        if (data.rol === "admin") {
          navigate("/admin-overview")
        } else {
          navigate("/user-overview")
        }

        console.log("Usuario logeado con éxito")
      } else {
        setError("Credenciales inválidas. Por favor, intenta de nuevo.")
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      setError("Hubo un problema al iniciar sesión. Por favor, intenta de nuevo más tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto my-8 shadow-2xl rounded-3xl overflow-hidden">
        <motion.div
          className="md:w-1/2 bg-cover bg-center relative hidden md:block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%201-jjQh9lOZvqX7T5NBaQ0L4IvDwEOKv9.png"
            alt="Concepto de ahorro inteligente"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-600/70 via-green-500/50 to-transparent" />
          <motion.div
            className="absolute bottom-0 left-0 p-12 text-white"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 leading-tight">Bienvenido de vuelta a SmartWallet</h2>
            <p className="text-xl opacity-90 mb-8">Tu camino hacia el éxito financiero comienza aquí</p>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-green-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Gestión inteligente</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-green-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Ahorro eficiente</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="mb-8 w-full"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-8">
              <img src={Logo || "/placeholder.svg"} alt="Logo" className="h-12" />
              <Link to="/" className="text-2xl text-gray-400 hover:text-gray-600 transition-colors duration-300">
                &times;
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Iniciar sesión</h1>
            <p className="text-gray-600">Accede a tu cuenta para continuar tu viaje financiero</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-6 w-full max-w-md">
            <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full px-4 py-3 rounded-lg text-gray-900 bg-gray-100 border-2 border-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
                  placeholder="tu@email.com"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    ></path>
                  </svg>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
              <label htmlFor="password_usuario" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password_usuario"
                  type="password"
                  value={password_usuario}
                  onChange={(e) => setPassword_usuario(e.target.value)}
                  required
                  className="block w-full px-4 py-3 rounded-lg text-gray-900 bg-gray-100 border-2 border-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.7 }}>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </motion.div>
          </form>

          {error && (
            <motion.div
              className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <motion.div
            className="mt-8 text-center text-sm text-gray-600"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
          >
            {/* Mantén los signos de pregunta */}
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="font-medium text-green-600 hover:text-green-700 transition-colors duration-300"
            >
              Regístrate ahora
            </Link>
          </motion.div>

          <motion.div
            className="mt-8 text-center"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.9 }}
          >
            {/* Mantén el signo de pregunta */}
            <a href="#" className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-300">
              ¿Olvidaste tu contraseña?
            </a>
          </motion.div>

          {/* Se reemplaza la posición absoluta por un margen para que quede más abajo en móvil */}
          <motion.div
            className="mt-12 text-center text-3xl text-gray-200 font-bold opacity-20 select-none"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
          >
            SMARTWALLET
          </motion.div>
        </motion.div>
      </div>

      {/* 
        Se ha eliminado el botón flotante con el ícono de signo de pregunta.
        Si en algún momento lo necesitas, aquí es donde estaba el código:
        
        <motion.div
          className="fixed bottom-4 right-4 bg-white p-4 rounded-full shadow-lg"
          ...
        >
          <svg ...>...</svg>
        </motion.div>
      */}
    </div>
  )
}
