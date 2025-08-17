// JS/add-visit.js
document.addEventListener("DOMContentLoaded", async () => {
    const patientSel = document.getElementById("visitPatient");
    const doctorSel  = document.getElementById("visitDoctor");
    const typeSel    = document.getElementById("visitType");
    const form       = document.getElementById("visitForm");
    const dateInput  = document.getElementById("visitDate");

    const minDate = new Date("1753-01-01T00:00:00Z");
    const maxDate = new Date("9999-12-31T23:59:59Z");

    // Populate dropdowns
    try {
        const [patients, doctors, types] = await Promise.all([
            getPatients(), getDoctors(), getVisitTypes()
        ]);

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

        const dateValue = dateInput.value;
        console.log("📝 Raw input value:", dateValue);

        if (!dateValue) {
            alert("Please select a valid visit date.");
            return;
        }

        const visitDate = new Date(dateValue);
        console.log("📆 Parsed as JS Date:", visitDate);

        if (visitDate < minDate || visitDate > maxDate) {
            alert("Visit date must be between Jan 1, 1753 and Dec 31, 9999.");
            return;
        }

        // Build local ISO-like string without timezone
        const localIso = dateValue + ":00";
        console.log("📅 Sending visitDateTime:", localIso);

        const visit = {
            patientID: parseInt(patientSel.value, 10),
            doctorID: parseInt(doctorSel.value, 10),
            visitTypeID: parseInt(typeSel.value, 10),
            visitDate: localIso,  // "2025-08-17T15:45:00"
            description: document.getElementById("visitDescription").value.trim()
        };

        console.log("🚀 Visit payload:", visit);

        try {
            const res = await addVisit(visit);
            alert(typeof res === "string" ? res : "Visit added successfully.");
            form.reset();
        } catch (err) {
            console.error("Error adding visit:", err);
            if (err.message.includes("403")) {
                alert("Access denied. You don’t have permission to add visits.");
            } else {
                alert("Failed to add visit. " + err.message);
            }
        }
    });
});
