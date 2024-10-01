import SERVER_IP from '../config/SERVER_IP.js';
const getToken = () => sessionStorage.getItem('jwt');

// Função fetch com token automaticamente no cabeçalho
const apiFetch = (url, options = {}) => {
  const token = getToken();

  const headers = {
    'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho
    'Content-Type': 'application/json',
    ...options.headers, // Mescla qualquer outro cabeçalho enviado
  };

  // Retorna a função fetch com as opções definidas
  return fetch(SERVER_IP + url, {
    ...options,
    headers: headers,
  });
};

export default apiFetch;