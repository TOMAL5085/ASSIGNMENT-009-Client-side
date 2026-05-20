import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { authClient } from "../lib/auth-client";

export default function AuthCallbackPage() {
  useDocumentTitle("Authenticating");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { completeSocialLogin, exchangeSessionToken } = useAuth();

  useEffect(() => {
    const redirect = searchParams.get("redirect") || "/";
    let cancelled = false;

    async function finishSocialLogin() {
      try {
        const { data } = await authClient.getSession();
        const sessionToken = data?.session?.token;
        const sessionUser = data?.user;

        if (!sessionToken || !sessionUser?.id || !sessionUser?.email) {
          navigate("/login", { replace: true });
          return;
        }

        const exchanged = await exchangeSessionToken(sessionToken);

        if (cancelled) {
          return;
        }

        completeSocialLogin({
          token: exchanged.token,
          sessionToken,
          user: exchanged.user,
        });

        navigate(redirect, { replace: true });
      } catch {
        if (!cancelled) {
          navigate("/login", { replace: true });
        }
      }
    }

    finishSocialLogin();

    return () => {
      cancelled = true;
    };
  }, [completeSocialLogin, exchangeSessionToken, navigate, searchParams]);

  return <Spinner label="Completing your sign-in..." />;
}
