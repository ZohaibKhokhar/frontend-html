// JS/patients.js
document.addEventListener("DOMContentLoaded", async () => {
    const tbody = document.querySelector("#patientsTable tbody");
    tbody.innerHTML = "";

    try {
        const patients = await getPatients();
        patients.forEach(p => {
            const row = `
                <tr>
                    <td>${p.patientID}</td>
                    <td>${p.patientName}</td>
                    <td>${p.patientAge ?? ""}</td>
                    <td>${p.patientEmail ?? ""}</td>
                    <td>${p.patientPhoneNumber ?? ""}</td>
                </tr>`;
            tbody.insertAdjacentHTML("beforeend", row);
        });
    } catch (err) {
        alert("Failed to load patients. " + err.message);
        console.error(err);
    }
});
