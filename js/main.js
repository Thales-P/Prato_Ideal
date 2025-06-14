// js/main.js

import { RESTAURANTES_CONTAINER_ID, TIPO_BTN_ID } from './config.js';
import { fetchRestaurantes, fetchImagensPexels } from './api.js';
import { renderizarCards, mostrarSpinner, mostrarErro } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const restaurantesContainer = document.getElementById(RESTAURANTES_CONTAINER_ID);
  const tipoBtn = document.getElementById(TIPO_BTN_ID);

  async function carregarConteudo(categoria = null) {
    mostrarSpinner(restaurantesContainer);
    try {
      const [restaurantes, imagens] = await Promise.all([
        fetchRestaurantes(categoria),
        fetchImagensPexels('restaurant food', 40)
      ]);
      
      renderizarCards(restaurantes, imagens, restaurantesContainer);
    } catch (error) {
      mostrarErro(restaurantesContainer, error);
    }
  }

  window.selectFilter = function(tipo, valor) {
    if (tipo === 'tipo') {
      tipoBtn.innerHTML = valor ? `${valor} 🍽️` : 'Tipo 🍽️';
      carregarConteudo(valor);
    }
  };

  carregarConteudo();
});