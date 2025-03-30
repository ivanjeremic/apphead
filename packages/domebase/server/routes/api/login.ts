import { login } from "~/utils/auth/actions";

export default defineEventHandler(async (event) => {
  return login(event);
});
