// Функция для сохранения выбранного языка в localStorage
function saveLanguageChoice(lang) {
    // Проверяем, доступно ли localStorage
    try {
        localStorage.setItem('preferredLanguage', lang);
    } catch (e) {
        console.error('LocalStorage не доступен: ', e);
    }
}

// Функция для проверки сохранённого языка и автоматической переадресации при необходимости
function checkAndRedirectBasedOnLanguage() {
    let savedLanguage;
    try {
        savedLanguage = localStorage.getItem('preferredLanguage');
    } catch (e) {
        console.error('LocalStorage не доступен: ', e);
    }

    const currentLanguage = getCurrentLanguage();

    if (savedLanguage && savedLanguage !== currentLanguage) {
        const pageToRedirect = savedLanguage === 'ru' ? 'index.html' : 'index_uz.html';
        window.location.href = pageToRedirect;
    }
}

// Функция для определения текущего языка на основе URL
function getCurrentLanguage() {
    // Предполагаем, что URL узбекской версии содержит '_uz'
    return window.location.pathname.includes('_uz.html') ? 'uz' : 'ru';
}

// Добавляем слушателя события когда контент DOM полностью загружен
document.addEventListener('DOMContentLoaded', function() {
    checkAndRedirectBasedOnLanguage();
});