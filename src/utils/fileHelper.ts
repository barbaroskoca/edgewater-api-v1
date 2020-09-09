import fs from "fs";
import path from "path";

export const convertFileToString = async (pathToFile: string) => {
  return new Promise<string>((resolve, reject) =>
    fs.readFile(path.join(__dirname, pathToFile), "utf8", (error, data) => {
      if (error) return reject(error);
      if (data) return resolve(data);
    })
  );
};
