import { Router } from "express";
import { upload } from "../utils/image_handler.js";
import { userLoginController, userRegisterController } from "../controller/authController.js";
const authRoute = Router();

authRoute.post('/signup', upload.single('user_image') , userRegisterController);
authRoute.post('/signin', userLoginController);

export default authRoute;