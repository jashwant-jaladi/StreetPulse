import mongoose from "mongoose"

const {Schema}= mongoose 
 const RegisterSchema=new Schema({
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    confirmPassword:
    {
        type:String,
        required:true
    }

}, {timeStamps:true})

export default mongoose.models.Register||mongoose.model("Register",RegisterSchema)