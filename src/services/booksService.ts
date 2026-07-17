import { IBook } from "../interfaces/user";
import api_url from "./api";

export async function createBook(book: IBook) {
    const exists = await getBookByIsbn(book.isbn);

    if (exists) {
        throw new Error("Livro já cadastrado.");
    }

    const response = await fetch(`${api_url}/Books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book)
    })

    if (!response.ok) {
        throw new Error("Erro ao cadastrar livro")
    }

    return await response.json()
}

async function getBookByIsbn(isbn: number): Promise<IBook | null> {
    const response = await fetch(`${api_url}/Books?isbn=${isbn}`);

    if (!response.ok) {
        throw new Error("Erro ao buscar livro.");
    }

    const books: IBook[] = await response.json();
    console.log(books)

    return books.length > 0 ? books[0] : null;
}