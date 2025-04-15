import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API CRUD SPS",
    version: "1.0.0",
    description: "Documentação API CRUD SPS",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Ambiente local",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
export const swaggerDocs = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerSpec);
