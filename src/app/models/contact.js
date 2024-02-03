import mongoose from "mongoose"

const {Schema}= mongoose 
 const contactSchema=new Schema({
    firstName:
    {
        type:String,
        required:true
    },
    lastName:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    opinion:
    {
        type:String,
        required:true
    },
}, {timeStamps:true})

export default mongoose.models.Contact||mongoose.model("Contact",contactSchema)