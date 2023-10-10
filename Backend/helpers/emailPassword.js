import nodemailer from 'nodemailer'
import passwordGenerator from 'generate-password'
import dotenv from 'dotenv';
dotenv.config();

function pushEmail(mailDestinatario) {
  return new Promise((resolve, reject) => {
    const valores = {
      length: 12,
      numbers: true,
      symbols: true,
      uppercase: true,
    };

    const newPass = passwordGenerator.generate(valores);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL,
      to: mailDestinatario,
      subject: 'Recupero de password para iniciar sesión',
      text: `Tu nueva password es: ${newPass}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico:', error);
        reject(error);
      } else {
        resolve(newPass);
      }
    });
  });
}

export default pushEmail;
