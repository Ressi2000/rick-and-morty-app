const API_URL = 'http://localhost:3000'; // Cambia esto a tu URL de API

export const fetchUserData = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener datos del usuario');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};