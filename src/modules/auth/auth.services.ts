import { prisma } from "../../config/db"

const loginWithEmailAndPassword = async ({email, password}: {email: string, password: string}) => {
    console.log({email, password}) 
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

export const AuthServices = {
    loginWithEmailAndPassword
}