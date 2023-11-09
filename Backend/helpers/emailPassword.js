import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function pushEmail(mailDestinatario) {
  try {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASS,
      },
    });

    const forgetURL = 'http://localhost:3000/signIn/cambiarContrasenia';

    const mailOptions = {
      from: process.env.MAIL,
      to: mailDestinatario,
      subject: 'Recupero de password para iniciar sesión',
      text: `Ingresa al siguiente link para cambiar tu password: ${forgetURL}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info);

    return info.accepted;
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw error;
  }
}

export default pushEmail;
