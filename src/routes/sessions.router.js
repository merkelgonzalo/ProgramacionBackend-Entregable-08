import { Router } from 'express';
import {userModel} from '../Dao/models/users.model.js';

const router = Router();

router.post('/register', async (req, res) =>{

    const {first_name, last_name, email, age, password} = req.body;

    const exist = await userModel.findOne({email});
    if(exist){
        return res.status(400).send({status:"error", error:"User already exists"});
    }
    const user = {
        first_name, last_name, email, age, password
    };

    const result = await userModel.create(user);
    res.send({status:"succes", message:"User registered"});

});

export default router;