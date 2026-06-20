import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiBell, FiLogOut, FiChevronDown } from "react-icons/fi";

export default function Navbar() {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("scus_token");
		sessionStorage.removeItem("scus_token");
		navigate("/login", { replace: true });
	};

	// demo data
	const [emails, setEmails] = useState([
		{ id: 1, from: "registrar@university.edu", subject: "Room allocation update", read: false },
		{ id: 2, from: "it-support@university.edu", subject: "Maintenance scheduled", read: false },
		{ id: 3, from: "events@university.edu", subject: "Guest lecture details", read: true },
	]);

	const [notices, setNotices] = useState([
		{ id: 1, title: "Reservation confirmed (Room 105)", read: false },
		{ id: 2, title: "New booking request", read: false },
		{ id: 3, title: "System maintenance tonight", read: true },
	]);

	const unreadEmails = emails.filter((e) => !e.read).length;
	const unreadNotices = notices.filter((n) => !n.read).length;

	// dropdown state + refs for outside click
	const [mailOpen, setMailOpen] = useState(false);
	const [noticeOpen, setNoticeOpen] = useState(false);
	const [userOpen, setUserOpen] = useState(false);
	const mailRef = useRef(null);
	const noticeRef = useRef(null);
	const userRef = useRef(null);

	useEffect(() => {
		function onDoc(e) {
			if (mailRef.current && !mailRef.current.contains(e.target)) setMailOpen(false);
			if (noticeRef.current && !noticeRef.current.contains(e.target)) setNoticeOpen(false);
			if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
		}
		document.addEventListener("click", onDoc);
		return () => document.removeEventListener("click", onDoc);
	}, []);

	// actions
	const openEmail = (id) => {
		setEmails((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
		const m = emails.find((x) => x.id === id);
		alert(`Email from ${m.from}\n\n${m.subject}`);
		setMailOpen(false);
	};

	const openNotice = (id) => {
		setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
		const n = notices.find((x) => x.id === id);
		alert(n.title);
		setNoticeOpen(false);
	};

	return (
		<header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
			<div>
				<div className="text-lm text-gray-800">Welcome back, <span className="font-semibold text-gray-800">Khobina Emma!</span></div>
			</div>

			<div className="flex items-center gap-4">
				{/* Notifications: mail + bell */}
				<div className="flex items-center gap-3">
					{/* Mail icon */}
					<div className="relative" ref={mailRef}>
						<button
							aria-label="Messages"
							onClick={(e) => { e.stopPropagation(); setMailOpen((s) => !s); setNoticeOpen(false); }}
							className="relative p-2 rounded-md hover:bg-gray-100"
						>
							<FiMail className="w-5 h-5 text-gray-600" />
							{unreadEmails > 0 && (
								<span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-600 rounded-full">
									{unreadEmails}
								</span>
							)}
						</button>

						{mailOpen && (
							<div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
								<div className="p-3 border-b border-gray-100 text-sm font-medium">Messages</div>
								<div className="max-h-64 overflow-auto">
									{emails.map((m) => (
										<button
											key={m.id}
											onClick={() => openEmail(m.id)}
											className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${m.read ? "bg-white" : "bg-gray-50"}`}
										>
											<div className="text-sm font-semibold truncate">{m.subject}</div>
											<div className="text-xs text-gray-500">{m.from}</div>
										</button>
									))}
								</div>

							</div>
						)}
					</div>

					{/* Bell icon */}
					<div className="relative" ref={noticeRef}>
						<button
							aria-label="Notifications"
							onClick={(e) => { e.stopPropagation(); setNoticeOpen((s) => !s); setMailOpen(false); }}
							className="relative p-2 rounded-md hover:bg-gray-100"
						>
							<FiBell className="w-5 h-5 text-gray-600" />
							{unreadNotices > 0 && (
								<span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-600 rounded-full">
									{unreadNotices}
								</span>
							)}
						</button>

						{noticeOpen && (
							<div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
								<div className="p-3 border-b border-gray-100 text-sm font-medium">Notifications</div>
								<div className="max-h-64 overflow-auto">
									{notices.map((n) => (
										<button
											key={n.id}
											onClick={() => openNotice(n.id)}
											className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${n.read ? "bg-white" : "bg-gray-50"}`}
										>
											<div className="text-sm font-medium truncate">{n.title}</div>
											<div className="text-xxs text-gray-500 mt-1">{n.read ? "Read" : "Unread"}</div>
										</button>
									))}
								</div>

							</div>
						)}
					</div>
				</div>

				{/* User menu (avatar + name + dropdown) */}
				<div className="relative" ref={userRef}>
					<button
						onClick={(e) => { e.stopPropagation(); setUserOpen((s) => !s); }}
						className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white border border-gray-200 hover:shadow-sm"
					>
						<div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">KE</div>
						<div className="text-sm text-gray-800 font-medium">Khobina</div>
						<FiChevronDown className="w-4 h-4 text-gray-500" />
					</button>

					{userOpen && (
						<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
							<button
								className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
								onClick={() => { alert("View profile (demo)"); setUserOpen(false); }}
							>
								View profile
							</button>
							<div className="border-t border-gray-100" />
							<button
								className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
								onClick={() => { setUserOpen(false); handleLogout(); }}
							>
								<FiLogOut className="w-4 h-4" /> Logout
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}