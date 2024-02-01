import mongoose from "mongoose"

const {Schema}= mongoose 
 const shopSchema=new Schema({
    image:
    {
        type:String,
        required:true
    },
    category:
    {
        type:String,
        required:true
    },
    name:
    {
        type:String,
        required:true
    },
    rating:
    {
        type:String,
        required:true
    },
    noOfRatings:
    {
        type:String,
        required:true
    },
    prices:
    {
        type:String,
        required:true
    },
    preOffer:
    {
        type:String,
        required:true
    },
    discount:
    {
        type:String,
        required:true
    },


}, {timeStamps:true})

export default mongoose.models.Shop||mongoose.model("Shop",shopSchema)