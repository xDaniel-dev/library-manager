import { ILoan } from "../interfaces/user";
import { POST } from "../utils/method";
import api_url from "./api";

export async function recordLoan(bookLoan: ILoan){

    return POST("Loan",bookLoan,"Erro ao registrar empréstimo !")

}

export async function getLoan() {
    try {
        const response = await fetch(`${api_url}/Loan`);

        if (!response.ok) {
            throw new Error("Erro ao buscar os livros alugados.");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}