import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { prisma } from "../../../database/prismaClient"

interface IAuthenticateDeliveryman {
    username: string,
    password: string
}

export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    mode: "insensitive",
                    equals: username
                }
            }
        })
        if (!deliveryman) {
            throw new Error("Invalid Username or Password")
        }

        const passwordMatch = await compare(password, deliveryman.password)
        if (!passwordMatch) {
            throw new Error("Invalid Username or Password")
        }

        const token = sign({ username }, "c65a40c9c936ac2a9f2612019310ec17", {
            subject: deliveryman.id,
            expiresIn: "1d"
        })

        return token
    }
}