import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import figlet from 'figlet';
import subscribeRouter from './api/routes/subscriber.routes';
import router from './api/routes/user.routes';

export default class Server{
    readonly port: number
    private prisma: PrismaClient
    constructor(_port: number){
        this.port = _port
        this.prisma = new PrismaClient() 
    }

    async start(){
        const entreprises = [
            { name: "Talynx" },
            { name: "TensorAi" },
        ];
        
        for(let en of entreprises){
            await this.prisma.entreprise.upsert({
                where:{ name: en.name},
                update:{},
                create: {name: en.name}
            })
        }
        dotenv.config()
        const app = express()

        app.use(express.json());

        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
            next();
          });

        app.get('/', (req: Request, res: Response)=>{
            res.send('salur les gens');
        })

        app.use('/user', router)
        app.use('/subscriber', subscribeRouter)

        app.listen(this.port, ()=>{
            figlet("TENSOR AI",(err,data)=>{
                if (err) {
                    console.log('Quelque chose s\'est mal passé...');
                    console.dir(err);
                    return;
                  }
                  console.log(data);
            })
            console.log("Server demarree")
        })
    }
}