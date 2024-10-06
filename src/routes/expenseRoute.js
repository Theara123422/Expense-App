import { Router } from "express";
import verifyToken from "../utils/verify_token.js";
import { CreateNewExpenseController } from "../controller/expenseController.js";
const expenseRouter = Router();
expenseRouter.use(verifyToken);

expenseRouter.post('/createnew',CreateNewExpenseController);

export default expenseRouter;