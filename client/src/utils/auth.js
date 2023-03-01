// utilizar esto para decodificar un token y obtener la información del usuario de él
import decode from 'jwt-decode';

// crear una nueva clase para crear una instancia para un usuario
class AuthService {
  // obtener datos del usuario
  getProfile() {
    return decode(this.getToken());
  }

  // verificar si el usuario inició sesión
  loggedIn() {
    // Verifica si hay un token guardado y sigue siendo válido
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // verificar si el token está vencido
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Recupera el token de usuario de localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Guarda el token del usuario en localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Borrar datos de perfil y token de usuario de localStorage
    localStorage.removeItem('id_token');
    // esto recargará la página y restablecerá el estado de la aplicación
    window.location.assign('/');
  }
}

export default new AuthService();
