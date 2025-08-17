document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("changePasswordForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const payload = {
            oldPassword: document.getElementById("oldPassword").value,
            newPassword: document.getElementById("newPassword").value
        };

        try {
            await ChangePassword(payload);
            form.reset();
            alert("Password changed successfully. Please log in again.");
            localStorage.clear();
            window.location.href = "login.html";
        } catch (err) {
            alert("Failed to change password: " + err.message);
        }
    });
});
