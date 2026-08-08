const API_KEY = "doctorclinic-secret-key";

const params = new URLSearchParams(window.location.search);
const doctorId = params.get("id");


// =========================
// Load Doctor
// =========================

async function loadDoctor() {

    try {

        const response = await fetch(
            `http://127.0.0.1:8000/doctors/${doctorId}`,
            {
                method: "GET",
                headers: {
                    "X-API-Key": API_KEY
                }
            }
        );

        const doctor = await response.json();

        if (!response.ok) {
            throw new Error(
                doctor.detail || `Server returned ${response.status}`
            );
        }

        document.getElementById("full_name").value =
            doctor.full_name || "";

        document.getElementById("specialization").value =
            doctor.specialization || "";

        document.getElementById("email").value =
            doctor.email || "";

        document.getElementById("phone").value =
            doctor.phone || "";

        document.getElementById("experience").value =
            doctor.experience || "";

        document.getElementById("image").value =
            doctor.image || "";

    } catch (error) {

        console.error("Load doctor error:", error);

        alert("❌ Cannot load doctor: " + error.message);

    }
}


// =========================
// Update Doctor
// =========================

const doctorForm = document.getElementById("doctorForm");

if (doctorForm) {

    doctorForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const doctor = {

            full_name:
                document.getElementById("full_name").value,

            specialization:
                document.getElementById("specialization").value,

            email:
                document.getElementById("email").value,

            phone:
                document.getElementById("phone").value,

            experience:
                parseInt(
                    document.getElementById("experience").value
                ),

            image:
                document.getElementById("image").value

        };

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/doctors/${doctorId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        "X-API-Key": API_KEY
                    },

                    body: JSON.stringify(doctor)
                }
            );

            const result = await response.json();

            if (!response.ok) {

                alert(
                    "❌ Error: " +
                    JSON.stringify(result)
                );

                return;
            }

            if (result.success) {

                alert(
                    "✅ Doctor updated successfully!"
                );

                window.location.href = "doctors.html";

            } else {

                alert(
                    "❌ " +
                    (result.message ||
                     "Doctor could not be updated.")
                );

            }

        } catch (error) {

            console.error(
                "Update doctor error:",
                error
            );

            alert(
                "❌ Cannot connect to the server."
            );

        }

    });

}


// =========================
// Start
// =========================

loadDoctor();