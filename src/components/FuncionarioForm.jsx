import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FuncionarioForm = () => {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState('');
  const [departamentoId, setDepartamentoId] = useState('');
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      const response = await axios.get('http://localhost:3000/departamento', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setDepartamentos(response.data.listaDepartamentos);
    };
    fetchDepartamentos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const funcionario = { nome, cargo, salario, deptoCodigo: departamentoId };
    await axios.post('http://localhost:3000/funcionario', funcionario, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  };

  return (
    <div>
      <h2>Cadastrar Funcionário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label>Cargo:</label>
          <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} />
        </div>
        <div>
          <label>Salário:</label>
          <input type="number" value={salario} onChange={(e) => setSalario(e.target.value)} />
        </div>
        <div>
          <label>Departamento:</label>
          <select value={departamentoId} onChange={(e) => setDepartamentoId(e.target.value)}>
            <option value="">Selecione um Departamento</option>
            {departamentos.map((departamento) => (
              <option key={departamento.codigo} value={departamento.codigo}>
                {departamento.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default FuncionarioForm;
