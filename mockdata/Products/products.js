import CONFIG from '../config.js';

const BASE_URL = `${CONFIG.BASE_URL}/products`;

const getProducts = async (setter) => {
    try {
        const response = await fetch(BASE_URL);
        const products = await response.json();
        setter(products);
    } catch (error) {
        console.error('Error al obtener los productos.', error);
    }
};

const getProductById = async (id, setter) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        const product = await response.json();
        setter(product);
    } catch (error) {
        console.error('Error al obtener el producto por ID.', error);
    }
};

const createProduct = async (product, setter) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        const newProduct = await response.json();
        setter(newProduct);
    } catch (error) {
        console.error('Error al crear el producto.', error);
    }
};

const updateProduct = async (id, product, setter) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        const updatedProduct = await response.json();
        setter(updatedProduct);
    } catch (error) {
        console.error('Error al actualizar el producto.', error);
    }
};

const deleteProduct = async (id, setter) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setter({ message: 'Producto eliminado' });
        } else {
            const result = await response.json();
            setter(result);
        }
    } catch (error) {
        console.error('Error al eliminar el producto.', error);
    }
};

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
