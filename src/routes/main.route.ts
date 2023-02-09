import { Request, Response, Router } from "express";

const mainRouter: Router = Router();

// Add routes defined in other files below.

mainRouter.use((req: Request, res: Response) => {
    res.render('404');
});

export default mainRouter;