import "../../utils/common";

import icone from "../../assets/img/icone.webp"
import books from "../../assets/img/books.png"
import { login } from "../../services/authService"
import { saveUser,  } from "../../utils/session"
import { redirectByRole,setElementAttribute,byId } from "../../utils/dom"
import { getUser } from "../../utils/session"

setElementAttribute("books","src",books)
setElementAttribute("icon-head","href",icone)
setElementAttribute("icon-body","src",icone)

window.addEventListener("pageshow", () => {
    const user = getUser();

    if (user) {
        window.location.replace("/dashboard.html"); 
    }
});

const email = byId<HTMLInputElement>("email")
const password = byId<HTMLInputElement>("password")
const emailError = byId<HTMLInputElement>("emailError")
const passwordError = byId<HTMLInputElement>("passwordError")
const loginError = byId<HTMLInputElement>("password")

const form = byId<HTMLFormElement>("loginForm")
form.addEventListener("submit",async (e)=>{
    e.preventDefault()
    try {

        if(!validateLogin()){
            return
        }

        const user = await login(email.value,password.value)

        if(!user){
            alert("email ou senha invalidos !")
            return
        }

        saveUser(user)
        redirectByRole(user)
        form.reset()

    } catch (error) {
        console.log(error)
        alert("erro ao efetuar login")
    }
    
})

function validateLogin(): boolean {

    let valid = true;

    email.classList.remove("is-invalid")
    password.classList.remove("is-invalid")

    emailError.textContent = ""
    passwordError.textContent = ""
    loginError.textContent = ""

    if (email.value.trim() === "") {
        email.classList.add("is-invalid")
        emailError.textContent = "Informe seu e-mail."
        valid = false
    }

    else if (!/\S+@\S+\.\S+/.test(email.value)) {
        email.classList.add("is-invalid")
        emailError.textContent = "E-mail inválido."
        valid = false
    }

    if (password.value.trim() === "") {
        password.classList.add("is-invalid")
        passwordError.textContent = "Informe sua senha."
        valid = false
    }

    else if (password.value.length < 6) {
        password.classList.add("is-invalid")
        passwordError.textContent = "A senha deve possuir pelo menos 6 caracteres."
        valid = false
    }

    return valid
}