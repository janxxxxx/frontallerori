import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProveedores } from '../services/api';

const ProveedoresDashboard = () => {
  const [proveedores, setProveedores] = useState([]);
  const [searchId, setSearchId] = useState(''); // Estado para manejar el ID de búsqueda
  const [filteredProveedores, setFilteredProveedores] = useState([]); // Estado para manejar los proveedores filtrados

  // Función para obtener todos los proveedores
  const fetchProveedores = async () => {
    try {
      const response = await getAllProveedores();
      setProveedores(response.data['Lista de todos los proveedores existentes']);
      setFilteredProveedores(response.data['Lista de todos los proveedores existentes']); // Inicializar la lista filtrada
    } catch (error) {
      console.error('Error al listar proveedores:', error);
    }
  };

  // Función para filtrar los proveedores por ID
  const handleSearch = () => {
    if (searchId === '') {
      setFilteredProveedores(proveedores); // Si no hay búsqueda, mostrar todos los proveedores
    } else {
      const filtered = proveedores.filter(proveedor =>
        proveedor.proveedor_id.toString().includes(searchId)
      );
      setFilteredProveedores(filtered); // Filtrar los proveedores por el ID
    }
  };

  // Función para limpiar la búsqueda y mostrar todos los proveedores
  const handleClearSearch = () => {
    setSearchId('');
    setFilteredProveedores(proveedores); // Mostrar todos los proveedores
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  // Función para abrir la ventana emergente para agregar un nuevo proveedor
  const handleAddNew = () => {
    const addWindow = window.open('/agregar', 'AgregarProveedor', 'width=800,height=600');
    const checkWindowClosed = setInterval(() => {
      if (addWindow.closed) {
        clearInterval(checkWindowClosed);
        fetchProveedores(); // Actualiza la lista cuando la ventana emergente se cierra
      }
    }, 1000);  // Verifica cada segundo si la ventana está cerrada
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Proveedores</h1>
      <button className="btn btn-success mb-3" onClick={handleAddNew}>
        Agregar Nuevo Proveedor
      </button>

      {/* Campo de búsqueda por ID */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleSearch}>
          Buscar
        </button>
        <button className="btn btn-secondary mt-2 ml-2" onClick={handleClearSearch}>
          Limpiar Búsqueda
        </button>
      </div>

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
          {filteredProveedores.map((proveedor) => (
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
                <button className="btn btn-danger btn-sm">
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
