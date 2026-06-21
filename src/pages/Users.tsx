import React, { useMemo, useState } from "react";

const INITIAL_USERS = [
    {
        id: 1,
        name: "Emmnauel",
        email: "emmnauel@university.edu",
        role: "Admin",
        status: "Active",
    },
    {
        id: 2,
        name: "Johnson",
        email: "johnson@university.edu",
        role: "Lecturer",
        status: "Active",
    },
    {
        id: 3,
        name: "Michael",
        email: "michael@university.edu",
        role: "Lecturer",
        status: "Active",
    },
    {
        id: 4,
        name: "Davis",
        email: "davis@university.edu",
        role: "Lecturer",
        status: "Active",
    },
    {
        id: 5,
        name: "James",
        email: "james@university.edu",
        role: "Staff",
        status: "Active",
    },
    {
        id: 6,
        name: "Olivia",
        email: "olivia@university.edu",
        role: "Student",
        status: "Inactive",
    },
    {
        id: 7,
        name: "Lisa",
        email: "lisa@university.edu",
        role: "Student",
        status: "Active",
    },
];

function StatusPill({ status }) {
    if (status === "Active")
        return (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
            </span>
        );
    return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Inactive
        </span>
    );
}

export default function Users() {
    const role = localStorage.getItem("scus_role") || sessionStorage.getItem("scus_role") || "Guest";
    const isAdmin = role === "Admin";
    const [users, setUsers] = useState(INITIAL_USERS);
    const [q, setQ] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");

    // Add user modal + form state
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "Student",
        status: "Active",
    });

    const roles = useMemo(
        () => ["All", ...Array.from(new Set(users.map((u) => u.role)))],
        [users]
    );

    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        return users.filter((u) => {
            if (roleFilter !== "All" && u.role !== roleFilter) return false;
            if (!s) return true;
            return (u.name + u.email + u.role).toLowerCase().includes(s);
        });
    }, [users, q, roleFilter]);

    const toggleStatus = (id) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === id
                    ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
                    : u
            )
        );
    };

    const openModal = () => {
        setForm({ name: "", email: "", role: "Student", status: "Active" });
        setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);
    const handleFormChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const handleSave = (e) => {
        e && e.preventDefault();
        if (!form.name.trim() || !form.email.trim()) {
            alert("Name and email are required.");
            return;
        }
        const newUser = {
            id: Date.now(),
            name: form.name.trim(),
            email: form.email.trim(),
            role: form.role,
            status: form.status,
        };
        setUsers((prev) => [newUser, ...prev]);
        setModalOpen(false);
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Users</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage system users and roles
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="search"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search user..."
                            className="pl-10 pr-3 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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

                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="w-full sm:w-auto px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm"
                    >
                        {roles.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>

                    {isAdmin ? (
                        <button
                            onClick={openModal}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
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
                            Add User
                        </button>
                    ) : (
                        <div className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 bg-gray-50">
                            Only admin can add or remove users.
                        </div>
                    )}
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Showing {filtered.length} users
                    </div>
                    <div className="text-sm text-gray-500">All Roles</div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-full table-auto">
                        <thead className="bg-white">
                            <tr>
                                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 whitespace-nowrap">
                                    Name
                                </th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 whitespace-nowrap">
                                    Email
                                </th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 whitespace-nowrap">
                                    Role
                                </th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 whitespace-nowrap">
                                    Status
                                </th>
                                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500 whitespace-nowrap">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-100">
                            {filtered.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
                                                {u.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .slice(0, 2)
                                                    .join("")}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-800">
                                                    {u.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 text-sm text-gray-600 max-w-[180px] break-words">
                                        {u.email}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                                        {u.role}
                                    </td>
                                    <td className="px-4 py-4 text-sm">
                                        {<StatusPill status={u.status} />}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-right align-middle">
                                        <div className="inline-flex flex-wrap items-center gap-2 justify-end h-full">
                                            {isAdmin ? (
                                                <>
                                                    <button
                                                        onClick={() => toggleStatus(u.id)}
                                                        className="px-3 py-1 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
                                                    >
                                                        {u.status === "Active"
                                                            ? "Disable"
                                                            : "Activate"}
                                                    </button>
                                                    <button
                                                        onClick={() => setUsers((prev) => prev.filter((item) => item.id !== u.id))}
                                                        className="px-3 py-1 text-sm rounded-md border border-red-200 text-red-700 hover:bg-red-50"
                                                    >
                                                        Remove
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-gray-500">No actions available</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
                    <div>
                        Showing {filtered.length} of {users.length} users
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

            {/* Add User Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div
                        className="absolute inset-0 bg-black/30"
                        onClick={closeModal}
                    />
                    <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Add User
                            </h3>
                            <button
                                onClick={closeModal}
                                className="p-2 rounded-md hover:bg-gray-100"
                            >
                                ✕
                            </button>
                        </div>

                        <form
                            onSubmit={handleSave}
                            className="px-4 py-6 space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Full name
                                </label>
                                <input
                                    value={form.name}
                                    onChange={(e) =>
                                        handleFormChange("name", e.target.value)
                                    }
                                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        handleFormChange("email", e.target.value)
                                    }
                                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Role
                                    </label>
                                    <select
                                        value={form.role}
                                        onChange={(e) =>
                                            handleFormChange("role", e.target.value)
                                        }
                                        className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md"
                                    >
                                        <option>Admin</option>
                                        <option>Lecturer</option>
                                        <option>Staff</option>
                                        <option>Student</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        value={form.status}
                                        onChange={(e) =>
                                            handleFormChange("status", e.target.value)
                                        }
                                        className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md"
                                    >
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 rounded-md border border-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md bg-primary text-white"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}