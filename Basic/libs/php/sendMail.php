<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

$message = 'Name: ' . $_REQUEST['name'] . '<br>Email: ' . $_REQUEST['userEmail'] . '<br>Card: ' . $_REQUEST['card'];

//Server settings
$mail->isSMTP();
$mail->Host       = 'smtp.hostinger.com';
$mail->SMTPAuth   = true;
$mail->Username   = 'fleetcorproj@granitjupolli.co.uk';
$mail->Password   = 'nA15$59ZAzj3';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
$mail->Port       = 465;

//Recipients
$mail->setFrom('fleetcorproj@granitjupolli.co.uk', $_REQUEST['name']);
$mail->addAddress('test@dn-uk.com');

//Content
$mail->isHTML(true);
$mail->Subject = 'card form submit';
$mail->Body    = $message;

$mail->send();

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output); 


?>