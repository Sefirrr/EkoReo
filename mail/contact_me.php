<?php
// Check for empty fields
if(empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['phone'])     ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
   echo "No arguments Provided!";
   return false;
   }
   
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));
   
// Create the email and send the message
$to = 'biuro@ekotrans24.com','damian@ekotrans24.com','t.kraszkiewicz@ekotrans24.com'; // Add your email address inbetween the '' replacing cecot.karol@gmail.com - This is where the form will send a message to.
$email_subject = "Wiadomość od :  $name";
$email_body = "Otrzymano wiadomość z formularza kontakt: .\n\n"."Treść wiadomości :\n\nImię: $name\n\nEmail: $email_address\n\nTelefon:: $phone\n\nWiadomość:\n$message";
$headers = "From: biuro@ekotrans24.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";   
mail($to,$email_subject,$email_body,$headers);
return true;         
?>
