import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = 'mi_secreto_super_secreto';

export const generateToken = (username: string) => {
  const payload = { username, exp: Math.floor(Date.now() / 1000) + (60 * 60) }; // Expira en 1 hora
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

export const verifyToken = (token: string) => {
  // Mostrar el token
  console.log('Token a decodificar:', token);

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    // Mostrar el resultado de la decodificación
    console.log('Token decodificado:', decoded);

    if (decoded.exp && decoded.exp <= Math.floor(Date.now() / 1000)) {
      throw new Error('Token expirado');
    }
    return decoded;
  } catch (error) {
    console.error('Error de verificación del token:', error);
    return null;
  }
};
