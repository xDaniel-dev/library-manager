console.log("Dashboard carregou");
console.log(sessionStorage.getItem("libraryUser"));

import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import "../../assets/sass/index.scss"

import icone from "../../assets/img/icone.webp"
import client from "../../assets/img/cliente-icone.png"
import employee from "../../assets/img/funcionario-icone.png"
import { redirect,setElementAttribute,getUser } from "../../utils/session"

setElementAttribute("icon-head","href",icone)
setElementAttribute("icon-header","src",icone)
setElementAttribute("img-book","src",icone)
setElementAttribute("img-client","src",client)
setElementAttribute("img-employee","src",employee)

redirect("home-menu","/dashboard.html")
redirect("books-menu","/books.html")
redirect("clients-menu","/clients.html")
redirect("employees-menu","/employees.html")
redirect("exit-menu","/login.html")

redirect("books","/books.html")
redirect("clients","/clients.html")
redirect("employees","/employees.html")
redirect("book-rented","/book_rented.html")

redirect("register-book","/register-book.html")
redirect("register-client","/register-client.html")
redirect("register-employee","/register-employee.html")
redirect("register-loar","/register-loar.html")
redirect("register-return","/register-return.html")


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