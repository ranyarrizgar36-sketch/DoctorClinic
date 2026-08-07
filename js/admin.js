let allAppointments = [];

async function loadAppointments() {

    try {

        const response = await fetch("http://127.0.0.1:8000/appointments");

        allAppointments = await response.json();

        document.getElementById("appointmentsCount").textContent = allAppointments.length;

        displayAppointments(allAppointments);

    } catch (error) {

        console.error(error);

        alert("Cannot load appointments.");

    }

}

function displayAppointments(appointments) {

    const table = document.getElementById("appointmentTable");

    table.innerHTML = "";

    appointments.forEach(item => {

        table.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.full_name}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td>${item.department}</td>
                <td>${item.appointment_date}</td>
                <td>${item.message}</td>
            </tr>
        `;

    });

}

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText = this.value.toLowerCase();

        const filtered = allAppointments.filter(item =>
            item.full_name.toLowerCase().includes(searchText)
        );

        displayAppointments(filtered);

    });

}

loadAppointments();
const searchAppointment = document.getElementById("searchAppointment");

if (searchAppointment) {

    searchAppointment.addEventListener("keyup", function () {

        const filter = this.value.toLowerCase();

        const rows = document.querySelectorAll("#appointmentTable tr");

        rows.forEach(row => {

            const patient = row.children[1].textContent.toLowerCase();

            if (patient.includes(filter)) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    });

}