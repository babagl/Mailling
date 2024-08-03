import { PrismaClient } from "@prisma/client";
import { log } from "console";
import { Request, Response } from "express";
import { sendMail } from "../../services/transporter.service";
const prisma = new PrismaClient();


export const subscriber = async (req:Request, res:Response)=>{
    log(req.body)
    const {email, entrepriseName} = req.body;
    console.log({email , entrepriseName});

    try {
        const entreprise = await prisma.entreprise.findUnique({
            where: {name: entrepriseName}
        })

        if (!entreprise) {
            res.status(404).json({message: "entreprise not found"});
        }

        const user = await prisma.user.findUnique({
            where: {email},
            include: {Subscription: true}
        })

        if (user) {
            const alreadySubcribed= user.Subscription.some(s=>s.entrepriseId === entreprise?.id)
            if (alreadySubcribed) {
                await sendMail(email , `From ${entrepriseName}`, `You are Already Subscribed to ${entrepriseName}`);
                return res.status(200).json({message: `User Already subscribed to this entreprise`})
            }
            if (entreprise) {
                const subscrition = await prisma.subscription.create({
                    data: {
                        userId: user.id,
                        entrepriseId: entreprise.id
                    }
                })

                await sendMail(email, `From ${entrepriseName}`, `Thanks for subscribing to ${entrepriseName}`);

                return res.status(200).json({user , subscrition});
            }
           
        }else{
            const newUser = await prisma.user.create({
                data:{
                    email,
                    Subscription:{
                        create:{
                            entreprise:{
                                connect:{
                                    id:entreprise?.id
                                }
                            }
                        }
                    }
                }
            });

            await sendMail(email, `From ${entrepriseName}`, `Thanks for subscribing to ${entrepriseName}`);
            return res.status(200).json({newUser});
        }
    }catch(error){
        res.status(400).json({message: "error Subcribing", error})
    }
}


export const doPost = async(req: Request, res: Response)=>{
    console.log(req. body);
    const {firstName , lastName, email, message, phoneNumber} = req.body


    try {
        const newPost = await prisma.post.create({
            data: {
                firstName: firstName,
                lastName,
                email,
                message,
                phoneNumber
            }
        })
        const subject = `New message from ${firstName}, ${lastName}`
        const text = `Message from ${firstName}, ${lastName}  with phone number ${phoneNumber} (${email}):\n\n${message}`
        await sendMail("sall.abdoulaye9991@gmail.com", subject, text)
        res.status(200).json({ message: 'Message sent successfully', newPost });
    } catch (error) {

        res.status(400).json({message: 'Error sending message', error})
        
    }

}
