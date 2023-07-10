const express = require("express")
const OrderRouter = express.Router()
const RestaurantModel = require("../models/Restaurant.model")
const OrderModel = require("../models/Order.model")

//Orderfood 
OrderRouter.post("/orders",async(req,res)=>{
    const {restaurantName,items,deliveryAddress} = req.body
    const restaurant = await RestaurantModel.findOne({name:restaurantName})
    if(!restaurant){
        res.status(401).send({"msg":"Restaurant not found"})
    }
 const menuItems = restaurant.menu.map((menu)=>menu.name)
 const InvalidItem = items.filter((item)=>!menuItems.includes(item.name))
 if(InvalidItem.length>0){
    res.status(400).send({"msg":"Invalid Item in the Order"})
 }
    let totalPrice = 0
    items.forEach(item => {
        const menuItem = restaurant.menu.find((menu)=>menu.name===item.name)
        if(menuItem){
            totalPrice+=menuItem.price*item.quantity
        }
    });
    const order = new OrderModel({
        user:req.user,
        restaurant:restaurant._id,
        items:items.map((item)=>({
         name:item.name,
         price:item.price,
         quantity:item.quantity
        })),
        totalPrice,
        deliveryAddress,
        status:"placed"
    })
    await order.save()
    res.status(201).send({"msg":"Order has been placed",order})
    try {
        
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})



//getOrderBYid
OrderRouter.get("/orders/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const Order = await OrderModel.findOne({_id:id,user:req.user})
    
        res.status(200).send({Order})

    } catch (error) {
        res.status(401).send({"msg":error.message})
        
    }
})

//UpdateOrderstatusbyID
OrderRouter.patch("/orders/:id",async(req,res)=>{
    const {id} = req.params
    const {status} = req.body
    try {
        const updatedOrder =await OrderModel.findByIdAndUpdate({_id:id,user:req.body},{
         status
        })
        res.status(204).send({updatedOrder})
    } catch (error) {
        res.status(401).send({"msg":error.message})
        
    }
})

module.exports=OrderRouter