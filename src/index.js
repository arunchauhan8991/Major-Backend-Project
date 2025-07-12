import "dotenv/config";
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB Connection Failed !!! ", err);
    
})


/* METHOD 2 USING IIFE
import express from "express";
const app = express()

//IIFE function to execute immediately after declaration
;( async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

       app.on("Errr: ", (error) => {
           throw error
       })

       app.listen(process.env.PORT, () => {
        console.log(`App is istening on port ${process.env.PORT}`);
        
       })

    } catch (error) {
        console.log("ERROR: ", error)
        throw error
    }
})()
    */
