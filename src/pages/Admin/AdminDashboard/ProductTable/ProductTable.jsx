import React, { useEffect, useState } from 'react';
import { getProducts, updateProduct, deleteProduct } from '../../../../../mockdata/Products/products';
import { getBrands } from '../../../../../mockdata/Brands/brands';

const ProductTable = ({ searchTerm }) => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]); 
    const [editProductId, setEditProductId] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState({});

    useEffect(() => {
        getProducts(setProducts);
        getBrands(setBrands);
    }, []);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleEdit = (product) => {
        setEditProductId(product.id);
        setUpdatedProduct(product);
    };

    const handleUpdate = async (id) => {
        await updateProduct(id, updatedProduct, setProducts);
        setEditProductId(null);
        setUpdatedProduct({});
        getProducts(setProducts);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id, setProducts);
        getProducts(setProducts);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
            <h1 style={{ color: '#333', marginBottom: '20px' }}>Lista de Productos</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <thead>
                    <tr style={{ backgroundColor: '#007BFF', color: 'white' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Nombre</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Descripción</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Imagen</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Precio</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Marca</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.id} style={{ borderBottom: '1px solid #ccc' }}>
                            <td style={{ padding: '10px' }}>{product.id}</td>
                            {editProductId === product.id ? (
                                <>
                                    <td style={{ padding: '10px' }}>
                                        <input
                                            type="text"
                                            name="name"
                                            value={updatedProduct.name || ''}
                                            onChange={handleEditChange}
                                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        <input
                                            type="text"
                                            name="description"
                                            value={updatedProduct.description || ''}
                                            onChange={handleEditChange}
                                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        <input
                                            type="text"
                                            name="image_url"
                                            value={updatedProduct.image_url || ''}
                                            onChange={handleEditChange}
                                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        <input
                                            type="number"
                                            name="price"
                                            value={updatedProduct.price || ''}
                                            onChange={handleEditChange}
                                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        <select
                                            name="brand_id" 
                                            value={updatedProduct.brand_id || ''} 
                                            onChange={handleEditChange}
                                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        >
                                            <option value="">Selecciona una marca</option>
                                            {brands.map(brand => (
                                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        <button onClick={() => handleUpdate(product.id)} style={{ padding: '8px 12px', marginRight: '5px', backgroundColor: '#28A745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Guardar</button>
                                        <button onClick={() => setEditProductId(null)} style={{ padding: '8px 12px', backgroundColor: '#DC3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancelar</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td style={{ padding: '10px' }}>{product.name}</td>
                                    <td style={{ padding: '10px' }}>{product.description}</td>
                                    <td style={{ padding: '10px' }}>
                                        <img src={product.image_url} alt={product.name} style={{ width: '50px', borderRadius: '4px' }} />
                                    </td>
                                    <td style={{ padding: '10px' }}>{product.price}</td>
                                    <td style={{ padding: '10px' }}>{product.Brand.name}</td>
                                    <td style={{ padding: '10px' }}>
                                        <button onClick={() => handleEdit(product)} style={{ padding: '8px 12px', marginRight: '5px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Editar</button>
                                        <button onClick={() => handleDelete(product.id)} style={{ padding: '8px 12px', backgroundColor: '#DC3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Eliminar</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
