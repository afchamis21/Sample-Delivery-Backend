import { prisma } from "../../../../database/prismaClient";

export class FindAllClientDeliveriesUseCase {
    async execute(id_client: string) {
        const deliveries = await prisma.clients.findUnique({
            where: {
                id: id_client
            },
            select: {
                username: true,
                id: true,
                deliveries: true
            },
        })

        return deliveries
    }
}