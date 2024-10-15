import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import ProductModal from './CreateProductModal/ProductModal';
import { createProduct as createProductAPI } from '../../../../mockdata/Products/products';
import ProductTable from './ProductTable/ProductTable';
import CreateUserModal from './CreateUserModal/CreateUserModal'; 
import { createUser as createUserAPI } from '../../../../mockdata/Users/users'; 
const AdminDashboard = () => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleCreateProduct = async (product) => {
    await createProductAPI(product, (newProduct) => {
      console.log('Nuevo producto creado:', newProduct);
    });
  };

  const handleCreateUser = async (user) => {
    await createUserAPI(user, (newUser) => {
      console.log('Nuevo usuario creado:', newUser);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };
  

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => setIsProductModalOpen(true)}>Crear Producto</button>
      <button onClick={() => setIsUserModalOpen(true)}>Crear Usuario Admin</button>

      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          margin: '20px 0',
          width: '100%',
          maxWidth: '400px'
        }}
      />

      <button onClick={handleLogout} style={{ marginBottom: '20px', backgroundColor: '#f00', color: '#fff', padding: '10px', borderRadius: '5px' }}>
        Cerrar sesión
      </button>

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        createProduct={handleCreateProduct}
      />
      
      <CreateUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        createUser={handleCreateUser}
      />
      
      <ProductTable searchTerm={searchTerm} />
    </div>
  );
};

export default AdminDashboard;
