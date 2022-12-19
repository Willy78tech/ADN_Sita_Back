"Use strict";
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const user = process.env.MAIL_Auth_USER;
const pass = process.env.MAIL_Auth_PASS;
const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const mail_sender = process.env.MAIL_SENDER;


var transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: {
        user: user,
        pass: pass
    }
});
 
module.exports.sendEmail = (pseudo, email, confirmationUrl) => {
    transport.sendMail ({
        from: mail_sender,
        to: email,
        subject: 'Confirmation de votre compte',
        html: `<h1>Bonjour ${pseudo}</h1>
        <p>Merci de confirmer votre compte en cliquant sur le lien ci-dessous</p>
        <a href="https://adnsita.onrender.com/login">Confirmer mon compte</a>`
    }).catch(err => console.log(err));   
};