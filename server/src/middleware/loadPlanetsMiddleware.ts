import { Request, Response, NextFunction } from "express";
import { loadHabitablePlanets } from "../models/planet.model";
import { IPlanet } from "../models/planet.model";

export let cachedPlanets: IPlanet[] | null = null;

export async function loadPlanetsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!cachedPlanets) cachedPlanets = await loadHabitablePlanets();
    next();
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error loading the planets" });
  }
}
