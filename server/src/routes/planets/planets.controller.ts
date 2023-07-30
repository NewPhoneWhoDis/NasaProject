import { Request, Response } from "express";
import Planets from "../../models/planets.model";

const planets: Planets[] =  [];


export function getAllPlanets(req: Request, res: Response) {
    return res.status(200).json(planets);
}