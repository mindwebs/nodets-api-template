import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { GenerateResponse } from "../utils/response.creator";

/**
 * ValidationMiddleware validates the request body and query against express-validator and breaks the api flow if invalid
 *
 * @param {Request} req Express Request interface
 * @param {Response} res Express Response interface
 * @param {NextFunction} next Express NextFunction interface
 * @returns  {((Response | void))}
 */
const ValidationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return GenerateResponse(
            res,
            400,
            { errors: errors.array() },
            "Required fields invalid or empty"
        );
    }

    next();
};

export { ValidationMiddleware };
