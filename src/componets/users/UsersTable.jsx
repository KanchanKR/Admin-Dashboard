/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

import { mockApi } from "../../mockapi/mockApi";

import UserAdd from "./UserAdd";



const roleStyles = {
  "Super Admin": "bg-purple-800 text-purple-100",
  Admin: "bg-blue-800 text-blue-100",
  Manager: "bg-green-800 text-green-100",
  Editor: "bg-yellow-800 text-yellow-100",
  Viewer: "bg-gray-800 text-gray-100",
  Contributor: "bg-teal-800 text-teal-100",
  "Guest/User": "bg-indigo-800 text-indigo-100",
};

const UsersTable = () => {
  const [users, setUsers] = useState([]); // Combine both API data and dummy data here
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  

  const usersPerPage = 5;
  const totalPages = 3;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await mockApi.getUsers();
      const mergedUsers = [...fetchedUsers]; // Merge dummy data with fetched users
      setUsers(mergedUsers);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleRoleFilter = (e) => {
    setRoleFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteUser = (id) => {
    setDeletingUserId(id); // Store the ID of the user to be deleted
    setIsConfirmingDelete(true); // Show confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      if (deletingUserId !== null) {
        await mockApi.deleteUser(deletingUserId); // Proceed with deletion
        fetchUsers(); // Re-fetch users after deletion
        setDeletingUserId(null); // Reset user ID after deletion
        setIsConfirmingDelete(false); // Hide confirmation dialog
      }
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false); // Hide confirmation dialog if canceled
    setDeletingUserId(null); // Reset user ID
  };

  // Handle edit button click
  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  // Handle save user
  const handleSaveUser = async (id) => {
    const currentUser = users.find((user) => user.id === id);
    const updatedUser = {
      id,
      name: editName,
      email: editEmail,
      role: currentUser.role,  // Preserve the original role
      status: currentUser.status,
    };
    try {
      await mockApi.updateUser(updatedUser);
      fetchUsers(); // Re-fetch users after update
      setEditingUserId(null); // Exit edit mode
    } catch (err) {
      setError("Failed to update user");
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingUserId(null); // Exit edit mode
  };

  const filteredUsers = users
    .filter(
      (user) =>
        (user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)) &&
        (roleFilter === "All" || user.role === roleFilter) &&
        (statusFilter === "All" || user.status === statusFilter)
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      } else {
        return a[sortKey] < b[sortKey] ? 1 : -1;
      }
    });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100 mb-4 sm:mb-0">
            Users
          </h2>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search users..."
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
            <select
              className="bg-gray-700 text-white rounded-lg py-2 px-4 focus:outline-none w-full sm:w-auto"
              value={roleFilter}
              onChange={handleRoleFilter}
            >
              <option value="All">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
              <option value="Contributor">Contributor</option>
              <option value="Guest/User">Guest/User</option>
            </select>
            <select
              className="bg-gray-700 text-white rounded-lg py-2 px-4 focus:outline-none w-full sm:w-auto"
              value={statusFilter}
              onChange={handleStatusFilter}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
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
              {paginatedUsers.map((user) => (
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
                          {/* If editing, show input field for name */}
                          {editingUserId === user.id ? (
                            <input
                              type="text"
                              className="bg-gray-700 text-white rounded-lg p-2"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                            />
                          ) : (
                            <div className="text-sm font-medium text-gray-100">
                              {user.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* If editing, show input field for email */}
                    {editingUserId === user.id ? (
                      <input
                        type="email"
                        className="bg-gray-700 text-white rounded-lg p-2"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      />
                    ) : (
                      <div className="text-sm text-gray-400">{user.email}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        roleStyles[user.role]
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "Active"
                          ? "bg-green-800 text-green-100"
                          : "bg-red-800 text-red-100"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {editingUserId === user.id ? (
                      <>
                        {/* Save Changes button */}
                        <button
                          className="text-green-400 hover:text-green-300 mr-2"
                          onClick={() => handleSaveUser(user.id)}
                        >
                          Save Changes
                        </button>
                        {/* Cancel button */}
                        <button
                          className="text-red-400 hover:text-red-300"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Edit button */}
                        <button
                          className="text-indigo-400 hover:text-indigo-300 mr-2"
                          onClick={() => handleEditClick(user)}
                        >
                          <Edit size={18} />
                        </button>
                      </>
                    )}
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`bg-gray-700 text-white py-2 px-4 rounded-lg ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`bg-gray-700 text-white py-2 px-4 rounded-lg ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {isConfirmingDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-1/3">
              <p className="text-lg mb-4">
                Are you sure you want to delete this user?
              </p>
              <div className="flex justify-around">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  onClick={confirmDelete}
                >
                  Yes
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  onClick={cancelDelete}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <UserAdd onAddUser={fetchUsers} />
    </div>
  );
};

export default UsersTable;
