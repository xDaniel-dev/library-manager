import api_url from "../services/api";
import { GET } from "./method";

/**
 * Gera um código aleatório composto por letras maiúsculas e números.
 * Utilizado para criar identificadores únicos dos registros.
 */
export function generateCode(length: number = 8): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * chars.length);
        code += chars[index];
    }

    return code;
}

/**
 * Formata um número de telefone para o padrão brasileiro.
 * Exemplo: (85) 99999-9999.
 */
export function formatPhone(value: string | number): string {
    const phone = String(value)
        .replace(/\D/g, "")
        .slice(0, 11);

    if (phone.length <= 2) {
        
        return phone;
    }

    if (phone.length <= 7) {
        console.log(`(${phone.slice(0, 2)}) ${phone.slice(2)}`)
        return `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
    }
    
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
}

/**
 * Formata um CPF enquanto o usuário digita.
 * Exemplo: 000.000.000-00.
 */
export function formatCpf(value: string): string {
    value = value.replace(/\D/g, "");

    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

    return value.substring(0, 14);
}

/**
 * Remove a marcação de erro de um campo e limpa a mensagem exibida.
 */
export function clearError(
    input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    error: HTMLElement
): void {
    input.classList.remove("is-invalid")
    error.textContent = "";
}

/**
 * Exibe uma mensagem de erro e adiciona a classe de validação ao campo.
 */
export function setError(
    input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    error: HTMLElement,
    message: string
): void {
    input.classList.add("is-invalid")
    error.textContent = message
}

/**
 * Remove automaticamente a indicação de erro quando o usuário
 * altera o valor de um campo do formulário.
 */
export function removeInvalidOnInput(
    fields: {
        input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        error: HTMLElement;
    }[]
): void {

    fields.forEach(({ input, error }) => {

        const event = input instanceof HTMLSelectElement
            ? "change"
            : "input";

        input.addEventListener(event, () => {
            input.classList.remove("is-invalid");
            error.textContent = "";
        });

    });

}

/**
 * Realiza uma pesquisa na API utilizando um campo específico
 * e retorna todos os registros encontrados.
 */
async function searchByField<T>(
    endpoint: string,
    field: string,
    value: string
): Promise<T[]> {

    const response = await fetch(
        `${api_url}/${endpoint}?${field}_like=${encodeURIComponent(value)}`
    );

    if (!response.ok) {
        throw new Error("Erro ao realizar pesquisa.");
    }

    return await response.json() as T[];
}

/**
 * Cria uma pesquisa dinâmica em um campo de texto.
 * A busca é realizada automaticamente enquanto o usuário digita,
 * utilizando um debounce para evitar requisições excessivas.
 * Caso o campo seja limpo, todos os registros são carregados novamente.
 */
export function createSearch<T>(
    inputId: string,
    endpoint: string,
    field: string,
    callback: (items: T[]) => void,
    delay: number = 300
): void {

    const input = document.getElementById(inputId);

    if (!(input instanceof HTMLInputElement)) {
        throw new Error(`Input '${inputId}' não encontrado.`);
    }

    let timeout: number;

    input.addEventListener("input", () => {

        clearTimeout(timeout);

        timeout = window.setTimeout(async () => {

            const value = input.value.trim();

            if (!value) {
                
                const data = await GET<T>(endpoint,"Erro ao buscar registros.")
                
                callback(data)
                return;
            }

            try {

                const data = await searchByField<T>(
                    endpoint,
                    field,
                    value
                );

                callback(data);

            } catch (error) {

                console.error(error);

            }
        }, delay);
    });

}