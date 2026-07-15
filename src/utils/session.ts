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

export function logout(): void {
    sessionStorage.removeItem(session_key)
}

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