import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import HeaderAdmin from "../components/ui/Componentes/HeaderAdmin";
import SidebarAdmin from "../components/ui/Componentes/SidebarAdmin";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Componentes/table";
import { obtenerCategoriasGasto, crearCategoriaGasto, actualizarCategoriaGasto, eliminarCategoriaGasto } from '../api/categoriasApi';
import { getIconForCategory } from "../utils/iconsUtils";
import AddCategoryModal from "../components/ui/Componentes/Modales/AddCategoryModal"; // Asegúrate de ajustar la ruta según tu estructura

export default function ExpenseCategories() {
  const [categories, setCategories] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await obtenerCategoriasGasto();
      setCategories(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  const handleAddCategory = async (nombreCategoria) => {
    try {
      await crearCategoriaGasto(nombreCategoria);
      fetchCategories(); // Volver a cargar las categorías después de agregar una nueva
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error al agregar la categoría:", error);
    }
  };

  const startEditing = (category) => {
    setEditingCategory(category);
  };

  const saveCategory = async (id, name) => {
    try {
      await actualizarCategoriaGasto(id, name);
      setEditingCategory(null); // Terminar la edición
      fetchCategories(); // Volver a cargar las categorías
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await eliminarCategoriaGasto(id);
      setCategories(categories.filter(cat => cat.categoria_gasto_id !== id));
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-6">
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center px-4 py-2 text-white rounded-full bg-gradient-to-r from-[#21AA58] via-[#21AA58] to-[#247D61] hover:from-[#247D61] hover:to-[#21AA58] transition-colors duration-300 mr-4"
              >
                <Plus size={20} className="mr-2" />
                <span className="font-semibold">Agregar Categoría</span>
              </Button>
              <h3 className="text-lg font-semibold">Administrar categorias gastos</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ícono</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.categoria_gasto_id}>
                    <TableCell className="flex items-center">
                      {getIconForCategory(category.nombre_categoria)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {editingCategory && editingCategory.categoria_gasto_id === category.categoria_gasto_id ? (
                        <input
                          type="text"
                          defaultValue={category.nombre_categoria}
                          onBlur={(e) => saveCategory(category.categoria_gasto_id, e.target.value)}
                          className="border px-2 py-1 rounded"
                          autoFocus
                        />
                      ) : (
                        category.nombre_categoria
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingCategory && editingCategory.categoria_gasto_id === category.categoria_gasto_id ? (
                        <Button variant="ghost" size="sm" onClick={() => setEditingCategory(null)}>
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      ) : (
                        <>
                          <Button variant="ghost" size="sm" className="mr-2" onClick={() => startEditing(category)}>
                            <Pencil className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setConfirmDelete(category.categoria_gasto_id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                          {confirmDelete === category.categoria_gasto_id && (
                            <div className="mt-2 flex items-center space-x-2">
                              <Button size="sm" onClick={() => deleteCategory(category.categoria_gasto_id)}>
                                <Check className="h-4 w-4 text-green-500" /> Confirmar
                              </Button>
                              <Button size="sm" onClick={() => setConfirmDelete(null)}>
                                <X className="h-4 w-4 text-red-500" /> Cancelar
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddCategory}
      />
    </div>
  );
}
