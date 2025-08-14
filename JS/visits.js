// JS/visits.js
document.addEventListener("DOMContentLoaded", async () => {
    const tbody = document.querySelector("#visitsTable tbody");
    tbody.innerHTML = "";

    try {
        // Load lookups to show names instead of raw IDs
        const [visits, patients, doctors, types] = await Promise.all([
            getVisits(), getPatients(), getDoctors(), getVisitTypes()
        ]);

        const patientById = Object.fromEntries(patients.map(p => [p.patientID, p.patientName]));
        const doctorById  = Object.fromEntries(doctors.map(d => [d.doctorID, d.doctorName]));
        const typeById    = Object.fromEntries(types.map(t => [t.visitTypeID, t.typeName]));

        visits.forEach(v => {
            const dateFormatted = v.visitDateTime
                ? new Date(v.visitDateTime).toLocaleString()
                : "";

            const row = `
                <tr>
                    <td>${v.visitID}</td>
                    <td>${patientById[v.patientID] ?? v.patientID}</td>
                    <td>${doctorById[v.doctorID] ?? v.doctorID}</td>
                    <td>${typeById[v.visitTypeID] ?? v.visitTypeID}</td>
                    <td>${dateFormatted}</td>
                    <td>${v.description ?? ""}</td>
                </tr>`;
            tbody.insertAdjacentHTML("beforeend", row);
        });
    } catch (err) {
        alert("Failed to load visits. " + err.message);
        console.error(err);
    }
});
