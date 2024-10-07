export { validateRequest } from "./lucia-nitro/validateRequest";
export { AppheadAdapter } from "./lucia-nitro/adapter";

export { Lucia } from "lucia";
export { GitHub } from "arctic";

export interface DatabaseUser {
  id: string;
  username: string;
  github_id: number;
}
