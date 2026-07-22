import { getUser } from "./session";

/**
 * Verifica se existe uma sessão de usuário ativa.
 *
 * Caso não haja um usuário autenticado, o acesso é
 * redirecionado para a página de login. Também controla
 * a visibilidade de funcionalidades administrativas de
 * acordo com o perfil do usuário.
 */

export function checkAuth() {

    const user = getUser();

    if (!user) {
        window.location.href = "/login.html";
        return;
    }

    if (user.role === "Funcionário") {

        const adminElements = document.querySelectorAll(".admin-only");

        adminElements.forEach(element => {
            element.classList.add("hidden");
        });

    }
}



/**
 * Executa a verificação de autenticação sempre que a página
 * é exibida.
 *
 * Também trata páginas restauradas pelo cache do navegador
 * (Back/Forward Cache), forçando o recarregamento para
 * impedir o acesso a páginas protegidas após o logout.
 */

window.addEventListener("pageshow", (event) => {

    if (event.persisted) {
        window.location.reload();
        return;
    }

    checkAuth();

});