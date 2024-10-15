import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../../../../mockdata/Users/users';

const CreateUserModal = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [users, setUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                await getUsers(setUsers);
            } catch (error) {
                console.error('Error al obtener los usuarios.', error);
                setError('Error al obtener los usuarios.');
            }
        };

        if (isOpen) {
            fetchUsers();
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { username, password, role_id: 1 };

        try {
            if (userToEdit) {
                await updateUser(userToEdit.id, newUser);
            } else {
                await createUser(newUser);
            }
            setSuccess(true);
            setError(null);
            setUsername('');
            setPassword('');
            setUserToEdit(null);
            onClose();
            await getUsers(setUsers);
        } catch (err) {
            setError('Error al crear o editar el usuario.');
        }
    };

    const handleEditClick = (user) => {
        setUserToEdit(user);
        setUsername(user.username);
        setPassword('');
    };

    const handleDeleteClick = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error al eliminar el usuario.', error);
            setError('Error al eliminar el usuario.');
        }
    };

    if (!isOpen) return null;

    return (
        <div style={modalStyles}>
            <div style={modalContentStyles}>
                <h2>{userToEdit ? 'Editar Usuario' : 'Crear Usuario Admin'}</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>Operación realizada con éxito!</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre de Usuario:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">{userToEdit ? 'Actualizar' : 'Crear'}</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
                <h3>Usuarios Existentes</h3>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.username}
                            <button onClick={() => handleEditClick(user)}>Editar</button>
                            <button onClick={() => handleDeleteClick(user.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const modalStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyles = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

export default CreateUserModal;
