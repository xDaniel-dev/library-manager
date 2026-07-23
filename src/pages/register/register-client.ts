import "../../utils/common";

import icone from "../../assets/img/icone.webp"
import client from "../../assets/img/cliente-icone.png"
import employee from "../../assets/img/funcionario-icone.png"
import { checkAuth } from "../../utils/authGuard";
import { redirect, setElementAttribute, byId } from "../../utils/dom";
import { logout } from "../../utils/session";
import { IClient } from "../../interfaces/user"
import { createClient } from "../../services/clientService"
import { clearError, removeInvalidOnInput, setError } from "../../utils/generic";
import { getByField } from "../../utils/method";

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

const name = byId<HTMLInputElement>("name")
const cpf = byId<HTMLInputElement>("cpf")
const email = byId<HTMLInputElement>("email")
const telephone = byId<HTMLInputElement>("telephone")
const date = byId<HTMLInputElement>("date")
const address = byId<HTMLInputElement>("address")
const cite = byId<HTMLInputElement>("cite")
const state = byId<HTMLSelectElement>("state")
const cep = byId<HTMLInputElement>("cep")

const nameError = byId<HTMLDivElement>("nameError")
const cpfError = byId<HTMLDivElement>("cpfError")
const emailError = byId<HTMLDivElement>("emailError")
const phoneError = byId<HTMLDivElement>("phoneError")
const dateError = byId<HTMLDivElement>("dateError")
const addressError = byId<HTMLDivElement>("addressError")
const citeError = byId<HTMLDivElement>("citeError")
const stateError = byId<HTMLDivElement>("stateError")
const cepError = byId<HTMLDivElement>("cepError")

function validateclient(): boolean {

    let valid = true;

    clearError(name, nameError)
    clearError(cpf, cpfError)
    clearError(email, emailError)
    clearError(telephone, phoneError)
    clearError(date, dateError)
    clearError(address, addressError)
    clearError(cite, citeError)
    clearError(state, stateError)
    clearError(cep, cepError)

    if (!name.value.trim()) {
        setError(name, nameError, "Informe o nome.")
        valid = false
    }

    if (!cpf.value.trim()) {
        setError(cpf, cpfError, "Informe o cpf.")
        valid = false
    }

    if (telephone.value.length !== 15) {
        setError(telephone, phoneError, "Telefone inválido.")
        valid = false
    }

    if (!email.value.trim()) {
        setError(email, emailError, "Informe o email.")
        valid = false
    }

    if (!telephone.value.trim()) {
        setError(telephone, phoneError, "Informe o telefone.")
        valid = false
    }

    if (telephone.value.length !== 15) {
        setError(telephone, phoneError, "Telefone inválido.");
        valid = false;
    }

    if (!date.value) {
        setError(date, dateError, "Informe a data.")
        valid = false
    }

    if (!address.value.trim()) {
        setError(address, addressError, "Informe o endereço.")
        valid = false
    }

    if (!cite.value.trim()) {
        setError(cite, citeError, "Informe a cidade.")
        valid = false
    }
    if (state.value === "Selecione") {
        setError(state, stateError, "Selecione um estado.")
        valid = false
    }

    if (!cep.value.trim()) {
        setError(cep, cepError, "Informe o cep.")
        valid = false
    }

    if (cep.value.length !== 9) {
        setError(cep, cepError, "CEP inválido.")
        valid = false
    }

    return valid
}

removeInvalidOnInput([
    { input: name, error: nameError },
    { input: cpf, error: cpfError },
    { input: email, error: emailError },
    { input: telephone, error: phoneError },
    { input: date, error: dateError },
    { input: address, error: addressError },
    { input: cite, error: citeError },
    { input: state, error: stateError },
    { input: cep, error: cepError }
]);

const form = byId<HTMLFormElement>("form")

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (!validateclient()) {
        return;
    }

    const existingClient = await getByField<IClient>(
        "Clients",
        "cpf",
        cpf.value,
        "Erro ao verificar CPF."
    )

    if (existingClient) {
        setError(cpf, cpfError, "Já existe um cliente com esse CPF.");
        return;
    }

    const client: IClient = {
        name: name.value,
        cpf: cpf.value,
        email: email.value,
        telephone: telephone.value,
        date: date.value,
        address: address.value,
        cite: cite.value,
        state: state.value,
        cep: cep.value
    }

    try {
        await createClient(client)
        alert(`Cliente cadastrado !`
        )

        form.reset()

    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
})