<?php

// Allow from any origin
if (isset($_SERVER["HTTP_ORIGIN"])) {
  // header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
  header("Access-Control-Allow-Origin: '*'");
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Max-Age: 86400"); // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {

  if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

  if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
    header("Access-Control-Allow-Headers: {$_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]}");

  exit(0);
}

function sanitize_email($field)
{
  $field = filter_var($field, FILTER_SANITIZE_EMAIL);
  if (filter_var($field, FILTER_VALIDATE_EMAIL)) {
    return true;
  } else {
    return false;
  }
}

function sanitize_string($field) {
  return filter_var($field, FILTER_SANITIZE_STRING);
}

$errors = array(); // array to hold validation errors
$data = array(); // array to pass back data

// validate the variables ======================================================
if (empty($_POST["name"]))
  $errors["name"] = "Name is required.";
if (empty($_POST["email"]))
  $errors["email"] = "Email is required.";
if (empty($_POST["message"]))
  $errors["message"] = "Message is required.";

$email_sanitized = sanitize_email($_POST["email"]);
if ($email_sanitized == false) {
  $errors["invalid"] = "Invalid email input.";
}

$name_sanitized = sanitize_string($_POST["name"]);
$msg_sanitized = sanitize_string($_POST["message"]);

// return a response ===========================================================
if (!empty($errors)) {
  $data["success"] = false;
  $data["errors"] = $errors;
  if (!empty($errors["invalid"])) {
    $data["messageError"] = "The email input looks fishy.";
  } else {
    $data["messageError"] = "Uh oh, something's wrong. Please check the fields in red.";
  }
} else {
  $data["success"] = true;
  $data["messageSuccess"] = "Hey, thanks for reaching out! I'll get back to you soon.";
  $email_to = "rydaly@gmail.com";
  $email_subject = "Message from rydaly.com";
  $name = $name_sanitized;
  $email_from = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
  $message = $msg_sanitized;

  $headers = "From: admin@rydaly.com\r\n";
  $headers .= "Reply-To: admin@rydaly.com\r\n";
  $headers .= "Return-Path: admin@rydaly.com\r\n";
  $headers .= "Content-Type: text/plain; charset=utf-8";

  if ($email_from) {
    $headers .= "\r\nReply-To: $email_from\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
  }

  $email_message = "Hey buddy, someone sent you a message,\n\n";
  $email_message .= "Name: " . $name . "\n";
  $email_message .= "Email: " . $email_from . "\n\n";
  $email_message .= $message . "\n";

  mail($email_to, $email_subject, $email_message, $headers);
}

// return data to AJAX call ====================================================
echo json_encode($data);
