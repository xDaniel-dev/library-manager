import { IReturned } from "../interfaces/user";
import { POST } from "../utils/method";

export async function returnLoan(Returned: IReturned){
    return POST("Returned",Returned,"Erro ao registrar devolução")
}


function getLateDays(returnDate: string, currentDate: string): number {
    const expected = new Date(returnDate);
    const current = new Date(currentDate);

    const diff = current.getTime() - expected.getTime();

    if (diff <= 0) return 0;

    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

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