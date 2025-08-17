document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("visitTypeForm");
    const visitTypeNameInput = document.getElementById("visitTypeName");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const TypeName = visitTypeNameInput.value.trim();

        if (!TypeName) {
            alert("Please enter a Visit Type name.");
            return;
        }

        const visitType = {TypeName };

        try {
             await AddVisitType(visitType);
            alert("Visit Type added successfully.");
            form.reset();

            // If your apiRequest returns a Response object
          
        } catch (err) {
            console.error("Error adding Visit Type:", err);
            alert("❌ Failed to add Visit Type: " + err.message);
        }
    });
});
