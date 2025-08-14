// JS/add-doctor.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("doctorForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const doctor = {
            doctorName: document.getElementById("doctorName").value.trim(),
            doctorAge: parseInt(document.getElementById("doctorAge").value, 10),
            doctorEmail: document.getElementById("doctorEmail").value.trim(),
            doctorPhoneNumber: document.getElementById("doctorPhone").value.trim()
        };

        try {
            const res = await addDoctor(doctor);
            alert(typeof res === "string" ? res : "Doctor added successfully.");
            form.reset();
        } catch (err) {
            alert("Failed to add doctor. " + err.message);
            console.error(err);
        }
    });
});
