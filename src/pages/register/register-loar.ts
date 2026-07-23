import "../../utils/common";

import icone from "../../assets/img/icone.webp"
import clientImg from "../../assets/img/cliente-icone.png"
import employeeImg from "../../assets/img/funcionario-icone.png"
import { checkAuth } from "../../utils/authGuard";
import { redirect, setElementAttribute, byId } from "../../utils/dom";
import { getUser, logout } from "../../utils/session";
import { GET } from "../../utils/method";
import { IBook, IClient, ILoan } from "../../interfaces/user";
import { recordLoan } from "../../services/recordLoan";
import { clearError, formatCpf, generateCode, removeInvalidOnInput, setError } from "../../utils/generic";

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

const form = byId<HTMLFormElement>("form")
const client = byId<HTMLInputElement>("client")
const cpf = byId<HTMLInputElement>("cpf")
const book = byId<HTMLInputElement>("book")
const dateLoan = byId<HTMLInputElement>("loan")
const dateReturn = byId<HTMLInputElement>("return")
const observations = byId<HTMLInputElement>("observations")
const employee = byId<HTMLInputElement>("employee")

const user = getUser()
if (employee && user) {
    employee.value = user.name
    employee.defaultValue = user.name;
}

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

}

selectOptions()


const confirmClient = byId<HTMLButtonElement>("confirm-client")

confirmClient.addEventListener("click", async () => {
    const select = byId<HTMLInputElement>("client")
    const cpf = byId<HTMLInputElement>("cpf")

    const client: IClient[] = await GET("Clients", "Erro ao buscar clientes.")

    client.forEach(element => {
        if (element.name === select.value) {
            cpf.value = formatCpf(element.cpf)
        }
    })

})

const clientError = byId<HTMLDivElement>("clientError")
const bookError = byId<HTMLDivElement>("bookError")
const loanError = byId<HTMLDivElement>("loanError")
const returnError = byId<HTMLDivElement>("returnError")

function validateLoan(): boolean {

    let valid = true;

    clearError(client, clientError)
    clearError(book, bookError)
    clearError(dateLoan, loanError)
    clearError(dateReturn, returnError)

    if (client.value === "Selecione um cliente") {
        setError(client, clientError, "Selecione um cliente.");
        valid = false
    }

    if (book.value === "Selecione um livro") {
        setError(book, bookError, "Selecione um livro.")
        valid = false
    }

    if (!dateLoan.value.trim()) {
        setError(dateLoan, loanError, "Informe a data de empréstimo.")
        valid = false
    }

    if (!dateReturn.value.trim()) {
        setError(dateReturn, returnError, "Informe a data para devolução.")
        valid = false
    }

    if (dateLoan.value && dateReturn.value) {

        const loan = new Date(dateLoan.value)
        const ret = new Date(dateReturn.value)

        if (ret <= loan) {
            setError(
                dateReturn,
                returnError,
                "A data de devolução deve ser posterior à data do empréstimo."
            );
            valid = false
        }
    }

    return valid
}

removeInvalidOnInput([
    { input: client, error: clientError },
    { input: book, error: bookError },
    { input: dateLoan, error: loanError },
    { input: dateReturn, error: returnError }
]);

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (!validateLoan()) {
        return;
    }

    const bookLoan: ILoan = {
        name: client.value,
        cpf: cpf.value,
        book: book.value,
        employee: employee.value,
        dateLoan: dateLoan.value,
        dateReturn: dateReturn.value,
        observations: observations.value,
        code: generateCode()
    }

    try {
        await recordLoan(bookLoan)
        alert(`Empréstimo registrado !`
        )

        form.reset()

    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }

})