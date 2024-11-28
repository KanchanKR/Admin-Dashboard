/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../componets/Header/Header";
import { mockApi } from "../mockapi/mockApi";

const RoleManagement = () => {
  const [users, setUsers] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [roleAssignments, setRoleAssignments] = useState({});
  const [updatedUsers, setUpdatedUsers] = useState([]);
  const [isEditing, setIsEditing] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // You can adjust the number of users per page

  // Fetch users from mockApi when component mounts
  useEffect(() => {
    mockApi.getUsers().then((fetchedUsers) => {
      setUsers(fetchedUsers);
    });
  }, []);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleChange = (id, newRole) => {
    setRoleAssignments((prev) => ({
      ...prev,
      [id]: { ...prev[id], role: newRole, status: prev[id]?.status || users.find((user) => user.id === id).status },
    }));
    updateUserData(id, "role", newRole);
  };

  const handleStatusChange = (id, newStatus) => {
    setRoleAssignments((prev) => ({
      ...prev,
      [id]: { ...prev[id], status: newStatus, role: prev[id]?.role || users.find((user) => user.id === id).role },
    }));
    updateUserData(id, "status", newStatus);
  };


  const handleEditToggle = (userId) => {
    setIsEditing((prev) => {
      const newEditingState = { ...prev, [userId]: !prev[userId] };
      // If "Save" is clicked (i.e., isEditing becomes false), save the changes
      if (!newEditingState[userId]) {
        // Save changes to role and status
        const updatedUser = roleAssignments[userId] ? {
          ...users.find((user) => user.id === userId),
          ...roleAssignments[userId],
        } : users.find((user) => user.id === userId);
        setUpdatedUsers((prev) => [...prev, updatedUser]); // Update with the new user
      }
      return newEditingState;
    });
  };
  

  // Update user data in the state
  const updateUserData = (id, field, value) => {
    const updatedUser = users.find((user) => user.id === id);
    if (updatedUser) {
      updatedUser[field] = value;
      mockApi.updateUser(updatedUser);
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? { ...user, [field]: value } : user)));
    }
  };

   


  // Filter users by search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {currentUsers.map((user) => (
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
                            {user.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-100">
                            {user.name}
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
                        className={`bg-gray-700 text-white rounded-lg py-2 px-4 focus:outline-none ${isEditing[user.id] ? "" : "cursor-not-allowed"}`}
                        disabled={!isEditing[user.id]}
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
                        className={`bg-gray-700 text-white rounded-lg py-2 px-4 focus:outline-none ${isEditing[user.id] ? "" : "cursor-not-allowed"}`}
                        disabled={!isEditing[user.id]}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleEditToggle(user.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      >
                        {isEditing[user.id] ? "Save" : "Edit"}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
              >
                {index + 1}
              </button>
            ))}
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
                    <td className="py-2 px-4">{user.name}</td>
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
