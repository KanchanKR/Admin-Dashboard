/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../componets/Header/Header";

const RoleManagement = () => {
  // Mock user data
  const mockUsers = [
    {
      id: 1,
      username: "johndoe",
      email: "johndoe@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      username: "janedoe",
      email: "janedoe@example.com",
      role: "Manager",
      status: "Inactive",
    },
    {
      id: 3,
      username: "samsmith",
      email: "samsmith@example.com",
      role: "Editor",
      status: "Active",
    },
    {
      id: 4,
      username: "maryjohn",
      email: "maryjohn@example.com",
      role: "Viewer",
      status: "Inactive",
    },
  ];

  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleAssignments, setRoleAssignments] = useState({});
  const [updatedUsers, setUpdatedUsers] = useState([]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle role and status updates
  const handleRoleChange = (id, newRole) => {
    setRoleAssignments((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        role: newRole,
        status: prev[id]?.status || users.find((user) => user.id === id).status,
      },
    }));
    updateUserData(id, "role", newRole);
  };

  const handleStatusChange = (id, newStatus) => {
    setRoleAssignments((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        status: newStatus,
        role: prev[id]?.role || users.find((user) => user.id === id).role,
      },
    }));
    updateUserData(id, "status", newStatus);
  };

  // Update user data in the state
  const updateUserData = (id, field, value) => {
    setUpdatedUsers((prev) => {
      const existingUser = users.find((user) => user.id === id);
      const updatedUser = { ...existingUser, [field]: value };

      // If user already exists in the updatedUsers array, replace it with the updated one
      const userIndex = prev.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        const newUsers = [...prev];
        newUsers[userIndex] = updatedUser;
        return newUsers;
      }

      // Otherwise, add the updated user to the array
      return [...prev, updatedUser];
    });
  };

  // Filter users by search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Role and status color map
  const roleColors = {
    "Super Admin": "bg-purple-800 text-purple-100",
    Admin: "bg-blue-800 text-blue-100",
    Manager: "bg-green-800 text-green-100",
    Editor: "bg-yellow-800 text-yellow-100",
    Viewer: "bg-gray-800 text-gray-100",
    Contributor: "bg-teal-800 text-teal-100",
    "Guest/User": "bg-indigo-800 text-indigo-100",
  };

  const statusColors = {
    Active: "bg-green-800 text-green-100",
    Inactive: "bg-red-800 text-red-100",
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Role Management" />

      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 m-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* User Assignment Section */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-100">
              Assign Roles & Status
            </h2>
          </div>

          <div className="flex justify-center mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search users..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                            {user.username.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-100">
                            {user.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">
                      <select
                        value={roleAssignments[user.id]?.role || user.role}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                        className="bg-gray-700 text-white rounded-lg py-2 px-4 focus:outline-none"
                      >
                        <option value="Super Admin">Super Admin</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                        <option value="Contributor">Contributor</option>
                        <option value="Guest/User">Guest/User</option>
                      </select>
                    </td>
                    <td className="py-2 px-4">
                      <select
                        value={roleAssignments[user.id]?.status || user.status}
                        onChange={(e) =>
                          handleStatusChange(user.id, e.target.value)
                        }
                        className="bg-gray-700 text-white rounded-lg py-2 px-4 focus:outline-none"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Display Updated Users Table */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-100">
              Updated Users
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {updatedUsers.map((user) => (
                  <tr key={user.id} className="border-t border-gray-700">
                    <td className="py-2 px-4">{user.username}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className={`py-2 px-4 ${roleColors[user.role]}`}>
                      {user.role}
                    </td>
                    <td className={`py-2 px-4 ${statusColors[user.status]}`}>
                      {user.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleManagement;
