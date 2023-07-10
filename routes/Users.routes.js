const express = require("express")
const UserRouter = express.Router()
const UserModel = require("../models/Users.model")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
//register
UserRouter.post("/register",async(req,res)=>{
    const {name,email,password,address} = req.body
    try {
        const hash = bcrypt.hashSync(password, 5);
        const User =new UserModel({
            name,
            email,
            password:hash,
            address
        })
        await User.save()

        res.status(201).send({"msg":"User has been added",User})
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})

//Login
UserRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const ISUserPresentINTheDB = await UserModel.findOne({email})
        if(!ISUserPresentINTheDB){
            res.status(401).send({"msg":"Invalid Credentials"})
        } 
        const comparePassDBandBody = bcrypt.compareSync(password, ISUserPresentINTheDB.password);
        if(!comparePassDBandBody){
            res.status(401).send({"msg":"Invalid Password"})
        }
        const token = jwt.sign({
            UserID: ISUserPresentINTheDB._id,
          }, 'FoodAPP', { expiresIn: '1h' });
          res.status(201).send({
            "msg":"Login Successfully",
            token
          })
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})

//resetPass

UserRouter.patch("/user/:id/reset",async(req,res)=>{
   const {id} = req.params
   const {Newpassword,Oldpassword} = req.body
    try {
        const Usercheck = await UserModel.findOne({_id:id})
        const comparePassDBandBody = bcrypt.compareSync(Oldpassword, Usercheck.password);
        if(!comparePassDBandBody){
            res.status(401).send({"msg":"Invalid Oldpassword"})
        }
        const hashnewpass =  bcrypt.hashSync(Newpassword, 5);
        const setNewpass = await UserModel.findByIdAndUpdate({_id:id},{
            password:hashnewpass
        })
        if(setNewpass){
            res.status(204).send({"msg":"Password has been reseted successfully"})
        }
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }

})







module.exports = UserRouter