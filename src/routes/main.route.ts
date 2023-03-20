import { Request, Response, Router } from "express";
import { GenerateResponse } from "../utils/response.creator";

const mainRouter: Router = Router();

// Add routes defined in other files below.

mainRouter.use((req: Request, res: Response) => {
    GenerateResponse(res, 404)
});

export { mainRouter };
