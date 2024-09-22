import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/Autenticacao/login', { usuario, senha });
      localStorage.setItem('token', response.data.token);
      navigate('/funcionarios'); // Redireciona para a tela de funcionários
    } catch (error) {
      setErro('Usuário ou senha inválidos');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuário:</label>
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      {erro && <p>{erro}</p>}
    </div>
  );
};

export default Login;
