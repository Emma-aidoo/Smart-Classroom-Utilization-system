import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

    const handleChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirm) {
            alert("Passwords do not match");
            return;
        }
        console.log("Sign up (mock):", form);
        // no backend logic
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="card-strong p-8 rounded-xl shadow-md border border-gray-100">
                    <div className="flex flex-col items-center mb-4">
                        <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-3">SC</div>
                        <h1 className="text-2xl font-semibold text-gray-800">Create an account</h1>
                        <p className="text-sm text-gray-500 mt-1">Sign up to manage classrooms and reservations.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                            <input value={form.name} onChange={handleChange("name")} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Jane Doe" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input value={form.email} onChange={handleChange("email")} type="email" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input value={form.password} onChange={handleChange("password")} type="password" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
                            <input value={form.confirm} onChange={handleChange("confirm")} type="password" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" />
                        </div>

                        <button type="submit" className="w-full py-2 rounded-lg bg-primary text-white font-medium hover:bg-blue-700 transition">Sign Up</button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
