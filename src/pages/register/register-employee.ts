import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import "../../assets/sass/index.scss"
import icone from "../../assets/img/icone.webp"
import { checkAuth } from "../../utils/authGuard";
import { redirect,setElementAttribute } from "../../utils/dom";
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