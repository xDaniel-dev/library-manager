import "../../utils/common";

import icone from "../../assets/img/icone.webp"
import client from "../../assets/img/cliente-icone.png"
import employee from "../../assets/img/funcionario-icone.png"
import { checkAuth } from "../../utils/authGuard";
import { redirect, setElementAttribute, byId } from "../../utils/dom";
import { logout } from "../../utils/session";
import { IBook } from "../../interfaces/user"
import { getBooks } from "../../services/booksService"
import { createSearch } from "../../utils/generic";
import { DELETE, GET } from "../../utils/method";

setElementAttribute("icon-head", "href", icone)
setElementAttribute("icon-header", "src", icone)
setElementAttribute("img-book", "src", icone)
setElementAttribute("img-client", "src", client)
setElementAttribute("img-employee", "src", employee)

redirect("home-menu", "/dashboard.html")
redirect("books-menu", "/books.html")
redirect("clients-menu", "/clients.html")
redirect("employees-menu", "/employees.html")

redirect("home-menu-mobile", "/dashboard.html")
redirect("books-menu-mobile", "/books.html")
redirect("clients-menu-mobile", "/clients.html")
redirect("employees-menu-mobile", "/employees.html")

logout("exit-menu","index.html")
logout("exit-menu-mobile","/index.html")

window.addEventListener("pageshow", () => {
    checkAuth();
});

const ul = byId<HTMLUListElement>("ul")

function createListBooks(books: IBook[]): void {

    if (!ul) return

    ul.innerHTML = ""

    books.forEach(book => {

        const li = document.createElement("li")
        li.className = "book-card"

        li.innerHTML = `
        <div class="book-top">
                <h4 class="book-title">${book.name}</h4>

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

            <div class= "book-actions">
                <button class="btn btn-danger delete-book admin-only" data-code="${book.isbn}">
                    Excluir
                </button>
            </div>
        `

        ul.appendChild(li)
    });
}


createSearch("search-book", "Books", "name", createListBooks)


async function deleteBook(code: string): Promise<void> {
    const confirmDelete = confirm(
        "Deseja realmente excluir este livro?"
    )
    if (!confirmDelete) return;
    try {
        await DELETE(
            "books",
            code,
            "Erro ao excluir livro."
        );
        const books = await GET<IBook>(
            "books",
            "Erro ao buscar livros."
        );
        createListBooks(books)
    } catch (error) {

        console.error(error)

        alert(error instanceof Error
            ? error.message
            : "Erro ao excluir livro.")
    }
}

ul?.addEventListener("click", (event) => {

    const target = event.target

    if (!(target instanceof HTMLButtonElement)) {
        return
    }

    if (!target.classList.contains("delete-book")) {
        return
    }
    const code = target.dataset.code;
    if (!code) {
        return
    }
    deleteBook(code)
})

async function loadBooks(): Promise<void> {
    const books = await getBooks()

    createListBooks(books)
}

loadBooks()