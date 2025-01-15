import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteProveedor, getAllProveedores } from '../services/api';

const ProveedoresDashboard = () => {
  const [proveedores, setProveedores] = useState([]);

  // Obtener lista de proveedores
  const fetchProveedores = async () => {
    try {
      const response = await getAllProveedores();
      setProveedores(response.data['Lista de todos los proveedores existentes']);
    } catch (error) {
      console.error('Error al listar proveedores:', error);
    }
  };

  // Eliminar proveedor
  const handleDelete = async (id) => {
    try {
      await deleteProveedor(id);  // Llamar a la función deleteProveedor
      alert('Proveedor eliminado con éxito.');
      fetchProveedores();  // Recargar la lista de proveedores
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
      alert('Error al eliminar el proveedor.');
    }
  };

  // Obtener los proveedores al cargar el componente
  useEffect(() => {
    fetchProveedores();
  }, []);

  // Función para abrir la página de agregar nuevo proveedor en una nueva ventana
  const handleAddNew = () => {
    // Abre la ventana con el formulario para agregar un nuevo proveedor
    window.open('/agregar', 'AgregarProveedor', 'width=800,height=600'); // Definir el tamaño de la ventana
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Proveedores</h1>
      <button 
        className="btn btn-success mb-3"
        onClick={handleAddNew} // Llamar a la función handleAddNew
      >
        Agregar Nuevo Proveedor
      </button>
      <h2>Lista de Proveedores</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>RUC</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.proveedor_id}>
              <td>{proveedor.proveedor_id}</td>
              <td>{proveedor.ruc_proveedor}</td>
              <td>{proveedor.nombre_proveedor}</td>
              <td>{proveedor.correo_proveedor}</td>
              <td>{proveedor.telefono_proveedor}</td>
              <td>{proveedor.direccion_proveedor}</td>
              <td>{proveedor.estado_proveedor}</td>
              <td>
                <Link to={`/editar/${proveedor.proveedor_id}`} className="btn btn-warning btn-sm me-2">
                  Editar
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(proveedor.proveedor_id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProveedoresDashboard;
