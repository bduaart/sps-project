import app from "./app";
import { logger } from "./Utils/Logger";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`🚀 Server running ${PORT}`));
