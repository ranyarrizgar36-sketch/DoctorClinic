ScrollReveal().reveal('.hero-text', {
    distance: '60px',
    origin: 'left',
    duration: 1200
});

ScrollReveal().reveal('.hero-image', {
    distance: '60px',
    origin: 'right',
    duration: 1200
});

ScrollReveal().reveal('.card', {
    interval: 200,
    distance: '40px',
    origin: 'bottom'
});

ScrollReveal().reveal('.doctor-card', {
    interval: 200,
    distance: '50px',
    origin: 'bottom'
});

ScrollReveal().reveal('.about', {
    distance: '60px',
    origin: 'bottom'
});

ScrollReveal().reveal('.appointment', {
    distance: '60px',
    origin: 'bottom'
});

ScrollReveal().reveal('.testimonial-card', {
    interval: 200,
    distance: '40px',
    origin: 'bottom'
});

ScrollReveal().reveal('.stats', {
    distance: '60px',
    origin: 'bottom'
});

ScrollReveal().reveal('.footer', {
    distance: '60px',
    origin: 'bottom'
});
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText;

        const increment = Math.ceil(target / 100);

        if (current < target) {
            counter.innerText = current + increment;
            setTimeout(updateCounter, 20);
        } else {
            if (target >= 1000) {
                counter.innerText = (target / 1000) + "K+";
            } else {
                counter.innerText = target + "+";
            }
        }
    };

    updateCounter();
});
// ==============================
// Appointment Form
// ==============================

const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {

    appointmentForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const appointment = {
            full_name: document.getElementById("fullName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            department: document.getElementById("department").value,
            appointment_date: document.getElementById("appointmentDate").value,
            message: document.getElementById("message").value
        };

        try {

            const response = await fetch("http://127.0.0.1:8000/appointments", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(appointment)

            });

            const result = await response.json();

            if (response.ok) {

                alert("✅ Appointment booked successfully!");

                appointmentForm.reset();

            } else {

                alert("❌ Error: " + JSON.stringify(result));

            }

        } catch (error) {

    console.error("ERROR:", error);

    alert(error.message);

}

    });

}