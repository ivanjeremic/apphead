import { validateRequest } from "@apphead/authentication";
import { lucia } from "~/utils/auth";

export default defineCachedEventHandler(
  async (event) /* : VALIDATE_REQ */ => {
    const result = await validateRequest(event, lucia);

    return result;
  },
  { maxAge: 60 * 60 /* 1 hour */ }
);
