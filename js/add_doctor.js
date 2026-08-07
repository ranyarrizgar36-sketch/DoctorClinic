document.addEventListener("DOMContentLoaded", function () {

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

        // ✅ Validation
        if (!doctor.email.includes("@")) {
            alert("❌ Please enter a valid email address.");
            return;
        }

        if (doctor.phone.length < 8) {
            alert("❌ Phone number is too short.");
            return;
        }

        if (doctor.experience <= 0 || isNaN(doctor.experience)) {
            alert("❌ Experience must be greater than 0.");
            return;
        }

        try {

            const response = await fetch("http://127.0.0.1:8000/doctors", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(doctor)

            });

            const result = await response.json();

            if (response.ok) {

                const addAnother = confirm(
    "✅ Doctor added successfully!\n\nDo you want to add another doctor?"
);

if (addAnother) {
    doctorForm.reset();
} else {
    window.location.href = "doctors.html";
}

            } else {

                alert("❌ Error: " + JSON.stringify(result));

            }

        } catch (error) {

            console.error(error);

            alert("❌ Cannot connect to the server.");

        }

    });

});