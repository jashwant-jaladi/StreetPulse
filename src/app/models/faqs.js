import mongoose from "mongoose"

const {Schema}= mongoose 
 const faqSchema=new Schema({
    title:
    {
        type:String,
        required:true
    },
    question:
    {
        type:String,
        required:true
    },
    answer:
    {
        type:String,
        required:true
    },

}, {timeStamps:true})

export default mongoose.models.faqs||mongoose.model("Faq",faqSchema)