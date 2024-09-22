import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FuncionarioList = () => {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      const response = await axios.get('http://localhost:3000/funcionario', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFuncionarios(response.data.listaFuncionarios);
    };
    fetchFuncionarios();
  }, []);

  return (
    <div>
      <h2>Lista de Funcionários</h2>
      <ul>
        {funcionarios.map((funcionario) => (
          <li key={funcionario.codigo}>
            {funcionario.nome} - {funcionario.cargo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FuncionarioList;
