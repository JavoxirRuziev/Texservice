// Функция для сохранения выбранного языка в localStorage
function saveLanguageChoice(lang) {
    localStorage.setItem('preferredLanguage', lang);
}

// Функция для проверки сохранённого языка и автоматической переадресации при необходимости
function checkAndRedirectBasedOnLanguage() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const currentLanguage = getCurrentLanguage();

    if (savedLanguage && savedLanguage !== currentLanguage) {
        window.location.href = savedLanguage === 'ru' ? 'index_ru.html' : 'index_uz.html';
    }
}

// Функция для определения текущего языка на основе URL
function getCurrentLanguage() {
    return window.location.pathname.includes('_ru.html') ? 'ru' : 'uz';
}

// Вызов функции проверки и переадресации при загрузке страницы
window.onload = checkAndRedirectBasedOnLanguage;