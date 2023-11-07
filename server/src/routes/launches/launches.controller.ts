import { Request, Response } from "express";
import { launch } from "../../models/launches.model";

export function getAllLaunches(request: Request, response: Response) {
  return response.status(200).json(launch());
}
