import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../mockdata/Products/products';
import './ProductDetail.css'; 
import Header from '../../components/Header/Header';

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      await getProductById(id, setProduct);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="loading">Loading...</div>; 
  }

  return ( 
  <>
  <Header/>
    <div className="product-detail-container">
      <div className="product-image-container">
        <img src={product.image_url} alt={product.name} className="product-detail-image" />
      </div>
      <div className="product-info">
        <h2 className="product-detail-title">{product.name}</h2>
        <div className="product-brand">
          <img src={product.Brand.logo_url} alt={product.Brand.name} className="brand-logo" />
          <span> Brand: {product.Brand.name}</span>
        </div>
        <p className="product-detail-description">{product.description}</p>
        <p className="product-detail-price">${product.price}</p>
      </div>
    </div>
    </>
  );
};

export default ProductDetail;
