import { IClient } from "../interfaces/user";
import { getByField, POST } from "../utils/generic";



/**
 * Cadastra um novo cliente da biblioteca.
 * 
 * Antes de realizar o cadastro, verifica se já existe
 * um cliente com o mesmo CPF para evitar duplicidade.
 */

export async function createClient(client: IClient) {

    const exists = await getByField("Clients", "cpf",client.cpf,"Erro ao buscar cliente.");

    if (exists) {
        throw new Error("Cliente já cadastrado.");
    }

    return POST("Clients",client,"Erro ao cadastrar cliente")

}
