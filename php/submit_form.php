<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    
    $to = 'bobolin.machon@mail.ru';
    $subject = 'Заказ звонка с сайта';
    $message = "Имя: $name\nТелефон: $phone";
    $headers = 'From: bobolin.machon@mail.ru' . "\r\n" .
               'Reply-To: bobolin.machon@mail.ru' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    if (mail($to, $subject, $message, $headers)) {
        echo "Спасибо! Ваше сообщение отправлено.";
    } else {
        echo "Ошибка при отправке сообщения.";
    }
} else {
    echo "Некорректный запрос.";
}
?>