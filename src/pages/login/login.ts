import "bootstrap"
import "../../assets/sass/index.scss"
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


const form = byId<HTMLFormElement>("loginForm")
form.addEventListener("submit",async (e)=>{
    e.preventDefault()

    const email = byId<HTMLInputElement>("email")
    const password = byId<HTMLInputElement>("password")

    try {
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