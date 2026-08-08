document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        alert("Error: loginForm not found!");
        return;
    }

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const loginData = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        };

        try {

            const response = await fetch("http://127.0.0.1:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();

            if (result.success) {

    alert("✅ Login Successful");

    localStorage.setItem("adminLoggedIn", "true");

    window.location.href = "dashboard.html";

}
 else {
                alert("❌ " + result.message);
            }

        } catch (error) {
            console.error(error);
            alert("❌ Cannot connect to the server.");
        }

    });

});