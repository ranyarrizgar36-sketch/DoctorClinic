const params = new URLSearchParams(window.location.search);

const doctorId = params.get("id");

async function loadDoctor() {

    try {

        const response = await fetch(`http://127.0.0.1:8000/doctors/${doctorId}`);

        const doctor = await response.json();

        document.getElementById("full_name").value = doctor.full_name;
        document.getElementById("specialization").value = doctor.specialization;
        document.getElementById("email").value = doctor.email;
        document.getElementById("phone").value = doctor.phone;
        document.getElementById("experience").value = doctor.experience;
        document.getElementById("image").value = doctor.image;

    } catch (error) {

        console.error(error);
        alert("Cannot load doctor.");

    }

}

loadDoctor();
const doctorForm = document.getElementById("doctorForm");

doctorForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const doctor = {
        full_name: document.getElementById("full_name").value,
        specialization: document.getElementById("specialization").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        experience: parseInt(document.getElementById("experience").value),
        image: document.getElementById("image").value
    };

    try {

        const response = await fetch(
            `http://127.0.0.1:8000/doctors/${doctorId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(doctor)
            }
        );

        const result = await response.json();

        if (result.success) {

            alert("✅ Doctor updated successfully!");

window.location.href = "doctors.html";

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

        alert("❌ Cannot connect to the server.");

    }

});