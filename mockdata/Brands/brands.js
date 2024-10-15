import CONFIG from '../config.js';

const BASE_URL = `${CONFIG.BASE_URL}/brands`;

const getBrands = async (setter) => {
    try {
        const response = await fetch(BASE_URL);
        const brands = await response.json();
        setter(brands);
    } catch (error) {
        console.error('Error al obtener las marcas.', error);
    }
};

const getBrandById = async (id, setter) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        const brand = await response.json();
        setter(brand);
    } catch (error) {
        console.error('Error al obtener la marca por ID.', error);
    }
};

const createBrand = async (brand, setter) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(brand),
        });
        const newBrand = await response.json();
        setter(newBrand);
    } catch (error) {
        console.error('Error al crear la marca.', error);
    }
};

const updateBrand = async (id, brand, setter) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(brand),
        });
        const updatedBrand = await response.json();
        setter(updatedBrand);
    } catch (error) {
        console.error('Error al actualizar la marca.', error);
    }
};

const deleteBrand = async (id, setter) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setter({ message: 'Marca eliminada' });
        } else {
            const result = await response.json();
            setter(result);
        }
    } catch (error) {
        console.error('Error al eliminar la marca.', error);
    }
};

export {
    getBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
};
