import { getUser } from "./session";


/**
 * Verifica se existe um usuário autenticado no sistema.
 * 
 * Também controla a exibição de funcionalidades conforme
 * o nível de acesso do usuário.
 */
export function checkAuth() {

    const user = getUser();


    /**
     * Caso não exista uma sessão ativa, o usuário é redirecionado
     * para a página de login.
     */
    if (!user) {
        window.location.href = "/login.html";
        return;
    }


    /**
     * Usuários com perfil employee não possuem acesso às
     * funcionalidades administrativas.
     * 
     * Elementos marcados com a classe "admin-only" são ocultados.
     */
    if (user.role === "employee") {

        const adminElements = document.querySelectorAll(".admin-only");

        adminElements.forEach(element => {
            element.classList.add("hidden");
        });

    }
}


/**
 * Executa a validação de autenticação sempre que a página
 * é carregada ou restaurada pelo histórico do navegador.
 * 
 * O evento "pageshow" também detecta o uso dos botões
 * voltar/avançar, evitando que páginas protegidas sejam
 * acessadas sem uma sessão válida.
 */
window.addEventListener("pageshow", (event) => {

    if (event.persisted) {
        window.location.reload();
        return;
    }

    checkAuth();

});