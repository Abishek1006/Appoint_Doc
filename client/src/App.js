import React from "react";
import { useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Spinner from "./components/Spinner";
import ApplyDoctor from "./pages/ApplyDoctor";
import Appointments from "./pages/Appointments";
import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Doctors from "./pages/admin/Doctors";
import Users from "./pages/admin/Users";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import Profile from "./pages/doctor/Profile";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <HashRouter>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/book-appointment/:doctorId"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor-appointments"
            element={
              <ProtectedRoute>
                <DoctorAppointments />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="/Appoint_Doc" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        </Routes>
      )}
    </HashRouter>
  );
}
export default App;
