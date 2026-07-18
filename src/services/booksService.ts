import { IBook } from "../interfaces/user";
import api_url from "./api";


/**
 * Cadastra um novo livro na biblioteca.
 * 
 * Antes de realizar o cadastro, verifica se já existe
 * um livro com o mesmo ISBN para evitar duplicidade.
 */
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
        throw new Error("Erro ao cadastrar livro");
    }


    return await response.json();
}


/**
 * Busca um livro pelo ISBN informado.
 * 
 * Utilizada antes do cadastro para validar se o livro
 * já está registrado no acervo.
 */
async function getBookByIsbn(isbn: number): Promise<IBook | null> {

    const response = await fetch(`${api_url}/Books?isbn=${isbn}`);

    if (!response.ok) {
        throw new Error("Erro ao buscar livro.");
    }


    const books: IBook[] = await response.json();

    return books.length > 0 ? books[0] : null;
}

export async function getBooks(): Promise<IBook[]> {
    try {
        const response = await fetch(`${api_url}/Books`);

        if (!response.ok) {
            throw new Error("Erro ao buscar os livros.");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}