import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: `API Documentation for ${process.env.PROJECT_NAME}`,
        version: "1.0.0",
        description: `${process.env.PROJECT_DESC}`,
    },
    servers: [
        {
            url: `${process.env.BASE_URL}`,
            description: "Production",
        },
        {
            url: `http://localhost:${process.env.PORT}`,
            description: "Local Development",
        },
    ],
    components: {
        securitySchemes: {
            httpBearer: {
                type: "http",
                scheme: "bearer",
            },
        },
    },
    security: [
        {
            httpBearer: [],
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./src/config/swagger.doc.yml"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
