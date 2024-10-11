import { validateRequest } from "@apphead/authentication";
import { auth } from "~/utils/auth";

export default defineCachedEventHandler(
  async (event) /* : VALIDATE_REQ */ => {
    const result = await validateRequest(event, auth);

    return result;
  },
  { maxAge: 60 * 60 /* 1 hour */ }
);
