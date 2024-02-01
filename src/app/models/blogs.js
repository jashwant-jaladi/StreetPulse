import mongoose from "mongoose"

const {Schema}= mongoose 
 const blogSchema=new Schema({
    image:
    {
        type:String,
        required:true
    },
    name:
    {
        type:String,
        required:true
    },
    date:
    {
        type:String,
        required:true
    },
    title:
    {
        type:String,
        required:true
    },
    content:
    {
        type:String,
        required:true
    },

}, {timeStamps:true})

export default mongoose.models.blog||mongoose.model("blog",blogSchema)