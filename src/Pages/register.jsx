import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Para redirigir al usuario
import { registerUsuario } from "../api/usuariosApi";
import { motion } from "framer-motion";
import Logo from "../assets/Logo.png"


export default function Register() {
  const navigate = useNavigate(); // Para manejar la redirección
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // Para manejar errores en el formulario

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de coincidencia de contraseñas
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Llamada a la API para registrar usuario
      await registerUsuario({
        nombre_usuario: name,
        email,
        password_usuario: password,
      });

      // Redirigir al usuario a la página de inicio de sesión
      navigate("/login");
    } catch (error) {
      setError("Hubo un error al registrar el usuario.");
      console.error("Error al registrar:", error);
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
          <div className="absolute inset-0 bg-gradient-to-t from-green-600/50 to-transparent" />
          <motion.div
            className="absolute bottom-0 left-0 p-8 text-white"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-2">Ahorro Inteligente</h2>
            <p className="text-lg">
              Ilumina tu futuro financiero con SmartWallet
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          className="md:w-1/2 bg-white p-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="mb-8"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between font-bold">
              <img src="src/assets/Logo.png" alt="Logo" className="h-10 mb-4" />
              <h1 className="text-2xl font-bold text-gray-800">
                Registrate
              </h1>
              <Link to="/" className="text-xl">
                X
              </Link>
            </div>
          </motion.div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              transition={{ delay: 0.6 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </motion.div>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
            >
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </motion.div>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
            >
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Registrar
              </button>
            </motion.div>
          </form>
          <motion.div
            className="mt-6 text-center text-sm text-gray-600"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
          >
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/login"
              className="font-medium text-green-600 hover:underline"
            >
              Iniciar sesión
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
