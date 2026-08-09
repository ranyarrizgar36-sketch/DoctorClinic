const translations = {
    en: {
        home: "Home",
        doctors: "Doctors",
        services: "Services",
        appointments: "Appointments",
        contact: "Contact",
        login: "Login",
        welcome: "Welcome to DoctorClinic",
        language: "Language"
    },

    ku: {
        home: "ماڵەوە",
        doctors: "پزیشکان",
        services: "خزمەتگوزارییەکان",
        appointments: "نۆرینەکان",
        contact: "پەیوەندی",
        login: "چوونەژوورەوە",
        welcome: "بەخێربێیت بۆ DoctorClinic",
        language: "زمان"
    },

    ar: {
        home: "الرئيسية",
        doctors: "الأطباء",
        services: "الخدمات",
        appointments: "المواعيد",
        contact: "اتصل بنا",
        login: "تسجيل الدخول",
        welcome: "مرحباً بكم في DoctorClinic",
        language: "اللغة"
    }
};

function applyLanguage(language) {
    if (!translations[language]) {
        language = "en";
    }

    localStorage.setItem("doctorClinicLanguage", language);

    document.documentElement.lang = language;
    document.documentElement.dir =
        (language === "ku" || language === "ar") ? "rtl" : "ltr";

    document.querySelectorAll("[data-translate]").forEach(function (element) {
        const key = element.getAttribute("data-translate");

        if (translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });

    document.querySelectorAll("[data-translate-placeholder]").forEach(function (element) {
        const key = element.getAttribute("data-translate-placeholder");

        if (translations[language][key]) {
            element.placeholder = translations[language][key];
        }
    });

    const selector = document.getElementById("languageSelector");

    if (selector) {
        selector.value = language;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const selector = document.getElementById("languageSelector");

    const savedLanguage =
        localStorage.getItem("doctorClinicLanguage") || "en";

    if (selector) {
        selector.addEventListener("change", function () {
            applyLanguage(this.value);
        });
    }

    applyLanguage(savedLanguage);
});