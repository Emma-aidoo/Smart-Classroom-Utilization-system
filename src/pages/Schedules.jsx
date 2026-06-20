import React, { useMemo, useState } from "react";

const INITIAL = [
    {
        id: 1,
        time: "08:00 AM - 10:00 AM",
        course: "Data Structures (CSCI 201)",
        instructor: "Dr. Sarah Johnson",
        room: "Room 101",
        status: "In Use",
    },
    {
        id: 2,
        time: "10:15 AM - 12:15 PM",
        course: "Database Systems (CSCI 301)",
        instructor: "Prof. Michael Lee",
        room: "Lab 202",
        status: "In Use",
    },
    {
        id: 3,
        time: "01:00 PM - 03:15 PM",
        course: "Operating Systems (CSCI 305)",
        instructor: "Dr. Emily Wilson",
        room: "Room 105",
        status: "Available",
    },
    {
        id: 4,
        time: "03:30 PM - 05:00 PM",
        course: "Networks (CSCI 402)",
        instructor: "Dr. Alex Chen",
        room: "Room 103",
        status: "Cancelled",
    },
];

function StatusBadge({ status }) {
    const base =
        "inline-flex items-center px-3 py-1 text-sm font-medium rounded-full";
    if (status === "In Use")
        return <span className={`${base} bg-blue-100 text-blue-700`}>In Use</span>;
    if (status === "Available")
        return (
            <span className={`${base} bg-green-100 text-green-800`}>Available</span>
        );
    if (status === "Cancelled")
        return <span className={`${base} bg-red-100 text-red-700`}>Cancelled</span>;
    return <span className={`${base} bg-gray-100 text-gray-800`}>{status}</span>;
}

export default function Schedules() {
    const [data] = useState(INITIAL);
    const [range, setRange] = useState("This Week");
    const [courseFilter, setCourseFilter] = useState("All Courses");
    const courses = useMemo(
        () => [
            "All Courses",
            ...Array.from(new Set(data.map((d) => d.course))),
        ],
        [data]
    );

    const filtered = useMemo(() => {
        return data.filter((d) =>
            courseFilter === "All Courses" ? true : d.course === courseFilter
        );
    }, [data, courseFilter]);

    return (
        // use full width and ensure the page area can expand to viewport
        <div className="w-full h-full min-h-screen p-4 sm:p-6">
            <div className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Schedules</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            View and manage class schedules
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            value={range}
                            onChange={(e) => setRange(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option>This Week</option>
                            <option>Today</option>
                            <option>Next Week</option>
                        </select>

                        <select
                            value={courseFilter}
                            onChange={(e) => setCourseFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {courses.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* full-width card that grows; table area scrolls when tall */}
                <div className="card overflow-hidden h-full">
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Showing {filtered.length} schedules • {range}
                        </div>
                        <div className="text-sm text-gray-500">
                            {/* placeholder for actions */}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        {/* limit table height to viewport so page fits; adjust calc value if your header height changes */}
                        <div
                            style={{ maxHeight: "calc(100vh - 240px)" }}
                            className="overflow-auto"
                        >
                            <table className="w-full min-w-[720px] divide-y divide-gray-100">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                                            Time
                                        </th>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                                            Course
                                        </th>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                                            Instructor
                                        </th>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                                            Room
                                        </th>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-100">
                                    {filtered.map((s) => (
                                        <tr
                                            key={s.id}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-4 text-sm text-gray-700 w-44">
                                                {s.time}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-700">
                                                {s.course}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-700">
                                                {s.instructor}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-700">
                                                {s.room}
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                <StatusBadge status={s.status} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
                        <div>Showing {filtered.length} schedules</div>
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
            </div>
        </div>
    );
}