const sgMail = require('./connection');

async function sendEmail(User, subject, HTMLContent) {
    try {
        const msg = {
            to: User.email, // Destinatario a recibir el correo
            from: 'jacatorresre@ittepic.edu.mx', // Correo del remitente
            subject: subject, // Asunto del correo
            html: HTMLContent // Contenido HTML del correo
        };
        await sgMail.send(msg);
        console.log('Correo enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo:', error.response ? error.response.body : error.message);
    }
}

module.exports = sendEmail;