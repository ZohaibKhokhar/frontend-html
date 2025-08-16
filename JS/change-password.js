// JS/change-password.js

document.addEventListener("DOMContentLoaded", () => {
    const changePasswordBtn = document.getElementById("changePasswordBtn");
    const changePasswordForm = document.getElementById("changePasswordForm");

    if (changePasswordBtn) {
        // Show modal when button clicked
        changePasswordBtn.addEventListener("click", () => {
            const modal = new bootstrap.Modal(document.getElementById("changePasswordModal"));
            modal.show();
        });
    }

    if (changePasswordForm) {
        changePasswordForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const oldPassword = document.getElementById("oldPassword").value.trim();
            const newPassword = document.getElementById("newPassword").value.trim();
            const confirmPassword = document.getElementById("confirmPassword").value.trim();

            if (newPassword !== confirmPassword) {
                alert("New password and confirm password do not match!");
                return;
            }

            try {
                await apiRequest("/User/change-password", "POST", {
                    oldPassword,
                    newPassword
                });

                alert("Password changed successfully. Please log in again.");
                localStorage.clear();
                window.location.href = "login.html";
            } catch (err) {
                alert("Password change failed: " + err.message);
            }
        });
    }
});
