// JS/add-visit.js
document.addEventListener("DOMContentLoaded", async () => {
    const patientSel = document.getElementById("visitPatient");
    const doctorSel  = document.getElementById("visitDoctor");
    const typeSel    = document.getElementById("visitType");
    const form       = document.getElementById("visitForm");

    // Populate dropdowns
    try {
        const [patients, doctors, types] = await Promise.all([
            getPatients(), getDoctors(), getVisitTypes()
        ]);

        // Clear first to avoid duplicates on reloads
        patientSel.innerHTML = '<option value="" disabled selected>Select Patient</option>';
        doctorSel.innerHTML  = '<option value="" disabled selected>Select Doctor</option>';
        typeSel.innerHTML    = '<option value="" disabled selected>Select Visit Type</option>';

        patients.forEach(p => {
            patientSel.insertAdjacentHTML("beforeend",
                `<option value="${p.patientID}">${p.patientName}</option>`);
        });
        doctors.forEach(d => {
            doctorSel.insertAdjacentHTML("beforeend",
                `<option value="${d.doctorID}">${d.doctorName}</option>`);
        });
        types.forEach(t => {
            typeSel.insertAdjacentHTML("beforeend",
                `<option value="${t.visitTypeID}">${t.typeName}</option>`);
        });
    } catch (err) {
        alert("Failed to load dropdowns. " + err.message);
        console.error(err);
    }

    // Handle submit
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const visit = {
            patientID: parseInt(patientSel.value, 10),
            doctorID: parseInt(doctorSel.value, 10),
            visitTypeID: parseInt(typeSel.value, 10),
            visitDateTime: new Date(document.getElementById("visitDate").value).toISOString(),
            description: document.getElementById("visitDescription").value.trim()
        };

        try {
            const res = await addVisit(visit);
            alert(typeof res === "string" ? res : "Visit added successfully.");
            form.reset();
            // Keep dropdowns populated after reset
        } catch (err) {
            alert("Failed to add visit. " + err.message);
            console.error(err);
        }
    });
});
