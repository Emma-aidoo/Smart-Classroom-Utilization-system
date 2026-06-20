import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Classrooms from "./pages/Classrooms";
import AddClassroom from "./pages/AddClassroom";
import Schedules from "./pages/Schedules";
import Reservations from "./pages/Reservations";
import Timetable from "./pages/Timetable";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function ProtectedLayout() {
    // full viewport height/width layout: sidebar (lg) + main that fills remaining space
    return (
        <div className="flex h-screen w-full bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-0">
                <Navbar />
                <main className="flex-1 overflow-auto p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

// Simple auth guard: checks localStorage or sessionStorage for token
function RequireAuth({ children }) {
    const token = localStorage.getItem("scus_token") || sessionStorage.getItem("scus_token");
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

function RequireRole({ allowedRoles, children }) {
    const role = localStorage.getItem("scus_role") || sessionStorage.getItem("scus_role");
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
}

export default function App() {
    console.log("App.jsx: rendering routes");
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected routes wrapped with RequireAuth */}
            <Route
                element={
                    <RequireAuth>
                        <ProtectedLayout />
                    </RequireAuth>
                }
            >
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/classrooms" element={<Classrooms />} />
                <Route path="/classrooms/add" element={<AddClassroom />} />
                <Route path="/schedules" element={<Schedules />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route
                    path="/users"
                    element={
                        <RequireRole allowedRoles={["Admin", "Lecturer"]}>
                            <Users />
                        </RequireRole>
                    }
                />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
        </Routes>
    );
}