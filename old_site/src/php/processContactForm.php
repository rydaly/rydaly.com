<?php
    $errors = array(); // array to hold validation errors
    $data = array(); // array to pass back data
    
    // validate the variables ======================================================
    if (empty($_POST['name']))
        $errors['name'] = 'Name is required.';
    if (empty($_POST['email']))
        $errors['email'] = 'Email is required.';
    if (empty($_POST['message']))
        $errors['message'] = 'Message is required.';
    
    // return a response ===========================================================
    if ( ! empty($errors)) {
        $data['success'] = false;
        $data['errors'] = $errors;
        $data['messageError'] = "Uh oh, something's wrong. Please check the fields in red.";
    } else {
        $data['success'] = true;
        $data['messageSuccess'] = "Hey, thanks for reaching out! I'll get back to you soon.";
        $email_to = "ryan@rydaly.com";
        $email_subject = "Message from rydaly.com";
        $name = $_POST['name'];         // required
        $email_from = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
        $message = $_POST['message'];   // required
        
        $headers = "From: ContactForm@rydaly.com\r\n";
        $headers .= 'Content-Type: text/plain; charset=utf-8';
        
        if($email_from) {
            $headers .= "\r\nReply-To: $email_from\r\n";
            $headers .= 'X-Mailer: PHP/' . phpversion();
        }

        $email_message = "Hey buddy, someone sent you a message,\n\n";
        $email_message .= "Name: ".$name."\n";
        $email_message .= "Email: ".$email_from."\n\n";
        $email_message .= $message."\n";
        
        @mail($email_to, $email_subject, $email_message, $headers);
    }

    // return data to AJAX call ====================================================
    echo json_encode($data);
?>