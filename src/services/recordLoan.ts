import { ILoan } from "../interfaces/user";
import { POST } from "../utils/generic";

export async function recordLoan(bookLoan: ILoan){

    return POST("Emprestimos",bookLoan,"Erro ao registrar empréstimo !")

}