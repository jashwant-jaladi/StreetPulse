"use server"

import connect from "../db_connect"
import Contact from "../models/contact"

export const submitContact=async(data)=>
{
    
    try{
        await connect()
        await Contact.create(data)
        return {
            status:"OK",
            message :"message sent successfully"
        }
    }catch(e){
            console.log("Error submitting contact:",e);
        
            return {
              status: "ERROR",
              message: "Message not sent successfully, server error!",
            };
          }
}