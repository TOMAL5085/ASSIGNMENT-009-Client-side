import { createAuthClient } from "better-auth/react";

const apiBaseURL = import.meta.env.VITE_API_URL || "";

export const authClient = createAuthClient({
  baseURL: `${apiBaseURL}/api/auth`,
  fetchOptions: {
    credentials: "include",
  },
});
