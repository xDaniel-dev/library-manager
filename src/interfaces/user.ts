/**
 * Representa um usuário do sistema.
 *
 * Define a estrutura dos dados utilizados para autenticação,
 * identificação e controle de acesso dos funcionários da biblioteca.
 * Cada usuário possui um nível de permissão (role), que determina
 * as funcionalidades disponíveis no sistema.
 */
export interface IUser {
    id?: number;
    name: string;
    cpf: string;
    email: string;
    telephone: string;
    date: string;
    password: string;
    role: string;
}

/**
 * Representa um livro do acervo da biblioteca.
 *
 * Define as informações necessárias para o cadastro e gerenciamento
 * dos livros, incluindo dados de identificação, autoria, editora,
 * categoria, idioma e descrição.
 */
export interface IBook {
    id?: number;
    name: string;
    isbn: string;
    author: string;
    publisher: string;
    category: string;
    year: string;
    language: string;
    description: string;
}

/**
 * Representa um cliente cadastrado na biblioteca.
 *
 * Define a estrutura dos dados pessoais e de contato utilizados
 * para identificar os clientes e permitir o gerenciamento de
 * empréstimos, devoluções e demais operações do sistema.
 */
export interface IClient {
    id?: number;
    name: string;
    cpf: string;
    email: string;
    telephone: string;
    date: string;
    address: string;
    cite: string;
    state: string;
    cep: string;
}

export interface ILoan {
    id?: number;
    name: string;
    cpf: string;
    book: string;
    employee: string;
    dateLoan: string;
    dateReturn: string;
    observations: string;
    code: string;
}

export interface IReturned {
    id?: number;
    name: string;
    book: string;
    employee: string;
    dateLoan: string;
    dateReturn: string;
    situation: string;
    fine: string;
    observations: string;
    code: string;
}

