/**
 * Representa a estrutura de um usuário do sistema.
 * 
 * Essa interface é utilizada para definir o formato dos dados
 * dos usuários cadastrados, incluindo informações de autenticação
 * e o nível de permissão de acesso.
 */

export interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: "manager" | "employee";
}

/**
 * Representa a estrutura de um livro cadastrado no sistema.
 * 
 * Essa interface define os dados necessários para o gerenciamento
 * do acervo da biblioteca.
 */

export interface IBook {
    id?: number;
    title: string;
    isbn: number;
    author: string;
    publisher: string;
    category: string;
    year: number;
    language: string;
    description: string;
}
