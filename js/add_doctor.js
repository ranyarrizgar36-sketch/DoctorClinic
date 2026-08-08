const API_KEY = "doctorclinic-secret-key";

const form = document.getElementById("addDoctorForm");

console.log("Add Doctor JS loaded");
console.log("Form:", form);

if (form) {

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        console.log("Add Doctor button clicked");

        const doctorData = {
            full_name: document.getElementById("full_name").value,
            specialization: document.getElementById("specialization").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            experience: parseInt(
                document.getElementById("experience").value
            ),
            image_url: document.getElementById("image_url").value || null
        };

        console.log("Sending:", doctorData);

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/doctors",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "X-API-Key": API_KEY
                    },

                    body: JSON.stringify(doctorData)
                }
            );

            const result = await response.json();

            console.log("Server response:", response.status, result);

            if (!response.ok) {
                alert("❌ Error: " + JSON.stringify(result));
                return;
            }

            alert("✅ Doctor added successfully!");

            form.reset();

            window.location.href = "doctors.html";

        } catch (error) {

            console.error("ERROR:", error);

            alert("❌ Cannot connect to the server.");

        }

    });

} else {

    console.error("❌ addDoctorForm was NOT found!");

}