import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AgregarProveedor from './components/AgregarProveedor'; // Asegúrate de crear este componente
import EditarProveedor from './components/EditarProveedor';
import ProveedoresDashboard from './components/ProveedoresDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProveedoresDashboard />} />
        <Route path="/editar/:id" element={<EditarProveedor />} />
        <Route path="/agregar" element={<AgregarProveedor />} /> {/* Ruta para agregar proveedor */}
      </Routes>
    </Router>
  );
};

export default App;
