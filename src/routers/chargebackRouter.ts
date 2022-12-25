import express from "express";
import { executeChargebackByUUID } from "../controllers/chargebackController";
import { validateChargeback } from "../validations/transactionValidation";
import { StatusCodes } from "http-status-codes";

const chargebackRouter = express.Router();
chargebackRouter.post('/', async (request, response, next) => {
	try {
		const { sourceAccountUUID, transactionUUID } = await validateChargeback({
			sourceAccountUUID: response.locals.user.accountUUID,
			...request.query,
		});

		const transactionChargebackLog = await executeChargebackByUUID(sourceAccountUUID, transactionUUID);

        response.send({
			status: StatusCodes.CREATED,
			data: transactionChargebackLog,
		});

	} catch (error) {
		next(error);
	}
});

export default chargebackRouter;