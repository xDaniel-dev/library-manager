import api_url from "./api";
import { IUser } from "../interfaces/user";


/**
 * Realiza a autenticação do usuário no sistema.
 * 
 * A função consulta a API buscando um usuário que possua
 * o e-mail e senha informados.
 * 
 * Caso encontre um usuário válido, retorna seus dados.
 * Caso contrário, retorna null.
 */

export async function login(
    email: string,
    password: string,
): Promise<IUser | null> {
    /**
     * Realiza uma requisição GET para a API.
     * 
     * O json-server permite filtrar registros utilizando
     * parâmetros na URL.
     * 
     * Exemplo:
     * /users?email=usuario@email.com&password=123
     */
    const response = await fetch(
        `${api_url}/users?email=${email}&password=${password}`
    );


    /**
     * Converte a resposta da API para um array de usuários.
     * 
     * Mesmo buscando apenas um usuário, o json-server retorna
     * uma lista de resultados.
     */
    const users: IUser[] = await response.json();


    /**
     * Verifica se nenhum usuário foi encontrado.
     * 
     * Caso o array esteja vazio, significa que o e-mail
     * ou senha estão incorretos.
     */
    if (users.length === 0) {
        return null;
    }


    /**
     * Retorna o primeiro usuário encontrado.
     * 
     * Como a busca utiliza e-mail e senha, espera-se que
     * exista apenas um resultado.
     */
    return users[0];

}