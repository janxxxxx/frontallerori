import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProveedorById, updateProveedor } from '../services/api';

const EditarProveedor = () => {
  const { id } = useParams();  // Obtener el ID del proveedor desde la URL
  const [formData, setFormData] = useState({
    proveedor_id: '',
    ruc_proveedor: '',
    nombre_proveedor: '',
    correo_proveedor: '',
    telefono_proveedor: '',
    direccion_proveedor: '',
    estado_proveedor: 'activo',
  });

  // Obtener los datos del proveedor por ID
  useEffect(() => {
    const fetchProveedor = async () => {
      try {
        const response = await getProveedorById(id);  // Obtener proveedor por ID
        setFormData(response.data);  // Establecer los datos del proveedor en el formulario
      } catch (error) {
        console.error('Error al cargar los datos del proveedor:', error);
        alert('Error al cargar los datos del proveedor.');
      }
    };

    fetchProveedor();
  }, [id]);

  // Manejar la actualización del proveedor
  const handleSave = async () => {
    try {
      await updateProveedor(id, formData);  // Llamar a la función para actualizar el proveedor
      alert('Proveedor actualizado con éxito.');
      window.close();  // Cerrar la ventana emergente después de guardar
      if (window.opener && window.opener.fetchProveedores) {
        window.opener.fetchProveedores();  // Llamar a la función fetchProveedores de la ventana principal para actualizar la lista
      }
    } catch (error) {
      console.error('Error al actualizar proveedor:', error);
      alert('Error al actualizar el proveedor.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Editar Proveedor</h1>
      <form className="row g-3">
        {/* Campo para ID del proveedor */}
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="ID Proveedor"
            name="proveedor_id"
            value={formData.proveedor_id}
            disabled  // No permitir la edición del ID, solo mostrarlo
          />
        </div>

        {/* Campo para RUC */}
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="RUC"
            name="ruc_proveedor"
            value={formData.ruc_proveedor}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            required
          />
        </div>

        {/* Campo para Nombre */}
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            name="nombre_proveedor"
            value={formData.nombre_proveedor}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            required
          />
        </div>

        {/* Campo para Correo */}
        <div className="col-md-4">
          <input
            type="email"
            className="form-control"
            placeholder="Correo"
            name="correo_proveedor"
            value={formData.correo_proveedor}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            required
          />
        </div>

        {/* Campo para Teléfono */}
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Teléfono"
            name="telefono_proveedor"
            value={formData.telefono_proveedor}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            required
          />
        </div>

        {/* Campo para Dirección */}
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Dirección"
            name="direccion_proveedor"
            value={formData.direccion_proveedor}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            required
          />
        </div>

        {/* Campo para Estado */}
        <div className="col-md-4">
          <select
            className="form-control"
            name="estado_proveedor"
            value={formData.estado_proveedor}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        {/* Botón para guardar */}
        <div className="col-md-4">
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarProveedor;
