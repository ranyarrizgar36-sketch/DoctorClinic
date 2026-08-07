async function loadDashboard() {

    try {

        const doctorResponse = await fetch("http://127.0.0.1:8000/doctors");
        const doctors = await doctorResponse.json();

        document.getElementById("doctorCount").textContent = doctors.length;

        const appointmentResponse = await fetch("http://127.0.0.1:8000/appointments");
        const appointments = await appointmentResponse.json();

        document.getElementById("appointmentCount").textContent = appointments.length;

        createChart(doctors.length, appointments.length);

    } catch (error) {

        console.error(error);

        alert("Cannot load dashboard.");

    }

}

function createChart(doctors, appointments) {

    const ctx = document.getElementById("dashboardChart");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Doctors", "Appointments"],
            datasets: [{
                label: "System Statistics",
                data: [doctors, appointments]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

}

loadDashboard();
function logout() {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        window.location.href = "login.html";

    }

}
function showDate() {

    const today = new Date();

    document.getElementById("currentDate").textContent =
        "Today: " + today.toDateString();

}

showDate();
#currentDate{
    color:#666;
    margin-bottom:20px;
    font-size:18px;
}