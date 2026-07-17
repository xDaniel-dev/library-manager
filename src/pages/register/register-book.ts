import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import "../../assets/sass/index.scss"
import icone from "../../assets/img/icone.webp"
import { checkAuth } from "../../utils/authGuard";
import { setElementAttribute,redirect, byId } from "../../utils/dom"
import { IBook } from "../../interfaces/user"
import { createBook } from "../../services/booksService"
import { logout } from "../../utils/session";

setElementAttribute("icon-head","href",icone)
setElementAttribute("icon-header","src",icone)

redirect("home-menu","/dashboard.html")
redirect("books-menu","/books.html")
redirect("clients-menu","/clients.html")
redirect("employees-menu","/employees.html")
redirect("exit-menu","/login.html")

logout("exit-menu","/login.html")

window.addEventListener("pageshow", () => {
    checkAuth();
});


const title = byId<HTMLInputElement>("title")
const isbn = byId<HTMLInputElement>("isbn")
const author = byId<HTMLInputElement>("author")
const publisher = byId<HTMLInputElement>("publisher")
const category = byId<HTMLInputElement>("category")
const year = byId<HTMLInputElement>("year")
const language = byId<HTMLInputElement>("language")
const description = byId<HTMLTextAreaElement>("language")

const form = byId<HTMLFormElement>("form")

form.addEventListener("submit",async (e)=>{
    e.preventDefault()

    const book:IBook = {
        title: title.value,
        isbn: Number(isbn.value),
        author: author.value,
        publisher: publisher.value,
        category: category.value,
        year: Number(year.value) ,
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
