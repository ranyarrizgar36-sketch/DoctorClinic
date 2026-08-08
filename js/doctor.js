async function loadDoctors() {

    try {

        const response = await fetch("http://127.0.0.1:8000/doctors", {
            method: "GET",
            headers: {
                "X-API-Key": "doctorclinic-secret-key"
            }
        });

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        const doctors = await response.json();

        const table = document.getElementById("doctorTable");

        if (!table) {
            console.error("doctorTable was not found.");
            return;
        }

        table.innerHTML = "";

        doctors.forEach(doctor => {

            table.innerHTML += `
                <tr>
                    <td>${doctor.id}</td>
                    <td>${doctor.full_name}</td>
                    <td>${doctor.specialization}</td>
                    <td>${doctor.email}</td>
                    <td>${doctor.phone}</td>
                    <td>${doctor.experience} Years</td>

                    <td>
                        <button onclick="editDoctor(${doctor.id})">
                            Edit
                        </button>

                        <button onclick="deleteDoctor(${doctor.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.error("Error loading doctors:", error);

        alert("❌ Cannot load doctors.");

    }

}


async function deleteDoctor(id) {

    const confirmDelete = confirm(
        "⚠️ Are you sure you want to delete this doctor?\nThis action cannot be undone."
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            `http://127.0.0.1:8000/doctors/${id}`,
            {
                method: "DELETE",
                headers: {
                    "X-API-Key": "doctorclinic-secret-key"
                }
            }
        );

        const result = await response.json();

        if (response.ok && result.success) {

            alert("✅ Doctor deleted successfully!");

            loadDoctors();

        } else {

            alert(
                "❌ " +
                (result.detail || result.message || "Cannot delete doctor.")
            );

        }

    } catch (error) {

        console.error("Delete error:", error);

        alert("❌ Cannot connect to the server.");

    }

}


function editDoctor(id) {

    window.location.href = `edit_doctor.html?id=${id}`;

}


const searchInput = document.getElementById("searchDoctor");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const filter = this.value.toLowerCase();

        const rows = document.querySelectorAll("#doctorTable tr");

        rows.forEach(row => {

            const nameCell = row.children[1];

            if (!nameCell) {
                return;
            }

            const name = nameCell.textContent.toLowerCase();

            if (name.includes(filter)) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    });

}


loadDoctors();