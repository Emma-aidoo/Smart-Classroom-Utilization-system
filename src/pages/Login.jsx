import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    // Dummy credentials (local only)
    const CREDENTIALS = [
        { role: "Admin", email: "admin@university.edu", password: "Admin123!" },
        { role: "Lecturer", email: "lecturer@university.edu", password: "Lecturer123!" },
        { role: "Student", email: "student@university.edu", password: "Student123!" },
    ];

    useEffect(() => {
        const token = localStorage.getItem("scus_token") || sessionStorage.getItem("scus_token");
        if (token) navigate("/dashboard", { replace: true });
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        const match = CREDENTIALS.find(
            (c) => c.email.toLowerCase() === email.trim().toLowerCase() && c.password === password
        );
        if (match) {
            const token = btoa(`${match.email}:${Date.now()}`);
            localStorage.removeItem("scus_token");
            localStorage.removeItem("scus_role");
            sessionStorage.removeItem("scus_token");
            sessionStorage.removeItem("scus_role");

            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem("scus_token", token);
            storage.setItem("scus_role", match.role);
            navigate("/dashboard");
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="card-strong p-8 rounded-xl shadow-md border border-gray-100">
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white text-2xl font-bold mb-3">
                            {/* mortarboard icon */}
                            <svg
                                className="w-8 h-8"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden
                            >
                                <path d="M12 2L1 7l11 5 11-5L12 2z" />
                                <path d="M2 8.5v3.5c0 .8 1.3 1.6 3 2.2 2 0.8 4.5 1.3 7 1.3s5-0.5 7-1.3c1.7-.6 3-1.4 3-2.2V8.5" />
                                <path d="M12 7v7" />
                                <path d="M12 14l3 1" />
                            </svg>
                        </div>

                        <div className="text-center">
                            <div className="text-lg font-semibold text-gray-800">SCUS</div>
                            <div className="text-xs text-gray-500">Smart classroom</div>
                            <div className="text-xs text-gray-500">ultimatesystem</div>
                        </div>

                        <p className="text-sm text-gray-500 mt-3">Please login to your account.</p>
                    </div>

                    {error && <div className="mb-4 text-sm text-red-600 text-center">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-primary rounded"
                                />
                                <span className="text-gray-600">Remember Me</span>
                            </label>
                            <Link to="/forgot-password" className="text-primary hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg bg-primary text-white font-medium hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-primary hover:underline">
                            Sign Up
                        </Link>
                    </p>

                    <div className="mt-4 text-xs text-gray-500">
                        Test accounts:
                        <ul className="mt-2 space-y-1">
                            <li>Admin — admin@university.edu / Admin123!</li>
                            <li>Lecturer — lecturer@university.edu / Lecturer123!</li>
                            <li>Student — student@university.edu / Student123!</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}