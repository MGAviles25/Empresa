import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import FuncionarioForm from './components/FuncionarioForm';
import FuncionarioList from './components/FuncionarioList';
import ProtectedRoute from './ProtectedRoute';  // Importa o componente ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/funcionarios" element={<ProtectedRoute><FuncionarioList /></ProtectedRoute>} />
        <Route path="/funcionario/cadastro" element={<ProtectedRoute><FuncionarioForm /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
  localStorage.setItem('token', response.data.token);
  const token = localStorage.getItem('token');
  <Navigate to="/" />
}

export default App;
