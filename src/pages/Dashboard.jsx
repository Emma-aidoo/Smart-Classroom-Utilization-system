import React from "react";
import StatCard from "../components/StatCard";
import Table from "../components/Table";
import { FaSchool, FaCalendarCheck, FaChartLine, FaUsers } from "react-icons/fa";

const stats = [
    {
        title: "Total Classrooms",
        value: 67,
        change: "+2%",
        color: "blue",
        icon: <FaSchool className="w-6 h-6 text-current" />,

    },
    {
        title: "Today's Bookings",
        value: 22,
        change: "-1%",
        color: "green",
        icon: <FaCalendarCheck className="w-6 h-6 text-current" />
    },
    {
        title: "Utilization Rate",
        value: "68%",
        change: "+5%",
        color: "indigo",
        icon: <FaChartLine className="w-6 h-6 text-current" />
    },
    {
        title: "Active Users",
        value: 156,
        change: "+8%",
        color: "orange",
        icon: <FaUsers className="w-6 h-6 text-current" />
    },
];

const weeklyData = [
    { day: "Mon", util: 55 },
    { day: "Tue", util: 60 },
    { day: "Wed", util: 62 },
    { day: "Thu", util: 70 },
    { day: "Fri", util: 75 },
    { day: "Sat", util: 50 },
    { day: "Sun", util: 40 },
];

function InlineLineChart({ data = [] }) {
    const w = 700;
    const h = 160;
    const padding = 20;
    const max = 100;
    const step = (w - padding * 2) / (data.length - 1 || 1);

    const points = data
        .map((d, i) => {
            const x = padding + i * step;
            const y = padding + (1 - d.util / max) * (h - padding * 2);
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <div className="w-full h-40">
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
                <defs>
                    <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0" />
                    </linearGradient>
                </defs>

                <polyline
                    points={`${points} ${w - padding},${h - padding} ${padding},${h - padding}`}
                    fill="url(#g)"
                    stroke="none"
                />

                <polyline
                    points={points}
                    fill="none"
                    stroke="var(--scus-primary)"
                    strokeWidth="3"
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                />

                {data.map((d, i) => {
                    const x = padding + i * step;
                    const y = padding + (1 - d.util / max) * (h - padding * 2);
                    return <circle key={i} cx={x} cy={y} r={3.5} fill="var(--scus-primary)" />;
                })}

                {data.map((d, i) => {
                    const x = padding + i * step;
                    return (
                        <text key={i} x={x} y={h - 6} fontSize="10" textAnchor="middle" fill="#6b7280">
                            {d.day}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
}

export default function Dashboard() {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-sm text-gray-600">Overview of classroom utilization</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {stats.map((s) => (
                    <StatCard key={s.title} title={s.title} value={s.value} change={s.change} color={s.color} icon={s.icon} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Weekly Utilization</h2>
                        <div className="text-sm text-gray-500">Last 7 days</div>
                    </div>

                    <InlineLineChart data={weeklyData} />
                </div>

                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Classrooms</h3>
                    <Table
                        columns={["Classroom", "Capacity", "Status"]}
                        data={[
                            { Classroom: "Room 101", Capacity: 30, Status: "Available" },
                            { Classroom: "Room 102", Capacity: 25, Status: "In Use" },
                            { Classroom: "Room 201", Capacity: 40, Status: "Available" },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}