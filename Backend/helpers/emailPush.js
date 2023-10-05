import nodemailer from 'nodemailer'
import passwordGenerator from 'generate-password'
import dotenv from 'dotenv';
dotenv.config();

function pushEmail(mailDestinatario){


// Esto va a generar una password aleatorias
    const valores = {
    length: 12,
    numbers: true,
    symbols: true,
    uppercase: true,
    };

    const newPass = passwordGenerator.generate(valores);

    //credenciales para enviar el mail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.MAIL, 
          pass: process.env.PASS, 
        },
      });
    
      // Detalles del correo electrónico
      const mailOptions = {
        from: process.env.MAIL, 
        to: mailDestinatario, 
        subject: 'Recupero de password para iniciar sesion', 
        text: `Tu nueva password es: ${newPass}`
      };
    
      // Envío del correo electrónico
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo electrónico:', error);
        } else {
          return newPass;
        }
      });

}

export default pushEmail;