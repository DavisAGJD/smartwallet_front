import { useEffect, useState } from "react";
import SidebarAdmin from "../components/ui/Componentes/SidebarAdmin";
import HeaderAdmin from "../components/ui/Componentes/HeaderAdmin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Componentes/table";
import { Button } from "../components/ui/button";
import { Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { eliminarUsuario, obtenerUsuarios } from "../api/usuariosApi";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]); // Lista completa de usuarios
  const [filteredUsers, setFilteredUsers] = useState([]); // Usuarios filtrados por búsqueda y paginación
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize] = useState(5); // Número de usuarios por página

  // Función para cargar todos los usuarios
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await obtenerUsuarios(); // Devuelve la lista completa de usuarios
      setUsers(data);
      setFilteredUsers(data); // Inicialmente, todos los usuarios están visibles
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para filtrar usuarios por búsqueda
  const filterUsers = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = users.filter((user) =>
      user.nombre_usuario.toLowerCase().includes(lowerQuery)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reiniciar a la primera página al buscar
  };

  // Efecto para cargar usuarios al inicio
  useEffect(() => {
    fetchUsers();
  }, []);

  // Efecto para actualizar la lista filtrada al cambiar la búsqueda
  useEffect(() => {
    filterUsers(searchQuery);
  }, [searchQuery, users]);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      try {
        await eliminarUsuario(selectedUser.usuario_id);
        fetchUsers(); // Recargar usuarios después de eliminar
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

  // Función para renderizar usuarios paginados
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredUsers.length / pageSize);
    const visiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center mt-4 items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 mx-1 rounded-md ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
          >
            {page}
          </button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />
      <main className="flex-1 p-8">
        <HeaderAdmin />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre de usuario..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="bg-white shadow rounded-lg">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Lista de Usuarios</h2>
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
              {paginatedUsers.map((user) => (
                <TableRow key={user.usuario_id || `user-${user.nombre_usuario}`}>
                  <TableCell>{user.nombre_usuario}</TableCell>
                  <TableCell>{new Date(user.fecha_registro).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${user.tipo_suscripcion === "Premium"
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
        {renderPagination()}
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
