/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../componets/Header/Header";

const AuditLog = () => {
  // Sample audit log data
  const sampleLogData = [
    {
      id: 1,
      user: "John Doe",
      action: "Changed Role",
      details: "Assigned Super Admin role to Jane Smith",
      timestamp: "2024-11-26 10:30:00",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Updated Permission",
      details: "Granted Write permission to Mark Johnson",
      timestamp: "2024-11-26 11:15:00",
    },
    {
      id: 3,
      user: "Mark Johnson",
      action: "Status Change",
      details: "Set status to Inactive for Sarah Lee",
      timestamp: "2024-11-26 12:00:00",
    },
  ];

  const [logData, setLogData] = useState(sampleLogData);
  const [eventFilter, setEventFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEventFilter = (e) => {
    setEventFilter(e.target.value);
  };

  // Filter logs based on event type and search term
  const filteredLogs = logData.filter((log) => {
    const matchesEvent =
      eventFilter === "All" || log.action.includes(eventFilter);
    const matchesSearch = log.details
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesEvent && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Audit Log" />
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 m-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center items-center mb-6">
          {/* Search Input */}
          <div className="relative w-full sm:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search logs..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {/* Event Filter Dropdown */}
          <div className="w-full sm:w-1/3 lg:w-1/4">
            <select
              className="bg-gray-700 text-white rounded-lg py-2 px-4 focus:outline-none w-full focus:ring-2 focus:ring-blue-500"
              value={eventFilter}
              onChange={handleEventFilter}
            >
              <option value="All">All Events</option>
              <option value="Changed Role">Changed Role</option>
              <option value="Updated Permission">Updated Permission</option>
              <option value="Status Change">Status Change</option>
            </select>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 text-center">
            <thead>
              <tr>
                <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider text-left">
                  User
                </th>
                <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider text-left">
                  Action
                </th>
                <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider text-left">
                  Details
                </th>
                <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider text-left">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                            {log.user.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-100">
                            {log.user}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      {log.details}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      {log.timestamp}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-2 px-4 text-center text-gray-400"
                  >
                    No logs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AuditLog;
