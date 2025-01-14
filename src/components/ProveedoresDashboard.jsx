import React, { useEffect, useState } from 'react';
import {
  createProveedor,
  deleteProveedor,
  getAllProveedores,
  updateProveedor,
} from '../services/api';

const ProveedoresDashboard = () => {
  const [proveedores, setProveedores] = useState([]);
  const [formData, setFormData] = useState({
    proveedor_id: '',
    ruc_proveedor: '',
    nombre_proveedor: '',
    correo_proveedor: '',
    telefono_proveedor: '',
    direccion_proveedor: '',
    estado_proveedor: 'activo',
  });
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Listar todos los proveedores
  const fetchProveedores = async () => {
    try {
      const response = await getAllProveedores();
      setProveedores(response.data['Lista de todos los proveedores existentes']);
    } catch (error) {
      console.error('Error al listar proveedores:', error);
    }
  };

  // Crear o actualizar proveedor
  const handleSave = async () => {
    try {
      if (formData.proveedor_id) {
        // Actualizar proveedor
        await updateProveedor(formData);
        alert('Proveedor actualizado con éxito.');
      } else {
        // Crear nuevo proveedor
        await createProveedor(formData);
        alert('Proveedor creado con éxito.');
      }
      setFormData({
        proveedor_id: '',
        ruc_proveedor: '',
        nombre_proveedor: '',
        correo_proveedor: '',
        telefono_proveedor: '',
        direccion_proveedor: '',
        estado_proveedor: 'activo',
      });
      fetchProveedores();
    } catch (error) {
      console.error('Error al guardar proveedor:', error.response?.data || error.message);
      alert('Error al guardar el proveedor.');
    }
  };

  // Eliminar proveedor
  const handleDelete = async (id) => {
    try {
      await deleteProveedor(id);
      alert('Proveedor eliminado con éxito.');
      fetchProveedores();
    } catch (error) {
      console.error('Error al eliminar proveedor:', error.response?.data || error.message);
      alert('Error al eliminar el proveedor.');
    }
  };

  // Buscar proveedor por ID
  const handleSearch = () => {
    const result = proveedores.find(
      (proveedor) => proveedor.proveedor_id === parseInt(searchId)
    );
    if (result) {
      setSearchResult(result);
    } else {
      alert('Proveedor no encontrado');
      setSearchResult(null);
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Proveedores</h1>

      {/* Formulario para agregar o actualizar */}
      <div className="mb-4">
        <h2>{formData.proveedor_id ? 'Actualizar Proveedor' : 'Agregar Proveedor'}</h2>
        <form className="row g-3">
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="RUC"
              name="ruc_proveedor"
              value={formData.ruc_proveedor}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              name="nombre_proveedor"
              value={formData.nombre_proveedor}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="email"
              className="form-control"
              placeholder="Correo"
              name="correo_proveedor"
              value={formData.correo_proveedor}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Teléfono"
              name="telefono_proveedor"
              value={formData.telefono_proveedor}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Dirección"
              name="direccion_proveedor"
              value={formData.direccion_proveedor}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-control"
              name="estado_proveedor"
              value={formData.estado_proveedor}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              {formData.proveedor_id ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>

      {/* Formulario de búsqueda por ID */}
      <div className="mb-4">
        <h2>Buscar Proveedor por ID</h2>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="ID del Proveedor"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary" onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
        {/* Mostrar resultado de búsqueda */}
        {searchResult && (
          <div className="mt-3">
            <h4>Resultado de la Búsqueda:</h4>
            <p><strong>ID:</strong> {searchResult.proveedor_id}</p>
            <p><strong>RUC:</strong> {searchResult.ruc_proveedor}</p>
            <p><strong>Nombre:</strong> {searchResult.nombre_proveedor}</p>
            <p><strong>Correo:</strong> {searchResult.correo_proveedor}</p>
            <p><strong>Teléfono:</strong> {searchResult.telefono_proveedor}</p>
            <p><strong>Dirección:</strong> {searchResult.direccion_proveedor}</p>
            <p><strong>Estado:</strong> {searchResult.estado_proveedor}</p>
          </div>
        )}
      </div>

      {/* Tabla de proveedores */}
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
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setFormData(proveedor)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(proveedor.proveedor_id)}
                >
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
