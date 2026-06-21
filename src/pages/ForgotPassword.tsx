import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // no backend logic — just log the email for now
        console.log("Send reset link to:", email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="card-strong p-8 rounded-xl shadow-md border border-gray-100">
                    <div className="flex flex-col items-center mb-4">
                        <div className="w-16 h-16 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xl font-semibold mb-3">
                            SC
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Reset Password
                        </h1>
                        <p className="text-sm text-gray-500 text-center mt-2">
                            Enter your email address and we'll send you a link to reset your
                            password.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg bg-primary text-white font-medium hover:bg-blue-700 transition"
                        >
                            Send Reset Link
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-sm text-gray-600 hover:underline inline-flex items-center gap-2"
                        >
                            <span className="text-xl leading-none">←</span>
                            <span>Back to Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}