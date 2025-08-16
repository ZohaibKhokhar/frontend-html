// JS/login.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const res = await loginUser(username, password);

            // Save token + user info in localStorage
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", res.username);
            localStorage.setItem("role", res.role);

            alert("Login successful!");

            // Redirect to dashboard
            window.location.href = "index.html";
        } catch (err) {
            alert("Login failed: " + err.message);
        }
    });
});
