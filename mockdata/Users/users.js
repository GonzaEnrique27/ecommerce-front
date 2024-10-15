import CONFIG from '../config.js';

const BASE_URL = `${CONFIG.BASE_URL}/users`;

const getUsers = async (setter) => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        setter(users); 
    } catch (error) {
        console.error('Error al obtener los usuarios.', error);
    }
};

const getUserById = async (id, setter) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        const user = await response.json();
        setter(user);
    } catch (error) {
        console.error('Error al obtener el usuario por ID.', error);
    }
};

const createUser = async (user) => {
    try {
        const response = await fetch(BASE_URL , { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); 
        }

        const newUser = await response.json();
        return newUser;
    } catch (error) {
        console.error('Error al crear el usuario.', error);
        throw error; 
    }
};


const updateUser = async (id, user, setter) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const updatedUser = await response.json();
        setter(updatedUser);
    } catch (error) {
        console.error('Error al actualizar el usuario.', error);
    }
};

const deleteUser = async (id, setter) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setter({ message: 'Usuario eliminado' });
        } else {
            const result = await response.json();
            setter(result);
        }
    } catch (error) {
        console.error('Error al eliminar el usuario.', error);
    }
};

export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
