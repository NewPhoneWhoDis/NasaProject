import fs from "fs";
import { parse } from "csv-parse";
import { Planet } from "../types/planet.type";

const habitablePlanets: Planet[] = [];

function isHabitablePlanet(planet: Planet) {
  return (
    planet.koi_disposition === "CONFIRMED" &&
    planet.koi_insol !== undefined &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad !== undefined &&
    planet.koi_prad < 1.6
  );
}

export async function loadHabitablePlanets(): Promise<Planet[]> {
  return new Promise((resolve, reject) => {
    fs.createReadStream("kepler_data.csv")
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
        console.log(
          habitablePlanets.map((planet) => {
            return planet["kepler_name"];
          })
        );
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve(habitablePlanets);
      });
  });
}
