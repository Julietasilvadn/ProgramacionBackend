import {Router} from 'express';
import { userModel } from '../models/users.model';

const router = Router();

router.get("/", async (req, res)=>{
    try {
        let users = await userModel.find()
        res.send({result:'success', payload:users})
    } catch (error) {
        console.log("No se pueden encontrar usuarios con mongoose" + error)
    }
})