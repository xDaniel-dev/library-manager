import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import "../../assets/sass/index.scss"
import icone from "../../assets/img/icone.webp"
import { checkAuth } from "../../utils/authGuard";
import { redirect, setElementAttribute, byId } from "../../utils/dom";
import { logout } from "../../utils/session";
import { getBooks } from "../../services/booksService";
import { IBook } from "../../interfaces/user";

setElementAttribute("icon-head", "href", icone)
setElementAttribute("icon-header", "src", icone)

redirect("home-menu", "/dashboard.html")
redirect("clients-menu", "/clients.html")
redirect("employees-menu", "/employees.html")

logout("exit-menu", "/login.html")

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