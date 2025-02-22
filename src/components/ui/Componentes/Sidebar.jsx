"use client"

import { useState, useEffect, useContext } from "react"
import { FileText, Target, GraduationCap, BarChart2, CircleDollarSign, PieChart, BellPlus, Gift } from "lucide-react"
import { X } from "lucide-react" // Import the X icon for closing the sidebar
import PropTypes from "prop-types"
import Logo from "../../../assets/Logo.png"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { AuthContext } from "../../../context/AuthContext"
import { obtenerUsuarios } from "../../../api/usuariosApi"

export default function Sidebar({ isOpen, onClose }) {
  const { token, logout } = useContext(AuthContext)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [usuarioNombre, setUsuarioNombre] = useState("Usuario")
  const navigate = useNavigate()
  const location = useLocation()

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      return JSON.parse(window.atob(base64))
    } catch {
      return null
    }
  }

  const usuarioId = parseJwt(token)?.id

  useEffect(() => {
    const fetchUsuarioNombre = async () => {
      if (usuarioId) {
        try {
          const usuarios = await obtenerUsuarios()
          const usuario = usuarios.find((user) => user.usuario_id === usuarioId)
          setUsuarioNombre(usuario?.nombre_usuario || "Usuario")
        } catch (error) {
          console.error("Error al obtener el nombre del usuario:", error)
        }
      }
    }

    fetchUsuarioNombre()
  }, [usuarioId])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-[#F5F5F5] shadow-lg flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={Logo || "/placeholder.svg"} alt="SMARTWALLET" className="h-10" />
            <h2 className="text-lg font-bold">SMARTWALLET</h2>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none">
            <X size={24} />
          </button>
        </div>
        <nav className="flex-grow overflow-y-auto">
          <ul className="space-y-2 p-4">
            <MenuItem
              icon={<FileText size={20} />}
              label="Descripción"
              to="/user-overview"
              isActive={location.pathname === "/user-overview"}
            />
            <MenuItem
              icon={<CircleDollarSign size={20} />}
              label="Gastos"
              to="/expenses"
              isActive={location.pathname === "/expenses"}
            />
            <MenuItem icon={<Target size={20} />} label="Metas" to="/goals" isActive={location.pathname === "/goals"} />
            <MenuItem
              icon={<GraduationCap size={20} />}
              label="Educación"
              to="/education"
              isActive={location.pathname === "/education"}
            />
            <MenuItem
              icon={<BarChart2 size={20} />}
              label="Reportes"
              to="/reports"
              isActive={location.pathname === "/reports"}
            />
            <MenuItem
              icon={<PieChart size={20} />}
              label="Análisis"
              to="/analysis"
              isActive={location.pathname === "/analysis"}
            />
            <MenuItem
              icon={<BellPlus size={20} />}
              label="Recordatorios"
              to="/reminders"
              isActive={location.pathname === "/reminders"}
            />
            <MenuItem
              icon={<Gift size={20} />}
              label="Recompensas"
              to="/rewards"
              isActive={location.pathname === "/rewards"}
            />
          </ul>
        </nav>
        <div className="p-4 border-t relative">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={toggleMenu}>
            <span className="text-sm font-medium">{usuarioNombre}</span>
          </div>
          {isMenuOpen && (
            <div className="absolute bottom-16 left-4 bg-white shadow-lg rounded-lg p-2 w-48">
              <Link
                to="/user-configuration"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Configuración de cuenta
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

function MenuItem({ icon, label, to, isActive }) {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center space-x-3 text-gray-700 hover:bg-gray-200 rounded-lg p-2 transition-colors duration-200 ${
          isActive ? "bg-gray-200" : ""
        }`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  )
}

MenuItem.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
}

