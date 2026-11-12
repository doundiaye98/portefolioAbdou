<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false]);
    exit;
}

function field($key) {
    $value = isset($_POST[$key]) ? trim((string) $_POST[$key]) : '';
    return str_replace(["\r", "\n"], ' ', $value);
}

if (!empty($_POST['company'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$name = field('name');
$email = field('email');
$subject = field('subject');
$message = isset($_POST['message']) ? trim((string) $_POST['message']) : '';
$message = str_replace("\r\n", "\n", $message);
$message = str_replace("\r", "\n", $message);

$valid = $name !== ''
    && $subject !== ''
    && $message !== ''
    && filter_var($email, FILTER_VALIDATE_EMAIL)
    && strlen($name) <= 120
    && strlen($subject) <= 160
    && strlen($message) <= 5000;

if (!$valid) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Merci de vérifier les champs.']);
    exit;
}

$to = 'abdou.lourd2022@gmail.com';
$body = "Nom: {$name}\nEmail: {$email}\n\n{$message}\n";
$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Portfolio <noreply@localhost>',
    'Reply-To: ' . $email,
]);

$sent = @mail($to, 'Portfolio — ' . $subject, $body, $headers);

if (!$sent) {
    http_response_code(502);
    echo json_encode(['ok' => false]);
    exit;
}

echo json_encode(['ok' => true]);
