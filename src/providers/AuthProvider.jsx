import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import api from "../lib/api";
import { AuthContext } from "../contexts/AuthContext";
import { auth, googleProvider } from "../lib/firebase";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function syncJwt(firebaseUser) {
    const payload = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    };

    const { data } = await api.post("/api/auth/jwt", payload);
    localStorage.setItem("mediqueue-token", data.token);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          await syncJwt(currentUser);
          setUser(currentUser);
        } else {
          localStorage.removeItem("mediqueue-token");
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  async function registerUser({ name, email, password, photoURL }) {
    setLoading(true);

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, {
        displayName: name,
        photoURL,
      });
      await syncJwt({
        ...credential.user,
        displayName: name,
        photoURL,
      });
      setUser({
        ...credential.user,
        displayName: name,
        photoURL,
      });
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  async function loginUser(email, password) {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  async function loginWithGoogle() {
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  async function logoutUser() {
    setLoading(true);

    try {
      localStorage.removeItem("mediqueue-token");
      await signOut(auth);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
