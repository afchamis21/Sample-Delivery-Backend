import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt"

interface ICreateClient {
    username: string;
    password: string;
}

export class CreateClientUseCase {
    async execute({ username, password }: ICreateClient) {
        const clientExists = await prisma.clients.findFirst({
            where: {
                username: {
                    mode: "insensitive",
                    equals: username
                },

            }
        })

        if (clientExists) {
            throw new Error("Client already exists")
        }

        const hashPassword = await hash(password, 10)

        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword
            }
        })

        return client
    }


}