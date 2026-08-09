let currentLanguage = localStorage.getItem("doctorClinicLanguage") || "en";

function setLanguage(language) {
    if (!translations[language]) {
        language = "en";
    }

    currentLanguage = language;

    localStorage.setItem("doctorClinicLanguage", language);

    const direction = language === "en" ? "ltr" : "rtl";

    document.documentElement.lang = language;
    document.documentElement.dir = direction;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");

        if (translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        const key = element.getAttribute("data-i18n-placeholder");

        if (translations[language][key]) {
            element.placeholder = translations[language][key];
        }
    });

    const languageSelector = document.getElementById("languageSelector");

    if (languageSelector) {
        languageSelector.value = language;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setLanguage(currentLanguage);
});