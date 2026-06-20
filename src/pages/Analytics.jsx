import React, { useState } from "react";

const classrooms = [
    { name: "A101", utilization: 92, peakTime: "10AM - 12PM", lowTime: "03PM - 05PM" },
    { name: "B204", utilization: 78, peakTime: "08AM - 10AM", lowTime: "03PM - 05PM" },
    { name: "C312", utilization: 28, peakTime: "01PM - 03PM", lowTime: "03PM - 05PM" },
    { name: "D410", utilization: 64, peakTime: "10AM - 12PM", lowTime: "03PM - 05PM" },
];

const metrics = [
    { label: "Average Utilization", value: "67%" },
    { label: "Peak Utilization", value: "92%" },
    { label: "Lowest Utilization", value: "23%" },
];

const byDay = [
    { day: "May 1", value: 52 },
    { day: "May 5", value: 68 },
    { day: "May 10", value: 74 },
    { day: "May 15", value: 61 },
    { day: "May 20", value: 79 },
    { day: "May 25", value: 55 },
    { day: "May 31", value: 72 },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const times = ["08AM - 10AM", "10AM - 12PM", "01PM - 03PM", "03PM - 05PM"];

// dummy heatmap values 4x5
const heatmap = [
    [45, 60, 55, 70, 50],
    [30, 40, 35, 50, 45],
    [70, 75, 68, 80, 72],
    [20, 25, 18, 30, 22],
];

function getHeatColor(v) {
    // map 0-100 to light-blue -> deep-blue
    const pct = Math.max(0, Math.min(100, v)) / 100;
    const hue = 215; // blue
    const light = 95 - pct * 50; // 95 -> 45
    return `hsl(${hue} 90% ${light}%)`;
}

export default function Analytics() {
    const role = localStorage.getItem("scus_role") || sessionStorage.getItem("scus_role") || "Guest";
    const [selectedRoom, setSelectedRoom] = useState(classrooms[0].name);

    const mostUsed = classrooms.reduce((prev, curr) =>
        curr.utilization > prev.utilization ? curr : prev,
        classrooms[0]
    );
    const leastUsed = classrooms.reduce((prev, curr) =>
        curr.utilization < prev.utilization ? curr : prev,
        classrooms[0]
    );
    const selectedClass = classrooms.find((room) => room.name === selectedRoom) || classrooms[0];

    return (
        <div className="p-4 sm:p-6 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Overview of classroom utilization
                    </p>
                </div>
                <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-200 rounded-md text-sm bg-white">
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>Custom</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                <div className="card p-4 rounded-xl shadow-sm">
                    <div className="text-sm text-gray-500">Most used classroom</div>
                    <div className="text-2xl font-semibold text-gray-800 mt-3">
                        {mostUsed.name} ({mostUsed.utilization}%)
                    </div>
                </div>
                <div className="card p-4 rounded-xl shadow-sm">
                    <div className="text-sm text-gray-500">Least used classroom</div>
                    <div className="text-2xl font-semibold text-gray-800 mt-3">
                        {leastUsed.name} ({leastUsed.utilization}%)
                    </div>
                </div>
                <div className="card p-4 rounded-xl shadow-sm">
                    <div className="text-sm text-gray-500">Peak usage window</div>
                    <div className="text-2xl font-semibold text-gray-800 mt-3">
                        {mostUsed.peakTime}
                    </div>
                </div>
                <div className="card p-4 rounded-xl shadow-sm">
                    <div className="text-sm text-gray-500">Least usage window</div>
                    <div className="text-2xl font-semibold text-gray-800 mt-3">
                        {leastUsed.lowTime}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {metrics.map((m) => (
                    <div
                        key={m.label}
                        className="card p-4 rounded-xl shadow-sm flex flex-col justify-between"
                    >
                        <div className="text-sm text-gray-500">{m.label}</div>
                        <div className="text-2xl font-semibold text-gray-800 mt-3">
                            {m.value}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Utilization By Day
                        </h2>
                        <div className="text-sm text-gray-500">Last 30 days</div>
                    </div>

                    <div className="w-full h-40">
                        <svg viewBox="0 0 700 200" className="w-full h-full">
                            <defs>
                                <linearGradient id="barGrad" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.9" />
                                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.4" />
                                </linearGradient>
                            </defs>

                            {/* axes labels */}
                            <g transform="translate(40,10)">
                                {/* bars */}
                                {byDay.map((d, i) => {
                                    const barW = 50;
                                    const gap = 20;
                                    const x = i * (barW + gap);
                                    const height = (d.value / 100) * 140;
                                    return (
                                        <g key={d.day}>
                                            <rect
                                                x={x}
                                                y={150 - height}
                                                width={barW}
                                                height={height}
                                                rx={6}
                                                fill="url(#barGrad)"
                                            />
                                            <text
                                                x={x + barW / 2}
                                                y={168}
                                                fontSize="11"
                                                textAnchor="middle"
                                                fill="#475569"
                                            >
                                                {d.day}
                                            </text>
                                        </g>
                                    );
                                })}
                                {/* y axis grid lines */}
                                {[0, 25, 50, 75, 100].map((g) => (
                                    <line
                                        key={g}
                                        x1={-10}
                                        x2={700}
                                        y1={150 - (g / 100) * 140}
                                        y2={150 - (g / 100) * 140}
                                        stroke="#f1f5f9"
                                        strokeWidth={1}
                                    />
                                ))}
                            </g>
                        </svg>
                    </div>
                </div>

                <div className="card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Summary
                    </h3>
                    <div className="text-sm text-gray-600">
                        Utilization snapshot and quick insights.
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>Average per day</div>
                        <div className="text-right font-medium">68%</div>
                        <div>Peak hour</div>
                        <div className="text-right font-medium">10:00 - 12:00</div>
                        <div>Least used</div>
                        <div className="text-right font-medium">03:00 - 05:00</div>
                        <div>Active rooms</div>
                        <div className="text-right font-medium">42</div>
                    </div>
                </div>
            </div>

            <div className="card p-6 rounded-xl mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Classroom analysis
                    </h2>
                    {role === "Admin" ? (
                        <select
                            value={selectedRoom}
                            onChange={(e) => setSelectedRoom(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-md text-sm bg-white"
                        >
                            {classrooms.map((room) => (
                                <option key={room.name} value={room.name}>
                                    {room.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <div className="text-xs text-gray-500">
                            Admin privilege only: select a classroom for individual analysis.
                        </div>
                    )}
                </div>

                {role === "Admin" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="p-4 rounded-2xl bg-gray-50">
                            <div className="text-xs text-gray-500">Room</div>
                            <div className="text-lg font-semibold text-gray-800 mt-2">
                                {selectedClass.name}
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50">
                            <div className="text-xs text-gray-500">Utilization</div>
                            <div className="text-lg font-semibold text-gray-800 mt-2">
                                {selectedClass.utilization}%
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50">
                            <div className="text-xs text-gray-500">Peak usage</div>
                            <div className="text-lg font-semibold text-gray-800 mt-2">
                                {selectedClass.peakTime}
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50">
                            <div className="text-xs text-gray-500">Least usage</div>
                            <div className="text-lg font-semibold text-gray-800 mt-2">
                                {selectedClass.lowTime}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-gray-600 leading-relaxed">
                        All users can review the most used and least used classrooms above, as well as overall peak and lowest usage windows. Individual classroom selection is limited to Admin only.
                    </div>
                )}
            </div>

            <div className="card p-6 rounded-xl mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Utilization Heatmap
                    </h2>
                    <div className="text-sm text-gray-500">By time slot</div>
                </div>

                <div className="overflow-x-auto">
                    <div className="w-full max-w-full">
                        <div className="grid grid-cols-6 gap-2 items-center">
                            <div />
                            {days.map((d) => (
                                <div
                                    key={d}
                                    className="text-xs text-gray-500 text-center font-medium"
                                >
                                    {d}
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 grid grid-cols-6 gap-2 items-start">
                            {/* time labels column */}
                            <div className="flex flex-col gap-2">
                                {times.map((t) => (
                                    <div key={t} className="text-xs text-gray-500 py-3">
                                        {t}
                                    </div>
                                ))}
                            </div>

                            {/* heat cells */}
                            <div className="col-span-5">
                                <div className="grid grid-cols-5 gap-2">
                                    {heatmap.flatMap((row, r) =>
                                        row.map((v, c) => (
                                            <div
                                                key={`${r}-${c}`}
                                                className="rounded-lg h-12 flex items-center justify-center text-xs font-medium text-white"
                                                style={{ backgroundColor: getHeatColor(v) }}
                                                title={`${days[c]} • ${times[r]} — ${v}%`}
                                            >
                                                {/* optional small percent */}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-6 h-3 rounded"
                                    style={{ background: getHeatColor(20) }}
                                />
                                <div className="text-xs">Low</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-6 h-3 rounded"
                                    style={{ background: getHeatColor(60) }}
                                />
                                <div className="text-xs">Medium</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-6 h-3 rounded"
                                    style={{ background: getHeatColor(95) }}
                                />
                                <div className="text-xs">High</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}