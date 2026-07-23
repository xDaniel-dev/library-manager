import "../../utils/common";

import icone from "../../assets/img/icone.webp"
import client from "../../assets/img/cliente-icone.png"
import employee from "../../assets/img/funcionario-icone.png"
import { checkAuth } from "../../utils/authGuard";
import { redirect, setElementAttribute, byId } from "../../utils/dom";
import { logout } from "../../utils/session";
import { IBook } from "../../interfaces/user"
import { createBook } from "../../services/booksService"
import { clearError, removeInvalidOnInput, setError } from "../../utils/generic";

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

logout("exit-menu", "/login.html")
logout("exit-menu-mobile", "/login.html")

window.addEventListener("pageshow", () => {
    checkAuth();
});


const title = byId<HTMLInputElement>("title")
const isbn = byId<HTMLInputElement>("isbn")
const author = byId<HTMLInputElement>("author")
const publisher = byId<HTMLInputElement>("publisher")
const category = byId<HTMLSelectElement>("category")
const year = byId<HTMLInputElement>("year")
const language = byId<HTMLSelectElement>("language")
const description = byId<HTMLTextAreaElement>("description")

const titleError = byId<HTMLDivElement>("titleError")
const isbnError = byId<HTMLDivElement>("isbnError")
const authorError = byId<HTMLDivElement>("authorError")
const publisherError = byId<HTMLDivElement>("publisherError")
const categoryError = byId<HTMLDivElement>("categoryError")
const yearError = byId<HTMLDivElement>("yearError")
const languageError = byId<HTMLDivElement>("languageError")
const descriptionError = byId<HTMLDivElement>("descriptionError")

function validateBook(): boolean {

    let valid = true;

    clearError(title, titleError)
    clearError(isbn, isbnError)
    clearError(author, authorError)
    clearError(publisher, publisherError)
    clearError(category, categoryError)
    clearError(year, yearError)
    clearError(language, languageError)
    clearError(description, descriptionError)

    if (!title.value.trim()) {
        setError(title, titleError, "Informe o título.")
        valid = false
    }

    if (!isbn.value.trim()) {
        setError(isbn, isbnError, "Informe o ISBN.")
        valid = false
    } else if (isbn.value.length !== 13) {
        setError(isbn, isbnError, "O ISBN deve possuir 13 dígitos.")
        valid = false
    }

    if (!author.value.trim()) {
        setError(author, authorError, "Informe o autor.")
        valid = false
    }

    if (!publisher.value.trim()) {
        setError(publisher, publisherError, "Informe a editora.")
        valid = false
    }

    if (category.value === "Selecione") {
        setError(category, categoryError, "Selecione uma categoria.")
        valid = false
    }

    if (!year.value) {
        setError(year, yearError, "Informe o ano.")
        valid = false
    }

    if (language.value === "Selecione") {
        setError(language, languageError, "Selecione um idioma.")
        valid = false
    }

    if (!description.value.trim()) {
        setError(description, descriptionError, "Informe a sinopse.")
        valid = false
    } else if (description.value.trim().length < 20) {
        setError(description, descriptionError, "A sinopse deve possuir pelo menos 20 caracteres.")
        valid = false
    }

    return valid;
}

removeInvalidOnInput([
    { input: title, error: titleError },
    { input: isbn, error: isbnError },
    { input: author, error: authorError },
    { input: publisher, error: publisherError },
    { input: category, error: categoryError },
    { input: year, error: yearError },
    { input: language, error: languageError },
    { input: description, error: descriptionError }
]);

const form = byId<HTMLFormElement>("form")

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (!validateBook()) {
        return;
    }

    const book: IBook = {
        name: title.value,
        isbn: isbn.value,
        author: author.value,
        publisher: publisher.value,
        category: category.value,
        year: year.value,
        language: language.value,
        description: description.value

    }

    try {
        await createBook(book)
        alert(`livro cadastrado !`
        )

        form.reset()

    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
})