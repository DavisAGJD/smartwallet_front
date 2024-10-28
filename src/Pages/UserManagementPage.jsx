import { useEffect, useState } from "react";
import SidebarAdmin from "../components/ui/Componentes/SidebarAdmin";
import Header from "../components/ui/Componentes/Header";
import { obtenerUsuarios, eliminarUsuario } from "../api/usuariosApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Componentes/table";
import { Button } from "../components/ui/button";
import { Trash2, ChevronDown } from "lucide-react";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usuarios = await obtenerUsuarios();
        setUsers(usuarios);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      try {
        await eliminarUsuario(selectedUser.usuario_id);
        setUsers(users.filter(user => user.usuario_id !== selectedUser.usuario_id));
        setShowConfirm(false);
        setSelectedUser(null);
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedUser(null);
  };

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />

      <main className="flex-1 p-8">
        <Header />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        </div>

        {/* Tabla de Usuarios */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Lista de Usuarios</h2>
            <Button variant="ghost" size="sm">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Fecha de Ingreso</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.usuario_id}>
                  <TableCell>{user.nombre_usuario}</TableCell>
                  <TableCell>{new Date(user.fecha_registro).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.tipo_suscripcion === "Premium"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {user.tipo_suscripcion}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(user)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Modal de Confirmación de Eliminación */}
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h2 className="text-lg font-semibold mb-4">¿Seguro que deseas eliminar este usuario?</h2>
              <div className="flex justify-end space-x-2">
                <Button onClick={cancelDelete} variant="ghost">
                  Cancelar
                </Button>
                <Button onClick={confirmDelete} variant="danger">
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
