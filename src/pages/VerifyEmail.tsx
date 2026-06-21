import React from "react";
import { Link } from "react-router-dom";

export default function VerifyEmail() {
    const email = "admin@university.edu";

    const handleResend = (e) => {
        e.preventDefault();
        console.log("Resend requested to", email);
        // no backend logic
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-lg">
                <div className="card-strong p-8 rounded-xl shadow-md border border-gray-100 text-center">
                    {/* success badge */}
                    <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <svg
                            className="w-10 h-10 text-green-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path
                                d="M20 6L9 17l-5-5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    {/* large email illustration */}
                    <div className="flex items-center justify-center mb-6">
                        <svg
                            className="w-32 h-32 text-blue-600"
                            viewBox="0 0 64 64"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="6"
                                y="14"
                                width="52"
                                height="36"
                                rx="4"
                                fill="#EFF6FF"
                            />
                            <path
                                d="M8 18l24 16 24-16"
                                stroke="#2563EB"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <rect
                                x="10"
                                y="20"
                                width="44"
                                height="24"
                                fill="white"
                                rx="2"
                            />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                        Check Your Email
                    </h1>
                    <p className="text-sm text-gray-600 mb-6">
                        We have sent a password reset link to
                        <span className="font-medium text-gray-800 mx-1">{email}</span>
                    </p>

                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">Didn't receive the email?</p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                to="/login"
                                className="text-sm text-gray-600 hover:underline"
                            >
                                Check spam folder
                            </Link>
                            <a
                                href="#"
                                onClick={handleResend}
                                className="inline-block py-2 px-4 rounded-lg bg-primary text-white text-sm hover:bg-blue-700 transition"
                            >
                                Resend
                            </a>
                        </div>
                    </div>

                    <div className="mt-6 text-sm text-gray-500">
                        <Link
                            to="/login"
                            className="text-primary hover:underline"
                        >
                            ← Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}