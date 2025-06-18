// js/auth.js

/**
 * Decodifica o payload de um token JWT.
 * Não valida a assinatura, apenas extrai as informações.
 * @param {string} token O token JWT
 * @returns {object|null} O payload do token como um objeto.
 */
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Erro ao decodificar o token JWT:", e);
    return null;
  }
}

/**
 * Pega o token do localStorage, o decodifica e retorna um objeto de usuário padronizado.
 * @returns {object|null} O objeto do usuário com Id e Nome, ou null.
 */
function getUsuarioLogado() {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  const decodedToken = parseJwt(token);
  
  // Verifica se o token não expirou
  if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
    // Retorna um objeto no formato que o resto da nossa aplicação espera
    return {
      Id: decodedToken.nameid,
      Nome: decodedToken.unique_name,
      // Você pode adicionar outras informações do token aqui se precisar
      Foto: "imagens/usuario-de-perfil.svg" // Foto padrão, já que não vem no token
    };
  }

  // Se o token expirou ou é inválido, limpa o localStorage
  localStorage.removeItem('token');
  return null;
}

/**
 * Limpa o token de login e recarrega a página.
 */
function handleLogout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

/**
 * Configura a navbar para mostrar "ENTRAR" ou "Olá, [Nome]".
 * Esta função não precisa mudar, pois ela depende do resultado de getUsuarioLogado().
 */
export function configurarNavbar() {
  const userSection = document.getElementById('nav-user-section');
  if (!userSection) {
    return;
  }

  const usuario = getUsuarioLogado();

  if (usuario && usuario.Nome) {
    userSection.innerHTML = `
      <span class="navbar-text me-3">
        Olá, <strong>${usuario.Nome.split(' ')[0]}</strong>
      </span>
      <button id="btn-logout" class="btn btn-link text-secondary ms-2">Sair</button>
    `;
    document.getElementById('btn-logout').addEventListener('click', handleLogout);
  } else {
    userSection.innerHTML = '<a href="login.html" class="btn btn-primary fw-bold">ENTRAR</a>';
  }
}

// Exportando as funções para serem usadas em outros lugares
export { getUsuarioLogado, handleLogout };