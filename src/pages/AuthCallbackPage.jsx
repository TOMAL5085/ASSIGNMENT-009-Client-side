import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function AuthCallbackPage() {
  useDocumentTitle("Authenticating");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { completeSocialLogin } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const sessionToken = searchParams.get("sessionToken");
    const redirect = searchParams.get("redirect") || "/";
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const image = searchParams.get("image");

    if (!token || !sessionToken || !id || !email) {
      navigate("/login", { replace: true });
      return;
    }

    completeSocialLogin({
      token,
      sessionToken,
      user: {
        uid: id,
        displayName: name || "MediQueue User",
        email,
        photoURL: image || "",
      },
    });

    navigate(redirect, { replace: true });
  }, [completeSocialLogin, navigate, searchParams]);

  return <Spinner label="Completing your sign-in..." />;
}
