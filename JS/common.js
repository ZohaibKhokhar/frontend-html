// JS/common.js
const API_BASE = "https://localhost:7182/api"; // your API base

async function apiRequest(endpoint, method = "GET", data = null) {
    const options = {
        method,
        headers: { "Content-Type": "application/json" }
    };
    if (data) options.body = JSON.stringify(data);

    const res = await fetch(`${API_BASE}${endpoint}`, options);

    // Throw helpful error on non-2xx
    if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${res.statusText} — ${errText}`);
    }

    // Handle text or JSON gracefully
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return await res.json();
    return await res.text();
}

/* ---- Patients ---- */
function getPatients() {
    return apiRequest("/Patient"); // GET /api/Patient
}
function addPatient(patient) {
    // POST /api/Patient
    return apiRequest("/Patient", "POST", patient);
}

/* ---- Doctors ---- */
function getDoctors() {
    return apiRequest("/Doctor"); // GET /api/Doctor
}
function addDoctor(doctor) {
    // POST /api/Doctor
    return apiRequest("/Doctor", "POST", doctor);
}

/* ---- Visit Types ---- */
function getVisitTypes() {
    return apiRequest("/VisitType"); // GET /api/VisitType
}

/* ---- Visits ---- */
function getVisits() {
    return apiRequest("/PatientVisit"); // GET /api/PatientVisit
}
function addVisit(visit) {
    // POST /api/PatientVisit
    return apiRequest("/PatientVisit", "POST", visit);
}

// User auth
async function loginUser(username, password) {
    return await apiRequest("/User/login", "POST", { username, password });
}

async function registerUser(username, password, confirmPassword) {
    return await apiRequest("/User/register", "POST", { username, password, confirmPassword });
}