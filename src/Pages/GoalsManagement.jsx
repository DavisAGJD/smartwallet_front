import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import Header from "../components/ui/Componentes/Header";
import SidebarAdmin from "../components/ui/Componentes/SidebarAdmin";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Componentes/table";
import { obtenerCategoriasMeta, crearCategoriaMeta, actualizarCategoriaMeta, eliminarCategoriaMeta } from '../api/categoriasApi';
import { getIconForCategory } from "../utils/iconsUtils"; // Asegúrate de que la ruta es correcta
import AddGoalModal from "../components/ui/Componentes/Modales/AddGoalModalCategory"; // Asegúrate de ajustar la ruta según tu estructura

export default function GoalsManagement() {
  const [goals, setGoals] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const data = await obtenerCategoriasMeta();
      setGoals(data);
    } catch (error) {
      console.error("Error al cargar metas:", error);
    }
  };

  const handleAddGoal = async (nombreMeta) => {
    try {
      await crearCategoriaMeta(nombreMeta);
      fetchGoals(); // Volver a cargar las metas después de agregar una nueva
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error al agregar la meta:", error);
    }
  };

  const startEditing = (goal) => {
    setEditingGoal(goal);
  };

  const saveGoal = async (id, name) => {
    try {
      await actualizarCategoriaMeta(id, name);
      setEditingGoal(null); // Terminar la edición
      fetchGoals(); // Volver a cargar las metas
    } catch (error) {
      console.error("Error al actualizar la meta:", error);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await eliminarCategoriaMeta(id);
      setGoals(goals.filter(goal => goal.categoria_meta_id !== id));
    } catch (error) {
      console.error("Error al eliminar la meta:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-6">
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center px-4 py-2 text-white rounded-full bg-gradient-to-r from-[#21AA58] via-[#21AA58] to-[#247D61] hover:from-[#247D61] hover:to-[#21AA58] transition-colors duration-300 mr-4"
              >
                <Plus size={20} className="mr-2" />
                <span className="font-semibold">Agregar Meta</span>
              </Button>
              <h3 className="text-lg font-semibold">Gestionar Metas</h3>
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
                {goals.map((goal) => (
                  <TableRow key={goal.categoria_meta_id}>
                    <TableCell className="flex items-center">
                      {getIconForCategory(goal.nombre_categoria)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {editingGoal && editingGoal.categoria_meta_id === goal.categoria_meta_id ? (
                        <input
                          type="text"
                          defaultValue={goal.nombre_categoria}
                          onBlur={(e) => saveGoal(goal.categoria_meta_id, e.target.value)}
                          className="border px-2 py-1 rounded"
                          autoFocus
                        />
                      ) : (
                        goal.nombre_categoria
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingGoal && editingGoal.categoria_meta_id === goal.categoria_meta_id ? (
                        <Button variant="ghost" size="sm" onClick={() => setEditingGoal(null)}>
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      ) : (
                        <>
                          <Button variant="ghost" size="sm" className="mr-2" onClick={() => startEditing(goal)}>
                            <Pencil className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setConfirmDelete(goal.categoria_meta_id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                          {confirmDelete === goal.categoria_meta_id && (
                            <div className="mt-2 flex items-center space-x-2">
                              <Button size="sm" onClick={() => deleteGoal(goal.categoria_meta_id)}>
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
      <AddGoalModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddGoal}
      />
    </div>
  );
}
