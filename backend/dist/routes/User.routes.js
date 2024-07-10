"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateParamObjectId_1 = require("../middlewares/validateParamObjectId");
const validateBody_1 = require("../middlewares/validateBody");
const auth_schema_1 = require("../utils/schema/auth.schema");
const User_controller_1 = require("../controllers/User.controller");
const user_schema_1 = require("../utils/schema/user.schema");
const User_repository_1 = require("../repositories/User.repository");
const User_service_1 = require("../services/User.service");
const authValidate_1 = require("../middlewares/authValidate");
const userRepository = new User_repository_1.UserRepository();
const userService = new User_service_1.UserService(userRepository);
const userController = new User_controller_1.UserController(userService);
const router = (0, express_1.Router)();
router.post("/user", (0, validateBody_1.middlewareBody)(auth_schema_1.RegisterSchema), userController.createUser);
router.get("/user/confirm-email/:token", userController.confirmRegister);
router.post("/user/reset-password", (0, validateBody_1.middlewareBody)(user_schema_1.UserEmailSchema), userController.sendResetPasswordToken);
router.put("/user/reset-password/:token", (0, validateBody_1.middlewareBody)(user_schema_1.ResetPasswordSchema), userController.resetPassword);
router.get("/user/:categoryId?", userController.getUsers);
// ! Middleware general 
router.param("userId", (0, validateParamObjectId_1.middlewareParamsObjectId)("userId"));
router.get("/user/details/:userId", authValidate_1.authValidatePassportOptional, userController.getUser);
router.put("/user/:userId", (0, validateBody_1.middlewareBody)(user_schema_1.UserUpdateSchema), userController.updateUser);
router.delete("/user/:userId", userController.delete);
exports.default = router;
