import { IClient } from "../interfaces/user";
import { getByField, POST } from "../utils/method";
import api_url from "./api";



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

export async function getClient(): Promise<IClient[]> {
    try {
        const response = await fetch(`${api_url}/Clients`);

        if (!response.ok) {
            throw new Error("Erro ao buscar os clientes.");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}