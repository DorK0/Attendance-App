import express from "express";
import authController from "./6-controllers/auth-controller";
import timeController from "./6-controllers/attendance-controller";
import catchAll from "./3-middleware/catch-all";
import cors from "cors";
import expressFileUpload from "express-fileupload";
import config from "./2-utils/config";


const expressServer = express();

expressServer.use(cors());
expressServer.use(express.json());
expressServer.use(expressFileUpload());
expressServer.use("/api", express.static(__dirname + "./1-assets/images"));
expressServer.use("/api", authController);
expressServer.use("/api", timeController);

expressServer.use(catchAll);

expressServer.listen(config.port, () => console.log(`Listening on port ${config.port}`));

