import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AddTutorPage from "./pages/AddTutorPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import LoginPage from "./pages/LoginPage";
import MyBookedSessionsPage from "./pages/MyBookedSessionsPage";
import MyTutorsPage from "./pages/MyTutorsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ServicesPage from "./pages/ServicesPage";
import TutorDetailsPage from "./pages/TutorDetailsPage";
import TutorsPage from "./pages/TutorsPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tutors" element={<TutorsPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route
          path="tutors/:id"
          element={
            <ProtectedRoute>
              <TutorDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="add-tutor"
          element={
            <ProtectedRoute>
              <AddTutorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-tutors"
          element={
            <ProtectedRoute>
              <MyTutorsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-booked-sessions"
          element={
            <ProtectedRoute>
              <MyBookedSessionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="auth-callback" element={<AuthCallbackPage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
