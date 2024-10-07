export * from "lucia";
export * from "arctic";

export { validateRequest } from "./lucia-nitro/validateRequest";
export { AppheadAdapter } from "./lucia-nitro/adapter";

export interface DatabaseUser {
  id: string;
  username: string;
  github_id: number;
}
