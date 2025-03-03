import Sidebar from "../components/ui/Componentes/Sidebar";
import Header from "../components/ui/Componentes/Header";
import UserProfileCard from "../components/ui/Componentes/UserProfileCard";
import InformationCard from "../components/ui/Componentes/InformationCard";
import AccountTypeSelect from "../components/ui/Componentes/AccountTypeSelect";
import { useState, useEffect, useContext } from "react";
import EditModal from "../components/ui/Componentes/Modales/EditUserModal";
import PaymentModal from "../components/ui/Componentes/Modales/PaymentModal";
import { obtenerUsuarios, actualizarUsuario } from "../api/usuariosApi";
import { AuthContext } from "../context/AuthContext";

// Función para calcular los días transcurridos desde una fecha en formato datetime
const calculateDaysSinceLastLogin = (lastLoginDate) => {
  const lastLogin = new Date(lastLoginDate);
  const currentDate = new Date();
  const timeDifference = currentDate - lastLogin;
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); // Convierte la diferencia en días
  return daysDifference;
};

const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
  } catch {
    return null;
  }
};

export default function UserConfigurations() {
  const { token } = useContext(AuthContext);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [userProfile, setUserProfile] = useState({
    nombre: "Cargando...",
    email: "",
    password_usuario: "*****",
    ingresos: 0,
    preferencias: {
      cuenta: "Básica",
    },
    lastLogin: null, // Agregamos el campo de última actividad
    racha: 0, // Agregamos el campo de racha
  });

  const usuarioId = parseJwt(token)?.id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usuarios = await obtenerUsuarios();
        const usuario = usuarios.find((user) => user.usuario_id === usuarioId);
        if (usuario) {
          setUserProfile({
            nombre: usuario.nombre_usuario,
            email: usuario.email,
            password_usuario: "*****",
            ingresos: usuario.ingresos || 0,
            preferencias: {
              cuenta: usuario.tipo_suscripcion || "Básica",
            },
            lastLogin: usuario.lastLogin || null, // Suponemos que la fecha está en formato datetime
            racha: usuario.racha || 0, // Tomamos la racha desde el usuario
          });
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    if (usuarioId) {
      fetchUserData();
    }
  }, [usuarioId]);

  const openEditModal = (section, value) => {
    setSelectedSection(section);
    setEditValue(value);
    setEditModalOpen(true);
  };

  const handleAccountTypeChange = (newAccountType) => {
    if (newAccountType === "Premium") {
      setPaymentModalOpen(true);
    } else {
      setUserProfile((prevState) => ({
        ...prevState,
        preferencias: { ...prevState.preferencias, cuenta: "Básica" },
      }));
    }
  };

  const handleSaveChanges = async (campo, nuevoValor) => {
    try {
      const payload = { [campo]: nuevoValor };
      await actualizarUsuario(usuarioId, payload);
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        [campo]: nuevoValor || prevProfile[campo],
      }));
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar el perfil del usuario:", error);
    }
  };

  // Llamada a la función para calcular los días de la racha
  const daysSinceLastLogin = userProfile.lastLogin
    ? calculateDaysSinceLastLogin(userProfile.lastLogin)
    : 0;

  const updateRacha = async () => {
    let newRacha = userProfile.racha;

    // Si la diferencia de días es 1, incrementamos la racha
    if (daysSinceLastLogin === 1) {
      newRacha += 1;
    } else if (daysSinceLastLogin > 1) {
      // Si la diferencia es mayor a 1, reiniciamos la racha
      newRacha = 1;
    }

    // Si la diferencia de días es exactamente 2, asignamos una racha de 2 días
    if (daysSinceLastLogin === 2) {
      newRacha = 2;
    }

    // Actualizamos la racha y lastLogin
    const payload = {
      racha: newRacha,
      lastLogin: new Date().toISOString(),
    };

    await actualizarUsuario(usuarioId, payload);

    setUserProfile((prevProfile) => ({
      ...prevProfile,
      racha: newRacha,
      lastLogin: new Date().toISOString(),
    }));
  };

  // Actualizamos la racha cuando se carga la página
  useEffect(() => {
    if (usuarioId && userProfile.lastLogin) {
      updateRacha();
    }
  }, [usuarioId, userProfile.lastLogin]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />
        <div className="max-w-4xl mx-auto">
          <UserProfileCard
            name={userProfile.nombre}
            profileImage="https://via.placeholder.com/150"
            backgroundImage="https://idc.brightspotcdn.com/dims4/default/adff828/2147483647/resize/800x%3E/quality/90/?url=https%3A%2F%2Fidc.brightspotcdn.com%2Feinfluss%2Fmedia%2F2017%2F02%2F10%2F%2Fahorro.jpg"
            onEdit={() => openEditModal("Perfil", userProfile.nombre)}
          />

          <h2 className="text-2xl font-bold text-green-700 mt-6">Configuración de cuenta</h2>
          <p className="text-gray-600 mt-2">Administra tus datos personales y preferencias.</p>

          {/* Mostrar racha si han pasado más de un día desde la última actividad */}
          {daysSinceLastLogin >= 0 && (
            <div className="mt-4 p-4 bg-green-100 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700">¡Racha Activa!</h3>
              <p className="text-gray-600">Llevas {userProfile.racha} días consecutivos.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <InformationCard
              title="Información de contacto"
              details={[
                { label: "Correo", value: userProfile.email },
                { label: "Contraseña", value: userProfile.password_usuario },
                { label: "Ingresos", value: `$${userProfile.ingresos}` },
              ]}
              onEdit={(label) =>
                openEditModal(label === "Correo" ? "email" : label.toLowerCase(), userProfile[label.toLowerCase()])
              }
            />
            <InformationCard
              title="Tipo de suscripción"
              details={[
                {
                  label: "Cuenta",
                  value: userProfile.preferencias.cuenta === "premium" ? (
                    <span className="font-semibold text-green-600">{userProfile.preferencias.cuenta}</span>
                  ) : (
                    <AccountTypeSelect
                      currentAccountType={userProfile.preferencias.cuenta}
                      onChangeAccountType={handleAccountTypeChange}
                    />
                  ),
                },
              ]}
            />
          </div>
        </div>

        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          section={selectedSection || ""}
          initialValue={editValue}
          usuarioId={usuarioId}
          onSaveSuccess={handleSaveChanges}
        />

        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          packageName="Premium"
          price={49.99}
          allowSaveCard={true}
        />
      </main>
    </div>
  );
}
