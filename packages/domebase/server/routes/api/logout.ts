import { logout } from "~/utils/auth/actions";

export default defineEventHandler(async (event) => {
  return logout(event);
});
