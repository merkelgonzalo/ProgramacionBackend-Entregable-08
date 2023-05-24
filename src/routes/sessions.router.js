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
        first_name,
        last_name,
        email,
        age,
        password
    };

    const result = await userModel.create(user);
    res.send({status:"succes", message:"User registered"});

});

router.post('/login', async (req,res)=>{
    const { email, password } = req.body;

    const user = await userModel.findOne({email,password});

    if(!user){
        return res.status(400).send({status:"error", error:"Invalid data"})
    }
  
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    res.send({status:"success", payload:req.session.user, message:"Welcome!"})
    
});

export default router;