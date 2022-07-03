import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function verifyAuthenticatedDeliveryman(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: "Missing token"
        })
    }

    const [_, token] = authHeader.split(" ")

    try {
        const { sub: id_deliveryman } = verify(token, "c65a40c9c936ac2a9f2612019310ec17")

        request.body = { ...request.body, id_deliveryman }

        return next()
    } catch (error) {
        return response.status(401).json({
            message: "Invalid token"
        })
    }
}