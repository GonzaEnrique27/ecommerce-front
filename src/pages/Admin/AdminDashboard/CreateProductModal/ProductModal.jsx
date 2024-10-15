import React, { useState, useEffect } from 'react';
import { getBrands } from '../../../../../mockdata/Brands/brands';
import './ProductModal.css'

const ProductModal = ({ isOpen, onClose, createProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [brandId, setBrandId] = useState('');
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (isOpen) {
      getBrands(setBrands);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      description,
      image_url: imageUrl,
      price,
      brand_id: brandId,
    };
    await createProduct(product);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="product-modal-container">
      <div className="product-modal">
        <h2>Crear Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="product-modal-form-group">
            <label>Nombre:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="product-modal-form-group">
            <label>Descripción:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="product-modal-form-group">
            <label>URL de Imagen:</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>
          <div className="product-modal-form-group">
            <label>Precio:</label>
            <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="product-modal-form-group">
            <label>Marca:</label>
            <select value={brandId} onChange={(e) => setBrandId(e.target.value)} required>
              <option value="">Selecciona tu marca</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="product-modal-submit-button">Crear Producto</button>
          <button type="button" onClick={onClose} className="product-modal-submit-button">Cerrar</button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
