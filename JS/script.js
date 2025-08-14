// common.js
const API_BASE_URL = "https://your-api-url.com"; // Change to your API endpoint

async function apiRequest(endpoint, method = "GET", data = null) {
    const options = {
        method,
        headers: { "Content-Type": "application/json" }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
}

// Example specific API calls (can be used anywhere)
async function getPatients() {
    return await apiRequest("/patients");
}

async function addPatient(patient) {
    return await apiRequest("/patients", "POST", patient);
}

async function getVisits() {
    return await apiRequest("/visits");
}

async function addVisit(visit) {
    return await apiRequest("/visits", "POST", visit);
}

async function addDoctor(doctor) {
    return await apiRequest("/doctors", "POST", doctor);
}
