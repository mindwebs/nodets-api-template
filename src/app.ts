/*
    Load env file based on run command.
    Look at the package.json file, the script to run the server passes a variable named NODE_ENV using the cross-env package. We use the variable to determine which env file to call -> either .env.production or .env.development
*/
if (!process.env.NODE_ENV) {
    require("dotenv").config({ path: `.env.production` });
} else {
    require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
}

// Import npm packages we'll use
import cors from "cors"; // cors is for cross origin resource sharing.
import morgan from "morgan"; // morgan is for better logging of each request
import express from "express"; // express is the framework for the backend
import swaggerUi from "swagger-ui-express"; // swagger is the package we use for better documentation of the api

// Import custom packages we'll be using
import connect from "./config/db.config"; // has code to establish connection the mongo db
import swaggerSpec from "./config/swagger.config"; // has configuration for swagger

// Import variables for the env file.
const PROJECT_NAME: String = String(process.env.PROJECT_NAME);
const BASE_URL: String = String(process.env.BASE_URL);
const PORT: Number = Number(process.env.PORT);

// Initialize the express app!
const app: express.Application = express();

// Add some external middlewares. These middlewares will always function for every request our express app receives.
app.use(cors()); // allows cross origin resource sharing
app.use(express.json()); // specifies that the type of json in request body and response body will be JSON
app.use(morgan('combined')) // use morgan to log each request
app.use(express.urlencoded({ extended: true })); // this middleware parses the incoming request body else it wouldn't be identified as a paylod data.

/*
    Default route for logging server startup time. The "/" part is the route definition, what follows is the controller function written inside like a callback. Ideally, we should write this controller in a different file and refer it here like app.get("/", controllerFunction);

    Inside the controller, we are just sending a raw response which consists of a message that this server was started at xyz date-time.
*/
app.get("/", (_req: express.Request, res: express.Response) =>
    res.send(`${PROJECT_NAME} server started on ${new Date()}`)
);

/* 
    Swagger Documentation route. If you browse to the /docs endpoint, you will see the UI based API documentation swagger creates for us.
*/
app.get("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the express server in the defined port, this too uses a callback function which we have written right inside.
app.listen(Number(process.env.PORT), () => {
    connect; // connect to the mongo instance
    console.log(`Listening on ${BASE_URL}:${PORT}...`); // Log at server start up
});
