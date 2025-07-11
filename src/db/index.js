import mongoose from "mongoose"
import { DB_NAME } from "../constant.js"

const connectDB = async () => {
    try {
        const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        
        
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1) //0 = Success (everything went fine) & 1 = General error or failure [EXIT CODE]
    }
}
export default connectDB