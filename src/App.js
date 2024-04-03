import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import config from './utils/config';
import './App.css';
const currentEnvironment = process.env.NODE_ENV || 'development';
const apiEndpoint = config[currentEnvironment].apiEndpoint;

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      //new user
      const response = await axios.post(apiEndpoint + 'user/new', { email, password });

      if (response.status === 200) {
        console.log('Autenticação bem-sucedida!');
      } else {
        setError('Credenciais inválidas. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao chamar a API:', error);
      setError('Erro ao autenticar. Tente novamente mais tarde.');
    }
  };

  return (
    
    <div className="login-container">
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <h2 className='title'>Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label">Senha:</label>
            <input type="password" className="form-control" id="senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default App;
