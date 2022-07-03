import { Request, Response } from "express";
import { FindAvailableDeliveriesUseCase } from "./FindAvailableDeliveriesUseCase";

export class FindAvailableDeliveriesController {
    async handle(request: Request, response: Response) {
        const findAvailableDeliveriesUseCase = new FindAvailableDeliveriesUseCase();
        const deliveries = await findAvailableDeliveriesUseCase.execute()
        return response.json(deliveries)
    }
}