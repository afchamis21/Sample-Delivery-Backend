import { Request, Response } from "express";
import { UpdateDeliverymanUseCase } from "./UpdateDeliveryManUseCase";

export class UpdateDeliverymanController {
    async handle(request: Request, response: Response) {
        const { id_deliveryman } = request.body
        const { id_delivery } = request.params
        const updateDeliverymanUseCase = new UpdateDeliverymanUseCase();
        const result = await updateDeliverymanUseCase.execute({ id_delivery, id_deliveryman })

        return response.json(result)
    }
}