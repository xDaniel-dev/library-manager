import "../../utils/common";

import icone from "../../assets/img/icone.webp"
import client from "../../assets/img/cliente-icone.png"
import employee from "../../assets/img/funcionario-icone.png"
import { checkAuth } from "../../utils/authGuard";
import { redirect,setElementAttribute,byId } from "../../utils/dom";
import { logout } from "../../utils/session";
import { IClient } from "../../interfaces/user"
import { createClient } from "../../services/clientService"

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
const address = byId<HTMLInputElement>("address")
const cite = byId<HTMLInputElement>("cite")
const state = byId<HTMLTextAreaElement>("state")
const cep = byId<HTMLTextAreaElement>("cep")

const form = byId<HTMLFormElement>("form")

form.addEventListener("submit",async (e)=>{
    e.preventDefault()

    const client: IClient = {
        name: name.value,
        cpf: Number(cpf.value),
        email: email.value,
        telephone: Number(telephone.value),
        date: date.value,
        address: address.value ,
        cite: cite.value,
        state: state.value,
        cep: Number(cep.value)
    }

    try {
        await createClient(client)
        alert(`Cliente cadastrado !`
        )

        form.reset()
        
    } catch (error) {
        if (error instanceof Error) {
        alert(error.message);
    }
    }
})