import React from "react";

export default function StatCard({
	title,
	value,
	change,
	color = "blue",
	icon = null,
}) {
	const badgeClass =
		{
			blue: "stat-badge stat-blue",
			green: "stat-badge stat-green",
			indigo: "stat-badge stat-indigo",
			orange: "stat-badge stat-orange",
		}[color] || "stat-badge stat-blue";

	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
			<div className={badgeClass}>
				{/* render provided icon or fallback */}
				{icon ? (
					<span className="flex items-center justify-center">{icon}</span>
				) : (
					<svg
						className="w-6 h-6 text-blue-600"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
					>
						<path
							d="M12 8v4l2 2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}
			</div>
			<div className="flex-1">
				<div className="text-xs text-gray-500">{title}</div>
				<div className="text-2xl font-semibold text-gray-800 mt-1">
					{value}
				</div>
			</div>
			<div className="text-sm text-white bg-blue-600 rounded-full px-3 py-1">
				{change ?? "+0%"}
			</div>
		</div>
	);
}