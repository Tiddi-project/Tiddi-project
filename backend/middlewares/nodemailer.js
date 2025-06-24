import nodemailer from "nodemailer";

// Configura aquí tu cuenta SMTP (puedes usar Gmail, Outlook, o SMTP de tu hosting)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // ejemplo con Gmail
  port: 587,
  secure: false,
  auth: {
    user: "tiddiproject@gmail.com",      // tu correo
    pass: "jrtj scua scro rjna"        // contraseña o app password (recomendado)
  }
});

const sendEmail = async ({ to, subject, html }) => {
    try {
        await transporter.sendMail({
            from: '"TiDDi - No responder" <tiddiproject@gmail.com>',
            to,
            subject,
            html
        });
        console.log("Correo enviado a:", to);
    } catch (err) {
        console.error("Error enviando correo:", err);
        throw err;
    }
};

export {transporter, sendEmail};

