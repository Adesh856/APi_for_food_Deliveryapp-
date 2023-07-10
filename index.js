const express = require("express")
const app = express()
const connection =require("./db")
const UserRouter = require("./routes/Users.routes")
const RestaurantRouter = require("./routes/Restaurants.routes")
const OrderRouter = require("./routes/Orders.routes")
const auth = require("./middelware/auth")
require("dotenv").config()
app.use(express.json())




app.use("/api",UserRouter)
app.use("/api",RestaurantRouter)
app.use(auth)
app.use("/api",OrderRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("MongoDb is connected with Server")
    } catch (error) {
        console.log("MongoDB is not connected with Server")
    }

    console.log(`Server is listening on Port : ${process.env.port}`)
})