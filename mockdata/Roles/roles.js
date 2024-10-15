import CONFIG from '../config.js';

const BASE_URL = `${CONFIG.BASE_URL}/getRoles`;

const getRoles = async (setter) => {
    try {
        const response = await fetch(BASE_URL);
        const roles = await response.json();
        setter(roles);
    } catch (error) {
        console.error('Error al obtener los roles.', error);
    }
};

export { getRoles };
