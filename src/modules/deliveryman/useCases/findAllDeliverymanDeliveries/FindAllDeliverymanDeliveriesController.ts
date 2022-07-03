import { Request, Response } from "express";
import { FindAllDeliverymanDeliveriesUseCase } from "./FindAllDeliverymanDeliveriesUseCase";

export class FindAllDeliverymanDeliveriesController {
    async handle(request: Request, response: Response) {
        const { id_deliveryman } = request.body

        const findAllDeliverymanDeliveriesUseCase = new FindAllDeliverymanDeliveriesUseCase();
        const deliveries = await findAllDeliverymanDeliveriesUseCase.execute(id_deliveryman)

        return response.json(deliveries)
    }
}