import userManager from '../auth/authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const getAllEntityA = async () => {
    const user = await userManager.getUser();

    const response = await fetch(`${API_BASE_URL}/api/entity-a`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${user.access_token}`
        }
    });

    if (!response.ok) throw new Error('Error al obtener entidades');
    return await response.json();
};

export const postEntityA = async (data) => {
    const user = await userManager.getUser();
    
    const response = await fetch(`${API_BASE_URL}/api/entity-a`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.access_token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Error al registrar');
    return await response.json();
};

export const getAllEntityB = async () => {
    const user = await userManager.getUser();

    const response = await fetch(`${API_BASE_URL}/api/entity-b`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${user.access_token}`
        }
    });

    if (!response.ok) throw new Error('Error al obtener entidades');
    return await response.json();
};

export const postEntityB = async (data) => {
    const user = await userManager.getUser();
    
    const response = await fetch(`${API_BASE_URL}/api/entity-b`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.access_token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Error al registrar');
    return await response.json();
};

export const linkEntityAToB = async (entityBId, entityAid) => {
    const user = await userManager.getUser();
    
    const response = await fetch(`${API_BASE_URL}/api/entity-b/${entityBId}/add-entity-a`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.access_token}`
        },
        // Aquí agregamos el id: 0 para evitar el error de mapeo null -> int
        body: JSON.stringify({ 
            id: 0, 
            entityAId: parseInt(entityAid) 
        }) 
    });

    if (!response.ok) throw new Error('Error al vincular las entidades');
    return await response.json();
};