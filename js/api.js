// js/api.js

import { BASE_URL, PEXELS_API_KEY } from './config.js';

export async function fetchRestaurantes(categoria = null) {
  let urlFinal = BASE_URL;
  if (categoria) {
    urlFinal = `${BASE_URL}/categoria/${categoria.toLowerCase()}`;
  }
  const response = await fetch(urlFinal);
  if (!response.ok) {
    throw new Error(`API de Restaurantes respondeu com status ${response.status}`);
  }
  return response.json();
}

export async function fetchImagensPexels(query, perPage = 40) {
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`;
  
  if (!PEXELS_API_KEY || PEXELS_API_KEY === 'SUA_CHAVE_DA_API_DO_PEXELS_VEM_AQUI') {
    console.error("Chave da API do Pexels não foi definida no arquivo config.js!");
    return []; 
  }

  const response = await fetch(url, {
    headers: {
      Authorization: PEXELS_API_KEY
    }
  });

  if (!response.ok) {
    throw new Error(`API do Pexels respondeu com status ${response.status}`);
  }
  const data = await response.json();
  return data.photos.map(photo => photo.src.large); 
}