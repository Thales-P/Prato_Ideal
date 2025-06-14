// js/ui.js

export function renderizarCards(listaRestaurantes, listaImagens, container) {
  container.innerHTML = '';
  const restaurantesValidos = listaRestaurantes.filter(restaurante => restaurante.Nome);

  if (!restaurantesValidos || restaurantesValidos.length === 0) {
    container.innerHTML = '<div class="col-12"><p class="text-muted text-center">Nenhum restaurante encontrado.</p></div>';
    return;
  }

  restaurantesValidos.forEach((restaurante, index) => {
    // Usa a foto do banco se existir, senão usa uma imagem da lista do Pexels.
    const placeholderUrl = listaImagens[index % listaImagens.length] || 'https://placehold.co/400x300?text=Sem+Imagem';
    const imageUrl = restaurante.Foto || placeholderUrl;

    let ratingHtml = '<p class="text-muted small mb-1">Sem avaliações</p>';
    if (restaurante.AvaliacaoMedia != null) {
      ratingHtml = `<p class="mb-1 rating">${'⭐'.repeat(Math.round(restaurante.AvaliacaoMedia))} <span class="text-muted small">(${restaurante.AvaliacaoMedia.toFixed(1)})</span></p>`;
    }

    let enderecoHtml = '<p class="text-muted small mt-auto">Endereço não informado</p>';
    if (restaurante.Endereco && restaurante.Endereco.Cidade && restaurante.Endereco.Estado) {
      enderecoHtml = `<p class="text-muted small mt-auto">${restaurante.Endereco.Cidade}, ${restaurante.Endereco.Estado}</p>`;
    }

    const cardHtml = `
      <div class="col-md-3">
        <div class="card restaurant-card h-100">
          <img src="${imageUrl}" class="card-img-top" alt="Foto do ${restaurante.Nome}">
          <div class="card-body d-flex flex-column">
            <h6 class="card-title">${restaurante.Nome}</h6>
            ${ratingHtml}
            ${enderecoHtml}
          </div>
        </div>
      </div>
    `;
    container.innerHTML += cardHtml;
  });
}

export function mostrarSpinner(container) {
  container.innerHTML = `<div class="col-12 text-center mt-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>`;
}

export function mostrarErro(container, error) {
  console.error('ERRO CRÍTICO:', error);
  container.innerHTML = `<div class="col-12"><p class="text-danger text-center">Ops! Falha na comunicação com a API.</p></div>`;
}