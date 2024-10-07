export { validateRequest } from "./lucia-nitro/validateRequest";
export { AppheadAdapter } from "./lucia-nitro/adapter";

export { Lucia, generateId } from "lucia";
export { GitHub, OAuth2RequestError, generateState } from "arctic";

export interface DatabaseUser {
  id: string;
  username: string;
  github_id: number;
}
