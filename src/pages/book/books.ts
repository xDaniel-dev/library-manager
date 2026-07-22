import "../../utils/common";

import icone from "../../assets/img/icone.webp"
import client from "../../assets/img/cliente-icone.png"
import employee from "../../assets/img/funcionario-icone.png"
import { checkAuth } from "../../utils/authGuard";
import { redirect,setElementAttribute,byId } from "../../utils/dom";
import { logout } from "../../utils/session";
import { IBook } from "../../interfaces/user"
import { getBooks } from "../../services/booksService"

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


function createListBooks(books: IBook[]): void {

    const ul = byId<HTMLUListElement>("ul")

    if (!ul) return

    ul.innerHTML = ""

    books.forEach(book => {
        
        const li = document.createElement("li")
        li.className = "book-card"

        li.innerHTML = `
        <div class="book-top">
                <h4 class="book-title">${book.title}</h4>

                <span class="category-badge">
                    ${book.category}
                </span>
            </div>

            <div class="book-info">

                <p>
                    <strong>Autor:</strong>
                    ${book.author}
                </p>

                <p>
                    <strong>ISBN:</strong>
                    ${book.isbn}
                </p>

                <p>
                    <strong>Editora:</strong>
                    ${book.publisher}
                </p>

                <p>
                    <strong>Linguagem:</strong>
                    ${book.language}
                </p>
                <p>
                    <strong>Ano:</strong>
                    ${book.year}
                </p>

                <p class="description">
                    <strong>Descrição:</strong>
                    ${book.description}
                </p>

            </div>

            <div class="book-actions">
                <button class="btn btn-primary edit-book" data-id="${book.id}">
                    Editar
                </button>

                <button class="btn btn-danger delete-book" data-id="${book.id}">
                    Excluir
                </button>
            </div>
        `

        ul.appendChild(li)
    });
}

async function loadBooks(): Promise<void> {
    const books = await getBooks()
     
    createListBooks(books)
}

loadBooks()