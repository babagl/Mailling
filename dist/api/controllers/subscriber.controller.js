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
Object.defineProperty(exports, "__esModule", { value: true });
exports.doPost = exports.subscriber = void 0;
const client_1 = require("@prisma/client");
const console_1 = require("console");
const transporter_service_1 = require("../../services/transporter.service");
const prisma = new client_1.PrismaClient();
const subscriber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, console_1.log)(req.body);
    const { email, entrepriseName } = req.body;
    console.log({ email, entrepriseName });
    try {
        const entreprise = yield prisma.entreprise.findUnique({
            where: { name: entrepriseName }
        });
        if (!entreprise) {
            res.status(404).json({ message: "entreprise not found" });
        }
        const user = yield prisma.user.findUnique({
            where: { email },
            include: { Subscription: true }
        });
        if (user) {
            const alreadySubcribed = user.Subscription.some(s => s.entrepriseId === (entreprise === null || entreprise === void 0 ? void 0 : entreprise.id));
            if (alreadySubcribed) {
                yield (0, transporter_service_1.sendMail)(email, `From ${entrepriseName}`, `You are Already Subscribed to ${entrepriseName}`);
                return res.status(200).json({ message: `User Already subscribed to this entreprise` });
            }
            if (entreprise) {
                const subscrition = yield prisma.subscription.create({
                    data: {
                        userId: user.id,
                        entrepriseId: entreprise.id
                    }
                });
                yield (0, transporter_service_1.sendMail)(email, `From ${entrepriseName}`, `Thanks for subscribing to ${entrepriseName}`);
                return res.status(200).json({ user, subscrition });
            }
        }
        else {
            const newUser = yield prisma.user.create({
                data: {
                    email,
                    Subscription: {
                        create: {
                            entreprise: {
                                connect: {
                                    id: entreprise === null || entreprise === void 0 ? void 0 : entreprise.id
                                }
                            }
                        }
                    }
                }
            });
            yield (0, transporter_service_1.sendMail)(email, `From ${entrepriseName}`, `Thanks for subscribing to ${entrepriseName}`);
            return res.status(200).json({ newUser });
        }
    }
    catch (error) {
        res.status(400).json({ message: "error Subcribing", error });
    }
});
exports.subscriber = subscriber;
const doPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { firstName, lastName, email, message, phoneNumber } = req.body;
    try {
        const newPost = yield prisma.post.create({
            data: {
                firstName: firstName,
                lastName,
                email,
                message,
                phoneNumber
            }
        });
        const subject = `New message from ${firstName}, ${lastName}`;
        const text = `Message from ${firstName}, ${lastName}  with phone number ${phoneNumber} (${email}):\n\n${message}`;
        yield (0, transporter_service_1.sendMail)("sall.abdoulaye9991@gmail.com", subject, text);
        res.status(200).json({ message: 'Message sent successfully', newPost });
    }
    catch (error) {
        res.status(400).json({ message: 'Error sending message', error });
    }
});
exports.doPost = doPost;
