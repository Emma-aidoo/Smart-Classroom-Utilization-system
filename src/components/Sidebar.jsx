import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

function Icon({ name }) {
    switch (name) {
        case "dashboard":
            return (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "classrooms":
            return (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M3 11v8a1 1 0 001 1h16a1 1 0 001-1v-8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 3v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "schedules":
            return (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <rect x="3" y="5" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 3v4M8 3v4M3 11h18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "reservations":
            return (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <rect x="3" y="7" width="18" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 3h8v4H8z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.5 12.5l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "timetable":
            return (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <circle cx="12" cy="12" r="8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "analytics":
            return (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="7" y="12" width="2" height="6" rx="1" />
                    <rect x="11" y="8" width="2" height="10" rx="1" />
                    <rect x="15" y="4" width="2" height="14" rx="1" />
                </svg>
            );
        case "users":
            return (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM6 11c1.657 0 3-1.343 3-3S7.657 5 6 5 3 6.343 3 8s1.343 3 3 3z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "reports":
            return (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M9 17H7a2 2 0 01-2-2V7a2 2 0 012-2h8l6 6v6a2 2 0 01-2 2h-3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 7v10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13 11h4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "settings":
            return (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M12 15.5A3.5 3.5 0 1115.5 12 3.5 3.5 0 0112 15.5z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06A2 2 0 014.28 16.9l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09c.67 0 1.25-.41 1.51-1a1.65 1.65 0 00-.33-1.82l-.06-.06A2 2 0 016.1 4.28l.06.06a1.65 1.65 0 001.82.33H8.1c.67 0 1.25-.41 1.51-1H11a2 2 0 014 0h.09c.26.59.84 1 1.51 1h.27a1.65 1.65 0 001.51 1 1.65 1.65 0 00.33 1.82z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "logout":
            return (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M16 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13 19H6a2 2 0 01-2-2V7a2 2 0 012-2h7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        default:
            return null;
    }
}

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    // Don't render sidebar on public/auth pages
    const publicPaths = ["/login", "/signup", "/forgot-password", "/verify-email", "/reset-password"];
    if (publicPaths.some((p) => location.pathname.startsWith(p))) {
        return null;
    }

    function handleLogout() {
        // clear mock auth tokens and navigate to login
        localStorage.removeItem("scus_token");
        localStorage.removeItem("scus_role");
        sessionStorage.removeItem("scus_token");
        sessionStorage.removeItem("scus_role");
        navigate("/login", { replace: true });
    }

    const role = localStorage.getItem("scus_role") || sessionStorage.getItem("scus_role") || "";

    const items = [
        { to: "/dashboard", name: "Dashboard", icon: "dashboard" },
        { to: "/classrooms", name: "Classrooms", icon: "classrooms" },
        { to: "/schedules", name: "Schedules", icon: "schedules" },
        { to: "/reservations", name: "Reservations", icon: "reservations" },
        { to: "/timetable", name: "Timetable", icon: "timetable" },
        { to: "/analytics", name: "Analytics", icon: "analytics" },
        { to: "/users", name: "Users", icon: "users" },
        { to: "/reports", name: "Reports", icon: "reports" },
        { to: "/settings", name: "Settings", icon: "settings" },
        // logout will be rendered as an action (no real "to" route)
    ].filter((item) => !(role === "Student" && item.to === "/users"));

    return (
        <aside className="hidden lg:flex flex-col w-60 sidebar-gradient text-white h-screen p-4">
            <div className="mb-6">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        {/* mortarboard / graduation cap */}
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            {/* cap (diamond) */}
                            <path d="M12 2L1 7l11 5 11-5L12 2z" />
                            {/* band under cap */}
                            <path d="M2 8.5v3.5c0 .8 1.3 1.6 3 2.2 2 0.8 4.5 1.3 7 1.3s5-0.5 7-1.3c1.7-.6 3-1.4 3-2.2V8.5" />
                            {/* tassel */}
                            <path d="M12 7v7" />
                            <path d="M12 14l3 1" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-lg font-semibold">SCUS</div>
                        <div className="text-xs text-white/80">Smart Classrooms</div>
                    </div>
                </div>
            </div>

            <nav className="flex-1 sidebar-scroll">
                <ul className="space-y-1">
                    {items.map((it) => (
                        <li key={it.to}>
                            <NavLink
                                to={it.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2 rounded-lg mx-1 transition-colors ${isActive ? "bg-white text-blue-700 font-semibold shadow-sm" : "text-white/90 hover:bg-white/10"
                                    }`
                                }
                            >
                                <span className="flex-none" aria-hidden>
                                    <Icon name={it.icon} />
                                </span>
                                <span className="text-sm">{it.name}</span>
                            </NavLink>
                        </li>
                    ))}

                    {/* Logout item below settings */}
                    <li>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg mx-1 text-white/90 hover:bg-white/10"
                        >
                            <span className="flex-none" aria-hidden>
                                <Icon name="logout" />
                            </span>
                            <span className="text-sm">Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>

          
            <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-full bg-white text-blue-700 flex items-center justify-center font-semibold">KE</div>
                    <div>
                        <div className="text-sm font-semibold">Khobina Emma</div>
                        <div className="text-xs text-white/80">{role || "Admin"}</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}