import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import "../../assets/sass/index.scss"

import icone from "../../assets/img/icone.webp"
import client from "../../assets/img/cliente-icone.png"
import employee from "../../assets/img/funcionario-icone.png"
import { checkAuth } from "../../utils/authGuard";
import { redirect,setElementAttribute } from "../../utils/dom";
import { logout } from "../../utils/session";

setElementAttribute("icon-head","href",icone)
setElementAttribute("icon-header","src",icone)
setElementAttribute("img-book","src",icone)
setElementAttribute("img-client","src",client)
setElementAttribute("img-employee","src",employee)

redirect("home-menu","/dashboard.html")
redirect("books-menu","/books.html")
redirect("clients-menu","/clients.html")
redirect("employees-menu","/employees.html")

redirect("home-menu-mobile","/dashboard.html")
redirect("books-menu-mobile","/books.html")
redirect("clients-menu-mobile","/clients.html")
redirect("employees-menu-mobile","/employees.html")

logout("exit-menu","/login.html")
logout("exit-menu-mobile","/login.html")

window.addEventListener("pageshow", () => {
    checkAuth();
});

