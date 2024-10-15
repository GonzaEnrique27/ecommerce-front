import React, { useEffect, useState } from 'react';
import { getProducts } from '../../../../mockdata/Products/products'; 
import { useNavigate } from 'react-router-dom'; 
import './ProductCard.css'; 

const ProductCard = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts(setProducts);
  }, []);

  const handleProductDetail = (productId) => {
    navigate(`/product/${productId}`); 
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <div key={product.id} className="product-card">
          <img 
            src={product.image_url}
            alt={product.name} 
            className="product-image" 
          />
          <div className="product-info">
            <h3 className="product-title">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>
            <button 
              className="add-to-cart-button"
              onClick={() => handleProductDetail(product.id)} 
            >
              Product Detail
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
