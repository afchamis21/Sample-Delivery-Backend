import { prisma } from "../../../../database/prismaClient";

interface IFinalizeDelivery {
    id_delivery: string,
    id_deliveryman: string
}

export class FinalizeDeliveryUseCase {
    async execute({ id_delivery, id_deliveryman }: IFinalizeDelivery) {
        const delivery = await prisma.deliveries.updateMany({
            where: {
                id: id_delivery,
                id_deliveryman,
            },
            data: {
                end_at: new Date()
            }
        })

        return delivery
    }
}