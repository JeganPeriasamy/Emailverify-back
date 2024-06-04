const nodemailer = require("nodemailer");
require('dotenv').config();

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST || 'smtp.mailtrap.io',
            port: Number(process.env.EMAIL_PORT) || 2525,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        const mailOptions = {
            from: process.env.USER,
            to: email,
            subject: subject,
            text: `${text}\n\nVisit us at: ${process.env.BASE_URL}`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Email not sent!");
        console.log(error);
        console.error(error.stack); // Detailed error logging
        return error;
    }
};
