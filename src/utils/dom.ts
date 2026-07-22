import { IUser } from "../interfaces/user"


/**
 * Redireciona o usuário para a página correta conforme seu nível de acesso.
 * 
 * Atualmente todos os perfis utilizam o mesmo dashboard,
 * porém a validação do role mantém a estrutura preparada
 * para futuras páginas ou permissões diferentes.
 */
export function redirectByRole(user: IUser): void {

    if (user.role === "Gerente" || user.role === "Funcionário") {
        window.location.href = "/dashboard.html";
        return;
    }

    window.location.href = "/login.html";

}


/**
 * Adiciona um redirecionamento de página a um elemento HTML.
 * 
 * Utilizado para controlar navegação através de botões,
 * cards ou links da interface.
 */
export function redirect(id: string, page: string): void {

    const element = document.getElementById(id);

    if (!element) return;

    element.addEventListener("click", () => {
        window.location.href = page;
    });

}


/**
 * Altera um atributo de um elemento HTML.
 * 
 * Utilizada principalmente para manipulação dinâmica
 * de atributos como imagens, textos ou propriedades
 * de elementos da página.
 */
export function setElementAttribute(
    id: string,
    atribute: string,
    img: string
): void {

    const element = document.getElementById(id);

    if (!element) return;

    element.setAttribute(atribute, img);

}


/**
 * Busca um elemento HTML pelo ID garantindo sua tipagem.
 * 
 * Diferente do getElementById padrão, essa função lança
 * um erro caso o elemento não exista, evitando trabalhar
 * com valores nulos durante a execução.
 */
export function byId<T extends HTMLElement>(id: string): T {

    const element = document.getElementById(id);

    if (!element) {
        throw new Error(`Elemento "${id}" não encontrado.`);
    }

    return element as T;

}

