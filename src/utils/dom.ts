import { IUser } from "../interfaces/user"


export function redirectByRole(user:IUser):void{

    if(user.role === "manager" || user.role === "employee"){
        window.location.href = "/dashboard.html"
        return
    }
    
    window.location.href = "/login.html"
    
}

export function redirect(id:string, page:string): void {
    const element = document.getElementById(id)

    if(!element) return

    element.addEventListener("click",()=>{
        window.location.href = page
    })

}

export function setElementAttribute(id:string, atribute:string, img:string): void{
    const element = document.getElementById(id)
    
    if(!element) return

    element.setAttribute(atribute,img)

}

export function byId<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);

    if (!element) {
        throw new Error(`Elemento "${id}" não encontrado.`);
    }

    return element as T;
}