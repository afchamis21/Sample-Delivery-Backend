import { Router } from "express";
import { verifyAuthenticatedClient } from "./middlewares/verifyAuthenticatedClient";
import { verifyAuthenticatedDeliveryman } from "./middlewares/verifyAuthenticatedDeliveryman";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { FindAllClientDeliveriesController } from "./modules/clients/useCases/findAllClientDeliveries/FindAllClientDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FinalizeDeliveryController } from "./modules/deliveries/useCases/finalizeDelivery/FinalizeDeliveryController";
import { FindAvailableDeliveriesController } from "./modules/deliveries/useCases/findAvailableDeliveries/FindAvailableDeliveriesController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliveryManController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliverymanDeliveriesController } from "./modules/deliveryman/useCases/findAllDeliverymanDeliveries/FindAllDeliverymanDeliveriesController";

const routes = Router();

// Instanciando os controladores

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const findAllClientDeliveriesController = new FindAllClientDeliveriesController();

const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const findAllDeliverymanDeliveriesController = new FindAllDeliverymanDeliveriesController();

const createDeliveryController = new CreateDeliveryController();
const findAvailableDeliveriesController = new FindAvailableDeliveriesController();
const updateDeliverymanController = new UpdateDeliverymanController();
const finalizeDeliveryController = new FinalizeDeliveryController();

// Definindo as rotas

routes.post("/client/", createClientController.handle)
routes.post("/client/authenticate", authenticateClientController.handle)
routes.get("/client/deliveries", verifyAuthenticatedClient, findAllClientDeliveriesController.handle)

routes.post("/deliveryman/", createDeliverymanController.handle)
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle)
routes.get("/deliveryman/deliveries", verifyAuthenticatedDeliveryman, findAllDeliverymanDeliveriesController.handle)

routes.post("/delivery/", verifyAuthenticatedClient, createDeliveryController.handle)
routes.get("/delivery/available", verifyAuthenticatedDeliveryman, findAvailableDeliveriesController.handle)
routes.patch("/delivery/updateDeliveryman/:id_delivery", verifyAuthenticatedDeliveryman, updateDeliverymanController.handle)
routes.patch("/delivery/finalizeDelivery/:id_delivery", verifyAuthenticatedDeliveryman, finalizeDeliveryController.handle)

export { routes }
