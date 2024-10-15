import React, { useState, useRef, useEffect } from 'react';
import { FaGoogle } from 'react-icons/fa';
// @ts-ignore
import { getUsers } from '../../../../mockdata/Users/users';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext/AuthContext';
import './AdminLogin.css';

const AdminLogin = ({ closeModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!username || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    if (!usernameRegex.test(username)) {
      setError('El nombre de usuario debe tener entre 3 y 20 caracteres y solo puede incluir letras, números y guiones bajos.');
      return;
    }
    if (!passwordRegex.test(password)) {
      setError('La contraseña debe tener al menos 6 caracteres, incluyendo letras y números.');
      return;
    }

    const users = await new Promise((resolve) => getUsers(resolve));
    const user = users.find((user) => user.username === username);

    if (!user || user.password !== password) {
      setError('Usuario o contraseña incorrectos.');
      return;
    }

    login();
    closeModal();
    navigate('/admin/dashboard');
  };

  return (
    <div className="admin-login-modal">
      <div className="form-container-login" ref={modalRef}>
        <h2 className="title">Login</h2>
        {error && <div className="admin-login-error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="sign-login">Iniciar Sesión</button>
        </form>
        <div className="social-message">
          <div className="line"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
