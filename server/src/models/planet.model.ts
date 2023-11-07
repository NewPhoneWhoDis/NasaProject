import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
export interface IPlanet {
  name: string;
  diameter: number;
  population: number;
  kepler_name?: string;
  koi_disposition?: string;
  koi_insol?: number;
  koi_prad?: number;
}

const habitablePlanets: IPlanet[] = [];

function isHabitablePlanet(planet: IPlanet) {
  return (
    planet.koi_disposition === "CONFIRMED" &&
    planet.koi_insol !== undefined &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad !== undefined &&
    planet.koi_prad < 1.6
  );
}

export async function loadHabitablePlanets(): Promise<IPlanet[]> {
  const csvFilePath = path.join(__dirname, "../../data/kepler_data.csv");

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve(habitablePlanets);
      });
  });
}
