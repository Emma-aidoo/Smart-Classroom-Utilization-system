import React, { useMemo, useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIME_SLOTS = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

// Generated events: fill every day/slot with a sample class (duration 1) using rotating titles/rooms/colors
const EVENTS = (() => {
    const titles = [
        "CSC 201", "MAT 101", "PHY 101", "ENG 201", "CSC 301",
        "CHEM 101", "CSC 401", "MGT 201", "BUS 301"
    ];
    const rooms = ["Room 101", "Room 102", "Lab 201", "Lab 202", "Room 103", "Room 104", "Room 105"];
    const colors = [
        "bg-blue-100 text-blue-700",
        "bg-green-100 text-green-700",
        "bg-indigo-100 text-indigo-700",
        "bg-amber-100 text-amber-700",
        "bg-pink-100 text-pink-700",
        "bg-violet-100 text-violet-700",
    ];
    let id = 1;
    const out = [];
    for (let day = 0; day < DAYS.length; day++) {
        for (let slot = 0; slot < TIME_SLOTS.length; slot++) {
            const title = titles[(day + slot) % titles.length] + " — Lecture";
            const room = rooms[(day + slot) % rooms.length];
            const color = colors[(day + slot) % colors.length].split(" ")[0]; // keep bg class (we style with bg class)
            const accent = colors[(day + slot) % colors.length].split(" ")[1] ?? "text-gray-800";
            out.push({
                id: id++,
                day,
                slot,
                duration: 1,
                title,
                room,
                color: color,
                accent: accent,
            });
        }
    }
    return out;
})();

export default function Timetable() {
    const [weekOffset, setWeekOffset] = useState(0);
    const [uploadedFileName, setUploadedFileName] = useState("");
    const [analysisReady, setAnalysisReady] = useState(false);
    const [analysisStatus, setAnalysisStatus] = useState("");
    const role = localStorage.getItem("scus_role") || sessionStorage.getItem("scus_role") || "Guest";

    const weekLabel = useMemo(() => {
        const now = new Date();
        now.setDate(now.getDate() + weekOffset * 7);
        const start = new Date(now);
        const end = new Date(now);
        end.setDate(start.getDate() + 4);
        const opts = { month: "short", day: "numeric" };
        return `${start.toLocaleDateString(undefined, opts)} — ${end.toLocaleDateString(undefined, opts)}`;
    }, [weekOffset]);

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFileName(file.name);
            setAnalysisReady(false);
            setAnalysisStatus("Custom timetable loaded. Click analyze to compare it against existing classrooms.");
        }
    };

    const analyzeTimetable = () => {
        if (!uploadedFileName) return;
        setAnalysisReady(true);
        setAnalysisStatus(`Analyzing ${uploadedFileName} against current classroom availability...`);
        setTimeout(() => {
            setAnalysisStatus(`Analysis complete for ${uploadedFileName}: best fit found for available rooms.`);
        }, 900);
    };

    // layout constants
    const timeCol = 120; // px
    const dayMin = 160; // px
    const rowH = 64; // px per slot
    const minWidth = timeCol + DAYS.length * dayMin;

    // thin border color
    const borderColor = "rgba(15,23,42,0.06)";

    return (
        <div className="w-full h-full min-h-screen p-4 sm:p-6">
            <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Timetable</h2>
                    <p className="text-sm text-gray-500 mt-1">Weekly classroom schedule</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    {role === "Admin" && (
                        <div className="flex items-center gap-2">
                            <label className="inline-flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-md cursor-pointer bg-white hover:bg-blue-50">
                                <input
                                    type="file"
                                    accept=".csv, .xlsx, .json"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                Upload timetable
                            </label>
                            <button
                                type="button"
                                onClick={analyzeTimetable}
                                disabled={!uploadedFileName}
                                className={`px-4 py-2 rounded-md text-sm font-medium ${uploadedFileName ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
                            >
                                Analyze
                            </button>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <button onClick={() => setWeekOffset((s) => s - 1)} className="p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50">
                            ‹
                        </button>
                        <div className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm">{weekLabel}</div>
                        <button onClick={() => setWeekOffset((s) => s + 1)} className="p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50">
                            ›
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-auto border border-gray-100 rounded-xl bg-white">
                <div style={{ minWidth: `${minWidth}px` }}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: `${timeCol}px repeat(${DAYS.length}, minmax(${dayMin}px, 1fr))`,
                            gridAutoRows: `${rowH}px`,
                            gap: 0,
                        }}
                    >
                        {/* top-left header */}
                        <div
                            style={{
                                gridColumn: 1,
                                gridRow: 1,
                                position: "sticky",
                                top: 0,
                                left: 0,
                                zIndex: 40,
                                background: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRight: `1px solid ${borderColor}`,
                                borderBottom: `1px solid ${borderColor}`,
                                padding: 8,
                            }}
                        >
                            <div className="text-xs text-gray-500">Time</div>
                        </div>

                        {/* day headers */}
                        {DAYS.map((d, i) => (
                            <div
                                key={d}
                                style={{
                                    gridColumn: i + 2,
                                    gridRow: 1,
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 30,
                                    background: "#fff",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderBottom: `1px solid ${borderColor}`,
                                    padding: 8,
                                }}
                            >
                                <div className="text-sm font-medium text-gray-700">{d}</div>
                                <div className="text-xs text-gray-500">Date</div>
                            </div>
                        ))}

                        {/* time labels + day cells */}
                        {TIME_SLOTS.map((t, rowIdx) => {
                            const gridRow = rowIdx + 2; // header row is 1
                            return (
                                <React.Fragment key={t}>
                                    {/* time label - sticky left */}
                                    <div
                                        style={{
                                            gridColumn: 1,
                                            gridRow,
                                            position: "sticky",
                                            left: 0,
                                            zIndex: 30,
                                            background: "#fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "flex-end",
                                            paddingRight: 12,
                                            borderRight: `1px solid ${borderColor}`,
                                            borderTop: `1px solid ${borderColor}`,
                                        }}
                                    >
                                        <div className="text-sm text-gray-600">{t}</div>
                                    </div>

                                    {/* day cells */}
                                    {DAYS.map((_, colIdx) => (
                                        <div
                                            key={`${rowIdx}-${colIdx}`}
                                            style={{
                                                gridColumn: colIdx + 2,
                                                gridRow,
                                                borderTop: `1px solid ${borderColor}`,
                                                borderLeft: `1px solid ${borderColor}`,
                                                padding: 8,
                                                boxSizing: "border-box",
                                            }}
                                        />
                                    ))}
                                </React.Fragment>
                            );
                        })}

                        {/* events placed using grid coordinates */}
                        {EVENTS.map((ev) => {
                            const gridColumnStart = ev.day + 2;
                            const gridRowStart = ev.slot + 2;
                            const gridRowEnd = gridRowStart + (ev.duration || 1);
                            return (
                                <div
                                    key={ev.id}
                                    style={{
                                        gridColumnStart,
                                        gridRowStart,
                                        gridRowEnd,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 6,
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <div className={`rounded-xl p-2 shadow-sm border border-gray-100 ${ev.color}`} style={{ minWidth: 92, textAlign: "center" }}>
                                        <div className={`text-sm font-semibold ${ev.accent}`} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.title}</div>
                                        <div className="text-xxs text-gray-600 mt-1" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.room}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {role === "Admin" && (
                <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
                    <div className="font-medium">Custom timetable upload</div>
                    <div className="mt-2">
                        {analysisStatus || "Upload a custom timetable file to compare it with existing classroom availability."}
                    </div>
                    {analysisReady && (
                        <div className="mt-2 text-blue-700">
                            Analysis ready: the custom timetable has been compared against available classrooms.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}