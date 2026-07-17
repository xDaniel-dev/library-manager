import { IUser } from "../interfaces/user";

const session_key = "libraryUser"

export function saveUser(user:IUser): void{
    sessionStorage.setItem(
        session_key,
        JSON.stringify(user)
    )
}

export function getUser(): IUser | null{
    const user = sessionStorage.getItem(session_key)

    if(!user){
        return null
    }

    return JSON.parse(user)
}

export function logout(id: string, path: string): void {
    const button = document.getElementById(id);

    if (!button) return;

    button.addEventListener("click", () => {
        sessionStorage.removeItem(session_key);

        history.pushState(null, "", location.href);
        
        // Impede voltar para páginas protegidas
        window.location.replace(path);
    });
}


