async function loadDoctors() {

    try {

        const response = await fetch("http://127.0.0.1:8000/doctors");

        const doctors = await response.json();

        const table = document.getElementById("doctorTable");

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
        <button onclick="editDoctor(${doctor.id})">Edit</button>
        <button onclick="deleteDoctor(${doctor.id})">Delete</button>
    </td>
</tr>
`;

        });

    } catch (error) {

        console.error(error);

        alert("Cannot load doctors.");

    }

}

loadDoctors();
async function deleteDoctor(id) {

    const confirmDelete = confirm(
    "⚠️ Are you sure you want to delete this doctor?\nThis action cannot be undone."
);

if (!confirmDelete) {
    return;
}

    try {

        const response = await fetch(`http://127.0.0.1:8000/doctors/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (result.success) {
            alert("✅ Doctor deleted successfully!");
            loadDoctors();
        } else {
            alert(result.message);
        }

    } catch (error) {

        console.error(error);
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

            const name = row.children[1].textContent.toLowerCase();

            if (name.includes(filter)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });

}