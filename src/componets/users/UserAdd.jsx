import { useState } from "react";
import { mockApi } from "../../mockapi/mockApi";

const UserAdd = ({ onAddUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Viewer");
  const [status, setStatus] = useState("Active");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Username is required.";
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!role) {
      newErrors.role = "Please select a role.";
    }

    if (!status) {
      newErrors.status = "Please select a status.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Add the new user to the mock API
    await mockApi.addUser({ name, email, role, status });

    // Refresh the users list after adding the new user
    onAddUser();

    // Reset form fields
    setName("");
    setEmail("");
    setRole("Viewer");
    setStatus("Active");
  };

  return (
    <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white">Add New User</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row sm:gap-4 mb-4">
          <input
            type="text"
            id="name"
            className={`w-full sm:w-1/4 px-4 py-2 bg-gray-700 text-white rounded-lg mb-4 sm:mb-0 ${
              errors.name ? "border-red-500" : ""
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="email"
            id="email"
            className={`w-full sm:w-1/4 px-4 py-2 bg-gray-700 text-white rounded-lg mb-4 sm:mb-0 ${
              errors.email ? "border-red-500" : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <select
            id="role"
            className={`w-full sm:w-1/4 px-4 py-2 bg-gray-700 text-white rounded-lg mb-4 sm:mb-0 ${
              errors.role ? "border-red-500" : ""
            }`}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Viewer">Viewer</option>
            <option value="Admin">Admin</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Editor">Editor</option>
            <option value="Manager">Manager</option>
            <option value="Contributor">Contributor</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

          <select
            id="status"
            className={`w-full sm:w-1/4 px-4 py-2 bg-gray-700 text-white rounded-lg mb-4 sm:mb-0 ${
              errors.status ? "border-red-500" : ""
            }`}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAdd;
