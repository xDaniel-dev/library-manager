/**
 * Gera um hash SHA-256 para a senha informada.
 * O hash é utilizado para armazenar e comparar senhas
 * sem salvar o texto original, aumentando a segurança.
 *
 * param password Senha em texto puro.
 * returns Hash da senha em formato hexadecimal.
 */

export async function hashPassword(password: string): Promise<string> {

    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

    return hashHex;
}