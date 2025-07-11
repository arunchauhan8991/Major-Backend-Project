import "dotenv/config";

import connectDB from "./db/index.js";

/*
dotenv.config({
    path: "./.env" 
    // we can avoid setting up dotenv config explicitly as we import and config simultaneously
    // AND we also dont need to provide env file path as it is in root directory.
})
    */

connectDB()


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
