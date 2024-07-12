import { Router } from "express";
import { middlewareParamsObjectId } from "../middlewares/validateParamObjectId";
import { middlewareBody } from "../middlewares/validateBody";
import { RegisterSchema } from "../utils/schema/auth.schema";
import { UserController } from "../controllers/User.controller";
import { UserUpdateSchema, UserEmailSchema, ResetPasswordSchema, SpecialtiesSchema } from "../utils/schema/user.schema";
import { UserRepository } from "../repositories/User.repository";
import { UserService } from "../services/User.service";
import { authValidatePassport, authValidatePassportOptional } from "../middlewares/authValidate";
import { TradeRepository } from "../repositories/Trade.repository";
import { verifyCategoryAndSpecialty } from "../middlewares/verifyCategoryAndSpecialty";

const userRepository = new UserRepository();
const tradeRepository = new TradeRepository()
const userService = new UserService(userRepository,tradeRepository);
const userController = new UserController(userService);

const routerUser = Router();

routerUser.post("/user",middlewareBody(RegisterSchema),userController.createUser);
routerUser.get("/user/confirm-email/:token", userController.confirmRegister);
routerUser.post("/user/reset-password",middlewareBody(UserEmailSchema), userController.sendResetPasswordToken);
routerUser.put("/user/reset-password/:token", middlewareBody(ResetPasswordSchema), userController.resetPassword);


routerUser.get("/user/:categoryId?",userController.getUsers)

// ! Middleware general 
routerUser.param("userId",middlewareParamsObjectId("userId"))

routerUser.get("/user/details/:userId", authValidatePassportOptional ,userController.getUser);
routerUser.put("/user/:userId",middlewareBody(UserUpdateSchema),userController.updateUser);
routerUser.delete("/user/:userId",userController.delete);

// ruta para agregar especialidad y categoría
routerUser.post("/user/add-specialties", middlewareBody(SpecialtiesSchema), authValidatePassport, verifyCategoryAndSpecialty("specialties"), userController.addSpecialties);
routerUser.post("/user/add-interests", middlewareBody(SpecialtiesSchema), authValidatePassport, verifyCategoryAndSpecialty("interests"), userController.addInterests);



export default routerUser;