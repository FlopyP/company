<?php
//Importamos las variables del formulario de contacto

@$nombre = addslashes($_POST['name']);
@$email = addslashes($_POST['email']);
@$tel = addslashes($_POST['tel']);
@$texto = addslashes($_POST['message']);

//Preparamos el mensaje de contacto
$cabeceras = "From: $email\n" //La persona que envia el correo
 . "Reply-To: $email\n";
$asunto = "CONSULTA LANDING CAM SEGUROS"; //asunto aparecera en la bandeja del servidor de correo
$email_to = "info@camseguros.com.ar"; //cambiar por tu email
$contenido = "$nombre ha enviado un mensaje desde la web www.camseguros.com.ar/\n"
. "\n"
. "NOMBRE: $nombre\n"
. "EMAIL: $email\n"
. "TEL: $tel\n"
. "ASUNTO: $asunto\n"
. "MENSAJE: $texto\n"
. "\n";
//Enviamos el mensaje y comprobamos el resultado
if (@mail($email_to, $asunto ,$contenido ,$cabeceras )) {

//Si el mensaje se envía muestra una confirmación
header("Location: https://www.camseguros.com.ar/contacto-gracias.html");

}else{
//Si el mensaje no se envía muestra el mensaje de error
header("Location: https://www.camseguros.com.ar");
}
?>