// JS/common.js
const API_BASE = "https://localhost:7182/api"; // your API base

async function apiRequest(endpoint, method = "GET", data = null) {
    const token = localStorage.getItem("token"); // retrieve token
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
        }
    };
    if (data) options.body = JSON.stringify(data);

    const res = await fetch(`${API_BASE}${endpoint}`, options);

    if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
            // token expired or forbidden → redirect to login
            alert("Session expired or access denied. Please log in again.");
            window.location.href = "login.html";
        }
        const errText = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${res.statusText} — ${errText}`);
    }

    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return await res.json();
    return await res.text();
}

/* ---- Patients ---- */
function getPatients() {
    return apiRequest("/Patient"); 
}
function addPatient(patient) {
    return apiRequest("/Patient", "POST", patient);
}

/* ---- Doctors ---- */
function getDoctors() {
    return apiRequest("/Doctor"); 
}
function addDoctor(doctor) {
    return apiRequest("/Doctor", "POST", doctor);
}

/* ---- Visit Types ---- */
function getVisitTypes() {
    return apiRequest("/VisitType"); 
}

/* ---- Visits ---- */
function getVisits() {
    return apiRequest("/PatientVisit"); 
}
function addVisit(visit) {
    return apiRequest("/PatientVisit", "POST", visit);
}

/* ---- User Auth ---- */
async function loginUser(username, password) {
    return await apiRequest("/User/login", "POST", { username, password });
}
async function registerUser(username, password, confirmPassword) {
    return await apiRequest("/User/register", "POST", { username, password, confirmPassword });
}
