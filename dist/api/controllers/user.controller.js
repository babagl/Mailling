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
exports.getUsers = void 0;
const transporter_service_1 = require("../../services/transporter.service");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, transporter_service_1.sendMail)("gallebaba71@gmail.com", "Bonjour", "bonjour aussi");
        res.status(200).send({
            user: 'Baba Gallee',
            message: 'Email sent successfully'
        });
    }
    catch (error) {
        res.status(500).send({
            error: 'Failed to send email',
            details: error.message
        });
    }
});
exports.getUsers = getUsers;
