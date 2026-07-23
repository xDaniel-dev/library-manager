export function generateCode(length: number = 8): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * chars.length);
        code += chars[index];
    }

    return code;
}

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

export function formatCpf(value: string): string {
    value = value.replace(/\D/g, "");

    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

    return value.substring(0, 14);
}

export function clearError(
    input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    error: HTMLElement
): void {
    input.classList.remove("is-invalid")
    error.textContent = "";
}

export function setError(
    input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    error: HTMLElement,
    message: string
): void {
    input.classList.add("is-invalid")
    error.textContent = message
}

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