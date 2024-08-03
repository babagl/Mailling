"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// src/services/transporter.service.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
console.log(process.env.EMAIL_USER);
const transporter = nodemailer_1.default.createTransport({
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
const sendMail = (to, subject, text, html) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield transporter.sendMail(mailOption);
        console.log('Email sent:', result);
        return result;
    }
    catch (error) {
        console.error("error sending mail", error);
        throw error;
    }
});
exports.sendMail = sendMail;
