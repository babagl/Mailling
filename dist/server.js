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
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const figlet_1 = __importDefault(require("figlet"));
const subscriber_routes_1 = __importDefault(require("./api/routes/subscriber.routes"));
const user_routes_1 = __importDefault(require("./api/routes/user.routes"));
class Server {
    constructor(_port) {
        this.port = _port;
        this.prisma = new client_1.PrismaClient();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const entreprises = [
                { name: "Talynx" },
                { name: "TensorAi" },
            ];
            for (let en of entreprises) {
                yield this.prisma.entreprise.upsert({
                    where: { name: en.name },
                    update: {},
                    create: { name: en.name }
                });
            }
            dotenv_1.default.config();
            const app = (0, express_1.default)();
            app.use(express_1.default.json());
            app.use((req, res, next) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
                next();
            });
            app.get('/', (req, res) => {
                res.send('salur les gens');
            });
            app.use('/user', user_routes_1.default);
            app.use('/subscriber', subscriber_routes_1.default);
            app.listen(this.port, () => {
                (0, figlet_1.default)("TENSOR AI", (err, data) => {
                    if (err) {
                        console.log('Quelque chose s\'est mal passé...');
                        console.dir(err);
                        return;
                    }
                    console.log(data);
                });
                console.log("Server demarree");
            });
        });
    }
}
exports.default = Server;
