import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken";


interface IAuthenticateUser {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateUser) {

        const client = await prisma.clients.findFirst({
            where: {
                username: {
                    mode: "insensitive",
                    equals: username
                }
            }
        })

        if (!client) {
            throw new Error("Invalid Username or Password")
        }

        const passwordMatch = await compare(password, client.password)
        if (!passwordMatch) {
            throw new Error("Invalid Username or Password")
        }

        const token = sign({ username }, "c65a40c9c936ac2a9f2612019310ec13", {
            subject: client.id,
            expiresIn: "1d"
        })

        return token
    }
}