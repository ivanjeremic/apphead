import { nanoid } from "nanoid";

type IDV001 = `001${string}`;

export function genIdV001(): IDV001 {
  const random = nanoid(5);

  return `001${random + Date.now()}`;
}
