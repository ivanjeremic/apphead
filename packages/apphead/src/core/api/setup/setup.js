import { mkdir, access } from "fs/promises";

export async function setup() {
  const dbs = new Map([["maz", "spaz"]])

  try {
    await access(".apphead");
  } catch (error) {
    await mkdir(".apphead");
    await mkdir(`./.apphead/apphead-data`);
    await mkdir(`./.apphead/apphead-plugins`);
    await mkdir(`./.apphead/apphead-media`);
  }
}