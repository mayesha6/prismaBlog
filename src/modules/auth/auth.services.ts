import { prisma } from "../../config/db"

const loginWithEmailAndPassword = async ({email, password}: {email: string, password: string}) => {
    console.log({email, password}) 
    const user = await prisma.user.findUnique({
        where:{email}
    })   
}

export const AuthServices = {
    loginWithEmailAndPassword
}