import nodemailer from 'nodemailer';
import passwordGenerator from 'generate-password';
import dotenv from 'dotenv';
dotenv.config();

async function pushEmail(mailDestinatario) {
  console.log(mailDestinatario);
  try {
    const valores = {
      length: 12,
      numbers: true,
      symbols: true,
      uppercase: true,
    };

    const newPass = passwordGenerator.generate(valores);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
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

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info);

    return newPass;
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw error;
  }
}

export default pushEmail;
