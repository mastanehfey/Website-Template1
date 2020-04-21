<?php
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];
	
// Create the email and send the message
$to = 'mastaneh.f@gmail.com'; // Message to:
$email_subject = "RBS website From: $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail Address: $email\n\nSubject: $subject\n\nMessage: $message";

$headers = "From: noreply@rbsol.ca\n";
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
return true;	
	
?>