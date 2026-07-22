import "../../utils/common";

import icone from "../../assets/img/icone.webp"
import client from "../../assets/img/cliente-icone.png"
import employee from "../../assets/img/funcionario-icone.png"
import { checkAuth } from "../../utils/authGuard";
import { redirect,setElementAttribute,byId } from "../../utils/dom";
import { logout } from "../../utils/session";
import { IUser } from "../../interfaces/user"
import { createEmployee } from "../../services/employeerService"

setElementAttribute("icon-head","href",icone)
setElementAttribute("icon-header","src",icone)
setElementAttribute("img-book","src",icone)
setElementAttribute("img-client","src",client)
setElementAttribute("img-employee","src",employee)

redirect("home-menu","/dashboard.html")
redirect("books-menu","/books.html")
redirect("clients-menu","/clients.html")
redirect("employees-menu","/employees.html")

redirect("home-menu-mobile","/dashboard.html")
redirect("books-menu-mobile","/books.html")
redirect("clients-menu-mobile","/clients.html")
redirect("employees-menu-mobile","/employees.html")

logout("exit-menu","/login.html")
logout("exit-menu-mobile","/login.html")

window.addEventListener("pageshow", () => {
    checkAuth();
});

const name = byId<HTMLInputElement>("name")
const cpf = byId<HTMLInputElement>("cpf")
const email = byId<HTMLInputElement>("email")
const telephone = byId<HTMLInputElement>("telephone")
const date = byId<HTMLInputElement>("date")
const password = byId<HTMLInputElement>("password")
const role = byId<HTMLInputElement>("role")


const form = byId<HTMLFormElement>("form")

form.addEventListener("submit",async (e)=>{
    e.preventDefault()

    const user: IUser = {
        name: name.value,
        cpf: Number(cpf.value),
        email: email.value,
        telephone: Number(telephone.value),
        date: date.value,
        password: password.value,
        role: role.value,
    }

    try {
        await createEmployee(user)
        alert(`Funcionário cadastrado !`
        )

        form.reset()
        
    } catch (error) {
        if (error instanceof Error) {
        alert(error.message);
    }
    }
})