import { IUser } from "../interfaces/user";
import { getByField, POST } from "../utils/generic";


/**
 * Cadastra um novo funcionario da biblioteca.
 * 
 * Antes de realizar o cadastro, verifica se já existe
 * um funcionario com o mesmo CPF para evitar duplicidade.
 */

export async function createEmployee(employee: IUser) {

    const exists = await getByField("Users","cpf",employee.cpf,"Erro ao buscar funcionário.");

    if (exists) {
        throw new Error("Funcionário já cadastrado.");
    }

    return POST("Users",employee,"Erro ao cadastrar funcinário !")
}
