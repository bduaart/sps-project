import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./Routes";
import { logRequests } from "./Middleware/LogRequestsMiddleware";
import { errorHandler } from "./Middleware/LogErrorHandlerMiddleware";
import { swaggerDocs, swaggerSetup } from "./Docs/swagger";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(logRequests);
app.use("/api", routes);
app.use("/docs", swaggerDocs, swaggerSetup);
app.use(errorHandler);
export default app;
