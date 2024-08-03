import { Router } from "express";
import * as UserController from "../controllers/user.controller";

const router = Router();


router.get('/', UserController.getUsers)


export default router;