import React, { useMemo, useState } from "react";

const DUMMY = [
    {
        id: 1,
        room: "Room 105",
        date: "May 17, 2024",
        time: "10:00 AM - 01:00 PM",
        title: "Project Meeting",
        status: "Confirmed",
    },
    {
        id: 2,
        room: "Lab 203",
        date: "May 18, 2024",
        time: "09:00 AM - 11:00 AM",
        title: "AI Project Group",
        status: "Confirmed",
    },
    {
        id: 3,
        room: "Room 102",
        date: "May 20, 2024",
        time: "02:00 PM - 04:00 PM",
        title: "Department Seminar",
        status: "Pending",
    },
    {
        id: 4,
        room: "Hall 301",
        date: "May 22, 2024",
        time: "06:00 PM - 08:00 PM",
        title: "Workshop",
        status: "Confirmed",
    },
    {
        id: 5,
        room: "Room 110",
        date: "Apr 28, 2024",
        time: "01:00 PM - 03:00 PM",
        title: "Past Meeting",
        status: "Completed",
    },
    {
        id: 6,
        room: "Room 207",
        date: "Mar 12, 2024",
        time: "10:00 AM - 12:00 PM",
        title: "Cancelled Session",
        status: "Cancelled",
    },
];

function StatusPill({ status }) {
    const base = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
    if (status === "Confirmed") return <span className={`${base} bg-green-100 text-green-800`}>Confirmed</span>;
    if (status === "Pending") return <span className={`${base} bg-amber-100 text-amber-800`}>Pending</span>;
    if (status === "Cancelled") return <span className={`${base} bg-red-100 text-red-800`}>Cancelled</span>;
    if (status === "Completed") return <span className={`${base} bg-slate-100 text-slate-800`}>Completed</span>;
    return <span className={`${base} bg-gray-100 text-gray-800`}>{status}</span>;
}

function IconDots() {
    return (
        <svg
            className="w-5 h-5 text-gray-400 hover:text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
            <circle cx="5" cy="12" r="1.5" />
        </svg>
    );
}

export default function Reservations() {
    const role = localStorage.getItem("scus_role") || sessionStorage.getItem("scus_role") || "Guest";
    const [tab, setTab] = useState("upcoming");
    const [data, setData] = useState(DUMMY);

    // modal + form state
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({
        room: "",
        date: "",
        startTime: "",
        endTime: "",
        title: "",
        status: "Pending",
    });

    const openModal = () => {
        setForm({ room: "", date: "", startTime: "", endTime: "", title: "", status: "Pending" });
        setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);

    const handleFormChange = (key, value) => setForm((f) => ({ ...f, [key]: value }));

    const handleSave = (e) => {
        e && e.preventDefault();
        // simple validation
        if (!form.room || !form.date || !form.startTime || !form.endTime || !form.title) {
            alert("Please fill room, date, start/end time and title.");
            return;
        }
        const time = `${form.startTime} - ${form.endTime}`;
        const newRes = {
            id: Date.now(),
            room: form.room,
            date: new Date(form.date).toLocaleDateString(),
            time,
            title: form.title,
            status: form.status,
        };
        setData((d) => [newRes, ...d]);
        setModalOpen(false);
        setTab("upcoming");
    };

    const handleUpdateStatus = (id, status) => {
        setData((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    };

    const tabs = [
        { id: "upcoming", label: "Upcoming" },
        { id: "past", label: "Past" },
        { id: "cancelled", label: "Cancelled" },
    ];

    const list = useMemo(() => {
        const now = new Date();
        return {
            upcoming: data.filter((r) => !["Cancelled", "Completed"].includes(r.status)),
            past: data.filter((r) => r.status === "Completed" || (new Date(r.date) < now && r.status !== "Cancelled")),
            cancelled: data.filter((r) => r.status === "Cancelled"),
        };
    }, [data]);

    const items = list[tab] ?? [];

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Reservations</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage room reservations and bookings</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex bg-white rounded-lg border border-gray-100 shadow-sm">
                        {tabs.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${tab === t.id ? "bg-blue-50 text-primary" : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    <button onClick={openModal} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-blue-700 transition">
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        New Reservation
                    </button>
                </div>
            </div>

            {/* mobile tabs */}
            <div className="sm:hidden mb-4 flex gap-2">
                {tabs.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg ${tab === t.id
                            ? "bg-blue-50 text-primary"
                            : "bg-white text-gray-600 border border-gray-100"
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4">
                {items.length === 0 ? (
                    <div className="card p-6 text-center">
                        <p className="text-sm text-gray-600">No reservations in this view.</p>
                    </div>
                ) : (
                    items.map((r) => (
                        <div
                            key={r.id}
                            className="card p-4 sm:p-5 flex items-start gap-4 hover:shadow-md transition"
                        >
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary font-semibold">
                                    {r.room.split(" ")[1] ?? "RM"}
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-sm font-semibold text-gray-800 truncate">{r.room}</h3>
                                            <div className="text-xs text-gray-500">{r.date}</div>
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1 truncate">{r.title}</div>
                                        <div className="text-xs text-gray-500 mt-2">{r.time}</div>
                                    </div>

                                    <div className="flex-shrink-0 flex flex-col items-end gap-2">
                                        <StatusPill status={r.status} />
                                        {role === "Admin" && r.status === "Pending" && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleUpdateStatus(r.id, "Confirmed")}
                                                    className="px-3 py-1 rounded-md bg-emerald-600 text-white text-xs hover:bg-emerald-700"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStatus(r.id, "Cancelled")}
                                                    className="px-3 py-1 rounded-md bg-red-600 text-white text-xs hover:bg-red-700"
                                                >
                                                    Revoke
                                                </button>
                                            </div>
                                        )}
                                        {role === "Admin" && r.status === "Confirmed" && (
                                            <button
                                                onClick={() => handleUpdateStatus(r.id, "Cancelled")}
                                                className="px-3 py-1 rounded-md bg-red-600 text-white text-xs hover:bg-red-700"
                                            >
                                                Revoke
                                            </button>
                                        )}
                                        {role !== "Admin" && (
                                            <button className="p-1 rounded-md hover:bg-gray-100">
                                                <IconDots />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* New Reservation Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/30" onClick={closeModal} />
                    <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800">New Reservation</h3>
                            <button onClick={closeModal} className="p-2 rounded-md hover:bg-gray-100">✕</button>
                        </div>

                        <form onSubmit={handleSave} className="px-4 py-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input value={form.title} onChange={(e) => handleFormChange("title", e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md" placeholder="Meeting title" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Room</label>
                                <input value={form.room} onChange={(e) => handleFormChange("room", e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md" placeholder="Room 101" required />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date</label>
                                    <input type="date" value={form.date} onChange={(e) => handleFormChange("date", e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Start time</label>
                                    <input type="time" value={form.startTime} onChange={(e) => handleFormChange("startTime", e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End time</label>
                                <input type="time" value={form.endTime} onChange={(e) => handleFormChange("endTime", e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select value={form.status} onChange={(e) => handleFormChange("status", e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md">
                                    <option>Pending</option>
                                    <option>Confirmed</option>
                                    <option>Cancelled</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-md border border-gray-200">Cancel</button>
                                <button type="submit" className="px-4 py-2 rounded-md bg-primary text-white">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}