import axios from 'axios';

const api = axios.create({
  baseURL: 'https://humanlink-api-production.up.railway.app/humanlink',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'chave123', // se seu backend estiver validando isso
  },
});

export default api;