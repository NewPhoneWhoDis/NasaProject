import { Request, Response } from "express";

const planets: Planet[] = [];

export function getAllPlanets(req: Request, res: Response) {
  return res.status(200).json(planets);
}
