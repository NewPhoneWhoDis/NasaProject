import { Request, Response } from "express";
import { Planet } from "../../types/planet.type";
import { cachedPlanets } from "../../middleware/loadPlanetsMiddleware";

export function getAllPlanets(req: Request, res: Response) {
  return res.status(200).json(cachedPlanets);
}
