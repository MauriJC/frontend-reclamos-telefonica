import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001', // Reemplaza esto con tu URL base
    timeout: 10000, // Tiempo de espera en milisegundos
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':  '*',
    }
}
);

api.interceptors.request.use(
    config => {
      // Aquí puedes agregar lógica para modificar la configuración de la solicitud, como agregar un token de autenticación
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  )

  api.interceptors.response.use(
    response => response,
    error => {
      // Aquí puedes manejar errores globalmente, como redirigir al usuario a la página de login si hay un error 401
      if (error.response && error.response.status === 401) {
        // Redirigir al usuario a la página de login
      }
      return Promise.reject(error);
    }
  );

  export default api;

