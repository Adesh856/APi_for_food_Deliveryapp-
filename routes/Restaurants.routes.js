const express = require("express")
const RestaurantRouter = express.Router()
const RestaurantModel = require("../models/Restaurant.model")



//getallrestaurant
RestaurantRouter.get("/restaurants",async(req,res)=>{
    try {
        const restaurants= await RestaurantModel.find()
        res.status(200).send({"msg":"List of restaurants",Restaurants:restaurants})
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})
RestaurantRouter.post("/restaurants/add",async(req,res)=>{
    try {
        const restaurant= new RestaurantModel(req.body)
        await restaurant.save()

        res.status(200).send({"msg":" Restaurant has been added to the db",Restaurants:restaurant})
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})
//restaurantBYID
RestaurantRouter.get("/restaurants/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const restaurant= await RestaurantModel.findOne({_id:id})
        res.status(200).send({"msg":"List of restaurants",Restaurant:restaurant})
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})
//MenuBYID
RestaurantRouter.get("/restaurants/:id/menu",async(req,res)=>{
    const {id} = req.params
    try {
        const restaurant= await RestaurantModel.findOne({_id:id})
        res.status(200).send({"msg":"Menu of restaurant",Menu:restaurant.menu})
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})

//Edit Menu of Specific restaurant
RestaurantRouter.put("/restaurants/:id/menu",async(req,res)=>{
    const {id} = req.params
    const {item} = req.body
    try {
        const restaurant= await RestaurantModel.findByIdAndUpdate({_id:id},{
           $push:{menu:item} 
        })
        res.status(201).send({"msg":"New Item has been added to the menu"})
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})


//Delete restaurant from DB
RestaurantRouter.delete("/restaurants/:id/menu",async(req,res)=>{
    const {id} = req.params
    try {
        const restaurant= await RestaurantModel.findByIdAndDelete({_id:id})
        res.status(202).send({"msg":" Restaurant has been deleted",Deletedrestaurent:restaurant})
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})


module.exports=RestaurantRouter