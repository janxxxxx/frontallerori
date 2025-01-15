import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import { createProveedor } from '../services/api';

const AgregarProveedor = () => {
  const navigate = useNavigate();  // Usamos navigate para redirigir al usuario

  const [formData, setFormData] = useState({
    proveedor_id: '',
    ruc_proveedor: '',
    nombre_proveedor: '',
    correo_proveedor: '',
    telefono_proveedor: '',
    direccion_proveedor: '',
    estado_proveedor: 'activo',
  });

  // Función para guardar el proveedor y redirigir
  const handleSave = async () => {
    try {
      await createProveedor(formData);  // Llamar a la función para crear el proveedor
      alert('Proveedor creado con éxito.');
      navigate('/proveedores');  // Redirigir a la lista de proveedores
    } catch (error) {
      console.error('Error al crear proveedor:', error);
      alert('Error al crear el proveedor.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Agregar Nuevo Proveedor</h1>
      <form className="row g-3">
        {/* Campo para ID del proveedor */}
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="ID Proveedor"
            name="proveedor_id"
            value={formData.proveedor_id}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            required
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

export default AgregarProveedor;
