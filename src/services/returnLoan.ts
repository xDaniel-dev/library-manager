import { IReturned } from "../interfaces/user";
import { POST } from "../utils/method";


/**
 * Registra uma devolução de livro no banco de dados.
 */
export async function returnLoan(Returned: IReturned){
    return POST("Returned",Returned,"Erro ao registrar devolução")
}

/**
 * Calcula a quantidade de dias de atraso entre a data prevista
 * para devolução e a data atual.
 * Caso não exista atraso, retorna 0.
 */
function getLateDays(returnDate: string, currentDate: string): number {
    const expected = new Date(returnDate);
    const current = new Date(currentDate);

    const diff = current.getTime() - expected.getTime();

    if (diff <= 0) return 0;

    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Calcula o valor da multa de acordo com a situação da devolução.
 *
 * - Devolvido: R$ 2,00 por dia de atraso.
 * - Livro danificado: multa fixa de R$ 30,00.
 * - Livro perdido: multa fixa de R$ 100,00.
 * - Qualquer outra situação: sem multa.
 */
export function calculateFine(
    situation: string,
    returnDate: string,
    currentDate: string
): number {

    switch (situation) {

        case "Devolvido":
            const dias = getLateDays(returnDate, currentDate);
            return dias * 2;

        case "Livro danificado":
            return 30;

        case "Livro perdido":
            return 100;

        default:
            return 0;
    }
}