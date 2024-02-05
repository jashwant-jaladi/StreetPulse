import connect  from "../../../db_connect";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import Register from "../../../models/register";
import bcrypt from "bcryptjs"


const authOptions = {
    providers :[
        CredentialsProvider({
        name:"credentials",
        credentials:{},
        async authorize(credentials)
        {
            const {email, password}=credentials;
            try{
                await connect()
                const user=await Register.findOne({email})
                if(!user)
                {
                    return null
                }
                const passwordsMatch=await bcrypt.compare(password, user.password)
                if(!passwordsMatch)
                {
                    return null
                }
                return user
            }
           catch(error){
            console.log(error)
           }
        },
    }),
],
sessions:{
    strategy :"jwt"
},
secret:process.env.NEXTAUTH_SECRET, 
pages:
{
    signin:"/myAccount"
}
}

const handler=NextAuth(authOptions);


export {handler as GET, handler as POST}