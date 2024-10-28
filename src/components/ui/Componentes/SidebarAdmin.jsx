import { FileText, GraduationCap, BarChart2, User, Users, CircleDollarSign, Target } from "lucide-react";
import PropTypes from "prop-types";
import Logo from "../../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function SidebarAdmin() {
  const { logout } = useContext(AuthContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirige al usuario después de cerrar sesión
  };

  return (
    <aside className="w-64 h-screen bg-[#F5F5F5] shadow-lg flex flex-col">
      <div className="p-4 flex items-center space-x-2">
        <img src={Logo} alt="SMARTWALLET" className="h-10" />
        <h2 className="text-lg font-bold">SMARTWALLET</h2>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2 p-4">
          <MenuItem icon={<FileText size={20} />} label="Descripción" to={"/admin-overview"} />
          <MenuItem icon={<Users size={20} />} label="Usuarios" to={"/user-management"} />
          <MenuItem icon={<GraduationCap size={20} />} label="Educación" to={"/admin-education"} />
          <MenuItem icon={<BarChart2 size={20} />} label="Reportes" to={"/admin-reports"} />
          <MenuItem icon={<CircleDollarSign size={20} />} label="Categoría Gastos" to={"/expense-categories"} />
          <MenuItem icon={<Target size={20} />} label="Categoría Metas" to={"/goals-management"} />
        </ul>
      </nav>
      <div className="p-4 border-t relative">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={toggleMenu}>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          <span className="text-sm font-medium mx-14">Admin panel</span>
        </div>
        {isMenuOpen && (
          <div className="absolute bottom-16 left-4 bg-white shadow-lg rounded-lg p-2 w-48">
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
  );
}

function MenuItem({ icon, label, to }) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 rounded-lg p-2 transition-colors duration-200"
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
}

MenuItem.propTypes = {
  icon: PropTypes.node.isRequired, // Validar que 'icon' sea un nodo de React (puede ser un componente o un elemento JSX)
  label: PropTypes.string.isRequired, // Validar que 'label' sea una cadena de texto
  to: PropTypes.string.isRequired,
};
