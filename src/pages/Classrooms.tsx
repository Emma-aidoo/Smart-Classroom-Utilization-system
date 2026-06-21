import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const INITIAL = [
    {
        id: 1,
        room: "Room 101",
        building: "Anna Block",
        floor: "1st Floor",
        capacity: 60,
        status: "Available",
        facilities: { projector: true, whiteboard: true, ac: true },
    },
    {
        id: 2,
        room: "Room 102",
        building: "Anna Block",
        floor: "1st Floor",
        capacity: 40,
        status: "In Use",
        facilities: { projector: true, whiteboard: false, ac: false },
    },
    {
        id: 3,
        room: "Lab 201",
        building: "Anna Block",
        floor: "2nd Floor",
        capacity: 40,
        status: "Available",
        facilities: { projector: true, whiteboard: true, ac: false },
    },
    {
        id: 4,
        room: "Lab 202",
        building: "Anna Block",
        floor: "2nd Floor",
        capacity: 30,
        status: "Maintenance",
        facilities: { projector: false, whiteboard: true, ac: false },
    },
    {
        id: 5,
        room: "Hall 301",
        building: "Anna Block",
        floor: "3rd Floor",
        capacity: 100,
        status: "Available",
        facilities: { projector: true, whiteboard: false, ac: true },
    },
];

function StatusBadge({ status }) {
    const base = "px-2 py-0.5 text-sm font-medium rounded-full";
    if (status === "Available")
        return (
            <span className={`${base} bg-green-100 text-green-800`}>Available</span>
        );
    if (status === "In Use")
        return <span className={`${base} bg-blue-100 text-blue-800`}>In Use</span>;
    if (status === "Maintenance")
        return (
            <span className={`${base} bg-red-100 text-red-800`}>Maintenance</span>
        );
    return <span className={`${base} bg-gray-100 text-gray-800`}>{status}</span>;
}

function IconEdit() {
    return (
        <svg
            className="w-4 h-4 text-gray-600 hover:text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <path
                d="M3 21v-3.75L17.81 2.44a2.2 2.2 0 013.12 0l.63.63a2.2 2.2 0 010 3.12L6.75 21H3z"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function Classrooms() {
    const [q, setQ] = useState("");
    const [data, setData] = useState(INITIAL);

    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({
        room: "",
        building: "",
        floor: "1st Floor",
        capacity: "",
        roomType: "Lecture Room",
        facilities: { projector: false, whiteboard: false, ac: false },
        status: "Available",
    });

    const filtered = useMemo(() => {
        if (!q) return data;
        const s = q.trim().toLowerCase();
        return data.filter(
            (r) =>
                String(r.room).toLowerCase().includes(s) ||
                String(r.building).toLowerCase().includes(s) ||
                String(r.floor).toLowerCase().includes(s) ||
                String(r.capacity).toLowerCase().includes(s) ||
                String(r.status).toLowerCase().includes(s)
        );
    }, [q, data]);

    const openModal = () => {
        setForm({
            room: "",
            building: "",
            floor: "1st Floor",
            capacity: "",
            roomType: "Lecture Room",
            facilities: { projector: false, whiteboard: false, ac: false },
            status: "Available",
        });
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const handleChange = (key, value) => setForm((f) => ({ ...f, [key]: value }));
    const handleFacility = (name) =>
        setForm((f) => ({ ...f, facilities: { ...f.facilities, [name]: !f.facilities[name] } }));

    const handleSave = (e) => {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            room: form.room || `Room ${Math.floor(Math.random() * 900 + 100)}`,
            building: form.building || "Building A",
            floor: form.floor,
            capacity: form.capacity || 0,
            status: form.status,
            facilities: form.facilities, // include facilities
        };
        setData((d) => [newItem, ...d]);
        setModalOpen(false);
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Classrooms</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage classrooms and their availability
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input
                            type="search"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search classroom..."
                            className="w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path
                                    d="M21 21l-4.35-4.35"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle
                                    cx="11"
                                    cy="11"
                                    r="6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>

                    <button
                        onClick={openModal}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-blue-700 transition"
                    >
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path
                                d="M12 5v14M5 12h14"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="text-sm font-medium">Add Classroom</span>
                    </button>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Showing {filtered.length} results
                    </div>
                    <div className="text-sm text-gray-500">
                        {/* placeholder for possible actions */}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] divide-y divide-gray-100">
                        <thead className="bg-white">
                            <tr>
                                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                                    Room No.
                                </th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                                    Building
                                </th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                                    Floor
                                </th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                                    Capacity
                                </th>

                                {/* New Facilities column */}
                                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                                    Facilities
                                </th>

                                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-100">
                            {filtered.map((r) => (
                                <tr key={r.id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        {r.room}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        {r.building}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        {r.floor}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        {r.capacity}
                                    </td>

                                    {/* Facilities cell */}
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        <div className="flex items-center gap-2">
                                            {r.facilities?.projector && (
                                                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full">
                                                    Projector
                                                </span>
                                            )}
                                            {r.facilities?.whiteboard && (
                                                <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
                                                    Whiteboard
                                                </span>
                                            )}
                                            {r.facilities?.ac && (
                                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-full">
                                                    AC
                                                </span>
                                            )}
                                            {/* show placeholder if none */}
                                            {!r.facilities?.projector &&
                                                !r.facilities?.whiteboard &&
                                                !r.facilities?.ac && (
                                                    <span className="text-xs text-gray-400">
                                                        —
                                                    </span>
                                                )}
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 text-sm">
                                        <StatusBadge status={r.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
                    <div>
                        Showing {filtered.length} of {data.length} classrooms
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50">
                            Prev
                        </button>
                        <button className="px-3 py-1 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Classroom Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div
                        className="absolute inset-0 bg-black/30"
                        onClick={closeModal}
                    />

                    <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Add Classroom
                            </h3>
                            <button
                                onClick={closeModal}
                                className="p-2 rounded-md hover:bg-gray-100"
                            >
                                <svg
                                    className="w-4 h-4 text-gray-600"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path
                                        d="M6 18L18 6M6 6l12 12"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>

                        <form
                            onSubmit={handleSave}
                            className="px-4 py-6 space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Room No.
                                </label>
                                <input
                                    value={form.room}
                                    onChange={(e) =>
                                        handleChange("room", e.target.value)
                                    }
                                    type="text"
                                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Room 103"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Building
                                </label>
                                <input
                                    value={form.building}
                                    onChange={(e) =>
                                        handleChange("building", e.target.value)
                                    }
                                    type="text"
                                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Building A"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Floor
                                    </label>
                                    <select
                                        value={form.floor}
                                        onChange={(e) =>
                                            handleChange("floor", e.target.value)
                                        }
                                        className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option>1st Floor</option>
                                        <option>2nd Floor</option>
                                        <option>3rd Floor</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Capacity
                                    </label>
                                    <input
                                        value={form.capacity}
                                        onChange={(e) =>
                                            handleChange("capacity", e.target.value)
                                        }
                                        type="number"
                                        className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Room Type
                                </label>
                                <select
                                    value={form.roomType}
                                    onChange={(e) =>
                                        handleChange("roomType", e.target.value)
                                    }
                                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option>Lecture Room</option>
                                    <option>Laboratory</option>
                                    <option>Auditorium</option>
                                    <option>Meeting Room</option>
                                </select>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-sm font-medium text-gray-700">
                                        Facilities
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 flex-wrap">
                                    <label className="inline-flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={form.facilities.projector}
                                            onChange={() =>
                                                handleFacility("projector")
                                            }
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm text-gray-700">
                                            Projector
                                        </span>
                                    </label>

                                    <label className="inline-flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={form.facilities.whiteboard}
                                            onChange={() =>
                                                handleFacility("whiteboard")
                                            }
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm text-gray-700">
                                            Whiteboard
                                        </span>
                                    </label>

                                    <label className="inline-flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={form.facilities.ac}
                                            onChange={() => handleFacility("ac")}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm text-gray-700">
                                            AC
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 items-center">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        value={form.status}
                                        onChange={(e) =>
                                            handleChange("status", e.target.value)
                                        }
                                        className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option>Available</option>
                                        <option>In Use</option>
                                        <option>Maintenance</option>
                                    </select>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-6">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 rounded-md bg-primary text-white hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}