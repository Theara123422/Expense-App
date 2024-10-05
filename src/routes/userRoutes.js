//show/update/delete user information
import { Router } from "express";
import { GetAuthUserInformation } from "../controller/userController.js";
import verifyToken from "../utils/verify_token.js";
const userRouter = Router();

userRouter.use(verifyToken);

userRouter.get('/userprofile' , GetAuthUserInformation);

export default userRouter;