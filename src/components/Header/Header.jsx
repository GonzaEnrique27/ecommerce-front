import React, { useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import AdminLogin from '../../pages/Admin/AdminLogin/AdminLogin';
import './Header.css';

const Header = ({ onSearchChange }) => { 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <nav className="navbar">
      <a className="navbar-brand" href="/">
        <img
          alt="Logo"
          className="img-fluid"
          src="https://upload.wikimedia.org/wikipedia/commons/2/26/Logo_Sitio_Web.png"
        />
      </a>
      <div className="navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={openModal}>Login</a>
          </li>
        </ul>
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input 
            className="search-input" 
            type="text" 
            placeholder="Search" 
            onChange={handleSearchChange}
          />
          <button className="search-button" type="button">
            <FaSearch />
          </button>
        </form>
      </div>
      {isModalOpen && (
        <div className="admin-login-modal-container">
          <AdminLogin closeModal={closeModal} />
        </div>
      )}
    </nav>
  );
};

export default Header;
