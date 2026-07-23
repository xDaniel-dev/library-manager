import "../../utils/common";

import icone from "../../assets/img/icone.webp"
import client from "../../assets/img/cliente-icone.png"
import employee from "../../assets/img/funcionario-icone.png"
import { checkAuth } from "../../utils/authGuard";
import { byId, redirect,setElementAttribute } from "../../utils/dom";
import { logout } from "../../utils/session";
import { ILoan } from "../../interfaces/user";
import { getLoan } from "../../services/recordLoan";

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

function createListBooksLoan(books: ILoan[]): void {

    const ul = byId<HTMLUListElement>("ul")

    if (!ul) return

    ul.innerHTML = ""

    books.forEach(book => {
        
        const li = document.createElement("li")
        li.className = "book-card"

        li.innerHTML = `
        <div class="book-top">
                <h4 class="book-title">${book.book}</h4>

                <span class="category-badge">
                    ${book.code}
                </span>
            </div>

            <div class="book-info">

                <p>
                    <strong>Cliente:</strong>
                    ${book.name}
                </p>

                <p>
                    <strong>CPF:</strong>
                    ${book.cpf}
                </p>

                <p>
                    <strong>Funcionário responsavel:</strong>
                    ${book.employee}
                </p>

                <p>
                    <label for="date-current" class="form-label"><strong>Data de empréstimo:</strong></label>
                    <input type="date" class="form-control" 
                    value = ${book.dateLoan} readonly>
                </p>
                <p>
                    <label for="date-current" class="form-label"><strong>Data de devolução:</strong></label>
                    <input type="date" class="form-control" 
                    value = ${book.dateReturn} readonly>
                </p>

                <p class="description">
                    <strong>Observação:</strong>
                    ${book.observations}
                </p>

            </div>
        `

        ul.appendChild(li)
    });
}

async function loadBooksLoan(): Promise<void> {
    const books = await getLoan()
     
    createListBooksLoan(books)
}

loadBooksLoan()