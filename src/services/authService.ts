import api_url from "./api";
import { IUser } from "../interfaces/user";
import { hashPassword } from "../utils/pasword";


/**
 * Realiza a autenticação do usuário no sistema.
 * 
 * A função consulta a API buscando um usuário que possua
 * o e-mail e senha informados.
 * 
 * Caso encontre um usuário válido, retorna seus dados.
 * Caso contrário, retorna null.
 */

export async function login( email: string, password: string,
): Promise<IUser | null> {
    const response = await fetch(
        `${api_url}/users?email=${email}`
    );
    
    const users = await response.json();

    if (!users.length) {
        return null;
    }

    const hash = await hashPassword(password);

    const user = users[0];

    if (user.password !== hash) {
        return null;
    }

    return user;

}