import { Request, Response } from "express";
import { FinalizeDeliveryUseCase } from "./FinalizeDeliveryUseCase";

export class FinalizeDeliveryController {
    async handle(request: Request, response: Response) {
        const { id_delivery } = request.params
        const { id_deliveryman } = request.body

        const finalizeDeliveryUseCase = new FinalizeDeliveryUseCase();
        const delivery = await finalizeDeliveryUseCase.execute({ id_delivery, id_deliveryman })

        return response.json(delivery)
    }
}