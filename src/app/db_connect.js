import mongoose from "mongoose";

const connect=async()=>{
    try
    {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database")
    }catch(error)
    {
        throw new Error("Error while connecting to database")
    }
}

export default connect;