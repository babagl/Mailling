import dotenv from 'dotenv';
dotenv.config()
// src/services/transporter.service.ts
import nodemailer from 'nodemailer';

console.log(process.env.EMAIL_USER)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: 'Gmail',
    secure: true,
    requireTLS: true,
    secureConnection: true,
    debug: true,
    logger: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    }
});

export const sendMail = async (to: string, subject: string, text: string, html?: string) => {
    console.log("user_email:", process.env.EMAIL_USER, "Mot de passe:", process.env.EMAIL_PASSWORD);
    const mailOption = {
        from: {
            name: 'Tensor',
            address: process.env.EMAIL_USER
        },
        to: to,
        subject: subject,
        text: text,
        html: html || text,
    };

    try {
        const result = await transporter.sendMail(mailOption);
        console.log('Email sent:', result);
        return result;
    } catch (error) {
        console.error("error sending mail", error);
        throw error;
    }
};
