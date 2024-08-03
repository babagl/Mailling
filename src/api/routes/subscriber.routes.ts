import { Router } from "express";
import * as SubscriberController from "../controllers/subscriber.controller";

const subscribeRouter = Router();

subscribeRouter.post('/', SubscriberController.subscriber);
subscribeRouter.post('/post', SubscriberController.doPost);


export default subscribeRouter;