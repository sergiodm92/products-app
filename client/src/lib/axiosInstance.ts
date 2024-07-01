import axios from "axios";
import config from "../../config";

const axiosInstance = axios.create({
  baseURL: config.apiUrl, // Usa una variable de entorno para la URL base
  timeout: 10000, // Puedes ajustar el tiempo de espera según sea necesario
});

// Puedes agregar interceptores aquí si los necesitas

export default axiosInstance;
