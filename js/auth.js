document.addEventListener("DOMContentLoaded", function () {

    const loggedIn = localStorage.getItem("adminLoggedIn");

    if (loggedIn !== "true") {
        window.location.href = "login.html";
    }

});