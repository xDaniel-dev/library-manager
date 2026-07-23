import "../../utils/common";

import icone from "../../assets/img/icone.webp"
import client from "../../assets/img/cliente-icone.png"
import employee from "../../assets/img/funcionario-icone.png"
import { checkAuth } from "../../utils/authGuard";
import { redirect, setElementAttribute, byId } from "../../utils/dom";
import { logout } from "../../utils/session";
import { IUser } from "../../interfaces/user"
import { createEmployee } from "../../services/employeerService"
import { clearError, removeInvalidOnInput, setError } from "../../utils/generic";
import { getByField } from "../../utils/method";
import { hashPassword } from "../../utils/pasword";

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
const password = byId<HTMLInputElement>("password")
const confirmPassword = byId<HTMLInputElement>("confirmPassword")
const role = byId<HTMLSelectElement>("role")

const nameError = byId<HTMLDivElement>("nameError")
const cpfError = byId<HTMLDivElement>("cpfError")
const emailError = byId<HTMLDivElement>("emailError")
const phoneError = byId<HTMLDivElement>("phoneError")
const dateError = byId<HTMLDivElement>("dateError")
const roleError = byId<HTMLDivElement>("roleError")
const passwordError = byId<HTMLDivElement>("passwordError")
const confirmPasswordError = byId<HTMLDivElement>("confirmPasswordError")

function validateEmployee(): boolean {

    let valid = true;

    clearError(name, nameError)
    clearError(cpf, cpfError)
    clearError(email, emailError)
    clearError(telephone, phoneError)
    clearError(date, dateError)
    clearError(role, roleError)
    clearError(password, passwordError)
    clearError(confirmPassword, confirmPasswordError)


    if (!name.value.trim()) {
        setError(name, nameError, "Informe o nome.")
        valid = false
    }

    if (!email.value.trim()) {
        setError(email, emailError, "Informe o e-mail.");
        valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        setError(email, emailError, "E-mail inválido.");
        valid = false;
    }

    if (!date.value) {
        setError(date, dateError, "Informe a data.")
        valid = false
    }

    if (role.value === "Selecione") {
        setError(role, roleError, "Selecione um cargo.")
        valid = false
    }

    if (!confirmPassword.value.trim()) {
        setError(confirmPassword, confirmPasswordError, "confirme a senha");
        valid = false
    }

    if (password.value !== confirmPassword.value) {
        setError(confirmPassword, confirmPasswordError, "As senhas não coincidem.")
        valid = false
    }

    const cpfNumbers = cpf.value.replace(/\D/g, "");

    if (!cpf.value.trim()) {
        setError(cpf, cpfError, "Informe o CPF.");
        valid = false;
    } else if (cpfNumbers.length !== 11) {
        setError(cpf, cpfError, "CPF inválido.");
        valid = false;
    }

    const phoneNumbers = telephone.value.replace(/\D/g, "");

    if (!telephone.value.trim()) {
        setError(telephone, phoneError, "Informe o telefone.");
        valid = false;
    } else if (phoneNumbers.length !== 11) {
        setError(telephone, phoneError, "Telefone inválido.");
        valid = false;
    }

    if (!confirmPassword.value.trim()) {
        setError(confirmPassword, confirmPasswordError, "Confirme a senha.");
        valid = false;
    } else if (password.value !== confirmPassword.value) {
        setError(confirmPassword, confirmPasswordError, "As senhas não coincidem.");
        valid = false;
    }


    return valid
}

removeInvalidOnInput([
    { input: name, error: nameError },
    { input: cpf, error: cpfError },
    { input: email, error: emailError },
    { input: telephone, error: phoneError },
    { input: date, error: dateError },
    { input: role, error: roleError },
    { input: password, error: passwordError },
    { input: confirmPassword, error: confirmPasswordError }
]);

const form = byId<HTMLFormElement>("form")

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (!validateEmployee()) {
        return;
    }

    const [cpfExists, emailExists] = await Promise.all([
        getByField<IUser>(
            "Users",
            "cpf",
            cpf.value,
            "Erro ao verificar CPF."
        ),
        getByField<IUser>(
            "Users",
            "email",
            email.value,
            "Erro ao verificar e-mail."
        )
    ])

    if (cpfExists) {
        setError(cpf, cpfError, "CPF já cadastrado.");
        return;
    }

    if (emailExists) {
        setError(email, emailError, "E-mail já cadastrado.");
        return;
    }

    const user: IUser = {
        name: name.value,
        cpf: cpf.value,
        email: email.value,
        telephone: telephone.value,
        date: date.value,
        password: await hashPassword(password.value),
        role: role.value,
    }

    try {
        await createEmployee(user)
        alert(`Funcionário cadastrado !`
        )

        form.reset()

    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
})