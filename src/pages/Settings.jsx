import React, { useState, useEffect } from "react";

export default function Settings() {
    const role = localStorage.getItem("scus_role") || sessionStorage.getItem("scus_role") || "Guest";
    const isAdmin = role === "Admin";

    const [org, setOrg] = useState({
        name: "Smart Classroom Utilization System",
        domain: "university.edu",
        timezone: "UTC+0",
        primaryColor: "#2563EB",
    });

    const [branding, setBranding] = useState({
        logoName: "scus-logo.png",
        logoPreview: null, // can be set via FileReader if needed
    });

    const [booking, setBooking] = useState({
        defaultDuration: 60,
        minNoticeMins: 30,
    });

    const [security, setSecurity] = useState({
        requireStrongPasswords: true,
        twoFactor: false,
    });

    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        dailySummary: true,
    });

    // small palette of presets
    const PRESET_COLORS = ["#2563EB", "#0EA5A4", "#7C3AED", "#F97316", "#059669", "#DC2626"];

    // apply primary color to :root CSS variable on mount and when changed
    useEffect(() => {
        document.documentElement.style.setProperty("--scus-primary", org.primaryColor);
    }, [org.primaryColor]);

    // helper to change primary color (updates state and CSS via effect)
    const handlePrimaryColorChange = (color) => {
        setOrg((o) => ({ ...o, primaryColor: color }));
    };

    const handleSaveAll = (e) => {
        e.preventDefault();
        console.log("Settings saved:", { org, branding, booking, security, notifications });
        alert("Settings saved (local only).");
    };

    const handleLogoChange = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setBranding((b) => ({ ...b, logoPreview: ev.target.result, logoName: file.name }));
        reader.readAsDataURL(file);
    };

    return (
        <div className="p-4 sm:p-6 w-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
                    <p className="text-sm text-gray-500 mt-1">System configuration for Smart Classroom Utilization</p>
                </div>
                <div className="text-sm text-gray-500">Last edited: just now</div>
            </div>

            <form onSubmit={handleSaveAll} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <section className={isAdmin ? "lg:col-span-2 card p-6" : "lg:col-span-3 card p-6"}>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Primary color</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-700">Primary color</label>
                                <div className="mt-1 flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={org.primaryColor}
                                        onChange={(e) => handlePrimaryColorChange(e.target.value)}
                                        className="w-12 h-10 p-0 border-0"
                                        aria-label="Primary color"
                                    />
                                    <input
                                        value={org.primaryColor}
                                        onChange={(e) => handlePrimaryColorChange(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div className="mt-3 flex items-center gap-2">
                                    {PRESET_COLORS.map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => handlePrimaryColorChange(c)}
                                            className="w-8 h-8 rounded-full border"
                                            style={{ background: c }}
                                            title={c}
                                        />
                                    ))}
                                    <div className="ml-3 text-xs text-gray-500">Click a swatch to apply</div>
                                </div>

                                <p className="text-xs text-gray-500 mt-1">Brand primary color used across the app.</p>
                            </div>
                        </div>
                    </section>

                    {isAdmin && (
                        <aside className="card p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Branding</h3>

                            <div className="flex flex-col items-center gap-3">
                                <div className="w-28 h-28 rounded-xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                                    {branding.logoPreview ? (
                                        <img src={branding.logoPreview} alt="logo preview" className="object-contain w-full h-full" />
                                    ) : (
                                        <div className="text-sm text-gray-400">{branding.logoName}</div>
                                    )}
                                </div>

                                <label className="inline-flex items-center gap-2 cursor-pointer">
                                    <input type="file" accept="image/*" onChange={(e) => handleLogoChange(e.target.files?.[0])} className="hidden" />
                                    <span className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm hover:bg-gray-50">Upload logo</span>
                                </label>

                                <p className="text-xs text-gray-500 text-center">Recommended: 256x256 PNG. Transparent background preferred.</p>
                            </div>
                        </aside>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {isAdmin && (
                        <section className="lg:col-span-2 card p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Booking Settings</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-700">Default duration (mins)</label>
                                    <input
                                        type="number"
                                        value={booking.defaultDuration}
                                        onChange={(e) => setBooking((b) => ({ ...b, defaultDuration: Number(e.target.value) }))}
                                        className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700">Minimum notice (mins)</label>
                                    <input
                                        type="number"
                                        value={booking.minNoticeMins}
                                        onChange={(e) => setBooking((b) => ({ ...b, minNoticeMins: Number(e.target.value) }))}
                                        className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 border-t pt-6">
                                <h3 className="text-md font-medium text-gray-800 mb-3">Security</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Require strong passwords</span>
                                            <input
                                                type="checkbox"
                                                checked={security.requireStrongPasswords}
                                                onChange={(e) => setSecurity((s) => ({ ...s, requireStrongPasswords: e.target.checked }))}
                                                className="w-5 h-5"
                                            />
                                        </label>
                                    </div>

                                    <div>
                                        <label className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Two-factor authentication</span>
                                            <input
                                                checked={security.twoFactor}
                                                onChange={(e) => setSecurity((s) => ({ ...s, twoFactor: e.target.checked }))}
                                                className="w-5 h-5"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    <aside className={isAdmin ? "card p-6" : "lg:col-span-3 card p-6"}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">Email notifications</span>
                                <input type="checkbox" checked={notifications.email} onChange={(e) => setNotifications((n) => ({ ...n, email: e.target.checked }))} className="w-5 h-5" />
                            </label>

                            <label className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">Push notifications</span>
                                <input type="checkbox" checked={notifications.push} onChange={(e) => setNotifications((n) => ({ ...n, push: e.target.checked }))} className="w-5 h-5" />
                            </label>

                            <label className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">Daily utilization summary</span>
                                <input type="checkbox" checked={notifications.dailySummary} onChange={(e) => setNotifications((n) => ({ ...n, dailySummary: e.target.checked }))} className="w-5 h-5" />
                            </label>
                        </div>
                    </aside>
                </div>

                {/* Footer actions */}
                <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-3">
                        <button type="button" onClick={() => { console.log("Resetting to defaults"); alert("Reset to defaults (mock)"); }} className="px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50">
                            Reset to defaults
                        </button>

                        <button type="button" onClick={() => { console.log("Deactivate (mock)"); alert("Deactivate account (mock)"); }} className="px-4 py-2 rounded-md border border-red-200 text-red-700 hover:bg-red-50">
                            Deactivate account
                        </button>

                        <button type="submit" className="px-4 py-2 rounded-md bg-primary text-white hover:bg-blue-700">
                            Save settings
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}