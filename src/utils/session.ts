import { IUser } from "../interfaces/user";


/**
 * Chave utilizada para identificar a sessão do usuário
 * armazenada no sessionStorage.
 */

const session_key = "libraryUser";


/**
 * Salva os dados do usuário autenticado na sessão atual.
 * 
 * O objeto é convertido para JSON antes de ser armazenado,
 * pois o sessionStorage aceita apenas valores em formato string.
 */
export function saveUser(user: IUser): void {

    sessionStorage.setItem(
        session_key,
        JSON.stringify(user)
    );

}


/**
 * Recupera os dados do usuário armazenados na sessão.
 * 
 * Retorna null caso não exista nenhum usuário autenticado.
 */
export function getUser(): IUser | null {

    const user = sessionStorage.getItem(session_key);

    if (!user) {
        return null;
    }

    return JSON.parse(user);

}


/**
 * Realiza o logout do usuário.
 * 
 * Remove a sessão atual e redireciona para a página informada.
 * Também manipula o histórico do navegador para evitar que
 * o usuário retorne para páginas protegidas após sair.
 */
export function logout(id: string, path: string): void {

    const button = document.getElementById(id);

    if (!button) return;


    button.addEventListener("click", () => {

        sessionStorage.removeItem(session_key);


        /**
         * Evita que a página anterior fique disponível
         * através do histórico do navegador.
         */
        history.pushState(null, "", location.href);


        window.location.replace(path);

    });

}

