import { IBook } from "../interfaces/user";
import { getByField, POST } from "../utils/method";
import api_url from "./api";

/**
 * Cadastra um novo livro na biblioteca.
 *
 * Antes de realizar o cadastro, verifica se já existe um
 * livro com o mesmo ISBN para evitar registros duplicados.
 *
 * @param book Dados do livro a ser cadastrado.
 * @returns O livro cadastrado.
 * @throws Error Caso já exista um livro com o mesmo ISBN
 * ou ocorra um erro durante o cadastro.
 */

export async function createBook(book: IBook) {

    const exists = await getByField("Books","isbn",book.isbn,"Erro ao buscar livro.")

    if (exists) {
        throw new Error("Livro já cadastrado.");
    }

   return POST("Books",book,"Erro ao cadastrar livro")
}


/**
 * Obtém todos os livros cadastrados na biblioteca.
 *
 * Realiza uma requisição para a API e retorna a lista
 * completa de livros. Em caso de erro, retorna um
 * array vazio.
 *
 * @returns Lista de livros cadastrados.
 */

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
