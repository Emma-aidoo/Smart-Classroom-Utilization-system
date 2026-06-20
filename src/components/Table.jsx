import React from "react";

export default function Table({ columns = [], data = [] }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-gray-100 shadow-sm">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((col) => (
                            <th key={col} className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="table-row-hover">
                    {data.map((row, idx) => (
                        <tr key={idx} className="border-t last:border-b hover:bg-gray-50 transition">
                            {columns.map((col) => (
                                <td key={col} className="px-4 py-3 text-sm text-gray-700">
                                    {row[col] ?? "-"}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}