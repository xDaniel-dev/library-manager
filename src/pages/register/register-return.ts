import "../../utils/common";

import icone from "../../assets/img/icone.webp"
import clientImg from "../../assets/img/cliente-icone.png"
import employeeImg from "../../assets/img/funcionario-icone.png"
import { checkAuth } from "../../utils/authGuard";
import { byId, redirect, setElementAttribute } from "../../utils/dom";
import { getUser, logout } from "../../utils/session";
import { DELETE, GET } from "../../utils/method";
import { ILoan, IReturned } from "../../interfaces/user";
import { clearError, generateCode, removeInvalidOnInput, setError } from "../../utils/generic";
import { calculateFine, returnLoan } from "../../services/returnLoan";

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


const confirmCode = byId<HTMLButtonElement>("confirm-code")
let currentLoan: ILoan | null = null

confirmCode.addEventListener("click", async () => {

    currentLoan = null;

    const loans: ILoan[] = await GET("Loan", "Erro ao buscar empréstimos");

    currentLoan = loans.find(loan => loan.code === code.value) ?? null;

    if (!currentLoan) {
        setError(code, codeError, "Código não encontrado.");

        client.value = ""
        book.value = ""
        loanDate.value = ""
        returnDate.value = ""

        return;
    }

    clearError(code, codeError)

    client.value = currentLoan.name
    book.value = currentLoan.book
    loanDate.value = currentLoan.dateLoan
    returnDate.value = currentLoan.dateReturn
})


const client = byId<HTMLInputElement>("client")
const book = byId<HTMLInputElement>("book")
const loanDate = byId<HTMLInputElement>("loan-date")
const returnDate = byId<HTMLInputElement>("return-date")
const employee = byId<HTMLInputElement>("employee")
const dateCurrent = byId<HTMLInputElement>("date-current")
const situation = byId<HTMLInputElement>("situation")
const fine = byId<HTMLInputElement>("fine")
const code = byId<HTMLInputElement>("code")
const observations = byId<HTMLInputElement>("observations")

const user = getUser()
if (employee && user) {
    employee.value = user.name
    employee.defaultValue = user.name;
}

situation.addEventListener("change", () => {

    const value = calculateFine(
        situation.value,
        returnDate.value,
        dateCurrent.value
    );

    console.log(returnDate.value)
    console.log(dateCurrent.value)

    fine.value = `R$ ${value.toFixed(2)}`
})

const codeError = byId<HTMLDivElement>("codeError")
const dateError = byId<HTMLDivElement>("dateError")
const situationError = byId<HTMLDivElement>("situationError")

function validateBook(): boolean {

    let valid = true;

    clearError(code, codeError)
    clearError(dateCurrent, dateError)
    clearError(situation, situationError)

    if (!code.value.trim()) {
        setError(code, codeError, "Informe o código do empréstimo.")
        valid = false
    }

    if (!dateCurrent.value.trim()) {
        setError(dateCurrent, dateError, "Informe a data para devolução.")
        valid = false
    }

    if (situation.value === "Selecione a situação") {
        setError(situation, situationError, "Selecione a situação.")
        valid = false
    }

    return valid
}

removeInvalidOnInput([
    { input: code, error: codeError },
    { input: dateCurrent, error: dateError },
    { input: situation, error: situationError }
])


const form = byId<HTMLFormElement>("form")

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (!validateBook()) {
        return
    }

    const returned: IReturned = {
        name: client.value,
        book: book.value,
        employee: employee.value,
        dateLoan: loanDate.value,
        dateReturn: dateCurrent.value,
        situation: situation.value,
        fine: fine.value,
        observations: observations.value,
        code: code.value
    }

    try {
        await returnLoan(returned)
        alert(`Devolução registrada !`
        )

        await DELETE("Loan", code.value, "Erro ao excluir o livro !")

        form.reset()

    } catch (error) {
        if (error instanceof Error) {
            alert(error.message)
        }
    }

})