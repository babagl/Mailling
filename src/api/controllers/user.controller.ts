import { Request, Response } from "express";
import { sendMail } from "../../services/transporter.service";

export const getUsers = async (req: Request, res: Response) => {
    try {
        await sendMail("gallebaba71@gmail.com", "Bonjour", "bonjour aussi");
        res.status(200).send({
            user: 'Baba Gallee',
            message: 'Email sent successfully'
        });
    } catch (error) {
        res.status(500).send({
            error: 'Failed to send email',
            details: error.message
        });
    }
};