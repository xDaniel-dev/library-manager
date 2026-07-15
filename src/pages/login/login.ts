import "bootstrap"

import "../../assets/sass/index.scss"

import icone from "../../assets/img/icone.webp"

import { login } from "../../services/authService"

import { redirectByRole, saveUser, setElementAttribute } from "../../utils/session"

setElementAttribute("icon-head","href",icone)
setElementAttribute("icon-body","src",icone)

const form = document.getElementById("loginForm") as HTMLFormElement
form.addEventListener("submit",async (e)=>{
    e.preventDefault()

    const email = document.getElementById("email") as HTMLInputElement
    const password = document.getElementById("password") as HTMLInputElement

    try {
        const user = await login(email.value,password.value)

        if(!user){
            alert("email ou senha invalidos !")
            return
        }

        saveUser(user)
        redirectByRole(user)

    } catch (error) {
        console.log(error)
        alert("erro ao efetuar login")
    }
    
})