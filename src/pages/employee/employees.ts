import "../../utils/common";

import icone from "../../assets/img/icone.webp"
import client from "../../assets/img/cliente-icone.png"
import employee from "../../assets/img/funcionario-icone.png"
import { checkAuth } from "../../utils/authGuard";
import { byId, redirect,setElementAttribute } from "../../utils/dom";
import { logout } from "../../utils/session";
import { IUser } from "../../interfaces/user";
import { formatCpf, formatPhone } from "../../utils/generic";
import { getUsers } from "../../services/employeerService";

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

function createListclient(user: IUser[]): void {

    const ul = byId<HTMLUListElement>("ul")

    if (!ul) return

    ul.innerHTML = ""

    user.forEach(element => {
        
        const li = document.createElement("li")
        li.className = "book-card"

        li.innerHTML = `
        <div class="book-top">
                <h4 class="book-title">${element.name}</h4>

                <span class="category-badge">
                  ${element.role}
                </span>
            </div>

            <div class="book-info">
                <p>
                    <strong>CPF :</strong>
                    ${formatCpf(element.cpf)}
                </p>

                <p>
                    <strong>Email :</strong>
                    ${element.email}
                </p>
                <p>
                    <strong>telefone :</strong>
                    ${formatPhone(element.telephone)} 
                </p>

                <p>
                    <label for="date-current" class="form-label"><strong>Data de nascimento:</strong></label>
                    <input type="date" class="form-control" 
                    value = ${element.date} readonly>
                </p>

            </div>
        `

        ul.appendChild(li)
    });
}

async function loadclientLoan(): Promise<void> {
    const client = await getUsers()
     
    createListclient(client)
}

loadclientLoan()