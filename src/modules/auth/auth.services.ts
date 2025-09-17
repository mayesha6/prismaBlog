import { Prisma } from "@prisma/client"
import { prisma } from "../../config/db"

const loginWithEmailAndPassword = async ({email, password}: {email: string, password: string}) => {
    const user = await prisma.user.findUnique({
        where:{email}
    }) 
    
    if(!user){
        throw new Error("User does not exist.")
    }

    if(password === user.password){
        return user
    }
    else{
        throw new Error("Password does not match.")
    }
}
const loginWithGoogle = async (data: Prisma.UserCreateInput) => {
    let user = await prisma.user.findUnique({
        where:{
            email: data.email
        }
    }) 
    
    if(!user){
        user = await prisma.user.create({
            data
        })
    }
    
    return user
}

export const AuthServices = {
    loginWithEmailAndPassword,
    loginWithGoogle
}