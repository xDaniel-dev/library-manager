import "../../utils/common";

import icone from "../../assets/img/icone.webp"
import clientImg from "../../assets/img/cliente-icone.png"
import employeeImg from "../../assets/img/funcionario-icone.png"
import { checkAuth } from "../../utils/authGuard";
import { redirect, setElementAttribute, byId } from "../../utils/dom";
import { getUser, logout } from "../../utils/session";
import { GET } from "../../utils/generic";
import { IBook, IClient, ILoan } from "../../interfaces/user";
import { recordLoan } from "../../services/recordLoan";

setElementAttribute("icon-head", "href", icone)
setElementAttribute("icon-header", "src", icone)
setElementAttribute("img-book", "src", icone)
setElementAttribute("img-client", "src", clientImg)
setElementAttribute("img-employee", "src", employeeImg)

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

const form = byId<HTMLInputElement>("form")
const selectClient = byId<HTMLInputElement>("client")
const cpf = byId<HTMLInputElement>("cpf")
const selectBook = byId<HTMLInputElement>("book")
const dateLoan = byId<HTMLInputElement>("loan")
const dateReturn = byId<HTMLInputElement>("return")
const status = byId<HTMLInputElement>("status")
const observations = byId<HTMLInputElement>("observations")
const employee = byId<HTMLInputElement>("employee")

const user = getUser()
if (employee && user) {
    employee.value = user.name
    employee.defaultValue = user.name;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const bookLoan: ILoan = {
        name: selectClient.value,
        cpf: cpf.value,
        book: selectBook.value,
        employee: employee.value,
        dateLoan: dateLoan.value,
        dateReturn: dateReturn.value,
        status: status.value,
        observations: observations.value
    }

       try {
            await recordLoan(bookLoan)
            alert(`Empréstimo registrado !`
            )
            
        } catch (error) {
            if (error instanceof Error) {
            alert(error.message);
        }
        }

})

function createlist<T extends { name: string }>(data: T[], selectId: string,): void {

    const select = byId<HTMLInputElement>(selectId)

    if (!select) return

    data.forEach(data => {
        const option = document.createElement("option")

        option.innerText = data.name

        select.appendChild(option)
    })

}

async function selectOptions() {

    const clients: IClient[] = await GET("Clients", "Erro ao buscar clientes.")
    const books: IBook[] = await GET("Books", "Erro ao buscar livros.")

    createlist(clients, "client")
    createlist(books, "book")

    console.log(books)

}

selectOptions()


const confirmClient = byId<HTMLInputElement>("confirm-client")

confirmClient.addEventListener("click", async () => {
    const select = byId<HTMLInputElement>("client")
    const cpf = byId<HTMLInputElement>("cpf")

    const client: IClient[] = await GET("Clients", "Erro ao buscar clientes.")

    client.forEach(element => {
        if (element.name === select.value) {
            cpf.value = element.cpf
        }
    })

})

