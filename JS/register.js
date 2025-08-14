// JS/register.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        try {
            const res = await registerUser(username, password, confirmPassword);
            alert(res.message);
            window.location.href = "login.html";
        } catch (err) {
            alert("Registration failed: " + err.message);
        }
    });
});
