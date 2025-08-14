// JS/add-patient.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("patientForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const patient = {
            // camelCase is fine; ASP.NET Core model binding is case-insensitive
            patientName: document.getElementById("patientName").value.trim(),
            patientAge: parseInt(document.getElementById("patientAge").value, 10),
            patientEmail: document.getElementById("patientEmail").value.trim(),
            patientPhoneNumber: document.getElementById("patientPhone").value.trim()
        };

        try {
            const res = await addPatient(patient);
            alert(typeof res === "string" ? res : "Patient added successfully.");
            form.reset();
        } catch (err) {
            alert("Failed to add patient. " + err.message);
            console.error(err);
        }
    });
});
