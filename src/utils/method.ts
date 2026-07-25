import api_url from "../services/api";

/**
 * Realiza uma requisição HTTP do tipo POST.
 *
 * Envia os dados informados para o endpoint especificado e
 * retorna o recurso criado pela API.
 *
 * param endpoint Endpoint da API que receberá a requisição.
 * param type Objeto que será enviado no corpo da requisição.
 * param errorMessage Mensagem lançada caso a requisição falhe.
 * returns O objeto criado pela API.
 * throws Error Caso a requisição não seja concluída com sucesso.
 */

export async function POST<T>(
    endpoint: string,
    data: T,
    errorMessage: string
): Promise<T> {

    const response = await fetch(`${api_url}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(errorMessage);
    }

    return await response.json();
}

/**
 * Busca um registro na API com base em um campo específico.
 *
 * Realiza uma consulta utilizando o campo e o valor informados,
 * retornando o primeiro registro encontrado ou `null` caso não
 * exista correspondência.
 *
 * param endpoint Endpoint da API que será consultado.
 * param field Campo utilizado na pesquisa.
 * param value Valor do campo utilizado como filtro.
 * param errorMessage Mensagem lançada caso a requisição falhe.
 * returns O primeiro registro encontrado ou `null`.
 * throws Error Caso a requisição não seja concluída com sucesso.
 */

export async function getByField<T>(
    endpoint: string,
    field: string,
    value: string | number,
    errorMessage: string
): Promise<T | null> {

    const response = await fetch(
        `${api_url}/${endpoint}?${field}=${value}`
    );

    if (!response.ok) {
        throw new Error(errorMessage);
    }

    const data: T[] = await response.json();

    return data.length > 0 ? data[0] : null;
}

/**
 * Realiza uma requisição GET para buscar todos os registros de um endpoint.
 *
 * template T Tipo dos objetos retornados pela API.
 * param endpoint Endpoint da API que será consultado.
 * param errorMessage Mensagem de erro lançada caso a requisição falhe.
 * returns Uma Promise contendo um vetor de objetos do tipo informado.
 *
 * Exemplo:
 * const books = await GET<IBook>("books", "Erro ao buscar livros.");
 */

export async function GET<T>(endpoint:string, errorMessage:string):Promise<T[]>{
    const response = await fetch(`${api_url}/${endpoint}`)

    if(!response.ok){
        throw new Error(errorMessage)
    }

    return await response.json() as T[]
}

/**
 * Remove um registro da API utilizando o código informado.
 *
 * Primeiro realiza uma consulta para localizar o registro pelo
 * campo `code`. Em seguida, utiliza o `id` encontrado para enviar
 * uma requisição HTTP do tipo DELETE e remover o recurso da API.
 *
 * param endpoint Endpoint da API onde o registro será removido.
 * param code Código utilizado para localizar o registro.
 * param errorMessage Mensagem lançada caso a operação falhe.
 * returns Não retorna valor.
 * throws Error Caso a requisição de busca ou exclusão não seja concluída com sucesso,
 * ou se nenhum registro for encontrado com o código informado.
 */
export async function DELETE( endpoint: string, code: string , errorMessage: string
): Promise<void> {

    const response = await fetch(`${api_url}/${endpoint}?code=${code}`);

    if (!response.ok) {
        throw new Error(errorMessage);
    }

    const data = await response.json();

    if (data.length === 0) {
        throw new Error("Registro não encontrado.");
    }

    const deleteResponse = await fetch(`${api_url}/${endpoint}/${data[0].id}`, {
        method: "DELETE",
    });

    if (!deleteResponse.ok) {
        throw new Error(errorMessage);
    }
}