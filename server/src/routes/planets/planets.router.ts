import express = require("express");

import { getAllPlanets } from "./planets.controller";
import { loadPlanetsMiddleware } from "../../middleware/loadPlanetsMiddleware";

const planetsRouter = express.Router();

planetsRouter.get("/planets", loadPlanetsMiddleware, getAllPlanets);

export default planetsRouter;
