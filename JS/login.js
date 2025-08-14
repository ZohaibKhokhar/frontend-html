// JS/login.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const res = await loginUser(username, password);

            alert(res.message);

            // Save user info in localStorage for later
            localStorage.setItem("username", res.username);
            localStorage.setItem("role", res.role);

            // Redirect to dashboard or home page
            window.location.href = "index.html";
        } catch (err) {
            alert("Login failed: " + err.message);
        }
    });
});
