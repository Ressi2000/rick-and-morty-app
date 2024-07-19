import jwtDecode from 'jwt-decode';

export const getDecodedToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return jwtDecode(token);
  }
  return null;
};