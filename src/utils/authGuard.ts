import { getUser } from "./session";

export function checkAuth() {
    const user = getUser();

    // Verifica se existe usuário logado
    if (!user) {
        window.location.href = "/login.html";
        return;
    }

    // Esconde elementos exclusivos do administrador para funcionários
    if (user.role === "employee") {
        const adminElements = document.querySelectorAll(".admin-only");

        adminElements.forEach(element => {
            element.classList.add("hidden");
        });
    }
}

window.addEventListener("pageshow", (event) => {

    // Detecta quando o navegador recupera uma página pelo botão voltar/avançar
    if (event.persisted) {
        window.location.reload();
        return;
    }

    checkAuth();

});