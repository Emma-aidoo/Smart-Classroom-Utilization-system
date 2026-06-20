import React, { useState } from "react";

function ExportIcon({ className = "w-4 h-4", ariaHidden = true }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden={ariaHidden}>
            <path d="M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 21H3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function Reports() {
    const [range, setRange] = useState("This Month");
    const reports = [
        { id: 1, name: "Monthly Utilization", created: "2024-05-01", size: "2.1MB" },
        { id: 2, name: "Weekly Bookings", created: "2024-05-18", size: "480KB" },
        { id: 3, name: "User Activity", created: "2024-05-10", size: "1.2MB" },
    ];

    return (
        <div className="p-4 sm:p-6 w-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
                    <p className="text-sm text-gray-500 mt-1">Generate and download system reports</p>
                </div>

                <div className="flex items-center gap-3">
                    <select
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>This Year</option>
                        <option>Custom</option>
                    </select>

                    <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 inline-flex items-center gap-2">
                        <ExportIcon className="w-4 h-4 text-white" />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            {/* metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="card p-4">
                    <div className="text-sm text-gray-500">Reports Generated</div>
                    <div className="text-2xl font-semibold text-gray-800 mt-2">24</div>
                </div>
                <div className="card p-4">
                    <div className="text-sm text-gray-500">Total Size</div>
                    <div className="text-2xl font-semibold text-gray-800 mt-2">10.3MB</div>
                </div>
                <div className="card p-4">
                    <div className="text-sm text-gray-500">Last Generated</div>
                    <div className="text-2xl font-semibold text-gray-800 mt-2">May 18, 2024</div>
                </div>
            </div>

            {/* small SVG chart */}
            <div className="card p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">Reports Over Time</h3>
                    <div className="text-sm text-gray-500">Last 6 months</div>
                </div>
                <div className="w-full h-36">
                    <svg viewBox="0 0 600 120" className="w-full h-full">
                        {/* simple sparkline bars */}
                        {[20, 40, 30, 60, 50, 80].map((v, i) => {
                            const barW = 60;
                            const gap = 10;
                            const x = i * (barW + gap);
                            const h = (v / 100) * 80;
                            return <rect key={i} x={x} y={100 - h} width={barW} height={h} rx={6} fill="#2563EB" />;
                        })}
                    </svg>
                </div>
            </div>

            {/* reports table */}
            <div className="card overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <div className="text-sm text-gray-600">Available reports</div>
                    <div className="text-sm text-gray-500">Action</div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px]">
                        <thead className="bg-white">
                            <tr>
                                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Name</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Created</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Size</th>
                                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {reports.map((r) => (
                                <tr key={r.id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-4 text-sm text-gray-700">{r.name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-700">{r.created}</td>
                                    <td className="px-4 py-4 text-sm text-gray-700">{r.size}</td>
                                    <td className="px-4 py-4 text-sm text-right">
                                        <div className="inline-flex items-center gap-2 justify-end">
                                            <button className="px-3 py-1 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 inline-flex items-center gap-2">
                                                <ExportIcon className="w-4 h-4" />
                                                <span>Download</span>
                                            </button>
                                            <button className="px-3 py-1 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
                    <div>Showing {reports.length} reports</div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50">Prev</button>
                        <button className="px-3 py-1 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}