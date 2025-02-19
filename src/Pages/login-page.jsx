import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUsuario } from "../api/usuariosApi";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password_usuario, setPassword_usuario] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await loginUsuario(email, password_usuario);

    if (data.token && data.rol) {
      // Verifica que el token y el rol están presentes
      login(data.token, data.rol, data.racha); // Guarda el token, rol y la racha en el contexto

      // Guardamos la racha en localStorage para poder acceder a ella más tarde
      localStorage.setItem("racha", data.racha);

      if (data.rol === "admin") {
        navigate("/admin-overview"); // Redirige a la página de administración
      } else {
        navigate("/user-overview"); // Redirige a la vista general del usuario
      }

      console.log("Usuario logeado con éxito");
    } else {
      console.error(data.error || "Error al iniciar sesión");
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-100 to-green-200">
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto my-8 shadow-2xl rounded-xl overflow-hidden">
        <motion.div
          className="md:w-1/2 bg-cover bg-center relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%201-jjQh9lOZvqX7T5NBaQ0L4IvDwEOKv9.png"
            alt="Concepto de ahorro inteligente"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-200/50 to-transparent" />
          <motion.div
            className="absolute bottom-0 left-0 p-8 text-white"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-2">Bienvenido de vuelta</h2>
            <p className="text-lg">
              Continúa tu viaje hacia el éxito financiero con SmartWallet
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="md:w-1/2 bg-white p-8 relative flex flex-col items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="mb-8 w-full"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between font-bold">
              <img src={Logo} alt="Logo" className="h-10 mb-4 " />
              <h1 className="text-2xl font-bold text-gray-800">
                Iniciar sesión
              </h1>
              <Link to="/" className="text-xl">
                X
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 text-center text-3xl text-gray-300 font-bold opacity-20 select-none"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            SMARTWALLET
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-4 w-full">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </motion.div>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              <label
                htmlFor="password_usuario"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                id="password_usuario"
                type="password"
                value={password_usuario}
                onChange={(e) => setPassword_usuario(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </motion.div>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Iniciar sesión
              </button>
            </motion.div>
          </form>

          <motion.div
            className="mt-6 text-center text-sm text-gray-600"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
          >
            ¿No tienes una cuenta?{" "}
            <a
              href="/register"
              className="font-medium text-green-600 hover:underline"
            >
              Registrarse
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
