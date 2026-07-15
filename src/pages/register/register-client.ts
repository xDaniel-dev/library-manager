import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import "../../assets/sass/index.scss"
import icone from "../../assets/img/icone.webp"
import { setElementAttribute,getUser,redirect } from "../../utils/session"

setElementAttribute("icon-head","href",icone)
setElementAttribute("icon-header","src",icone)

redirect("home-menu","/dashboard.html")
redirect("books-menu","/books.html")
redirect("clients-menu","/clients.html")
redirect("employees-menu","/employees.html")
redirect("exit-menu","/login.html")

const user = getUser();

if (!user) {
    window.location.href = "/login.html";
}

const adminElements = document.querySelectorAll(".admin-only");

if (user?.role === "employee") {
    adminElements.forEach(element => {
        element.classList.add("hidden");
    });
}