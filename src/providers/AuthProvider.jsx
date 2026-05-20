import { useState } from "react";
import api from "../lib/api";
import { authClient } from "../lib/auth-client";
import { AuthContext } from "../contexts/AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("mediqueue-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  function persistAuth({ token, sessionToken, user: nextUser }) {
    localStorage.setItem("mediqueue-token", token);
    localStorage.setItem("mediqueue-session-token", sessionToken);
    localStorage.setItem("mediqueue-user", JSON.stringify(nextUser));
    setUser(nextUser);
  }

  function clearAuth() {
    localStorage.removeItem("mediqueue-token");
    localStorage.removeItem("mediqueue-session-token");
    localStorage.removeItem("mediqueue-user");
    setUser(null);
  }

  async function exchangeSessionToken(sessionToken) {
    const { data } = await api.post("/api/auth/exchange", { sessionToken });
    return data;
  }

  async function registerUser({ name, email, password, photoURL }) {
    setLoading(true);

    try {
      const response = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoURL,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data?.token) {
        await authClient.signOut({
          fetchOptions: {
            headers: {
              authorization: `Bearer ${response.data.token}`,
            },
          },
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  async function loginUser(email, password) {
    setLoading(true);

    try {
      const response = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const exchanged = await exchangeSessionToken(response.data.token);
      persistAuth({
        token: exchanged.token,
        sessionToken: response.data.token,
        user: exchanged.user,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  async function loginWithGoogle(redirectTo = "/") {
    setLoading(true);

    try {
      const callbackURL = `${window.location.origin}/auth-callback?redirect=${encodeURIComponent(
        redirectTo
      )}`;
      const response = await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  function completeSocialLogin(payload) {
    persistAuth(payload);
    setLoading(false);
  }

  async function logoutUser() {
    setLoading(true);

    try {
      const sessionToken = localStorage.getItem("mediqueue-session-token");

      if (sessionToken) {
        await authClient.signOut({
          fetchOptions: {
            headers: {
              authorization: `Bearer ${sessionToken}`,
            },
          },
        });
      }

      clearAuth();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  const value = {
    user,
    loading,
    registerUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
    completeSocialLogin,
    exchangeSessionToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
