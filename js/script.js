// Функция для сохранения выбранного языка в localStorage
function saveLanguageChoice(lang) {
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
    return window.location.pathname.includes('_uz.html') ? 'uz' : 'ru';
}

document.addEventListener('DOMContentLoaded', function() {
    checkAndRedirectBasedOnLanguage();

    // Обработчик событий для кнопки вызова формы
    var callOrderButton = document.getElementById('callOrderButton');
    callOrderButton.addEventListener('click', function() {
        var form = document.getElementById('orderForm');
        if (form.classList.contains('visible')) {
            form.classList.remove('visible');
            setTimeout(function() {
                form.style.opacity = '0';
                setTimeout(function() {
                    form.style.display = 'none';
                }, 500);
            }, 10);
        } else {
            form.style.display = 'flex';
            setTimeout(function() {
                form.style.opacity = '1';
                form.classList.add('visible');
            }, 10);
        }
    });

    // Инициализация маски ввода для поля телефона
    var phoneInput = document.getElementById('phone');
    var maskOptions = {
        mask: "+\\9\\98 (99) 999-99-99",
        placeholder: "+998 (__) ___-__-__",
        showMaskOnHover: false,
        showMaskOnFocus: true,
        clearIncomplete: true
    };
    var phoneMask = new Inputmask(maskOptions);
    phoneMask.mask(phoneInput);

    // Обработка отправки формы без перезагрузки страницы
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        var formData = new FormData(this);
        fetch('php/submit_form.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(text => {
            Swal.fire({
                title: 'TexService',
                text: 'Спасибо за ваш запрос! Ваше сообщение успешно отправлено. Наш специалист свяжется с вами в ближайшее время.',
                icon: 'success',
                confirmButtonText: 'ОК'
            });
            document.getElementById('orderForm').style.display = 'none'; // Скрыть форму после отправки
        })
        .catch(error => {
            console.error('Ошибка:', error);
            Swal.fire({
                title: 'Ошибка!',
                text: 'Не удалось отправить форму. Пожалуйста, попробуйте снова.',
                icon: 'error',
                confirmButtonText: 'Закрыть'
            });
        });
    });
    });
